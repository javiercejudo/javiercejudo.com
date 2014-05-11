<?php

header('Content-Type: text/html; charset=utf-8');

define('ENV', (getenv('ENV') !== false) ? getenv('ENV') : 'live');

$buildMapFile = file_get_contents('rev-manifest.json');
$buildMap     = json_decode($buildMapFile, true);

/**
 * @param string $name Name of build file without extension
 * @param string $ext  Extension of the build file
 *
 * @return mixed
 */
$build = function ($name, $ext) {
    return 'build/' . $GLOBALS["buildMap"]["$name.$ext"];
};

$almaArray = array(
    'angular' => 'data-ng-app="JcApp" data-ng-controller="AppCtrl"',
    'lang'    => 'lang="en"'
);

if (ENV === 'live') {
    $almaArray['manifest'] = 'manifest="manifest.appcache"';
}

$alma = implode(' ', $almaArray);
