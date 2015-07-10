const React = require("react");
const mui         = require("material-ui");
const {Card} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");

//USED COMPONENTS
var FolderForm = require('./folder-form');

var FolderContainer = React.createClass({
  mixins: [ThemeMixin],

  render: function() {
    return (
      <Card className="FolderContainer container z-depth-1">
        <h3 className="title">Preguntas y temas</h3>
        <hr />
        <FolderForm />
      </Card>
    );
  }

});

module.exports = FolderContainer;
