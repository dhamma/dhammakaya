/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var pageinput = React.createClass({displayName: 'pageinput',
  render:function() {
    return (
      React.DOM.input( {type:"text", defaultValue:this.props.page, onInput:this.props.oninput})
    )
  }
});
var bookselect = React.createClass({displayName: 'bookselect',
  render:function() {
    return (
      React.DOM.select( {value:this.props.book, onChange:this.props.onchange}, 
        React.DOM.option( {value:"6"}, "Digha Nikaya Book 1"),
        React.DOM.option( {value:"7"}, "Digha Nikaya Book 2"),
        React.DOM.option( {value:"8"}, "Digha Nikaya Book 3"),
        React.DOM.option( {value:"9"}, "Majjhima Nikaya Book 1"),
        React.DOM.option( {value:"10"}, "Majjhima Nikaya Book 2"),
        React.DOM.option( {value:"11"}, "Majjhima Nikaya Book 3"),
        React.DOM.option( {value:"12"}, "Samyutta Nikaya Book 1"),
        React.DOM.option( {value:"13"}, "Samyutta Nikaya Book 2"),
        React.DOM.option( {value:"14"}, "Samyutta Nikaya Book 3"),
        React.DOM.option( {value:"15"}, "Samyutta Nikaya Book 4"),
        React.DOM.option( {value:"16"}, "Samyutta Nikaya Book 5"),
        React.DOM.option( {value:"17"}, "Anguttara Nikaya Book 1"),
        React.DOM.option( {value:"18"}, "Anguttara Nikaya Book 2"),
        React.DOM.option( {value:"19"}, "Anguttara Nikaya Book 3"),
        React.DOM.option( {value:"20"}, "Anguttara Nikaya Book 4"),
        React.DOM.option( {value:"21"}, "Anguttara Nikaya Book 5"),
        React.DOM.option( {value:"1"}, "Vinaya Book 1"),
        React.DOM.option( {value:"2"}, "Vinaya Book 2"),
        React.DOM.option( {value:"3"}, "Vinaya Book 3"),
        React.DOM.option( {value:"4"}, "Vinaya Book 4"),
        React.DOM.option( {value:"5"}, "Vinaya Book 5")


      )
    )
  }
});
var pageselector = React.createClass({displayName: 'pageselector',
  getInitialState: function() {
    return {bar: "worlxxd"};
  },
  prevpage:function() {
    var page=parseInt(this.refs.page.getDOMNode().value,10)
    if (page>1) this.refs.page.getDOMNode().value=page-1;
    this.userselect();
  },
  nextpage:function() {
    var page=parseInt(this.refs.page.getDOMNode().value,10)
    this.refs.page.getDOMNode().value=page+1;
    this.userselect();
  },
  render: function() {
    return (
      React.DOM.div(null, 
       bookselect( {book:this.props.book, ref:"book", onchange:this.userselect}),
       React.DOM.button( {onClick:this.prevpage}, "«"),
       pageinput( {page:this.props.page,  ref:"page", oninput:this.userselect}),
       React.DOM.button( {onClick:this.nextpage}, "»")
      )
    );
  },
  userselect:function() {
    var book=parseInt(this.refs.book.getDOMNode().value,10);
    var page=parseInt(this.refs.page.getDOMNode().value,10);
    this.props.onselect(book,page);
  }
});
module.exports=pageselector;