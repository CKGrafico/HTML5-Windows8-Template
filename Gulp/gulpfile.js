var gulp = require('gulp');
var plugins = require("gulp-load-plugins")();

var files = {
	css: './css/*.css',
	index: './default.html',
	js: './js-dev/**/*.js',
	scss: './scss/*.scss',
	templates: './templates/*.hbs',
};

var paths = {
	css: './css',
	js: './js-dev/',
	jsMin: './js/min'
};

var regex = {
	jsMin: /(js\\\*\*\\\*.js)/g,
	js: /(js-dev\\\*\*\\\*.js)/g,
	inject: /(<!-- inject:js -->)[\s\S]*(<!-- endinject -->)/g, // TODO improve this
	once: /(<!-- delete -->)[\s\S]*(<!-- deleteend -->)/g
};

var regexFiles = {
	js: 'js-dev\\**\\*.js',
	jsMin: 'js\\**\\*.js',
	alljs: '<!-- inject:js -->\n<script src="js/min/all.min.js"></script>\n<!-- endinject -->'  // TODO improve this
};

// Compile Sass
gulp.task('sass', function(){
	gulp.src(files.scss)
		.pipe(plugins.sass())
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest(paths.css));
});

// Handlebars remplates
gulp.task('handlebars', function(){
	gulp.src([files.templates])
		.pipe(plugins.handlebars())
		.pipe(plugins.declare({
		namespace: 'Handlebars.templates'
	}))
	.pipe(plugins.concat('templates.js'))
	.pipe(gulp.dest(paths.js));
});

// Inject JS & CSS Files
gulp.task('inject', function() {
	gulp.src([files.js, files.css], {read: false})
		.pipe(plugins.inject(files.index))
		.pipe(gulp.dest('./'));
});

// Concat JS
gulp.task('concat', function() {
	gulp.src(files.js)
		.pipe(plugins.concat('all.min.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.jsMin));
});

// Change jsproj from build to debug
gulp.task('replace-debug', function(){
	gulp.src(['./*.jsproj'])
		.pipe(plugins.replace(regex.jsMin, regexFiles.js))
		.pipe(plugins.replace(regex.once, ''))
		.pipe(gulp.dest('./'));
});

// Change jsproj from debug to build and build html
gulp.task('replace-build', function(){
	gulp.src(['./*.jsproj'])
		.pipe(plugins.replace(regex.js, regexFiles.jsMin))
		.pipe(plugins.replace(regex.once, ''))
		.pipe(gulp.dest('./'));

	gulp.src([files.index])
		.pipe(plugins.replace(regex.inject, regexFiles.alljs))
		.pipe(gulp.dest('./'));
});

// Init watch
gulp.task('watch', function () {
	gulp.watch(files.js, ['inject', 'replace-debug']);
	gulp.watch(files.scss, ['sass']);
	gulp.watch(files.templates, ['handlebars']);
});

gulp.task('default', ['sass', 'handlebars', 'inject', 'replace-debug']);
gulp.task('build', ['concat','replace-build']);