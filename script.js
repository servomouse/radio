// document.getElementById('theme-switcher').addEventListener('click', function() {
//     document.body.classList.toggle('dark-theme');
//     document.body.classList.toggle('light-theme');
// });

// Placeholder for future volume control functionality
document.getElementById('volume').addEventListener('input', function() {
    let val = this.value/100;
    console.log('Volume level:', val);
    audio.volume = val;
});


// Placeholder for album cover functionality
const albumCover = document.getElementById('album-cover');
albumCover.src = 'placeholder.png'; // Set this to the path of your placeholder image

// Function to update album cover (to be implemented later)
function updateAlbumCover(imageUrl) {
    albumCover.src = imageUrl || 'placeholder.png';
}

// Mute button functionality
// const muteButton = document.getElementById('mute');

// muteButton.addEventListener('click', function() {
// isMuted = !isMuted;
// muteButton.textContent = isMuted ? '' : '';
// console.log('Muted:', isMuted);
// });

let randomToggled = false;

function toggleRandom(x) {
    console.log('toggleRandom()');
    // const randButton = document.querySelectorAll('.rand-button');
    randomToggled = !randomToggled;
    if (randomToggled) {
        ws.send(JSON.stringify({ action: 'random' }));
        x.style.backgroundPosition = "-4px -188px";     // Not random
    } else {
        ws.send(JSON.stringify({ action: 'straight' }));
        x.style.backgroundPosition = "-50px -188px";    // Random
    }
}

const buttonBgLight = "#e4e4e4";
const buttonBgLightHover = "#0056b3";
const buttonBgDark = "#444";
const buttonBgDarkHover = "#0056b3";

function toggleTheme() {
    console.log('toggleTheme()');
    const checkbox = document.getElementById('theme-switcher');
    const buttons = document.querySelectorAll('.custom-button');
    const slider = document.querySelector('.theme-slider');
    if (checkbox.checked) {
        console.log('setting dark mode');
        buttons.forEach(button => {
            button.style.backgroundImage = "url('imgs/controls_dark_mode.png')";
            button.style.backgroundColor = buttonBgDark;
        });
        slider.setAttribute('title', 'Switch to light mode');
        document.body.classList.toggle('dark-theme');
    } else {
        console.log('setting light mode');
        buttons.forEach(button => {
            button.style.backgroundImage = "url('imgs/controls_light_mode.png')";
            button.style.backgroundColor = buttonBgLight;
        });
        slider.setAttribute('title', 'Switch to dark mode');
        document.body.classList.toggle('dark-theme');
    }
}

function buttonHover(x) {
    if (document.getElementById('theme-switcher').checked) {    // Dark mode
        x.style.backgroundImage = "url('imgs/controls_hover.png')";
        // x.style.backgroundColor = buttonBgDarkHover;
    } else {
        // x.style.backgroundColor = buttonBgLightHover;
        x.style.backgroundImage = "url('imgs/controls_hover.png')";
    }
}

function buttonUnhover(x) {
    if (document.getElementById('theme-switcher').checked) {    // Dark mode
        x.style.backgroundImage = "url('imgs/controls_dark_mode.png')";
        // x.style.backgroundColor = buttonBgDark;
    } else {
        // x.style.backgroundColor = buttonBgLight;
        x.style.backgroundImage = "url('imgs/controls_light_mode.png')";
    }
}

let isMuted = false;
function toggleMute() {
    console.log('toggleMute()');
    const button = document.querySelector('.mute-button');
    if (isMuted) {
        button.style.backgroundPosition = '-4px -96px';
        // button.setAttribute('background-position', '-4px -96px');
        isMuted = false;
    } else {
        button.style.backgroundPosition = '-50px -96px';
        // button.setAttribute('background-position', '-50px -96px');
        isMuted = true;
    }
}

let isPaused = false;
function togglePause() {
    console.log('togglePlay()');
    const button = document.querySelector('.play-button');
    if (isPaused) {
        button.style.backgroundPosition = '-4px -4px';
        // button.setAttribute('background-position', '-4px -96px');
        isPaused = false;
    } else {
        button.style.backgroundPosition = '-50px -4px';
        // button.setAttribute('background-position', '-50px -96px');
        isPaused = true;
    }
}

window.onload = function() {
    document.querySelector('#theme-switcher').checked = false;
}


const ws = new WebSocket('ws://localhost:3000');
const playPauseButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
// const randomButton = document.getElementById('random');
const trackNameDiv = document.getElementById('track-name');

let isPlaying = false;
let audio = new Audio();
audio.volume = 0.2;

ws.onmessage = (event) => {
    if (typeof event.data === 'string') {
        const data = JSON.parse(event.data);
        if (data.type === 'track') {
            trackName = data.trackName;
            trackNameDiv.textContent = `Current Track: ${trackName}`;
        } else if (data.type === 'meta') {
            document.getElementById('artist-name').textContent = data.artist;
            document.getElementById('track-name').textContent = data.title;
            document.getElementById('album-name').textContent = data.album;
            if (data.album_cover) {
                setAlbumCover(data.album_cover);
            }
        }
    } else {
        const blob = new Blob([event.data], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        audio.src = url;
        if (isPlaying) {
            audio.play();
        }
    }
};

function setAlbumCover(imageData) {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(imageData)));
    const imgSrc = `data:image/jpeg;base64,${base64String}`;
    document.getElementById('album-cover').src = imgSrc;
}

playPauseButton.addEventListener('click', () => {
    isPlaying = !isPlaying;
    // playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
    if (isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
});

nextButton.addEventListener('click', () => {
    ws.send(JSON.stringify({ action: 'next' }));
});

prevButton.addEventListener('click', () => {
    ws.send(JSON.stringify({ action: 'prev' }));
});

// randomButton.addEventListener('click', () => {
//     ws.send(JSON.stringify({ action: 'random' }));
// });

audio.addEventListener('ended', function() {
    ws.send(JSON.stringify({ action: 'next' }));
})

audio.addEventListener('timeupdate', function() {
    if (audio.currentTime/audio.duration >= 0.9) {
        console.log(`The audio is 90% played ${audio.currentTime}`);
    }
})