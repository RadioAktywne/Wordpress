<?php
    /*
    Plugin Name: Remove redirects
    Description: Removes default redirects
    */

    remove_filter( 'template_redirect', 'redirect_canonical' );
?>
