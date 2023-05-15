let currentMusic =0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')){
        music.play()
    }else{
        music.pause()
    }
    playBtn.classList.toggle('pause');
})

//set music

const setMusic = (i) => {
    seekBar.value = 0 //set range slide value = 0
    let song = songs[i]
    currentMusic = i
    music.src = song.path

    songName.innerHTML = song.name
    artistName.innerHTML = song.artist

    currentTime.innerHTML = '00:00'
    setTimeout(() => {
        seekBar.max = music.duration
        musicDuration.innerHTML = formatTime(music.duration)
    },300)

}
setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time/60)
    let sec = Math.floor(time%60)
    if (min<10){
        min = `0${min}`
    }
    if (sec<10){
        sec = `0${sec}`
    }
    return `${min} : ${sec}`
}

//setting seek bar value
setInterval(() => {
    seekBar.value = music.currentTime
    currentTime.innerHTML = formatTime(music.currentTime)
    if(Math.floor(music.currentTime)==Math.floor(seekBar.max)){
        forwardBtn.click()
    }
},500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value
})

const playMusic = () => {
    music.play()
    playBtn.classList.remove('pause')
}

//forward and backward btn functions
forwardBtn.addEventListener('click', () => {
    if (currentMusic>=songs.length - 1){
        currentMusic = 0 
    }else{
        currentMusic++
    }
    setMusic(currentMusic)
    playMusic()
})

backwardBtn.addEventListener('click', () => {
    if (currentMusic<=0){
        currentMusic = songs.length-1 
    }else{
        currentMusic--
    }
    setMusic(currentMusic)
    playMusic()
})