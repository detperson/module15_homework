const wsUrl = 'wss://echo-ws-service.herokuapp.com'

const output = document.querySelector('.output')


const btnOpen = document.querySelector('.btn--open')
const btnClose = document.querySelector('.btn--close')
const btnSend = document.querySelector('.btn--send')
const btnGeo = document.querySelector('.btn--geo')
const inp = document.querySelector('.input1')


let websocket

function writeToScreen(message) {
    output.insertAdjacentHTML('beforeend', message)
}

btnOpen.addEventListener('click',() => {
    websocket = new WebSocket(wsUrl)
    websocket.onopen = function(evt) {
        writeToScreen(
            '<p>СОЕДИНЕНИЕ ОТКРЫТО!</p>'
        )
    }
    websocket.onclose = function(evt) {
        writeToScreen(
            '<p>СОЕДИНЕНИЕ ЗАКРЫТО!</p>'
        )
    }
    websocket.onmessage = function(evt) {
        writeToScreen(
            '<p class="output__message-anv">Ответ Серавера: ' + evt.data + '</p>'
        )
    }
    websocket.onerror = function(evt) {
        writeToScreen(
            '<span style="color: red;">ERROR: ' + evt.data + '</span>'
        )
    }
})

btnClose.addEventListener('click', () => {
    websocket.close()
    websocket = null
})

btnSend.addEventListener('click', () => {
    const mes = inp.value
    writeToScreen('<p class="output__message">Я: ' + mes + '</p>')
    websocket.send(mes)
    inp.value = ""
})

// Определение геопозиции

// Функция срабатывающая при усешном получении геолокации
function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const urlMap = `https://www.openstreetmap.org/#map=16/${latitude}/${longitude}`

    writeToScreen(`<p class="output__message" style="text-align: right">Широта: ${latitude} Долгота: ${longitude}<br>
        <a href=${urlMap} target="_blank">Показать на карте</a></p>`)
}

// Функция срабатывающая при ошибке
function error(err) {
    writeToScreen('<p class="output__message" style="color: red">' + `ERROR(${err.code}): ${err.message}` + '</p>')
}

btnGeo.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        writeToScreen('<p class="output__message">Гео: Определение местоположения...</p>')
        navigator.geolocation.getCurrentPosition(success, error)
    } else {
        writeToScreen('<p class="output__message" style="color: red">Гео: Геолокация не поддерживается вашим браузером</p>')
    }
})


