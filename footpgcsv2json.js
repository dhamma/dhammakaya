/*
found error in first 4 nikaya

"bk":7,"pg":290,﻿        * Edited at Colombo, 1883, by Baṭuwan Tuḍāwa,
"bk":8,"pg":1,﻿        Sc -- Sinhalese manuscript belonging to J. E. Carpenter.
"bk":11,"pg":25,﻿     *Sk has a lacuna from this point to ye on page 27, line 23.
"bk":14,"pg":131,﻿ further on, S1 udayabyayānu; S3 ºbyāyānu, the first ā being erased
"bk":17,"pg":104,﻿     Ph. -pacchena; Bb. 24 -pajjena, altered to -pajjhena.

"bk":17,"pg":104 ==> check printed, missing 1.
*/
var csv = require('csv');
var fs = require('fs');
var source='footpg1';
var fields=null;
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
output=[];
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
				out.push(s);
				s="";
				startn++;
		}
		s+=L;
	})
	if (s.trim().length) out.push(s);
	return out;
}

csv()
.from.stream(fs.createReadStream('./data/'+source+'.csv','ascii'))
.transform( function(R,index){
	if (index==0) {
		fields=R;
		console.log(R)
		return null;
	}

	var footnote = new Buffer(R[UNITEXT],'base64');

  var fn = footnote.toString();
  fn=fn.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
  //fn=fn.replace(/\r/g,'\\n');
  if (fn.indexOf('"')>-1) {
  	console.log('has double quote','bk'+R[BOOKNO],' page'+R[PAGENO]);
  }
  // don't know R[CODE] means
  notes=splitfn(fn,R[BOOKNO],R[PAGENO])
	if (notes.length) output.push({ bk:parseInt(R[BOOKNO],10), pg:parseInt(R[PAGENO],10), notes: notes});

	return null;	
})
.on('record', function(row,index){
 // console.log('#'+index+' '+JSON.stringify(row));
})
.on('end', function(count){
  output.sort(function(a,b){return (a.bk*512+a.pg) - (b.bk*512+b.pg) })	;
  out=output.map(function(L){
  	return '"'+L.bk+'.'+L.pg+'":'+JSON.stringify(L.notes)
  });

  json='{\n'+out.join(',\n')+'\n}';
	fs.writeFileSync('./data/'+source+'.json',json,'utf8')

	fs.writeFileSync('./data/errfootnote.json',errfootnote.join('\n'),'utf8')
})
.on('error', function(error){
 // console.log(error.message);
});