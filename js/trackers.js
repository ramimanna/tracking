  var my_c = document.getElementById("myCanvas");
  var my_ctx = my_c.getContext("2d");

  var video_c = document.getElementById("videoCanvas");
  var video_ctx = video_c.getContext("2d");
  video_ctx.drawImage(video, 0, 0, 400, 300);
  var image_data = video_ctx.getImageData(0, 0, 400, 300);
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
        my_my_ctx.beginPath();
        my_ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
        my_ctx.stroke();        
      });
    }
  });

  tracking.track('#myVideo', face_tracker);