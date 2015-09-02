const React = require('react');
const Router = require('react-router');
const UserActions = require('../../actions/user');
const UserStore = require('../../stores/user');
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
      UserActions.loginComplete(this.getComponentData());
      this.redirect();
      UserStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this.onChange);
    },

    redirect: function () {
      var user = UserStore.getUser();
      if (user) {
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

