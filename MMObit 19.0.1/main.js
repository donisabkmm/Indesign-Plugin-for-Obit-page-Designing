const { entrypoints } = require("uxp");
// const { app } = require("indesign");

entrypoints.setup({
  panels: {
    showPanel: {
      show({node} = {}) {}
    }
  }
});

