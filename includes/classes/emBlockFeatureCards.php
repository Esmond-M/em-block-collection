<?php
/**
 * Registers and renders the EM Feature Cards block.
 *
 * @package EM_Block_Collection
 */

declare(strict_types=1);

namespace emBlockCollection;

class emBlockFeatureCards
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
                'heading' => __('What we can help with', 'em-block-collection'),
                'columns' => 3,
                'items' => [],
            ]
        );
        $columns = in_array((int) $attributes['columns'], [2, 3], true) ? (int) $attributes['columns'] : 3;
        $items = is_array($attributes['items']) ? $attributes['items'] : [];
        $wrapper_attributes = get_block_wrapper_attributes();

        ob_start();
        ?>
        <section <?php echo $wrapper_attributes; ?>>
            <?php if (!empty($attributes['heading'])) : ?>
                <h2 class="em-feature-cards__heading"><?php echo esc_html($attributes['heading']); ?></h2>
            <?php endif; ?>
            <?php if (!empty($items)) : ?>
                <div class="em-feature-cards__grid columns-<?php echo esc_attr((string) $columns); ?>">
                    <?php foreach ($items as $item) : ?>
                        <article class="em-feature-cards__card">
                            <?php if (!empty($item['icon'])) : ?>
                                <span class="em-feature-cards__icon" aria-hidden="true"><?php echo esc_html($item['icon']); ?></span>
                            <?php endif; ?>
                            <h3 class="em-feature-cards__title"><?php echo esc_html($item['title'] ?? ''); ?></h3>
                            <?php if (!empty($item['content'])) : ?>
                                <p class="em-feature-cards__description"><?php echo esc_html($item['content']); ?></p>
                            <?php endif; ?>
                        </article>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </section>
        <?php
        return (string) ob_get_clean();
    }

    public function register_block(): void
    {
        register_block_type(
            dirname(__DIR__, 2) . '/build/feature-cards',
            ['render_callback' => [$this, 'render_block']]
        );
    }
}