/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var offset={6:10,7:9}

var imageview = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  getimage:function() {
    var page="00"+(parseInt(this.props.page,10)+offset[this.props.book]);
    page=page.substring(page.length-3);

    var imagefn='images/'+this.props.book+'/'+page+".png";
    console.log(imagefn)
    return imagefn;
  },
  render: function() {
    return (
      <img className="scanned" src={this.getimage()}></img>
    );
  }
});
module.exports=imageview;