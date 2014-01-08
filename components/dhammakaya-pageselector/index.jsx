/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var pageinput = React.createClass({
  render:function() {
    return (
      <input type="text"  defaultValue="1" onInput={this.props.oninput}></input>
    )
  }
});
var bookselect = React.createClass({
  render:function() {
    return (
      <select onChange={this.props.onchange}>
        <option value="6">Digha Nikaya Book 1</option>
        <option value="7">Digha Nikaya Book 2</option>
        <option value="8">Digha Nikaya Book 3</option>
        <option value="9">Majjhima Nikaya Book 1</option>
        <option value="10">Majjhima Nikaya Book 2</option>
        <option value="11">Majjhima Nikaya Book 3</option>
        <option value="12">Samyutta Nikaya Book 1</option>
        <option value="13">Samyutta Nikaya Book 2</option>
        <option value="14">Samyutta Nikaya Book 3</option>
        <option value="15">Samyutta Nikaya Book 4</option>
        <option value="16">Samyutta Nikaya Book 5</option>
        <option value="17">Anguttara Nikaya Book 1</option>
        <option value="18">Anguttara Nikaya Book 2</option>
        <option value="19">Anguttara Nikaya Book 3</option>
        <option value="20">Anguttara Nikaya Book 4</option>
        <option value="21">Anguttara Nikaya Book 5</option>
        <option value="1">Vinaya Book 1</option>
        <option value="2">Vinaya Book 2</option>
        <option value="3">Vinaya Book 3</option>
        <option value="4">Vinaya Book 4</option>
        <option value="5">Vinaya Book 5</option>


      </select>
    )
  }
});
var pageselector = React.createClass({
  getInitialState: function() {
    return {bar: "worlxxd"};
  },
  prevpage:function() {
    var page=parseInt(this.refs.page.getDOMNode().value,10)
    if (page>1) this.refs.page.getDOMNode().value=page-1;
    this.userselect();
  },
  nextpage:function() {
    var page=parseInt(this.refs.page.getDOMNode().value,10)
    this.refs.page.getDOMNode().value=page+1;
    this.userselect();
  },
  render: function() {
    return (
      <div>
       <bookselect ref="book" onchange={this.userselect}/>
       <button onClick={this.prevpage}>&#171;</button>
       <pageinput ref="page" oninput={this.userselect}/>
       <button onClick={this.nextpage}>&#187;</button>
      </div>
    );
  },
  userselect:function() {
    var book=parseInt(this.refs.book.getDOMNode().value,10);
    var page=parseInt(this.refs.page.getDOMNode().value,10);
    this.props.onselect(book,page);
  }
});
module.exports=pageselector;