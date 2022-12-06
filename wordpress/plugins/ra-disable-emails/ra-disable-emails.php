<?php
/*
Plugin Name: Disable emails
Description: Disables notification emails
*/

add_filter('send_site_admin_email_change_email', '__return_false');
