<?php
/*
Plugin Name: Hide Admin Menu Items
Description: Hides menu items in admin panel
*/

// Hide items from left menu
function ra_hide_admin_menu()
{
    // Dashboard -> Updates
    remove_submenu_page('index.php', 'update-core.php');

    // Appearance
    remove_menu_page('themes.php');

    // Settings -> Discussion
    remove_submenu_page('options-general.php', 'options-discussion.php');

    // Settings -> Privacy
    remove_submenu_page('options-general.php', 'options-privacy.php');

    // Settings -> Disable Comments (plugin)
    remove_submenu_page('options-general.php', 'disable_comments_settings');

    // Tools -> Disable Comments (plugin)
    remove_submenu_page('tools.php', 'disable_comments_tools');

    // Custom Fields (plugin)
    remove_menu_page('edit.php?post_type=acf-field-group');
}

add_action('admin_menu', 'ra_hide_admin_menu', 9999);
?>
