// document.getElementById('theme-switcher').addEventListener('click', function() {
//     document.body.classList.toggle('dark-theme');
//     document.body.classList.toggle('light-theme');
// });

// Placeholder for future volume control functionality
document.getElementById('volume').addEventListener('input', function() {
    console.log('Volume level:', this.value);
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
        x.style.backgroundImage = "url('imgs/controls_dark_mode_hover.png')";
        // x.style.backgroundColor = buttonBgDarkHover;
    } else {
        // x.style.backgroundColor = buttonBgLightHover;
        x.style.backgroundImage = "url('imgs/controls_light_mode_hover.png')";
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
    console.log('toggleMute()');
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

const bs = 43;  // Button size
const bc = Math.ceil(buttonSize/2);   // Button center
const bw = 3;  // Border width
const column = [bw, (2 * bw) + bs];
const row = [bw, (2 * bw) + bs, (3 * bw) + (2 * bs), (4 * bw) + (3 * bs)];
const play_coords     = [row[0], column[0]];
const pause_coords    = [row[0], column[1]];
const next_coords     = [row[1], column[0]];
const prev_coords     = [row[1], column[1]];
const volume_coords   = [row[2], column[0]];
const mute_coords     = [row[2], column[1]];
const dounload_coords = [row[3], column[0]];
const upload_coords   = [row[3], column[1]];
// document.querySelector('#prev').style.backgroundPosition = `-${prev_coords[0]}px -${prev_coords[1]}px`;
// document.querySelector('#play').style.backgroundPosition = `-${play_coords[0]}px -${play_coords[1]}px`;
// document.querySelector('#next').style.backgroundPosition = `-${next_coords[0]}px -${next_coords[1]}px`;
// document.querySelector('#mute-button').style.backgroundPosition = `-${volume_coords[0]}px -${volume_coords[1]}px`;
// document.querySelector('#download').style.backgroundPosition = `-${dounload_coords[0]}px -${dounload_coords[1]}px`;
// document.querySelector('#upload').style.backgroundPosition = `-${upload_coords[0]}px -${upload_coords[1]}px`;
