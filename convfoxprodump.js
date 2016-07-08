/*convert foxpro xml dump with DBF Manager */

/* output format 
vol<tab>pagenumber<tab>text in unicode \n

*/

var Sax=require("sax");
var fs=require("fs");
var pts_decode=require("./pts_decode");

var convert=function(content){
	var stack=[];
	var rows=[],row=[];

	var onopentag=function(tag){
		stack.push(tag.name);
	}
	var onclosetag=function(tagname){
		stack.pop();
		if (tagname=="RECORD") {
			rows.push(row.join("\t"));
			row=[];
		}
	}
	var ontext=function(text){
		var t=text;
		if (text.substr(0,8)=='"[CDATA[') {
			text=text.substr(8);
			text=text.substr(0,text.length-3);
			t=new Buffer(text,'base64').toString();
			t=t.replace(/\r?\n/g,"\n").replace(/\r/g,"\n").replace(/\n/g,"\\n");
			t=t.replace(/\t/g,"\\t");
		} else {
			t=t.substring(1,t.length-1);
		}
		var tagname=stack[stack.length-1];
		//FOOTNLINE and NLINE is simply line count of FOOTNOTE, not accurate
		//see v6p51 only 9 footnote
		if (tagname=="BOOKNUM" || tagname=="RPAGENUM" ||tagname=="UNITEXT"
			||tagname=="BOOKNO"||tagname=="PAGENO"
			){
			row.push(t);	
		}
		
	}

	var parser=Sax.parser(true);
	parser.onopentag=onopentag;
	parser.onclosetag=onclosetag;
	parser.ontext=ontext;


	parser.write(content);	
	return rows;
}

var convertfile=function(fn){
	var content=fs.readFileSync("foxpro/"+fn,"ascii");
	//FOOTOLD in footpg1 causing sax to throw (invalid entity)
	content=content.replace(/<FOOTOLD>[\s\S]+?<\/FOOTOLD>/g,'');
	var out=convert(content);

	console.log(fn," , rows",out.length);
	fs.writeFileSync("data/"+fn.substr(0,fn.length-4)+".tsv",out.join("\n"),"utf8");
}

//convertfile("palipg1.xml");
convertfile("palipg2.xml");
//convertfile("footpg1.xml");
//convertfile("footpg2.xml");
