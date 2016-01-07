module.exports = function(grunt) {
    // Configuramos Grunt
    grunt.initConfig({
        less: {
            main: {
                files: {
                    "src/styles/smurfdad.css": "src/less/smurfdad.less",
                    "src/styles/colored-panel.css": "src/less/colored-panel.less"
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require("autoprefixer")() // add vendor prefixes
                    //require('cssnano')() // minify the result
                ]
            },
            main: {
                src: "src/styles/*.css"
            }
        },
        clean: ["dist/*"],
        copy:{
            html: {
                expand: true,
                src: ["**/*.html","CNAME","favicon.ico"],
                cwd: 'src/',
                dest: 'dist/',
            },
            styles: {
                expand: true,
                src: '**/*.css',
                cwd: 'src/',
                dest: 'dist/',
            },
            fonts: {
                expand: true,
                src: 'fonts/*.*',
                cwd: 'bower_components/bootstrap',
                dest: 'dist/',
            },
            images: {
                expand: true,
                src: 'images/*.*',
                cwd: 'src/',
                dest: 'dist/',
            },
            libs: {
                expand: true,
                src: 'libs/*.js',
                cwd: 'src/',
                dest: 'dist/',
            }
        },
        //Configuracion del observador de cambios y desencadenamiento de tareas
        watch: {
            options: {
                spawn: true
            },
            descriptor:{
                files: ["package.json"],
                tasks: ["sync"]
            },
            less: {
                files: ["src/less/*.less"],
                tasks: ["less", "postcss"]
            },
            css: {
                files: ["src/styles/**/*.css"],
                tasks: ["copy:styles"]
            },
            applicationjs: {
                files: ["src/scripts/**/*.js"],
                tasks: ["concat"]
            },
            html: {
                files: ["src/**/*.html"],
                tasks: ["copy:html"]
            },
            images: {
                files: ["src/images/**/*.*"],
                tasks: ["copy:images"]
            },
            libs: {
                files: ["src/libs/**/*.js"],
                tasks: ["copy:libs"]
            }
        },
        sync: {
            all: {
                options: {
                    // sync specific options
                    sync: ["author", "name", "version", "description"],
                    // optional: specify source and destination filenames
                    from: "package.json",
                    to: "bower.json"
                }
            }
        },
        versioner: {
            options: {
                bump: true,
                file: 'package.json',
                gitAdd: true,
                gitCommit: true,
                gitPush: true,
                gitTag: true,
                gitPushTag: true,
                gitDescribeOptions: '--tags --always --dirty=-d',
                tagPrefix: "",
                commitMessagePrefix: 'Versión: ',
                tagMessagePrefix: 'Versión: ',
                readmeText: 'Versión actual:',
                pushTo: 'origin',
                branch: 'master',
                npm: false,
                mode: 'production',
                configs: []
            },
            default: {
                files: {
                    './package.json': ['./package.json'],
                    './bower.json': ['./bower.json'],
                    './README.md': ['./README.md']
                }
            },
            patch: {
                options: {
                    file: './VERSION'
                },
                src: ['./package.json', './bower.json', './README.md']
            }
        }
    });

    // Cargar módulos de Grunt
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-npm2bower-sync');
    grunt.loadNpmTasks('grunt-versioner');

    // Definimos las tareas disponibles
    grunt.registerTask("default", ["sync","clean", "less", "postcss","copy:styles","copy:html","copy:images","copy:libs","copy:fonts","watch"]);
};