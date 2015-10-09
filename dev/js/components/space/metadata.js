const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");



const Answers = React.createClass({

  mixins: [React.addons.LinkedStateMixin,ThemeMixin],

  getInitialState(){
  	return {
  		keywords: '',
  		description:'',
  		publisher:'',
  		coverage:'',
      idioma:'espaniol'
  	};
  },

  addDublinCore(){


  
  	var dublinFormat = {
  		'title': '<dc:title>'+ 'title' +'</dc:title>',   
  		'creator': '<dc:creator>'+  'creator' +'</dc:creator>', 
  		'contributor':'<dc:contributor>'+ 'contributor' +'</dc:contributor>',  
  		'type': '<dc:type>'+ 'Exercise' +'</dc:type>',  
		  'format': '<dc:format>'+ 'HTML' +'</dc:format>',  
		  'identifier': '<dc:identifier'>+ 'identifieer' +'</dc:identifier>',  
		  'source': '<dc:source>'+ 'source' +'</dc:source>', 
	    'language':'<dc:language>'+ React.findDOMNode(this.refs.idioma).value +'</dc:language>',  
		  'relation':'<dc:relation>'+ 'relation' +'</dc:relation>', 
  		'keywords':'<dc:subject> ' + this.state.keywords + '</dc:subject>',
  		'description':'<dc:description>' + this.state.description + '</dc:description>',
  		'publisher': '<dc:publisher>' +this.state.publisher + '</dc:publisher>',
  		'coverage': '<dc:coverage>' + React.findDOMNode(this.refs.cobertura).value + '</dc:coverage>',
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

  initializate(){

    $('.caret').hide();

    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15 
   });

    $(document).ready(function() {
    $('select').material_select();
    });

  },


  setLanguage(language){
    this.setState({
      idioma: language
    });
  },

  setCoverave(coverage){
    this.setState({
      coverage: coverage
    });
  },



  render() {


 
    this.initializate();
       
    return (
      <div className="Formulation u-tab-content">
        <div className="input-field col s4">
          <input id="keywords"    valueLink={this.linkState('keywords')}   data-path="name" type="text"/>
          <label htmlFor="keywords">Palabras Claves</label>
        </div>
        <div className="input-field col s4">
          <input id="description"   valueLink={this.linkState('description')}  data-path="name" type="text"/>
          <label htmlFor="description">Descripción</label>
        </div>
        <div className="input-field col s4">
          <input id="date" ref='date' type="date"  className="datepicker" />
          <label htmlFor="date">Fecha</label>
        </div>

        <div  className="input-field col s4">
          <select ref="idioma">
            <option value="Español" >Español</option>
            <option value="Inglés" >Inglés</option>
            <option value="Portugués" >Portugués</option>
          </select>
          <label>Idioma</label>
        </div>

         <div className="input-field col s4">
          <select ref="cobertura">
            <option value="ninguna">ninguna</option>
            <option value="Ed. Preescolar">Ed. Preescolar</option>
            <option value="Ed. Primaria">Ed. Primaria</option>
            <option value="Ed. Secundaria" >Ed. Secundaria</option>
            <option value="Ed. Superior" >Ed. Superior</option>
          </select>
          <label>Cobertura</label>
        </div>
          
        <div className="input-field col s4">
          <input id="publiser"  onChange={this.handleChange}  valueLink={this.linkState('publisher')}  data-path="name" type="text"/>
          <label htmlFor="publisher">Editor</label>
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
