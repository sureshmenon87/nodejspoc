var fs=require('fs');

var im = require('imagemagick');
var PDFDocument=require('pdfkit');
var util = require('util'),
    exec = require('child_process').exec,
    child;
	
var mime = require("mime");	

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



exports.imageToBase64 = function(fileSrc,callback) {

fs.readFile(fileSrc,function(err,data){
var base64=data.toString("base64");
if(!err){
callback(null,util.format("data:%s;base64,%s", mime.lookup(fileSrc), base64));
}
});
    
}	
	
exports.formatConvert = function(fileSrc,output,callback) {
exec('convert '+fileSrc+' '+output,
				function (error, stdout, stderr) {
					console.log('stdout: ' + stdout);
					console.log('error: ' + error);
					
						if (error== null) {
						
								callback(null,'1');
							}else{
							
								console.log('stderr: ' + stderr);
								console.log('exec error: ' + error);
								callback(err,'-1');
							}
			});
}
exports.imageToPdf = function(fileSrc,output,callback) {
var mode=2;
console.log('SRC '+fileSrc);
console.log('Output '+output);

 if(mode==1){
		doc = new PDFDocument({size: 'LEGAL',
		layout: 'landscape'});
		doc.image(fileSrc);
		doc.pipe(fs.createWriteStream(output));
		doc.end();
  }else if(mode==2){
        
		exec('convert '+fileSrc+' '+output,
				function (error, stdout, stderr) {
					console.log('stdout: ' + stdout);
					
						if (error == null) {
								callback(null,'1');
							}else{
								console.log('stderr: ' + stderr);
								console.log('exec error: ' + error);
								callback(err,'-1');
							}
			});
  }
}

exports.base64ToImage = function(req,filename,path,callback) {
  var buf=new Buffer(req.body.base64, 'base64');
  var filename=filename;
  var output=filename.substr(0,filename.lastIndexOf('.'))+'.pdf';
  fs.writeFile( path+'/'+filename, buf, 'binary', function(err) {
	
	if(err==null){
	  callback(null,'1');
	  
	}else{
	  console.log('Error '+err);
	  callback(null,'-1');
	}
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