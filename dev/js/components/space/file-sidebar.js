const React = require('react');

const FileSideBar = React.createClass({
  render() {
    return(
      <div className="FileSideBar z-depth-1">
        <div className="FileSideBar-header">
          <i className="FileSideBar-icon material-icons left">view_headline</i>
          <span>Folder/item</span>
        </div>
        <div className="FileSideBar-body">
          <input type="text" />
          <ul className="FileSideBar-list">
          {
            this.props.items.map((item) => {
              return (
                <FileSideBar.Item item={item}/>
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
  render() {
    const item = this.props.item;
    const icon = item.isFolder? "folder" : "description";
    return (
      <li className="FileSideBar-item">
        <i className="material-icons">{icon}</i>
          {item.name}
      </li>
    )
  }
});

module.exports = FileSideBar;