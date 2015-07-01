const React   = require("react");
const Router  = require("react-router");
const {RouteHandler} = Router;

const injectTapEventPlugin = require("react-tap-event-plugin");

const Nigma = React.createClass({

  render(){
    return (<RouteHandler />)
  }
});

injectTapEventPlugin();

module.exports = Nigma;
