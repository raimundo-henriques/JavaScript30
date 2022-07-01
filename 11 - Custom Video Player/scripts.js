// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build our functions
function togglePlay() {
  if (video.paused) {
    video.play()
  } else {
    video.pause();
  }
};

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
};

let isChanging;

function handleRangeUpdate() {
  isChanging = true;
  video[this.name] = this.value;
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Add eventlisteners
toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
  range.addEventListener('mouseup', () => {isChanging = false});
  range.addEventListener('mouseout', () => {isChanging = false});
})

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event) );
progress.addEventListener('mousedown', () => {mousedown = true});
progress.addEventListener('mouseup', () => {mousedown = false});
