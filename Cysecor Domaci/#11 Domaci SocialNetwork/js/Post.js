class Post {
    post_id = '';
    post_content = '';
    user_id = '';
    likes = '';
    api_url = 'https://62cad93c1eaf3786ebb21969.mockapi.io';

    async create(post_content){
        let session = new Session();
        session_id = session.getSession();

        let data = {
            user_id: session_id,
            content: this.post_content,
            likes: 0
        }
        data = JSON.stringify(data);
        let response = await fetch(this.api_url + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: data
        });

        data = await response.json();

        return data;

    }

    async getAllPosts() {
        let response = await fetch(this.api_url + '/posts');
        let data = await response.json();
        return data;
    }

    like(post_id, likes){
        let data = {
            likes: likes
        };
        data = JSON.stringify(data);

        fetch(this.api_url + '/posts/' + post_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {alert('Post lajkovan.')});
    }

    async delete(post_id, showAlert){
        const response = await fetch(this.api_url + '/posts/' + post_id, {
            method: 'DELETE'
        });
        const data = await response.json();

        let comments = new Comment();
        comments = await comments.get(post_id);

        if(comments.length > 0){
            for (let i = 0; i < comments.length; i++) {
                let comment_id = comments[i].id;
                let commentForDel = new Comment();
                commentForDel.remove(comment_id, false);
            }
        }

        if(showAlert){
            alert('Post obrisan.');
        }
    }

}