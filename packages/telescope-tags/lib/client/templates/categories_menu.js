var getRoute = function () {
  FlowRouter.watchPathChange()
  var categoryName = this.data.slug;
  var currentQuery = _.clone(FlowRouter.current().queryParams);
  var newQuery = _.extend(currentQuery, {cat: categoryName});
  return FlowRouter.path("postsDefault", FlowRouter.current().params, newQuery);
};

// Meteor.startup(function () {
  Template.categories_menu.helpers({
    hasCategories: function () {
      return true;
    },
    menuLabel: function () {
      return i18n.t("categories");
    },
    menuItems: function () {

      var activeCategories = FlowRouter.getQueryParam("cat");

      var defaultItem = [{
        route: "postsDefault",
        label: i18n.t("all_categories"),
        itemClass: "item-never-active",
        template: "defaultMenuItem"
      }];

      if (Meteor.user()) {
      var userCats = Meteor.user().categories; 
      var find = {};
      // Users.getCategoriesById(Meteor.userId());

      if (userCats !== undefined) {
        if (userCats.length === 1) { // One Category
          find = {"_id": userCats[0]};
        } else { // cat is an array
          find = {"_id": { $in : userCats}};
        }      
      }
      
      var menuItems = Categories.find(find, {sort: {order: 1, name: 1}}).fetch();

      // filter out categories with no items
      if (Settings.get("hideEmptyCategories", false)) {
        menuItems = _.filter(menuItems, function (category){
          return !!Counts.get(category.getCounterName());
        });
      }

      menuItems = _.map(menuItems, function (category) {

        // if any of this category's children are included in the active categories, expand it
        var isExpanded = _.intersection(activeCategories, _.pluck(category.getChildren(), "slug")).length > 0;

        // is this category active?
        var isActive = _.contains(activeCategories, category.slug);

        return {
          route: getRoute,
          // label: category.name,
          label: category.name+=" <span class=\"category-posts-count\">("+Counts.get(category.getCounterName())+")</span>",
          description: category.description,
          _id: category._id,
          parentId: category.parentId,
          isExpanded: isExpanded,
          isActive: isActive,
          itemClass: "category-"+category.slug,
          data: category
        };
      });

      return defaultItem.concat(menuItems);
      }
      return false
    },
    expandLevel: function () {
      if (this.zone === "mobileNav") {
        return 0;
      } else {
        return 1;
      }
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
// });
