#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "export");
const VIDEO = path.join(OUT, "bidintel-complete-build-walkthrough.mp4");
const TMP = path.join(OUT, "bidintel-complete-build-walkthrough.with-audio.mp4");
const NARRATION_TXT = path.join(OUT, "bidintel-complete-build-walkthrough-narration.txt");
const NARRATION_AIFF = path.join(OUT, "bidintel-complete-build-walkthrough-narration.aiff");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

const scenes = vm.runInNewContext(fs.readFileSync(path.join(ROOT, "scenes.js"), "utf8") + "\nSCENES;", {});
const text = scenes.map((scene, index) => {
  const codeHint = scene.code
    ? " The visible code panel shows the exact files, commands, expected output, and verification steps for this scene."
    : "";
  return `Scene ${index + 1}. ${scene.title}. ${scene.narration || ""}${codeHint}`;
}).join("\n\n");

fs.writeFileSync(NARRATION_TXT, text + "\n");

if (spawnSync("say", ["-v", "Samantha", "-r", "145", "-o", NARRATION_AIFF, "-f", NARRATION_TXT], { stdio: "inherit" }).status !== 0) {
  console.error("macOS say command failed");
  process.exit(1);
}

run("ffmpeg", [
  "-y",
  "-i", VIDEO,
  "-i", NARRATION_AIFF,
  "-map", "0:v:0",
  "-map", "1:a:0",
  "-c:v", "copy",
  "-c:a", "aac",
      "-b:a", "48k",
  "-af", "apad",
  "-shortest",
  "-movflags", "+faststart",
  TMP,
]);

fs.renameSync(TMP, VIDEO);
if (fs.existsSync(NARRATION_AIFF)) fs.unlinkSync(NARRATION_AIFF);
console.log(`Added narration audio to ${VIDEO}`);
