const React = require("react");

//Components
const FolderQuestionForm = require('./folder-question-form');

const FolderItem  = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render() {
    let item = this.props.item;
    return (
      <a  className="FolderItem collection-item">{item.title}</a>
    );
  }

});


const Folder  = React.createClass({

  propTypes: {
    folder: React.PropTypes.object.isRequired,
    folderIndex: React.PropTypes.number.isRequired,
  },

  render() {
    let folder = this.props.folder;
    let folderIndex = this.props.folderIndex;
    var questions = folder.items.map((question, index)=>{
      return <FolderItem item={question} key={index}/>
    });
    return (
      <li className="Folder">
        <div className="collapsible-header">
          <i className="material-icons">folder</i><span className="title">{folder.name}</span>
        </div>
        <div className="collapsible-body">
          <div className="collection">
            {questions}
          </div>
          <FolderQuestionForm folderIndex={folderIndex} />
        </div>
      </li>
    );
  }

});


const FolderList = React.createClass({

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
      return <Folder folder={folder} folderIndex={index} key={folder.id}/>
    });
    return(
      <ul className="collapsible popout FolderList">
        {folderComponents}
      </ul>
    );
  }

});





module.exports = FolderList;
