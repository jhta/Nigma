const Nigma 	= require('./components/app');
const React 	= require('react');
const router 	= require('./router/router');

router.run( function ( Handler, state ) {

	React.render(
		<Handler />,
		document.body
	);
});
