import axios from 'axios';

async function openai(text) {
  const payload = {
    app: {
      id: "blaael9y3cu1689192439853",
      time: Date.now(),
      data: {
        sender: {
          id: Date.now()
        },
        message: [
          {
            id: Date.now(),
            time: Date.now(),
            type: "text",
            value: text
          }
        ]
      }
    }
  };

  const webhookUrl = 'https://webhook.botika.online/webhook/';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer s9561k-znra-c37c54x8qxao0vox-nwm9g4tnrm-dp3brfv8'
  };

  try {
    const webhookResponse = await axios.post(webhookUrl, payload, { headers });
    const { data, status } = webhookResponse;

    if (status === 200) {
      const messages = data.app.data.message;

      if (Array.isArray(messages)) {
        const responseMessages = messages.map((message) => message.value);
        let replyMessage = responseMessages.join('\n');

        if (/(<BR>|<br>)/i.test(replyMessage)) {
          let newReplyMessage = replyMessage.replace(/<BR>|<br>/gi, '\n');
          newReplyMessage = newReplyMessage.replace(/```/g, '\n');
          let replyMessages = newReplyMessage.split('\n');
          let combinedResponse = '';

          for (const [index, message] of replyMessages.entries()) {
            combinedResponse += "\n\n" + message + '\n';
          }

          return combinedResponse;
        } else {
          return replyMessage;
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export { openai };
