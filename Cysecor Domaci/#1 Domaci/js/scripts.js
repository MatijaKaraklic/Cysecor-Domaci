function newElement(){

    let text = document.getElementById('input').value;
    if(text == ''){
        window.alert('Please enter a title.');
        return;
    }
    document.getElementById('input').value = ''

    let element = document.createElement('div');
    element.className = 'to-do-element clearfix';
    element.onclick = 'check()';
    element.setAttribute('onclick', 'check(this)');

    let EL_checked = document.createElement('span');
    EL_checked.className = 'checked';

    let EL_text = document.createElement('span');
    EL_text.className = 'text';
    EL_text.innerText = text;

    let EL_delete = document.createElement('span');
    EL_delete.className = 'delete';
    EL_delete.setAttribute('onclick','my_remove(this)');
    EL_delete.innerText = 'x'

    element.appendChild(EL_checked);
    element.appendChild(EL_text);
    element.appendChild(EL_delete);

    document.body.appendChild(element);


}
function check(el){
    let childs = el.childNodes;
    if (childs[0].innerText == ''){
        childs[0].innerText = '✓';
        childs[1].style.textDecoration = 'line-through';
        el.style.backgroundColor = '#555'
        el.style.color = '#fff';
    }
    else{
        childs[0].innerText = '';
        childs[1].style.textDecoration = null;
        el.style.backgroundColor = '#f9f9f9'
        el.style.color = '#555';
    }


}
function my_remove(el){
    let del = el.parentNode;
    del.remove();
}