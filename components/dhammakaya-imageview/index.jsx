/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var pagestart=[0,
57,7,6,5,5, //vinaya
10, 9 ,6, //dn
8,3,4, //mn
14 ,13, 13,11,10,//sn
12,7,8,8,14 //an
]
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
   // console.log(imagefn)
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