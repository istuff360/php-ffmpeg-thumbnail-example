/*
Sample:

<img src="./frames/GPLFireplace/0.png" 
     width="160" 
	 height="120" 
	 onmouseover="frameRotator.start(this)" 
	 onmouseout="frameRotator.end(this)"/>
*/

frameRotator = {

	frames : 5, // number of frames per video
	frameRate : 250, // frameRate in milliseconds for changing the frames
	
	timer : null,
	frame : 0,
	img  : new Image(),
	
	frameBase : function (o) // extract the base frame path by removing the slicing parameters
	{
		var path = o.src;
		var pos = path.lastIndexOf("/") + 1;
		if (pos != -1)
			path = path.substring(0, pos);
		return path;
	},
	

	change : function (o, i) // set the Nth frame, request the next one and set a timer for showing it
	{
		frame = (i + 1) % (this.frames-1);

		var path = this.frameBase(o);
		
		o.src = path + i + ".png";
		this.img.src = path + i + ".png";

		i = i % (this.frames-1);
		i++;
		
		this.timer = setTimeout(function () { frameRotator.change(o, i) }, this.frameRate);
	},
	
	start : function (o) // reset the timer and set the first frame
	{
		clearTimeout(this.timer);
		var path = this.frameBase(o);
		this.change(o, 1);
	},

	end : function (o) // reset the timer and set the first frame
	{
		clearTimeout(this.timer);
		o.src = this.frameBase(o) + "0.png";
	}
};