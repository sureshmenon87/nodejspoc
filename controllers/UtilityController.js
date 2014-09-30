var fs=require('fs');
//var easyimg = require('easyimage');

exports.saveFiletoDisk = function(req,callback) {
	var path=__dirname + '\\temp\\';
	req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(path + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            callback(null,path,filename);
        });
    });
 

};


/*exports.imageToPDF = function(file,callback) {
console.log("here"+file);
	try{
	easyimg.convert({src:file, dst:'c:\beach.png', quality:10}, function(err, stdout, stderr) {
		console.log('Converted JPG to PNG, quality set at 10/100');
		if (err){ callback(err);}
		callback(null,'Converted JPG to PNG, quality set at 10/100');
		});
    }
	catch(err){
	console.log(err.message);
	}
	}*/
  



exports.pdfToImage = function() {
  return "pdfToImage";
};