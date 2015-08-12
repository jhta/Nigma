const React = require("react");
const Router = require("react-router");
const mui = require("material-ui");
const TopBar = require("./topbar.js");
const ThemeMixin = require("../mixins/ui-theme");
const Auth = require("../utils/auth");
const UserStore = require('../stores/user');
const UserActions = require('../actions/user');
const {RouteHandler} = Router;
const injectTapEventPlugin = require("react-tap-event-plugin");

const Nigma = React.createClass({

  mixins: [ThemeMixin, Router.Navigation, Router.State],

  getInitialState() {
    return {
      user: ""
    }
  },

  componentWillMount: function () {
    UserActions.setUserStore();
    UserStore.addChangeListener(this._handleChange);
    if (UserStore.getUser()) {
      this.setState({
        user: UserStore.getUser().name
      });
    }
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._handleChange);
  },

  _handleChange() {
    this.setState({
      user: UserStore.getUser().name
    });
  },

  onChange: function () {
    this.setState({name: UserStore.getUser().name});
  },

  render(){
    return (
      <div>
        <TopBar user={this.state.user}/>
        <RouteHandler />
      </div>
    )
  }
});

injectTapEventPlugin();

module.exports = Nigma;
