// Custom User Field

Users.addField({
  fieldName: 'is dunnhumby',
  fieldSchema: {
    type: Boolean,
    optional: true,
    editableBy: ["admin"],
    autoform: {    
    group: 'dunnhumby'
    }
  }
});

Users.addField({
  fieldName: 'categories',
  fieldSchema: {
    type: [String],
    optional: true,
    editableBy: ["dunnhumby"],
    autoform: {
      group: 'dunnhumby',      
      noselect: true,
      options: function () {
        var categories = Categories.find().map(function (category) {
          return {
            value: category._id,
            label: category.name
          };
        });
        return categories;
      }
    }
  }
});