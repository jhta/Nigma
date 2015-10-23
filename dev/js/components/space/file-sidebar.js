const React = require('react');
const MenuActions = require('../../actions/menu-actions');
const FileSideBar = React.createClass({

  getInitialState() {
    return {
      currentRoute: this.generateCurrentRoute(),
      items: this.props.items,
      activeItemIndex: null,
    }
  },

  componentWillReceiveProps(nextProps) {
  let route = ''; 
   if (nextProps.historyString.length > 0) {
      route = '/' + nextProps.historyString.reduce((prev, next) => `${prev}/${next}`);
    }
    route = '/';
    if (route !== this.state.currentRoute) {
      this.setState({
        currentRoute: route,
      });
    }
  },

  generateCurrentRoute() {
    console.log("current", this.props.historyString);
    if (this.props.historyString.length > 0) {
      return '/' + this.props.historyString.reduce((prev, next) => `${prev}/${next}`);
    }
    return '/';
  },

  setActiveItem(index) {
    this.setState({
      activeItemIndex: index,
    });
  },

  changeRoute(route, father) {
    this.setState({
      currentRoute: `${father}${route}`
    });
  },

  loadItems(url) {
    const folder = this.props.folderItems.filter((folder) => {
      return folder.url == url
    })
    let that = this;
    setTimeout(() => {
      console.log(folder);
      that.setState({
        items: folder.items
      },200);

    });
  },

  goBack() {
    this.props.goBackFolder();
  },

  renderQuestions() {
    if(!this.props.questions) return null;
    return this.props.questions.map((question, index) => {
      const active = (this.state.activeItemIndex === index);
      return (
        <FileSideBar.Question
          question={question}
          onSetQuestion={this.props.onSetQuestion}
          openFolder={this.props.openFolder}
          key={index}
          questionIndex={index}
          onChangeRoute={this.changeRoute}
          onSetActiveIndex={this.setActiveItem}
          active={active}
        />
      )
    })
  },

  renderFolders() {
    if(!this.props.folders) {
      return null;
    }
    return this.props.folders.map((folder, index) => {
      return (
        <FileSideBar.Folder folder={folder}  openFolder={this.props.openFolder} key={index} folderIndex={index} onChangeRoute={this.changeRoute}/>
      )
    })
  },
  renderGoBackButton() {
    if (!this.props.isRoot) {
      return (<a href="javascript:void(0)" onClick={this.goBack}>Volver</a>)
    }
  },
  renderForm() {
    if (!this.props.sharedMode) {
      return (<FileSideBar.Form rootId={this.props.rootId} root={this.props.root}/>);
    }
    return false;
  },

  render() {
    return(
      <div className="FileSideBar z-depth-1">
        <div className="FileSideBar-header">
          <span className="FileSideBar-shared" onClick={() => {this.props.onShareMode()}}>Compartdos conmigo</span>
        </div>
        <div className="FileSideBar-header">
          <i className="FileSideBar-icon material-icons left">view_headline</i>
          <span>{this.state.currentRoute}</span>
        </div>
        <div className="FileSideBar-body">
          <ul className="FileSideBar-list">
          {this.renderForm()}
          {this.renderGoBackButton()}
          {this.renderFolders()}
          {this.renderQuestions()}
          </ul>
        </div>
      </div>
    );
  }
});

FileSideBar.Form = React.createClass({
  getInitialState() {
    return {
      createFolder: true,
    };
  },
  create(e) {
    if(e.keyCode == 13) {
      let nameInput = React.findDOMNode(this.refs.folderName);
      MenuActions.createFolder(nameInput.value, this.props.rootId, this.props.root);
      nameInput.value = '';
    }
  },
  changeCreator(e) {
    console.log(e.target.checked);
    if(e.target.checked) {
      this.setState({
        createFolder: false,
      });
    }
  },
  createFolder() {
    let nameInput = React.findDOMNode(this.refs.folderName);
    MenuActions.createFolder(nameInput.value, this.props.rootId, this.props.root);
    nameInput.value = '';
  },

  createItem() {
    let nameInput = React.findDOMNode(this.refs.folderName);
    MenuActions.createQuestion(nameInput.value, this.props.rootId, this.props.root);
    nameInput.value = '';
  },

  render() {
    return (
      <div className="FileSideBar-Form">
        <input type="text" ref="folderName" className="FileSideBar-Form-input"onKeyDown={this.create}/>
        <i className="FileSideBar-iconCreate material-icons" onClick={this.createFolder}>folder</i>
        <i className="FileSideBar-iconCreate material-icons" onClick={this.createItem}>description</i>
      </div>
    );
  }
});

FileSideBar.Folder = React.createClass({

  getInitialState() {
    return {
      showInput: false,
    };
  },

  deleteFolder(e) {
    e.stopPropagation();
    MenuActions.deleteFolder(this.props.folderIndex, this.props.folder);
  },

  openFolder(e) {
    e.stopPropagation();
    this.props.openFolder(this.props.folder);
  },

  shareFolder(e) {
    e.preventDefault();
    const email = this.refs.email.getDOMNode().value;
    MenuActions.shareFolder(this.props.folderIndex, this.props.folder, email);
    this.refs.email.getDOMNode().value = '';
  },

  onOpenInput(e) {
    e.preventDefault();
    this.setState({
      showInput: !this.state.showInput,
    });
  },

  renderFormShare() {
    if(this.state.showInput) {
      return (
        <form onSubmit={this.shareFolder}>
          <input ref="email" type="email"/>
        </form>
      );
    }
    return null;
  },

  render() {
    const folder = this.props.folder;
    return (
      <li>
        <div className="FileSideBar-Item">
          <div className="FileSideBar-item-left">
            <i className="material-icons">folder</i>
            <span onClick={this.openFolder}>{folder.name}</span>
          </div>
          <div className="FileSideBar-Item-right">
            <i className="material-icons" onClick={this.onOpenInput}>language</i>
            <i className="fa fa-times" onClick={this.deleteFolder}></i>
          </div>
        </div>
        {this.renderFormShare()}
      </li>
    )
  }
});

FileSideBar.Question = React.createClass({
  getInitialState() {
    return {
      showInput: false,
    };
  },
  deleteQuestion(e) {
    e.stopPropagation();
    MenuActions.deleteQuestion(this.props.questionIndex, this.props.question);
  },

  onSetQuestion(e) {
    e.stopPropagation();
    const {question, questionIndex} = this.props;
    this.props.onSetActiveIndex(questionIndex);
    this.props.onSetQuestion(question);
  },

  shareQuestion(e) {
    e.preventDefault();
    const email = this.refs.email.getDOMNode().value;
    MenuActions.shareQuestion(this.props.questionIndex, this.props.question, email);
    this.refs.email.getDOMNode().value = '';
  },

  onOpenInput(e) {
    e.preventDefault();
    this.setState({
      showInput: !this.state.showInput,
    });
  },
  renderFormShare() {
    if(this.state.showInput) {
      return (
        <form onSubmit={this.shareQuestion}>
          <input ref="email" type="email"/>
        </form>
      );
    }
    return null;
  },

  render() {
    const {question, active} = this.props;
    const classCss = (active) ? ' is-active ' : null;
    return (
      <li>
        <div className={`${classCss} FileSideBar-Item`}>
          <div className="FileSideBar-item-left" onClick={this.onSetQuestion}>
            <i className="material-icons">description</i>
            {question.name}
          </div>
          <div className="FileSideBar-Item-right">
            <i className="material-icons" onClick={this.onOpenInput}>language</i>
            <i className="fa fa-times" onClick={this.deleteQuestion}></i>
          </div>
        </div>
        {this.renderFormShare()}
      </li>
    );
  }
});


module.exports = FileSideBar;