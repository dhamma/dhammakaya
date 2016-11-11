const sourcefolder='genxml/'; //this is in htll format
const targetfolder='genhtll/';
const booklst=["vin1","vin2","vin3","vin4","vin5"];


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


require("./breakbook")(sourcefolder,targetfolder,booklst,articleends);