

// Placeholder for future volume control functionality
document.getElementById('volume').addEventListener('input', function() {
    this.title = this.value;
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
        // wsSendData(JSON.stringify({ action: 'random' }));
        x.style.backgroundPosition = "-4px -188px";     // Not random
    } else {
        // wsSendData(JSON.stringify({ action: 'straight' }));
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

function volumeHover(x) {
    const volume = document.getElementById('volume').value;
    x.title = `${volume}`;
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
let isStarted = false;
function togglePause() {
    const button = document.querySelector('.play-button');
    if (audio.paused) {
        console.log('Play');
        if(!isStarted) {
            const files = getCurrentOrder();
            currentlyPlaying = files[0];
            const newFile = filesList[currentlyPlaying];
            const url = URL.createObjectURL(newFile);
            audio.src = url;
            audio.play();
            isStarted = true;
        }
        button.style.backgroundPosition = '-50px -4px';
        // button.setAttribute('background-position', '-4px -96px');
        // isPaused = false;
        audio.play();
    } else {
        console.log('Pause');
        button.style.backgroundPosition = '-4px -4px';
        // button.setAttribute('background-position', '-50px -96px');
        // isPaused = true;
        audio.pause();
    }
}

window.onload = function() {
    document.querySelector('#theme-switcher').checked = false;
}


const playPauseButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
// const randomButton = document.getElementById('random');
const trackNameDiv = document.getElementById('track-name');

let isPlaying = false;
let audio = new Audio();
audio.volume = 0.2;
document.getElementById('volume').value = 20;

function wsConnect() {
    ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function() {
        console.log("Connected to the server");
    };

    ws.onclose = function() {
        console.log("Connection lost, reconnect in 1 second");
        setTimeout(wsConnect, 1000);
    };

    ws.onerror = function(error) {
        console.error("WebSocket error: ", error);
        ws.close();
    };

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
}

function setAlbumCover(imageData) {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(imageData)));
    const imgSrc = `data:image/jpeg;base64,${base64String}`;
    document.getElementById('album-cover').src = imgSrc;
}

// playPauseButton.addEventListener('click', () => {
//     isPlaying = !isPlaying;
//     // playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
//     if (isPlaying) {
//         audio.play();
//     } else {
//         audio.pause();
//     }
// });

// nextButton.addEventListener('click', () => {
//     // wsSendData(JSON.stringify({ action: 'next' }));
// });

function nextTrack() {
    const files = getCurrentOrder();
    const index = files.indexOf(currentlyPlaying);
    // console.log(currentlyPlaying);
    // console.log(files);
    if(index+1 < files.length) {
        currentlyPlaying = files[index+1];
    } else {
        currentlyPlaying = files[0];
    }
    const newFile = filesList[currentlyPlaying];
    // console.log(currentlyPlaying);
    // console.log(newFile);
    const url = URL.createObjectURL(newFile);
    // const audioPlayer = document.getElementById('audio-player');
    audio.src = url;
    audio.play();
}

prevButton.addEventListener('click', () => {
    // wsSendData(JSON.stringify({ action: 'prev' }));
    const files = getCurrentOrder();
    const index = files.indexOf(currentlyPlaying);
    console.log(currentlyPlaying);
    console.log(files);
    if(index > 0) {
        currentlyPlaying = files[index-1];
    } else {
        currentlyPlaying = files[files.length-1];
    }
    const newFile = filesList[currentlyPlaying];
    console.log(currentlyPlaying);
    console.log(newFile);
    const url = URL.createObjectURL(newFile);
    // const audioPlayer = document.getElementById('audio-player');
    audio.src = url;
    audio.play();
});

// randomButton.addEventListener('click', () => {
//     wsSendData(JSON.stringify({ action: 'random' }));
// });

audio.addEventListener('ended', function() {
    // wsSendData(JSON.stringify({ action: 'next' }));
    nextTrack();
    // console.log("Warning: unimplemented!");
})

audio.addEventListener('timeupdate', function() {
    if (audio.currentTime/audio.duration == 0.9) {
        console.log(`The audio is 90% played ${audio.currentTime}`);
    }
})

// From temp:
let filesList = {};
let currentlyPlaying = null;
const playlist = document.getElementById('playlist');
let draggedItem = null;

playlist.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.target.style.opacity = 0.5;
});

playlist.addEventListener('dragend', (e) => {
    e.target.style.opacity = "";
});

playlist.addEventListener('dragover', (e) => {
    e.preventDefault();
});

playlist.addEventListener('dragenter', (e) => {
    if (e.target.classList.contains('playlist-item')) {
        e.target.style.border = "2px dashed #000";
    }
});

playlist.addEventListener('dragleave', (e) => {
    if (e.target.classList.contains('playlist-item')) {
        e.target.style.border = "";
    }
});

playlist.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('playlist-item')) {
        e.target.style.border = "";
        const rect = e.target.getBoundingClientRect();
        const offset = e.clientY - rect.top;
        const height = rect.height;
        if (offset < height / 2) {
            playlist.insertBefore(draggedItem, e.target);
        } else {
            playlist.insertBefore(draggedItem, e.target.nextSibling);
        }
    }
});

// Function to get the current order of items
function getCurrentOrder() {
    const items = playlist.getElementsByClassName('playlist-item');
    const order = [];
    for (let item of items) {
        order.push(item.getElementsByClassName("playlist-item-name")[0].innerHTML.trim());
    }
    return order;
}

function printPlayList() {
    const elements = getCurrentOrder();
    console.log(elements);
}

function addItem(itemName, file) {
    if(filesList.hasOwnProperty (itemName)) {
        return;
    }
    filesList[itemName] = file;
    const newItem = document.createElement('div');
    newItem.className = 'playlist-item';
    // newItem.textContent = itemName;
    newItem.draggable = true;
    const itemPlay = document.createElement('button');
    itemPlay.className = "playlist-play-button";
    itemPlay.innerHTML = "Play";
    itemPlay.addEventListener('click', () => {
        const url = URL.createObjectURL(file);
        console.log(file);
        // const audioPlayer = document.getElementById('audio-player');
        audio.src = url;
        isStarted = true;
        audio.play();
        currentlyPlaying = itemName;
    });
    const itemText = document.createElement('div');
    itemText.className = "playlist-item-name";
    itemText.innerHTML = itemName;
    const itemDelete = document.createElement('button');
    itemDelete.className = "delete-button";
    itemDelete.innerHTML = "Delete";
    itemDelete.addEventListener('click', () => {
        document.getElementById('playlist').appendChild(newItem);
    });
    newItem.appendChild(itemPlay);
    newItem.appendChild(itemText);
    newItem.appendChild(itemDelete);
    document.getElementById('playlist').appendChild(newItem);
}

function openFiles() {
    // const directoryHandle = await window.showDirectoryPicker();
    input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.mp3';
    input.addEventListener('change', (event) => {
        const files = event.target.files;
        // const fileList = document.getElementById('file-list');
        for (const file of files) {
            // const listItem = document.createElement('li');
            // listItem.textContent = file.name;
            addItem(file.name, file);
            // fileList.appendChild(listItem);
        }
    });
    input.click();
    console.log(filesList);
}
