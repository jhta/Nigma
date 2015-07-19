const Nigma 	= require('./components/app');
const React 	= require('react');
const router 	= require('./router/router');

router.run( function ( Handler, state ) {

	$(document).on("ready",()=>{
		$('.dropdown-button').dropdown();
	});

	React.render(
		<Handler />,
		document.body
	);
});
