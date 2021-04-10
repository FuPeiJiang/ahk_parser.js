const path = require('path')
const fs = require('fs')
const rootDir = path.dirname(path.resolve(__dirname)) //it doesn't work without this

fromDir(`${rootDir}/src`,'.d.ts')

// https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs#answer-25462405
function fromDir(startPath,filter){

  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)){
    console.log('no dir ',startPath)
    return
  }

  var files = fs.readdirSync(startPath)
  for (var i = 0;i < files.length;i++){
    var filename = path.join(startPath,files[i])
    var stat = fs.lstatSync(filename)
    if (stat.isDirectory()){
      fromDir(filename,filter) //recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      //HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      fs.unlinkSync(filename)
      console.log('-- unlink: ',filename)
    }
  }
}
