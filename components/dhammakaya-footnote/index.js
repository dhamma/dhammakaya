/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var footnote = React.createClass({displayName: 'footnote',
  mixins:Require('kse-mixins'),
  getInitialState: function() {
    return {text: ""};
  },
  
  render: function() {
    return (
      React.DOM.div( {className:"footnote"}, 
        React.DOM.span( {className:"fn"}, this.props.fn),":",this.state.text
      )
    );
  },
  componentWillUpdate:function() {
    this.$yase("getRaw",[this.props.db,"extra","footnote",this.props.book+"."+this.props.page])
     .done(function(data){
      if (!data) return;
       if (data[this.props.fn-1]) {
        this.setState({text:data[this.props.fn-1]}); 
       } else {
        this.setState({text:"no footnote"})
       }
       
    })
  }
});
module.exports=footnote;