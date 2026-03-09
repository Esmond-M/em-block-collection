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
namespace emBlockCollection;

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
        $attributes = wp_parse_args($attributes ?? [], [
            'postType'                => 'post',
            'postsToShow'             => 5,
            'order'                   => 'desc',
            'orderBy'                 => 'date',
            'displayFeaturedImage'    => false,
            'displayPostDate'         => false,
            'displayPostContent'      => false,
            'displayPostContentRadio' => 'excerpt',
            'excerptLength'           => 55,
            'postLayout'              => 'list',
            'columns'                 => 3,
            'categories'              => null,
            'align'                   => '',
            'className'               => '',
        ]);

        $args = [
            'post_type'        => sanitize_key($attributes['postType']),
            'posts_per_page'   => max(1, (int) $attributes['postsToShow']),
            'post_status'      => 'publish',
            'order'            => strtoupper($attributes['order']) === 'ASC' ? 'ASC' : 'DESC',
            'orderby'          => sanitize_key($attributes['orderBy']),
            'suppress_filters' => false,
        ];

        if (!empty($attributes['categories'])) {
            $args['category'] = $attributes['categories'];
        }

        $recent_posts = get_posts($args);
        $list_items_markup = '';
        $excerpt_length = (int) $attributes['excerptLength'];

        foreach ($recent_posts as $post) {
            $title     = get_the_title($post) ?: __('(no title)', 'em-block-collection');
            $image_url = get_the_post_thumbnail_url($post);
            $post_url  = esc_url(get_permalink($post));

            $list_items_markup .= "<li>\n<article class=\"pg-card\">\n";

            // Featured image
            if ( ! empty( $attributes['displayFeaturedImage'] ) ) {
                $src = $image_url
                    ? esc_url( $image_url )
                    : esc_url( plugin_dir_url( __DIR__ ) . '../assets/img/blog-placeholder.jpg' );
                $list_items_markup .= sprintf(
                    '<a class="pg-card__media" href="%1$s" tabindex="-1" aria-hidden="true">' .
                    '<img src="%2$s" alt="%3$s" loading="lazy" /></a>',
                    $post_url,
                    $src,
                    esc_attr( $title )
                );
            }

            $list_items_markup .= "<div class=\"pg-card__body\">\n";
            $list_items_markup .= sprintf(
                '<h3 class="pg-card__title"><a href="%s">%s</a></h3>',
                $post_url,
                esc_html( $title )
            );

            // Date
            if ( ! empty( $attributes['displayPostDate'] ) ) {
                $list_items_markup .= sprintf(
                    '<time class="pg-card__date" datetime="%s">%s</time>',
                    esc_attr( get_the_date( 'c', $post ) ),
                    esc_html( get_the_date( '', $post ) )
                );
            }

            // Excerpt
            if ( ! empty( $attributes['displayPostContent'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {
                $raw_excerpt = $post->post_excerpt ?: $post->post_content;
                $trimmed     = wp_trim_words( $raw_excerpt, $excerpt_length, '&hellip;' );
                $list_items_markup .= '<p class="pg-card__excerpt">' . esc_html( $trimmed ) . '</p>';
                $list_items_markup .= sprintf(
                    '<a class="pg-card__link" href="%s">%s</a>',
                    $post_url,
                    esc_html__( 'Read more', 'em-block-collection' )
                );
            }

            // Full content
            if ( ! empty( $attributes['displayPostContent'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {
                $list_items_markup .= sprintf(
                    '<div class="pg-card__excerpt">%s</div>',
                    wp_kses_post( html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) ) )
                );
            }

            $list_items_markup .= "</div>\n</article>\n</li>\n";
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
            dirname(__DIR__, 2) . '/build/posts-grid',
            [
                'render_callback' => [$this, 'em_block_posts_grid_content']
            ]
        );
    }
}