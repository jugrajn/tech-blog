// EVENT LISTENER FUNCTION for ADDING POST

const addPostFormHandler = async event => {
    event.preventDefault();
    const postTitle = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();

    const postRes = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ postTitle, postContent }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (postRes.ok) {
        document.location.replace('/dashboard');
    }
};

// Call Event Listenor function
document.querySelector('.add-button').addEventListener('submit', addPostFormHandler);