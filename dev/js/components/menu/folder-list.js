const React = require("react");
const MenuActions = require('../../actions/menu-actions');
//Components
const FolderQuestionForm = require('./folder-question-form');

var FolderList = React.createClass({

  getDefaultProps() {
    return {
      folders: []
    };
  },
  propTypes: {
    folders: React.PropTypes.array.isRequired
  },

  componentDidUpdate(prevProps, prevState) {
    $(this.getDOMNode()).collapsible();
  },

  render(){
    let folders = this.props.folders;
    var folderComponents = folders.map((folder, index)=>{
      return <FolderList.Folder folder={folder} folderIndex={index} key={folder._id}/>
    });
    return(
      <ul className="FolderList collapsible popout">
        {folderComponents}
      </ul>
    );
  }

});

FolderList.Folder  = React.createClass({

  propTypes: {
    folder: React.PropTypes.object.isRequired,
    folderIndex: React.PropTypes.number.isRequired,
  },
  _deleteFolder(evt) {
    MenuActions.deleteFolder(this.props.folderIndex, this.props.folder)
  },
  _updateFolder(evt){
    MenuActions.updateFolder(this.props.folderIndex, this.props.folder)
  },

  render() {
    let folder = this.props.folder;
    let folderIndex = this.props.folderIndex;
    var questions = null;
    if(folder.questions){
      questions = folder.questions.map((question, index) => {
        return <FolderList.Folder.Item item={question} folder={folder} key={question._id}/>
      });
    }

    return (
      <li className="Folder">
        <div className="collapsible-header Folder-header">
          <i className="material-icons Folder-header__icon">
            folder
          </i>
          <span className="title Folder-header__title">
            {folder.name}
          </span>
        </div>
        <div className="Folder-body collapsible-body">
          <div className="Folder-body_actions">
            <a className="Folder-body_actions__edit" onClick={this._updateFolder}>
              <i className="material-icons" >
                create
              </i>
            </a>
            <a className="Folder-body_actions__trash" onClick={this._deleteFolder}>
              <i className="material-icons">
                delete
              </i>
            </a>

          </div>
          <div className="Folder-body_questions collection">
            {questions}
          </div>
          <div>
            <FolderQuestionForm folderIndex={folderIndex} folder={folder} />
          </div>
        </div>
      </li>
    );
  }

});

FolderList.Folder.Item  = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render() {
    let item = this.props.item;
    return (
      <a  className="FolderItem collection-item">
        {item.name}
      </a>
    );
  }

});


module.exports = FolderList;
