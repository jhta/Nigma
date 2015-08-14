const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");

const Formulation = require("./formulation");
const Answers     = require("./answers");
const Metadata    = require("./metadata");
const RightPanel  = require("./right-panel");

const Space = React.createClass({

  mixins: [ThemeMixin],

  getInitialState() {
    return {
      expresions: false,
      dialogTeX: ""
    }
  },

  showExpresions(flag=true) {
    this.setState({expresions: flag});
  },

  changeDialogTex(TeX) {
    console.log("TeX", TeX);
    //this.setState({dialogTeX: `${this.state.dialogTeX}${TeX}`});
    this.setState({dialogTeX: TeX});
  },

  render() {
    const styleTab = {
      background: '#009688',
      opacity: '1'
    };
    return (
      <div className="Space row">
        <div className="col s8">
          <div className="Space-content z-depth-1 ">
            <Tabs>
              <Tab label="Formulacion" style={styleTab}>
                <Formulation
                  expresions={this.state.expresions}
                  showExpresions={this.showExpresions}
                  closeExpresions={this.closeExpresions}
                  changeDialogTex={this.changeDialogTex}
                  dialogTeX={this.state.dialogTeX}
                />
              </Tab>
              <Tab label="Respuestas" style={styleTab}>
                <Answers />
              </Tab>

              <Tab label="Metadatos" style={styleTab}>
                <Metadata />
              </Tab>

            </Tabs>
          </div>
        </div>
        <RightPanel
          expresions={this.state.expresions}
          changeDialogTex={this.changeDialogTex}
          dialogTeX={this.state.dialogTeX}
        />
      </div>
    )
  }
});

module.exports = Space;
