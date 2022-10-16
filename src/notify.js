//create a function to recieve the stats and then send them to the server
import fetch from 'node-fetch';
export default function (user, notifications) {
    //see if user has gotify server set up
    if (!user.gotify) {
        //if not, return
        return;
    }
    //if global.OldMessages is not defined, define it as an empty array
    if (!global.OldMessages) {
        global.OldMessages = [];
    }
    for (const notification of notifications) {
        //if the notification is not in the old messages array, send it to the server
        if (!global.OldMessages.includes(JSON.stringify(notification))) {
            global.OldMessages.push(JSON.stringify(notification));
            console.log("sending message to server: " + JSON.stringify(notification));

            var message = {
                title: notification.title,
                message: notification.msg,
                priority: 10,
                extras: {
                    "client::display": {
                        "contentType": "text/markdown",
                    }
                }
            };
            //if room is defined, add it to the message
            if (notification.room) {
                message.extras = {
                    'client::notification': {
                        "click": { 'url': "https://screeps.com/a/#!/room/shard3/".concat(notification.room) } 
                    }
                }

            }

            //log the message
            console.log("sending message to server: " + JSON.stringify(message));
            fetch(user.gotify.url + '/message', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'X-Gotify-Key': user.gotify.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
        }
        else {
            return;

        }




    }

}
