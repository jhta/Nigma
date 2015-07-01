const React = require("react");
const mui   = require("material-ui");
const { AppBar, Avatar} = mui;

const ThemeMixin = require("../mixins/ui-theme");

const TopBar = React.createClass({

  mixins: [ThemeMixin],

  render(){

    let User = (
      <Avatar
        src="https://pbs.twimg.com/profile_images/570337268579348480/bVPLdLkK_400x400.jpeg"
        />
    );

    return (
      <div>
        <AppBar
          title='NIGMA'
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementRight={User}
           />
      </div>
      )
  }
});

module.exports = TopBar;
