const React = require("react");
const mui         = require("material-ui");
const {Card} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");

var React = require('react');

var FolderContainer = React.createClass({
  mixins: [ThemeMixin],

  render: function() {
    return (
      <Card>
        
      </Card>
    );
  }

});

module.exports = FolderContainer;
