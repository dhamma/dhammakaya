
console.log(require('yase').build({
	dbid:'ptsmul',
	slotshift:8,
	loglevel:2,
	title: 'PTS Tipitaka Mula',
	groupunit:['p[n]'],
	schema:function() {
		this.toctag(["book"]).attr("book","n",{"depth":1,"saveval":true,"unique":true})
		 .pagebreak("pb").attr("pb","n",{"depth":1,"saveval":true})
		 .paragraph("p").attr("p","n",{"depth":1,"saveval":true})
	},
	input:'ptsmul.lst',
	output:'../ptsmul.ydb',
	author:'yapcheahshen@gmail.com',
	url:'http://www.ksana.tw',
	version:'0.0.1',
	outputencoding:'utf8',
	//maxfile:1,
	customfunc:require('./ptscustom.js')
}));