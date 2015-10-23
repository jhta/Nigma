const React = require("react");
const mui         = require("material-ui");
const {Tabs, Tab} = mui;
const ThemeMixin  = require("../../mixins/ui-theme");
const MetadataActions = require("../../actions/space/metadata-actions");
const Auth  = require("../../utils/Auth");


const Answers = React.createClass({

  mixins: [React.addons.LinkedStateMixin,ThemeMixin],

  getInitialState(){ 
    if(this.props.metadata == undefined) {
      let autor = Auth.getUser().name;
      let title = this.props.currentQuestion.name;
      return {
        autor: autor,
        title: title,
        keywords: '',
        description:'',
        publisher:'',
        coverage:'',
        idioma:'espaniol'
      }
    }
     else{
       return {
        autor: this.props.metadata.autor,
        title: this.props.metadata.title,
        keywords: this.props.metadata.keywords,
        description:this.props.metadata.description,
        publisher:this.props.metadata.publisher,
        coverage:this.props.metadata.coverage,
        idioma:this.props.metadata.language
      }
     }  	
  },

  componentWillReceiveProps(){
    this.getInitialState();
  },

  addMetadata(){
    let metadata = {
      'autor': this.state.autor,
      'title': this.state.title,
      'editor': this.state.publisher,
      'keywords': this.state.keywords,
      'description': this.state.description,
      'coverage': React.findDOMNode(this.refs.cobertura).value,
      'language': React.findDOMNode(this.refs.idioma).value,
      'date': React.findDOMNode(this.refs.date).value
    }
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
          <input id="autor"    valueLink={this.linkState('autor')}   data-path="name" type="text"/>
          <label htmlFor="autor" className="active">Autor</label>
        </div>

        <div className="input-field col s4">
          <input id="publiser"  onChange={this.handleChange}  valueLink={this.linkState('publisher')}  data-path="name" type="text"/>
          <label htmlFor="publisher"  className="active">Afiliacion</label>
        </div>
        <div className="input-field col s4">
          <input id="title"   valueLink={this.linkState('title')}  data-path="name" type="text"/>
          <label htmlFor="title"  className="active">Titulo</label>
        </div>
        <div className="input-field col s4">
          <input id="description"   valueLink={this.linkState('description')}  data-path="name" type="text"/>
          <label htmlFor="description"  className="active">Descripción</label>
        </div>
        <div className="input-field col s4">
          <input id="keywords"    valueLink={this.linkState('keywords')}   data-path="name" type="text"/>
          <label htmlFor="keywords" className="active">Palabras Claves</label>
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
