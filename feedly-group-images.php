<?php
/**
 * Plugin Name: Feedly add group of images
 * Version: 0.0.1
 * Author: Clement Osternaud | Front-End developer at Feedly
 * Author URI: http://feedly.com
 * License: GPL2
 */

//  Absolute path to plugin's root directory in file system.
define ( 'FGI_ROOT_PATH', plugin_dir_path( __FILE__ ) );
//  URL to the plugin's root directory.
define( 'FGI_ROOT_URL', plugin_dir_url( __FILE__ ) );
//  Absolute path to the main plugin file (this one).
define( 'FGI_PLUGIN_FILE', FGI_ROOT_PATH . 'feedly-group-images.php' );

add_action('admin_enqueue_scripts', 'fgi_enqueue_admin_scripts');
function fgi_enqueue_admin_scripts(){
  wp_enqueue_media();
}

add_filter( 'mce_buttons', 'fgi_register_tinymce_button' );
/**
 * The function that tells WordPress to tell TinyMCE it has a new button.
 * @param  ARRAY_N $button_array Array of button IDs for the toolbar.
 * @return ARRAY_N               The button array with the new button added.
 */
function fgi_register_tinymce_button( $button_array ) {
    global $current_screen; //  WordPress contextual information about where we are.
    $type = $current_screen->post_type;
    if( is_admin() && ( $type == 'post' || $type == 'page' ) ) {
      array_push( $button_array, 'fgi_button' );
    }
    return $button_array;
}

add_filter( 'mce_external_plugins', 'fgi_register_tinymce_plugin' );


function fgi_register_tinymce_plugin( $plugin_array ) {
    global $current_screen; //  WordPress contextual information about where we are.
    $type = $current_screen->post_type;
    if( is_admin() && ( $type == 'post' || $type == 'page' ) ) {
        $plugin_array['fgi_plugin'] = FGI_ROOT_URL . 'tinymce-plugin.js';
    }
    return $plugin_array;
}
