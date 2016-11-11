const sourcefolder='genxml/'; //this is in htll format
const targetfolder='genhtll/';
const booklst=["an1","an2","an3","an4","an5"];
const articleends={
	"an1":{
		"~17.47":"EKA-NIPĀTA",
		"~17.101":"DUKA-NIPĀTA",
		"last":"TIKA-NIPĀTA",
	},
	"an2":{
		"last":"CATUKKA-NIPĀTA"
	},
	"an3":{
		"~19.279":"PAÑCAKA-NIPĀTA",
		"last":"CHAKKA-NIPĀTA"
	},
	"an4":{//11
		"~20.150":"SATTAKA-NIPĀTA",
		"~20.351":"AṬṬHAKA-NIPĀTA",
		"last":"NAVAKA-NIPĀTA"
	},
	"an5":{
		"~21.113":"DASAKA-NIPĀTA 1",
		"~21.311":"DASAKA-NIPĀTA 2",
		"last":"EKĀDASAKA-NIPĀTA"
	}
}


require("./breakbook")(sourcefolder,targetfolder,booklst,articleends);