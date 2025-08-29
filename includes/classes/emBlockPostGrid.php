<?php

/**
 * Main plugin class for EM Posts Grid.
 * PHP version 7.3+
 *
 * @category Wordpress_Plugin
 * @package  Esmond-M
 * @author   Esmond Mccain <esmondmccain@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.en.html GNU General Public License
 * @link     esmondmccain.com
 */

declare(strict_types=1);
namespace emBlockPostGrid;

class emBlockPostGrid
{
    /**
     * Constructor: sets up hooks.
     */
    public function __construct()
    {
        add_action('init', [$this, 'em_block_posts_grid_block_init']);
        add_action('rest_api_init', [$this, 'register_rest_images']);
    }

    /**
     * Register custom REST field for featured image URL.
     */
    public function register_rest_images()
    {
        register_rest_field(
            ['post'],
            'fimg_url',
            [
                'get_callback'    => [$this, 'get_rest_featured_image'],
                'update_callback' => null,
                'schema'          => null,
            ]
        );
    }

    /**
     * Get featured image URL for REST API.
     */
    public function get_rest_featured_image($object, $field_name, $request)
    {
        if ($object['featured_media']) {
            $img = wp_get_attachment_image_src($object['featured_media'], 'app-thumb');
            return $img[0];
        }
        return false;
    }

    /**
     * Render block content for posts grid.
     */
    public function em_block_posts_grid_content($attributes)
    {
        $args = [
            'post_type'        => $attributes['postType'],
            'posts_per_page'   => $attributes['postsToShow'],
            'post_status'      => 'publish',
            'order'            => $attributes['order'],
            'orderby'          => $attributes['orderBy'],
            'suppress_filters' => false,
        ];

        if (isset($attributes['categories'])) {
            $args['category'] = $attributes['categories'];
        }

        $recent_posts = get_posts($args);
        $list_items_markup = '';
        $excerpt_length = $attributes['excerptLength'];

        foreach ($recent_posts as $post) {
            $title = get_the_title($post);
            $image_url = get_the_post_thumbnail_url($post);
            if (!$title) {
                $title = __('(no title)');
            }

            if (isset($attributes['displayFeaturedImage']) && $attributes['displayFeaturedImage'] === true) {
                if ($image_url) {
                    $list_items_markup .= sprintf(
                        '<li><img class="em-block-featured-img" src="%s" /><a href="%s">%s</a>',
                        esc_url($image_url),
                        esc_url(get_permalink($post)),
                        esc_html($title)
                    );
                } else {
                    $list_items_markup .= sprintf(
                        '<li><img class="em-block-featured-img" src="%s" /><a href="%s">%s</a>',
                        esc_url(plugin_dir_url(__DIR__) . '../assets/img/blog-placeholder.jpg'),
                        esc_url(get_permalink($post)),
                        esc_html($title)
                    );
                }
            } else {
                $list_items_markup .= sprintf(
                    '<li><a href="%s">%s</a>',
                    esc_url(get_permalink($post)),
                    esc_html($title)
                );
            }

            if (isset($attributes['displayPostDate']) && $attributes['displayPostDate']) {
                $list_items_markup .= sprintf(
                    '<time datetime="%s" class="em-block-latest-posts__post-date">%s</time>',
                    esc_attr(get_the_date('c', $post)),
                    esc_html(get_the_date('', $post))
                );
            }

            if (
                isset($attributes['displayPostContent']) && $attributes['displayPostContent'] &&
                isset($attributes['displayPostContentRadio']) && 'excerpt' === $attributes['displayPostContentRadio']
            ) {
                $post_excerpt = $post->post_excerpt ?: $post->post_content;
                $trimmed_excerpt = esc_html(wp_trim_words($post_excerpt, $excerpt_length, ' &hellip; '));

                $list_items_markup .= sprintf(
                    '<p class="em-block-latest-posts__post-excerpt">%s',
                    $trimmed_excerpt
                );

                if (strpos($trimmed_excerpt, ' &hellip; ') !== false) {
                    $list_items_markup .= sprintf(
                        '<a href="%s">%s</a></div>',
                        esc_url(get_permalink($post)),
                        __('Read more')
                    );
                } else {
                    $list_items_markup .= '</p>';
                }
            }

            if (
                isset($attributes['displayPostContent']) && $attributes['displayPostContent'] &&
                isset($attributes['displayPostContentRadio']) && 'full_post' === $attributes['displayPostContentRadio']
            ) {
                $list_items_markup .= sprintf(
                    '<div class="em-block-latest-posts__post-full-content">%s</div>',
                    wp_kses_post(html_entity_decode($post->post_content, ENT_QUOTES, get_option('blog_charset')))
                );
            }

            $list_items_markup .= "</li>\n";
        }

        $class = 'em-block-latest-posts em-block-latest-posts__list';
        if (isset($attributes['align'])) {
            $class .= ' align' . $attributes['align'];
        }
        if (isset($attributes['postLayout']) && 'grid' === $attributes['postLayout']) {
            $class .= ' is-grid';
        }
        if (isset($attributes['columns']) && 'grid' === $attributes['postLayout']) {
            $class .= ' columns-' . $attributes['columns'];
        }
        if (isset($attributes['displayPostDate']) && $attributes['displayPostDate']) {
            $class .= ' has-dates';
        }
        if (isset($attributes['className'])) {
            $class .= ' ' . $attributes['className'];
        }

        return sprintf(
            '<ul class="%s">%s</ul>',
            esc_attr($class),
            $list_items_markup
        );
    }

    /**
     * Registers the block using the metadata loaded from the `block.json` file.
     */
    public function em_block_posts_grid_block_init()
    {
        register_block_type(
            dirname(__DIR__, 2) . '/em-block-posts-grid/build/posts-grid',
            [
                'render_callback' => [$this, 'em_block_posts_grid_content']
            ]
        );
    }
}