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
const Ckeditor = require('../../utils/ckeditor');

const SpaceActions = require('../../actions/space/space-actions');
const VariableActions = require('../../actions/space/variable-actions');
const FormulationActions = require('../../actions/space/formulation-actions');
const AnswerActions = require('../../actions/space/answer-actions');
const MenuActions = require("../../actions/menu-actions");
const MenuStore = require("../../stores/menu-store");

/*Stores*/
window.VariableStore = require('../../stores/space/variable-store');
window.MetadataStore = require('../../stores/space/metadata-store');
window.AnswerStore = require('../../stores/space/answer-store');
window.SpaceStore = require('../../stores/space/space-store');
window.FormulationStore = require('../../stores/space/formulation-store');

const Space = React.createClass({

  mixins: [ThemeMixin],

  getInitialState() {
    const rootFolder = MenuStore.getRootFolder();
    const questionId = this.props.params.questionId || null;
    return {
      expresions: false,
      dialogTeX: "",
      previewOutput: null,
      root: rootFolder,
      rootId: rootFolder.id,
      folders: rootFolder.folders,
      questions: rootFolder.questions,
      currentFolderId: rootFolder.id,
      isRoot: true,
      history: [],
      historyString: [],
      currentQuestion: {},
      sharedMode: false,
    }
  },
  componentDidMount() {
    MenuActions.listFolders();
    MenuStore.addChangeListener(this._handleChange);
  },

  componentWillUnmount() {
    MenuStore.removeChangeListener()
  },

  _handleChange() {
    const rootFolder =  MenuStore.getRootFolder();
    this.setState({
      root: rootFolder,
      rootId: rootFolder._id,
      folders: rootFolder.folders,
      questions: rootFolder.questions,
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

  setQuestion(question) {
    SpaceActions.setActualQuestion(question);
    console.log(question);
    this.setState({
      currentQuestion: question,
    });
    if(question["data"] == null) {
        question["data"] = {
          formulation: "",
          variables: "",
          answers: []
        }
    } else {
      question.data = JSON.parse(question.data);
    }
    console.log("Setting question ", question);
    FormulationActions.addFormulation(question.data.formulation);
    VariableActions.loadVariables(question.data.variables);
    AnswerActions.loadAnswers(question.data.answers);
  },

  showExpresions(flag = true) {
    this.setState({expresions: flag});
  },

  changeDialogTex(TeX) {
    this.setState({dialogTeX: TeX});
  },

  shareMode() {
    let rootFolder;
    if (!this.state.sharedMode) {
      rootFolder = MenuStore.getRootSharedFolders();
      console.log("nanananana");
    } else {
      rootFolder = MenuStore.getRootFolder();
    }
    this.setState({
      sharedMode: !this.state.sharedMode,
      root: rootFolder,
      rootId: rootFolder.id,
      folders: rootFolder.folders,
      questions: rootFolder.questions,
      currentFolderId: rootFolder.id,
    })
  },

  _previewQuestion() {
    let questionFormulation = Ckeditor.getValue();
    FormulationActions.addFormulation(questionFormulation);

    var data = {
      variables: VariableStore.getVariables(),
      answers: AnswerStore.getAnswers(),
      formulation: questionFormulation
    };

    SpaceActions.previewQuestion(this.state.currentQuestion._id, data);
  },

  _exportQuestion(){
    let questionFormulation = Ckeditor.getValue();
    FormulationActions.addFormulation(questionFormulation);

    var data = {
      variables: VariableStore.getVariables(),
      answers: AnswerStore.getAnswers(),
      formulation: questionFormulation
    };

    SpaceActions.updateQuestionAndExport(this.state.currentQuestion._id, data);
  },

  openFolder(folder) {
    this.state.history.push(this.state.root);
    this.state.historyString.push(this.state.root.name);
    this.setState({
      root: folder,
      rootId: folder._id,
      folders: folder.folders,
      questions: folder.questions || [],
      isRoot: false,
      history: this.state.history,
      historyString: this.state.historyString
    });
  },
  goBackFolder() {
    if(this.state.history.length >= 1) {
      const folder = this.state.history.pop();
      this.state.historyString.pop();
      this.setState({
        root: folder,
        rootId: folder._id,
        folders: folder.folders,
        questions: folder.questions || [],
        isRoot: (this.state.history.length === 0),
        history: this.state.history,
        historyString: this.state.historyString
      });
    }
  },
  _saveQuestion() {
    let answers = AnswerStore.getAnswers();
    let questionFormulation = Ckeditor.getValue();

    FormulationActions.addFormulation(questionFormulation);

    answers.forEach( (answer) => delete answer["code"]);

    var data = {
      variables: VariableStore.getVariables().text,
      answers: answers,
      formulation: questionFormulation,
      metadata: MetadataStore.getDublinCore()
    };

    SpaceActions.updateQuestionData(data, this.state.currentQuestion._id)
  },

  renderContent() {
    if (Object.keys(this.state.currentQuestion) <= 0) {
      return (<div className="Space"><h1>No se a seleccionado la pregunta</h1></div>);
    }
    const styleTab = {
      background: '#009688',
      opacity: '1'
    };
    var modal = null;
    if(this.state.previewOutput != null && this.state.previewOutput.error){
      modal = <Modal ref="modal" title="Preview"><h1>Ocurrio un error</h1></Modal>;
    } else if (this.state.previewOutput != null && !this.state.previewOutput.error){
      modal = <Modal ref="modal" title="Preview"><iframe src="http://localhost:4000/static/launch.html" style={{width: 300, height: 600}}></iframe></Modal>;
    }
    return (
      <div>
        <h1 style={{margin: '5px 0 0 20px', fontSize: '30px', lineHeight: '30px'}}>{this.state.currentQuestion.name}</h1>
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

          <button className="btn waves-effect waves-light send-btn" onClick={this._previewQuestion}>Previsualizar</button>
          <button className="btn waves-effect waves-light save-btn" onClick={this._saveQuestion}>Guardar</button>
          <button className="btn waves-effect waves-light export-btn" onClick={this._exportQuestion}>Exportar a Scorm</button>
          {modal}
        </div>
      </div>
    );
  },

  render() {
    
    return (
      <div className="Wrapper ">
        <FileSideBar
          folders={this.state.folders}
          questions={this.state.questions}
          rootId={this.state.rootId}
          items={this.state.items}
          onLoadItems={this.loadItems}
          root={this.state.root}
          currentFolderId={this.state.currentFolderId}
          openFolder={this.openFolder}
          historyString={this.state.historyString}
          goBackFolder={this.goBackFolder}
          isRoot={this.state.isRoot}
          onSetQuestion={this.setQuestion}
          sharedMode={this.state.sharedMode}
          onShareMode={this.shareMode}
        />
        {this.renderContent()}
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
