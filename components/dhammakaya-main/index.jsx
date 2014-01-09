/** @jsx React.DOM */

var pageselector=Require("pageselector"); 
var bodytext=Require("bodytext"); 
var imageview=Require("imageview"); 
var footnote=Require("footnote"); 
var main = React.createClass({
  mixins:Require('kse-mixins'),
  getInitialState: function() {
    return {book:1,page:1,db:"ptsmul"};
  },
  render: function() {
    return (
      <div className="main row">
        <div className="col-md-5">
        <pageselector onselect={this.setbkpg}/>
        <footnote db={this.state.db} book={this.state.book} page={this.state.page}  fn={this.state.fn}/>
        <bodytext onFootnote={this.onFootnote} book={this.state.book} page={this.state.page} text={this.state.text}/>
        </div>
        <div className="col-md-5">
         <imageview book={this.state.book} page={this.state.page}/>
        </div> 
      </div>
    ); 
  }, 
  onFootnote:function(fn) {
    this.setState({fn:parseInt(fn,10)})
  },
  setbkpg:function(bk,pg) {
    var selector=["book[n="+bk,"pb[n="+pg];
    this.setState({book:bk,page:pg});
    this.loadtext(selector);
  },
  loadtext:function(selector) {

    this.$yase("getTextByTag",{db:this.state.db,selector:selector,extraslot:1})
     .done(function(data){
       this.setState({text:data.text});
    })
  },
  componentDidMount:function() {
    var customfunc=null;
    this.useDB(this.state.db,function(){
      this.setbkpg(6,1);
      console.log('db ready')      
    })
  },
});
module.exports=main;