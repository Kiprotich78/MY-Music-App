const rotateDisk = document.querySelector('.disk');
const play = document.querySelector('.playBtn');
const songTitle = document.querySelector('.songTitle');
const artist = document.querySelector('.artist');
const scrollBar = document.querySelector('.ScrollBar');
const startTime = document.querySelector('.startTime');
const endTime = document.querySelector('.endTime');
const disk = document.querySelector('.disk');
const music = document.querySelector('.music');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
let currentMusic = 0;
play.addEventListener('click', () => {
    if(play.className.includes('pause')){
        music.play();
    }
    else{
        music.pause();
    }
    play.classList.toggle('pause');
    rotateDisk.classList.toggle('play');
    
})

const setMusic = (i) =>{
    scrollBar.value = 0;
    let song = myMusic[i];
    music.src = song.path;

    songTitle.innerHTML = song.Titte;
    artist.innerHTML = song.Artist;
    disk.style.backgroundImage = `url('${song.Album}')`;

    setTimeout(() => {
        scrollBar.max = music.duration;
        endTime.innerHTML = formatTime(music.duration);
    }, 5000);
    

}
const goToNext = () =>{
    if(music.currentTime == music.duration){
        if(currentMusic < myMusic.length - 1){
            currentMusic ++;
        }
        else{
            currentMusic = 0;
        }
        setMusic(currentMusic);
        music.play();
    }   
}
function formatTime(time){
    let minutes = Math.floor(time/60);
    if(minutes < 10){
        minutes = `0${minutes}`
    }
    let seconds = Math.floor(time % 60);
    if(seconds < 10){
        seconds = `0${seconds}`;
    }

    return `${minutes} : ${seconds}`;

}
setInterval(() => {
    scrollBar.value = music.currentTime;
    startTime.innerHTML = formatTime(music.currentTime);
    goToNext();
}, 500);

scrollBar.addEventListener('change', () =>{
    music.currentTime = scrollBar.value;
})
next.addEventListener('click', ()=>{
    if(currentMusic < myMusic.length - 1){
        currentMusic ++;
    }
    else{
        currentMusic = 0;
    }
    setMusic(currentMusic);
    music.play();
    console.log(currentMusic);
});
previous.addEventListener('click', () =>{
    if(currentMusic == 0){
        currentMusic = myMusic.length - 1;
    }
    else{
        currentMusic --;
    }
    setMusic(currentMusic);
    music.play();
})
setMusic(0)
