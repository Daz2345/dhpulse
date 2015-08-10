Posts.addField({
  fieldName: 'chart',
  fieldSchema: {
    type: Boolean,
    optional: false,
    label: 'Include Chart with Post',      
    autoform: {
        group: 'chart'
    },        
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartTitle',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
         group: 'chart',
         label: 'Title'
    },        
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartType',
  fieldSchema: {
    type: String,
    autoform: {
         group: 'chart',
         label: 'Chart Type'
    },
    allowedValues: [
            "Line",
            "Bar",
            "Column",
            "Spline",
            "Step",
            "Area",
            "Area-Spline",
            "Area-Step",
            "Scatter",
            "Pie",
            "Donut",
            "Gauge"],
    optional: true,
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartData',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
         group: 'chart',
         label: 'Chart Data',
         rows: 10
    },        
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartXaxisType',
  fieldSchema: {
    type: String,
    autoform: {
         group: 'chart',
         label: 'X Axis Type'
    },
    allowedValues: [
          "timeseries",
          "category",
          "indexed"],
    optional: true,
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartXaxisCategories',
  fieldSchema: {
    type: String,
    autoform: {
         group: 'chart',
         label: 'X Axis Categories',
         rows: 10
    },
    optional: true,
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartYaxisFormat',
  fieldSchema: {
    type: String,
    autoform: {
         group: 'chart',
         label: 'Y Axis Format'
    },
    optional: true,
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartDescription',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
         group: 'chart',
         label: 'Description'
    },        
    editableBy: ["member", "admin"]
  }
});