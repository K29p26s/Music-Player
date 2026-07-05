let songs = [
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    src: "songs/Thousand-Years.mp3",
    img: "images/thousand.jpg"
  },
  {
    title: "I Think They Call This Love",
    artist: "Matthew Ifield",
    src: "songs/i think they call this love.mp3",
    img: "images/i think.jpg"
  },
  {
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    src: "songs/until i found you.mp3",
    img: "images/until.jpg"
  },
  {
    title: "Co2",
    artist: "Prateek Kuhad",
    src: "songs/Co2.mp3",
    img: "images/co2.jpg"
  },
  {
    title: "Night Changes",
    artist: "One Direction",
    src: "songs/night.mp3",
    img: "images/night.jpg"
  },
  {
    title: "Blue",
    artist: "Yung Kai",
    src: "songs/Blue.mp3",
    img: "images/blueee.jpg"
  },
  {
    title: "Die With A Smile",
    artist: "Bruno Mars",
    src: "songs/Die.mp3",
    img: "images/dieee.jpg"
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "songs/perfect.mp3",
    img: "images/perfect.jpg"
  },
  {
    title: "Cinnamon Girl",
    artist: "Lana Del Rey",
    src: "songs/Cinnamon Girl.mp3",
    img: "images/cinnamonnn.jpg"
  },
  {
    title: "Lover",
    artist: "Taylor Swift",
    src: "songs/Lover.mp3",
    img: "images/loverrrr.jpg"
  },
  {
    title: "Summertime Sadness",
    artist: "Lana Del Rey",
    src: "songs/summertime sadness.mp3",
    img: "images/summer.jpg"
  },
];

let currentSong = 0;

let audio = document.getElementById("audio");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");
let current = document.getElementById("current");
let duration = document.getElementById("duration");
let cover = document.getElementById("cover");
let playBtn = document.getElementById("playBtn");

// 🔍 SEARCH FUNCTION
function searchSongs() {
  let input = document.getElementById("search").value.toLowerCase();
  let items = document.querySelectorAll("#playlist li");

  items.forEach((item) => {
    let text = item.innerText.toLowerCase();

    if (text.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Load song
function loadSong(index) {
  currentSong = index;

  audio.src = songs[index].src;
  title.innerText = songs[index].title;
  artist.innerText = songs[index].artist;
  cover.src = songs[index].img;

  playBtn.innerText = "▶";
}

// Click → play
function playSelectedSong(index) {
  loadSong(index);
  audio.play();
  playBtn.innerText = "⏸";
}

// Toggle play/pause
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

// Next
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.innerText = "⏸";
}

// Previous
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.innerText = "⏸";
}

// Progress update
audio.addEventListener("timeupdate", () => {
  let percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;

  current.innerText = formatTime(audio.currentTime);
  duration.innerText = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto next
audio.addEventListener("ended", () => {
  nextSong();
});

// Format time
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return min + ":" + (sec < 10 ? "0" + sec : sec);
}


// Initial load
loadSong(currentSong);