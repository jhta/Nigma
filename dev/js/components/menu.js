const React = require("react");
const mui   = require("material-ui");
const TopBar = require("./topbar.js");
const {TextField} = mui;
const ThemeMixin = require("../mixins/ui-theme");

const Menu = React.createClass({

  mixins: [ThemeMixin],

  render(){

    return (
      <div>
        <TopBar />
        <div className="menu-container container z-depth-1">
          <TextField
            hintText="Hint Text"
            floatingLabelText="Floating Label Text"
            fullWidth={true}
          />

        <ul className="collapsible z-depth-0" data-collapsible="accordion">
           <li>
             <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
             <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
           </li>
           <li>
             <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
             <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
           </li>
           <li>
             <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
             <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
           </li>
         </ul>
        </div>
      </div>
    )
  }
});

module.exports = Menu;
