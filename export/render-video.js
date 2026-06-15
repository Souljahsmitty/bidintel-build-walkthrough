#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");
const { chromium } = require("../../tutorial/export/node_modules/playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "export");
const FRAMES = path.join(OUT, "frames");
const VIDEO = path.join(OUT, "bidintel-complete-build-walkthrough.mp4");
const SRT = path.join(OUT, "bidintel-complete-build-walkthrough.srt");
const TXT = path.join(OUT, "bidintel-complete-build-walkthrough.txt");
const CHAPTERS = path.join(OUT, "bidintel-complete-build-walkthrough-chapters.md");
const MANIFEST = path.join(OUT, "bidintel-complete-build-walkthrough-manifest.json");
const CONTACT = path.join(OUT, "bidintel-complete-contact-sheet.png");

const scenes = vm.runInNewContext(fs.readFileSync(path.join(ROOT, "scenes.js"), "utf8") + "\nSCENES;", {});
const url = `file://${path.join(ROOT, "index.html")}`;
let frameEntries = [];

function pad(n, size = 4) {
  return String(n).padStart(size, "0");
}

function tc(total, srt = false) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = Math.floor(total % 60);
  return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}${srt ? ",000" : ""}`;
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

function codeScrollPositions(clientHeight, scrollTopMax) {
  if (scrollTopMax <= 0) return [0];
  const step = Math.max(220, Math.floor(clientHeight * 0.82));
  const positions = [0];
  for (let pos = step; pos < scrollTopMax; pos += step) positions.push(pos);
  positions.push(scrollTopMax);
  const unique = [...new Set(positions)];
  if (unique.length <= 16) return unique;
  return Array.from({ length: 16 }, (_, index) => Math.round((scrollTopMax * index) / 15));
}

function frameDuration(scene, count, index) {
  if (count === 1) return scene.duration || 9;
  if (index === 0) return 2.75;
  if (index === count - 1) return 3.25;
  return 2.1;
}

async function captureFrames() {
  fs.rmSync(FRAMES, { recursive: true, force: true });
  fs.mkdirSync(FRAMES, { recursive: true });
  frameEntries = [];
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto(url);
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = "* { animation: none !important; transition: none !important; }";
    document.head.appendChild(style);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  });

  for (let i = 0; i < scenes.length; i++) {
    await page.locator("#sceneList li").nth(i).click();
    await page.evaluate(() => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      const details = document.querySelector(".code-panel");
      if (details) details.open = true;
    });
    await page.waitForTimeout(90);
    const scrollData = await page.locator(".code-panel").evaluate((el) => ({
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      scrollTopMax: Math.max(0, el.scrollHeight - el.clientHeight),
    }));
    const shouldScroll = scrollData.scrollTopMax > 120 && scenes[i].code;
    const positions = shouldScroll ? codeScrollPositions(scrollData.clientHeight, scrollData.scrollTopMax) : [0];
    for (let j = 0; j < positions.length; j++) {
      await page.locator(".code-panel").evaluate((el, top) => { el.scrollTop = top; }, positions[j]);
      await page.waitForTimeout(50);
      const frameName = positions.length === 1 ? `${pad(i + 1)}.png` : `${pad(i + 1)}-${pad(j + 1, 2)}.png`;
      const framePath = path.join(FRAMES, frameName);
      await page.screenshot({ path: framePath, fullPage: false });
      frameEntries.push({
        sceneIndex: i + 1,
        scrollIndex: j + 1,
        scrollCount: positions.length,
        scrollTop: positions[j],
        frame: framePath,
        duration: frameDuration(scenes[i], positions.length, j),
      });
    }
  }
  await browser.close();
}

function writeTextAssets() {
  let elapsed = 0;
  const srt = [];
  const txt = [];
  const chapters = ["# BidIntel Frontend + AWS Walkthrough Chapters", ""];
  const assets = [];
  scenes.forEach((scene, idx) => {
    const frames = frameEntries.filter((entry) => entry.sceneIndex === idx + 1);
    const duration = frames.reduce((total, entry) => total + entry.duration, 0) || scene.duration || 9;
    srt.push(`${idx + 1}\n${tc(elapsed, true)} --> ${tc(elapsed + duration, true)}\n${scene.narration}\n`);
    txt.push(`[${tc(elapsed)}] ${scene.chapter} - ${scene.title}\n${scene.narration}\n`);
    chapters.push(`${tc(elapsed)} ${scene.chapter} - ${scene.title}`);
    assets.push({
      index: idx + 1,
      chapter: scene.chapter,
      title: scene.title,
      duration,
      frame: frames[0]?.frame,
      frames: frames.map((entry) => ({
        frame: entry.frame,
        duration: entry.duration,
        scroll_index: entry.scrollIndex,
        scroll_count: entry.scrollCount,
        scroll_top: entry.scrollTop,
      })),
    });
    elapsed += duration;
  });
  fs.writeFileSync(SRT, srt.join("\n"));
  fs.writeFileSync(TXT, txt.join("\n"));
  fs.writeFileSync(CHAPTERS, chapters.join("\n") + "\n");
  fs.writeFileSync(MANIFEST, JSON.stringify({
    source: url,
    video: VIDEO,
    scene_count: scenes.length,
    duration_seconds: elapsed,
    viewport: "1920x1080",
    note: "Browser screenshots of the frontend/AWS tutorial URL. Long code scenes are captured as multiple scroll frames.",
    assets,
  }, null, 2) + "\n");
}

function encodeVideo() {
  const list = path.join(OUT, "frames.txt");
  const lines = [];
  frameEntries.forEach((entry) => {
    lines.push(`file '${entry.frame.replaceAll("'", "'\\''")}'`);
    lines.push(`duration ${entry.duration}`);
  });
  lines.push(`file '${frameEntries[frameEntries.length - 1].frame.replaceAll("'", "'\\''")}'`);
  fs.writeFileSync(list, lines.join("\n") + "\n");
  run("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", list, "-r", "24", "-vf", "format=yuv420p", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", VIDEO]);
}

function makeContactSheet() {
  const pick = (n, last = false) => {
    const matches = frameEntries.filter((entry) => entry.sceneIndex === n);
    return (last ? matches[matches.length - 1] : matches[0])?.frame || path.join(FRAMES, `${pad(n)}.png`);
  };
  const picks = [pick(1), pick(5), pick(10), pick(16, true)];
  run("ffmpeg", [
    "-y",
    "-i", picks[0],
    "-i", picks[1],
    "-i", picks[2],
    "-i", picks[3],
    "-filter_complex",
    "[0:v]scale=480:300[a];[1:v]scale=480:300[b];[2:v]scale=480:300[c];[3:v]scale=480:300[d];[a][b][c][d]xstack=inputs=4:layout=0_0|480_0|0_300|480_300[out]",
    "-map", "[out]",
    "-frames:v", "1",
    CONTACT,
  ]);
}

(async () => {
  if (spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status !== 0) {
    console.error("ffmpeg is required");
    process.exit(1);
  }
  await captureFrames();
  writeTextAssets();
  encodeVideo();
  makeContactSheet();
  console.log(`Wrote ${VIDEO}`);
  console.log(`Scenes: ${scenes.length}`);
  console.log(`Manifest: ${MANIFEST}`);
})();
