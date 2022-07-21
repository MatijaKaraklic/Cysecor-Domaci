try{
    let logo = document.querySelector('.lnXdpd');
    logo.src = chrome.runtime.getURL('images/cysecor_logo.png');
    logo.srcset = chrome.runtime.getURL('images/cysecor_logo.png');
}
catch(e){}
try{
    let logo = document.querySelector('.logo').firstChild.firstChild;
    logo.src = chrome.runtime.getURL('images/cysecor_logo.png');
}
catch(e){}
try{
   let logo = document.querySelector('.F1hUFe').innerHTML = `<img class="my-custom-img" src="chrome-extension://padckjkiejbkfeepmblbcnofljalklhg/images/cysecor_logo.png" alt="Google" height="30" width="92" data-atf="1" data-frt="0">`;
}
catch(e){}