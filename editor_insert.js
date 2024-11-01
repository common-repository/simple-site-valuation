function insert_badge()
{
	var theUrl = '';
	var thePng = '';
	var bakUrl = '';
	var nofolk = '';
	var target = '';
	var choice = '';

	if( tinyMCEPopup.editor.selection.getContent() != '' ){ choice = tinyMCEPopup.editor.selection.getContent(); }
	if( jQuery('#simpleBadge_nofollow:checked').length > 0 ){ nofolk = 'rel="nofollow"'; }
	if( jQuery('#simpleBadge_target').val() != '' ){ target = jQuery('#simpleBadge_target').val(); target = 'target="'+target+'"'; }

	theUrl = jQuery('#simpleBadge_link').val();
	theUrl = stripURL(theUrl);
	theUrl = cleanURL(theUrl);

	if( !this.urlCheck('http://'+theUrl) )
	{
		bakUrl = window.location.href;

		// start raw clean
		bakUrl = bakUrl.replace('http://','');
		bakUrl = bakUrl.replace('https://', '');
		bakUrl = bakUrl.replace('ftp://', '');
		bakUrl = bakUrl.split('/');
		bakUrl = bakUrl[0];
		bakUrl = bakUrl.split('?');
		bakUrl = bakUrl[0];
		// end raw clean

		bakUrl = stripURL(bakUrl);
		bakUrl = cleanURL(bakUrl);
		bakUrl = jQuery.trim( bakUrl );
		//alert('bad url'+'\n'+bakUrl);
		theUrl = 'http://domof.com/'+bakUrl+'.html';
		thePng = 'http://domof.com/'+bakUrl+'.png';
		//alert('fixed url'+'\n'+theUrl+'\n'+thePng);
	}
	else
	{
		bakUrl = theUrl;
		bakUrl = jQuery.trim( bakUrl );
		theUrl = 'http://domof.com/'+bakUrl+'.html';
		thePng = 'http://domof.com/'+bakUrl+'.png';
		//alert('good url'+'\n'+theUrl+'\n'+thePng);
	}

	var theImg = '';
	theImg = '<img ';
	theImg += 'src="';
	theImg += thePng;
	theImg += '" ';
	theImg += 'width="250"';
	theImg += ' ';
	theImg += 'height="100"';
	theImg += ' ';
	theImg += 'alt="DomOf.com - seo analysis report for '+bakUrl+'"';
	theImg += ' ';
	theImg += 'title="DomOf.com - website technical info for '+bakUrl+'"';
	theImg += ' ';
	theImg += 'border="0"';
	theImg += ' ';
	theImg += '/>';

	var theLnk = '';
	theLnk = '<a ';
	theLnk += 'href="';
	theLnk += theUrl;
	theLnk += '" ';
	theLnk += 'title="';
	theLnk += 'title here';
	theLnk += '" ';
	theLnk += nofolk;
	theLnk += ' ';
	theLnk += target;
	theLnk += ' >';
	theLnk += theImg;
	theLnk += '</a>';
	//theLnk += choice;

	if( bakUrl != 'localhost' )
	{
		tinyMCEPopup.editor.selection.setContent(theLnk);
	}
	else
	{
		alert('Sorry, this domain is not supported');
	}
}



// -----------------------------------------------------------------------------------------------------------------------------------------------------
// link fixer
// -----------------------------------------------------------------------------------------------------------------------------------------------------
		function urlCheck(whichlink)
		{
			var v = new RegExp();
			v.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
			if (!v.test(whichlink))
			{
				return false;
			}
			return true;
		}
		function stripURL(whichlink)
		{
			var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi; return whichlink.replace(regexp,"");
		}
		function cleanURL(whichlink)
		{
			// Decodes URL-encoded string 
			whichlink = decodeURIComponent(whichlink.replace(/\+/g, '%20'));

			whichlink = whichlink.toLowerCase();

			whichlink = whichlink.replace(/ /g,'');
			whichlink = whichlink.replace(/,/g,'');
			whichlink = whichlink.replace(/;/g,'');
			whichlink = whichlink.replace(/_/g,'');
			whichlink = whichlink.replace(/"/g,'');
			whichlink = whichlink.replace(/'/g,'');
			whichlink = whichlink.replace(/\?/g,'');
			whichlink = whichlink.replace(/=/g,'');

			whichlink = whichlink.replace("..",".");
			whichlink = whichlink.replace(new RegExp(/\\/g),'');
			whichlink = whichlink.replace(/\//g, "");
			whichlink = whichlink.replace(/\+/g, "");

			whichlink = whichlink.replace(/http:\./g,'');
			whichlink = whichlink.replace(/http:/g, '');
			whichlink = whichlink.replace(/https:/g, '');
			whichlink = whichlink.replace(/ftp:/g, '');

			var lastChr = '';
			// start remove characters ".html" ". html" ".htm" ". htm" from the end
			lastChr = whichlink.substring(whichlink.length - 5, whichlink.length);
			if( lastChr == '.html' ){whichlink = whichlink.substring(0, whichlink.length - lastChr.length); };
			lastChr = whichlink.substring(whichlink.length - 6, whichlink.length);
			if( lastChr == '. html' ){whichlink = whichlink.substring(0, whichlink.length - lastChr.length); };
			lastChr = whichlink.substring(whichlink.length - 4, whichlink.length);
			if( lastChr == '.htm' ){whichlink = whichlink.substring(0, whichlink.length - lastChr.length); };
			lastChr = whichlink.substring(whichlink.length - 5, whichlink.length);
			if( lastChr == '. htm' ){whichlink = whichlink.substring(0, whichlink.length - lastChr.length); };
			// end remove characters ".html" " .html" ".htm" " .htm" from the end
			// start remove last character if "."
			lastChr = whichlink.substring(whichlink.length - 1, whichlink.length);
			if( lastChr == '.' ){whichlink = whichlink.substring(0, whichlink.length - lastChr.length); };
			// end remove last character if "."

			// start raw clean
			whichlink = whichlink.split('/');
			whichlink = whichlink[0];
			whichlink = whichlink.split('?');
			whichlink = whichlink[0];
			// end raw clean

			return whichlink;
		}
// -----------------------------------------------------------------------------------------------------------------------------------------------------



tinyMCEPopup.onInit.add(function(ed) {
	var no_Url = 'please fill in one URL';
	var theUrl = '';

	if (ed.selection.getContent() != '')
	{
		theUrl = ed.selection.getContent();
		//alert('theUrl: '+theUrl);

		theUrl = stripURL(theUrl);
		theUrl = cleanURL(theUrl);

		//alert('theUrl: '+theUrl);
		if ( !this.urlCheck('http://'+theUrl) )
		{
			theUrl = no_Url;
			//alert('bad url');
		}
		else
		{
			theUrl = 'http://'+theUrl;
			//alert('good url'+'\n'+theUrl);
		}
	}
	else
	{
		theUrl = no_Url;
		//alert('empty selection');
	}

	jQuery('#simpleBadge_link').val(theUrl);

	jQuery('#insert').bind('click', function()
							{
								//alert('insert link');
								insert_badge();
								tinyMCEPopup.close();
							}
						);
	jQuery('#cancel').bind('click', function()
							{
								//alert('close link');
								tinyMCEPopup.close();
							}
						);

});