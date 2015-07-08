const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");


const Formulation = React.createClass({

  mixins: [ThemeMixin],

  render() {
    return (
      <div className="Formulation u-tab-content">
        Formulacion
      </div>
    )
  }
});

module.exports = Formulation;
