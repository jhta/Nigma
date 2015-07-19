const React = require("react");

const Variables  = require("./variables");
const Expresions = require("./expresions");

const RightPanel = React.createClass({

  render() {
    return (
      <div className="col s4">
        <Variables />
        <Expresions />
      </div>
    )
  }
});

module.exports = RightPanel;
