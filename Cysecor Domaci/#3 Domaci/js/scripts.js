
document.getElementById('w_height').innerText = window.innerHeight;
document.getElementById('w_width').innerText = window.innerWidth;
window.addEventListener('resize', event => {
    let height = document.getElementById('w_height');
    let width = document.getElementById('w_width');
    height.innerText = event.target.innerHeight;
    width.innerText = event.target.innerWidth;
});

let klnDiv = document.querySelector('.kln');
klnDiv.addEventListener('click', event => {
    let red = parseInt(Math.floor(Math.random() * 256));
    let green = parseInt(Math.floor(Math.random() * 256));
    let blue = parseInt(Math.floor(Math.random() * 256));
    klnDiv.style.backgroundColor = `rgb(${red},${green},${blue})`;
});

let parForKey = document.getElementById('fromKeyboard');
window.addEventListener('keydown', event =>{
    if(parseInt(parForKey.innerText.length) >= 100){
        window.alert("Uneto je previse karaktera!");
        return;
    }
    parForKey.innerText += event.key;
});

let uppDiv = document.querySelector('.upp');
let uppH = document.querySelector('.upp h3');
window.addEventListener('mousemove', event => {
    let x = parseInt(event.clientX);
    let divColor = parseInt((255 * x) / window.innerWidth);
    let textColor = 255 - divColor;

    uppDiv.style.backgroundColor = `rgb(${divColor},${divColor},${divColor})`
    uppH.style.color = `rgb(${textColor},${textColor},${textColor})`
});

let options = document.querySelector('select');
options.addEventListener('change', event => {
    console.log('value: ' + event.target.value);
});

