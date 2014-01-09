/** @jsx React.DOM */


var bodytext = React.createClass({
  render: function() {
    text=this.props.text;
    //work around, add endtag
    if (!text) return <div></div>
    text=text.replace(/<fn n="(\d+)"\/>/g,'<fn n="$1"></fn>');
    return  <div onMouseMove={this.checkFootnote} className="bodytext" dangerouslySetInnerHTML={{__html: text}} />
  },
  shouldComponentUpdate:function(nextProps, nextState) {
    return nextProps.text!=this.props.text; 
  },
  checkFootnote:function(e) {
    if (e.target.nodeName=="FN") {
      this.props.onFootnote(e.target.attributes['n'].value);
    }
    
  }

});
module.exports=bodytext;