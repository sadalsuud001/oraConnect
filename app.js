require('dotenv').config();

const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
    
    // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
    // you still need to listen on some port!
    port: process.env.PORT || 3000
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Event Office Selection :office:",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Which office would you like to receive event notifications from?* Select an office to set your preference."
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "style": "primary",
                        "text": {
                            "type": "plain_text",
                            "text": "RWS :bridge_at_night:",
                            "emoji": true
                        },
                        "value": "RWS",
                        "action_id": "RWS"
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "text": {
                            "type": "plain_text",
                            "text": "Seattle :evergreen_tree:",
                            "emoji": true
                        },
                        "value": "Seattle",
                        "action_id": "Seattle"
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "text": {
                            "type": "plain_text",
                            "text": "Austin :face_with_cowboy_hat:",
                            "emoji": true
                        },
                        "value": "Austin",
                        "action_id": "Austin"
                    }
                ]
            }
        ]
    });
});

app.action('RWS', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the RWS`);
});

(async () => {
    // Start your app
    await app.start();
  
    console.log('⚡️ Bolt app is running!');
})();
  