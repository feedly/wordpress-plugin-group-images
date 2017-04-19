<?php
/**
 * Plugin Name: Feedly add group of images
 * Version: 1.0.0
 * Author: Clement Osternaud | Front-End developer at Feedly
 * Author URI: http://feedly.com
 * License: GPL2
 */

define('FGI_ROOT_PATH', plugin_dir_path(__FILE__));
define('FGI_ROOT_URL', plugin_dir_url(__FILE__));
define('FGI_PLUGIN_FILE', FGI_ROOT_PATH . 'feedly-group-images.php');

add_action('admin_enqueue_scripts', 'fgi_enqueue_admin_scripts');
function fgi_enqueue_admin_scripts() {
  wp_enqueue_media();
}

add_filter('mce_buttons', 'fgi_register_tinymce_button');
function fgi_register_tinymce_button($button_array) {
  global $current_screen;
  $type = $current_screen->post_type;
  if (is_admin() && ($type == 'post' || $type == 'page')) {
    array_push($button_array, 'fgi_button');
  }
  return $button_array;
}

add_filter('mce_external_plugins', 'fgi_register_tinymce_plugin');


function fgi_register_tinymce_plugin($plugin_array) {
  global $current_screen;
  $type = $current_screen->post_type;
  if (is_admin() && ($type == 'post' || $type == 'page')) {
    $plugin_array['fgi_plugin'] = FGI_ROOT_URL . 'tinymce-plugin.js';
  }
  return $plugin_array;
}
