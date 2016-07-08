/* convert footpgcsv to json but not doing anything*/
/*
found error in first 4 nikaya

"bk":7,"pg":290,﻿        * Edited at Colombo, 1883, by Baṭuwan Tuḍāwa,
"bk":8,"pg":1,﻿        Sc -- Sinhalese manuscript belonging to J. E. Carpenter.
"bk":11,"pg":25,﻿     *Sk has a lacuna from this point to ye on page 27, line 23.
"bk":14,"pg":131,﻿ further on, S1 udayabyayānu; S3 ºbyāyānu, the first ā being erased
"bk":17,"pg":104,﻿     Ph. -pacchena; Bb. 24 -pajjena, altered to -pajjhena.

"bk":17,"pg":104 ==> check printed, missing 1.
*/

var source='footpg1'; //change to footpg2 for another file


var fs = require('fs');
var fields=null;
var pts_decode=require("./pts_decode");
output=[];
errfootnote=[]; //foot note which are not start from 1

var fieldname={
BOOK:0,PAGE:1,TYPE:2,POSITION:3,
FOOTNOTE:4, //base64 encoded
FOOTOLD:5, //old foot note in raw text
BOOKNO:6,PAGENO:7,
CODE:8,//unknown
NLINE:9, //number of lines
BEGINLINE:10,
UNITEXT:11, // 
BOOKNEW:12, //encoded
PAGENEW:13 //encoded
}

var data=fs.readFileSync('./data/'+source+'.csv','ascii').split(/\r?\n/);

fs.writeFileSync("./data/test.txt",data,"utf8");
var processline=function(line,linenumber){
	if (linenumber==0) return;
	if (!line) return;
	//BOOK might be , causing split error,

	var comma=false;
	if (line.substr(0,9)=='","","","') {
		console.log(linenumber,line.substr(0,20))
	}
	if (line[1]==",") {
		//console.log(line.substr(0,10))
		line[1]=="^";//
		comma=true;
	}
	var arr=line.split('","');
	if (arr.length!=14 && arr.length!==12){
		//console.log("error data at "+idx+" "+arr.length+"["+line+"]")
		return;
	}

	//remove leading and tailing "
	var s=arr[arr.length-1];

	arr[0]=arr[0].substr(1);
	if (comma) {
		//console.log(arr[0])
		
		arr[0][0]=",";//remove the extra ,
}
	arr[arr.length-1]=s.substr(0,s.length-1);

	decodefields(arr,linenumber);

}

var decodenum=function(s,linenumber,field){
	if (s.length==2) {
		return (s.charCodeAt(0)-36)*220+	(s.charCodeAt(1)-36);
	} else if (s.length==1) {
		return s.charCodeAt(0)-36;
	} else if (s.length>2) {
		//console.log("invalid num at line "+linenumber+" of field "+field+" value:"+s);
	} else return 0;
}
var FOOTNOTE=fieldname['FOOTNOTE'];
var FOOTOLD=fieldname['FOOTOLD'];
var UNITEXT=fieldname['UNITEXT'];
var BOOK=fieldname['BOOK'];
var PAGE=fieldname['PAGE'];
var BOOKNEW=fieldname['BOOKNEW'];
var PAGENEW=fieldname['PAGENEW'];
var decodefields=function(R,linenumber){
	for (var i=0;i<R.length;i++) {
		if (i==FOOTNOTE){
			R[i]=pts_decode.decodeText(new Buffer(R[i],'base64').toString("utf8"));
		}
		if (i==UNITEXT) {
			R[i]=(new Buffer(R[i],'base64')).toString("utf8");
			//console.log(R[i].charCodeAt(R[i].length-1));
		}

		if (i===PAGE || i===BOOK || i===PAGENEW || i===BOOKNEW) {
			R[i]=decodenum(R[i],linenumber,i);
		}

		if (i==FOOTNOTE || i==UNITEXT || i==FOOTOLD) {
				R[i]=R[i].replace(/\r?\n/g,"\n").replace(/\r/g,"\n")
			.replace(/\n/g,"\\n").replace(/\t/g,"\\t");
		}
	}

	output.push(R);
}
var finish=function(){

	var out=[Object.keys(fieldname).join("\t")];
	var out2=[];//no text

	for (var i=0;i<output.length;i++) {
		out.push(output[i].join("\t"));

		//for debugg
		output[i][4]='';output[i][5]='';output[i][11]='';
		var o=output[i].join("\t");
		out2.push(output[i].join("\t"));
	}
	fs.writeFileSync('./data/'+source+'.tsv',out.join("\n"),'utf8')
	console.log("entries",out.length)


	fs.writeFileSync('./data/'+source+'-notext.tsv',out2.join("\n"),'utf8')

	//fs.writeFileSync('./data/errfootnote.json',errfootnote.join('\n'),'utf8')
}
//write column name

data.map(processline);
finish();
fs.writeFileSync("notfound.txt",JSON.stringify(pts_decode.notfound),"utf8");