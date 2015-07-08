const React = require("react");
const Router = require("react-router");
const mui         = require("material-ui");
const {TextField} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");

//CURRENT COMPONENTS
const FolderItem = require("./folder-item");

const exampleFolders = [
  {
    name:"name 1",
    items: [
      {title: "item1"},
      {title: "item2"},
      {title: "item3"}
    ]
  },
  {
    name:"name 2",
    items: [
      {title: "item1"},
      {title: "item2"},
      {title: "item3"}
    ]
  },
  {
    name:"name 3",
    items: [
      {title: "item1"},
      {title: "item2"},
      {title: "item3"}
    ]
  },

];

const FolderList = React.createClass({

  mixins: [ThemeMixin],

  render(){
    return (
      <div>
        <div className="FolderList container z-depth-1">
        <FolderList.Form />
        <FolderList.List />

        </div>
      </div>
    )
  }
});


FolderList.Form = React.createClass({
  render() {
    return(
      <TextField
        hintText="Create Folder"
        fullWidth={true}
      />

    )
  }
});

FolderList.List = React.createClass({
  render(){
    return (
      <ul className="FolderList-List collapsible z-depth-0" data-collapsible="accordion">
         {exampleFolders.map((folder, index)=>{
           return (
             <FolderItem folder={folder} key={index}/>
           )
         })}
       </ul>
    )
  }
});
module.exports = FolderList;
