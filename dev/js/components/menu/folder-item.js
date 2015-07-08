const React = require("react");
const mui         = require("material-ui");
const {TextField, List, ListItem, FontIcon, FlatButton} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");

const FolderItem = React.createClass({

  mixins: [ThemeMixin],

  render(){
    let folder = this.props.folder;
    return (
      <li className="FolderItem">
        <div className="collapsible-header">
          <i className="material-icons">filter_drama</i>
          {folder.name}
        </div>
        <div className="FolderItem-content collapsible-body">
          <FolderItem.Form />
          <FolderItem.List items={folder.items}/>
        </div>
      </li>
    )
  }
});

FolderItem.Form = React.createClass({
  render() {
    return(
      <TextField
        hintText="Create Item"
        fullWidth={true}
      />
    );
  }
});

FolderItem.List = React.createClass({
  render() {
    return (
      <ul className="collection">
          {
            this.props.items.map((item, index)=>{
              return(
                <li key={item.index}
                  className="collection-item">
                  <div>
                    <a className="waves-effect waves-teal btn-flat">
                      {item.title}
                    </a>

                    <a href="#!" className="secondary-content">
                      <i className="material-icons">send</i>
                    </a>
                  </div>
                </li>
              )
            })
          }
        </ul>
    );
  }
});

module.exports = FolderItem;
