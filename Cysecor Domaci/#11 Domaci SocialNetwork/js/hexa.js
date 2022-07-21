let session = new Session();
session_id = session.getSession();


let inputChangeProfile = document.getElementById('editForm');


if(session_id !== ""){

    async function populateUserData(){
        let user = new User();
        user = await user.get(session_id);

        document.querySelector('#username').innerText = user['username'];
        document.querySelector('#email').innerText = user['email'];

        document.querySelector('#korisnicko_ime').value = user['username'];
        document.querySelector('#edit_email').value = user['email'];
    }

    populateUserData();

}
else window.location.href = '/';

document.querySelector('#logout').addEventListener('click', e => {
    e.preventDefault();

    session.destroySession();
    window.location.href = '/';
});

document.querySelector('#editAccount').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'block';
});

document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'none';
});

document.querySelector('#editForm button').addEventListener('click', event => {
    async function changeUsersThings(e){
        e.preventDefault();

        let user = new User();
        user.username = document.querySelector('#korisnicko_ime').value;
        user.email = document.querySelector('#edit_email').value;

        let state = await user.isExist(session_id);
        //TODO ovde kao state ubaci da li moze da se promene stvari HVALA
        
        if(state === 'emailNotValid'){
            alert('Ovaj Email nije ispravan.');
            return;
        }
        else if(state === 'usernameNotValid'){
            alert('Ovaj username nije ispravan.');
            return;
        }
        else if(state === 'email'){
            alert('Ovaj Email je vec iskoriscen.');
            return;
        }
        else if(state === 'username'){
            alert('Ovaj Usrname je vec iskoriscen.');
            return;
        }
        else{
            user.edit();
        }
    }
    changeUsersThings(event);
});

document.querySelector('#deleteProfile').addEventListener('click', e => {
    e.preventDefault();

    let text = 'Da li ste sigurni da zelite da obrisete profil?';

    if(confirm(text) === true){
        let user = new User(session_id);
        user.delete();
    }

});

document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();

    async function createPost(){
        let content = document.querySelector('#postContent').value;
        document.querySelector('#postContent').value = '';
        let post = new Post();
        post.post_content = content;
        post = await post.create();

        let current_user = new User();
        current_user = await current_user.get(session_id);

        let html = document.querySelector('#allPostsWrapper').innerHTML;

        let delete_post_html = '';
        if(session_id === post.user_id){
            delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
        }
        
        document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                    <div class="post-content">${post.content}</div>

                                                                    <div class="post-actions">
                                                                        <p><b>Author:</b> ${current_user.username}</p>
                                                                        <div>
                                                                            <button onclick="likePost(this)" class="likePostJs like-btn"><span>${post.likes}</span< Likes</button>
                                                                            <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                            ${delete_post_html}
                                                                        </div>
                                                                    </div>

                                                                    <div class="post-comments">
                                                                        <form>
                                                                            <input placeholder="Napisi komentar..." type="text">
                                                                            <button onclick="commentPostSubmit(event)">Comment</button>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                ` + html;

    }

    createPost();

});


async function getAllPosts() {
    let all_posts = new Post();
    all_posts = await all_posts.getAllPosts();

    all_posts.forEach(post => {
        async function getPostUser(){

            let user = new User();
            user = await user.get(post.user_id);

            let comments = new Comment();
            comments = await comments.get(post.id);

            let comments_html = '';

            if(comments.length > 0){
                for(let i = 0; i < comments.length; i++) {
                    let comment = comments[i];

                    let commentsUser = new User();
                    let commUser = await commentsUser.get(comment.user_id);            
                    
                    let adderBTN = '';
                    if(comment.user_id === session_id){

                        
                        adderBTN = '<button onclick="removeComment(this)">Remove</button>';
                    }

                    comments_html += `<div class="single-comment" data-comment_id="${comment.id}"><b>${commUser.username}: </b>${comment.content} ${adderBTN}</div>`;


                }
            }

            

            let html = document.querySelector('#allPostsWrapper').innerHTML;

            let delete_post_html = '';
            if(session_id === post.user_id){
                delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
            }

            document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                        <div class="post-content">${post.content}</div>

                                                                        <div class="post-actions">
                                                                            <p><b>Author:</b> ${user.username}</p>
                                                                            <div>
                                                                                <button onclick="likePost(this)" class="likePostJs like-btn"><span>${post.likes}</span< Likes</button>
                                                                                <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                                ${delete_post_html}
                                                                            </div>
                                                                        </div>

                                                                        <div class="post-comments">
                                                                            <form>
                                                                                <input placeholder="Napisi komentar..." type="text">
                                                                                <button onclick="commentPostSubmit(event)">Comment</button>
                                                                            </form>
                                                                            ${comments_html}
                                                                        </div>
                                                                    </div>
                                                                    ` + html;
                                                                
        }

        getPostUser();

    });

}

getAllPosts();

const commentPostSubmit = e => {
    async function createComment(){
        e.preventDefault();

        let btn = e.target;
        btn.setAttribute('disabled', 'true');
    
        let main_post_el = btn.closest('.single-post')
        let post_id = main_post_el.getAttribute('data-post_id');
    
        let html = main_post_el.querySelector('.post-comments').innerHTML;
    
        let comment_value = main_post_el.querySelector('input').value;
    
        main_post_el.querySelector('input').value = '';

        let user = new User();
        user = await user.get(session_id);

        adderBTN = '<button onclick="removeComment(this)">Remove</button>';
        
    
        let comment = new Comment();
        comment.content = comment_value;
        comment.user_id = session_id;
        comment.post_id = post_id;
        let comm_id = await comment.create();

        main_post_el.querySelector('.post-comments').innerHTML += `<div class="single-comment" "data-comment_id="${comm_id}"><b>${user.username}: </b>${comment_value} ${adderBTN}</div>`;

    }

    createComment();


}

const removeMyPost = btn => {
    let post_id = btn.closest('.single-post').getAttribute('data-post_id');

    btn.closest('.single-post').remove();

    let post = new Post();
    post.delete(post_id, true);
}

const likePost = btn => {
    let main_post_el = btn.closest('.single-post');
    let post_id = btn.closest('.single-post').getAttribute('data-post_id');

    let number_of_likes = parseInt(btn.querySelector('span').innerText);

    btn.querySelector('span').innerText = number_of_likes + 1;
    btn.setAttribute('disabled', 'true');

    let post = new Post();
    post.like(post_id, number_of_likes + 1);

}

const commentPost = btn => {
    let main_post_el = btn.closest('.single-post');
    let post_id = main_post_el.getAttribute('data-post-id');

    main_post_el.querySelector('.post-comments').style.display = 'block';
}

const removeComment = btn => {
    let comment_id = btn.closest('.single-comment').getAttribute('data-comment_id');
    btn.closest('.single-comment').remove();
    let comment = new Comment();
    comment.remove(comment_id, true);
    
}