function techTree(form)
{
	var mainWindow = form;

	var animationTime = 200;
	var blockSize = 90;
	var gridWidth = $(window).width() * 0.5;
	var gridHeight = $(window).height() * 0.7;
	var BlockSize = 76;

	this.init = function()
	{
		comm = new treeNode(mainWindow, "comm", 0,0, 15);

		portal = new treeNode(mainWindow, "ip", 1,0.5, 15);
		comm.addChild(portal);
		portal.addBranch(comm, 'right', 0.25, portal, 'top', .5);

		extractor = new treeNode(mainWindow, "extractor", 2,0.5,10);
		comm.addChild(extractor);
		extractor.addBranch(comm, 'right', 0.25, extractor, 'top', .5);

		armory = new treeNode(mainWindow, "armory", 3,0.5, 10);
		comm.addChild(armory);
		armory.addBranch(comm, 'right', 0.25, armory, 'top', .5);

		observatory = new treeNode(mainWindow, "observatory", 1.5,1.5, 15);
		portal.addChild(observatory);
		observatory.addBranch(portal, 'bottom', 0.5, observatory, 'left', .5);

		phasetech = new treeNode(mainWindow, "temp", 2.5,2.5, 15);
		observatory.addChild(phasetech);
		phasetech.addBranch(observatory, 'bottom', 0.5, phasetech, 'left', .5);

		phasegate = new treeNode(mainWindow, "phase", 3.5,2.5, 15);
		phasetech.addChild(phasegate);
		phasegate.addBranch(phasetech, 'right', 0.5, phasegate, 'left', .5);

		scan = new treeNode(mainWindow, "scan", 2.5,4.5, 3);
		observatory.addChild(scan);
		scan.addBranch(observatory, 'bottom', 0.5, scan, 'left', .5);

		distress = new treeNode(mainWindow, "distress", 2.5,3.5, 10);
		observatory.addChild(distress);
		distress.addBranch(observatory, 'bottom', 0.5, distress, 'left', .5);

		advanced = new treeNode(mainWindow, "advanced", 4.5,1.5, 20);
		armory.addChild(advanced);
		advanced.addBranch(armory, 'right', 0.75, advanced, 'top', .5);

		grenade = new treeNode(mainWindow, "grenade", 5.5,2.5, 20);
		advanced.addChild(grenade);
		grenade.addBranch(advanced, 'bottom', 0.5, grenade, 'left', .5);

		flame = new treeNode(mainWindow, "flame", 5.5,3.5, 25);
		advanced.addChild(flame);
		flame.addBranch(advanced, 'bottom', 0.5, flame, 'left', .5);

		proto = new treeNode(mainWindow, "temp", 5.5,4.5, 40);
		advanced.addChild(proto);
		proto.addBranch(advanced, 'bottom', 0.5, proto, 'left', .5);

		robotics = new treeNode(mainWindow, "robotic", 6.5,1.5, 15);
		armory.addChild(robotics);
		robotics.addBranch(armory, 'right', 0.75, robotics, 'top', .5);

		mac = new treeNode(mainWindow, "mac", 7.5,2.5, 5);
		robotics.addChild(mac);
		mac.addBranch(robotics, 'bottom', 0.5, mac, 'left', .5);

		battery = new treeNode(mainWindow, "battery", 7.5,3.5, 10);
		robotics.addChild(battery);
		battery.addBranch(robotics, 'bottom', 0.5, battery, 'left', .5);

		turret = new treeNode(mainWindow, "turret", 8.5,3.5, 5);
		battery.addChild(turret);
		//turret.addBranch(robotics, 'bottom', 0.5, turret, 'left', .5);

		arctech = new treeNode(mainWindow, "temp", 7.5,4.5, 10);
		robotics.addChild(arctech);
		arctech.addBranch(robotics, 'bottom', 0.5, arctech, 'left', .5);

		arc = new treeNode(mainWindow, "temp", 8.5,4.5, 15);
		arctech.addChild(arc);

		lab = new treeNode(mainWindow, "lab", 7.5,1.5, 20);
		armory.addChild(lab);
		lab.addBranch(armory, 'right', 0.75, lab, 'top', .5);

		weap1 = new treeNode(mainWindow, "weap1", 9.0,1.0, 15);
		lab.addChild(weap1);

		weap2 = new treeNode(mainWindow, "weap2", 10.0,1.0, 25);
		weap1.addChild(weap2);

		weap3 = new treeNode(mainWindow, "weap3", 11.0,1.0, 35);
		weap2.addChild(weap3);

		armor1 = new treeNode(mainWindow, "armor1", 9.0,2.0, 15);
		lab.addChild(armor1);

		armor2 = new treeNode(mainWindow, "temp", 10.0,2.0, 25);
		armor1.addChild(armor2);

		armor3 = new treeNode(mainWindow, "temp", 11.0,2.0, 35);
		armor2.addChild(armor3);

		shotgun = new treeNode(mainWindow, "shotgun", 4.0,0.0, 20);
		armory.addChild(shotgun);
		shotgun.addBranch(armory, 'right', 0.75, shotgun, 'bottom', .5);

		welder = new treeNode(mainWindow, "welder", 5.0,0.0, 10);
		armory.addChild(welder);
		welder.addBranch(armory, 'right', 0.75, welder, 'bottom', .5);

		mines = new treeNode(mainWindow, "mines", 6.0,0.0, 15);
		armory.addChild(mines);
		mines.addBranch(armory, 'right', 0.75, mines, 'bottom', .5);

		comm.setOn(true);
	}
}