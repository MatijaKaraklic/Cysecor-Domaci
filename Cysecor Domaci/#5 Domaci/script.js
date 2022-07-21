let boredButtonPlus = document.getElementById('btnPlus');
let borderButtonMinus = document.getElementById('btnMinus');
let border = document.querySelector('.border-line');
let borderInput = document.querySelector('.section2 input');
let animationWidth = 0;

let slideImgButton = document.querySelectorAll('.btn-images button');
let slideImages = document.querySelectorAll('.images img');

let progressBtn = document.querySelector('.section3 button');
let progressBar = document.querySelector('.progress');


// FUNCTIONS
const resetH1 = () => {
    let textTag = document.querySelector('.section h1');
    let text = textTag.textContent;

    let splittedText = text.split('');

    textTag.innerHTML = '';
    for(let i = 0; i < splittedText.length; i++){
        if(splittedText[i] === ' '){
            splittedText[i] = '&nbsp;';
        }
        textTag.innerHTML += `<span>${splittedText[i]}</span>`;
    }
}
const runAnimatedText = () => {
    let textTag = document.querySelector('.section h1');
    let k = 0;
    let spans = textTag.querySelectorAll('span');
    let interval = setInterval(() => {
        spans[k].className = 'fadeMove';
        k++;
        if(k === spans.length) clearInterval(interval);
    }, 70);
}
const borderScale = wl => {
    if(wl < -100 || wl > 100){
        window.alert('% treba biti izmedju 0 i 100');
        return;
    }
    let bWl = parseInt(border.style.width.substring(0));
    if(bWl + wl >= 100) border.style.width = '100%';
    else border.style.width = (bWl + wl) + '%';
}
const imageAnimation = index =>{
    if(slideImages[index].classList.contains('animated')) slideImages[index].classList.remove('animated');
    else slideImages[index].classList.add('animated');
}



// --- CODE --------------------------------------------------------



// Animated text
document.getElementById('runAnimatedText').addEventListener('click', event => {
    resetH1();
    runAnimatedText();
});

// Border
boredButtonPlus.addEventListener('click', event => {
    borderScale(parseInt(borderInput.value));
});
borderButtonMinus.addEventListener('click', event => {
    borderScale(parseInt(borderInput.value) * -1);
});

slideImgButton[0].addEventListener('click', event => {
    imageAnimation(0);
});
slideImgButton[1].addEventListener('click', event => {
    imageAnimation(1);
});

progressBtn.addEventListener('click', event => {
    let wid = parseInt(progressBar.style.width.substring(0));
    if(wid >= 100) progressBar.style.width = '0%';
    else progressBar.style.width = '100%';
});







/**
const borderScrollAnimation = () => {

    // Ovaj deo koda sam napravio za border da se povecava tako sto gleda koliko sam % do kraja stranice
    // ti. to sam izracunao preko proporcije i samo sam toliko % stvatio borderu
    let h = parseInt(this.scrollY);
    let maxH = parseInt(document.body.scrollHeight) - parseInt(window.innerHeight);
    let x = (100 * h) / maxH;

    border.style.width = x + '%';



    //console.log('Height: ' + this.scrollY + ' MaxHeight: ' + document.body.scrollHeight + ' Inner: ' + window.innerHeight);

    /*
    if(this.oldScroll > this.scrollY){
        // Ka gode
        animationWidth -= 1;
    }
    else{
        // Ka dole
        animationWidth += 1;
    }

    if(animationWidth >= 100){
        animationWidth = 100;
    }
    if(animationWidth <= 0){
        animationWidth = 0;
    }

    border.style.width = animationWidth + '%';
    
    this.oldScroll = this.scrollY;
    
}
*/

