const state = { index: 0, playing: false, muted: true, timer: null, speed: 1 };
const els = {
  mockup: document.getElementById("mockup"),
  caption: document.getElementById("caption"),
  codePanel: document.getElementById("codePanel"),
  chapterLabel: document.getElementById("chapterLabel"),
  chapterMenu: document.getElementById("chapterMenu"),
  sceneList: document.getElementById("sceneList"),
  scrubber: document.getElementById("scrubber"),
  playBtn: document.getElementById("playBtn"),
  muteBtn: document.getElementById("muteBtn"),
  speed: document.getElementById("speed")
};

function renderMockup(scene) {
  if (typeof scene.visual === "string" && scene.visual.trim().startsWith("<")) return scene.visual;
  if (scene.skin === "terminal") return `<div class="terminal">${scene.visual.replaceAll("\n", "<br>")}</div>`;
  if (scene.skin === "editor") return `<div class="editor"><div class="lines">${Array.from({length: 14}, (_, i) => i + 1).join("<br>")}</div><div class="code">${scene.visual}</div></div>`;
  if (scene.skin === "browser") return `<div class="browser"><div class="address">http://localhost:5173</div><div class="web">${scene.visual}</div></div>`;
  if (scene.skin === "aws") return `<div class="aws"><nav>Amazon Console<br><br>Bedrock<br>IAM<br>S3<br>ECS<br>CloudWatch</nav><section>${scene.visual}</section></div>`;
  return `<div class="card"><h2>${scene.title}</h2><p>${scene.visual}</p></div>`;
}

function resolveCode(scene) {
  const code = scene.code || "No command for this concept scene.";
  if (scene.codeMode === "literal") return code;
  const snippets = window.CODE_SNIPPETS || {};
  const parts = String(code).split(/\n|->/).map((part) => part.trim()).filter(Boolean);
  const resolved = parts.map((part) => {
    if (snippets[part]) return `# ${part}\n${snippets[part]}`;
    return part;
  });
  return resolved.join("\n\n");
}

function speak(text) {
  speechSynthesis.cancel();
  if (state.muted || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = state.speed;
  speechSynthesis.speak(utterance);
}

function render() {
  const scene = SCENES[state.index];
  els.chapterLabel.textContent = `${state.index + 1}/${SCENES.length} · ${scene.chapter}`;
  els.mockup.className = `mockup ${scene.skin || "diagram"}`;
  els.mockup.innerHTML = renderMockup(scene);
  els.caption.textContent = scene.narration;
  els.codePanel.textContent = resolveCode(scene);
  const panel = document.querySelector(".code-panel");
  if (panel) panel.scrollTop = 0;
  els.scrubber.value = String(Math.round((state.index / (SCENES.length - 1)) * 100));
  [...els.sceneList.children].forEach((li, i) => li.classList.toggle("active", i === state.index));
  els.chapterMenu.value = scene.chapter;
  speak(scene.narration);
  scheduleNext();
}

function scheduleNext() {
  clearTimeout(state.timer);
  if (!state.playing) return;
  const scene = SCENES[state.index];
  state.timer = setTimeout(() => next(), (scene.duration || 9) * 1000 / state.speed);
}

function next() {
  state.index = Math.min(SCENES.length - 1, state.index + 1);
  if (state.index === SCENES.length - 1) state.playing = false;
  els.playBtn.textContent = state.playing ? "Pause" : "Play";
  render();
}

function prev() {
  state.index = Math.max(0, state.index - 1);
  render();
}

function init() {
  [...new Set(SCENES.map(s => s.chapter))].forEach(chapter => {
    const opt = document.createElement("option");
    opt.value = chapter;
    opt.textContent = chapter;
    els.chapterMenu.appendChild(opt);
  });
  SCENES.forEach((scene, i) => {
    const li = document.createElement("li");
    li.textContent = scene.title;
    li.onclick = () => { state.index = i; render(); };
    els.sceneList.appendChild(li);
  });
  document.getElementById("nextBtn").onclick = next;
  document.getElementById("prevBtn").onclick = prev;
  els.playBtn.onclick = () => { state.playing = !state.playing; els.playBtn.textContent = state.playing ? "Pause" : "Play"; render(); };
  els.muteBtn.onclick = () => { state.muted = !state.muted; els.muteBtn.textContent = state.muted ? "Unmute" : "Mute"; speechSynthesis.cancel(); };
  els.speed.onchange = () => { state.speed = Number(els.speed.value); render(); };
  els.scrubber.oninput = () => { state.index = Math.round((Number(els.scrubber.value) / 100) * (SCENES.length - 1)); render(); };
  els.chapterMenu.onchange = () => { state.index = SCENES.findIndex(s => s.chapter === els.chapterMenu.value); render(); };
  render();
}

init();
