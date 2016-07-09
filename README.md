Use DBF manager  to dump palipg1.dbf, palipg2.db, footpg1.dbf , footpg2.dbf into XML format
node convfoxprodump.js // generate palipg1,2 , footpg1,2 in tsv format
node gen.js  // break tsv into genxml , each book one file
node breaksutta.js //break book into sutta/samyuttha/nipata
node genfootnote.js //convert footpg1,2 tsv to json format, breaking footnote group into an array of footnote item.