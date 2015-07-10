const React = require("react");
const mui         = require("material-ui");
const {TextField, RaisedButton, FontIcon} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");


var FormFolder = React.createClass({
  mixins: [ThemeMixin, React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      folderName: ""
    };
  },

  render: function() {
    return (
      <div className="row">
        <div className="col s10">
          <TextField
            hintText="Nombre del folder"
            fullWidth={true}
            floatingLabelText="Nombre del folder"
            valueLink={this.linkState('folderName')} />
        </div>
        <div className="col s2">
          <RaisedButton secondary={true} label="Agregar">
            <FontIcon className="muidocs-icon-custom-github"/>
          </RaisedButton>
        </div>
      </div>
    );
  }

});

module.exports = FormFolder;
