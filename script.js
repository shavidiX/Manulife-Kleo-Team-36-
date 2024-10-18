// 添加一个新函数来获取初始欢迎消息
function getInitialMessage() {
    fetch('/init', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        addMessage('bot', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage('bot', 'Sorry, an error occurred while loading the initial message.');
    });
}

// 在页面加载完成后立即调用这个函数
document.addEventListener('DOMContentLoaded', function() {
    getInitialMessage();
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            addMessage('bot', data.response);
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('bot', 'Sorry, an error occurred. Please try again later.');
        });
    }
}

function addMessage(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender + '-message');
    messageElement.innerHTML = text;  // 使用innerHTML而不是textContent
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
