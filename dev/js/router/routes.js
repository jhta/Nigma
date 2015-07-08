const React         = require("react");
const Router        = require("react-router");
const { Route, Link, DefaultRoute, NotFoundRoute } = Router;

const Nigma = require('../components/app');

const FolderList = require('../components/menu/folder-list');
const Space = require('../components/space/space');

const Routes = (
  <Route name="nigma" path="/" handler={Nigma}>
    <Route name="folders" path="folders" handler={FolderList} />
    <Route name="space" path="space" handler={Space} />
    <DefaultRoute 	handler={FolderList}/>
  </Route>
)

module.exports = Routes;
