var Nigma 	= require('./components/app');
var React 	= require('react');
var router 	= require('./router/router');

router.run( function ( Handler, state ) {

	React.render(
		<Handler />,
		document.body
  	);
});
