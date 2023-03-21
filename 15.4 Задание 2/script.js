let btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    let width = document.documentElement.clientWidth
    let height = document.documentElement.clientHeight
    alert('Размер экрана: ' + width + 'px х ' + height + 'px')
})