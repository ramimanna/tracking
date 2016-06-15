  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

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
  ctx.lineWidth="1";
  ctx.strokeStyle="purple";
  var face_tracker = new tracking.ObjectTracker("face");

  // face_tracker.setInitialScale(4);
  // face_tracker.setStepSize(2);
  // face_tracker.setEdgesDensity(0.1);

  face_tracker.on('track',function(event){
    if(event.data.length === 0) {
        ctx.clearRect(0,0,c.width,c.height);
    } else {
      event.data.forEach(function(rect){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.beginPath();
        ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
        ctx.stroke();        
      });
    }
  });

  tracking.track('#myVideo', objects);