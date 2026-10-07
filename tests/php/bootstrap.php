<?php

declare(strict_types=1);

namespace {
    $GLOBALS['em_block_collection_test_hooks'] = [];
    $GLOBALS['em_block_collection_test_blocks'] = [];
}

namespace emBlockCollection {
    function add_action(string $hook, callable $callback): void
    {
        $GLOBALS['em_block_collection_test_hooks'][$hook][] = $callback;
    }

    function register_block_type(string $path, array $settings): void
    {
        $GLOBALS['em_block_collection_test_blocks'][] = [
            'path' => $path,
            'settings' => $settings,
        ];
    }

    function wp_parse_args(array $args, array $defaults): array
    {
        return array_merge($defaults, $args);
    }

    function __(string $text, string $text_domain): string
    {
        return $text;
    }

    function esc_html(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }

    function esc_attr(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }

    function esc_url(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }

    function get_block_wrapper_attributes(array $attributes = []): string
    {
        $class_name = 'wp-block-em-block-collection-test';

        if (!empty($attributes['class'])) {
            $class_name .= ' ' . $attributes['class'];
        }

        return 'class="' . esc_attr($class_name) . '"';
    }
}

namespace {
    require_once dirname(__DIR__, 2) . '/includes/classes/emBlockCtaBanner.php';
    require_once dirname(__DIR__, 2) . '/includes/classes/emBlockFeatureCards.php';
    require_once dirname(__DIR__, 2) . '/includes/classes/emBlockProcessSteps.php';
    require_once dirname(__DIR__, 2) . '/includes/classes/emBlockTestimonial.php';
}