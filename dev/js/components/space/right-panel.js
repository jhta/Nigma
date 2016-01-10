const React = require("react");

const Variables  = require("./variables");
const Expresions = require("./expresions");

const RightPanel = React.createClass({

  propTypes: {
    expresions: React.PropTypes.bool
  },

  render() {
    return (
      <div className="Space-right">

      </div>
    )
  }
});

module.exports = RightPanel;
