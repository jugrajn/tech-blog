
const editPostFormHandler = async (event) => {
    event.preventDefault();
    console.log("test")
    const postTitle = document.querySelector('#edit-post-title').value.trim();
    const postContent = document.querySelector('#edit-post-content').value.trim();
    const postid = document.querySelector('.edit-btn').getAttribute('id');
    
    const response = await fetch(`/api/posts/${postid}`, {
        method: 'PUT',
        body: JSON.stringify({ postTitle, postContent }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
}

const deletePostFormHandler = async (event) => {
    event.preventDefault();
    const postid= document.querySelector('.edit-btn').getAttribute('id');

    const postRes = await fetch(`/api/post/${postid}`, {
        method: 'DELETE',
        body: JSON.stringify({ postid }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (postRes.ok) {
        document.location.replace('/dashboard');
    }
};

document.querySelector('.edit-btn').addEventListener('submit', editPostFormHandler);
document.querySelector('.delete-button').addEventListener('click', deletePostFormHandler);