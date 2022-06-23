<?php
/*
Plugin Name: Remove Redirects
Description: Removes default redirects
*/

remove_filter('template_redirect', 'redirect_canonical');
