const React = require('react');
const Router = require('react-router');
const LoginActions = require('../../actions/login');

const LoginStore = require('../../stores/login');
const Auth = require("../../utils/auth");

var LoginComplete =
  React.createClass({

    mixins: [Router.Navigation,   Router.State],

    getInitialState: function () {
      return this.getComponentData();
    },

    getComponentData: function () {
      return {
        token: this.getParams().token
      }
    },

    componentWillMount: function () {
      LoginActions.loginComplete(this.getComponentData());
      LoginActions.userData();

      this.redirect();

      LoginStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function () {
      LoginStore.removeChangeListener(this.onChange);
    },

    redirect: function () {
      var loggedIn = LoginStore.getLoggedIn();
      if (loggedIn) {
        this.transitionTo("folders");
      }
    },

     onChange: function () {
      this.setState({key: this.getComponentData()});
      this.redirect();

    },

    render: function () {
      return (
        <p></p>
      )
    }
  });

module.exports = LoginComplete;

