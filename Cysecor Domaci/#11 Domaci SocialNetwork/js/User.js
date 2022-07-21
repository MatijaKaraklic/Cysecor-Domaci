class User{
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'https://62cad93c1eaf3786ebb21969.mockapi.io';

    create(){
        let data = {
            username: this.username,
            email: this.email,
            password: this.password
        }

        data = JSON.stringify(data);

        fetch(this.api_url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session();
            session.user_id = data.id;
            session.startSession();

            window.location.href = 'hexa.html';
        });

    }

    async get(user_id){
        let api_url = this.api_url + '/users/' + user_id;
        let response = await fetch(api_url);
        let data = await response.json();
        return data;
    }

    edit(){
        let data = {
            username: this.username,
            email: this.email
        }
        data = JSON.stringify(data);

        let session = new Session();
        session_id = session.getSession();
        
        fetch(this.api_url + '/users/' + session_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'hexa.html';
        });
    }

    login(){

        fetch(this.api_url + '/users')
        .then(response => response.json())
        .then(data => {

            let login_successful = 0;
            data.forEach(db_user =>{
                if(db_user.email === this.email && db_user.password === this.password){
                    let session = new Session();
                    session.user_id = db_user.id;
                    session.startSession();
                    login_successful = 1;
                    window.location.href = 'hexa.html';
                }
            });
            if(login_successful === 0){
                alert('Pogresan email ili lozinka.')
            }
        });

    }

    async delete(){
        let session = new Session();
        session_id = session.getSession();

        const response = await fetch(this.api_url + '/users/' + session_id, {
            method: 'DELETE'
        });
        const data = await response.json();

        let posts = await this.getAllPosts(data.id);
        let comments = await this.getAllComments(data.id);


        let postDel = new Post();
        for(let i = 0; i < posts.length; i++) {
            console.log(posts[i]);
            postDel.delete(posts[i].id, false);
        }
        let commDel = new Comment();
        for(let i = 0; i < comments.length; i++) {
            commDel.remove(comments[i].id, false);
        }


        session.destroySession();
        window.location.href = '/';

    }

    async getAllPosts(user_id){

        const response = await fetch(this.api_url + '/posts');
        const data = await response.json();
        let posts = [];

        let index = 0;
        for(let i = 0; i < data.length; i++) {
            if(data[i].user_id === user_id){
                posts[index] = data[i];
                index++;
            }
        }

        return posts;
    }

    async getAllComments(user_id) {
        const response = await fetch(this.api_url + '/comments');
        const data = await response.json();
        let comments = [];

        let index = 0;
        for(let i = 0; i < data.length; i++) {
            if(data[i].user_id === user_id) {
                comments[index] = data[i];
                index++;
            }
        }

        return comments;

    }

    validateEmail(email){
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
	    	return true;
		}
	    
	    return false;
	}

    async isExist(session_id){

        const response = await fetch(this.api_url + '/users');
        const users = await response.json();

        if(!this.validateEmail(this.email)){
            return 'emailNotValid';
        }

        if(this.username.length < 5 || this.username.length > 50){
            return 'usernameNotValid';
        }

        for(let i = 0; i < users.length; i++) {
            let user = users[i]; 
            if(user.email === this.email && user.id !== session_id){
                console.log(user.email + ' | ' + this.email);
                return 'email';
            }
            else if(user.username === this.username && user.id !== session_id){
                console.log(user.username + ' | ' + this.username);
                return 'username';
            }
        }
        return '';
    }

}