const chatBox = document.getElementById('chat-display');
const textInput = document.getElementById('input-box');
const sendBtn = document.getElementById('submit-btn');
const modelDropdown = document.getElementById('ai-model');

const token = 'YOUR_GROQ_API_TOKEN';

function getModel() {
  return localStorage.getItem('ai-model') || 'mixtral-8x7b-32768';
}

function setModel(model) {
  localStorage.setItem('ai-model', model);
  console.log(`AI model set to: ${model}`);
}

function sendTextMessage() {
  const message = textInput.value.trim();
  if (!message) return;

  displayMessage(message, 'user');
  textInput.value = '';

  fetchResponse(message);
}

function displayMessage(messageContent, senderType, modelName = '') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${senderType}`;

  let senderLabel = senderType === 'user' ? 'You' : senderType === 'ai' ? 'AI' : 'Info';

  if (senderType === 'info') {
    const heading = document.createElement('h1');
    heading.textContent = messageContent;
    messageDiv.appendChild(heading);
  } else {
    if (senderType === 'ai' && modelName) {
      senderLabel += ` (${modelName})`;
    }

    messageDiv.innerHTML = `<p><b>${senderLabel}</b>: ${messageContent}</p>`;
  }

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchResponse(userMessage) {
  const model = getModel();
  const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  const systemPrompt = "You are a helpful AI assistant.";

  const requestData = {
    model: model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    temperature: 0.9,
    max_tokens: 1024,
    stream: false
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const { choices, model } = await response.json();
    const reply = choices[0].message.content;
    displayMessage(reply, 'ai', model);
  } catch (err) {
    console.error('Request Failed:', err);
    displayMessage(`Failed to get a response. Details: ${err.message}`, 'error');
  }
}

function checkForInitialMessage() {
  const messages = chatBox.querySelectorAll('.message');
  if (messages.length === 0) {
    displayMessage('What can I help with?', 'info');
    chatBox.classList.add('center-message');
  }
}

function removeInitialMessage() {
  const initialMessage = chatBox.querySelector('.message.info');
  if (initialMessage) {
    initialMessage.remove();
    chatBox.classList.remove('center-message');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const menu = modelDropdown.querySelector('.dropdown-menu');
  menu.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const selectedValue = event.target.getAttribute('value');
      setModel(selectedValue);
    }
  });

  checkForInitialMessage();
});

textInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendTextMessage();
    removeInitialMessage();
  }
});

sendBtn.addEventListener('click', () => {
  sendTextMessage();
  removeInitialMessage();
});
