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
            <li className="FileSideBar-item">
              <i className="material-icons">folder</i>
              Soy un item :)
            </li>
            <li className="FileSideBar-item">
              Soy un item :)
            </li>
            <li className="FileSideBar-item">
              Soy un item :)
            </li>

          </ul>
        </div>

        </div>

    );
  }
})

module.exports = FileSideBar;