<?php

declare(strict_types=1);
namespace emBlockFaqAccordion;

class emBlockFaqAccordion
{
    public function __construct()
    {
        add_action('init', [$this, 'em_block_faq_accordion_init']);
    }

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

    public function em_block_faq_accordion_init()
    {
        register_block_type(
            dirname(__DIR__, 2) . '/src',
            [
                'render_callback' => [$this, 'em_block_faq_accordion_content']
            ]
        );
    }
}
