const React = require('react');

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
    return(
      <div className="FileSideBar z-depth-1">
        <div className="FileSideBar-header">
          <i className="FileSideBar-icon material-icons left">view_headline</i>
          <span>{this.state.currentRoute}</span>
        </div>
        <div className="FileSideBar-body">
          <input type="text" />
          <ul className="FileSideBar-list">
          {
            this.props.items.map((item) => {
              return (
                <FileSideBar.Item item={item} loadItems={this.props.onLoadItems} onChangeRoute={this.changeRoute}/>
              )
            })
          }
          </ul>
        </div>

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

module.exports = FileSideBar;