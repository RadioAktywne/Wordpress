<?php
   /*
   Plugin Name: Hide Menu Items
   Description: Hides menu items in admin panel
   */

    function remove_menus() {
        remove_menu_page( 'edit-comments.php' );
        remove_menu_page( 'themes.php' );
        remove_submenu_page( 'options-general.php', 'options-privacy.php' );
        remove_submenu_page( 'options-general.php', 'options-discussion.php' );
    }

    add_action( 'admin_init', 'remove_menus' );
?>
