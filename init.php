<?php

header('Content-Type: text/html; charset=utf-8');

define('ENV', (getenv('ENV') !== false) ? getenv('ENV') : 'live');

/**
 * @param string $name Name of build file without extension
 * @param string $ext  Extension of the build file
 *
 * @return mixed
 */
$build = function ($name, $ext) {
    $matchingFiles = glob("build/" . $name . "-*." . $ext);

    return reset($matchingFiles);
};

$almaArray = array(
    'angular' => 'data-ng-app="JcApp" data-ng-controller="AppCtrl"',
    'lang'    => 'lang="en"'
);

if (ENV === 'live') {
    $almaArray['manifest'] = 'manifest="manifest.appcache"';
}

$alma = implode(' ', $almaArray);
