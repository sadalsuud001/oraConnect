var office_days_selection = 
{
    "blocks": [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "Office Days Inquiry :date:",
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Which days do you come to the office in person? You can select more than one."
            },
            "accessory": {
                "type": "multi_static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select days",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Monday",
                            "emoji": true
                        },
                        "value": "monday"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Tuesday",
                            "emoji": true
                        },
                        "value": "tuesday"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Wednesday",
                            "emoji": true
                        },
                        "value": "wednesday"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Thursday",
                            "emoji": true
                        },
                        "value": "thursday"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Friday",
                            "emoji": true
                        },
                        "value": "friday"
                    }
                ],
                "action_id": "office_days_selection"
            }
            
        }
    ]
}

var locations = {
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
}

var interests = 
{
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Event Categories :ticket:",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "What types of events are you interested in? You can select more than one."
        },
        "accessory": {
          "type": "multi_static_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Select categories",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "Food :stew:",
                "emoji": true
              },
              "value": "food"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Fitness :weight_lifter:",
                "emoji": true
              },
              "value": "fitness"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Music :musical_note:",
                "emoji": true
              },
              "value": "music"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Art :art:",
                "emoji": true
              },
              "value": "art"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Tech :computer:",
                "emoji": true
              },
              "value": "tech"
            }
          ],
          "action_id": "interest"
        }
      }
    ]
}


module.exports = {
    office_days_selection,
    locations,
    interests,
};