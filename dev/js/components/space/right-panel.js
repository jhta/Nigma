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
        <Variables />
        <Expresions {...this.props} />
      </div>
    )
  }
});

module.exports = RightPanel;
