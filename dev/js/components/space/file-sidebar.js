const React = require('react');
const MenuActions = require('../../actions/menu-actions');
const FileSideBar = React.createClass({

  getInitialState() {
    return {
      currentRoute: '/',
      items: this.props.items,
    }
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
          <FileSideBar.Form/>
          <ul className="FileSideBar-list">
          {
            this.props.folders.map((folder, index) => {
              return (
                <FileSideBar.Folder folder={folder}  key={index} folderIndex={index} onChangeRoute={this.changeRoute}/>
              )
            })
          }
          </ul>
        </div>
      </div>
    );
  }
});

FileSideBar.Form = React.createClass({
  createFolder(e) {
    console.log(e.keyCode);
    if(e.keyCode == 13) {
      let name = React.findDOMNode(this.refs.folderName).value;
      MenuActions.createFolder(name);
      name = '';
    }
  },
  render() {
    return (
      <input type="text" ref="folderName" onKeyDown={this.createFolder}/>
    );
  }
});

FileSideBar.Item = React.createClass({
  changeRoute() {
    const item = this.props.item;
    this.props.onChangeRoute(item.name, item.father);
    console.log(item);
    if(item.isFolder) {
      console.log("jajajajaj");
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
    debugger
    e.stopPropagation();
    MenuActions.deleteFolder(this.props.folderIndex, this.props.folder);
  },

  render() {
    const folder = this.props.folder;
    return (
      <li className="FileSideBar-Item">
        <div className="FileSideBar-item-left">
          <i className="material-icons">folder</i>
          {folder.name}
        </div>
        <div className="FileSideBar-Item-right">
          <i className="material-icons">language</i>
          <i className="fa fa-times" onClick={this.deleteFolder}></i>
        </div>
      </li>
    )
  }
});


module.exports = FileSideBar;