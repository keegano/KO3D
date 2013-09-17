KO3D
====

Introduction
------------

This is the (poorly-named) open-source 3D plotting library for javascript
developed by the 2011 UC Davis iGEM team. This tool is intended to provide
an easy-to-use, interactive, attractive plotting solution for scientists 
who wish to publish their data onto the web. This project, although more than
2 years old at the time of writing, is still in its infancy. Basic 3D plots
are supported, but there are a lot of features that we would like to add in
the future. If you're feeling adventurous, feel free to drop me a line at
keegano@gmail.com, or clone the repository and get hacking!

For now, KO3D expects your data as a comma-separated list embedded on a
webpage. Although this isn't the best format for long-term data storage, it
does mean that you can quickly put together a plot by pasting data directly
into a webpage.

Setup
-----

To use KO3D, simply place the ko3d.js file somewhere your webpage can reach,
and include it with the following:

    <script src='ko3d.js'/>

KO3D requires jquery and a working copy of Three.js as well. It is generally
recommended to obtain jquery via a Content Delivery Network (CDN), as the
user often already has a copy - this saves on bandwidth and improves load
times. For convenience, a copy of Three.js is included in this repository;
however, it is probably very out-of-date and it is recommended that you
download a newer version.

A header that includes KO3D and its dependencies might look something like
this:

    <head>
    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="Three.js"></script>
    <script src="ko3d.js"></script>
    </head>


Usage
-----

Once KO3D is setup, you have to add some data to be rendered. At present,
there are two ways to get data into KO3D: with javascript directly, or with
comma-separated data in specially-named span tags embedded in a document. The
former is the "ideal" way to create a plot; the latter is often easier for
those who are uncomfortable writing javascript. In the future, we'd like to
add loaders for CSV and JSON files.

To create a plot, create a div element with a preset width and height. This
is important; failure to set these values results in a plot with dimensions
0x0, which is very, very hard to see. Then, use a simply jquery call to set
up the plot after the document is loaded. Here is a complete example:

    <html>
    <head>
    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="Three.js"></script>
    <script src="ko3d.js"></script>
    <script>
    $(document).ready(function() {
        x_axis = [0, 1, 2, 3, 4];
        y_axis = [0, 1, 2, 3, 4];
        z_data = [0, .1, .2, .3, .4,
                  .1, .2, .3, .4, .5,
                  .2, .3, .4, .5, .6,
                  .3, .4, .5, .6, .7,
                  .4, .5, .6, .7, .8];
        errors = [.1, .1, .1, .1, .1,
                  .1, .1, .1, .1, .1,
                  .1, .1, .1, .1, .1,
                  .1, .1, .1, .1, .1,
                  .1, .1, .1, .1, .1];
        $('#plot').ko3d({
            values: [x_axis, y_axis, z_data, errors]
        });

    });
    </script>
    <style>
    #plot {
        width:400px;
        height:400px;
    }
    </style>
    </head>
    <body>
    <div id='plot'></div>
    </body>
    </html>

For an example on how to load data directly into a page, see ko3d_test.html.

Advanced Usage
--------------

There are a number of ways to customize your plots. In the future, this documentation
will include detailed descriptions of each of these parameters; for now, however, here
is a list of each parameter and its default value.

	'xAxisLabel'	: '',
	'yAxisLabel'	: '',
	'zAxisLabel'	: '',
	'xAxisDims'	: [0, 0],
	'yAxisDims'	: [0, 0],
	'zAxisDims'	: [0, 0],
	'autoScaleAxes'	: true,
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
	'autoRender'	: true,
	'webGL'		: false
