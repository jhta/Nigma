
function captureText() {
	console.log("lalalalal");
	var TeXNode = document.getElementById("cke_80_textarea");
	console.log(TeXNode);
}

function onOpen() {
	changeTeX("algo");
}

function changeTeX(TeX) {
	setTimeout(function(){

		window.TeXNode = document.getElementById("cke_80_textarea");
		console.log(TeXNode);
		var lastVal = $("#cke_80_textarea").val();
		$("#cke_80_textarea").val(lastVal + TeX);
		var newVal = $("#cke_80_textarea").val();
		console.log(newVal);

	}, 400);

}

function openTeXDialog(e) {
	console.log("wtf");
	CKEDITOR.tools.callFunction(40,this);
	changeTeX("test")
}

/* exported initSample */
CKEDITOR.config.mathJaxLib = '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML';
if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );

CKEDITOR.config.height = 300;
CKEDITOR.config.width = 'auto';

var initSample = ( function() {
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

		setTimeout(function(){
			window.TeXButton = document.getElementsByClassName("cke_button__mathjax");
			window.TeXButton = window.TeXButton[0];
			console.log(TeXButton);
			captureText();
		}, 300)

	return function() {
		var editorElement = CKEDITOR.document.getById( 'editor' );

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

	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}

		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
} )();
