var source='pali1';
var outputname='mul';
var outputfolder='bookxml/'
var pali=require('./data/'+source+'.json');
var out=[];
var fs=require('fs');
var booknames=require('./booknames.json')
var convert=function(data) {
	var lastbook="", bookn=1;
	writefile=function(book) {
		if (booknames[lastbook]) {
			filename=booknames[lastbook].prefix+bookn+'.xml'
		} else {
			filename='!pts'+lastbook+'.xml';
		}
		
		
		if (out.length) {
			fs.writeFileSync(outputfolder+filename,out.join('\n'),'utf8');	
			console.log(filename,out.length,'lines')
		}
		out=[];
	}
	data.map(function(D){

		var book=parseInt(D[0],10);
		var page=parseInt(D[1]);
		var text=D[2];
		if (!text) return;
		
		if (book!=lastbook) {
			
			if (lastbook) writefile();				
			if (booknames[book]) {
				out.push('<book n="'+book+'">'+booknames[book].name+'</book>');
				bookn++;
				bookn=booknames[book].resetbookn||bookn;
			} else {
				out.push('<book n="'+book+'"></book>');
			}
			
		}
		out.push('<pb n="'+page+'"/>');
		out.push(text.replace(/&/g,'&amp;'));
		lastbook=book;
	})
	writefile();
	
	
}

convert(pali);
