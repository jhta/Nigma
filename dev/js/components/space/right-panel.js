const React = require("react");

const Variables  = require("./variables");
const Expresions = require("./expresions");

const RightPanel = React.createClass({

  render() {
    return (
      <div className="Space-right">
        <Variables />
        <Expresions />
      </div>
    )
  }
});

module.exports = RightPanel;
