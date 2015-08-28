const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");

const Formulation = require("./formulation");
const Answers     = require("./answers");
const Metadata    = require("./metadata");
const RightPanel  = require("./right-panel");
const FileSideBar = require("./file-sidebar");

const items = [
  {
    father: '/',
    isFolder: true,
    shared: true,
    name: "folder1",
    url: 'otrosItems'
  },
  {
    father: '/',
    isFolder: false,
    shared: true,
    name: "item1",
    url: 'otrosItems'
  },
  {
    father: '/',
    isFolder: false,
    shared: false,
    name: "item2",
    url: 'otrosItems'
  },
  {
    father: '/',
    isFolder: false,
    shared: false,
    name: "item3",
    url: 'otrosItems'
  },
]

const folderChilds = [
  {
    url: 'otrosItems',
    items: [
      {
        father: '/',
        isFolder: false,
        shared: true,
        name: "item1",
        url: 'otrosItems'
      },
      {
        father: '/',
        isFolder: false,
        shared: false,
        name: "item2",
        url: 'otrosItems'
      },
      {
        father: '/',
        isFolder: false,
        shared: false,
        name: "item3",
        url: 'otrosItems'
      },
    ]
  }
]

const Space = React.createClass({

  mixins: [ThemeMixin],

  getInitialState() {
    return {
      items: items,
    }
  },

  loadItems(url) {
    const folder = folderChilds.filter((folder) => {
      return folder.url == url
    })
    let that = this;
    setTimeout(() => {
      console.log(folder[0].items);
      that.setState({
        items: folder[0].items
      });
    },200);

  },

  render() {
    return (
      <div className="Wrapper ">
        <FileSideBar items={this.state.items} onLoadItems={this.loadItems}/>
        <div className="Space">
          <div className="Space-inner">
            <div className="Space-content z-depth-1 ">
              <Tabs>
                <Tab label="Formulacion" >
                  <Formulation />
                </Tab>
                <Tab label="Respuestas" >
                  <Answers />
                </Tab>

                <Tab label="Metadatos" >
                  <Metadata />
                </Tab>
              </Tabs>
            </div>
          </div>
          <RightPanel />
        </div>
      </div>
    )
  }
});

module.exports = Space;
