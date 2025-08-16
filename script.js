console.log("started writing js for this web page ")



// function of getting  list of songs 
async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")

    let response = await a.text();

    // console.log(response);

    let div = document.createElement("div");

    div.innerHTML = response;

    let as = div.getElementsByTagName
        ("a")
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

const playmusic = (track)=>{
    // let audio = new Audio("/songs/" + track.trim());
    // audio.play()

    currentsong.src = "/songs/" + track;
    currentsong.play();
}

    let currentsong = new Audio();


async function main() {


    // sonngs list 

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

    Array.from(document.querySelector(".song-list").getElementsByTagName("li")
    ).forEach(e => {
        e.addEventListener("click",()=> {
            console.log(e.querySelector(".music-logo h5").innerHTML)
            playmusic(e.querySelector(".music-logo h5").innerHTML)
    })
})


// playing first audio

var audio = new Audio(songs[0]);
audio.play();


audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    console.log(duration);
})

}

main();