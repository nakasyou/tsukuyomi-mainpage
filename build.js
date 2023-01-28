const ejs = require('ejs');
const fs = require('fs');

const files=JSON.parse(fs.readFileSync('map.json',"utf8")).files;
for(const file of files){
    const dir=file.split("/").slice(0,-1).join("/");
    const isdir=fs.existsSync(dir);
    console.log(file,dir,isdir)
    if(!isdir){
        console.log('make',dir);
        fs.mkdirSync(dir,{recursive:true},()=>{})
    }
    if(file.slice(-4)!==".ejs"){
      //console.log("not ejs")
      fs.copyFile(`src/${file}`,`dist/${file}`,()=>{});
      continue;
    }
    ejs.renderFile(`src/${file}`, {}, {
        views:"./src",
        strict:true
    }, (err, str)=>{
        fs.writeFile(`dist/${file.replaceAll('.ejs','.html')}`,str,(err)=>{
            console.error(err);
        });
    });
}
