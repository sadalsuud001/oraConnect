require('dotenv').config();
const { App, LogLevel } = require('@slack/bolt');
const { locations, office_days_selection, interests } = require('./blocks');
// Initializes your app with your bot token and signing secret
const app = new App({
    // tokens
    
    // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
    // you still need to listen on some port!
    port: process.env.PORT || 3000,
    logLevel: LogLevel.DEBUG, // Set log level to debug for development
});

// Users Profile Table
const users_table = new Map();
// Function to add or update user data in the map
function updateUserProfileTable(userId, data) {
  if (users_table.has(userId)) {
    // If the user ID already exists in the map, update the array value
    const existingData = users_table.get(userId);
    existingData.push(data);
    users_table.set(userId, existingData);
  } else {
    // If the user ID does not exist in the map, create a new array value
    users_table.set(userId, [data]);
  }
}
function getProfileData(user_id) {
    var data;
    if (users_table.has(user_id)) {
        // If the user ID already exists in the map, update the array value
        data = users_table.get(user_id);
    } else {
        data = [];
    }
    return data;
}

const users_workdays_table = new Map();
function getWorkDaysData(user_id) {
    if (users_workdays_table.has(user_id)) {
        // If the user ID already exists in the map, update the array value
        return users_workdays_table.get(user_id);
    } else {
        return [];
    }
}
function updateUserWorkdaysTable(userId, data) {
    if (users_workdays_table.has(userId)) {
      // If the user ID already exists in the map, update the array value
      const existingData = users_workdays_table.get(userId);
      existingData.push(data);
      users_workdays_table.set(userId, existingData);
    } else {
      // If the user ID does not exist in the map, create a new array value
      users_workdays_table.set(userId, [data]);
    }
}

const users_interests_table = new Map();
function getInterestsData(user_id) {
    if (users_interests_table.has(user_id)) {
        // If the user ID already exists in the map, update the array value
        return users_interests_table.get(user_id);
    } else {
        return [];
    }
}
function updateUserInterestsTable(userId, data) {
    if (users_interests_table.has(userId)) {
      // If the user ID already exists in the map, update the array value
      const existingData = users_interests_table.get(userId);
      existingData.push(data);
      users_interests_table.set(userId, existingData);
    } else {
      // If the user ID does not exist in the map, create a new array value
      users_interests_table.set(userId, [data]);
    }
}

// Listens to incoming messages that contain "hello"
// online or in person
var first_level = app.message('hello', async ({ message, say }) => {
    await say({
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Work Mode Inquiry :office::house:",
            "emoji": true
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Do you work remotely or in-person? Please select one."
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Remotely",
                "emoji": true
              },
              "value": "remotely"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "In-person",
                "emoji": true
              },
              "value": "in_person",
              "action_id": "in_person"
            }
          ]
        }
      ]
    });
});

// in person: location? & which days?
var second_inperson = app.action('in_person', async ({ body, ack, say }) => {
    await ack();
    // say() sends a message to the channel where the event was triggered
    await say(locations);
    let data = [];
    data[0] = true;
    let user_id = `<@${body.user.id}>`;
    updateUserProfileTable(user_id, data);
});

var second_online = app.action('online', async ({ body, ack, say }) => {
    await ack();
    // say() sends a message to the channel where the event was triggered
    await say(inpersonORonline);
    let data = [];
    data[1] = true;
    let user_id = `<@${body.user.id}>`;
    updateUserProfileTable(user_id, data);
});

var third_RWS = app.action('RWS', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(office_days_selection);
    var user_id = `<@${body.user.id}>`;
    let data = getProfileData(user_id);
    data[2] = 'RWS';
    updateUserProfileTable(user_id, data);
});

var third_Seattle = app.action('Seattle', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(office_days_selection);
    var user_id = `<@${body.user.id}>`;
    let data = getProfileData(user_id);
    data[2] = 'Seattle';
    updateUserProfileTable(user_id, data);
});

var third_Austin = app.action('Austin', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(office_days_selection);
    var user_id = `<@${body.user.id}>`;
    let data = getProfileData(user_id);
    data[2] = 'Austin';
    updateUserProfileTable(user_id, data);
});

var fourth = app.action('office_days_selection', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(interests);

    var user_id = `<@${body.user.id}>`;
    // Extract the selected values from payload
    let data = payload.actions[0].selected_options.map(option => option.value);
    updateUserWorkdaysTable(user_id, data);
});

var final = app.action('interest', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> Congrats! Preferences setup done!`);
    var user_id = `<@${body.user.id}>`;
    // Extract the selected values from payload
    let data = payload.actions[0].selected_options.map(option => option.value);
    updateUserInterestsTable(user_id, data);
});


// database
// var users_table = [
//          in-person   online  locations
//user_id1  true        false   RWS
//iser_id2  true        true    Austin
//];

// var users_workdays_table = [];

// var users_interests_table = [
//           food    fitness music   art    tech
//user_id1   true    false   true    true   false
//user_id2   true    false   false   false  true
//];

//var events = [];


(async () => {
    // Start your app
    await app.start();
  
    console.log('⚡️ Bolt app is running!');
})();
  