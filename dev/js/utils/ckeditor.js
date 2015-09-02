//Import mathjax library
CKEDITOR.config.mathJaxLib = '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML';
if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
  CKEDITOR.tools.enableHtml5Elements( document );

//Box dimensions
CKEDITOR.config.height = 150;
CKEDITOR.config.width = 'auto';


window.DialogTEXOpen = false;

function isWysiwygareaAvailable() {
  // If in development mode, then the wysiwygarea must be available.
  // Split REV into two strings so builder does not replace it :D.
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

      // :(((
      if ( isBBCodeBuiltIn ) {
        editorElement.setHtml(
          'Hello world!\n\n' +
          'I\'m an instance of [url=http://ckeditor.com]CKEditor[/url].'
        );
      }

      // Depending on the wysiwygare plugin availability initialize classic or inline editor.
      if ( wysiwygareaAvailable ) {
        CKEDITOR.replace( 'editor' );
      } else {
        editorElement.setAttribute( 'contenteditable', 'true' );
        CKEDITOR.inline( 'editor' );

        // TODO we can consider displaying some info box that
        // without wysiwygarea the classic editor may not work.
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
      //captureText();
    }, 400)
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
      //var lastVal = $("#cke_80_textarea").val();
      //$("#cke_80_textarea").val(lastVal + TeX);
      //var newVal = $("#cke_80_textarea").val();
      //console.log(newVal);
    }, 400);
  },

  getValue() {    
    return(CKEDITOR.instances.editor.getData());
    //return (window.TeX)? window.TeX:"";
  }
}

module.exports = CKEditor;
