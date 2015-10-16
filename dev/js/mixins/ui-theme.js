const React = require("react");
const mui = require("material-ui");
const ThemeManager = new mui.Styles.ThemeManager();

const UITheme = {

    childContextTypes: {
      muiTheme: React.PropTypes.object
    },

    getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    },
}

module.exports = UITheme;
