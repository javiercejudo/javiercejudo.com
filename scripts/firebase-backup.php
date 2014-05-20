<?php

date_default_timezone_set('Australia/Sydney');

require 'vendor/autoload.php';

use Aws\S3\S3Client;

// download Firebase export and store it locally
$firebaseExport = 'https://c3jud0.firebaseio.com/.json?format=export';
$localBackup = __DIR__ . '/../data/min/c3jud0-export.json';
$result = file_put_contents($localBackup, file_get_contents($firebaseExport));

// if the local file is not created, something went wrong and we can stop
if (false === $result) {
    exit("There was an error saving the local copy.");
}

$s3Client = S3Client::factory(array(
    'key'    => getenv('S3_KEY'),
    'secret' => getenv('S3_SECRET')
));

// upload export to S3
// (the file size, file type, and MD5 hash are automatically calculated by the SDK)
try {
    $s3Client->putObject(array(
        'Bucket' => 'jc-firebase',
        'Key'    => date('c', time()) . '.json',
        'Body'   => fopen($localBackup, 'r'),
        'ACL'    => 'public-read',
    ));
} catch (Exception $e) {
    echo "There was an error uploading the file." . PHP_EOL;
}
