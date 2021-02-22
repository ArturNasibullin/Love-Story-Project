<?php
/**
 * webjam functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package webjam
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'webjam_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function webjam_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on webjam, use a find and replace
		 * to change 'webjam' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'webjam', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'head_menu' => 'Шапка сайта',
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'webjam_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'webjam_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function webjam_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'webjam_content_width', 640 );
}
add_action( 'after_setup_theme', 'webjam_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function webjam_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'webjam' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'webjam' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'webjam_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function webjam_scripts() {

	// wp_enqueue_style( 'style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_enqueue_style( 'bootstrap-grid', get_template_directory_uri() . '/assets/css/libs/bootstrap-grid.min.css' );
	wp_enqueue_style( 'main', get_template_directory_uri() . '/assets/css/style.css' );
	wp_style_add_data( 'style', 'rtl', 'replace' );

	wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/js/main.js', array(), 1.0, true );
}
add_action( 'wp_enqueue_scripts', 'webjam_scripts' );



/* Custom styles, enqueued in the header */
function webjam_styles_footer() {
	if(is_page('main')){
		wp_enqueue_style( 'animate', get_template_directory_uri() . '/assets/css/libs/animate.min.css' );
	} else if(is_singular('portfolio')){
		wp_enqueue_style( 'splide', get_template_directory_uri() . '/assets/css/libs/splide.min.css' );
		wp_enqueue_style( 'splide-skyblue', get_template_directory_uri() . '/assets/css/libs/splide-skyblue.min.css' );
	}
}
add_action( 'wp_footer', 'webjam_styles_footer' );

/* Custom script, enqueued in the footer */

function enqueue_custom_js() {
	if(is_singular('portfolio')){
		wp_enqueue_script('portfolio', get_stylesheet_directory_uri().'/assets/js/slider.js', 
		array(), false, true);
		wp_enqueue_script('slider', 'https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js', 
		array(), false, true);
	} else if(is_page('main')){
		wp_enqueue_script('libs', get_stylesheet_directory_uri().'/assets/js/libs.min.js', 
		array(), false, true);
		wp_enqueue_script('parallaxie', get_stylesheet_directory_uri().'/assets/js/myParallaxie.js', 
		array(), false, true);
	}
}
add_action('wp_enqueue_scripts', 'enqueue_custom_js');


//jQuery
function off_jquery_register() {
	if ( !is_admin() ) {
		wp_deregister_script( 'jquery' );
	}
}
add_action( 'init', 'off_jquery_register' );


function my_deregister_styles_and_scripts() {
	wp_dequeue_style('wp-block-library');
}
add_action( 'wp_print_styles', 'my_deregister_styles_and_scripts', 100 );


/*  ##################################
Clean Head
################################## */

remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_post_rel_link_wp_head', 10, 0);
// REMOVE EMOJI ICONS
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
// removes oembed discorvery link
remove_action('wp_head','rest_output_link_wp_head');
remove_action('wp_head','wp_oembed_add_discovery_links', 10 );
remove_action('wp_head','wp_oembed_add_host_js');
// remove meta rel=dns-prefetch href=//s.w.org
remove_action( 'wp_head', 'wp_resource_hints', 2 );
add_filter( 'show_recent_comments_widget_style', '__return_false', 99 );

function my_myme_types($mime_types){
	$mime_types['svg'] = 'image/svg+xml'; // поддержка SVG
	$mime_types['psd'] = 'image/vnd.adobe.photoshop'; // поддержка PSD
	return $mime_types;
}
add_filter('upload_mimes', 'my_myme_types', 1, 1);


add_action('init', 'my_custom_init');
function my_custom_init(){
	register_post_type('portfolio', array(
		'labels'             => array(
			'name'               => 'Портфолио', // Основное название типа записи
			'singular_name'      => 'Портфолио', // отдельное название записи типа Book
			'add_new'            => 'Добавить новую работу',
			'add_new_item'       => 'Добавить новую работу',
			'edit_item'          => 'Редактировать работу',
			'new_item'           => 'Новая работа',
			'view_item'          => 'Просмотреть работу',
			'search_items'       => 'Найти работу',
			'not_found'          => 'Работа не найдена',
			'not_found_in_trash' => '',
			'parent_item_colon'  => '',
			'menu_name'          => 'Портфолио'

		  ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'menu_icon'				=> 'dashicons-cover-image',
		'query_var'          => true,
		'rewrite'            => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 20,
		'supports'           => array('title','excerpt', 'thumbnail')
	) );
}


