const React = require("react");

/**
 * MATERIALIZE BUTTON
 * --------
 * @prop  [cssClass: css class for component]
 * @prop  [icon: icon for button]
 * @prop  [label: label for button]
 */

const Button = React.createClass({
  render() {
    let cssClass = this.props.cssClass;
    return (
      <div
        className = {`waves-effect waves-light btn ${cssClass}`}
        onClick = {this.props.onClick}
      >
        {
          this.props.icon?
            <i className="material-icons left">
              {this.props.icon}
            </i>
          :
            null
        }
        {this.props.label}
      </div>
    )

  }
});

module.exports = {Button};
