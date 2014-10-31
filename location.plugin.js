/*
	
	Minus Location Plug-in v1.1 www.minus99.com - 2012
	
*/

var minusLoc = {
	put: function(type, param, prop) {
		var hash = window.location.hash, 
			query = window.location.search,
			url = window.location.href;

		if(type == '#'){
			window.location.hash = this.encoder(param);
		}else if(type == '?'){
			var a, b = false, sep = '&';
			url = url.replace(hash, ''),
			prop = prop.split('|'),
			param = param.split('|');
			
			a = (query != '') ? query.substring(query.indexOf("?")+1,query.length+1).split("&") : '';
			
			for(var e=0; e<prop.length; e++){
				if(query != ''){
					b = false;
					for(var i=0; i<a.length; i++){
						if(a[i].match("^"+prop[e]+"=")){
							b = true;
							url = url.replace(a[i], prop[e]+'='+param[e]);
						}
					}
				}else{
					sep = (query.match("^?")) ? '&' : '?';
				}
				
				if(!b) url = url+sep+prop[e]+'='+param[e];
			}
			
			window.location = url+hash;
		}
	},
	get: function(type, param, string) {
		var str = '', result = '';
		if(type == '#'){
			str = (window.location.hash).replace(/^#/, '');
		}else if(type == '?'){
			str = (string == undefined) ? window.location.search : string;
			str = str.substring(str.indexOf("?")+1,str.length).split("&");
			for(var i=0; i<str.length; i++){
				if(str[i].match("^"+param+"=")){
					result = str[i].replace(param+"=", "");
				}
			}
		}
		try{ return $.browser.mozilla ? result : decodeURIComponent(result); }
		catch (error){ return result; }
	},
	remove: function(type, prop){
		var query = window.location.search,
			url = window.location.href;
		if(type == '#'){
			window.location.hash = '';
		}else if(type == '?'){
			var a, b = false; 
			
			a = query.substring(query.indexOf("?")+1,query.length).split("&");
			for(var i=0; i<a.length; i++){
				if(a[i].match("^"+prop+"=")){
					b = a[i];
				}
			}
			
			if(b != false){
				var sep = url.substr((url.indexOf(prop)-1), 1),
					pre = (sep == '?') ? sep : '',
					suf = (url.indexOf("&") != -1 && sep == '?') ? '&' : '';

				url = url.replace(sep+b+suf, pre);

			}
			window.location = url;
		}
	},
	encoder: encodeURIComponent
};