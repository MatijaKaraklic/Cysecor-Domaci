class Comment {
    post_id = '';
    user_id = '';
    content = '';
    api_url = 'https://62cad93c1eaf3786ebb21969.mockapi.io';

    async create(){
        let data = {
            post_id: this.post_id,
            user_id: this.user_id,
            content: this.content
        }
        data = JSON.stringify(data);

        const response = await fetch(this.api_url + '/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        });
        const data_new = await response.json();

        alert('Postavljen komentar');
        return data_new.id;

    }

    async get(post_id){
        let api_url = this.api_url + '/comments';

        const response = await fetch(api_url);
        const data = await response.json();
        let post_comments = [];

        let i = 0;
        data.forEach(item => {
            if(item.post_id === post_id){
                post_comments[i] = item;
                i++;
            }
        });

        return post_comments;

    }

    async remove(comment_id, showMessage){

        const response = await fetch(this.api_url + '/comments/' + comment_id, {
            method: 'DELETE'
        });
        const data = await response.json();
        if(showMessage){
            alert('Komentar je obrisan obrisan.')
        }

    }
}