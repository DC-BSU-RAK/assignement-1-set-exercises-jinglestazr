const samplesPerPage = 9;
let currentPage = 0;

const allSamples = [
  { name: "Aha!", file: "ah-ha.mp3" },
  { name: "Back of the Net!", file: "back-of-the-net.mp3" },
  { name: "Dan!", file: "dan.mp3" },
  { name: "Email of the evening!", file: "emailoftheevening.mp3" },
  { name: "Hello Partridge", file: "hellopartridge.mp3" },
  { name: "I Ate A Scotch Egg!", file: "iateascotchegg.mp3" },
  { name: "Im Confused", file: "imconfused.mp3" },
  { name: "Bang Out Of Order", file: "bangoutoforder.mp3" }
];

const grid = document.getElementById("samples-grid");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

function loadSamples() {
  grid.innerHTML = "";

  const start = currentPage * samplesPerPage;
  const pageSamples = allSamples.slice(start, start + samplesPerPage);

  pageSamples.forEach(({ name, file }) => {
    const audio = new Audio(`assets/audio/${file}`);
    const div = document.createElement("div");
    div.className = "sample";
    div.innerHTML = `<strong>${name}</strong><br/><small>Loading...</small>`;

    audio.onloadedmetadata = () => {
      div.querySelector("small").textContent = `${audio.duration.toFixed(1)}s`;
    };

    div.onclick = () => {
      audio.currentTime = 0;
      audio.play();
    };

    grid.appendChild(div);
  });

  leftArrow.style.display = currentPage === 0 ? "none" : "inline-block";
  rightArrow.style.display = (currentPage + 1) * samplesPerPage >= allSamples.length ? "none" : "inline-block";
}

leftArrow.onclick = () => {
  currentPage--;
  loadSamples();
};

rightArrow.onclick = () => {
  currentPage++;
  loadSamples();
};

document.getElementById("speak-button").onclick = () => {
  const text = document.getElementById("tts-input").value;
  if (text.trim()) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
};

loadSamples();

