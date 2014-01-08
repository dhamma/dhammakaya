/** @jsx React.DOM */


var bodytext = React.createClass({
  render: function() {
    return  <div className="bodytext" dangerouslySetInnerHTML={{__html: this.props.text}} />
  },

});
module.exports=bodytext;