/* */
var source='palipg1';
var outputname='mul';
var outputfolder='genxml/'
var out=[];
var fs=require('fs');
var sourcetext=fs.readFileSync("data/"+source+".tsv","utf8").split("\n");
for (var i=0;i<sourcetext.length;i++) {
	sourcetext[i]=sourcetext[i].split("\t");
	if (sourcetext[i][2]) {
		sourcetext[i][2]=sourcetext[i][2].replace(/\\n/g,"\n").replace(/\\t/g,"\t");
		var s=sourcetext[i][2];
		if (s[s.length-1]=="\n") sourcetext[i][2]=s.substr(0,s.length-1);
	}
}
var booknames=require('./booknames.json');
var writeToDisk=true;
//var startbook=7, endbook=9;
var startbook=0,endbook=100;
var prevfootnote=1;

var page,book;
var pat1=/([a-zA-ZāĀīĪūŪṃṂṅṄñÑṭṬḍḌṇṆḷḶḥḤṛṚśŚṣṢṝṜḹḸ,.{}'”’\-: ]{2,})(\d+)([! .?-”]?)/g;
var pat2=/(\d+)(?!.)/g
var parseFootnote=function(content) {

	content=content.replace(pat1,function(m,m1,fn,m3){
		fn=parseInt(fn);
		if ((prevfootnote+1)!==fn && prevfootnote!==fn) { //foot note might repeat ( DN1 page 18)
			console.log("foot note ","bk",book,"pg",page,"prev",prevfootnote,"now",fn)
		}
		prevfootnote=fn;
		//return "#"+fn;
		return m1+"#"+fn+(m3||"");
	})
	return content;
}

var parseParagraph=function(content) {
	var pat=/ (\d+)\./g

	content=content.replace(pat,function(m,m1){
		return "^"+m1;
	});
	return content;
}
var parsePage=function(content){
	//content=parseParagraph(content||"");
	//content=parseFootnote(content||"");
	return content;
}

var convert=function(data) {
	var prevbook="", bookn=1 , voln=1 ,lastprefix="";
	writefile=function() {
		var B=booknames[prevbook-1];
		if (B) {
			if (B.prefix!==lastprefix) voln=1;
			filename=B.prefix+voln+'.xml'
			lastprefix=B.prefix;
			voln++;
			bookn++;
		} else {
			filename='!pts'+prevbook+'.xml';
		}
	
		if (out.length && writeToDisk) {
			fs.writeFileSync(outputfolder+filename,out.join('\n'),'utf8');	
			console.log(filename,out.length,'lines')
		}
		out=[];
	}
	data.map(function(D,idx){
		book=parseInt(D[0],10);
		page=parseInt(D[1]);

		if (!(book>=startbook && book<endbook)) {
			return;
		}

		var text=parsePage(D[2]);
		if (!text) return;
		
		
		if (book!=prevbook) {			
			if (prevbook) writefile();
			//out.push('~~'+book);			
		}
		
		out.push('~'+book+"."+page);
		//text=text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		out.push(text);
		prevfootnote=1;
		prevbook=book;
	})
	writefile();
		
}

convert(sourcetext);
