var fs=require("fs");
var content=fs.readFileSync("foxpro/footpg1.xml","ascii");
var out={};
content.replace(/&(.+?);/g,function(m,m1){
	if (!out[m1])out[m1]=0;
	out[m1]++;
})
fs.writeFileSync("entity.txt",JSON.stringify(out,""," "),"utf8");