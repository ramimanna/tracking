  var my_c = document.getElementById("myCanvas");
  var my_ctx = my_c.getContext("2d");

  var video = document.getElementById("myVideo");

  var video_c = document.getElementById("videoCanvas");
  var video_ctx = video_c.getContext("2d");
  // video_ctx.drawImage(video, 0, 0, 400, 300);
  // var image_data = video_ctx.getImageData(0, 0, 400, 300);

document.addEventListener('DOMContentLoaded', function(){
    // var v = document.getElementById('v');
    // var canvas = document.getElementById('c');
    // var context = canvas.getContext('2d');

    var cw = Math.floor(video_c.clientWidth);
    var ch = Math.floor(video_c.clientHeight);
    video_c.width = cw;
    video_c.height = ch;

    video.addEventListener('playing', function(){
        draw(this,video_ctx,cw,ch);
    },false);

},false);

function draw(v,ctx,w,h) {
    if(v.paused || v.ended) return false;
    var image_data = video_ctx.getImageData(0, 0, w, h);
    // var data = image_data.data;
    // for(var i = 0; i < data.length; i+=4) {
    //     var r = data[i];
    //     var g = data[i+1];
    //     var b = data[i+2];
    //     var brightness = (3*r+4*g+b)>>>3;
    //     data[i] = brightness;
    //     data[i+1] = brightness;
    //     data[i+2] = brightness;
    // }
    // image_data.data = data;
    ctx.putImageData(image_data,0,0,w,h);
    setTimeout(draw,20,v,ctx,w,h);
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
  my_ctx.lineWidth="1";
  my_ctx.strokeStyle="purple";
  var face_tracker = new tracking.ObjectTracker("face");

  face_tracker.setInitialScale(4);
  face_tracker.setStepSize(2);
  face_tracker.setEdgesDensity(0.1);

  face_tracker.on('track',function(event){
    my_ctx.clearRect(0,0,my_c.width,my_c.height);
    if(event.data.length === 0) {
    } else {
      event.data.forEach(function(rect){
        my_ctx.clearRect(0,0,my_c.width,my_c.height);
        my_ctx.beginPath();
        my_ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
        my_ctx.stroke();        
      });
    }
  });

  tracking.track('#myVideo', face_tracker);