console.log("started writing js for this web page ")
let play = document.querySelector("#play");
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");


function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00"; // handle NaN case
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    // Add leading zero if less than 10
    if (secs < 10) secs = "0" + secs;
    if (minutes < 10) minutes = "0" + minutes;

    return `${minutes}:${secs}`;
}




// function of getting  list of songs 
async function getsongs() {
    let a = await fetch("http://127.0.0.1:5501/songs/")

    let response = await a.text();

    // console.log(response);

    let div = document.createElement("div");

    div.innerHTML = response;

    let as = div.getElementsByTagName("a")
    // console.log(as);

    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {

            songs.push(element.href.split("/songs/")[1])

        }
    }

    return (songs)
}

const playmusic = (track, pause = false) => {


    currentsong.src = "/songs/" + encodeURI(track);
    if (!pause) {
        currentsong.play();
        play.src = "./assets/pause.svg"

    }

    document.querySelector(".song-info").innerHTML = track;
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
}

let currentsong = new Audio();


async function main() {




    // songs list 

    let songs = await getsongs();
    console.log(songs)

    // making library

    let songul = document.querySelector(".song-list").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songul.innerHTML = songul.innerHTML +
            ` <li>
                    <div class="music-logo">
                    <i class="fa-solid fa-music fa-xl" style="color: #f1f2f3;"></i>
                    <h5>${song.replaceAll("%20", " ")}</h5>
                    </div>
                    <div class="playnow">
                        <h5>Play Now</h5>
                        <button><i class="fa-solid fa-play fa-xl" style="color: #f7f7f8;"></i></button>
                    </div>
                 </li> `;

    }

    //adding intial music 


    playmusic(songs[0], true)

    // Adding event listener to each song 


    Array.from(document.querySelector(".song-list").getElementsByTagName("li")
    ).forEach(e => {
        e.addEventListener("click", () => {
            console.log(e.querySelector(".music-logo h5").innerHTML)
            playmusic(e.querySelector(".music-logo h5").innerHTML)
        })
    })


    //adding eventlister to playbar buttons

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "./assets/pause.svg"
        }
        else {
            currentsong.pause();
            play.src = "./assets/play.svg"
        }
    })
    previous.addEventListener("click", () => {
        playmusic(songs[-1]);
    })


    // time upadte of the song 

    currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration)
        document.querySelector(".song-time").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`;
        document.querySelector(".circle").style.left=( 4 +((currentsong.currentTime/currentsong.duration)*100 )*.9+"%");
    })


}

main();

