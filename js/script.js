import { playlist } from './playlist.js';
import { toggleNavigation } from './navigation.js';
import { toggleTheme } from './theme.js';

// Navigation Toggle
toggleNavigation();

// Change Theme
toggleTheme();


// Music Player

const audio = document.querySelector('#audio');
const cover = document.querySelector('#cover');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const btnPlayPause = document.querySelector('#btnPlayPause');
const btnPlayPauseIcon = document.querySelector('#btnPlayPause i');
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');
const btnRandom = document.querySelector('#btnRepeat');
const audioProgress = document.querySelector('#audioProgress');
const currentTimeSpan = document.querySelector('#currentTime');
const totalTimeSpan = document.querySelector('#totalTime');
const playerTitle = document.querySelector('.player__navigation--title');

let songIndex = 0;
let isPlaying = false;
let isRandom = false;

const loadSong = (song) => {
    title.textContent = song.name;
    title.classList.remove('scrolling-text');

    if (title.scrollWidth > 200) {
        title.classList.add('scrolling-text')
        artist.classList.add('pt-6');
    } else {
        title.classList.remove('scrolling-text');
        artist.classList.remove('pt-6');
    }
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.source;
    totalTimeSpan.textContent = song.duration;
}

// Playlist

const playlistContainer = document.querySelector('.playlist__content');

const createPlaylist = () => {
    playlist.forEach((song) => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist__content--item');
        playlistItem.innerHTML = `
                <div class="item__details">
                    <h3>${song.name}</h3>
                    <span>${song.artist}</span>
                </div>
                <span class="item__time">${song.duration}</span>
        `;
        playlistContainer.appendChild(playlistItem);
    });
};

createPlaylist();

const playlistItems = document.querySelectorAll('.playlist__content--item');

const updatePlaylist = (prev, next) => {
    if (prev !== undefined) {
        playlistItems[prev].classList.remove('active');
        playlistItems[prev].children[1].textContent = playlist[prev].duration;
        
        playlistItems[next].classList.add('active');
        playlistItems[next].children[1].textContent = isPlaying? 'Playing' : 'Paused';
    }
}

const changeSong = () => {
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const previewSongIndex = songIndex;
            songIndex = index;
            loadSong(playlist[songIndex]);
            playSong();
            updatePlaylist(previewSongIndex, songIndex);
        });
    });
}


changeSong();
updatePlaylist();

const playSong = () => {
    isPlaying = true;
    playerTitle.textContent = 'Now Playing';
    btnPlayPauseIcon.classList.replace('bx-play', 'bx-pause');
    updatePlaylist(songIndex, songIndex);
    audio.play();
}

const pauseSong = () => {
    isPlaying = false;
    playerTitle.textContent = 'Paused';
    btnPlayPauseIcon.classList.replace('bx-pause', 'bx-play');
    updatePlaylist(songIndex, songIndex);
    audio.pause();
}

const nextSong = () => {
    const prevSongIndex = songIndex;
    songIndex++;
    if(songIndex > playlist.length - 1) {
        songIndex = 0;
    }
    updatePlaylist(prevSongIndex, songIndex);
    loadSong(playlist[songIndex]);
    playSong();
}

const prevSong = () => {
    const prevSongIndex = songIndex;
    songIndex--;
    if(songIndex < 0) {
        songIndex = playlist.length - 1;
    }
    updatePlaylist(prevSongIndex, songIndex);
    loadSong(playlist[songIndex]);
    playSong();
}

const randomSong = () => {
    isRandom = !isRandom;
    btnRandom.classList.toggle('active');
}

btnPlayPause.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

btnNext.addEventListener('click', nextSong);

btnPrev.addEventListener('click', prevSong);

btnRandom.addEventListener('click', randomSong);

audio.addEventListener('ended', () => {
    if(isRandom) {
        const prevSongIndex = songIndex;
        songIndex = Math.floor(Math.random() * playlist.length);
        updatePlaylist(prevSongIndex, songIndex);
        loadSong(playlist[songIndex]);
        playSong();
    } else {
        nextSong();
    }
});

loadSong(playlist[songIndex]);

// Progress Bar

const updateCurrentTime = (e) => {
    const { currentTime } = e.srcElement;
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);
    if(currentTimeSeconds < 10) {
        currentTimeSeconds = `0${currentTimeSeconds}`;
    } else {
        currentTimeSeconds = currentTimeSeconds;
    }
    currentTimeSpan.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
}

const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;

    updateCurrentTime(e);

    const progressPercent = (currentTime / duration) * 100;
    audioProgress.value = progressPercent - 1;
    audioProgress.style.background = `linear-gradient(to right, var(--pink-primary) 0%, var(--pink-secondary) ${progressPercent}%, var(--gray-light) ${progressPercent}%, var(--gray-light) 100%)`;
}

const setProgress = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

audioProgress.addEventListener('click', setProgress);

audio.addEventListener('timeupdate', updateProgress);

// Keyboard Controls

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
        isPlaying ? pauseSong() : playSong();
    } else if(e.code === 'ArrowRight') {
        nextSong();
    } else if(e.code === 'ArrowLeft') {
        prevSong();
    } else if(e.code === 'KeyR') {
        randomSong();
    }
});