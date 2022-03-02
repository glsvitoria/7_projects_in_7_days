// É possível salvar a imagem do desenho feito em PNG (Opção de funcionalidade do site)

// INITIAL DATA
let currentColor = 'black'
let canDraw = false
let mouseX
let mouseY

let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d')

// EVENTS
let colors = document.querySelectorAll('.colorArea .color')
colors.forEach(item => {
    item.addEventListener('click', colorClickEvent)
})

screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)

let clear = document.querySelector('.clear')
clear.addEventListener('click', clearScreen)

// FUNCTIONS
function colorClickEvent(event) {
    let color = event.target.getAttribute('data-color')
    currentColor = color

    document.querySelector('.color.active').classList.remove('active')

    event.target.classList.add('active')
}

function mouseDownEvent(e) {
    canDraw = true

    // Posição inicial do desenho
    mouseX = e.pageX - screen.offsetLeft
    mouseY = e.pageY - screen.offsetTop
}

function mouseMoveEvent(event) {
    if(canDraw){
        draw(event.pageX, event.pageY)
    }
}

function mouseUpEvent() {
    canDraw = false
}

function draw(x, y){
    // Posição final do desenho
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    // DRAW
    ctx.beginPath()
    ctx.lineWidth = 5 // largura da linha
    ctx.lineJoin = 'round' // formato de bola
    ctx.moveTo(mouseX, mouseY) // início da linha
    ctx.lineTo(pointX, pointY) // final da linha
    ctx.closePath()
    ctx.strokeStyle = currentColor // cor da linha
    ctx.stroke()

    mouseX = pointX
    mouseY = pointY
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}