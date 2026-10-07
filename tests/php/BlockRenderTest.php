<?php

declare(strict_types=1);

namespace EmBlockCollection\Tests;

use emBlockCollection\emBlockCtaBanner;
use emBlockCollection\emBlockFeatureCards;
use emBlockCollection\emBlockProcessSteps;
use emBlockCollection\emBlockTestimonial;
use PHPUnit\Framework\TestCase;

final class BlockRenderTest extends TestCase
{
    protected function setUp(): void
    {
        $GLOBALS['em_block_collection_test_hooks'] = [];
        $GLOBALS['em_block_collection_test_blocks'] = [];
    }

    /**
     * @dataProvider block_provider
     */
    public function test_registers_block_metadata(string $class_name, string $directory): void
    {
        $block = new $class_name();
        $block->register_block();

        self::assertCount(1, $GLOBALS['em_block_collection_test_blocks']);
        self::assertStringEndsWith(
            '/build/' . $directory,
            str_replace('\\', '/', $GLOBALS['em_block_collection_test_blocks'][0]['path'])
        );
        self::assertSame(
            [$block, 'render_block'],
            $GLOBALS['em_block_collection_test_blocks'][0]['settings']['render_callback']
        );
    }

    public function test_cta_banner_escapes_content_and_renders_actions(): void
    {
        $block = new emBlockCtaBanner();
        $markup = $block->render_block(
            [
                'heading' => '<script>Unsafe</script>',
                'content' => 'A useful next step.',
                'primaryLabel' => 'Contact us',
                'primaryUrl' => 'https://example.test/contact?ref=cta&source=test',
                'layout' => 'full-width',
            ]
        );

        self::assertStringContainsString('is-layout-full-width', $markup);
        self::assertStringContainsString('&lt;script&gt;Unsafe&lt;/script&gt;', $markup);
        self::assertStringContainsString('Contact us', $markup);
        self::assertStringContainsString('ref=cta&amp;source=test', $markup);
    }

    public function test_feature_cards_limits_columns_and_escapes_card_content(): void
    {
        $block = new emBlockFeatureCards();
        $markup = $block->render_block(
            [
                'columns' => 4,
                'items' => [
                    [
                        'icon' => '01',
                        'title' => '<strong>Strategy</strong>',
                        'content' => 'A focused plan.',
                    ],
                ],
            ]
        );

        self::assertStringContainsString('columns-3', $markup);
        self::assertStringContainsString('&lt;strong&gt;Strategy&lt;/strong&gt;', $markup);
        self::assertSame(1, substr_count($markup, 'em-feature-cards__card'));
    }

    public function test_process_steps_uses_an_ordered_list(): void
    {
        $block = new emBlockProcessSteps();
        $markup = $block->render_block(
            [
                'heading' => 'Our process',
                'steps' => [
                    ['title' => 'Discover', 'content' => 'Start with goals.'],
                    ['title' => 'Deliver', 'content' => 'Ship with confidence.'],
                ],
            ]
        );

        self::assertStringContainsString('<ol class="em-process-steps__list">', $markup);
        self::assertSame(2, substr_count($markup, '<li class="em-process-steps__item">'));
    }

    public function test_testimonial_renders_optional_portrait_and_inline_layout(): void
    {
        $block = new emBlockTestimonial();
        $markup = $block->render_block(
            [
                'quote' => 'A thoughtful partnership.',
                'name' => 'Taylor Example',
                'role' => 'Director',
                'imageUrl' => 'https://example.test/taylor.jpg',
                'imageAlt' => 'Taylor Example',
                'layout' => 'inline',
            ]
        );

        self::assertStringContainsString('is-layout-inline', $markup);
        self::assertStringContainsString('<blockquote', $markup);
        self::assertStringContainsString('alt="Taylor Example"', $markup);
    }

    public static function block_provider(): array
    {
        return [
            'CTA Banner' => [emBlockCtaBanner::class, 'cta-banner'],
            'Feature Cards' => [emBlockFeatureCards::class, 'feature-cards'],
            'Process Steps' => [emBlockProcessSteps::class, 'process-steps'],
            'Testimonial' => [emBlockTestimonial::class, 'testimonial'],
        ];
    }
}