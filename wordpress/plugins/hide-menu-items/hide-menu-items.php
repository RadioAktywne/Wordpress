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
        remove_submenu_page( 'options-general.php', 'disable_comments_settings' );
        remove_submenu_page( 'tools.php', 'disable_comments_tools' );
    }

    add_action( 'admin_init', 'remove_menus', 9999 );
?>
