const React = require('react');
const MenuActions = require('../../actions/menu-actions');
const FileSideBar = React.createClass({

  getInitialState() {
    return {
      currentRoute: this.generateCurrentRoute(),
      items: this.props.items,
    }
  },

  generateCurrentRoute() {
    console.log("current", this.props.historyString);
    if (this.props.historyString.length > 0) {
      return '/' + this.props.historyString.reduce((prev, next) => `${prev}/${next}`);
    }
    return '/';
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
    return this.props.questions.map((question, index) => {
      return (
        <FileSideBar.Question question={question} openFolder={this.props.openFolder} key={index} folderIndex={index} onChangeRoute={this.changeRoute}/>
      )
    })
  },

  renderFolders() {
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
  render() {
    if(!this.props.folders) {
      return null;
    }
    return(
      <div className="FileSideBar z-depth-1">
        <div className="FileSideBar-header">
          <i className="FileSideBar-icon material-icons left">view_headline</i>
          <span>{this.state.currentRoute}</span>
        </div>
        <div className="FileSideBar-body">
          <FileSideBar.Form rootId={this.props.rootId} root={this.props.root}/>
          <ul className="FileSideBar-list">
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
      if(this.state.createFolder) {
        MenuActions.createFolder(nameInput.value, this.props.rootId, this.props.root);
      } else {
        MenuActions.createQuestion(nameInput.value, this.props.rootId, this.props.root);
        console.log("create item");
      }
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
  render() {
    return (
      <div className="FileSideBar-Form">
        <input type="text" ref="folderName" className="FileSideBar-Form-input"onKeyDown={this.create}/>
        <span className="FileSideBar-Form-check"><input type="checkbox" onChange={this.changeCreator}/></span>
      </div>
    );
  }
});

FileSideBar.Item = React.createClass({
  changeRoute() {
    const item = this.props.item;
    this.props.onChangeRoute(item.name, item.father);
    console.log(item);
    if(item.isFolder) {
      this.props.loadItems(item.url);
    }
  },

  render() {
    const item = this.props.item;
    const icon = item.isFolder? "folder" : "description";
    return (
      <li className="FileSideBar-Item" onClick={this.changeRoute}>
        <div className="FileSideBar-item-left">
          <i className="material-icons">{icon}</i>
          {item.name}
        </div>
        <div className="FileSideBar-Item-right">
          <i className="material-icons">language</i>
          <i className="fa fa-times"></i>
        </div>
      </li>
    )
  }
});

FileSideBar.Folder = React.createClass({
  deleteFolder(e) {  
    e.stopPropagation();
    MenuActions.deleteFolder(this.props.folderIndex, this.props.folder);
  },

  openFolder(e) {
    e.stopPropagation();
    this.props.openFolder(this.props.folder);
  },

  render() {
    const folder = this.props.folder;
    return (
      <li className="FileSideBar-Item">
        <div className="FileSideBar-item-left">
          <i className="material-icons">folder</i>
          <span onClick={this.openFolder}>{folder.name}</span>
        </div>
        <div className="FileSideBar-Item-right">
          <i className="material-icons">language</i>
          <i className="fa fa-times" onClick={this.deleteFolder}></i>
        </div>
      </li>
    )
  }
});

FileSideBar.Question = React.createClass({
  deleteFolder(e) {  
    e.stopPropagation();
    MenuActions.deleteFolder(this.props.folderIndex, this.props.folder);
  },

  render() {
    const {question} = this.props;
    return (
      <li className="FileSideBar-Item">
        <div className="FileSideBar-item-left">
          <i className="material-icons">description</i>
          {question.name}
        </div>
        <div className="FileSideBar-Item-right">
          <i className="fa fa-times" ></i>
        </div>
      </li>
    )
  }
});


module.exports = FileSideBar;