/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var pagestart={6:10, 7:9 ,8:7, //dn
9:2,10:3,11:4,
12:14 ,13:13, 14:13,15:11,16:10,//sn
17:12,18:7,19:8,20:8,21:15

}
$=window.jQuery=Require("jquery");
var magnify=Require("bootstrap-magnify")
var imageview = React.createClass({
  getInitialState: function() {
    return {bar: "world"}; 
  },
  getimage:function() {
    var page="00"+(parseInt(this.props.page,10)+pagestart[this.props.book]);
    page=page.substring(page.length-3);

    var imagefn='images/'+this.props.book+'/'+page+".png";
    console.log(imagefn)
    return imagefn;
  },
  render: function() {
    return (
      <div >
      <img ref="magnifier" className="scanned" src={this.getimage()}></img>
      </div>
    );
  },
  componentDidUpdate:function() {
  //  $(this.refs.magnifier.getDOMNode()).magnify();
  }
});
module.exports=imageview;