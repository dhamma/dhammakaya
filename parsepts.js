fs=require('fs')
sourcefolder='bookxml/';
outputfolder='xml/';
lst=fs.readFileSync('./pts.lst','utf8').replace(/\r\n/g,'\n').split('\n');

var footnotes=[];
var numbers=[];
var wrongpid=[];
var filenow="";

parseParagraphid=function(line) {
	if (line[0]==" ") return parseInt(line,10);
}
var page=0;fnid=1;
parseFootnote=function(line,linenum) {
	var i=0,out="",intag=false,inbracket=false;
	while (i<line.length) {
		if (line[i]=='<') intag=true;
		if (line[i]=='[') inbracket=true;
		if (!intag && !inbracket) {
			id=parseInt(line.substring(i),10);
			if (id>0 && id==fnid || id+1==fnid) { //same footnote number might happen more than once
				out+='<fn n="'+id+'"/>';
				i+=id.toString().length;
				footnotes.push(filenow+':'+linenum+'='+page+':'+id);
				if (id==fnid) fnid++;
				continue;
			} else {
				if (id > 0) {
					numbers.push(filenow+':'+linenum+'='+page+':'+id);
				}
			}
		}
		if (line[i]=='>')intag=false;
		if (line[i]==']')inbracket=false;
		out+=line[i];
		i++;			
	}
	return out;
}

dofile=function(f){
	console.log('processing',f)
	var arr=fs.readFileSync(sourcefolder+f,'utf8').replace(/\r\n/g,'\n').split('\n');
	var out=[];
	var lastpid=0;
	for (var i=0;i<arr.length;i++) {
		var line=arr[i];
		if (line.substring(0,4)=='<pb ') {
			page=parseInt(line.substring(7),10);
			fnid=1;
		}
		filenow=f;
		var pid=parseParagraphid(line);
		if (pid) {
			if (pid-1!=lastpid) {
				wrongpid.push(filenow+':'+i+'='+pid+' expect:'+(lastpid+1));
			}
			line=line.trim().substring(pid.toString().length+1);
			line='<p n="'+pid+'"/>'+line;
			lastpid=pid;
		}
		line=parseFootnote(line,i);
		out.push(line);
	}
	fs.writeFileSync(outputfolder+f,out.join('\n'),'utf8');
}
lst.map(function(file){dofile(file)});

fs.writeFileSync('footnotes.json',footnotes.join('\n'),'utf8')
fs.writeFileSync('numbers.json',numbers.join('\n'),'utf8')
fs.writeFileSync('wrongpid.json',wrongpid.join('\n'),'utf8')