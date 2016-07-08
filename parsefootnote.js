var nofootnote=[]; // text has foot note marker, but footnote not found 

parseParagraphid=function(line) {
	if (line[0]==" ") return parseInt(line,10);
}
hasfootnote=function(id) {
	bkpg=book+'.'+page;
	group=footnotes[bkpg];
	if (group && group[id-1]) return true;
	return false;
}
parseFootnote=function(line,linenum) {
	var i=0,out="",intag=false,inbracket=false;
	while (i<line.length) {
		if (line[i]=='<') intag=true;
		if (line[i]=='[') inbracket=true;
		if (!intag && !inbracket) {
			while (line[i]==' ' && i<line.length) out+=line[i++];

			id=parseInt(line.substring(i),10);
			if (id>0 ) {
				if (id==fnid || id+1==fnid) { //same footnote number might happen more than once
				
					i+=id.toString().length;
					if (hasfootnote(id)) {
						out+='<fn n="'+id+'"/>';
						if (id==fnid) fnid++;
						foundfncount++;
						continue;
					} else {
						out+='<fn n="'+id+'" notfound="true"/>';
						nofootnote.push(book+'.'+page+'='+id);
					}
				} else {
					//skip whole number
					while (i<line.length && line[i]>='0' && line[i]<='9') out+=line[i++];
				}
				//possiblefn.push(filenow+':'+linenum+'='+page+':'+id);
			}
		}
		if (i>=line.length) break;
		if (line[i]=='>')intag=false;
		if (line[i]==']')inbracket=false;
		out+=line[i];
		i++;			
	}
	return out;
}
var nextbook=1;
var splitfile=function(f,out) {
	console.log(f)
	if (f[0]=='m') {
		for (var i=0;i<out.length;i++) {
			if (out[i].indexOf("Evam-me sutaṃ.")>-1) {
				console.log(out[i-1])
			}
		}
	}
}