const React         = require("react");
const Router        = require("react-router");
const { Route, Link, DefaultRoute, NotFoundRoute } = Router;

const Nigma = require('../components/app');

const Menu = require('../components/menu');

const Routes = (
  <Route name="nigma" path="/" handler={Nigma}>
    <DefaultRoute 	handler={Menu}/>

  </Route>
)

module.exports = Routes;
