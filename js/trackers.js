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
  var objects = new tracking.ObjectTracker(["face","mouth","eye"]);

  objects.setInitialScale(4);
  objects.setStepSize(2);
  objects.setEdgesDensity(0.1);

  objects.on('track',function(event){
    ctx.clearRect(0,0,c.width,c.height);    
    if(event.data.length === 0) {
      //Nothing
    } else {
      event.data.forEach(function(rect){
        ctx.beginPath();
        ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
        ctx.stroke();        
      });
    }
  });

  tracking.track('#myVideo', objects);