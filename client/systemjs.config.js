var isPublic = typeof window != "undefined";

(function (global) {
	// map tells the System loader where to look for things
	var map = {
		'app': 'app', // 'dist',
		'@angular': (isPublic) ? '@angular' : 'node_modules/@angular',
		'lodash': 'http://localhost:8080/libs/lodash/lodash.min.js',
		'primeng': 'http://localhost:8080/libs/primeng/',
		'rxjs': (isPublic) ? 'rxjs' : 'node_modules/rxjs'
	};
	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app': { main: 'main.js', defaultExtension: 'js' },
		'rxjs': { defaultExtension: 'js' },
		'lodash': { defaultExtension: 'js' },
		'primeng': { defaultExtension: 'js' }
	};
	var ngPackageNames = [
		'animations',
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'platform-server',
		'router',
		'upgrade'
	];
	// Individual files (~300 requests):
	function packIndex(pkgName) {
		packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
	}

	// Bundled (~40 requests):
	function packUmd(pkgName) {
		packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
	}

	// Most environments should use UMD; some (Karma) need the individual index files
	var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
	// Add package entries for angular packages
	ngPackageNames.forEach(setPackageConfig);
	var config = {
		map: map,
		packages: packages
	};
	System.config(config);
})(this);