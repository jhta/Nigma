const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");
const Modal = require('../util/modal');

const Formulation = require("./formulation");
const Answers     = require("./answers");
const Metadata    = require("./metadata");
const FileSideBar = require("./file-sidebar");
const Ckeditor = require('../../utils/ckeditor');

const SpaceActions = require('../../actions/space/space-actions');
const VariableActions = require('../../actions/space/variable-actions');
const FormulationActions = require('../../actions/space/formulation-actions');
const AnswerActions = require('../../actions/space/answer-actions');
const MenuActions = require("../../actions/menu-actions");
const Variables  = require("./variables");
const Expresions = require("./expresions");

/*Stores*/
window.VariableStore = require('../../stores/space/variable-store');
window.MetadataStore = require('../../stores/space/metadata-store');
window.AnswerStore = require('../../stores/space/answer-store');
window.SpaceStore = require('../../stores/space/space-store');
window.MenuStore = require("../../stores/menu-store");

const Answer = require('../../utils/answers/answer');


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

  componentDidUpdate(prevProps, prevState) {
    if(this.refs.collapse != null){
      $(this.refs.collapse.getDOMNode()).collapsible();
    }
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
      questions: rootFolder.questions
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
  	console.log("Setting Question", question);
  	var defaultData = {
  		formulation: "",
  		variables: {text: "", variables: []},
  		answer: new Answer(),
  		metadata: {title: question.name, author: ""}
  	};
  	var keys = ["formulation", "variables", "answer", "metadata"];
  	for(var i = 0;i < keys.length; i++) {
  		var key = keys[i];
  		var data = defaultData[key];
  		if(question[key] == null)
  			question[key] = data;
  		else if(key != "variables")
  			question[key] = JSON.parse(question[key]);
  	}
    SpaceActions.setActualQuestion(question);
    setTimeout(() => {
      this.setState({
        currentQuestion: question,
      });
      FormulationActions.addFormulation(question.formulation);
      VariableActions.loadVariables(question.variables);
      AnswerActions.setAnswer(question.answer);
    }, 400);

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
    var data = this._getQuestionData();
    SpaceActions.previewQuestion(this.state.currentQuestion._id, data);
  },

  _exportQuestion(){
    var data = this._getQuestionData();
    SpaceActions.updateQuestionAndExport(this.state.currentQuestion._id, data);
  },

  openFolder(folder) {
    const history = this.state.history;
    const historyString = this.state.historyString;
    history.push(this.state.root);
    historyString.push(folder.name);
    this.setState({
      root: folder,
      rootId: folder._id,
      folders: folder.folders,
      questions: folder.questions || [],
      isRoot: false,
      history: history,
      historyString: historyString
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
    var data = this._getQuestionData();
    SpaceActions.updateQuestionData(data, this.state.currentQuestion._id)
  },

  _getQuestionData() {
    let questionFormulation = Ckeditor.getValue();
    //FormulationActions.addFormulation(questionFormulation);
    var data = {
      variables: VariableStore.getVariables().text,
      answer: JSON.stringify(AnswerStore.getAnswer()),
      formulation: questionFormulation,
      metadata: MetadataStore.getMetadata()
    };
    return data;
  },

  renderContent() {
    if (Object.keys(this.state.currentQuestion) <= 0) {
      return null;
    }
    return (
      <div className="Space">
        <h1 style={{margin: '5px 0 0 20px', fontSize: '30px', lineHeight: '30px'}}>{this.state.currentQuestion.name}</h1>
        <div >
          <ul ref="collapse" className="collapsible" data-collapsible="expandable">
            <li>
              <div className="collapsible-header"><i className="material-icons">functions</i>Variables</div>
              <div className="collapsible-body">
               <Variables
                 currentQuestion={this.state.currentQuestion}
                 getQuestionData={this._getQuestionData}/>
               <Expresions
                  expresions={this.state.expresions}
                  changeDialogTex={this.changeDialogTex}
                  dialogTeX={this.state.dialogTeX}
                  currentQuestion={this.state.currentQuestion}
                  getQuestionData={this._getQuestionData} />
              </div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">mode_edit</i>Formulación</div>
              <div className="collapsible-body">
                <Formulation
                  expresions={this.state.expresions}
                  showExpresions={this.showExpresions}
                  closeExpresions={this.closeExpresions}
                  changeDialogTex={this.changeDialogTex}
                  dialogTeX={this.state.dialogTeX}
                  currentQuestion={this.state.currentQuestion}
                  getQuestionData={this._getQuestionData}
                />
              </div>
            </li>
             <li>
              <div className="collapsible-header"><i className="material-icons">question_answer</i>Respuestas</div>
              <div className="collapsible-body">
                <Answers
                  currentQuestion={this.state.currentQuestion}
                  getQuestionData={this._getQuestionData} />
              </div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">speaker_notes</i>Metadatos</div>
              <div className="collapsible-body">
                <Metadata
                  metadata={this.state.currentQuestion.metadata}
                  currentQuestion={this.state.currentQuestion}
                  getQuestionData={this._getQuestionData}
                />
              </div>
            </li>

          </ul>
          <button className="btn waves-effect waves-light send-btn" onClick={this._previewQuestion}>Previsualizar</button>
          <button className="btn waves-effect waves-light save-btn" onClick={this._saveQuestion}>Guardar</button>
          <button className="btn waves-effect waves-light export-btn" onClick={this._exportQuestion}>Exportar a Scorm</button>
        </div>
      </div>
    );
  },

  render() {

    return (
      <div className="Wrapper">
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
  }
});

module.exports = Space;
