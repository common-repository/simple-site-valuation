<?php
/**
Plugin Name: Simple Site Valuation
Description: Show site's value <a href="http://domof.com/domof.com.html">(by DomOf.com)</a>, Google page rank, and Alexa popularity, all into one badge.
Version: 1.4
Author: DSF
Author URI: http://domof.com
**/



// -----------------------------------------------------------------------------------------------------------------------------------------------------
/*
widget class : settings, form, display, update
*/
// -----------------------------------------------------------------------------------------------------------------------------------------------------
class SimpleBadge_Widget extends WP_Widget
{

	function SimpleBadge_Widget()
	{
		$widget_ops = array('classname' => 'SimpleBadge_Widget', 'description' => __( 'Domain Value Badge' ) );
		parent::WP_Widget(false, $name = 'Simple Site Valuation Badge', $widget_ops);
	}

	function widget($args, $instance)
	{
		extract( $args );

		$the_site = 'http://domof.com/';
		$the_blog = $this -> cleanUrl($instance['theWebPage']);

		$the_link = $the_site . $the_blog . '.html';
		$theImage = $the_site . $the_blog . '.png';

		$sml_imag = "\n" .
					'
						<img
							src="'.$theImage.'"
							width="250"
							height="100"
							alt="DomOf - seo analysis report for '.$the_blog.'"
							title="DomOf - website technical info for '.$the_blog.'"
							style="
									width:250px;
									height:auto;
									border:0;
									margin:0 auto;
									"
						/>
					'
					."\n";

		$sml_href = '<a href="'.$the_link.'" target="_blank">'.$sml_imag.'</a>';

		echo $before_widget;
		$output = '';

		if($instance['the_wrapps'] != '')
		{
			$output .= "\n";
			$output .= '<div class="site_valuation_badge" id = "div_'.$this->id.'">';
			$output .= "\n";
			echo $before_title;
			echo 'This website worth';
			echo $after_title;
		}

		$output .= $sml_href;

		if($instance['the_wrapps'] != '')
		{
			$output .= "\n";
			$output .=  '</div>';
			$output .= "\n";
		}
		
		echo $output;
		echo $after_widget; 
	}

	function update($new_instance, $old_instance)
	{
		return $new_instance;
	}

	function cleanUrl($url)
	{
		$url = trim($url);
		$url = urldecode(stripslashes($url));
		$url = str_replace("http://", "", $url);
		$url = str_replace("https://", "", $url);
		$url = str_replace("ftp://", "", $url);
		$url = explode("/", $url);
		$url = $url[0];
		return $url;
	}

	function form($instance)
	{
		$the_site = 'http://domof.com/';

		if ( trim($instance['theWebPage']) !== '' )
		{
			$the_blog = $this -> cleanUrl($instance['theWebPage']);
		}
		else
		{
			$the_blog = $_SERVER['HTTP_HOST'];
		}

		// start sample domains ;-)
		//$the_blog = 'domof.com';
		//$the_blog = 'latentstrength.com';
		// end sample domains

		$the_link = $the_site . $the_blog . '.html';
		$theImage = $the_site . $the_blog . '.png';
		$sml_imag = '
						<img
							src="'.$theImage.'"
							width="250"
							height="100"
							alt="'.$the_blog.' - website value estimation"
							title="'.$the_blog.' - website value estimation" border="0"
						/>
					';

		$the_fill = WP_PLUGIN_URL . '/simple-site-valuation/img/transparent.png';

		echo '<div style="padding:0; margin:0 0 15px 0;">';
			if (@getimagesize($theImage))
			{
				echo "<p>That's it, thanks.<br /><small>(250x100px image)</small></p>";
				echo '
						<div style="
									height:100px;
									background:#EEE url('.$the_fill.') repeat;
									overflow:hidden;
									padding:0;
									border-top:1px solid #DDD;
									border-bottom:1px solid #DDD;
									text-align:center;
								">
								'.$sml_imag.'
						</div>
					';
			}
			else
			{
				echo '<p>To initiate this badge please visit <a href="' . $the_link . '" target="_blank">this page</a> to make sure this domain/site is listed on domof.com ;-)</p>';
				echo '<i>... that should be all, just press "Save" below to preview your site\'s value</i>';
				echo '<p>&nbsp;</p>';
				echo '
						<div style="
									height:100px;
									background:#EEE url('.$the_fill.') repeat;
									overflow:hidden;
									padding:0;
									border-top:1px solid #DDD;
									border-bottom:1px solid #DDD;
									text-align:center;
								">
								<b>For now <br />there\'s no image/badge<br /> untill the above are met.</b><br /><br />please make sure<br />the domain name is filled right.
						</div>
					';
			}
		echo '</div>';


		$the_wrapps = esc_attr($instance['the_wrapps']);
		$theWebPage = esc_attr($instance['theWebPage']);
?>


<p>
	<input class="checkbox" type="checkbox" id="<?php echo $this->get_field_id('the_wrapps'); ?>" name="<?php echo $this->get_field_name('the_wrapps'); ?>" value="true" <?php if($the_wrapps == 'true'){echo 'checked="true"';} ?> /> <label for="<?php $this->get_field_id('the_wrapps'); ?>"> <?php echo _e('Use DIV as wrapper:'); ?></label>
</p>

<p>
	<label for="<?php $this->get_field_id('theWebPage'); ?>"> <?php echo _e('Your domain name is:'); ?></label>
    <input class="widefat" type="text" id="<?php echo $this->get_field_id('theWebPage'); ?>" name="<?php echo $this->get_field_name('theWebPage'); ?>" value="<?php echo $the_blog; ?>" />
</p>


<?php
	}

}



/*** Register widget. ***/
function SimpleBadge_load_widgets()
{
	register_widget( 'SimpleBadge_Widget' );
}

/*** Initiate all ***/
add_action('widgets_init', create_function('', 'return register_widget("SimpleBadge_Widget");'));
//------------------------------------------------------------------------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------------------------------------------------------------------
/*
article settings, form, display, update
*/
// -----------------------------------------------------------------------------------------------------------------------------------------------------
if ( ! defined( 'SIMPLESITEVALUATION_PLUGIN_DIR' ) )
	define( 'SIMPLESITEVALUATION_PLUGIN_DIR', WP_PLUGIN_DIR . '/' . plugin_basename( dirname( __FILE__ ) ) );

if ( ! defined( 'SIMPLESITEVALUATION_PLUGIN_URL' ) )
	define( 'SIMPLESITEVALUATION_PLUGIN_URL', WP_PLUGIN_URL . '/' . plugin_basename( dirname( __FILE__ ) ) );


// Register Button
function simpleSiteValuation_addbutton()
{
	if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') )
     return;
 
   if ( get_user_option('rich_editing') == 'true') {
    	add_filter("mce_external_plugins", "add_simpleSiteValuation_tinymce_plugin");
     	add_filter("mce_buttons", "register_simpleSiteValuation_button");
   }	
}

function register_simpleSiteValuation_button($buttons) 
{
   array_push($buttons, "separator", "simplebadgevaluation");
   return $buttons;
}

function add_simpleSiteValuation_tinymce_plugin($plugin_array)
{
   $plugin_array['simplebadgevaluation'] = SIMPLESITEVALUATION_PLUGIN_URL."/editor_plugin.js";
   return $plugin_array;
}

// Register with Wordpress
add_action('init', 'simpleSiteValuation_addbutton');


// -----------------------------------------------------------------------------------------------------------------------------------------------------
?>