const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");
const Modal = require('../util/modal');

const Formulation = require("./formulation");
const Answers     = require("./answers");
const Metadata    = require("./metadata");
const RightPanel  = require("./right-panel");
const FileSideBar = require("./file-sidebar");
var LinkedStateMixin = require('react-addons-linked-state-mixin');


const SpaceActions = require('../../actions/space/space-actions');

//Window


const items = [
  {
    father: '/',
    isFolder: true,
    shared: true,
    name: "folder1",
    url: 'otrosItems'
  },
  {
    father: '/',
    isFolder: false,
    shared: true,
    name: "item1",
    url: 'otrosItems'
  },
  {
    father: '/',
    isFolder: false,
    shared: false,
    name: "item2",
    url: 'otrosItems'
  },
  {
    father: '/',
    isFolder: false,
    shared: false,
    name: "item3",
    url: 'otrosItems'
  },
]

const folderChilds = [
  {
    url: 'otrosItems',
    items: [
      {
        father: '/',
        isFolder: false,
        shared: true,
        name: "item1",
        url: 'otrosItems'
      },
      {
        father: '/',
        isFolder: false,
        shared: false,
        name: "item2",
        url: 'otrosItems'
      },
      {
        father: '/',
        isFolder: false,
        shared: false,
        name: "item3",
        url: 'otrosItems'
      },
    ]
  }
]

/*Stores*/
window.VariableStore = require('../../stores/space/variable-store');
window.AnswerStore = require('../../stores/space/answer-store');
window.SpaceStore = require('../../stores/space/space-store');
const Space = React.createClass({

  mixins: [ThemeMixin],

  getInitialState() {
    return {
      items: items,
      expresions: false,
      dialogTeX: "",
      previewOutput: null
    }
  },

  componentWillMount() {
    SpaceStore.addChangeListener(this._handleChange);
  },

  _handleChange() {
    this.setState({
      previewOutput: SpaceStore.getPreview()
    });
  },

  loadItems(url) {
    const folder = folderChilds.filter((folder) => {
      return folder.url == url
    })
    let that = this;
    setTimeout(() => {
      console.log(folder[0].items);
      that.setState({
        items: folder[0].items
      });
    },200);
  },

  showExpresions(flag = true) {
    this.setState({expresions: flag});
  },

  changeDialogTex(TeX) {
    //console.log("TeX", TeX);
    //this.setState({dialogTeX: `${this.state.dialogTeX}${TeX}`});
    this.setState({dialogTeX: TeX});
  },

  _previewQuestion() {
    var data = {
      variables: VariableStore.getVariables(),
      answers: AnswerStore.getAnswers(),
      formulation: "No se de donde se coge esto"//PIPE!!
    }
    SpaceActions.previewQuestion(data)
  },

  render() {
    const styleTab = {
      background: '#009688',
      opacity: '1'
    };
    var modal = null;
    if(this.state.previewOutput != null && this.state.previewOutput.error){
      modal = <Modal ref="modal" title="Preview"><h1>Ocurrio un error</h1></Modal>;
    } else if (this.state.previewOutput != null && !this.state.previewOutput.error){
      modal = <Modal ref="modal" title="Preview"><iframe src="http://localhost:4000/static/launch.html"></iframe></Modal>;
    }

    return (
      <div className="Wrapper ">
        <FileSideBar items={this.state.items} onLoadItems={this.loadItems}/>
        <div className="Space">
          <div className="Space-inner">
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

          <button className="btn waves-effect waves-light send-btn" onClick={this._previewQuestion}>Preview</button>
          {modal}
        </div>
      </div>
    )
  },
  componentWillUnmount() {
    AnswerStore.removeChangeListener();
  },
  componentDidUpdate(prevProps, prevState) {
    if(this.state.previewOutput != null) {
      console.log(this.state.previewOutput);
      console.log(this.refs);
      this.refs.modal.openModal();
    }
  },
});

module.exports = Space;
