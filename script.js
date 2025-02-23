document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileDisplay = document.getElementById('fileDisplay');
    const chatInput = document.getElementById('chatInput');
    const chatDisplay = document.getElementById('chatDisplay');
    const sendButton = document.getElementById('sendButton');

    fileInput.addEventListener('change', handleFileUpload);
    sendButton.addEventListener('click', handleSendMessage);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const supportedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!supportedTypes.includes(file.type)) {
                alert('Unsupported file type.');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                fileDisplay.innerHTML = `<img src="${e.target.result}" alt="Uploaded File" />`;
            };
            reader.onerror = function() {
                alert('Error reading file.');
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            chatDisplay.innerHTML += `<div class="user-message">${message}</div>`;
            chatInput.value = '';
            simulateChatResponse(message);
        }
    }

    function simulateChatResponse(userMessage) {
        const responses = {
            'hello': 'Hi there!',
            'how are you?': 'I am a bot, but I am doing well!',
            'bye': 'Goodbye!'
        };
        const response = responses[userMessage.toLowerCase()] || "I'm not sure how to respond to that.";
        setTimeout(() => {
            chatDisplay.innerHTML += `<div class="bot-response">${response}</div>`;
        }, 1000);
    }
});