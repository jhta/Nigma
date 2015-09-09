const API = require('../API');
const FolderAPI = {
  _routes: {
    create: {
      route: "/folders/:folderid/folders",
      method: API._REQUEST_METHOD.post
    },
    update: {
      route: "/folders/:folderid",
      method: API._REQUEST_METHOD.put
    },
    delete: {
      route: "/folders/:folderid",
      method: API._REQUEST_METHOD.delete
    },
    list: {
      route: "/users/folders",
      method: API._REQUEST_METHOD.get
    }
  },
  listFolders(data, cb){
    const route = this._routes.list;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body);
      }
    });
  },
  createFolder(data, cb){
    const route = this._routes.create;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.folder);
      }
    });
  },
  deleteFolder(data, cb){
    const route = this._routes.delete;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.ok);
      }
    });
  },
  updateFolder(data, cb){
    const route = this._routes.update;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.ok);
      }
    });
  }
}

module.exports = FolderAPI;
