let priceAll = 0;
let priceWithoutDiscount = 0;
let checked = 0;

function watch(element){
    
    let price = element.closest('div').querySelector('.price').innerText;
    price = parseInt(price.substring(1));
    let discount = document.getElementById('dis').innerText;
    discount = parseInt(discount);
    let card = element.closest('div').parentNode;
    card.classList.add('checkedCard');


    priceAll += price;
    priceWithoutDiscount += price;
    checked++;

    if (checked >= 4){
        priceAll = priceWithoutDiscount * (1 - (discount / 100));
    }
    else priceAll = priceWithoutDiscount;

    priceAll = priceAll.toFixed(2);

    element.setAttribute('disabled', 'true');
    element.classList.remove('hoverBtn');
    element.classList.add('checkedBtn');
    element.innerText = 'ADDED';
    document.getElementById('priceAll').innerHTML = priceAll;

}