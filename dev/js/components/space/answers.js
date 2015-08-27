const React = require("react");
var AnswerContainer = React.createClass({
  getInitialState: function() {
    return {
      answers: [{
        _id: 1,
        name: "Area",
        correctValue: "$a * $b",
        showLabel: true,
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
        showLabel: false,
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
      <div className="Formulation-AnswerContainer u-tab-content">
        <AnswerContainer.Validation />
        <ul className="collapsible" data-collapsible="expandable">
          {
            this.state.answers.map((answer, index) => <AnswerContainer.Answer key={answer._id} index={index} answer={answer} handleChange={this._changeAnswer} />)
          }
        </ul>
        <AnswerContainer.Validation />

      </div>
    )
  }
});

AnswerContainer.Answer = React.createClass({
  _handleChange(evt) {
    const changedVal = $(evt.target);
    this.props.handleChange(this.props.index, changedVal.data("path"), evt.target.value);
  },
  _generatePresicion() {
    var presicion = [];
    for (var i = 0; i < 16; i++) {
      presicion.push(i);
    }
    return presicion;
  },
  render() {
    return (
      <li className="Formulation-AnswerContainer-Answer">
        <div className="collapsible-header header">
            <i className="material-icons">help</i>
            <span className="title">{this.props.answer.name}</span>
        </div>
        <div className="collapsible-body">
          <ul className="collection main-answer-content" >
            <li className="collection-item main-answer-form">
              <div className="row">
                <div className="input-field col s4">
                  <input  id="correct_value" value={this.props.answer.correctValue} onChange={this._handleChange} data-path="correctValue" type="text" className="validate"/>
                  <label htmlFor="correct_value">Valor correcto</label>
                </div>
                <div className="input-field col s2">
                  <select ref="presicion_select" value={this.props.answer.precision} onChange={this._handleChange}>
                    {this._generatePresicion().map((optionValue, index) => <option key={index} value={optionValue}>{optionValue}</option>)}
                  </select>
                  <label htmlFor="presicion">Precision</label>
                </div>

                <div className="input-field col s4">
                  <input id="answer_name" value={this.props.answer.name} onChange={this._handleChange} data-path="name" type="text" className="validate"/>
                  <label htmlFor="answer_name">Label</label>
                </div>

                  <div className="input-field switch col s2">
                    <label>
                      Off
                      <input type="checkbox" id="answer_name" checked={this.props.answer.showLabel} onChange={this._handleChange} data-path="showLabel" className="validate"/>
                      <span className="lever"></span>
                      On
                    </label>
                  </div>

              </div>
            </li>
            <li className="collection-item">
              <span className="header">
                <i className="material-icons">error</i>
                <span className="title">Errores comunes</span>
              </span>
            <ul className="collection">
              {this.props.answer.commonErrors.map((error, index) => <AnswerContainer.Answer.CommonError key={index} index={index} error={error} />)}
            </ul>
            </li>
          </ul>
        </div>
      </li>
    );
  },
  componentDidMount() {
    $(this.refs.presicion_select.getDOMNode()).material_select();
  }

});

AnswerContainer.Answer.CommonError = React.createClass({
  render() {
    return (
      <li className="collection-item"><span className="bold">{this.props.error.value}</span>: {this.props.error.message}</li>
    );
  }
});
AnswerContainer.Validation = React.createClass({
  render() {
    return (
      <div className="Formulation-AnswerContainer-Validation">
        <i className="material-icons">done</i>
      </div>
    )
  }
});


module.exports = AnswerContainer;
