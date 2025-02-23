function loadPosts() {
    fetch('/api/posts')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <button class="like-button" data-id="${post.id}">Like</button>
                    <div class="comments-section" data-id="${post.id}"></div>
                `;
                postsContainer.appendChild(postElement);
            });
        });
}

function validatePostForm() {
    const form = document.getElementById('post-form');
    form.addEventListener('submit', function(event) {
        const title = form.querySelector('input[name="title"]').value;
        const content = form.querySelector('textarea[name="content"]').value;
        if (!title || !content) {
            event.preventDefault();
            alert('Title and content are required.');
        }
    });
}

function handleLikeButtonClick(event) {
    if (event.target.classList.contains('like-button')) {
        const postId = event.target.getAttribute('data-id');
        fetch(`/api/posts/${postId}/like`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert(`Post liked! Total likes: ${data.likes}`);
            });
    }
}

function initializeEventListeners() {
    document.addEventListener('click', handleLikeButtonClick);
}

document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    validatePostForm();
    initializeEventListeners();
});