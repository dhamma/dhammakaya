/** @jsx React.DOM */

var pageselector=Require("pageselector"); 
var bodytext=Require("bodytext"); 
var main = React.createClass({
  mixins:Require('kse-mixins'),
  getInitialState: function() {
    return {book:1,page:1,db:"ptsmul"};
  },
  render: function() {
    return (
      <div>
        <pageselector onselect={this.setbkpg}/>
        <bodytext text={this.state.text}/>
      </div>
    ); 
  }, 
  setbkpg:function(bk,pg) {
    var selector=["book[n="+bk,"pb[n="+pg];
    this.setState({book:bk,page:pg});
    this.loadtext(selector);
  },
  loadtext:function(selector) {

    this.$yase("getTextByTag",{db:this.state.db,selector:selector})
     .done(function(data){
       this.setState({text:data.text});
    })
  },
  componentDidMount:function() {
    var customfunc=null;
    this.useDB(this.state.db,function(){
      this.setbkpg(1,1);
      console.log('db ready')      
    })
  },
});
module.exports=main;