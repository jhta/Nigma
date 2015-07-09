const React         = require("react");
const Router        = require("react-router");
const { Route, Link, DefaultRoute, NotFoundRoute } = Router;

const Nigma = require('../components/app');

const FolderContainer = require('../components/menu/folder-container');

const Routes = (
  <Route name="nigma" path="/" handler={Nigma}>

    <Route name="folders" path="folders" handler={FolderContainer} />

    <DefaultRoute 	handler={FolderContainer}/>

  </Route>
)

module.exports = Routes;
