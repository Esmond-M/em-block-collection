<?php
/**
 * Main plugin file for EM FAQ Accordion.
 * PHP version 7.3+
 *
 * @category  Wordpress_Plugin
 * @package   Esmond-M
 * @author    Esmond Mccain <esmondmccain@gmail.com>
 * @license   https://www.gnu.org/licenses/gpl-3.0.en.html GNU General Public License
 * @link      https://esmondmccain.com/
 *
 * Plugin Name:       EM FAQ Accordion
 * Description:       Display FAQs in an accordion block.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Esmond Mccain
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       em-block-faq-accordion
 *
 * Adds a Gutenberg block for FAQ accordion display.
 */

declare(strict_types=1);
namespace emBlockFaqAccordion;

use emBlockFaqAccordion\emBlockFaqAccordion;
defined('ABSPATH') or die();

require_once plugin_dir_path(__FILE__) . 'includes/classes/emBlockFaqAccordion.php';

new emBlockFaqAccordion();
