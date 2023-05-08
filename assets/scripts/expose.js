// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // selecting images to appear
  const image = document.querySelector("img");
  const audio = document.querySelector('audio');
  const selectedHorn = document.getElementById('horn-select');

  selectedHorn.addEventListener("change", () => {
    image.src = "./assets/images/" + selectedHorn.value + ".svg";
    audio.src = "./assets/audio/" + selectedHorn.value + ".mp3";
  }); 

  // volume settings
  const volume = document.getElementById('volume');
  const volumeImage = document.querySelector('img[src="assets/icons/volume-level-2.svg"]');
  volume.addEventListener('change', () => {
    if (volume.value == 0){
      volumeImage.src = 'assets/icons/volume-level-0.svg'
    }
    else if (volume.value < 33){
      volumeImage.src = 'assets/icons/volume-level-1.svg'
    }
    else if (volume.value < 67){
      volumeImage.src = 'assets/icons/volume-level-2.svg'
    }
    else {
      volumeImage.src = 'assets/icons/volume-level-3.svg'
    }
  });

  // audio
  const sound = document.querySelector('audio');
  const playSound = document.querySelector('button');
  const confetti = new JSConfetti();
  playSound.addEventListener('click', () => {
    if (selectedHorn.value == 'party-horn'){
      confetti.addConfetti();
    }
    sound.volume = volume.value / 100;
    sound.src = 'assets/audio/' + selectedHorn.value + '.mp3';
    sound.play();
  });
}