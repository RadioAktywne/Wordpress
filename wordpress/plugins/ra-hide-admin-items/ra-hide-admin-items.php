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

    // Posts
    remove_menu_page('edit.php');

    // Media
    remove_menu_page('upload.php');

    // Comments
    remove_menu_page('edit-comments.php');

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
}

// Hide items from top bar
function ra_hide_admin_bar_menu($wp_admin_bar)
{
    // New -> Post
    $wp_admin_bar->remove_node('new-post');

    // New -> Media
    $wp_admin_bar->remove_node('new-media');
}

// Hide New button link in top bar
function ra_hide_admin_bar_new_link()
{
?>
    <script type="text/javascript">
        function ra_hide_admin_bar_new_link() {
            var add_new = document.getElementById('wp-admin-bar-new-content');
            if (!add_new) return;
            var add_new_a = add_new.getElementsByTagName('a')[0];
            if (add_new_a) add_new_a.removeAttribute('href');
        }
        ra_hide_admin_bar_new_link();
    </script>
<?php
}

// Hide post draft widget from dashboard
function ra_hide_admin_draft()
{
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
}

add_action('admin_menu', 'ra_hide_admin_menu', 9999);
add_action('admin_bar_menu', 'ra_hide_admin_bar_menu', 9999);
add_action('admin_footer', 'ra_hide_admin_bar_new_link', 9999);
add_action('wp_dashboard_setup', 'ra_hide_admin_draft', 9999);
?>
