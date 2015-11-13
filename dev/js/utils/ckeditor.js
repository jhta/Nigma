//Import mathjax library
const Auth = require('./auth');
const SpaceStore =require('../stores/space/space-store');
CKEDITOR.config.mathJaxLib = '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML';
if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
  CKEDITOR.tools.enableHtml5Elements( document );

CKEDITOR.config.height = 150;
CKEDITOR.config.width = 'auto';
var formData = new FormData(), xhr;
var urlfield = null;

CKEDITOR.on('dialogDefinition', function(ev) {
  var dialogName = ev.data.name;
  var dialogDefinition = ev.data.definition;
  var  files = $("<input id=\"inputFiles\" type=\"file\" class=\"\" />");
  if (dialogName == 'image') {
    dialogDefinition.removeContents('Link');
    dialogDefinition.onLoad = function() {  
      var dialog = CKEDITOR.dialog.getCurrent();
      console.log(dialog);
      urlfield = dialog.getContentElement('info', 'txtUrl');
      var idDialogContent = dialog._.contents.info.basic.domId;
      $('#'+idDialogContent).append(files);
      $('#inputFiles').on("change", handleFileSelect);
      init();
    };
  }

  if(dialogName == 'eqneditorDialog'){
    console.log(dialogDefinition);
  }

});

function appendLink(link) {
  urlfield.setValue(link);
}

function initFormData() {
  formData = new FormData();
}


function init() {
    var question = SpaceStore.getActualQuestion()._id;
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://104.131.58.229:4000/api/questions/'+question+'/scorms/uploadfiles', true);
    xhr.setRequestHeader("Authorization", "Bearer " + Auth.getToken());
    xhr.responseType = "json";
    xhr.onload = function () {
        init();
    };
}


function handleFileSelect(evt) {
    var files = evt.target.files; 


    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
          alert("Sólo puedes cargar imágenes");
          continue;
        } else if(f.size >= 10048576){
          alert("La imágen supera el límite de 10 MB");
          continue;
        }
        var reader = new FileReader();
        reader.onload = (function(theFile) {
          console.log(f);

            var name = uniqueId() + f.name;
            formData.append('files[]', f, name);
            return function(e) {
                resolutionImage(reader,function(ok){
                    if(ok) {    
                    }
                });
            };
        })(f);
        reader.readAsDataURL(f);
        uploadFiles()
    }
}

var uniqueId = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

var resolutionImage = function(image, cb){
  var img = new Image;
  img.onload = function() {
      if(img.width>=1024 || img.height>=1024){
          alert("Supera el límite de resolución 1024 X 1024 permitido");
          cb(false);
      }else{
          cb(true);
      }
  };
  img.src = image.result;
};


function uploadFiles() {
  xhr.send(formData);
   xhr.onreadystatechange=function() {
    if (xhr.readyState==4) {
      appendLink(xhr.response.url);
    }
  }
  $('#inputFiles').val("");
  initFormData();
}

window.DialogTEXOpen = false;
function isWysiwygareaAvailable() {
  if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
    return true;
  }
  return !!CKEDITOR.plugins.get( 'wysiwygarea' );
}

const CKEditor = {
  start(openCb, closeCb) {
    let wysiwygareaAvailable = isWysiwygareaAvailable(),
    isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );
    return () => {
      let editorElement = CKEDITOR.document.getById( 'editor' );
      this.openTeXDialog(openCb, closeCb);
      if ( isBBCodeBuiltIn ) {
        editorElement.setHtml(
          'Hello world!\n\n' +
          'I\'m an instance of [url=http://ckeditor.com]CKEditor[/url].'
        );
      }
      if ( wysiwygareaAvailable ) {
        CKEDITOR.replace( 'editor' );
      } else {
        editorElement.setAttribute( 'contenteditable', 'true' );
        CKEDITOR.inline( 'editor' );
      }
  };
},

  openTeXDialog(openCb, closeCb) {
    let that = this;
    setTimeout(() => {
      window.TeXButton = document.getElementsByClassName("cke_button__mathjax");      
      window.TeXButton = window.TeXButton[0];      
      window.TeXButton.addEventListener("click", () => {
      window.DialogTEXOpen = true;
      openCb();
      that.closeTeXDialog(closeCb);      
      });
    }, 1000)
  },

  closeTeXDialog(cb) {
    if(window.DialogTEXOpen) {
      setTimeout(() => {
        window.TeXCloseButton = document.getElementById("cke_dialog_close_button_75");        
        window.TeXCloseButton.addEventListener("click", () => {
          cb();
        });
        window.TeXOkButton = document.getElementsByClassName("cke_dialog_ui_hbox_first");        
        window.TeXOkButton[0].addEventListener("click", () => {
          cb();
        });
        window.TeXCancelButton = document.getElementsByClassName("cke_dialog_ui_hbox_last");        
        window.TeXCancelButton[0].addEventListener("click", () => {
          cb();
        });
      }, 400)
    }
  },

  addTeX(TeX) {
      setTimeout(() => {
      window.TeXNode = document.getElementById("cke_80_textarea");
      if(window.TeXNode) {        
        let lastVal = window.TeXNode.value;
        window.TeXNode.value = lastVal + TeX;
        window.TeXNode.focus();
      }
    }, 400);
  },

  changeTeX(cb) {
    setTimeout(() => {
      window.TeXNode = document.getElementById("cke_80_textarea");
      console.log(TeXNode);
      cb();
    }, 400);
  },



  getValue() {
    if (CKEDITOR.instances.editor)
      return(CKEDITOR.instances.editor.getData());
  },

  setValue(text) {
    if (CKEDITOR.instances) {
    if(CKEDITOR.instances.editor)
      CKEDITOR.instances.editor.setData(text)
    }
  }
}

module.exports = CKEditor;
