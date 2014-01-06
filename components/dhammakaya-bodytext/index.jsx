/** @jsx React.DOM */


var bodytext = React.createClass({
  render: function() {
    return  <pre><div dangerouslySetInnerHTML={{__html: this.props.text}} /></pre>
  },

});
module.exports=bodytext;