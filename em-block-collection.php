<?php
/**
 * Plugin Name:       EM Block Collection
 * Description:       A collection of custom Gutenberg blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Esmond Mccain
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       em-block-collection
 */

declare(strict_types=1);

defined('ABSPATH') or die();

/**
 * Register custom block category for EM Blocks
 */
function em_block_collection_register_category($categories) {
    return array_merge(
        [
            [
                'slug'  => 'em-blocks',
                'title' => __('EM Blocks', 'em-block-collection'),
                'icon'  => 'admin-plugins',
            ],
        ],
        $categories
    );
}
add_filter('block_categories_all', 'em_block_collection_register_category');

// Include block classes
require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockFaqAccordion.php';
require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockCarousel.php';
require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockPostGrid.php';
require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockSpacerDivider.php';

// Instantiate block classes
new \emBlockCollection\emBlockFaqAccordion();
new \emBlockCollection\emBlockCarousel();
new \emBlockCollection\emBlockPostGrid();
new \emBlockCollection\emBlockSpacerDivider();