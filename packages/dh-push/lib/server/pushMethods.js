Push.debug = true;

Push.allow({
    send: function(userId, notification) {
        return true; // Allow all users to send
    }
});

Meteor.methods({
    allUserNotification: function(text,title) {
        var badge = +1;
        Push.send({
            from: Settings.get('title'),
            title: title + " - " + text,
            text: title + " - " + text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title,
                text:text
            },
            query: {
                // this will send to all users
            }
        });
    },
    serverNotification: function(text,title, usersVal) {
        var badge = +1;
        var userQuery = {};
        
        console.log(usersVal.length);
        
        if (typeof usersVal === "string") {
            userQuery.userId = usersVal;
        }
        else if (usersVal.length > 1) {
             userQuery.userId = {$in : usersVal};
        } else {
            userQuery.userId = usersVal[0] ;
        }
        
        Push.send({
            from: Settings.get('title'),
            title: title + " - " + text,
            text: title + " - " + text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title,
                text:text
            },
            query: userQuery                
        });
    },
    userNotification: function(text,title,userId) {
        var badge = +1;
        Push.send({
            from: Settings.get('title'),
            title: title + " - " + text,
            text: title + " - " + text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title
            },
            query: {
                userId: userId //this will send to a specific Meteor.user()._id
            }
        });
    }
});