/*
	
	QS Manager v2.7 - 2014
	
*/

var qsManager = {
	hash:window.location.hash, 
	query:window.location.search,
	url:window.location.href,
	gdata: function(){
		return sessionStorage.qs_manager;
	},
	sdata: function(data){
		sessionStorage.qs_manager = data;
	},
	history: function(url){
		var state = {"qsManager": true};
		history.pushState(state, "", url);
	},
	qto: function queryToObj(qs){
		var qo = {};
		
		if(qs != '' && qs != null && qs != undefined){
			var qa = qs.substring(qs.indexOf("?")+1,qs.length+1).split("&"), qt, qst;
			
			for(var i=0; i<qa.length; i++){
				qt = qa[i].split("=");
				qst = qt[1].split(",");
				qo[qt[0]] = qst;
			}
		}
		return qo;
	},
	otq: function objToQuery(obj){
		var qs = '';
		
		if(obj != '' && obj != null && obj != undefined){
			for(var i in obj){
				if(obj.hasOwnProperty(i))
					qs += (qs.length == 0) ? '?'+i+'='+obj[i] : '&'+i+'='+obj[i];
			}
		}
		return qs;
	},
	mput: function(prop, param, remove, history){
		var q = this.qto(this.gdata()), url = this.url.replace(this.hash, ''), rUrl;
				prop = prop.split('|'),
				param = param.split('|');
		
		if(remove == undefined)
			remove = true;
				
		for(var i=0; i<prop.length; i++){
			if(q[prop[i]] != undefined){
				sParam = param[i].split(",");
				for(var j=0; j<sParam.length; j++){
					if(q[prop[i]].indexOf(sParam[j]) != -1){
						if(remove)
							q[prop[i]].splice(q[prop[i]].indexOf(sParam[j]), 1);
							
						if(q[prop[i]] == '')
							delete q[prop[i]];
					}else{
						q[prop[i]].push(sParam[j]);
					}
				}
			}else{
				q[prop[i]] = param[i];
			}
		}
		
		url = (this.query == '') ? url+this.otq(q)+this.hash : url.replace(this.query, this.otq(q))+this.hash;
		
		this.sdata(this.otq(q));
		
		if(history)
			this.history(url);
		else
			window.location = url;
	},
	put: function(prop, param, remove, history) {
		var q = this.qto(this.gdata()), url = this.url.replace(this.hash, '');
				prop = prop.split('|'),
				param = param.split('|');
		
		if(remove == undefined)
			remove = true;
		
		for(var i=0; i<prop.length; i++){
			if(q[prop[i]] != undefined && q[prop[i]] == param[i] && remove)
					delete q[prop[i]];
			else
				q[prop[i]] = param[i];
		}
		console.log(q);
		url = (this.query == '') ? url+this.otq(q)+this.hash : url.replace(this.query, this.otq(q))+this.hash;
		
		this.sdata(this.otq(q));
		
		if(history)
			this.history(url);
		else
			window.location = url;
	},
	get: function(prop, string, obj) {
		var str = (string == undefined || string == null || !string) ? this.gdata() : string,
				q = this.qto(str.substring(str.indexOf("?"), str.length)), sep, objLen = 0;
		prop = prop.split('|');
		
		result = (obj) ? {} : '';
		
		for(var e in q)
			objLen++;
			
		for(var i=0; i<prop.length; i++){
			sep = (i == 0 || objLen < 2) ? '' : '|';

			if(q[prop[i]] != undefined){
				if(obj)
					result[prop[i]] = q[prop[i]];
				else
					result += sep+q[prop[i]].toString();
				
			}
		}

		return (obj) ? result : decodeURIComponent(result);
	},
	remove: function(prop, history){
		var q = this.qto(this.gdata()), url = this.url.replace(this.hash, '');
		prop = prop.split('|');
		
		for(var i=0; i<prop.length; i++){
			if(q[prop[i]] != undefined)
				delete q[prop[i]];
		}
		
		url = (this.query == '') ? url+this.otq(q)+this.hash : url.replace(this.query, this.otq(q))+this.hash;
		
		this.sdata(this.otq(q));
		
		if(history)
			this.history(url);
		else
			window.location = url;
	}
};
qsManager.sdata(qsManager.query);