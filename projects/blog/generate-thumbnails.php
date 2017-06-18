<?php
require_once __DIR__ . '/vendor/autoload.php';

use Intervention\Image\ImageManagerStatic as Image;

$uploadsDir = __DIR__ . '/uploads';

$directory = new RecursiveDirectoryIterator($uploadsDir);
$iterator  = new RecursiveIteratorIterator($directory);
$regex     = new RegexIterator($iterator, '/^.+\.png$/i', RecursiveRegexIterator::GET_MATCH);

$i = 0;
foreach ($regex as $path => $info) {
    $resizedPath = dirname($path) . '/' . basename($path, '.png') . '.med' . '.png';

    if (preg_match('/\.med\.png/', $path) != false || file_exists($resizedPath)) {
        continue;
    }

    if(preg_match('/2017/', $path) == false) {
        // Only process 2017 uploads
        continue;
    }

    // open an image file
    $img = Image::make($path);

    $img->resize(300, null, function ($constraint) {
        $constraint->aspectRatio();
    });

    // finally we save the image as a new file
    $img->save($resizedPath);

    $i++;
}
echo "Made $i images" . PHP_EOL;
