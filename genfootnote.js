/*take *.tsv unicode , parse footnote leading number into group */

/*
found error in first 4 nikaya

"bk":7,"pg":290,﻿        * Edited at Colombo, 1883, by Baṭuwan Tuḍāwa,
"bk":8,"pg":1,﻿        Sc -- Sinhalese manuscript belonging to J. E. Carpenter.
"bk":11,"pg":25,﻿     *Sk has a lacuna from this point to ye on page 27, line 23.
"bk":14,"pg":131,﻿ further on, S1 udayabyayānu; S3 ºbyāyānu, the first ā being erased
"bk":17,"pg":104,﻿     Ph. -pacchena; Bb. 24 -pajjena, altered to -pajjhena.

"bk":17,"pg":104 ==> check printed, missing 1.
*/
var fs = require('fs');

var BOOK=0,PAGE=1,TYPE=2,POSITION=3,
FOOTNOTE=4, //base64
FOOTOLD=5, //old foot node in raw text
BOOKNO=6,PAGENO=7,
CODE=8,//unknown
NLINE=9, //number of lines
BEGINLINE=10,
UNITEXT=11, // 
BOOKNEW=12, //encoded
PAGENEW=13; //encoded
errfootnote=[]; //foot note which are not start from 1

var splitfn=function(fn,bk,pg) {
	var startn=2;
	var s="";
	var out=[];
	arr=fn.split('\n');

	arr.map(function(L,idx){
		n=parseInt(L.trim(),10);
		if (idx==0 && n!=1 && L.trim().length) {
			errfootnote.push('"bk":'+bk+',"pg":'+pg+','+L);
		}
		if (n==startn) {
				out.push(s.trim());
				s="";
				startn++;
		}
		s+=L;
	});
	if (s.trim().length) out.push(s.trim());
	if (startn-1!==out.length) {
		errfootnote.push('"bk":'+bk+',"pg":'+pg+', note count missmatch');
	}
	return out;
}


var processline=function(arr,idx){
	return { bk:arr[0], pg:arr[1],notes:splitfn(arr[2],arr[0],arr[1])};
}

var finish=function(fn,output){
  output.sort(function(a,b){return (a.bk*512+a.pg) - (b.bk*512+b.pg) })	;
  out=output.map(function(L){
  	return '"'+L.bk+'.'+L.pg+'":'+JSON.stringify(L.notes)
  });

  json='{\n'+out.join(',\n')+'\n}';
	fs.writeFileSync('./data/'+fn+'.json',json,'utf8')
}

var processfile=function(fn){
	var T=fs.readFileSync('./data/'+fn+'.tsv','utf8').split(/\r?\n/);
	for (var i=0;i<T.length;i++) {
		T[i]=T[i].split("\t");
		if (T[i][2]) {
			T[i][2]=T[i][2].replace(/\\n/g,"\n").replace(/\\t/g,"\t");
			var s=T[i][2];
			if (s[s.length-1]=="\n") T[i][2]=s.substr(0,s.length-1);
		}
	}
	var output=T.map(processline);
	finish(fn,output);
}


processfile("footpg1");
//processfile("footpg2");
fs.writeFileSync('./data/errfootnote.json',errfootnote.join('\n'),'utf8');
