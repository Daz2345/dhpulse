/**
 * Post views are filters used for subscribing to and viewing posts
 * @namespace Posts.views
 */
Posts.views = {};

/**
 * Add a post view
 * @param {string} viewName - The name of the view
 * @param {function} [viewFunction] - The function used to calculate query terms. Takes terms and baseParameters arguments
 */
Posts.views.add = function (viewName, viewFunction) {
  Posts.views[viewName] = viewFunction;
};

/**
 * Base parameters that will be common to all other view unless specific properties are overwritten
 */
Posts.views.baseParameters = {
  find: {
    status: Posts.config.STATUS_APPROVED
  },
  options: {
    limit: Settings.get('postsPerPage', 15)
  }
};

/**
 * Top view
 */
Posts.views.add("top", function (terms) {
  return {
    options: {sort: {sticky: -1, score: -1}}
  };
});

/**
 * New view
 */
Posts.views.add("new", function (terms) {
  return {
    options: {sort: {sticky: -1, postedAt: -1}}
  };
});

/**
 * Best view
 */
Posts.views.add("best", function (terms) {
  return {
    options: {sort: {sticky: -1, baseScore: -1}}
  };
});

/**
 * Pending view
 */
Posts.views.add("pending", function (terms) {
  return {
    find: {
      status: Posts.config.STATUS_PENDING
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});

/**
 * Rejected view
 */
Posts.views.add("rejected", function (terms) {
  return {
    find: {
      status: Posts.config.STATUS_REJECTED
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});

/**
 * Scheduled view
 */
Posts.views.add("scheduled", function (terms) {
  return {
    find: {postedAt: {$gte: new Date()}},
    options: {sort: {postedAt: -1}},
    showFuture: true
  };
});

/**
 * unread view
 */
Posts.views.add("unreadPosts", function (terms) {
  return {
    find: {readBy: {$nin: [terms.userId]}},
    options: {sort: {sticky: -1, postedAt: -1}}
  };
});

/**
 * own posts view
 */
Posts.views.add("ownPosts", function (terms) {
  return {
    find: {userId: terms.userId},
    options: {sort: {sticky: -1, postedAt: -1}}
  };
});

/**
 * User posts view
 */
Posts.views.add("userPosts", function (terms) {
  return {
    find: {userId: terms.userId},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

/**
 * User starred posts view
 */
Posts.views.add("starred", function (terms) {
  return {
    find: {starred: terms.userId},
    options: {sort: {sticky: -1, postedAt: -1}}
  };
});

/**
 * User upvoted posts view
 */
Posts.views.add("userUpvotedPosts", function (terms) {
  var user = Meteor.users.findOne(terms.userId);
  var postsIds = _.pluck(user.telescope.upvotedPosts, "itemId");
  return {
    find: {_id: {$in: postsIds}, userId: {$ne: terms.userId}}, // exclude own posts
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

/**
 * User downvoted posts view
 */
Posts.views.add("userDownvotedPosts", function (terms) {
  var user = Meteor.users.findOne(terms.userId);
  var postsIds = _.pluck(user.telescope.downvotedPosts, "itemId");
  // TODO: sort based on votedAt timestamp and not postedAt, if possible
  return {
    find: {_id: {$in: postsIds}},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});
