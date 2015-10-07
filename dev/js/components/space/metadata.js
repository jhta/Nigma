const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");


const Answers = React.createClass({

  mixins: [ThemeMixin],

  getInitialState(){
  	return {
  		keywords: '',
  		description:'',
  		publisher:'',
  		coverage:'',
  	};
  },

  addDublinCore(){
  
  	var dublinFormat = {
  		'title': '<dc:title>'+ 'title' +'</dc:title>',  // Pregunta 1
  		'creator': '<dc:creator>'+  'creator' +'</dc:creator>', // juanito alimaña
  		'contributor':'<dc:contributor>'+ 'contributor' +'</dc:contributor>',  //shared?
  		'type': '<dc:type>'+ 'type' +'</dc:type>',  // ??
		'format': '<dc:format>'+ 'format' +'</dc:format>',  //html js
		'identifier': '<dc:identifier'>+ 'identifieer' +'</dc:identifier>',  // id database
		'source': '<dc:source>'+ 'source' +'</dc:source>',   // Libro?
		'language':'<dc:language>'+ 'language' +'</dc:language>',  // opcional?
		'relation':'<dc:relation>'+ 'relation' +'</dc:relation>',  // asociado a otra?
  		'keywords':'<dc:subject> ' + this.state.keywords + '</dc:subject>',
  		'description':'<dc:description' + this.state.description + '</dc:description',
  		'publisher': '<dc:publisher>' +this.state.publisher + '</dc:publisher>',
  		'coverage': '<dc:coverage>' + this.state.coverage + '</dc:coverage>',
  		'date': '<dc:date>' + React.findDOMNode(this.refs.date).value +' <dc:date>',
  		'rights':'<dc:rights>'+ 'rights' +'</dc:rights>'  //cc
	};
  console.log(dublinFormat);
  },

  addIEE(){

  	/*

	<?xml version="1.0" encoding="UTF-8" ?>
	<lom xmlns="http://ltsc.ieee.org/xsd/LOMv1p0"
	     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	     xsi:schemaLocation="http://ltsc.ieee.org/xsd/LOMv1p0
	                         http://www.rdn.ac.uk/oai/lom/lom.xsd">
	  <general>
	    <title>
	      <string>developerWorks : XML</string>
	    </title>
	    <description>
	      <string>
	        The XML zone on the developerWorks Web site is designed for
	        developers. You'll find tools, samples, standards information,
	        education, news and events, and links to XML community forums
	        and Web sites.
	      </string>
	    </description>
	    <!-- Many other keywords snipped -->
	    <keyword>
	      <string>xml resources</string>
	    </keyword>
	    <keyword>
	      <string>xml programming</string>
	    </keyword>
	  </general>
	  <lifeCycle>
	  </lifeCycle>
	  <technical>
	    <format>text/html</format>
	    <location>http://www-106.ibm.com/developerworks/xml/</location>
	  </technical>
	  <educational>
	    <learningResourceType>
	      <source>DCMIType</source>
	      <value>Text</value>
	    </learningResourceType>
	  </educational>
	</lom>

	*/
          

  },



  handleChange(event) {
  	switch (event.target.id) {
  		case "keywords":
  		this.setState({keywords: event.target.value});
  		break;

  		case "description":
  		this.setState({description: event.target.value});
  		break;

  		case "publisher":
  		this.setState({publisher: event.target.value});
  		break;

  		case "coverage":
  		this.setState({coverage: event.target.value});
  		break;


  		default:
  	}	
  },

  render() {
  	$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
 	 });

  	var keywords    = this.state.keywords;
  	var description = this.state.description;
  	var publisher   = this.state.publisher
  	var coverage    = this.state.coverage;      
 
       
    return (
      <div className="Formulation u-tab-content">
        <div className="input-field col s4">
          <input id="keywords"  value={keywords}  onChange={this.handleChange} data-path="name" type="text"/>
          <label htmlFor="keywords">Palabras Claves</label>
        </div>
        <div className="input-field col s4">
          <input id="description"  value={description} onChange={this.handleChange}  data-path="name" type="text"/>
          <label htmlFor="description">Descripción</label>
        </div>
        <div className="input-field col s4">
          <input id="date" ref='date' type="date" className="datepicker" />
          <label htmlFor="date">Fecha</label>
        </div>
          
        <div className="input-field col s4">
          <input id="publiser"  onChange={this.handleChange}  data-path="name" type="text"/>
          <label htmlFor="publisher">Editor</label>
        </div>
        <div className="input-field col s4">
          <input id="coverage"  value={coverage} onChange={this.handleChange} data-path="name" type="text"/>
          <label htmlFor="coverage">Cobertura</label>
        </div>
	     <div className='dropdown-button btn' data-activates='dropdown2'>Añadir metadatos</div>

		  <ul id='dropdown2' className='dropdown-content'>
		    <li><a href="javascript:void(0)" onClick={this.addDublinCore}>Dublin Core</a></li>
		     <li className="divider"></li>
		    <li><a href="javascript:void(0)" onClick={this.addIEE}>IEE LOM</a></li>
		  </ul>
        
      </div>
    )
  }
});

module.exports = Answers;
