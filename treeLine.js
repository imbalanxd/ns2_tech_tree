function treeLine(form, width)
{
	var lines = new Array();
	var ref = this;
	var container = form;
	var imageSize = 76;
	var lineWidth = width;
	var defColor = "#0d0d0d";
	var codeSrc;
	var codeDest;

	this.drawLine = function(srcNode, srcSide, srcOffset, destNode, destSide, destOffset)
	{
		var src = findPoint(srcNode, srcSide, srcOffset);
		var dest = findPoint(destNode, destSide, destOffset);
		if(srcSide=="left" || srcSide == "right")
			codeSrc = -1;
		else
			codeSrc = 1;
		if(destSide=="left" || destSide == "right")
			codeDest = -1;
		else
			codeDest = 1;

		connectPoints(src, srcSide, dest, destSide);
	}

	connectPoints = function(srcPoint, srcSide, destPoint, destSide)
	{
		var currentLineLength = lines.length;
		if(codeSrc + codeDest == 0)
		{
			if(codeSrc == 1)
			{
				lines[currentLineLength+0] = ref.VerticalLine(srcPoint.x-(lineWidth/2),srcPoint.y,destPoint.y-srcPoint.y+(lineWidth/2), defColor);
			}
			else
			{
				lines[currentLineLength+0] = ref.HorizontalLine(srcPoint.x,srcPoint.y-(lineWidth/2),destPoint.x-srcPoint.x+(lineWidth/2), defColor);
			}
			if(codeDest == 1)
			{
				lines[currentLineLength+1] = ref.VerticalLine(destPoint.x-(lineWidth/2),destPoint.y,srcPoint.y-destPoint.y+(lineWidth/2), defColor);
			}
			else
			{
				lines[currentLineLength+1] = ref.HorizontalLine(destPoint.x,destPoint.y-(lineWidth/2),srcPoint.x-destPoint.x+(lineWidth/2), defColor)
			}
		}
		else
		{
			var xCoordsrc, yCoordsrc;
			var xCoorddest, yCoorddest;
			if(codeSrc == 1)
			{
				lines[currentLineLength+0] = ref.VerticalLine(srcPoint.x-(lineWidth/2),srcPoint.y,(destPoint.y-srcPoint.y)/2+(lineWidth/2), defColor);
				yCoordsrc = srcPoint.y + (destPoint.y-srcPoint.y)/2+(lineWidth/2);
				xCoordsrc = srcPoint.x-(lineWidth/2);

				lines[currentLineLength+1] = ref.VerticalLine(destPoint.x-(lineWidth/2),destPoint.y,(srcPoint.y-destPoint.y)/2+(lineWidth/2), defColor);
				xCoorddest = destPoint.x-(lineWidth/2);
				yCoorddest = destPoint.y + (srcPoint.y-destPoint.y)/2+(lineWidth/2);

				//lines[currentLineLength + 2] = 
			}
			else
			{
				lines[currentLineLength+0] = ref.HorizontalLine(srcPoint.x,srcPoint.y-(lineWidth/2),(destPoint.x-srcPoint.x)/2+(lineWidth/2), defColor);
				yCoordsrc = srcPoint.y-(lineWidth/2);
				xCoordsrc = srcPoint.x + (destPoint.x-srcPoint.x)/2-(lineWidth/2);

				lines[currentLineLength+1] = ref.HorizontalLine(destPoint.x,destPoint.y-(lineWidth/2),(srcPoint.x-destPoint.x)/2-(lineWidth/2), defColor)
				xCoorddest = destPoint.x + (srcPoint.x-destPoint.x)/2 - (lineWidth/2);
				yCoorddest = destPoint.y-(lineWidth/2);

				lines[currentLineLength + 2] = ref.VerticalLine(xCoordsrc, yCoordsrc, yCoorddest - yCoordsrc, defColor);
			}
		}

		for(var j = currentLineLength; j<lines.length; j++)
		{
			lines[j].appendTo(form);
		}
	}

	extendLine = function()
	{

	}

	findPoint = function(node, side, offset)
	{
		var point = {'x': 0, 'y': 0};
		point.x = node.left;
		point.y = node.right;
		switch(side)
		{
			case 'top':
				point.x+=imageSize*offset;
			break;
			case 'right':
				point.x+=imageSize;
				point.y+=imageSize*offset;
			break;
			case 'bottom':
				point.y+=imageSize;
				point.x+=imageSize*offset;
			break;
			case 'left':
				point.y+=imageSize*offset;
			break;
		}
		return point;
	}

	//this.drawLine = function()
	//{

	//}
	this.setColor = function (state)
	{
		var color;
		var depth;
		switch(state)
		{
			case 'on':
				depth = 3;
				color = "#33a1bd";
			break;
			case 'active':
				depth = 2;
				color = "#273437";
			break;
			case 'inactive':
				depth = 1;
				color = "#0d0d0d";
			break;
		}

		for(var j = 0; j<lines.length; j++)
		{

			lines[j].css("background-color", color);
			lines[j].css("z-index", depth);
		}
	}

	this.VerticalLine = function ( x, y, size, color)
	{
		if (x>=0 && y>=0)
		{
			if(size<0)
			{
				y+=size;
				size*=-1;
			}
			var segment = $('<div style="position:absolute; left:' + x + 'px; top:' + y + 'px; width:'+lineWidth+'px; height:' + size + 'px;background-color:' + color + ';z-index=1"><table height=' + size + ' width=1></table></div>');
			return segment;
		} 
	}

	this.HorizontalLine = function ( x, y, size, color)
	{
		if (x>=0 && y>=0)
		{
			if(size<0)
			{
				x+=size;
				size*=-1;
			}
			var segment = $('<div style="position:absolute; left:' + x + 'px; top:' + y + 'px;width:' + size + 'px; height:'+lineWidth+'px;background-color:' + color + ';z-index=1"><tableheight=1 width=' + size + '></table></div>');
			return segment;
		} 
	}
}