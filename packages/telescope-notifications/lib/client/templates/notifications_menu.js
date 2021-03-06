var getNotifications = function () {
  return Herald.collection.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}}).fetch();
};

Template.notifications_menu_desktop.helpers({
  hasNotifications: function () {
    var notifications = getNotifications();
    return notifications.length;
  },
  menuLabel: function () {
    var notificationsCount;
    var notifications = getNotifications();

    if(notifications.length === 0){
      notificationsCount = "";
    }else if(notifications.length === 1){
      notificationsCount = "<i class='icon animated tada fa fa-fw fa-bell' aria-hidden='true'></i>";
    }else{
      notificationsCount = notifications.length + ' ' + "<i class='icon animated tada fa fa-fw fa-bell' aria-hidden='true'></i>";
    }

    return notificationsCount;
  },
  menuItems: function () {
    var notifications = getNotifications();
    var markAllAsRead = [{
      template: 'notifications_mark_as_read'
    }];
    var menuItems;
    if (notifications.length) {
      menuItems = markAllAsRead.concat(_.map(notifications, function (notification) {
        return {
          template: "notification_item",
          data: notification
        };
      }));
    } else {
      menuItems = [];
    }
    return menuItems;
  },
  menuType: function () {
    if (this.zone === "mobileNav") {
      return 'collapsible';
    } else if (Settings.get('navLayout', 'top-nav') === 'top-nav') {
      return 'dropdown';
    } else {
      return 'collapsible';
    }
  }
});

Template.notifications_menu_mobile.helpers({
  hasNotifications: function () {
    var notifications = getNotifications();
    return notifications.length;
  },
  notificationLength: function() {
    var notifications = getNotifications();    
    return notifications.length > 0;
  },
  menuLabel: function () {
    var notificationsCount;
    var notifications = getNotifications();

    if(notifications.length === 0){
      notificationsCount = i18n.t('no_notifications');
    }else if(notifications.length === 1){
      notificationsCount = i18n.t('1_notification');
    }else{
      notificationsCount = notifications.length+' '+ i18n.t('notifications');
    }

    return notificationsCount;
  },
  menuItems: function () {
    var notifications = getNotifications();
    var markAllAsRead = [{
      template: 'notifications_mark_as_read'
    }];
    var menuItems;
    if (notifications.length) {
      menuItems = markAllAsRead.concat(_.map(notifications, function (notification) {
        return {
          template: "notification_item",
          data: notification
        };
      }));
    } else {
      menuItems = [];
    }
    return menuItems;
  },
  menuType: function () {
    if (this.zone === "mobileNav") {
      return 'collapsible';
    } else if (Settings.get('navLayout', 'top-nav') === 'top-nav') {
      return 'dropdown';
    } else {
      return 'collapsible';
    }
  }
});
