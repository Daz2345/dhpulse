// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

Template.search.helpers({
  canSearch: function () {
    return Users.can.view(Meteor.user());
  },
  searchQuery: function () {
    return FlowRouter.getQueryParam("query");
  },
  searchQueryEmpty: function () {
    return !!FlowRouter.getQueryParam("query") ? "" : "empty";
  },
  hideme: function() {
    var hidden = "";
    if (Session.get('hide_search') === true) {
      hidden = 'hideme';
    }
    else {
      hidden = '';
    }
    return hidden;
  },
  hide: function() {
    var hidden = "";
    if (Session.get('hide_search') === true) {
      hidden = 'hide';
    }
    else {
      hidden = '';
    }
    return hidden;
  }, 
});

Template.search.events({
  'keyup .search-field': function (e) {
    
    e.preventDefault();
    
    var val = $(e.target).val(),
        $search = $('.search');

    // if we're not on search route, go to it

    if (FlowRouter.getRouteName() !== "postsDefault") {
      FlowRouter.go("postsDefault", null ,null);
    }

    if (val === '') {
      // if search field is empty
      $search.addClass('empty');
      val = null;
    } else {
      $search.removeClass('empty');
    }

    delay(function(){
      FlowRouter.setQueryParams({query: val});
    }, 500 );

  }
});

