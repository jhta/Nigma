const React = require("react");

const Variables  = require("./variables");
const Expresions = require("./expresions");

const RightPanel = React.createClass({

  propTypes: {
    expresions: React.PropTypes.bool
  },

  render() {
    return (
      <div className="col s4">
        <Variables />
        <Expresions {...this.props} />
      </div>
    )
  }
});

module.exports = RightPanel;
