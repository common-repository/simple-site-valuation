(function() {
	
	tinymce.create('tinymce.plugins.simpleSiteValuationPlugin', {

		getInfo : function()
		{
			return {
				longname	: 'Simple Site Valuation',
				author		: 'D.s.f.',
				authorurl	: 'http://domof.com',
				infourl		: 'http://domof.com/p/help.html',
				version		: tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},

		init : function(ed, url)
		{
			var t = this, cm;

			t.url = url;
			t.editor = ed;
			t.bimg = url+'/img/simple-site-valuation-logo.gif';
		},
		
		createControl: function(n, cm)
		{
			var t = this;

			if( n == 'simplebadgevaluation' )
			{
				var c = cm.createMenuButton('simplebadgevaluation', {
															title : 'Simple Site Valuation',
															image : t.bimg ,
															onclick : function()
																		{
																			var ed = t.editor;
																			var lk = t.url;
																			ed.windowManager.open({
																				url : lk+'/editor_popup.html',
																				width : 325,
																				height : 240,
																				inline: 1
																			});

																		}
														}
				);

				return c;
			}

			return null;
		},
				   
	});
	tinymce.PluginManager.add('simplebadgevaluation', tinymce.plugins.simpleSiteValuationPlugin);
})();