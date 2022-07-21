class Validator{
    constructor(config) {
        this.elementsConfig = config;
        this.errors = {};
        this.generateErrorsObject();
        this.inputListener();
    }
    generateErrorsObject(){
        for(let field in this.elementsConfig){
            this.errors[field] = [];
        }
    }
    inputListener(){
        let inputSelector = this.elementsConfig;
        for(let field in inputSelector){
            let el = document.querySelector(`input[name="${field}"]`);
            el.addEventListener('input', this.validate.bind(this));
        }
    }
    validate(e){
        let elFields = this.elementsConfig;
        let field = e.target;
        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if(elFields[fieldName].required){
            if(fieldValue === ''){
                this.errors[fieldName].push('Polje je prazno.');
            }
        }

        if(elFields[fieldName].email){
            if(!this.validateEmail(fieldValue)){
                this.errors[fieldName].push('Neispravna email adresa.');
            }
        }

        if(elFields[fieldName].number){
            if(isNaN(fieldValue)){
                this.errors[fieldName].push('Postanski broj mora da bude broj.');
            }
        }
        
        if(fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength){
            this.errors[fieldName].push(`Polje mora imati minimalno ${elFields[fieldName].minlength} i maksimalno ${elFields[fieldName].maxlength} karaktera`);
        }

        if(elFields[fieldName].matching){
            let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);
            if(fieldValue !== matchingEl.value){
                this.errors[fieldName].push('Lozinke se ne poklapaju.');
            }
            if(this.errors[fieldName].length === 0){
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName]].matching = [];
            }
        }

        this.populateErrors(this.errors);
    }
    populateErrors(errors){
        for(const elem of document.querySelectorAll('ul')){
            elem.remove();
        }
        for(let key of Object.keys(errors)){
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);
            errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;

                errorsElement.appendChild(li);
            });
        }

    }

    validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
        else return false;
    }
}