/** @jsx React.DOM */

var pageselector=Require("pageselector"); 
var bodytext=Require("bodytext"); 
var imageview=Require("imageview"); 
var footnote=Require("footnote"); 
function parseHashBangArgs(aURL) {
  aURL = aURL || window.location.href;
  var vars = {};
  var hashes = aURL.slice(aURL.indexOf('#') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
       var hash = hashes[i].split('=');
       if(hash.length > 1) {
         vars[hash[0]] = hash[1];
       } else {
        vars[hash[0]] = null;
       }      
    }
    return vars;
}
var main = React.createClass({
  mixins:Require('kse-mixins'),
  getInitialState: function() {
    var hash=parseHashBangArgs();
    var bkpg=[null,1,1];
    if (hash.bkpg) {
      bkpg=hash.bkpg.match(/(\d+)\.(\d+)$/);  
      if (!bkpg) 
      if (bkpg[1]) bkpg[1]=parseInt(bkpg[1],10);
      if (bkpg[2]) bkpg[2]=parseInt(bkpg[2],10);
    }
    
    return {book:bkpg[1],page:bkpg[2],db:"ptsmul"};
  },
  render: function() {
    return (
      <div className="main row">
        <div className="col-md-5">
        <pageselector book={this.state.book} page={this.state.page} onselect={this.setbkpg}/>
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
       //update hash tag
       window.location.hash='#bkpg='+this.state.book+"."+this.state.page;
    })
  },
  componentDidMount:function() {
    var customfunc=null;
    this.useDB(this.state.db,function(){
      this.setbkpg(this.state.book,this.state.page);

      console.log('db ready')      
    })
  },
});
module.exports=main;