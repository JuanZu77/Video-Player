
//Consultas sobre esta API (video) --> https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs


//DOM --------------------------------------------------------------
const video = document.querySelector(".video");
const playButton = document.querySelector(".play");
const playButtonIcon = playButton.querySelector("i"); // para acceder iconos pause y play en la function playButtonToggleIcon()
const stopButton = document.querySelector(".stop");
const progressBar = document.querySelector(".progress");
const timestamp = document.querySelector(".timestamp");

//LISTEN FOR EVENTS ------------------------------------------------
video.addEventListener("click", playPauseVideo);
video.addEventListener("timeupdate", updateVideoProgress);

progressBar.addEventListener("change", setVideoProgress);

playButton.addEventListener("click", playPauseVideo);
stopButton.addEventListener("click", stopVideo);




//UTILITY FUNCTIONS ------------------------------------------------
function playPauseVideo() {
    //   if (video.paused) {
    //     video.play();
    //   } else {
    //     video.pause();
    //   }

    //Aclarar: paused es una Propiedad que tiene play y pause.

    //otra manera de hacerlo sin el If --> el OPERADOR TERNARIO
    /* El operador condicional (ternario) 
               Es el único operador en JavaScript que tiene tres operandos. 
               Este operador se usa con frecuencia como atajo para la instrucción if.*/
    video[video.paused ? "play" : "pause"]()
    playButtonToggleIcon()
}

function playButtonToggleIcon() {
    if (video.paused) {
        playButtonIcon.classList.remove("fa-pause")
        playButtonIcon.classList.add("fa-play")
    } else {
        playButtonIcon.classList.remove("fa-play")
        playButtonIcon.classList.add("fa-pause")
    }
}


function stopVideo() {
    //esta API (para videos) no tiene la propiedad stop --> video.stop()
    //Entones tiene el stopMedia() que pausa y luego estable el currentTime a Cero
    video.pause();
    video.currentTime = 0;
    playButtonToggleIcon(); //actualiza el icono a play luego del stop

    progressBar.value = 0; //actualiza el progreso de la barra al inicio
}



function setVideoProgress() {
    //Actualizar progreso con el CLick -- > progressBar (EL total de la Barra) * video.duration (el momento del video) / 100 (el total) 
    //value (es una propiedad)  ---- duration (es una propiedad)
    video.currentTime = Number((progressBar.value * video.duration) / 100);
    //Number: redondear el valor 1 a 100
}


function updateVideoProgress() {
    video.currentTime = Number((progressBar.value * video.duration) / 100);

}


function updateVideoProgress() {
    progressBar.value = Number((video.currentTime / video.duration) * 100)

    /*Math.floor es un método de la librería Math de Javascript utilizado 
    para redondear a la baja un número con decimales. 
    Por ejemplo Math.floor (1.6); nos devolvería 1 ya que es el integer 
    más cercano redondeando a la baja 1.6    */

    // Minutos dividido 60 (tiene 60 seg) 
    let minutes = Math.floor(video.currentTime / 60)

    //Segundos utilizamos el resto(%) porque debe calcularse cuantos segundos "restan" para el siguiente minuto
    let seconds = Math.floor(video.currentTime % 60)

    //Este if para que tome Minutos y Segundos con 00:00. Si no hacemos esto queda 0:0
    if (minutes < 10) {
        minutes = "0" + minutes //Si minutos es 8 le agregamos el "0" adelante para que se vea 08:
    }
    if (seconds < 10) {
        seconds = "0" + seconds // si segundos es Menor a 10, por ejemplo: 9 le agreamos el "0". Si tenemos 1 minuto con 9 segundos se vea 01:09
    }
    timestamp.textContent = `${minutes}:${seconds}` //Actualizamos el tiempo actual
}
