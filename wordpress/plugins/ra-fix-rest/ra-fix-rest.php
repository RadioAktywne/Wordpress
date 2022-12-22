<?php
/*
Plugin Name: Fix REST
Description: Fixes REST url that uses home instead of site for some reason
*/

function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

add_filter('rest_url', function ($url) {
    return str_replace(home_url(), site_url(), $url);
});
