<?php
$baseDir = __DIR__;

/**
 * Check if server is up
 */

if (strlen(file_get_contents('https://javascript-minifier.com')) < 400) {
    echo 'Site is down';
    exit;
}

/**
 * Minify JS
 */
function minJS($input, $output)
{
    $url  = 'https://javascript-minifier.com/raw';
    $js   = file_get_contents($input);
    $data = array(
        'input' => $js,
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $minified = curl_exec($ch);

    curl_close($ch);

    /**
     * Add license at beginning
     */
    $licenseHeader = <<<PLAIN
/*!
 * CryptoDonate <https://subinsb.com/cryptodonate>
 * Copyright Subin Siby
 * Released under the MIT license <https://goo.gl/aPHGJm>
 */
PLAIN;

    $minifiedJS = $licenseHeader . PHP_EOL . $minified;
    file_put_contents($output, $minifiedJS);
}

$jsFiles = array('cryptodonate.js', 'widget.js');

foreach ($jsFiles as $jsFile) {
    minJS($baseDir . '/' . $jsFile, $baseDir . '/' . $jsFile);

    echo 'Compressed JS - ' . $jsFile . PHP_EOL;
}

/**
 * Minify CSS
 */
function minCSS($input, $output)
{
    $url  = 'https://cssminifier.com/raw';
    $css  = file_get_contents($input);
    $data = array(
        'input' => $css,
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $minified = curl_exec($ch);

    curl_close($ch);

    $minifiedCSS = $minified;

    if (!preg_match('/Copyright/', $minifiedCSS)) {
        /**
         * Add license at beginning
         */
        $licenseHeader = <<<PLAIN
/*!
 * CryptoDonate <https://subinsb.com/cryptodonate>
 * Copyright Subin Siby
 * Released under the MIT license <https://goo.gl/aPHGJm>
 */
PLAIN;

        $minifiedCSS = $licenseHeader . PHP_EOL . $minified;
    }

    file_put_contents($output, $minifiedCSS);
}

$cssFiles = array('cryptodonate.css', 'cryptodonate.dark.css');

foreach ($cssFiles as $cssFile) {
    minCSS($baseDir . '/css/' . $cssFile, $baseDir . '/css/' . $cssFile);

    echo 'Compressed CSS - ' . $cssFile . PHP_EOL;
}
