const { response } = require("express");
const e = require("express");

const editPostFormHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#edit-post-title').value.trim();
    const postContent = document.querySelector('#edit-post-content').value.trim();
    const postid = document.querySelector('.edit-button').getAttribute('id');

    const response = await fetch(`/api/post${postid}`, {
        method: 'PUT',
        body: JSON.stringify({ postTitle, postContent }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reaplace('/dashboard');
    }
}

const deletePostFormHandler = async (event) => {
    event.preventDefault();
    const postid= document.querySelector('.delete-btn').getAttribute('id');

    const postRes = await fetch(`/api/post/${postid}`, {
        method: 'DELETE',
        body: JSON.stringify({ postid }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (postRes.ok) {
        document.location.reaplace('/dashboard');
    }
};

document.querySelector('.edit-button').addEventListener('submit', editPostFormHandler);
document.querySelector('.delete-button').addEventListener('click', deletePostFormHandler);