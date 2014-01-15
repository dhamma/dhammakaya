var source='pali1';
var outputname='mul';
var outputfolder='bookxml/'
var sourcetext=require('./data/'+source+'.json');
var out=[];
var fs=require('fs');
var booknames=require('./booknames.json');

var convert=function(data) {
	var lastbook="", bookn=1;
	writefile=function() {
		var B=booknames[lastbook-1];
		if (B) {
			filename=B.prefix+bookn+'.xml'
			bookn++;
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

			if (booknames[book-1]) {
				out.push('<book n="'+book+'">'+booknames[book-1].name+'</book>');
				//bookn++;
				bookn=booknames[book-1].resetbookn||bookn;
			} else {
				out.push('<book n="'+book+'"></book>');
			}
			
		}
		out.push('<pb n="'+page+'"/>');
		text=text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		out.push(text);
		lastbook=book;
	})
	writefile();
	
	
}

convert(sourcetext);
