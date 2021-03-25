const playerContainer = document.querySelector(".player");
const video = document.querySelector(".video");
const playerStart = document.querySelector(".player__start");
const playerPlayback = document.querySelector(".player__playback");
const playerWrapper = document.querySelector(".player__wrapper");
const playerVolumeIcon = document.querySelector(".player__volume-icon");
const playerVolumeBar = document.querySelector(".player__volume");
const playerVolumeCircle = document.querySelector(".player__volume-button");
const playerVideoCircle = document.querySelector(".player__playback-button");
const progressBar = document.querySelector(".player__playback-line");
let startVolume = 0;
let currentVolume;

video.onplay = () => {
  playerContainer.classList.add("player_active");
  playerContainer.classList.add("player_paused");
};
video.onpause = () => {
  playerContainer.classList.remove("player_active");
  playerContainer.classList.remove("player_paused");
};

const handleStart = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const handleDuration = (e) => {
  const barSize = parseInt(getComputedStyle(playerPlayback).width);
  const circleWidth = parseInt(getComputedStyle(playerVideoCircle).width);
  let mouseX, newTime;
  console.log();

  if (e.offsetX < 0) {
    mouseX = 0;
  } else {
    let newSize = e.offsetX + circleWidth / 2;
    if (newSize > barSize) {
      mouseX = barSize;
    } else {
      mouseX = newSize;
    }
  }

  if (e.target != playerVideoCircle) {
    newTime = (mouseX * video.duration) / barSize;

    video.currentTime = newTime;
  }
};

const updateTime = () => {
  let orangeBar = video.currentTime / video.duration;
  progressBar.style.width = orangeBar * 100 + "%";

  console.log(orangeBar);
  console.log(progressBar);

  if (video.ended) {
    video.currentTime = 0;
    playerContainer.classList.remove("player_active");
    playerContainer.classList.remove("player_paused");
  }
};

const changeCirclePosition = (percent) => {
  playerVolumeCircle.style.left = `${percent}%`;
};

const toggleSound = () => {
  playerVolumeIcon.classList.toggle("muted");
  console.log(video.volume);
  if (video.volume === 0) {
    console.log(currentVolume);
    video.volume = currentVolume;
    changeCirclePosition(currentVolume * 100);
    video.muted = false;
  } else {
    currentVolume = video.volume;
    video.volume = startVolume;
    video.muted = true;
    changeCirclePosition(0);
  }
};

const changeVolume = (e) => {
  const currentTarget = e.currentTarget;
  const left = currentTarget.getBoundingClientRect().left;
  const right = currentTarget.getBoundingClientRect().right;
  const width = right - left;
  const newPosition = e.pageX - left;
  const clickedPos = (newPosition / width) * 100;

  playerVolumeIcon.classList.remove("muted");
  if (clickedPos < 100 && clickedPos > 0) {
    video.volume = clickedPos / 100;
    changeCirclePosition(clickedPos);
  }
};

playerVolumeIcon.addEventListener("click", toggleSound);
playerVolumeBar.addEventListener("click", changeVolume);
playerStart.addEventListener("click", handleStart);
playerWrapper.addEventListener("click", handleStart);
playerPlayback.addEventListener("click", handleDuration);
video.addEventListener("timeupdate", updateTime);
