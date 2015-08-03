const React = require("react");
var Auth = require("../utils/auth");

const TopBar = React.createClass({

  render(){
    return (
      <div className="TopBar">
        <TopBar.Dropdown />
        <nav className="teal">
          <div className="nav-wrapper">
            <a href="#" className="TopBar__brand brand-logo">Nigma</a>
            <ul className="right hide-on-med-and-down">
              {/* Dropdown Trigger */}
              <li>
                <a className="dropdown-button" href="javascript:void(0)" data-activates="dropdown1">
                  {this.props.user}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
});

TopBar.Dropdown = React.createClass({

  logout() {
    Auth.logout((err) => {
      if (err)
        return;
      else
        window.location = "http://nigma.com/"});
  },

  render() {
    return (
      <ul id="dropdown1" className="dropdown-content">
        <li><a href="javascript:void(0)">Profile</a></li>
        <li className="divider"/>
        <li><a href="javascript:void(0)" onClick={this.logout}>Sign Out</a></li>
      </ul>
    )
  }
});

module.exports = TopBar;
