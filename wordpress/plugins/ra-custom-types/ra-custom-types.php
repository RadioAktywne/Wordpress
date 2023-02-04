<?php
/*
Plugin Name: Custom Types
Description: Adds custom types
*/

function ra_custom_types_register_type($name, $args, $fields)
{
    register_post_type($name, $args);
    acf_add_local_field_group($fields);
}

function ra_custom_types_register_member()
{
    $labels = [
        "name" => "Members",
        "singular_name" => "Member",
        "menu_name" => "Members",
        "all_items" => "All Members",
        "add_new" => "Add new",
        "add_new_item" => "Add new Member",
        "edit_item" => "Edit Member",
        "new_item" => "New Member",
        "view_item" => "View Member",
        "view_items" => "View Members",
        "search_items" => "Search Members",
        "not_found" => "No Members found",
        "not_found_in_trash" => "No Members found in trash",
        "parent" => "Parent Member:",
        "featured_image" => "Featured image for this Member",
        "set_featured_image" => "Set featured image for this Member",
        "remove_featured_image" => "Remove featured image for this Member",
        "use_featured_image" => "Use as featured image for this Member",
        "archives" => "Member archives",
        "insert_into_item" => "Insert into Member",
        "uploaded_to_this_item" => "Upload to this Member",
        "filter_items_list" => "Filter Members list",
        "items_list_navigation" => "Members list navigation",
        "items_list" => "Members list",
        "attributes" => "Members attributes",
        "name_admin_bar" => "Member",
        "item_published" => "Member published",
        "item_published_privately" => "Member published privately.",
        "item_reverted_to_draft" => "Member reverted to draft.",
        "item_scheduled" => "Member scheduled",
        "item_updated" => "Member updated.",
        "parent_item_colon" => "Parent Member:",
    ];

    $args = [
        "label" => "Members",
        "labels" => $labels,
        "public" => true,
        "has_archive" => 'members',
        "map_meta_cap" => true,
        "can_export" => true,
        "show_in_rest" => true,
        "rewrite" => ["with_front" => false],
        "menu_icon" => "dashicons-groups",
        "supports" => ['title'],
    ];

    $fields = [
        'key' => 'member_field_group',
        'title' => 'Member',
        'fields' => [
            [
                'key' => 'member_field_name',
                'label' => 'Name',
                'name' => 'name',
                'type' => 'text',
                'required' => true,
            ],
            [
                'key' => 'member_field_role',
                'label' => 'Role',
                'name' => 'role',
                'type' => 'text',
                'required' => true,
            ],
            [
                'key' => 'member_field_image',
                'label' => 'Image',
                'name' => 'image',
                'type' => 'image',
                'required' => false,
                'return_format' => 'id',
            ],
            [
                'key' => 'member_field_description',
                'label' => 'Description',
                'name' => 'description',
                'type' => 'wysiwyg',
                'required' => false,
                'media_upload' => false,
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'member',
                ],
            ],
        ],
        'show_in_rest' => true
    ];

    ra_custom_types_register_type('member', $args, $fields);
}

function ra_custom_types_register_show()
{
    $labels = [
        "name" => "Shows",
        "singular_name" => "Show",
        "menu_name" => "Shows",
        "all_items" => "All Shows",
        "add_new" => "Add new",
        "add_new_item" => "Add new Show",
        "edit_item" => "Edit Show",
        "new_item" => "New Show",
        "view_item" => "View Show",
        "view_items" => "View Shows",
        "search_items" => "Search Shows",
        "not_found" => "No Shows found",
        "not_found_in_trash" => "No Shows found in trash",
        "parent" => "Parent Show:",
        "featured_image" => "Featured image for this Show",
        "set_featured_image" => "Set featured image for this Show",
        "remove_featured_image" => "Remove featured image for this Show",
        "use_featured_image" => "Use as featured image for this Show",
        "archives" => "Show archives",
        "insert_into_item" => "Insert into Show",
        "uploaded_to_this_item" => "Upload to this Show",
        "filter_items_list" => "Filter Shows list",
        "items_list_navigation" => "Shows list navigation",
        "items_list" => "Shows list",
        "attributes" => "Shows attributes",
        "name_admin_bar" => "Show",
        "item_published" => "Show published",
        "item_published_privately" => "Show published privately.",
        "item_reverted_to_draft" => "Show reverted to draft.",
        "item_scheduled" => "Show scheduled",
        "item_updated" => "Show updated.",
        "parent_item_colon" => "Parent Show:",
    ];

    $args = [
        "label" => "Shows",
        "labels" => $labels,
        "public" => true,
        "has_archive" => 'shows',
        "map_meta_cap" => true,
        "can_export" => true,
        "show_in_rest" => true,
        "rewrite" => ["with_front" => false],
        "menu_icon" => "dashicons-format-audio",
        "supports" => ['title'],
    ];

    $fields = [
        'key' => 'show_field_group',
        'title' => 'Show',
        'fields' => [
            [
                'key' => 'show_field_title',
                'label' => 'Title',
                'name' => 'title',
                'type' => 'text',
                'required' => true,
            ],
            [
                'key' => 'show_field_hosts',
                'label' => 'Hosts',
                'name' => 'hosts',
                'type' => 'post_object',
                'required' => true,
                'post_type' => ['member'],
                'allow_null' => false,
                'multiple' => true,
                'return_format' => 'object',
                'ui' => true,
            ],
            [
                'key' => 'show_field_image',
                'label' => 'Image',
                'name' => 'image',
                'type' => 'image',
                'required' => false,
                'return_format' => 'id',
            ],
            [
                'key' => 'show_field_description',
                'label' => 'Description',
                'name' => 'description',
                'type' => 'wysiwyg',
                'required' => false,
                'media_upload' => false,
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'show',
                ],
            ],
        ],
        'show_in_rest' => true
    ];

    ra_custom_types_register_type('show', $args, $fields);
}

function ra_custom_types_register_event()
{
    $labels = [
        "name" => "Events",
        "singular_name" => "Event",
        "menu_name" => "Events",
        "all_items" => "All Events",
        "add_new" => "Add new",
        "add_new_item" => "Add new Event",
        "edit_item" => "Edit Event",
        "new_item" => "New Event",
        "view_item" => "View Event",
        "view_items" => "View Events",
        "search_items" => "Search Events",
        "not_found" => "No Events found",
        "not_found_in_trash" => "No Events found in trash",
        "parent" => "Parent Event:",
        "featured_image" => "Featured image for this Event",
        "set_featured_image" => "Set featured image for this Event",
        "remove_featured_image" => "Remove featured image for this Event",
        "use_featured_image" => "Use as featured image for this Event",
        "archives" => "Event archives",
        "insert_into_item" => "Insert into Event",
        "uploaded_to_this_item" => "Upload to this Event",
        "filter_items_list" => "Filter Events list",
        "items_list_navigation" => "Events list navigation",
        "items_list" => "Events list",
        "attributes" => "Events attributes",
        "name_admin_bar" => "Event",
        "item_published" => "Event published",
        "item_published_privately" => "Event published privately.",
        "item_reverted_to_draft" => "Event reverted to draft.",
        "item_scheduled" => "Event scheduled",
        "item_updated" => "Event updated.",
        "parent_item_colon" => "Parent Event:",
    ];

    $args = [
        "label" => "Events",
        "labels" => $labels,
        "public" => true,
        "has_archive" => 'events',
        "map_meta_cap" => true,
        "can_export" => true,
        "show_in_rest" => true,
        "rewrite" => ["with_front" => false],
        "menu_icon" => "dashicons-calendar-alt",
        "supports" => ['title'],
    ];

    $fields = [
        'key' => 'event_field_group',
        'title' => 'Event',
        'fields' => [
            [
                'key' => 'event_field_show',
                'label' => 'Show',
                'name' => 'show',
                'type' => 'post_object',
                'required' => true,
                'post_type' => ['show'],
                'allow_null' => false,
                'multiple' => false,
                'return_format' => 'object',
                'ui' => true,
            ],
            [
                'key' => 'event_field_day',
                'label' => 'Day',
                'name' => 'day',
                'type' => 'select',
                'required' => true,
                'choices' => [
                    'monday' => 'Monday',
                    'tuesday' => 'Tuesday',
                    'wednesday' => 'Wednesday',
                    'thursday' => 'Thursday',
                    'friday' => 'Friday',
                    'saturday' => 'Saturday',
                    'sunday' => 'Sunday',
                ],
                'allow_null' => false,
                'multiple' => false,
                'ui' => false,
                'ajax' => false,
                'return_format' => 'array',
            ],
            [
                'key' => 'event_field_start_time',
                'label' => 'Start Time',
                'name' => 'start_time',
                'type' => 'time_picker',
                'required' => true,
                'display_format' => 'H:i:s',
                'return_format' => 'H:i:s',
            ],
            [
                'key' => 'event_field_end_time',
                'label' => 'End Time',
                'name' => 'end_time',
                'type' => 'time_picker',
                'required' => true,
                'display_format' => 'H:i:s',
                'return_format' => 'H:i:s',
            ],
            [
                'key' => 'event_field_type',
                'label' => 'Type',
                'name' => 'type',
                'type' => 'radio',
                'required' => true,
                'choices' => [
                    'live' => 'Live',
                    'replay' => 'Replay',
                ],
                'allow_null' => false,
                'other_choice' => false,
                'save_other_choice' => false,
                'layout' => 'vertical',
                'return_format' => 'array',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'event',
                ],
            ],
        ],
        'show_in_rest' => true
    ];

    ra_custom_types_register_type('event', $args, $fields);
}

function ra_custom_types_register_album()
{
    $labels = [
        "name" => "Albums",
        "singular_name" => "Album",
        "menu_name" => "Albums",
        "all_items" => "All Albums",
        "add_new" => "Add new",
        "add_new_item" => "Add new Album",
        "edit_item" => "Edit Album",
        "new_item" => "New Album",
        "view_item" => "View Album",
        "view_items" => "View Albums",
        "search_items" => "Search Albums",
        "not_found" => "No Albums found",
        "not_found_in_trash" => "No Albums found in trash",
        "parent" => "Parent Album:",
        "featured_image" => "Featured image for this Album",
        "set_featured_image" => "Set featured image for this Album",
        "remove_featured_image" => "Remove featured image for this Album",
        "use_featured_image" => "Use as featured image for this Album",
        "archives" => "Album archives",
        "insert_into_item" => "Insert into Album",
        "uploaded_to_this_item" => "Upload to this Album",
        "filter_items_list" => "Filter Albums list",
        "items_list_navigation" => "Albums list navigation",
        "items_list" => "Albums list",
        "attributes" => "Albums attributes",
        "name_admin_bar" => "Album",
        "item_published" => "Album published",
        "item_published_privately" => "Album published privately.",
        "item_reverted_to_draft" => "Album reverted to draft.",
        "item_scheduled" => "Album scheduled",
        "item_updated" => "Album updated.",
        "parent_item_colon" => "Parent Album:",
    ];

    $args = [
        "label" => "Albums",
        "labels" => $labels,
        "public" => true,
        "has_archive" => 'albums',
        "map_meta_cap" => true,
        "can_export" => true,
        "show_in_rest" => true,
        "rewrite" => ["with_front" => false],
        "menu_icon" => "dashicons-album",
        "supports" => ['title'],
    ];

    $fields = [
        'key' => 'album_field_group',
        'title' => 'Album',
        'fields' => [
            [
                'key' => 'album_field_artist',
                'label' => 'Artist',
                'name' => 'artist',
                'type' => 'text',
                'required' => true,
            ],
            [
                'key' => 'album_field_title',
                'label' => 'Title',
                'name' => 'title',
                'type' => 'text',
                'required' => true,
            ],
            [
                'key' => 'album_field_image',
                'label' => 'Image',
                'name' => 'image',
                'type' => 'image',
                'required' => false,
                'return_format' => 'id',
            ],
            [
                'key' => 'album_field_description',
                'label' => 'Description',
                'name' => 'description',
                'type' => 'wysiwyg',
                'required' => false,
                'media_upload' => false,
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'album',
                ],
            ],
        ],
        'show_in_rest' => true
    ];

    ra_custom_types_register_type('album', $args, $fields);
}

function ra_custom_types_register_recording()
{
    $labels = [
        "name" => "Recordings",
        "singular_name" => "Recording",
        "menu_name" => "Recordings",
        "all_items" => "All Recordings",
        "add_new" => "Add new",
        "add_new_item" => "Add new Recording",
        "edit_item" => "Edit Recording",
        "new_item" => "New Recording",
        "view_item" => "View Recording",
        "view_items" => "View Recordings",
        "search_items" => "Search Recordings",
        "not_found" => "No Recordings found",
        "not_found_in_trash" => "No Recordings found in trash",
        "parent" => "Parent Recording:",
        "featured_image" => "Featured image for this Recording",
        "set_featured_image" => "Set featured image for this Recording",
        "remove_featured_image" => "Remove featured image for this Recording",
        "use_featured_image" => "Use as featured image for this Recording",
        "archives" => "Recording archives",
        "insert_into_item" => "Insert into Recording",
        "uploaded_to_this_item" => "Upload to this Recording",
        "filter_items_list" => "Filter Recordings list",
        "items_list_navigation" => "Recordings list navigation",
        "items_list" => "Recordings list",
        "attributes" => "Recordings attributes",
        "name_admin_bar" => "Recording",
        "item_published" => "Recording published",
        "item_published_privately" => "Recording published privately.",
        "item_reverted_to_draft" => "Recording reverted to draft.",
        "item_scheduled" => "Recording scheduled",
        "item_updated" => "Recording updated.",
        "parent_item_colon" => "Parent Recording:",
    ];

    $args = [
        "label" => "Recordings",
        "labels" => $labels,
        "public" => true,
        "has_archive" => 'recordings',
        "map_meta_cap" => true,
        "can_export" => true,
        "show_in_rest" => true,
        "rewrite" => ["with_front" => false],
        "menu_icon" => "dashicons-media-audio",
        "supports" => ['title'],
    ];

    $fields = [
        'key' => 'recording_field_group',
        'title' => 'Recording',
        'fields' => [
            [
                'key' => 'recording_field_title',
                'label' => 'Title',
                'name' => 'title',
                'type' => 'text',
                'required' => true,
            ],
            [
                'key' => 'recording_field_file',
                'label' => 'File',
                'name' => 'file',
                'type' => 'file',
                'required' => true,
                'mime_types' => 'mp3,ogg,wav',
                'return_format' => 'id',
            ],
            [
                'key' => 'recording_field_image',
                'label' => 'Image',
                'name' => 'image',
                'type' => 'image',
                'required' => false,
                'return_format' => 'id',
            ],
            [
                'key' => 'recording_field_description',
                'label' => 'Description',
                'name' => 'description',
                'type' => 'wysiwyg',
                'required' => false,
                'media_upload' => false,
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'recording',
                ],
            ],
        ],
        'show_in_rest' => true
    ];

    ra_custom_types_register_type('recording', $args, $fields);
}

function ra_custom_types_register_info_tile()
{
    $labels = [
        "name" => "Info Tiles",
        "singular_name" => "Info Tile",
        "menu_name" => "Info Tiles",
        "all_items" => "All Info Tiles",
        "add_new" => "Add new",
        "add_new_item" => "Add new Info Tile",
        "edit_item" => "Edit Info Tile",
        "new_item" => "New Info Tile",
        "view_item" => "View Info Tile",
        "view_items" => "View Info Tiles",
        "search_items" => "Search Info Tiles",
        "not_found" => "No Info Tiles found",
        "not_found_in_trash" => "No Info Tiles found in trash",
        "parent" => "Parent Info Tile:",
        "featured_image" => "Featured image for this Info Tile",
        "set_featured_image" => "Set featured image for this Info Tile",
        "remove_featured_image" => "Remove featured image for this Info Tile",
        "use_featured_image" => "Use as featured image for this Info Tile",
        "archives" => "Info Tile archives",
        "insert_into_item" => "Insert into Info Tile",
        "uploaded_to_this_item" => "Upload to this Info Tile",
        "filter_items_list" => "Filter Info Tiles list",
        "items_list_navigation" => "Info Tiles list navigation",
        "items_list" => "Info Tiles list",
        "attributes" => "Info Tiles attributes",
        "name_admin_bar" => "Info Tile",
        "item_published" => "Info Tile published",
        "item_published_privately" => "Info Tile published privately.",
        "item_reverted_to_draft" => "Info Tile reverted to draft.",
        "item_scheduled" => "Info Tile scheduled",
        "item_updated" => "Info Tile updated.",
        "parent_item_colon" => "Parent Info Tile:",
    ];

    $args = [
        "label" => "Info Tiles",
        "labels" => $labels,
        "public" => true,
        "has_archive" => 'info',
        "map_meta_cap" => true,
        "can_export" => true,
        "show_in_rest" => true,
        "rewrite" => ["with_front" => false],
        "menu_icon" => "dashicons-layout",
        "supports" => ['title'],
    ];

    $fields = [
        'key' => 'info_tile_field_group',
        'title' => 'Info Tile',
        'fields' => [
            [
                'key' => 'info_tile_field_id',
                'label' => 'Identifier',
                'name' => 'id',
                'type' => 'radio',
                'required' => true,
                'choices' => [
                    'topleft' => 'Top left',
                    'topright' => 'Top right',
                    'bottomleft' => 'Bottom left',
                    'bottomright' => 'Bottom right',
                ],
                'allow_null' => false,
                'other_choice' => false,
                'save_other_choice' => false,
                'layout' => 'vertical',
                'return_format' => 'array',
            ],
            [
                'key' => 'info_tile_field_title',
                'label' => 'Title',
                'name' => 'title',
                'type' => 'text',
                'required' => true,
            ],
            [
                // decided to swap the list with just text, cause wrong adresses were being listed
                // (no translations and wrong ports)
                // 'key' => 'info_tile_field_link',
                // 'label' => 'Link',
                // 'name' => 'link',
                // 'type' => 'page_link',
                // 'required' => true,
                // 'allow_null' => false,
                // 'allow_archives' => true,
                // 'multiple' => false,

                'key' => 'info_tile_field_link',
                'label' => 'Link',
                'name' => 'link',
                'type' => 'text',
                'required' => true,
            ],
            [
                'key' => 'info_tile_field_image',
                'label' => 'Image',
                'name' => 'image',
                'type' => 'image',
                'required' => false,
                'return_format' => 'id',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'info',
                ],
            ],
        ],
        'show_in_rest' => true
    ];

    ra_custom_types_register_type('info', $args, $fields);
}

function ra_custom_types_register_types()
{
    ra_custom_types_register_member();
    ra_custom_types_register_show();
    ra_custom_types_register_event();
    ra_custom_types_register_album();
    ra_custom_types_register_recording();
    ra_custom_types_register_info_tile();
}

function ra_custom_types_hide_title($types)
{
    if (!in_array(get_current_screen()->id, $types)) {
        return;
    }
?>
    <style type="text/css">
        #post-body-content {
            display: none;
        }
    </style>
<?php
}

function ra_custom_types_hide_titles()
{
    ra_custom_types_hide_title([
        "member",
        "show",
        "event",
        "album",
        "recording",
        "info"
    ]);
}

function ra_custom_types_set_cpt_defaults($id, $title)
{
    $post = [];
    $post['ID'] = $id;
    $post['post_title'] = $title;
    $post['post_name']  = sanitize_title($title);

    wp_update_post($post);
}

function ra_custom_types_set_member_defaults($id)
{
    $title = get_field('name', $id);
    ra_custom_types_set_cpt_defaults($id, $title);
}

function ra_custom_types_set_show_defaults($id)
{
    $title = get_field('title', $id);
    ra_custom_types_set_cpt_defaults($id, $title);
}

function ra_custom_types_set_event_defaults($id)
{
    $show = get_field('show', $id);
    $type = get_field('type', $id);

    $title = $show->title . " (" . $type['label'] . ")";

    ra_custom_types_set_cpt_defaults($id, $title);
}

function ra_custom_types_set_album_defaults($id)
{
    $artist = get_field('artist', $id);
    $album_title = get_field('title', $id);

    $title = $artist . " - " . $album_title;

    ra_custom_types_set_cpt_defaults($id, $title);
}

function ra_custom_types_set_recording_defaults($id)
{
    $title = get_field('title', $id);
    ra_custom_types_set_cpt_defaults($id, $title);
}

function ra_custom_types_set_info_tile_defaults($id)
{
    $title = get_field('title', $id);
    ra_custom_types_set_cpt_defaults($id, $title);
}

function ra_custom_types_set_defaults($post_id)
{
    switch (get_post_type($post_id)) {
        case "member":
            ra_custom_types_set_member_defaults($post_id);
            break;
        case "show":
            ra_custom_types_set_show_defaults($post_id);
            break;
        case "event":
            ra_custom_types_set_event_defaults($post_id);
            break;
        case "album":
            ra_custom_types_set_album_defaults($post_id);
            break;
        case "recording":
            ra_custom_types_set_recording_defaults($post_id);
            break;
        case "info":
            ra_custom_types_set_info_tile_defaults($post_id);
            break;
    }
}

function ra_custom_types_format_links($value_formatted, $post_id, $field, $value, $format)
{
    return acf_format_value($value, $post_id, $field);
}

add_action('admin_head', 'ra_custom_types_hide_titles', 9999);
add_action('acf/init', 'ra_custom_types_register_types', 9999);
add_action('acf/save_post', 'ra_custom_types_set_defaults', 9999);

add_filter('acf/rest/format_value_for_rest/type=link', 'ra_custom_types_format_links', 10, 5);
add_filter('acf/rest/format_value_for_rest/type=page_link', 'ra_custom_types_format_links', 10, 5);
