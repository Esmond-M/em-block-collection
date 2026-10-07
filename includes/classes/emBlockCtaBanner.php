<?php
/**
 * Registers and renders the EM CTA Banner block.
 *
 * @package EM_Block_Collection
 */

declare(strict_types=1);

namespace emBlockCollection;

class emBlockCtaBanner
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
                'eyebrow' => '',
                'heading' => __('Ready to start a project?', 'em-block-collection'),
                'content' => __('Give your visitors a clear next step.', 'em-block-collection'),
                'primaryLabel' => __('Get in touch', 'em-block-collection'),
                'primaryUrl' => '',
                'secondaryLabel' => '',
                'secondaryUrl' => '',
                'layout' => 'contained',
                'className' => '',
            ]
        );

        $layout = in_array($attributes['layout'], ['contained', 'full-width'], true)
            ? $attributes['layout']
            : 'contained';
        $wrapper_attributes = get_block_wrapper_attributes(
            ['class' => 'is-layout-' . $layout]
        );

        ob_start();
        ?>
        <section <?php echo $wrapper_attributes; ?>>
            <div class="em-cta-banner__content">
                <?php if (!empty($attributes['eyebrow'])) : ?>
                    <p class="em-cta-banner__eyebrow"><?php echo esc_html($attributes['eyebrow']); ?></p>
                <?php endif; ?>
                <h2 class="em-cta-banner__heading"><?php echo esc_html($attributes['heading']); ?></h2>
                <?php if (!empty($attributes['content'])) : ?>
                    <p class="em-cta-banner__description"><?php echo esc_html($attributes['content']); ?></p>
                <?php endif; ?>
            </div>
            <?php if (!empty($attributes['primaryUrl']) || !empty($attributes['secondaryUrl'])) : ?>
                <div class="em-cta-banner__actions">
                    <?php if (!empty($attributes['primaryUrl'])) : ?>
                        <a class="em-cta-banner__button em-cta-banner__button--primary" href="<?php echo esc_url($attributes['primaryUrl']); ?>">
                            <?php echo esc_html($attributes['primaryLabel']); ?>
                        </a>
                    <?php endif; ?>
                    <?php if (!empty($attributes['secondaryUrl'])) : ?>
                        <a class="em-cta-banner__button em-cta-banner__button--secondary" href="<?php echo esc_url($attributes['secondaryUrl']); ?>">
                            <?php echo esc_html($attributes['secondaryLabel']); ?>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </section>
        <?php
        return (string) ob_get_clean();
    }

    public function register_block(): void
    {
        register_block_type(
            dirname(__DIR__, 2) . '/build/cta-banner',
            ['render_callback' => [$this, 'render_block']]
        );
    }
}