var express = require('express');
var router = express.Router();
var util = require('../controllers/UtilityController.js');
var easyimg = require('easyimage');
var im = require('imagemagick');
var PDFDocument=require('pdfkit');
//var gm = require('gm');
//var im = require('gm').subClass({ imageMagick: true });
var fs=require('fs');



var util = require('util'),
    exec = require('child_process').exec,
    child;

/* GET home page. */
router.get('/', function(req, res) {
  
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req, res) {
  util.saveFiletoDisk(req,function(err,path,filename){
   if(err){
  res.send("Service is not available!");
  }else{
  
  util.imageToPDF(path+filename,function(err,msg){
  if(err==null){
  res.send("Done!");
  }
  });
  }
  
  });
  });


  router.post('/base64',function(req,res){
  
  console.dir(req.body.base64);
  
  var buf=new Buffer(req.body.base64, 'base64');
  
  fs.writeFile("out.png", buf, 'binary', function(err) {
  console.log(err);
  doc = new PDFDocument();
  doc.image('out.png', 0, 15,300).text('Proprotional to width', 0, 0);

  doc.pipe(fs.createWriteStream('output.pdf'));
  doc.end();
});
  
  /*util.saveFiletoDisk(req,function(err,path,filename){
  console.log(filename);
  });*/
  
  
  
  });
  
  
  
  
  
  
  
  
  router.get('/test',function(req,res){
console.log("/test");

/*
var src='error720.png';

gm("D:\\nodejspoc\\controllers\\temp\\black-white-vector.jpg")
.size(function (err, size) {
  if (!err)
    console.log(size.width > size.height ? 'wider' : 'taller than you');
});
*/




var input = __dirname   + '\\error720.png';
var output = __dirname + '\\resize.pdf';
var input_pdf = __dirname   + '\\error720.pdf';
console.log(input);
console.log(output);
child = exec('convert '+input_pdf+' error720.png',
//child = exec('convert '+input+' '+output,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});


/*
im.convert(['error720.png', '', '', 'one.pdf'], 
function(err, stdout){
  if (err)  console.log(err);
  console.log('stdout:', stdout);
});

im.convert(['/error720.png', '-resize', '25x120', 'kittens-small.jpg'], 
function(err, stdout){
  if (err)  console.log(err);
  console.log('stdout:', stdout);
});*/


/*im.resize({
        srcPath : input,
        width : 200
    },
    function(err, stdout, stderr) {
        if (err){
            console.log("Error "+err.message);
        } else {
            res.contentType("image/jpeg");
            res.end(stdout);
        }
    });*/


/*var gm = require('gm').subClass({ imageMagick: true });

        gm('error720.png')
        .resize(234, 567)
        .autoOrient()
        .write(output, function (err) {
          if (err) console.log(' noooo! '+err);
        });*/




/*
require('bufferjs');

console.log(input);
console.log(output);

im.resize({
      srcPath: __dirname+input,
      dstPath: __dirname+output,
      width: 50
    }, function(err, stdout, stderr){
      if (err) console.log(err.message);

    });

/*
gm(input)
  .resize(800)
  .stream( function(err, stdout, stderr) {

    ws = fs.createWriteStream( output );

    i = [];

    stdout.on( 'data', function(data){

      console.log('data');

      i.push( data );


    });

    stdout.on( 'close', function(){

      console.log( 'close' );

      var image = Buffer.concat( i );
      ws.write( image.toString('base64'), 'base64' );
      ws.end();

    });

  } );



var readStream = fs.createReadStream('D:\\nodejspoc\\controllers\\temp\\black-white-vector.jpg');
try{
gm(readStream, 'black-white-vector.jpg')
.write('d:\\reformat.png', function (err) {
  if (!err) console.log('done');
});
}catch(err){
console.log(err.message);
}

im.convert(['error720.png', '-resize', '25x120', 'kittens-small.jpg'], 
function(err, stdout){
  if (err){ console.log(err);}
  console.log('stdout:', stdout);
});

easyimg.info(src).then(
  function(file) {
    console.log(file);
  }, function (err) {
    console.log(err);
  }
);


var dst='D:\nodejspoc\controllers\temp\black-white-vector.pdf';
easyimg.convert({src:src, dst:dst, quality:80}, function(err, stdout, stderr) {
		console.log('Converted JPG to PNG, quality set at 10/100');
		if (err){ callback(err);}
		callback(null,'Converted JPG to PNG, quality set at 10/100');
		});*/
});

module.exports = router;
