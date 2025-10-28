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
 * Main plugin class for EM Block Collection
 */
final class EmBlockCollection
{
    /**
     * Constructor: Initialize the plugin
     */
    public function __construct()
    {
        $this->register_category_filter();
        $this->include_and_instantiate_blocks();
    }

    /**
     * Register custom block category for EM Blocks (public - used by WordPress filter)
     */
    public function register_block_category($categories)
    {
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

    /**
     * Register the category filter (private - internal setup)
     */
    private function register_category_filter()
    {
        add_filter('block_categories_all', [$this, 'register_block_category']);
    }

    /**
     * Include and instantiate all blocks (private - internal setup)
     */
    private function include_and_instantiate_blocks()
    {
        $this->include_block_classes();
        $this->instantiate_blocks();
    }

    /**
     * Include all block class files (private - internal helper)
     */
    private function include_block_classes()
    {
        require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockFaqAccordion.php';
        require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockCarousel.php';
        require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockPostGrid.php';
        require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockSpacerDivider.php';
    }

    /**
     * Instantiate all block classes (private - internal helper)
     */
    private function instantiate_blocks()
    {
        new \emBlockCollection\emBlockFaqAccordion();
        new \emBlockCollection\emBlockCarousel();
        new \emBlockCollection\emBlockPostGrid();
        new \emBlockCollection\emBlockSpacerDivider();
    }
}

// Initialize the plugin with the class
new EmBlockCollection();