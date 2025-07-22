
// AI Assistant JavaScript
let aiMessages = [
    "Happy 22nd Birthday, beautiful Asmita! 🎉✨",
    "You're absolutely amazing at 22! 💖",
    "Wishing you endless joy on your special day! 🌟",
    "22 looks absolutely perfect on you! 🎂",
    "Your smile lights up the entire world! ☀️💕",
    "Another year of being absolutely wonderful! 🌈",
    "At 22, you're unstoppable and incredible! 💪✨"
];

let wishTemplates = [
    "At 22, you shine brighter than all the stars in the sky! May this year bring you endless adventures, beautiful moments, and dreams that come true. You deserve all the happiness in the world! 🌟💖",
    "Happy 22nd Birthday, amazing Asmita! You've grown into such an incredible person - kind, beautiful, intelligent, and inspiring. May this new year of your life be filled with love, laughter, and magical surprises! 🎉✨",
    "Twenty-two years of blessing this world with your presence! You bring so much joy and positivity wherever you go. Here's to another year of being absolutely fabulous and achieving everything your heart desires! 💕🎂",
    "Sweet 22! You're like a beautiful butterfly, spreading happiness and color everywhere you flutter. May your birthday be as wonderful as you are, and may this year bring you closer to all your dreams! 🦋🌸",
    "Celebrating 22 years of YOU - and what a masterpiece you are! Your kindness, strength, and beauty inspire everyone around you. Wishing you a birthday filled with love and a year full of blessings! 💫👑"
];

let currentMessageIndex = 0;
let currentWishIndex = 0;

// Initialize AI Assistant
document.addEventListener('DOMContentLoaded', function() {
    initializeAI();
    generateInitialWish();
    updateCounters();
    startFloatingMessages();
});

function initializeAI() {
    const aiAssistant = document.getElementById('aiAssistant');
    const chatBubble = document.getElementById('chatBubble');
    
    // Make AI assistant clickable
    aiAssistant.addEventListener('click', function() {
        toggleAIChat();
    });
    
    // Auto-change messages every 5 seconds
    setInterval(changeFloatingMessage, 5000);
}

function changeFloatingMessage() {
    const aiMessage = document.getElementById('aiMessage');
    const typingIndicator = document.getElementById('typingIndicator');
    
    // Show typing indicator
    aiMessage.style.display = 'none';
    typingIndicator.style.display = 'flex';
    
    setTimeout(() => {
        currentMessageIndex = (currentMessageIndex + 1) % aiMessages.length;
        aiMessage.textContent = aiMessages[currentMessageIndex];
        
        // Hide typing indicator and show message
        typingIndicator.style.display = 'none';
        aiMessage.style.display = 'block';
        
        // Add animation
        aiMessage.style.animation = 'none';
        setTimeout(() => {
            aiMessage.style.animation = 'bubbleIn 0.5s ease-out';
        }, 10);
    }, 1500);
}

function generateNewWish() {
    const wishesContainer = document.getElementById('wishesContainer');
    const newWish = document.createElement('div');
    newWish.className = 'wish-card';
    
    currentWishIndex = (currentWishIndex + 1) % wishTemplates.length;
    newWish.textContent = wishTemplates[currentWishIndex];
    
    // Add to top of container
    wishesContainer.insertBefore(newWish, wishesContainer.firstChild);
    
    // Remove old wishes if more than 3
    while (wishesContainer.children.length > 3) {
        wishesContainer.removeChild(wishesContainer.lastChild);
    }
}

function generateInitialWish() {
    const wishesContainer = document.getElementById('wishesContainer');
    const initialWish = document.createElement('div');
    initialWish.className = 'wish-card';
    initialWish.textContent = wishTemplates[0];
    wishesContainer.appendChild(initialWish);
}

function updateCounters() {
    // Calculate days and hours alive (approximate)
    const birthYear = 2002; // 2024 - 22 = 2002
    const currentDate = new Date();
    const birthDate = new Date(birthYear, 0, 1); // Approximate birth date
    
    const timeDiff = currentDate - birthDate;
    const daysAlive = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursAlive = Math.floor(timeDiff / (1000 * 60 * 60));
    
    document.getElementById('daysAlive').textContent = daysAlive.toLocaleString();
    document.getElementById('hoursAlive').textContent = hoursAlive.toLocaleString();
}

function startFloatingMessages() {
    // Create floating hearts and messages
    setInterval(createFloatingElement, 3000);
}

function createFloatingElement() {
    const container = document.body;
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.fontSize = '2rem';
    element.style.zIndex = '999';
    element.style.pointerEvents = 'none';
    element.style.animation = 'floatUp 8s linear forwards';
    
    const symbols = ['💖', '🎉', '✨', '🌟', '💕', '🎂', '🌸', '🦋'];
    element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    container.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, 8000);
}

// Add floating animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0px) rotateZ(0deg);
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) rotateZ(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Chat functionality
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    addMessageToChat(message, 'user');
    userInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addMessageToChat(aiResponse, 'ai');
    }, 1000);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-msg' : 'ai-msg';
    messageDiv.textContent = message;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const responses = [
        "That's wonderful! I'm so happy you're enjoying your 22nd birthday celebration! 🎉",
        "You're absolutely amazing, Asmita! Thank you for sharing that with me! 💖",
        "I love your energy! At 22, you're ready to conquer the world! 🌟",
        "Your happiness makes my AI heart so joyful! Keep shining bright! ✨",
        "What a beautiful thought! You deserve all the love and happiness! 💕",
        "I'm here to make your birthday even more special! You're incredible! 🎂",
        "Your 22nd year is going to be absolutely amazing! I can feel it! 🌈"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function toggleAIChat() {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
        chatContainer.scrollIntoView({ behavior: 'smooth' });
    }
}
