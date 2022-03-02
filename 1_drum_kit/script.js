// TECLADO
const input = document.querySelector('#input')

document.body.addEventListener('keyup', (event) => {

    if(!input === document.activeElement){
        playSound(event.code.toLowerCase())
    } // Bateria não tocar enquanto o input estiver com foco
    
})

function playSound(sound, count) {
    let audioElement = document.querySelector(`#s_${sound}`)
    let keyElement = document.querySelector(`div[data-key="${sound}"]`)

    if(audioElement){
        audioElement.currentTime = 0 // Fazer com que se ele for clicado seguidamente ele zera antes de tocar novamente para não ficar bugado
        audioElement.play()
    }

    if(keyElement){
        keyElement.classList.add('active')
        setTimeout(() => {
            keyElement.classList.remove('active')
        }, 100)
    }
}

// INPUT
const playBtn = document.querySelector('.composer button')
    .addEventListener('click', () => {
    let song = document.querySelector('#input').value 

    if(song !== ''){
        let songSplit = song.split('')
        
        playComposition(songSplit)
    }

    })

function playComposition(songArray) {
    let wait = 0

    for(let beat of songArray){

        setTimeout(() => {
            playSound(`key${beat}`)
        }, wait); // Forma para que os sons não sejam dados plays um atrás do outro no mesmo segundo

        wait += 250

    }
}