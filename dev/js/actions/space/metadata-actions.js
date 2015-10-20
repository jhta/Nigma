const MetadataConstants = require('../../constants/space/metadata-constants');
var Dispatcher = require('../../dispatchers/dispatcher');

var MetadataActions = {
  setDublinCore(dublinCore) {
    Dispatcher.dispatch({
      type: MetadataConstants.SET_DUBLIN_CORE,
      data: dublinCore,
    });
  }
}

module.exports = MetadataActions;
