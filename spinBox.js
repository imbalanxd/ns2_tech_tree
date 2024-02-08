function spinBox(form,width,height,digits)
{
	var imgWidth;
	var imgHeight;
	var containerWidth = width;
	var containerHeight = height;
	var padding = -6;
	var digitRows = digits;

	var mainWindow = form;
	
	var ref = this;
	
	var total = 0;
	var spinSpeed = 650;
	var frameAdjustX = -60;
	var frameAdjustY = 0;

	var spinBoxContainer;
	var spinFrameImg;
	var spinnerContainer;
	var sliderImg = Array();
	var imageSource;

	spinBoxContainer = $("<div class='spinBoxContainer'></div>");
	spinFrameImg = $("<img class='spinImage' src = 'image/spinBox/frame.png'></img>").load(function(){populateFrame(this.width, this.height);});
	spinnerContainer = $("<div class='spinnerContainer' style='width:"+ width+"px; height: "+height+"px'></div>");

	this.setPosition = function(x,y)
	{
		spinBoxContainer.css("left", x+"px");
		spinBoxContainer.css("top", y+"px");
	}

	populateFrame = function(w, h)
	{
		spinBoxContainer.css("width", w+"px");
		spinBoxContainer.css("height", h+"px");
		spinnerContainer.attr("style", "width:"+ (w-20)+"px; height: "+height+"px");
		spinFrameImg.appendTo(spinBoxContainer);
		spinnerContainer.appendTo(spinBoxContainer);
		spinnerContainer.css("margin-top", (h/2.0) - (height/2.0));
		spinBoxContainer.appendTo(mainWindow);

		imageSource = $("<img class='spinner' src = 'image/spinBox/numbers.png'></img>").load(function(){
																					imgWidth = this.width; 
																					imgHeight = this.height; 
																					populateSpinner();
																				});
	}

	populateSpinner = function()
	{
		for(var i = 0; i < digits*2; i++)
		{
			sliderImg[i] = $("<img class='spinner'></img>");
			sliderImg[i].attr("src", imageSource.attr("src"));
			sliderImg[i].appendTo(spinnerContainer);

			sliderImg[i].css("right", Math.floor(i/2)*(imgWidth+padding));
			sliderImg[i].css("bottom", 0);
			if(i%2==1)
			{
				sliderImg[i].css("bottom", imgHeight+"px");
			}
		}
	}

	this.modifyTotal = function(value)
	{
		total+=value;
		setDisplay(total);
	}

	setDisplay = function(value)
	{
		if(value < Math.pow(10, digitRows))
		{
			var valTemp = value;
			var spinVal;
			for(var j = digitRows-1; j>=0; j--)
			{
				spinVal = Math.floor(valTemp/Math.pow(10, j));
				spinSpinner(j, spinVal);
				valTemp -= spinVal * Math.pow(10, j);
			}
		}
	}

	spinSpinner = function(spinId, value)
	{
		sliderImg[spinId*2].stop();
		sliderImg[spinId*2+1].stop();
		if(Math.abs(parseInt(sliderImg[spinId*2].css("bottom")))>=imgHeight)
		{

			sliderImg[spinId*2].css("bottom", (parseInt(sliderImg[spinId*2].css("bottom")) + imgHeight)+"px");
			sliderImg[spinId*2+1].css("bottom", (parseInt(sliderImg[spinId*2].css("bottom")) + imgHeight)+"px");
		}

		var spinDest = 0;
		if((Math.abs(parseInt(sliderImg[spinId*2].css("bottom"), 10))/containerHeight) > value)
		{
			
			spinDest-= +parseInt(imgHeight, 10);
		}
		spinDest-= value*containerHeight;

		sliderImg[spinId*2].animate({bottom: spinDest+"px"}, spinSpeed);
		sliderImg[spinId*2+1].animate({bottom: (spinDest+imgHeight)+"px"}, spinSpeed);
	}
}