function treeNode(form, structure, x, y, cost, label,activation)
{
	var active = false;
	var on = false;
	var ref = this;
	this.branch;
	var resCost = cost;
	var animationTime = 200;
	var activationRequirement = activation || 1;
	var activationCount = 0;
	var title = label;

	this.left = (x*90+7);
	this.right = (y*90+7);

	var labelWidth, labelHeight;

	var children = new Array();
	var image = new Array();
	var container = $("<div style='position:absolute;width:76px;height:76px;left :"+ ref.left+"px; top :"+ ref.right+"px'></div>");
	container.appendTo(form);
	var filter = image[0] = $("<img class='node' src = 'image/"+structure+"/filter.png' style='z-index:1; display: none; opacity: 0.0'></img>").load(function(){preloader.itemComplete()});
	var available = image[1] = $("<img class='node' src = 'image/"+structure+"/available.png' style='z-index:2 ; display: none; opacity: 0.0'></img>").load(function(){preloader.itemComplete()});
	var unavailable = image[2] = $("<img class='node' src = 'image/"+structure+"/unavailable.png' style='z-index:2 '></img>").load(function(){preloader.itemComplete()});
	var base = image[3] = $("<img class='node' src = 'image/"+structure+"/base.png' style='z-index:2 ; display: none; opacity: 0.0'></img>").load(function(){preloader.itemComplete()});

	
	var infoSlider = $("<div class='infoslider' style='top: "+ref.right+"px;left: "+(ref.left+90)+"px;'><span class='labelText' style='top: 6px; left: 12px;'>"+title+"</span></div>");

	var infoSliderImg = $("<img src = 'image/UI/label.png'></img>").
							load(function(){
								labelWidth = this.width; 
								labelHeight = this.height;
								infoSlider.css("background", "url(image/UI/label.png)");
							});

	for(i=0;i<4;i++)
	{
		//image[i].css("left", ref.left+"px");
		//image[i].css("top", ref.right+"px");
		image[i].appendTo(container);
		
	}
	infoSlider.appendTo(form);

	base.click(function() { ref.setOn(false) });
	available.click(function() { ref.setOn(true) });

	container.hover(function(){ref.infoSliderOn();},function(){ref.infoSliderOff();});
	infoSlider.hover(function(){ref.infoSliderOn();},function(){ref.infoSliderOff();});
	//available.hover(function(){ref.infoSliderOn();},function(){ref.infoSliderOff();});
	//unavailable.hover(function(){ref.infoSliderOn();},function(){ref.infoSliderOff();});
	this.slideTimer;

	this.infoSliderOn = function()
	{
		infoSlider.stop();
		clearTimeout(ref.slideTimer);
		ref.slideTimer = setTimeout(function(){infoSlider.animate({width: labelWidth, height: labelHeight,opacity: 1.0}, 350, function() {});},900);
	}

	this.infoSliderOff = function()
	{
		infoSlider.stop();
		clearTimeout(ref.slideTimer);
		ref.slideTimer = setTimeout(function(){infoSlider.animate({width: 0, height: 0, opacity: 0.0}, 350, function() {});},120);
		//infoSlider.animate({width: 0, opacity: 0.0}, 350, function() {});
	}

	this.infoSliderMouseOver = function()
	{

	}

	this.toggleOnAnimation = function(state)
	{
		base.stop();
		available.stop();
		filter.stop();
		if(state)
		{
			spinner.modifyTotal(resCost);
			if(ref.branch)
				ref.branch.setColor("on");
			available.animate({opacity: 0.0}, animationTime, function() {available.css("display", "none")});
			base.css("display", "inline");
			base.animate({opacity: 1.0}, animationTime, function() {});
			filter.css("display", "inline");
			filter.animate({opacity: 1.0}, animationTime, function() {});
		}
		else
		{
			spinner.modifyTotal(-resCost);
			if(ref.branch)
				ref.branch.setColor("active");
			base.animate({opacity: 0.0}, animationTime, function() {base.css("display", "none")});
			filter.animate({opacity: 0.0}, animationTime, function() {filter.css("display", "none")});
			available.css("display", "inline");
			available.animate({opacity: 1.0}, animationTime, function() {});
		}
	}

	this.toggleActiveAnimation = function(state)
	{
		unavailable.stop();
		available.stop();
		if(state)
		{
			if(ref.branch)
				ref.branch.setColor("active");
			available.css("display", "inline");
			available.animate({opacity: 1.0}, animationTime, function() {});
			unavailable.animate({opacity: 0.0}, animationTime, function() {unavailable.css("display", "none")});
		}
		else
		{
			if(ref.branch)
				ref.branch.setColor("inactive");
			available.animate({opacity: 0.0}, animationTime, function() {available.css("display", "none")});
			unavailable.css("display", "inline");
			unavailable.animate({opacity: 1.0}, animationTime, function() {});
		}
	}

	this.toggleExtremeAnimation = function(state)
	{
		base.stop();
		unavailable.stop();
		filter.stop();
		if(state)
		{
			if(ref.branch)
				ref.branch.setColor("on");
			base.css("display", "inline");
			base.animate({opacity: 1.0}, animationTime, function() {});
			filter.css("display", "inline");
			filter.animate({opacity: 1.0}, animationTime, function() {});
			unavailable.animate({opacity: 0.0}, animationTime, function() {unavailable.css("display", "none")});
		}
		else
		{
			if(ref.branch)
				ref.branch.setColor("inactive");
			base.animate({opacity: 0.0}, animationTime, function() {base.css("display", "none")});
			filter.animate({opacity: 0.0}, animationTime, function() {filter.css("display", "none")});
			unavailable.css("display", "inline");
			unavailable.animate({opacity: 1.0}, animationTime, function() {});
		}
	}

	this.triggerClick = function()
	{
		if(active)
		{
			this.setOn(false);
		}
	}

	this.setActive = function(isActive)
	{
		if(active != isActive || activationCount>0)
		{
			if(isActive)
			{
				activationCount++;
				if(activationCount == activationRequirement)
				{
					active = true;
					if(on)
					{
						ref.cascadeChildren(active);
						ref.toggleExtremeAnimation(true)
					}	
					else
					{
						ref.toggleActiveAnimation(true);
					}
				}			
			}
			else
			{	
				activationCount--;
				active = false;
				if(on)
				{
					ref.cascadeChildren(active);
					ref.toggleExtremeAnimation(false)
				}	
				else
				{
					ref.toggleActiveAnimation(false);
				}	
			}
		}
	}

	this.setOn = function (isOn)
	{
		if(on != isOn)
		{
			on=isOn;
			ref.cascadeChildren(isOn);

			if(isOn)
			{
				if(!active)
				{
					ref.toggleExtremeAnimation(true);
				}
				else
				{
					ref.toggleOnAnimation(true);
				}
					
			}
			else
			{
				if(!active)
				{
					active = true;
				}
				ref.toggleOnAnimation(false);
			}
		}
	}

	this.cascadeChildren = function (state)
	{
		for(var j = 0; j < children.length; j++)
		{
			children[j].setActive(state);
		}		
	}

	this.addChild = function (node)
	{
		children[children.length] = node;
	}

	this.addBranch = function (srcNode, srcSide, srcOffset, destNode, destSide, destOffset)
	{
		if(!ref.branch)
			ref.branch = new treeLine(form, 4);
		ref.branch.drawLine(srcNode, srcSide, srcOffset, destNode, destSide, destOffset);
	}
}