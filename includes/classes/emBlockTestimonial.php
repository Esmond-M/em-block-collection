<?php
/**
 * Registers and renders the EM Testimonial block.
 *
 * @package EM_Block_Collection
 */

declare(strict_types=1);

namespace emBlockCollection;

class emBlockTestimonial
{
    public function __construct()
    {
        add_action('init', [$this, 'register_block']);
    }

    public function render_block(array $attributes): string
    {
        $attributes = wp_parse_args(
            $attributes,
            [
                'quote' => __('Working together was straightforward, thoughtful, and effective.', 'em-block-collection'),
                'name' => __('Client name', 'em-block-collection'),
                'role' => '',
                'imageUrl' => '',
                'imageAlt' => '',
                'layout' => 'stacked',
            ]
        );
        $layout = in_array($attributes['layout'], ['stacked', 'inline'], true) ? $attributes['layout'] : 'stacked';
        $wrapper_attributes = get_block_wrapper_attributes(
            ['class' => 'is-layout-' . $layout]
        );

        ob_start();
        ?>
        <figure <?php echo $wrapper_attributes; ?>>
            <blockquote class="em-testimonial__quote">
                <p><?php echo esc_html($attributes['quote']); ?></p>
            </blockquote>
            <figcaption class="em-testimonial__attribution">
                <?php if (!empty($attributes['imageUrl'])) : ?>
                    <img class="em-testimonial__image" src="<?php echo esc_url($attributes['imageUrl']); ?>" alt="<?php echo esc_attr($attributes['imageAlt']); ?>" loading="lazy" />
                <?php endif; ?>
                <span>
                    <strong class="em-testimonial__name"><?php echo esc_html($attributes['name']); ?></strong>
                    <?php if (!empty($attributes['role'])) : ?>
                        <span class="em-testimonial__role"><?php echo esc_html($attributes['role']); ?></span>
                    <?php endif; ?>
                </span>
            </figcaption>
        </figure>
        <?php
        return (string) ob_get_clean();
    }

    public function register_block(): void
    {
        register_block_type(
            dirname(__DIR__, 2) . '/build/testimonial',
            ['render_callback' => [$this, 'render_block']]
        );
    }
}