
const search = document.querySelector('.search-btn')
const apiKey = "fe2f137f77d4c949d03fcabdd58b67a8";
const bodySection = document.querySelector('.body-section')
const bodyImg = document.querySelector('.body-img')
const bodyTemperature = document.querySelector('.temperature')
const bodyClimate = document.querySelector('.climate')
const footerSection = document.querySelector('.footer-section')
const speed = document.querySelector('.speed')
const humidity = document.querySelector('.humidity')
const temperature = document.querySelector('.temperature')
const climate = document.querySelector('.climate')
const simbol = document.querySelector('.simbol')

const fetchApi = async () => {
    const city = document.querySelector('#input').value
    const responseApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    
    const data = await responseApi.json() 
    console.log(data)
    if(city == ''){
        return
    }
    
    if(data.cod == 404){
        bodySection.style.display = 'flex'
        bodyImg.src = 'img/404.png'
        bodyClimate.innerHTML = 'Oops! Location Not Found!'
        footerSection.style.display = 'none'
        temperature.style.display = 'none'
        simbol.style.dispay = 'none'
    }else{
        temperature.style.display = 'flex'
        bodySection.style.display = 'flex'
        footerSection.style.display = 'flex'
        speed.innerHTML = data.wind.speed + 'Km/h'
        humidity.innerHTML = data.main.humidity + '%'
        // bodyImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        bodyImg.src = setCloud(data.weather[0].main)
        temperature.innerHTML = setTemperature(Math.round(data.main.temp).toString())
        climate.innerHTML = capitalizeFirtsLetter(data.weather[0].description)
    }
}

function setCloud(elem){
    if(elem == 'Mist'){
        return 'img/mist.png'

    }else if(elem == 'Clouds'){
        return 'img/cloud.png'

    }else if(elem == 'Clear'){
        return 'img/clear.png'

    }else if(elem == 'Rain'){
        return 'img/rain.png'

    }else if(elem == 'Storm'){
        return 'img/storm.png'

    }else if(elem == 'Snow'){
        return 'img/snow.png'
    }
}
function setTemperature(elem){
    // let degreesCelcius = String.fromCodePoint(8451) - uma forma de colocar "°C"

    let tempArr = elem.split("")
    let res = []
    for(i = 0; i <= 1; i++){
        res.push(tempArr[i])
    }

    return res.join("") 
}
function capitalizeFirtsLetter(elem){

    return elem.charAt(0).toUpperCase() + elem.slice(1)
}

search.addEventListener('click', fetchApi)


