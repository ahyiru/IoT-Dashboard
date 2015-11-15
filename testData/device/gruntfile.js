module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      jade: {
        //监听指定jade变更的文件
        files: ['page/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['./*.js'],
        // tasks: ['jshint'],
        options: { //文件改动重新启动这个服务
          livereload: true
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'test.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['./'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3001
          },
          cwd: __dirname
        }
      }
    },

    //执行多个任务
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')

  grunt.option('force', true)

  grunt.registerTask('default', ['concurrent'])

}