const fs=require('fs')
const sourcefolder='genxml/'; //this is in htll format
const targetfolder='genhtll/';
let booklst=fs.readFileSync('./vin.lst','utf8').replace(/\r\n/g,'\n').split('\n');
const ext=booklst[0].substr(booklst[0].length-4);
booklst=booklst.map(b=>b.substr(0,b.length-4));

const articleends={
	"vin1":{//10
		"~1.100":"Mahākhandhake",
		"~1.137":"MAHĀVAGGA II",
		"~1.157":"MAHĀVAGGA III",
		"~1.179":"MAHĀVAGGA IV",
		"~1.199":"MAHĀVAGGA V",
		"~1.253":"MAHĀVAGGA VI",
		"~1.268":"MAHĀVAGGA VII",
		"~1.312":"MAHĀVAGGA VIII",
		"~1.337":"MAHĀVAGGA IX",
		"last":"MAHĀVAGGA X"
	},
	"vin2":{//12
		"~2.31":"CULLAVAGGA I",
		"~2.38":"CULLAVAGGA II",
		"~2.73":"CULLAVAGGA III",
		"~2.105":"CULLAVAGGA IV",
		"~2.146":"CULLAVAGGA V",
		"~2.180":"CULLAVAGGA VI",
		"~2.207":"CULLAVAGGA VII",
		"~2.236":"CULLAVAGGA VIII",
		"~2.253":"CULLAVAGGA IX",
		"~2.284":"CULLAVAGGA X",
		"~2.294":"CULLAVAGGA XI",
		"last":"CULLAVAGGA XII"
	},
	"vin3"://4
	{"~3.110":"PĀRĀJIKA","~3.187":"SAṂGHĀDISESA","~3.195":"ANIYATA"
,"last":"NISSAGGIYA"},
	"vin4":{//11
	"~4.175":"PĀCITTIYA",
	"~4.185":"pāṭidesaniyaṃ",
	"~4.207":"sekhiyā dhammā",
	"~4.211":"Mahāvibhaṅgaṃ",
	"~4.223":"pārājikakaṇḍaṃ",
	"~4.243":"sattarasakaṃ",
	"~4.258":"tiṃsanissaggiyaṃ",
	"~4.346":"khuddakaṃ",
	"~4.349":"pāṭidesaniyaṃ1", //don't know why repeat name
	"~4.351":"sekhiyā",
	"last":"Ubhatovibhaṅgaṃ"
	},
	"vin5":{
		"~5.54":"PARIVĀRA I",
		"~5.86":"PARIVĀRA II",
		"~5.91":"PARIVĀRA III",
		"~5.114":"PARIVĀRA IV",
		"~5.115":"PARIVĀRA V",
		"~5.142":"PARIVĀRA VI",
		"~5.144":"PARIVĀRA VII",
		"~5.150":"PARIVĀRA VIII",
		"~5.158":"PARIVĀRA IX",
		"~5.160":"PARIVĀRA X",
		"~5.163":"PARIVĀRA XI",
		"~5.166":"PARIVĀRA XII",
		"~5.172":"PARIVĀRA XIII",
		"~5.180":"PARIVĀRA XIV",
		"~5.207":"PARIVĀRA XV",
		"~5.210":"PARIVĀRA XVI",
		"~5.216":"PARIVĀRA XVII",
		"~5.220":"PARIVĀRA XVIII",
		"last":"PARIVĀRA XIX"
	}
}
const breakbook=(book)=>{
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
booklst.forEach(breakbook);