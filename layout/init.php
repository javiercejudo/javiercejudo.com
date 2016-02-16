<?php

header('Content-Type: text/html; charset=utf-8');

define('ENV', getenv('ENV'));

$buildMapFile = file_get_contents('rev-manifest.json');
$buildMap     = json_decode($buildMapFile, true);

/**
 * @param string $name Name of build file without extension
 * @param string $ext  Extension of the build file
 *
 * @return mixed
 */
$build = function ($name, $ext) {
    return getenv('ASSETS_URL') . '/' . $GLOBALS["buildMap"]["$name.$ext"];
};

$almaArray = [
    'data-ng-app="JcApp" data-ng-controller="AppCtrl" data-ng-strict-di',
    'lang="en"'
];

if (isset($_GET['offline'])) {
    $almaArray[] = 'manifest="manifest.appcache"';
}

$alma = implode(' ', $almaArray);
