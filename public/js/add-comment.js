// EVENT LISTENER FUNCTION for ADDING COMMENT

const addCommentFormHandler = async event => {
    event.preventDefault();
    const commentContent = document.querySelector('#comm-content').value.trim();
    const postid = document.querySelector('.title').value.trim();

    const postRes = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ commentContent, postid }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (postRes.ok) {
        document.location.reload();
    }
};

// Call Event Listenor function
document.querySelector('.comment-body').addEventListener('submit', addCommentFormHandler);