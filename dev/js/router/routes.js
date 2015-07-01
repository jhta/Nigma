const React         = require("react");
const Router        = require("react-router");
const { Route, Link, DefaultRoute, NotFoundRoute } = Router;

const Nigma = require('../components/app');
const Example = require('../components/example');
const Routes = (
  <Route name="nigma" path="/" handler={Nigma}>
    <DefaultRoute 	handler={Example}/>

  </Route>
)

module.exports = Routes;
