const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");

const Formulation = require("./formulation");
const Answers     = require("./answers");
const Metadata    = require("./metadata");
const RightPanel  = require("./right-panel");

/*Stores*/
var VariableStore = require('../../stores/space/variable-store');
var AnswerStore = require('../../stores/space/answer-store');

const Space = React.createClass({

  mixins: [ThemeMixin],

  render() {
    return (
      <div className="Space row">
        <div className="col s8">
          <div className="Space-content z-depth-1 ">
            <Tabs>
              <Tab label="Formulacion" >
                <Formulation />
              </Tab>
              <Tab label="Respuestas" >
                <Answers AnswerStore={AnswerStore}/>
              </Tab>

              <Tab label="Metadatos" >
                <Metadata />
              </Tab>

            </Tabs>
          </div>
        </div>
        <RightPanel VariableStore={VariableStore}/>
      </div>
    )
  }
});

module.exports = Space;
