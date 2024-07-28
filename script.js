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

function toggleTheme() {
    console.log('toggleTheme()');
    const checkbox = document.getElementById('theme-switcher');
    const buttons = document.querySelectorAll('.custom-button');
    const slider = document.querySelector('.theme-slider');
    if (checkbox.checked) {
        console.log('setting dark mode');
        buttons.forEach(button => {
            button.classList.add('fade-out');
            setTimeout(() => {
                button.style.backgroundImage = "url('imgs/controls_dark_mode.png')";
                button.classList.remove('fade-out');
                button.classList.add('fade-in');
            }, 150);
            setTimeout(() => {
                button.classList.remove('fade-in');
            }, 300);
        });
        // buttons.style.backgroundImage = "url('imgs/controls_light_mode.png')";
        slider.setAttribute('title', 'Switch to light mode');
        document.body.classList.toggle('dark-theme');
    } else {
        console.log('setting light mode');
        buttons.forEach(button => {
            button.classList.add('fade-out');
            setTimeout(() => {
                button.style.backgroundImage = "url('imgs/controls_light_mode.png')";
                button.classList.remove('fade-out');
                button.classList.add('fade-in');
            }, 150);
            setTimeout(() => {
                button.classList.remove('fade-in');
            }, 300);
        });
        // buttons.style.backgroundImage = "url('imgs/controls_dark_mode.png')";
        slider.setAttribute('title', 'Switch to dark mode');
        document.body.classList.toggle('dark-theme');
    }
}

let isMuted = false;
function toggleMute() {
    console.log('toggleMute()');
    const button = document.querySelector('.mute-button');
    if (isMuted) {
        button.style.backgroundPosition = '-5px -97px';
        // button.setAttribute('background-position', '-4px -96px');
        isMuted = false;
    } else {
        button.style.backgroundPosition = '-51px -97px';
        // button.setAttribute('background-position', '-50px -96px');
        isMuted = true;
    }
}

let isPaused = false;
function togglePause() {
    console.log('toggleMute()');
    const button = document.querySelector('.play-button');
    if (isPaused) {
        button.style.backgroundPosition = '-5px -5px';
        // button.setAttribute('background-position', '-4px -96px');
        isPaused = false;
    } else {
        button.style.backgroundPosition = '-51px -5px';
        // button.setAttribute('background-position', '-50px -96px');
        isPaused = true;
    }
}

window.onload = function() {
    document.querySelector('#theme-switcher').checked = false;
}
