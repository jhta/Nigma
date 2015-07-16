const React = require("react");

//Components
//const FolderItem = require('./folder-item');

const FolderItem  = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
  render: function() {
    let item = this.props.item;
    return (
      <a  className="collection-item">{item.title}</a>
    );
  }

});


const Folder  = React.createClass({
  propTypes: {
    folder: React.PropTypes.object.isRequired
  },
  render: function() {
    let folder = this.props.folder;
    var questions = folder.items.map(function(question) {
      return <FolderItem item={question} />
    });
    return (
      <li>
        <div className="collapsible-header">
          <i className="material-icons circle">folder</i><span className="title">{folder.name}</span>
        </div>
        <div className="collapsible-body">
          <div className="collection">
            {questions}
          </div>
        </div>
      </li>
    );
  }

});


const FolderList = React.createClass({

  getDefaultProps: function() {
    return {
      folders: []
    };
  },
  propTypes: {
    folders: React.PropTypes.array.isRequired
  },

  render: function(){
    let folders = this.props.folders;
    var folderComponents = folders.map(function (folder) {
      return <Folder folder={folder}/>
    });
    return(
      <ul className="collapsible popout">
        {folderComponents}
      </ul>
    );
  }
});





module.exports = FolderList;
