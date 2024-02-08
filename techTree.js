function techTree()
{
	var mainWindow = $('<div />').appendTo('body');
	mainWindow.attr('id', 'main');
	//For Preloader to change
	mainWindow.css("opacity", "0.0");

	function Preloader(items)
	{
		var totalItems = items;
		var activeItems = 0;
		var loadCover = $("<div class ='cover' />").appendTo('body');
		loadCoverImage =  $("<img src='image/preloader/background.png' class='progressUnit'></img>").appendTo(loadCover);
		var loadUnits = Array();
		for(var k = 0; k < 12; k++)
		{
			loadUnits[k] =  $("<img class= 'progressUnit' style= 'left: "+(11+k*17)+"px; top: "+27+"px;'></img>")
			loadUnits[k].css("display", "none");
			//loadUnits[k].css("opacity", 0.3 + (0.7/12)*k);
			switch(Math.floor(k/4))
			{
				case 0:
					loadUnits[k].attr("src", 'image/preloader/progressUnitOne.png');
				break;
				case 1:
					loadUnits[k].attr("src", 'image/preloader/progressUnitTwo.png');
				break;
				case 2:
					loadUnits[k].attr("src", 'image/preloader/progressUnitThree.png');
				break;
			}
			loadUnits[k].appendTo(loadCover);
		}
		
		//26 bars
		this.itemComplete = function()
		{
			activeItems++;
			if(Math.floor(activeItems/(totalItems/12))>Math.floor((activeItems-1)/(totalItems/12)))
			{
				for(var l = 0; l< Math.floor(activeItems/(totalItems)*12); l++)
				{
					loadUnits[l].css("display", "inline");
				}
			}

			if(activeItems == totalItems)
			{
				mainWindow.animate({opacity: 1.0}, 1000, function() {});
				loadCover.animate({opacity: 0.0}, 1000, function() {loadCover.css("display", "none");});
			}
				
		}
	}

	var animationTime = 200;
	var blockSize = 90;
	var gridWidth = $(window).width() * 0.5;
	var gridHeight = $(window).height() * 0.7;

	var BlockSize = 76;

	preloader = new Preloader(140);

	this.init = function()
	{
		comm = new treeNode(mainWindow, "comm", 0,0, 0, "Command Station");
		//Infantry Portal Node
		portal = new treeNode(mainWindow, "ip", 0.5,1.0, 15, "Infantry Portal");
		comm.addChild(portal);
		portal.addBranch(comm, 'bottom', 0.25, portal, 'left', .5);
		//Extractor Node
		extractor = new treeNode(mainWindow, "extractor", 0.5,2.0,10, "Extractor");
		comm.addChild(extractor);
		extractor.addBranch(comm, 'bottom', 0.25, extractor, 'left', .5);
		//Armory Node
		armory = new treeNode(mainWindow, "armory", 0.5,3.0, 10, "Armory");
		comm.addChild(armory);
		armory.addBranch(comm, 'bottom', 0.25, armory, 'left', .5);
		//Observatory Node
		observatory = new treeNode(mainWindow, "observatory", 2.5,2.0, 15 ,"Observatory",2);
		armory.addChild(observatory);
		portal.addChild(observatory);
		observatory.addBranch(armory, 'right', 0.5, observatory, 'left', .5);
		observatory.addBranch(portal, 'right', 0.5, observatory, 'left', .5);
		//Scan Node
		scan = new treeNode(mainWindow, "scan", 3.5,1.0, 3, "Scan");
		observatory.addChild(scan);
		scan.addBranch(observatory, 'right', 0.5, scan, 'bottom', .5);
		//Distress Beacon Node
		distress = new treeNode(mainWindow, "distress", 4.5,1.0, 10, "Distress Beacon");
		observatory.addChild(distress);
		distress.addBranch(observatory, 'right', 0.5, distress, 'bottom', .5);
		//Phase Tech Node
		phasetech = new treeNode(mainWindow, "phasetech", 5.5,1.0, 15, "Phase Technology");
		observatory.addChild(phasetech);
		phasetech.addBranch(observatory, 'right', 0.5, phasetech, 'bottom', .5);
		//Phase Gate Node
		phasegate = new treeNode(mainWindow, "phase", 7.0, 1.0, 15, "Phase Gate");
		phasetech.addChild(phasegate);
		phasegate.addBranch(phasetech, 'right', 0.5, phasegate, 'left', .5);
		//Shotgun Research Node
		shotgun = new treeNode(mainWindow, "shotgun", 2.5,4.0, 20, "Shotgun Research");
		armory.addChild(shotgun);
		shotgun.addBranch(armory, 'right', 0.5, shotgun, 'top', .5);
		//Welder Research Node
		welder = new treeNode(mainWindow, "welder", 3.5,4.0, 10, "Welder Research");
		armory.addChild(welder);
		welder.addBranch(armory, 'right', 0.5, welder, 'top', .5);
		//Mines Research Node
		mines = new treeNode(mainWindow, "mines", 4.5,4.0, 15, "Mines Research");
		armory.addChild(mines);
		mines.addBranch(armory, 'right', 0.5, mines, 'top', .5);
		//Advanced Armory Research Node
		advanced = new treeNode(mainWindow, "advanced", 5.5,4.0, 20, "Advanced Armory");
		armory.addChild(advanced);
		advanced.addBranch(armory, 'right', 0.5, advanced, 'top', .5);
		//Grenade Launcher Research Node
		grenade = new treeNode(mainWindow, "grenade", 6.5,5.0, 20, "Grenade Launcher Research");
		advanced.addChild(grenade);
		grenade.addBranch(advanced, 'right', 0.5, grenade, 'top', .5);
		//Flamethrower Research Node
		flame = new treeNode(mainWindow, "flame", 7.5,5.0, 25, "Flamethrower Research");
		advanced.addChild(flame);
		flame.addBranch(advanced, 'right', 0.5, flame, 'top', .5);
		//Prototype Lab
		proto = new treeNode(mainWindow, "proto", 8.5,5.0, 40, "Prototype Lab");
		advanced.addChild(proto);
		proto.addBranch(advanced, 'right', 0.5, proto, 'top', .5);
		//Arms Lab Node
		lab = new treeNode(mainWindow, "lab", 7.5,3.0, 20, "Arms Lab");
		armory.addChild(lab);
		lab.addBranch(armory, 'right', 0.5, lab, 'left', 0.5);
		//Weapons 1 Upgrade Node
		weap1 = new treeNode(mainWindow, "weap1", 9.5,2.5, 15, "Weapons Level 1");
		lab.addChild(weap1);
		weap1.addBranch(lab, 'right', 0.5, weap1, 'left', 0.5);
		//Weapons 2 Upgrade Node
		weap2 = new treeNode(mainWindow, "weap2", 10.5,2.5, 25, "Weapons Level 2");
		weap1.addChild(weap2);
		weap2.addBranch(weap1, 'right', 0.5, weap2, 'left', 0.5);
		//Weapons 3 Upgrade Node
		weap3 = new treeNode(mainWindow, "weap3", 11.5,2.5, 35, "Weapons Level 3");
		weap2.addChild(weap3);
		weap3.addBranch(weap2, 'right', 0.5, weap3, 'left', 0.5);
		//Armor 1 Upgrade Node
		armor1 = new treeNode(mainWindow, "armor1", 9.5,3.5, 15, "Armor Level 1");
		lab.addChild(armor1);
		armor1.addBranch(lab, 'right', 0.5, armor1, 'left', 0.5);
		//Armor 2 Upgrade Node
		armor2 = new treeNode(mainWindow, "armor2", 10.5,3.5, 25, "Armor Level 2");
		armor1.addChild(armor2);
		armor2.addBranch(armor1, 'right', 0.5, armor2, 'left', 0.5);
		//Armor 3 Upgrade Node
		armor3 = new treeNode(mainWindow, "armor3", 11.5,3.5, 35, "Armor Level 3");
		armor2.addChild(armor3);
		armor3.addBranch(armor2, 'right', 0.5, armor3, 'left', 0.5);
		//Robotics Factory Node
		robotics = new treeNode(mainWindow, "robotic", 0.5,5.0, 15, "Robotics Lab");
		comm.addChild(robotics);
		robotics.addBranch(comm, 'bottom', 0.25, robotics, 'left', .5);
		//Sentry Battery Node
		battery = new treeNode(mainWindow, "battery", 1.5,6.0, 10, "Sentry Battery");
		robotics.addChild(battery);
		battery.addBranch(robotics, 'right', 0.5, battery, 'top', .5);
		//Sentry Turret Node
		turret = new treeNode(mainWindow, "turret", 1.5,7.0, 5, "Sentry");
		battery.addChild(turret);
		turret.addBranch(battery, 'bottom', 0.5, turret, 'top', .5);
		//Arc Tech Upgrade Node
		arctech = new treeNode(mainWindow, "arctech", 2.5,6.0, 10, "ARC Technology");
		robotics.addChild(arctech);
		arctech.addBranch(robotics, 'right', 0.5, arctech, 'top', .5);
		//Arc Node
		arc = new treeNode(mainWindow, "arc", 2.5,7.0, 15, "ARC Cannon");
		arctech.addChild(arc);
		arc.addBranch(arctech, 'bottom', 0.5, arc, 'top', .5);
		//Mac Node
		mac = new treeNode(mainWindow, "mac", 3.5,6.0, 5, "MAC");
		robotics.addChild(mac);
		mac.addBranch(robotics, 'right', 0.5, mac, 'top', .5);
		//Mac Speed Upgrade Node
		macspeed = new treeNode(mainWindow, "macspeed", 4.5,6.0, 10, "MAC Speed");
		robotics.addChild(macspeed);
		macspeed.addBranch(robotics, 'right', 0.5, macspeed, 'top', .5);
		//Mac EMP Upgrade Node
		macemp = new treeNode(mainWindow, "macemp", 5.5,6.0, 10, "MAC EMP");
		robotics.addChild(macemp);
		macemp.addBranch(robotics, 'right', 0.5, macemp, 'top', .5);
		//Second Command Station Node
		comm2 = new treeNode(mainWindow, "comm", 11.5,5.0, 15, "Command Station");
		comm.addChild(comm2);
		//comm2.addBranch(robotics, 'bottom', 0.5, arctech, 'left', .5);
		//Jetpack Upgrade Node
		jp = new treeNode(mainWindow, "jp", 9.5,6.0, 25, "Jetpack Research", 2);
		comm2.addChild(jp);
		proto.addChild(jp);
		jp.addBranch(proto, 'right', 0.5, jp, 'top', .5);
		jp.addBranch(comm2, 'left', 0.5, jp, 'top', .5);
		//Exo Suit Upgrade Node
		exo = new treeNode(mainWindow, "exo", 10.5,6.0, 30, "Exo Suit Research", 2);
		comm2.addChild(exo);
		proto.addChild(exo);
		exo.addBranch(proto, 'right', 0.5, exo, 'top', .5);
		exo.addBranch(comm2, 'left', 0.5, exo, 'top', .5);
		//Dual Exo Suit Upgrade Node
		dualexo = new treeNode(mainWindow, "dualexo", 11.5,6.0, 20, "Dual Minigun Research");
		exo.addChild(dualexo);
		dualexo.addBranch(exo, 'right', 0.5, dualexo, 'left', .5);

		comm.setOn(true);
	}
}