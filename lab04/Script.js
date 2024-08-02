// Initialize chat history array
let chatHistory = [];

// Event handler for form submission
function myEventHandler(eventData) {
    // Prevent the default form submission behavior
    eventData.preventDefault();

    // Get the user input
    let inputRef = document.querySelector("#message-text");
    let message = inputRef.value;

    // Clear the input field
    inputRef.value = '';

    // Create a new message element
    createMessageElement(message, "message-self");
    
    // Save the message to chat history
    chatHistory.push({
        "type": "message-self",
        "message": message
    });

    // Save chat history
    localStorage.setItem("chatHistory", encodeURIComponent(JSON.stringify(chatHistory)));

    // Delay
    setTimeout(receiveMessage, 6000);
}

// Event handler for bot messages
function receiveMessage() {
    const botMessages = [
        "How's Antarctica?",
        "Wanna get some sushi later? 🍣😋",
        "I 🐳 always be here for you.",
        "Noot noot 🐧",
        "There's plenty of 🐟 in the 🌊 but I like you best ❤️"
    ];

    // Random bot message
    const randomIndex = Math.floor(Math.random() * botMessages.length);
    const botMessage = botMessages[randomIndex];

    // Create a new bot message element
    createMessageElement(botMessage, "message-other");
    
    // Save the bot message to chat history
    chatHistory.push({
        "type": "message-other",
        "message": botMessage
    });

    // Save chat history to localStorage
    localStorage.setItem("chatHistory", encodeURIComponent(JSON.stringify(chatHistory)));
}

// Create message element and append to chat log
function createMessageElement(message, type) {
    // Create elements
    const pMessage = document.createElement('p');
    const pTimestamp = document.createElement('p');
    const divMessage = document.createElement('div');

    // Set the message and timestamp
    pMessage.textContent = message;
    pMessage.className = 'message-content';
    
    const now = new Date();
    pTimestamp.textContent = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    pTimestamp.className = 'timestamp';
    
    // Set the class for the div
    divMessage.className = type;
    
    // Append children to the div
    divMessage.appendChild(pMessage);
    divMessage.appendChild(pTimestamp);
    
    // Append the div to the chat log container
    const chatLogContainer = document.querySelector("#chat-log-container");
    chatLogContainer.appendChild(divMessage);
}

// Load chat history 
function loadChatHistory() {
    const storedData = localStorage.getItem("chatHistory");
    if (storedData) {
        chatHistory = JSON.parse(decodeURIComponent(storedData));
        chatHistory.forEach(message => {
            createMessageElement(message.message, message.type);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();

    const form = document.querySelector("#message-form");
    form.addEventListener('submit', myEventHandler);

    // Automatically send a message (12s)
    setInterval(receiveMessage, 12000);
});
