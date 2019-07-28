const { addWebpackAlias, override } = require('customize-cra');
const path = require('path');
module.exports = override(    
  addWebpackAlias({        
    "views": path.resolve(__dirname, "src/views"),  
    "store": path.resolve(__dirname, "src/store"),  
    "router": path.resolve(__dirname, "src/router")
  })
);