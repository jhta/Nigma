const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");

const Formulation = require("./formulation");
const Answers     = require("./answers");
const Metadata    = require("./metadata");

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
                <Answers />
              </Tab>

              <Tab label="Metadatos" >
                <Metadata />
              </Tab>

            </Tabs>
          </div>
        </div>
        <div className="col s4">
          <div className="Space-right z-depth-1">
            hola!
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Space;
