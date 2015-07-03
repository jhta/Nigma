const React       = require("react");
const Router      = require("react-router");
const mui         = require("material-ui");
const TopBar      = require("./topbar.js");
const {TextField} = mui;
const ThemeMixin  = require("../mixins/ui-theme");

const {RouteHandler} = Router;
const injectTapEventPlugin = require("react-tap-event-plugin");

const Nigma = React.createClass({

  mixins: [ThemeMixin],

  render(){
    return (
      <div>
        <TopBar />
        <RouteHandler />
      </div>
    )
  }
});

injectTapEventPlugin();

module.exports = Nigma;
