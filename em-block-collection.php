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

// Autoload classes if using Composer, otherwise require manually
require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockFaqAccordion.php';
require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockCarousel.php';
require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockPostGrid.php';

// Instantiate block classes
new \emBlockFaqAccordion\emBlockFaqAccordion();
new \emBlockCarousel\emBlockCarousel();
new \emBlockPostGrid\emBlockPostGrid();