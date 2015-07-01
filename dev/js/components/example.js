const React = require("react");
const mui = require("material-ui");
const {RaisedButton, AppBar} = mui;
const ThemeManager = new mui.Styles.ThemeManager();


const Example = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render(){
    return (
      <div>
        <AppBar title='Title' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <h1 className="example">hello world</h1>
        <RaisedButton label="Default" />
      </div>
      )
  }
});
module.exports = Example;
