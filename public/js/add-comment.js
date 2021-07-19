// EVENT LISTENER FUNCTION for ADDING COMMENT

const addCommentFormHandler = async event => {
    event.preventDefault();
    const content = document.querySelector('#comm-content').value.trim();
    const post_id = document.querySelector('.title').getAttribute('id');

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    }
};

// Call Event Listenor function
document.querySelector('.comment-body').addEventListener('submit', addCommentFormHandler);