


// --------------------------------------------------------

let menu = document.querySelector('.header ul');
let button = document.querySelector('.header button');

button.addEventListener('click', () =>{
    if(button.innerText === "MENU"){
        menu.style.display = 'block';
        button.innerText = 'CLOSE';
    }
    else{
        menu.style.display = 'none';
        button.innerText = 'MENU';
    }
});

// --------------------------------------------------------

let leftBtn = document.querySelector('#left-btn');
let rightBtn = document.querySelector('#right-btn');
let pictures = document.querySelectorAll('.slider-images img');

let imgNum = 0;

const moveRight = () => {
    displayNone();
    imgNum++;
    if(imgNum === pictures.length){
        imgNum = 0;
    }
    pictures[imgNum].style.display = 'block';
}
const moveLeft = () => {
    displayNone();
    imgNum--;
    if(imgNum === -1){
        imgNum = pictures.length - 1;
    }
    pictures[imgNum].style.display = 'block';
}

rightBtn.addEventListener('click', moveRight);
leftBtn.addEventListener('click', moveLeft);

const displayNone = () => {
    pictures.forEach(img => {
        img.style.display = 'none';
    });
}

// --------------------------------------------------------

let portfoilioItems = document.querySelectorAll('.portfolio-single-item');

let portfolioButtons = document.querySelectorAll('.portfolio-categories button');
portfolioButtons.forEach(item => {

    item.addEventListener('click', () => {

        let category = item.getAttribute('data-category');

        portfoilioItems.forEach(item => {
            item.style.display = 'none'; 
        });
    
        if(category === 'sve'){
            portfoilioItems.forEach(item => {
                item.style.display = 'block'; 
            });
        }
    
        portfoilioItems.forEach(item => {
            if(item.getAttribute('data-category').includes(category)){
                item.style.display = 'block';
            }
        });
    });
});

// --------------------------------------------------------

let openModalButtons = document.querySelectorAll('.modal-section button');
let arrayOpenMOdalButtons = Array.from(openModalButtons);
openModalButtons.forEach(item => {
    item.addEventListener('click', event => {
        openModal(arrayOpenMOdalButtons.indexOf(event.target));
    });
});

let closeModalButtons = document.querySelectorAll('.popup-modal button');
let arrayCloseMOdalButtons = Array.from(closeModalButtons);
closeModalButtons.forEach(item => {
    item.addEventListener('click', event => {
        closeModal(arrayCloseMOdalButtons.indexOf(event.target));
    });
});

let modalWindow = document.querySelectorAll('.popup-modal');
let overlay = document.querySelector('.overlay');
const openModal = index => {
    modalWindow[index].style.display = 'block';
    overlay.style.display = 'block';
}
const closeModal = index => {
    modalWindow[index].style.display = 'none';
    overlay.style.display = 'none';
}