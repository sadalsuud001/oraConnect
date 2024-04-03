require('dotenv').config();
const { App, LogLevel } = require('@slack/bolt');
const { locations, office_days_selection, interests } = require('./blocks');
// Initializes your app with your bot token and signing secret
const app = new App({
    // tokens
    
    // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
    // you still need to listen on some port!
    socketMode: true,
    port: process.env.PORT || 3000,
    logLevel: LogLevel.DEBUG, // Set log level to debug for development
});

// database (so called)
// var users_table = [
//          in-person   online  locations
//user_id1  true        false   RWS
//iser_id2  true        true    Austin
//];

// var users_workdays_table = [user_id: [workdays]];

// var users_interests_table = [
// user_id1: [food,fitness,tech],
// user_id2: [food,music,art,tech],
//];

// var users_events_table = [
// user_id1: [event1, event2],
// user_id2: [event1, event3],
//]


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

const users_events_table = new Map();
function getEventsData(user_id) {
    if (users_events_table.has(user_id)) {
        // If the user ID already exists in the map, update the array value
        return users_events_table.get(user_id);
    } else {
        return [];
    }
}
function updateUserEventsTable(userId, data) {
    if (users_events_table.has(userId)) {
        // If the user ID already exists in the map, update the array value
        const existingData = users_events_table.get(userId);
        existingData.push(data);
        users_events_table.set(userId, existingData);
      } else {
        // If the user ID does not exist in the map, create a new array value
        users_events_table.set(userId, [data]);
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
    let data = body.actions[0].selected_options.map(option => option.value);
    updateUserWorkdaysTable(user_id, data);
});

var final = app.action('interest', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> Congrats! Preferences setup done!`);
    var user_id = `<@${body.user.id}>`;
    await say("User id is " + user_id);
    // Extract the selected values from payload
    let data = body.actions[0].selected_options.map(option => option.value);
    updateUserInterestsTable(user_id, data);
    const intst = getInterestsData(user_id);
    await say("Your interests is " + intst);
});

app.event('app_mention', async ( {event, say} ) => {
    // Iterate users_interests_table to find users who subscribe to the tags, e.g., 'fitness'
    const messageText = event.text;

    if (messageText.includes('fitness') || messageText.includes('Fitness')) {
        // Extract user ID from the event
        const userId = event.user;

        // Update events_table if the message contains 'fitness'
        await updateUserEventsTable(userId, messageText);
    } else if (messageText.includes('food') || messageText.includes('Food')) {
        // Extract user ID from the event
        const userId = event.user;

        // Update events_table if the message contains 'fitness'
        await updateUserEventsTable(userId, messageText);
    } else if (messageText.includes('art') || messageText.includes('Art')) {
        // Extract user ID from the event
        const userId = event.user;

        // Update events_table if the message contains 'fitness'
        await updateUserEventsTable(userId, messageText);
    } else if (messageText.includes('tech') || messageText.includes('Tech')) {
        // Extract user ID from the event
        const userId = event.user;

        // Update events_table if the message contains 'fitness'
        await updateUserEventsTable(userId, messageText);
    } else if (messageText.includes('music') || messageText.includes('Music')) {
        // Extract user ID from the event
        const userId = event.user;

        // Update events_table if the message contains 'fitness'
        await updateUserEventsTable(userId, messageText);
    }

    // todo 1. handle false alarm: false app_mention @oraConnect)
    // todo 2. add Asynchronous Operations: 
    // If getInterestsData or updateUserEventsTable are asynchronous operations 
    // (e.g., involving database calls or external API requests), 
    // you might need to await them to ensure proper sequencing of actions

});

// Listens to incoming messages that contain "events"
var showEvents = app.message('show my events', async ({ event, message, say }) => {
    // updateUserEventsTable(`${event.user}`, ["event1 ","event2 "]);
    // var str = users_events_table.get(`${event.user}`).join('\n');
    var userEvents = users_events_table.get(`${event.user}`);
    var str = userEvents ? userEvents.join('\n \n') : 'No events found.';
    await say({
        text: "Here is your events list: \n" + str,
        channel: 'A06RVQ3TEM7',
    });
});


// Amanda Xu user name: U06RBT2CZM2

(async () => {
    // Start your app
    await app.start();
  
    console.log('⚡️ Bolt app is running!');
})();
  