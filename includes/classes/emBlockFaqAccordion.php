<?php
declare(strict_types=1);
namespace emBlockCollection;

class emBlockFaqAccordion
{
    // Register block and hook up server-side rendering
    public function __construct()
    {
        add_action('init', [$this, 'em_block_faq_accordion_init']);
    }

    // Render the FAQ accordion block markup
    public function em_block_faq_accordion_content($attributes)
    {
        $faqs = $attributes['faqs'] ?? [];
        ob_start();
        ?>
        <section class="em-faq-accordion">
            <?php foreach ($faqs as $faq) : ?>
                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <?php echo esc_html($faq['question']); ?>
                    </button>
                    <div class="faq-answer" hidden>
                        <?php echo esc_html($faq['answer']); ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </section>
        <?php
        return ob_get_clean();
    }

    // Register the block type using build folder and set render callback
    public function em_block_faq_accordion_init()
    {
        register_block_type(
            dirname(__DIR__, 2) . '/build/faq-accordion',
            [
                'render_callback' => [$this, 'em_block_faq_accordion_content']
            ]
        );
    }
}
