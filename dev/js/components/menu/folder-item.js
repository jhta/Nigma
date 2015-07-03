const React = require("react");
const mui         = require("material-ui");
const {TextField, List, ListItem} = mui;
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
          <TextField
            hintText="Create Item"
            fullWidth={true}
          />
          <List>
            {
              folder.items.map((item, index)=>{
                return(
                  <ListItem key={item.index}>{item.title}</ListItem>
                )
              })
            }

          </List>
        </div>
      </li>
    )
  }
});


module.exports = FolderItem;
