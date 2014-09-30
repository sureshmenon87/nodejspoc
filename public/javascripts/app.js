

var element = null;
var context = null;

$(document).ready(function () {


initialize();
//$(element).unbind("mousemove").unbind("mouseup").unbind("mouseout");
	$('#fileinput').on("change",function() {
            readURL(this);
            });
});



 function initialize() {
            // get references to the canvas element as well as the 2D drawing context
            element = document.getElementById("drawingCanvas");
            context = element.getContext("2d");

            // start drawing when the mousedown event fires, and attach handlers to 
            // draw a line to wherever the mouse moves to
            $("#drawingCanvas").mousedown(function (mouseEvent) {
                var position = getPosition(mouseEvent, element);

                context.moveTo(position.X, position.Y);
                context.beginPath();

                // attach event handlers
                $(this).mousemove(function (mouseEvent) {
                    drawLine(mouseEvent, element, context);
                }).mouseup(function (mouseEvent) {
                    finishDrawing(mouseEvent, element, context);
                }).mouseout(function (mouseEvent) {
                    finishDrawing(mouseEvent, element, context);
                });
            });

            // clear the content of the canvas by resizing the element
            $("#btnClear").click(function () {
                // remember the current line width
                var currentWidth = context.lineWidth;

                element.width = element.width;
                context.lineWidth = currentWidth;
            });

            // change the line width
            $("#btnLinewidth").change(function (event) {
                if (!isNaN(event.target.value)) {
                    context.lineWidth = event.target.value;
                }
            });
        }




function getPosition(mouseEvent, element) {
    var x, y;
    if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
        x = mouseEvent.pageX;
        y = mouseEvent.pageY;
    } else {
        x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { X: x - element.offsetLeft, Y: y - element.offsetTop };
}


$("#drawingCanvas").mousedown(function (mouseEvent) {
    var position = getPosition(mouseEvent, element);
    context.moveTo(position.X, position.Y);
    context.beginPath();
 
    // attach event handlers
    $(this).mousemove(function (mouseEvent) {
        drawLine(mouseEvent, element, context);
    }).mouseup(function (mouseEvent) {
        finishDrawing(mouseEvent, element, context);
    }).mouseout(function (mouseEvent) {
        finishDrawing(mouseEvent, element, context);
    });
});
 
// draws a line to the x and y coordinates of the mouse event inside
// the specified element using the specified context
function drawLine(mouseEvent, element, context) {
    var position = getPosition(event, element);
    context.lineTo(position.X, position.Y);
    context.stroke();
}
 
// draws a line from the last coordiantes in the path to the finishing
// coordinates and unbind any event handlers which need to be preceded
// by the mouse down event
function finishDrawing(mouseEvent, element, context) {
    // draw the line to the finishing coordinates
    drawLine(mouseEvent, element, context);
 
    context.closePath();
 
    // unbind any events which could draw
    $(element).unbind("mousemove").unbind("mouseup").unbind("mouseout");
}

function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    					
					var img = new Image();
					img.src = e.target.result;
					console.log(img.width);
					element.width=img.width;
					element.height=img.height;
					
					img.onload = function () {
					context.drawImage(img,0,0,img.width,img.height);
					}
					
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
		
function upload(){
var base64Image = element.toDataURL('image/png');
var mimeType = base64Image.split(';')[0];
//var base64 = encodeURIComponent(base64Image.split(',')[1]);
var base64 = (base64Image.split(',')[1]);
var url = '/base64/';

var params = {'mimeType':mimeType,'base64':base64};

$.post(url, params, function(json){
   if (json.status == 'upload_ok')
   {
      //ok
   }
},'application/json');
}		


