<li className="Formulation-AnswerContainer-Answer">
        <div className="collapsible-header header">
            <i className="material-icons">help</i>
            <span className="title">{this.props.answer.name}</span>
            <span className="actions-container">
              <span className="material-icons">edit</span>
              <span className="material-icons" onClick={this._deleteQuestion}>delete</span>
            </span>
        </div>
        <div className="collapsible-body">
          <ul className="collection main-answer-content" >
            <li className="collection-item main-answer-form">
              <AnswerContainer.Answer.Form answer={this.props.answer} handleChange={this._handleChange} index={this.props.index}/>
            </li>
            <li className="collection-item">
              <div className="collapsible-header header">
                <i className="material-icons">error</i>
                <span className="title">Errores comunes</span>
                <span className="actions-container">
                  <span className="material-icons" onClick={this._addCommonError}>add</span>
                </span>
              </div>
              <div>
                <ul className="collection">
                  {this.props.answer.commonErrors.map((error, index) => <AnswerContainer.Answer.CommonError key={index} index={index} error={error} answer={this.props.answer} answerIndex={this.props.index} handleChange={this._handleChange} />)}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>