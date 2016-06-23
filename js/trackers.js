  var front = document.getElementById("myCanvas");
  var front_ctx = front.getContext("2d");

  var video = document.getElementById("myVideo");

  var back = document.getElementById("backingCanvas");
  var back_context = back.getContext("2d");

  var canvas = document.getElementById("videoCanvas");
  var canvas_context = canvas.getContext("2d");
  // canvas_context.drawImage(video, 0, 0, 400, 300);
  // var image_data = canvas_context.getImageData(0, 0, 400, 300);

document.addEventListener('DOMContentLoaded', function(){
    // var v = document.getElementById('v');
    // var canvas = document.getElementById('c');
    // var context = canvas.getContext('2d');

    var cw = Math.floor(canvas.clientWidth);
    var ch = Math.floor(canvas.clientHeight);
    canvas.width = cw;
    canvas.height = ch;

    video.addEventListener('playing', function(){
        draw(this,canvas_context,back_context,cw,ch);
    },false);

},false);

function draw(v,ctx,b_ctx,w,h) {
    if(v.paused || v.ended) return false;
    b_ctx.drawImage(v,0,0,w,h);
    var image_data = b_ctx.getImageData(0, 0, w, h);
    var data = image_data.data;
    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var brightness = (3*r+4*g+b)>>>3;
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
    }
    image_data.data = data;
    ctx.putImageData(image_data,0,0,0,0,w,h);
    setTimeout(draw,20,v,ctx,b_ctx,w,h);
}

  // var tacking_canvas = new Canvas();
  
  //---------------------------------------------------------------------//      

  // var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

  // colors.on('track', function(event) {
  //   if (event.data.length === 0) {
  //     // No colors were detected in this frame.
  //   } else {
  //     event.data.forEach(function(rect) {
  //       console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
  //     });
  //   }
  // });
  front_ctx.lineWidth="1";
  front_ctx.strokeStyle="purple";
  var face_tracker = new tracking.ObjectTracker("face");

  face_tracker.setInitialScale(4);
  face_tracker.setStepSize(2);
  face_tracker.setEdgesDensity(0.1);

  face_tracker.on('track',function(event){
    front_ctx.clearRect(0,0,front.width,front.height);
    if(event.data.length === 0) {
    } else {
      event.data.forEach(function(rect){
        front_ctx.clearRect(0,0,front.width,front.height);
        front_ctx.beginPath();
        front_ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
        front_ctx.stroke();        
      });
    }
  });

  tracking.track('#myVideo', face_tracker);