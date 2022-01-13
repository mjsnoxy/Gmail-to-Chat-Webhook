function sendEmailsToChat() {
    // https://developers.google.com/apps-script/reference/gmail/gmail-app
    const label = GmailApp.getUserLabelByName('XXX'); // Replace XXX with Gmail label name
    let messages = [];
    let temp = [];
    let threads = label.getThreads();

    for (let i = 0; i < threads.length; i++) {
        temp = threads[i].getMessages();
        for (let j = 0; j < temp.length; j++) {
          if (temp[j].isUnread()) {
            messages = messages.concat(temp[j])
          }
        }
    }

    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        

        // Message methods https://developers.google.com/apps-script/reference/gmail/gmail-message
        let date = '\n' + message.getDate();
        let subject = message.getSubject();
        let raw = message.getPlainBody();
        // Regex filter for event description and log type
        let body = raw.match(/Event Description: ([\s\S]*)Audit Log/)[1];
        

        // Chat card formatting - see https://developers.google.com/chat/api/reference/rest/v1/cards#Card   
        let card = {
            "cards": [{
                "header": {
                    "title": "Google Workspace Admin Alert",
                    "imageUrl": "https://ssl.gstatic.com/apps/cpanel/resources/logo/brand/admin_favicon.png" // Use any image
                },
                "sections": [{
                    "widgets": [{
                            "keyValue": {
                                "icon": "CLOCK",
                                "content": date,
                                "contentMultiline": true
                            }
                        },
                        {
                            "keyValue": {
                                "topLabel": "Subject",
                                "content": subject,
                                "contentMultiline": true
                            }
                        },
                        {
                            "keyValue": {
                                "topLabel": "Message",
                                "content": body,
                                "contentMultiline": true
                            }
                        }
                    ]
                }, ]
            }]
        }
 
        {
            let stringify = {
                'method': 'post',
                'contentType': 'application/json',
                'payload': JSON.stringify(card),
            };

            // Webooks in Chat: https://developers.google.com/chat/how-tos/webhooks
            let webhookUrl = 'XXX'; // Replace XXX with Chat webhook URL
            UrlFetchApp.fetch(webhookUrl, stringify);
        }
    }
    label.removeFromThreads(threads);
}