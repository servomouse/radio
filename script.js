document.getElementById('theme-switcher').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});

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
const muteButton = document.getElementById('mute');
let isMuted = false;

muteButton.addEventListener('click', function() {
isMuted = !isMuted;
muteButton.textContent = isMuted ? '' : '';
console.log('Muted:', isMuted);
});

function toggleTitle() {
    console.log('toggleTitle()');
    const checkbox = document.getElementById('theme-switcher');
    const slider = document.querySelector('.slider');
    if (checkbox.checked) {
        slider.setAttribute('title', 'Switch to light mode');
    } else {
        slider.setAttribute('title', 'Switch to dark mode');
    }
}