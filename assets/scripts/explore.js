// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const button = document.querySelector("button");
  const image = document.querySelector("img");
  const voiceSelect = document.getElementById("voice-select");
  const tts = document.getElementById("text-to-speak");
  // function from mozilla dev docs to fetch voice list
  function populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  
  // integrate tts with button press
  button.addEventListener("click", () => {
    const voices = speechSynthesis.getVoices();
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    const utter = new SpeechSynthesisUtterance(tts.value);
    for (let i = 0; i < voices.length; i++){
      if (voices[i].name === selectedOption) {
        utter.voice = voices[i];
      }
    }
    speechSynthesis.speak(utter);
    utter.addEventListener("start", () => {
      image.src = "assets/images/smiling-open.png";
    });
    utter.addEventListener("end", () => {
      image.src = "assets/images/smiling.png";
    });
  });
}