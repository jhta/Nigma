const React = require("react");
const mui         = require("material-ui");
const {Card} = mui;
const Colors = mui.Styles.Colors;
const ThemeMixin  = require("../../mixins/ui-theme");

var FolderContainer = React.createClass({
  mixins: [ThemeMixin],

  render: function() {
    return (
      <Card className="FolderList container z-depth-1">
        <div className="row">
          <h3 className="title">Preguntas y temas</h3>
        </div>
      </Card>
    );
  }

});

module.exports = FolderContainer;
