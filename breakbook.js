const fs=require('fs')
const ext=".xml";
const breakbook=function(sourcefolder,targetfolder,booklst,articleends){
	const splitfile=(book)=>{
		const writefile=(article,till)=>{
			till=till||lines.length
			const targetfn=book+"-"+(++juan)+".txt";
			const out=lines.slice(start,till);
			console.log("writing",targetfn,"lines",out.length)
			out.splice(1,0,"^"+article);
			fs.writeFileSync(targetfolder+targetfn,out.join("\n"),"utf8")
		}

		const lines=fs.readFileSync(sourcefolder+book+ext,"utf8").split(/\r?\n/);

		const articles=articleends[book];
		let start=0,juan=0;
		if (!articles)return;
		for (let i=0;i<lines.length;i++) {
			const line=lines[i];
			if (line[0]!=="~") continue;
			const article=articles[line];
			if (article) {
				writefile(article,i);
				start=i;
			}
		}
		writefile(articles.last);
	}
	booklst.forEach(splitfile);
}
module.exports=breakbook;