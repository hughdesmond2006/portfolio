module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'public/stylesheets/style.css': 'public/stylesheets/style.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 8 versions', '> 1%']
            },
            dist: {
                files: {
                    'public/stylesheets/style.css': 'public/stylesheets/style.css'
                }
            }
        },
        concat: {
            // 2. Configuration for concatinating files goes here.
            js: {
                src: [
                    "node_modules/aos/dist/aos.js",
                    "node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js",
                    "node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js",
                    "node_modules/gsap/src/minified/TweenMax.min.js",
                    "node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js",
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/gsap/src/minified/plugins/BezierPlugin.min.js"
                ],
                dest: 'public/javascripts/concat.js',
            },
            css: {
                src: [
                    "node_modules/aos/dist/aos.css",
                    "public/stylesheets/style.css"
                ],
                dest: 'public/stylesheets/concat.css'
            }
        },
        uglify: {
            js: {
                src: 'public/javascripts/concat.js',
                dest: 'public/javascripts/concat.min.js'
            }
        },
        cssmin: {
            css:{
                src: 'public/stylesheets/concat.css',
                dest: 'public/stylesheets/concat.min.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/images/',
                    src: ['*.{png,jpg,gif,svg}'],
                    dest: 'public/images/build/'
                }]
            }
        },
        watch: {
            css: {
                files: ['public/stylesheets/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: [
                    "node_modules/aos/dist/aos.js",
                    "node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js",
                    "node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js",
                    "node_modules/gsap/src/minified/TweenMax.min.js",
                    "node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js",
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/gsap/src/minified/plugins/BezierPlugin.min.js"
                ],
                tasks: ['concat:js', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass','autoprefixer', 'concat', 'uglify', 'cssmin', 'imagemin']);
};