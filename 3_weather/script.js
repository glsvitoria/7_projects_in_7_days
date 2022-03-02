// openweathermap.org

const form = document.querySelector('.busca')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value 
    let inputURL = encodeURI(input) // Corrigindo a forma que é inserida a cidade

    if(input !== ''){
        clearInfo()
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputURL}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                windDeg: json.wind.deg,
                windSpeed: json.wind.speed
            })
        }else {
            showWarning('Não encontramos esta localização')
        }
    }else {
        clearInfo()
    }

})

function showInfo(json){
    showWarning('')

    let title      = document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    let temp       = document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    let tempMax    = document.querySelector('.moreTempInfoMax').innerHTML = `${json.tempMax}`
    let tempMin    = document.querySelector('.moreTempInfoMin').innerHTML = `${json.tempMin}`
    let windSpeed  = document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    let windDeg    = document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg - 90}deg)`
    let img        = document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    let resultado = document.querySelector('.resultado').style.display = 'block'
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo(){
    showWarning('')
    let resultado = document.querySelector('.resultado').style.display = 'none'
}