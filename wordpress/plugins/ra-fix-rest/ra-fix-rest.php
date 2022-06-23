<?php
/*
Plugin Name: Fix REST
Description: Fixes REST url that uses home instead of site for some reason
*/

add_filter('rest_url', function ($url) {
    return str_replace(home_url(), site_url() . '/', $url);
});
