<?php
/**
 * Main plugin class for EM Spacer + Divider Pro.
 * PHP version 7.3+
 * @category Wordpress_Plugin
 * @package  Esmond-M
 * @author   Esmond Mccain <esmondmccain@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.en.html GNU General Public License
 * @link     esmondmccain.com
 */
declare(strict_types=1);
namespace emBlockCollection;

class emBlockSpacerDivider
{
    /**
     * Constructor: sets up hooks.
     */
    public function __construct()
    {
        add_action('init', [$this, 'em_block_spacer_divider_init']);
    }

    /**
     * Server-side render for Spacer + Divider Pro
     */
    public function em_block_spacer_divider_content($attributes)
    {
        $atts = wp_parse_args(
            $attributes ?? [],
            [
                'spacingTop'       => 40,
                'spacingBottom'    => 40,
                'showDivider'      => false,
                'dividerStyle'     => 'solid',
                'dividerColor'     => '#cccccc',
                'dividerWidth'     => 2,
                'dividerPosition'  => 'center',
                'dividerLength'    => 100,
                'dividerAlignment' => 'center',
                'customClass'      => '',
            ]
        );

        // Sanitize attributes
        $spacing_top = max(0, (int) $atts['spacingTop']);
        $spacing_bottom = max(0, (int) $atts['spacingBottom']);
        $show_divider = (bool) $atts['showDivider'];
        $divider_style = sanitize_text_field($atts['dividerStyle']);
        $divider_color = sanitize_hex_color($atts['dividerColor']) ?: '#cccccc';
        $divider_width = max(1, min(10, (int) $atts['dividerWidth']));
        $divider_position = sanitize_text_field($atts['dividerPosition']);
        $divider_length = max(10, min(100, (int) $atts['dividerLength']));
        $divider_alignment = sanitize_text_field($atts['dividerAlignment']);
        $custom_class = sanitize_html_class($atts['customClass']);

        // Validate enum values
        $valid_styles = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge'];
        $valid_positions = ['top', 'center', 'bottom'];
        $valid_alignments = ['left', 'center', 'right'];

        if (!in_array($divider_style, $valid_styles)) {
            $divider_style = 'solid';
        }
        if (!in_array($divider_position, $valid_positions)) {
            $divider_position = 'center';
        }
        if (!in_array($divider_alignment, $valid_alignments)) {
            $divider_alignment = 'center';
        }

        // Build CSS classes
        $classes = ['em-spacer-divider'];
        if (!empty($custom_class)) {
            $classes[] = $custom_class;
        }

        // Build inline styles
        $styles = [
            'padding-top: ' . $spacing_top . 'px',
            'padding-bottom: ' . $spacing_bottom . 'px',
            'position: relative'
        ];

        // Build divider styles if enabled
        $divider_styles = '';
        if ($show_divider) {
            $divider_position_style = '';
            switch ($divider_position) {
                case 'top':
                    $divider_position_style = 'top: 0;';
                    break;
                case 'bottom':
                    $divider_position_style = 'bottom: 0;';
                    break;
                case 'center':
                default:
                    $divider_position_style = 'top: 50%; transform: translateY(-50%);';
                    break;
            }

            $divider_alignment_style = '';
            switch ($divider_alignment) {
                case 'left':
                    $divider_alignment_style = 'left: 0;';
                    break;
                case 'right':
                    $divider_alignment_style = 'right: 0;';
                    break;
                case 'center':
                default:
                    $divider_alignment_style = 'left: 50%; margin-left: -' . ($divider_length / 2) . '%;';
                    break;
            }

            $divider_color_style = '';
            if ($divider_style === 'solid') {
                $divider_color_style = 'background-color: ' . $divider_color . '; height: ' . $divider_width . 'px;';
            } else {
                $divider_color_style = 'border-top: ' . $divider_width . 'px ' . $divider_style . ' ' . $divider_color . '; height: 0;';
            }

            $divider_styles = sprintf(
                'position: absolute; %s %s width: %s%%; %s',
                $divider_position_style,
                $divider_alignment_style,
                $divider_length,
                $divider_color_style
            );
        }

        ob_start();
        ?>
        <div class="<?php echo esc_attr(implode(' ', $classes)); ?>" style="<?php echo esc_attr(implode('; ', $styles)); ?>">
            <?php if ($show_divider) : ?>
                <div class="em-spacer-divider__divider" style="<?php echo esc_attr($divider_styles); ?>"></div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Registers the block using the metadata loaded from the `block.json` file.
     */
    public function em_block_spacer_divider_init()
    {
        register_block_type(
            dirname(__DIR__, 2) . '/build/spacer-divider',
            [
                'render_callback' => [$this, 'em_block_spacer_divider_content']
            ]
        );
    }
}