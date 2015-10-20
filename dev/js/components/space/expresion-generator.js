const React = require("react");

const ExpresionGenerator = React.createClass({

  render() {
    if(!this.props.show)
      return null;

    return (
      <div className="Formulation-ExpresionGenerator">
        Drop your expresions here...
      </div>
    );
  }
});

module.exports = ExpresionGenerator;
