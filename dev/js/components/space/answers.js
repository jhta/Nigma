const React = require("react");

var AnswerContent = React.createClass({
  getInitialState: function() {
    return {
      answers: [{
        _id: 1,
        correctValue: "$a - $b",
        precision: 2,
        commonErrors: [
          {
            value: "$b - $a",
            message: "Para calcular el tiempo entre dos primero es el tiempo de fin - tiempo inicio"
          },
          {
            value: "$b * $a",
            message: "Recordar tal formula"
          }
        ]
      }]
    };
  },
  render() {
    return (
      <div className="Formulation u-tab-content">
        <ul className="collapsible" data-collapsible="expandable">
          {this.state.answers.map((answer, index) => <AnswerContent.Answer key={answer._id} index={index} answer={answer} />)}
        </ul>
      </div>
    )
  }
});

AnswerContent.Answer = React.createClass({

  render() {
    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">whatshot</i>{`Respuesta ${this.props.index + 1}`}</div>
        <div className="collapsible-body">
          <div className="row">
            <ul>
              <li>Correcta: {this.props.answer.correctValue}</li>
              <li>Precisión: {this.props.answer.precision}</li>
              <li>Errores comunes: {this.props.answer.commonErrors.map((error, index) => <AnswerContent.Answer.CommonError key={index} index={index} error={error} />)}
              </li>
            </ul>
          </div>
        </div>
      </li>
    );
  }

});

AnswerContent.Answer.CommonError = React.createClass({
  render() {
    return (
      <span>* {this.props.error.value}: {this.props.error.message}</span>
    );
  }
});

module.exports = AnswerContent;
