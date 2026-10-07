<?php
/**
 * Registers and renders the EM Process Steps block.
 *
 * @package EM_Block_Collection
 */

declare(strict_types=1);

namespace emBlockCollection;

class emBlockProcessSteps
{
    public function __construct()
    {
        add_action('init', [$this, 'register_block']);
    }

    public function render_block(array $attributes): string
    {
        $attributes = wp_parse_args($attributes, ['heading' => '', 'steps' => []]);
        $steps = is_array($attributes['steps']) ? $attributes['steps'] : [];
        $wrapper_attributes = get_block_wrapper_attributes();

        ob_start();
        ?>
        <section <?php echo $wrapper_attributes; ?>>
            <?php if (!empty($attributes['heading'])) : ?>
                <h2 class="em-process-steps__heading"><?php echo esc_html($attributes['heading']); ?></h2>
            <?php endif; ?>
            <?php if (!empty($steps)) : ?>
                <ol class="em-process-steps__list">
                    <?php foreach ($steps as $step) : ?>
                        <li class="em-process-steps__item">
                            <h3 class="em-process-steps__title"><?php echo esc_html($step['title'] ?? ''); ?></h3>
                            <?php if (!empty($step['content'])) : ?>
                                <p class="em-process-steps__description"><?php echo esc_html($step['content']); ?></p>
                            <?php endif; ?>
                        </li>
                    <?php endforeach; ?>
                </ol>
            <?php endif; ?>
        </section>
        <?php
        return (string) ob_get_clean();
    }

    public function register_block(): void
    {
        register_block_type(
            dirname(__DIR__, 2) . '/build/process-steps',
            ['render_callback' => [$this, 'render_block']]
        );
    }
}