const React = require('react');

const ContentEditable = React.createClass({

    shouldComponentUpdate(nextProps) {
        return nextProps.html !== this.getDOMNode().innerHTML;
    },

    componentDidUpdate() {
        if ( this.props.html !== this.getDOMNode().innerHTML ) {
           this.getDOMNode().innerHTML = this.props.html;
        }
    },

    emitChange(evt){
        let html = this.getDOMNode().innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            evt.target = { value: html };
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    },

    render() {
        return (
          <div
            id="contenteditable"
            contentEditable
            onInput   = {this.emitChange}
            onBlur    = {this.emitChange}
            className = {this.props.cssClass}
            dangerouslySetInnerHTML = {{__html: this.props.html}}
          />
        );
    }
});

module.exports = ContentEditable;
