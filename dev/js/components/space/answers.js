const React = require("react");
var AnswerContent = React.createClass({
  getInitialState: function() {
    return {
      answers: [{
        _id: 1,
        name: "Area",
        correctValue: "$a * $b",
        precision: 2,
        commonErrors: [
          {
            value: "$b - $a",
            message: "Para calcular el tiempo entre dos primero es el tiempo de fin - tiempo inicio"
          },
          {
            value: "$a * $a",
            message: "Recordar tal formula"
          }
        ]
      },
      {
        _id: 2,
        name: "Perimetro",
        correctValue: "$a * 2 + 2 * $b",
        precision: 3,
        commonErrors: [
          {
            value: "$b - $a",
            message: "Para calcular el tiempo entre dos primero es el tiempo de fin - tiempo inicio"
          },
          {
            value: "$b / $a",
            message: "Recordar tal formula"
          }
        ]
      }
      ]
    };
  },

  _changeAnswer(index, path, value) {
    var objectPath = path.split('.') || [];

    if(objectPath.length == 0)
      return;

    var answers = this.state.answers;
    var item = answers[index];

    for(var i = 0; i < objectPath.length -1; i++) {
      item = item[objectPath[i]];
    }

    item[objectPath[objectPath.length -1]] = value;
    this.setState({
      answers: answers
    });
  },



  render() {
    return (
      <div className="Formulation u-tab-content">
        <AnswerContent.Validation />
        <ul className="collapsible" data-collapsible="expandable">
          {this.state.answers.map((answer, index) => <AnswerContent.Answer key={answer._id} index={index} answer={answer} handleChange={this._changeAnswer} />)}
        </ul>
        <AnswerContent.Validation />

      </div>
    )
  }
});

AnswerContent.Answer = React.createClass({
  _handleChange(evt) {
    var changedVal = $(evt.target);
    this.props.handleChange(this.props.index, changedVal.data("path"), evt.target.value);
  },
  render() {
    return (
      <li>
        <div className="collapsible-header">
            <i className="material-icons">whatshot</i>
            {this.props.answer.name}
        </div>
        <div className="collapsible-body">
          <div className="right-align">
            <i className="material-icons">delete</i>
          </div>

          <ul className="collection" >
            <li className="collection-item">
              <div className="row">
                <div className="input-field col s4">
                  <input  id="correct_value" value={this.props.answer.correctValue} onChange={this._handleChange} data-path="correctValue" type="text" className="validate"/>
                  <label htmlFor="correct_value">Valor correcto</label>
                </div>
                <div className="input-field col s4">
                  <input id="answer_name" value={this.props.answer.name} onChange={this._handleChange} data-path="name" type="text" className="validate"/>
                  <label htmlFor="answer_name">Label</label>
                </div>
                <div className="input-field col s4">
                  <input id="presicion"  value={this.props.answer.precision} onChange={this._handleChange} data-path="precision" type="text" className="validate"/>
                  <label htmlFor="presicion">Precision</label>
                </div>
              </div>
            </li>
            <li className="collection-item">Precisión: {this.props.answer.precision}</li>
            <li className="collection-item">Errores comunes:
             <ul className="collection">
               {this.props.answer.commonErrors.map((error, index) => <AnswerContent.Answer.CommonError key={index} index={index} error={error} />)}
             </ul>
            </li>
          </ul>
        </div>
      </li>
    );
  }

});

AnswerContent.Answer.CommonError = React.createClass({
  render() {
    return (
      <li className="collection-item"><span className="bold">{this.props.error.value}</span>: {this.props.error.message}</li>
    );
  }
});
AnswerContent.Validation = React.createClass({
  render() {
    return (
      <div className="right-align">
        <i className="material-icons">done</i>
      </div>
    )
  }
});


module.exports = AnswerContent;
