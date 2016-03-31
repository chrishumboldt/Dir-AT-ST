/**
 * File: index.js
 * Type: Javascript Node module
 * Author: Chris Humboldt
 */

var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

// Execute
module.exports = function($userOptions, $callback) {
	if (!$userOptions || !$userOptions.directory || !$callback) return false;

	var $options = {
		directory: path.join($userOptions.directory),
		find: $userOptions.find || 'all'
	};
	var $fileDirItems = [];
	var $reading = 0;

	// Functions
	var moonwalk = function($directory) {
		$reading++;
		fs.readdir($directory, function($error, $fileDir) {
			if ($error) return false;

			var $len = $fileDir.length;
			if ($len > 0) {
				for (var $i = 0; $i < $len; $i++) {
					walkContents(path.join($directory, $fileDir[$i]), (($len - 1) === $i) ? true : false);
				}
			} else {
				walkEmpty();
			}
		});
	};
	var walkContents = function($fileDirPath, $last) {
		fs.lstat($fileDirPath, function($error, $stat) {
			if ($error) return false;

			if ($stat.isDirectory()) {
				moonwalk($fileDirPath);
				if ($options.find !== 'files' && $fileDirItems.indexOf($fileDirPath) == -1) {
					$fileDirItems.push($fileDirPath);
				}
			} else {
				if ($options.find !== 'directories') {
					if (!$stat.isSymbolicLink() && $fileDirItems.indexOf($fileDirPath) == -1) {
						$fileDirItems.push($fileDirPath);
					}
				}
			}

			if ($last === true) {
				if (!--$reading) {
					$callback($fileDirItems);
				}
			}
		});
	};
	var walkEmpty = function() {
		if (!--$reading) {
			$callback($fileDirItems);
		}
	};

	// Start walking
	fs.stat($options.directory, function($error, $stat) {
		if ($error) {
			console.log('');
			console.log(chalk.red($error));
			console.log('');
			return false;
		};

		moonwalk($options.directory);
	});
};