


(function( $ ) {

cool_color_ramp = [[0.00000,   0.00000,   0.50000],
   [0.00000,   0.00000,   0.56349],
   [0.00000,   0.00000,   0.62698],
   [0.00000,   0.00000,   0.69048],
   [0.00000,   0.00000,   0.75397],
   [0.00000,   0.00000,   0.81746],
   [0.00000,   0.00000,   0.88095],
   [0.00000,   0.00000,   0.94444],
   [0.00000,   0.00794,   1.00000],
   [0.00000,   0.07143,   1.00000],
   [0.00000,   0.13492,   1.00000],
   [0.00000,   0.19841,   1.00000],
   [0.00000,   0.26190,   1.00000],
   [0.00000,   0.32540,   1.00000],
   [0.00000,   0.38889,   1.00000],
   [0.00000,   0.45238,   1.00000],
   [0.00000,   0.51587,   1.00000],
   [0.00000,   0.57937,   1.00000],
   [0.00000,   0.64286,   1.00000],
   [0.00000,   0.70635,   1.00000],
   [0.00000,   0.76984,   1.00000],
   [0.00000,   0.83333,   1.00000],
   [0.00000,   0.89683,   1.00000],
   [0.00000,   0.96032,   1.00000],
   [0.02381,   1.00000,   0.97619],
   [0.08730,   1.00000,   0.91270],
   [0.15079,   1.00000,   0.84921],
   [0.21429,   1.00000,   0.78571],
   [0.27778,   1.00000,   0.72222],
   [0.34127,   1.00000,   0.65873],
   [0.40476,   1.00000,   0.59524],
   [0.46825,   1.00000,   0.53175],
   [0.53175,   1.00000,   0.46825],
   [0.59524,   1.00000,   0.40476],
   [0.65873,   1.00000,   0.34127],
   [0.72222,   1.00000,   0.27778],
   [0.78571,   1.00000,   0.21429],
   [0.84921,   1.00000,   0.15079],
   [0.91270,   1.00000,   0.08730],
   [0.97619,   1.00000,   0.02381],
   [1.00000,   0.96032,   0.00000],
   [1.00000,   0.89683,   0.00000],
   [1.00000,   0.83333,   0.00000],
   [1.00000,   0.76984,   0.00000],
   [1.00000,   0.70635,   0.00000],
   [1.00000,   0.64286,   0.00000],
   [1.00000,   0.57937,   0.00000],
   [1.00000,   0.51587,   0.00000],
   [1.00000,   0.45238,   0.00000],
   [1.00000,   0.38889,   0.00000],
   [1.00000,   0.32540,   0.00000],
   [1.00000,   0.26190,   0.00000],
   [1.00000,   0.19841,   0.00000],
   [1.00000,   0.13492,   0.00000],
   [1.00000,   0.07143,   0.00000],
   [1.00000,   0.00794,   0.00000],
   [0.94444,   0.00000,   0.00000],
   [0.88095,   0.00000,   0.00000],
   [0.81746,   0.00000,   0.00000],
   [0.75397,   0.00000,   0.00000],
   [0.69048,   0.00000,   0.00000],
   [0.62698,   0.00000,   0.00000],
   [0.56349,   0.00000,   0.00000],
   [0.50000,   0.00000,   0.00000]];

function sizeOfObject(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function colorRamp(value, colormap)
{
    if(value > 1)
    {
        value = 1;
    }
    if(value < 0)
    {
        value = 0;
    }
    var maxval = colormap.length-1;
    var newval = value*maxval;
    var highval = Math.ceil(newval);
    var lowval = highval - 1;
    if(highval == 0)
    {
        lowval = 0;
        highval = 1;
    }

    newcolor = { };

    newcolor.r = colormap[lowval][0]*(highval - newval) + colormap[highval][0]*(newval - lowval);
    newcolor.g = colormap[lowval][1]*(highval - newval) + colormap[highval][1]*(newval - lowval);
    newcolor.b = colormap[lowval][2]*(highval - newval) + colormap[highval][2]*(newval - lowval);

    return [newcolor.r, newcolor.g, newcolor.b];
}

function interp2(x1, y1, x2, y2, z0, z1, z2, z3, x, y)
{
    fr1 = (x-x1)/(x2-x1)*z1 + (x2-x)/(x2-x1)*z0;
    fr2 = (x-x1)/(x2-x1)*z3 + (x2-x)/(x2-x1)*z2;
    return ((y-y1)/(y2-y1)*fr2 + (y2-y)/(y2-y1)*fr1);
}

function parseDataFromElement(element)
{
	var thisdataz = $(element).children('.zdata_3d').text().split(',');
	var thisdatax = $(element).children('.xdata_3d').eq(0).text().split(',');
	var thisdatay = $(element).children('.ydata_3d').eq(0).text().split(',');
	var thisdataerr = $(element).children('.stdevs_3d').eq(0).text().split(',');
	var i;
	for(i=0; i < thisdatax.length; ++i)
	{
		thisdatax[i] = parseFloat(thisdatax[i]);
	}
	for(i=0; i < thisdatay.length; ++i)
	{
		thisdatay[i] = parseFloat(thisdatay[i]);
	}
	for(i=0; i < thisdataz.length; ++i)
	{
		thisdataz[i] = parseFloat(thisdataz[i]);		
	}
	for(i=0; i < thisdataerr.length; i++)
	{
		thisdataerr[i] = parseFloat(thisdataerr[i]);
	}
	return [thisdatax, thisdatay, thisdataz, thisdataerr];
}

ko3d_methods = {
	'init'		: function(options) {
	return this.each(function() {
  	var settings = {
		'xAxisLabel'	: 'x',
		'yAxisLabel'	: 'y',
		'zAxisLabel'	: 'z',
		'xAxisDims'	: [0, 1],
		'yAxisDims'	: [0, 1],
		'zAxisDims'	: [0, 1],
		'interactive'	: true,
		'grid'		: false,
		'lines'		: false,
		'cameraTheta'	: -Math.PI/4,
		'cameraPhi'	: 5*Math.PI/8,
		'cameraMinPhi'	: 0.00001,
		'cameraMaxPhi'	: Math.PI,
		'interpolate'	: false,
		'xInterpPoints'	: 30,
		'yInterpPoints'	: 30,
		'labelColor'	: '#000000',
		'labelFont'	: '22pt arial',
		'axisColor'	: 0x000000,
		'axisOpacity'	: 1,
		'axisWidth'	: 1,
		'gridColor'	: 0x000000,
		'gridOpacity'	: 1,
		'gridWidth'	: 1,
		'lineColor'	: 0x000000,
		'lineOpacity'	: 1,
		'lineWidth'	: 1,
		'errColor'	: 0x000000,
		'errOpacity'	: 1,
		'errWidth'	: 1,
		'colorRamp'	: cool_color_ramp,
		'surfOpacity'	: 1,
		'autoRender'	: true
		
	};
		if(options) {
			$.extend(settings, options);
		}

		var $this = $(this),
		    preset = $this.data('ko3d_data');
		if(!preset)
		{
			//First setup
			var objects = {};
			var origin = new THREE.Vertex(new THREE.Vector3(0,0,0));
			var WIDTH = $this.width(),
			    HEIGHT = $this.height(),
			    ASPECT = WIDTH/HEIGHT;

			$this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {return false});

			//Set up renderer, camera, and scene
			var renderer = new THREE.CanvasRenderer();
			var camera = new THREE.OrthoCamera( -75, 75, 75, -75, - 2000, 1000 );

			var scene = new THREE.Scene();
			camera.up.y = 0;
			camera.up.z = 1;
			camera.position.x = 250*Math.cos(settings.cameraTheta)*Math.sin(settings.cameraPhi);
			camera.position.y = 250*Math.sin(settings.cameraTheta)*Math.sin(settings.cameraPhi);
			camera.position.z = -250*Math.cos(settings.cameraPhi);
			renderer.setSize(WIDTH, HEIGHT);

			objects.renderer = renderer;
			objects.camera = camera;
			objects.scene = scene;

			plot_obj = new THREE.Object3D();
			plot_obj.rotation.z = -Math.PI/2;
			plot_obj.scale.x = -1;
			plot_obj.position.x = -50;
			plot_obj.position.z = -50;
			plot_obj.position.y = -50;
			scene.addChild(plot_obj);
			objects.plot_obj = plot_obj;

			//Set up materials
			plotMat = new THREE.MeshFaceMaterial();
			var axisMat = new THREE.LineBasicMaterial(
			    {
				color:settings.axisColor,
				opacity:settings.axisOpacity,
				linewidth:settings.axisWidth
			    }
			);
			var lineMat = new THREE.LineBasicMaterial(
			    {
				color:settings.lineColor,
				opacity:settings.lineOpacity,
				linewidth:settings.lineWidth
			    }
			);
			var errMat = new THREE.LineBasicMaterial(
			    {
				color:settings.errColor,
				opacity:settings.errOpacity,
				linewidth:settings.errWidth
			    }
			);
			var gridMat = new THREE.LineBasicMaterial(
			    {
				color:settings.gridColor,
				opacity:settings.gridOpacity,
				linewidth:settings.gridWidth
			    }
			);
			objects.axisMat = axisMat;
			objects.lineMat = lineMat;
			objects.errMat = errMat;
			objects.gridMat = gridMat;
			objects.plotMat = plotMat;


			//Axis labels
			var x = document.createElement("canvas");
			var xc = x.getContext("2d");
			x.width = 400;
			x.height = 40;
			xc.fillStyle = settings.labelColor;
			xc.font = settings.labelFont;
			xc.textBaseline = "top";
			xc.fillText(settings.xAxisLabel, 10, 0);

			var xm = new THREE.MeshBasicMaterial({
			map: new THREE.Texture(x)
			});
			xm.map.needsUpdate = true;

			var xaxislabel = new THREE.Mesh(new THREE.PlaneGeometry(400, 40, 2, 2), xm);
			xaxislabel.position.x = -50;
			xaxislabel.position.y = 0;
			xaxislabel.position.z = -48;
			xaxislabel.scale.x = 0.2;
			xaxislabel.scale.y = -0.2;
			xaxislabel.rotation.x = -Math.PI/2;
			xaxislabel.rotation.y = -Math.PI/2;
			xaxislabel.doubleSided = true;

			var x = document.createElement("canvas");
			var xc = x.getContext("2d");
			x.width = 400;
			x.height = 40;
			xc.fillStyle = settings.labelColor;
			xc.font = settings.labelFont;
			xc.textBaseline = "top";
			xc.fillText(settings.yAxisLabel, 10, 0);

			var xm = new THREE.MeshBasicMaterial({
			map: new THREE.Texture(x)
			});
			xm.map.needsUpdate = true;

			var yaxislabel = new THREE.Mesh(new THREE.PlaneGeometry(400, 40, 2, 2), xm);
			yaxislabel.position.x = 0;
			yaxislabel.position.y = -50;
			yaxislabel.position.z = -48;
			yaxislabel.scale.x = 0.2;
			yaxislabel.scale.y = -0.2;
			yaxislabel.rotation.x = -Math.PI/2;
			yaxislabel.doubleSided = true;

			var x = document.createElement("canvas");
			var xc = x.getContext("2d");
			x.width = 400;
			x.height = 40;
			xc.fillStyle = settings.labelColor;
			xc.font = settings.labelFont;
			xc.textBaseline = "top";
			xc.fillText(settings.zAxisLabel, 10, 0);

			var xm = new THREE.MeshBasicMaterial({
			map: new THREE.Texture(x)
			});
			xm.map.needsUpdate = true;
			var zaxislabelOrigin = new THREE.Object3D();
			var zaxislabel = new THREE.Mesh(new THREE.PlaneGeometry(400, 40, 2, 2), xm);
			zaxislabelOrigin.position.x = -50;
			zaxislabelOrigin.position.y = -50;
			zaxislabel.position.y = 15;
			zaxislabelOrigin.position.z = 0;
			zaxislabelOrigin.rotation.x = -Math.PI/2;
			zaxislabelOrigin.rotation.y = -Math.PI/2;
			zaxislabelOrigin.rotation.z = -Math.PI/2;
			zaxislabelOrigin.scale.x = 0.2;
			zaxislabelOrigin.scale.y = -0.2;

			zaxislabel.doubleSided = true;
			zaxislabelOrigin.updateMatrix();

			scene.addChild(xaxislabel);
			scene.addChild(yaxislabel);
			scene.addChild(zaxislabelOrigin);
			zaxislabelOrigin.addChild(zaxislabel);
			
			objects.xaxislabel_obj = xaxislabel;
			objects.yaxislabel_obj = yaxislabel;
			objects.zaxislabel_obj = zaxislabelOrigin;

			//Set up axes
			var axisgeom = new THREE.Geometry();
			axisgeom.vertices.push(origin);
			axisgeom.vertices.push(new THREE.Vertex(new THREE.Vector3(100,0,0)));
			axisgeom.vertices.push(new THREE.Vertex(new THREE.Vector3(98, 1, 0)));
			axisgeom.vertices.push(new THREE.Vertex(new THREE.Vector3(98, -1, 0)));
			axisgeom.vertices.push(new THREE.Vertex(new THREE.Vector3(100, 0, 0)));

			var xaxis = new THREE.Line(
				axisgeom,
				axisMat
				);

			var yaxis = new THREE.Line(
				axisgeom,
				axisMat
				);
			yaxis.rotation.z = 90*Math.PI/180;

			var zaxis = new THREE.Line(
				axisgeom,
				axisMat
				);

			zaxis.rotation.y = -90*Math.PI/180;


			zaxis.position.x = -50;
			zaxis.position.z = -50;
			zaxis.position.y = -50;

			xaxis.position.x = -50;
			xaxis.position.z = -50;
			xaxis.position.y = -50;

			yaxis.position.x = -50;
			yaxis.position.z = -50;
			yaxis.position.y = -50;

			scene.addChild(xaxis);
			scene.addChild(yaxis);
			scene.addChild(zaxis);

			objects.xaxis = xaxis;
			objects.yaxis = yaxis;
			objects.zaxis = zaxis;


			//Gridlines
			if(settings.grid)
			{
				var gridlinegeom = new THREE.Geometry();
				gridlinegeom.vertices.push(new THREE.Vertex(new THREE.Vector3(0,0,0)));
				gridlinegeom.vertices.push(new THREE.Vertex(new THREE.Vector3(100,0,0)));

				for(var i=1; i <= 5; i++)
				{
					var gridline = new THREE.Line(gridlinegeom, gridMat);
					gridline.position.y = i/5*100-50;
					gridline.position.x = -50;
					gridline.position.z = -50;
					scene.addChild(gridline);

	
	
					var gridline = new THREE.Line(gridlinegeom, gridMat);
					gridline.position.x = i/5*100-50;
					gridline.position.y = -50;
					gridline.position.z = -50;
					gridline.rotation.z = Math.PI/2;
					scene.addChild(gridline);
				}
			}


			yticklabels = [];
			xticklabels = [];
			for(var i=1; i <= 5; i++)
			{
			    var x = document.createElement("canvas");
			    var xc = x.getContext("2d");
			    x.width = 40;
			    x.height = 40;
			    xc.fillStyle = settings.labelColor;
			    xc.font = settings.labelFont;
			    xc.textBaseline = "top";
			    xc.fillText(i/5*settings.xAxisDims[1], 10, 0);

			    var xm = new THREE.MeshBasicMaterial({
			    map: new THREE.Texture(x)
			    });
			    xm.map.needsUpdate = true;
			    var xtick = new THREE.Mesh(new THREE.PlaneGeometry(13/ASPECT, 13, 2, 2), xm);
			    xtick.position.y = i/5*100-50;
			    xtick.position.x = -50;
			    xtick.position.z = -58;
			    xtick.rotation.x = Math.PI/2;
			    xtick.doubleSided = true;
			    xtick.updateMatrix();
			    scene.addChild(xtick);

			    var x = document.createElement("canvas");
			    var xc = x.getContext("2d");
			    x.width = 100;
			    x.height = 40;
			    xc.fillStyle = settings.labelColor;
			    xc.font = settings.labelFont;
			    xc.textBaseline = "top";
			    xc.fillText((i/5*settings.yAxisDims[1]).toFixed(3), 10, 0);

			    var xm = new THREE.MeshBasicMaterial({
			    map: new THREE.Texture(x)
			    });
			    xm.map.needsUpdate = true;
			    var ytick = new THREE.Mesh(new THREE.PlaneGeometry(26/ASPECT, 13, 2, 2), xm);
			    ytick.position.x = i/5*100-50;
			    ytick.position.y = -50;
			    ytick.position.z = -58;
			    ytick.rotation.x = Math.PI/2;
			    ytick.doubleSided = true;
			    ytick.updateMatrix();
			    scene.addChild(ytick);

			xticklabels.push(xtick);
			yticklabels.push(ytick);
			}
			objects.xticklabels = xticklabels;
			objects.yticklabels = yticklabels;
			objects.plotobjects = {};

			$this.append(renderer.domElement);

			$this.data('ko3d_data', {settings: settings, objects: objects});

			if(settings.element || settings.values)
			{
				$this.ko3d('add', options);
			} else {
				if(settings.autoRender)
				{
					renderer.render(scene, camera);
				}
			}
			if(settings.interactive) {
				$(document).bind('mouseup.ko3d', function(event){
					$(document).unbind('mousemove.ko3d');
				});
				$this.bind('mousedown.ko3d', function(event){
					var data = $(this).data('ko3d_data').objects;
					data.lastMouseX = event.pageX;
					data.lastMouseY = event.pageY;
					$(document).bind('mousemove.ko3d', {plotobj:this}, function(event)
					{
						var plotobj = event.data.plotobj;
						var data = $(plotobj).data('ko3d_data').objects;
						var settings = $(plotobj).data('ko3d_data').settings;
						settings.cameraTheta += (data.lastMouseX - event.pageX)/70
						settings.cameraPhi -= (data.lastMouseY - event.pageY)/70

						if(settings.cameraPhi < settings.cameraMinPhi)
						{
						settings.cameraPhi = settings.cameraMinPhi;
						}
						if(settings.cameraPhi > settings.cameraMaxPhi)
						{
						settings.cameraPhi = settings.cameraMaxPhi;
						}

						data.camera.position.x = 250*Math.cos(settings.cameraTheta)*Math.sin(settings.cameraPhi);
						data.camera.position.y = 250*Math.sin(settings.cameraTheta)*Math.sin(settings.cameraPhi);
						data.camera.position.z = -250*Math.cos(settings.cameraPhi);


						data.lastMouseX = event.pageX;
						data.lastMouseY = event.pageY;
						var zaxislabel = data.zaxislabel_obj;
						var xaxislabel = data.xaxislabel_obj;
						var yaxislabel = data.yaxislabel_obj;
						var xticklabels = data.xticklabels;
						var yticklabels = data.yticklabels;
						zaxislabel.rotation.y = Math.PI/2 - Math.atan2((-camera.position.y),(-camera.position.x));
						for(var i =0; i < yticklabels.length;i++)
						{
							yticklabels[i].rotation.y = -zaxislabel.rotation.y;
						}
						for(var i =0; i < xticklabels.length;i++)
						{
							xticklabels[i].rotation.y = -zaxislabel.rotation.y;
						}

						$(plotobj).data('ko3d_data', {settings: settings, objects: data});
						//renderer.clear();
						data.renderer.render(data.scene, data.camera);
					});
					return false;
				});
			}
		}
	});

		},
	'render'	: function() {
			return this.each(function() {
				var objects = $(this).data('ko3d_data').objects;
				objects.renderer.render(objects.scene, objects.camera);
			});
		},
	'update'	: function() {
		},
	'rotate'	: function() {
		},
	'add'		: function(options) {
	return this.each(function() {
		var values;
		if(options.element)
		{
			if(options.element.length == undefined)
			{
				values = parseDataFromElement(options.element);
			} else {
				var optsdup = $.extend({}, options);
				optsdup.autoRender = false;
				for(var i=0; i < options.element.length; ++i)
				{
					optsdup.element = options.element[i];
					$(this).ko3d('add', optsdup);
				}
				$(this).ko3d('render');
				return;
			}
		} else if(options.values)
		{
			values = options.values;
		}
		var data = $(this).data('ko3d_data');
		if(!data)
		{
			$(this).ko3d('init');
		}
		plotobjects = data.objects.plotobjects;

		if(!options.handle)
		{
			options.handle = 'plot' + sizeOfObject(plotobjects);
		}
		var obj = plotobjects[options.handle] = new THREE.Object3D();


		//Generate error bars

		for(var i=0; i < values[3].length; i++)
		{
			var errbargeom = new THREE.Geometry();
			errbargeom.vertices.push(new THREE.Vertex(new THREE.Vector3(
				values[0][i%values[0].length]/data.settings.xAxisDims[1]*100,
				values[1][Math.floor(i/values[0].length)]/data.settings.yAxisDims[1]*100,
				values[2][i]/data.settings.zAxisDims[1]*100-values[3][i]/data.settings.zAxisDims[1]*100
			)));
			errbargeom.vertices.push(new THREE.Vertex(new THREE.Vector3(
				values[0][i%values[0].length]/data.settings.xAxisDims[1]*100,
				values[1][Math.floor(i/values[0].length)]/data.settings.yAxisDims[1]*100,
				values[2][i]/data.settings.zAxisDims[1]*100+values[3][i]/data.settings.zAxisDims[1]*100
			)));
			var errbar = new THREE.Line(errbargeom, data.objects.errMat);
			obj.addChild(errbar);
		}


		//Generate mesh lines
		if(data.settings.lines)
		{
			for(i=0; i < values[0].length*(values[1].length-1); i++)
			{
				var linegeom = new THREE.Geometry();
				linegeom.vertices.push(new THREE.Vertex(new THREE.Vector3(
					values[0][i%values[0].length]/data.settings.xAxisDims[1]*100,
					values[1][Math.floor(i/values[0].length)]/data.settings.yAxisDims[1]*100,
					values[2][i]/data.settings.zAxisDims[1]*100
				)));
				linegeom.vertices.push(new THREE.Vertex(new THREE.Vector3(
					values[0][(i+values[0].length)%values[0].length]/data.settings.xAxisDims[1]*100,
					values[1][Math.floor((i+values[0].length)/values[0].length)]/data.settings.yAxisDims[1]*100,
					values[2][i+values[0].length]/data.settings.zAxisDims[1]*100
				)));
				obj.addChild(new THREE.Line(linegeom, data.objects.lineMat));
			}
			for(i=0; i < (values[0].length-1)*(values[1].length); i++)
			{
				var linegeom = new THREE.Geometry();
				linegeom.vertices.push(new THREE.Vertex(new THREE.Vector3(
					values[0][i%(values[0].length-1)]/data.settings.xAxisDims[1]*100,
					values[1][Math.floor(i/(values[0].length-1))]/data.settings.yAxisDims[1]*100,
					values[2][Math.floor(i/(values[0].length-1))+i]/data.settings.zAxisDims[1]*100
				)));
				linegeom.vertices.push(new THREE.Vertex(new THREE.Vector3(
					values[0][i%(values[0].length-1)+1]/data.settings.xAxisDims[1]*100,
					values[1][Math.floor(i/(values[0].length-1))]/data.settings.yAxisDims[1]*100,
					values[2][Math.floor(i/(values[0].length-1))+i+1]/data.settings.zAxisDims[1]*100
				)));
				obj.addChild(new THREE.Line(linegeom, data.objects.lineMat));
			}
		}


		//Generate plot surface

		if(data.settings.interpolate)
		{
			numxpoints = data.settings.xInterpPoints;
			numypoints = data.settings.yInterpPoints;
			var surf_geom = new THREE.PlaneGeometry(100,100,numxpoints-1, numypoints-1);
			for(i=0; i < numxpoints; ++i)
			{
				for(var j=0; j < numypoints; ++j)
				{
					var thisx = values[0][values[0].length-1]*i/(numxpoints-1);
					var thisy = values[1][values[1].length-1]*j/(numypoints-1);
					surf_geom.vertices[j*numxpoints+i].position.x = thisx/data.settings.xAxisDims[1]*100;
					surf_geom.vertices[j*numxpoints+i].position.y = thisy/data.settings.yAxisDims[1]*100;
					//Find flanking x,y values
					var kx = ky = 0;
					while(thisx >= values[0][kx]) { 
						kx=kx+1; 
					}
					while(thisy >= values[1][ky]) { 
						ky=ky+1; 
					}
					if(kx > values[0].length-1)
					{
						kx = values[0].length-1;
					}
					if(ky > values[1].length-1)
					{
						ky = values[1].length-1;
					}
					kx--;
					ky--;

					kx = parseInt(kx);
					ky = parseInt(ky);
					var tli = kx+ky*values[0].length;
					var tri = kx+ky*values[0].length+1;
					var bli = kx+(ky+1)*values[0].length;
					var bri = kx+1+(ky+1)*values[0].length;
					if(!values[2][bli] || !values[2][tli] || !values[2][tri] || !values[2][bri])
					{
						alert("Porblem!\nkx:" + kx + "\nky:" + ky + "\nkx is a "+typeof(kx) + "\nky is a" +typeof(ky) + "\nset:" + index);
					}
					thisz = interp2(values[0][kx], 
					values[1][ky], 
					values[0][kx+1], 
					values[1][ky+1], 
					values[2][tli],
					values[2][tri],
					values[2][bli],
					values[2][bri], thisx, thisy)
					surf_geom.vertices[j*numxpoints+i].position.z = thisz/data.settings.zAxisDims[1]*100;
				}
			}

			surf_geom.computeCentroids();

			var materials = [];

			for(i=0; i < surf_geom.faces.length; ++i)
			{
				thisfacecolor = (
					surf_geom.vertices[surf_geom.faces[i].a].position.z+
					surf_geom.vertices[surf_geom.faces[i].b].position.z+
					surf_geom.vertices[surf_geom.faces[i].c].position.z+
					surf_geom.vertices[surf_geom.faces[i].d].position.z)/4/100;
				materials.push([new THREE.MeshBasicMaterial(
					{
						color:thisfacecolor*0xffffff,
						opacity:data.settings.surfOpacity
					})]);
				var newcolor = colorRamp(thisfacecolor, data.settings.colorRamp);
				materials[i][0].color.setRGB(newcolor[0], newcolor[1], newcolor[2]);
				surf_geom.faces[i].materials = materials[i];
			}
			var surf_plot = new THREE.Mesh(surf_geom, data.objects.plotMat);
			surf_plot.doubleSided = true;
			obj.addChild(surf_plot);
			
		} else
		{
			var surf_geom = new THREE.PlaneGeometry(100,100,values[0].length-1, values[1].length-1);
			for(i=0; i < values[0].length; ++i)
			{
				for(var j=0; j < values[1].length; ++j)
				{
					var thisx = values[0][i];
					var thisy = values[1][j];
					var thisz = values[2][j*values[0].length+i];
					surf_geom.vertices[j*values[0].length+i].position.x = thisx/data.settings.xAxisDims[1]*100;
					surf_geom.vertices[j*values[0].length+i].position.y = thisy/data.settings.yAxisDims[1]*100;
					surf_geom.vertices[j*values[0].length+i].position.z = thisz/data.settings.zAxisDims[1]*100;
				}
			}

			surf_geom.computeCentroids();

			var materials = [];

			for(i=0; i < surf_geom.faces.length; ++i)
			{
				thisfacecolor = (
					surf_geom.vertices[surf_geom.faces[i].a].position.z+
					surf_geom.vertices[surf_geom.faces[i].b].position.z+
					surf_geom.vertices[surf_geom.faces[i].c].position.z+
					surf_geom.vertices[surf_geom.faces[i].d].position.z)/4/100;
				materials.push([new THREE.MeshBasicMaterial(
					{
						color:thisfacecolor*0xffffff,
						opacity:data.settings.surfOpacity
					})]);
				var newcolor = colorRamp(thisfacecolor, data.settings.colorRamp);
				materials[i][0].color.setRGB(newcolor[0], newcolor[1], newcolor[2]);
				surf_geom.faces[i].materials = materials[i];
			}
			var surf_plot = new THREE.Mesh(surf_geom, data.objects.plotMat);
			surf_plot.doubleSided = true;
			obj.addChild(surf_plot);
		}

		data.objects.plot_obj.addChild(obj);
		$(this).data('ko3d_data', data);
		if(data.settings.autoRender)
		{
			data.objects.renderer.render(data.objects.scene, data.objects.camera);
		}
	});

	
		},
	'remove'	: function() {
		},
	'hide'		: function() {
		},
	'show'		: function() {
		},
	'toggle'	: function() {
		}
};
  $.fn.ko3d = function(method) {
	if(ko3d_methods[method])
	{
		return ko3d_methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if(typeof method == 'object' || ! method)
	{
		return ko3d_methods.init.apply(this, arguments)
	} else {
		$.error('KO3D: Invalid method ' + method + '.');
	}
	

  };
})( jQuery );

