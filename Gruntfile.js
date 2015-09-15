"use strict";

module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
			files: ['Gruntfile.js', 'js/**/*.js', 'js/*.js'],
			options: {
		        globalstrict: true,
		        globals : {
		        	angular : true,
		        	app : true,
		        	module : true,
		        	sessionStorage : true,
		        	$ : true,
		        	$sce:true,
		        	console : true,
		        	FormData : true,
		        	document : true,
		        	window : true
		        }
		    },
		},

		less: {
			style: {
				files: {
					"css/base.css": "less/app.less"
				}
			}
		},

		watch: {
			options: {
		      livereload: true,
		    },
			css: {
				files: ['less/*.less', 'css/*.css'],
				tasks: ['less']
			},
			scripts: {
			    files: ['js/*.js', 'js/**/*.js'],
			    tasks: ['default']
			 }
		}

	});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-jshint');


grunt.registerTask('default', ['jshint', 'less']);

};