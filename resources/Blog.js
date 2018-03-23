function Blog(listFile){

	window.blog = this;

	this.menu = $("#leftMenu ul");
	this.content = $("#mainContent");
	this.count = $("#count");

	window.onhashchange = this.loadArticle;

	if(listFile){
		this.setArticleListFile(listFile);
	}

	this.loadArticle();

};

Blog.prototype.setArticleListFile = function(file){
	this.articleListFile = file;
	this.loadArticleList();
};

Blog.prototype.loadArticleList = function(){
	$.getJSON(this.articleListFile ,function(data){
		blog.articles = data;
		blog.renderArticleMenu();
	});
};

Blog.prototype.renderArticleMenu = function(){
	var articles = this.articles;
	for(var i = 0; i < articles.length; i++){
		var section = blog.renderArticleMenuSection(articles[i]);
		$(blog.menu).append(section);
	}
};

Blog.prototype.renderArticleMenuSection = function(section){

	var submenu = $("<section>");

	var heading = $("<h3>").text(section.topic_title);
	heading.addClass("nav-section-header");
	heading.click( function(){
		$(this).parent().children("ul").toggle()
	});
	submenu.append(heading);

	var ul = $("<ul>");
	ul.addClass("nav nav-sub");
	for(var i = 0; i < section.articles.length; i++){
		ul.append(blog.renderArticleMenuItem(section.articles[i]));
	}

	submenu.append(ul);

	return submenu;
};

Blog.prototype.renderArticleMenuItem = function(article){
	var a = $("<a>");
	a.attr("href","#"+article.url);
	a.text(article.title);
	
	var li = $("<li>");
	li.append(a);

	return li;
};

Blog.prototype.loadArticle = function(){
	
	var hash = document.location.hash;
	var url = "";
	
	if(hash && hash.length > 1){
		url = hash.substring(1);
	}
	if(url.indexOf("//")>=0){
		url = url.split("//")[1];
	}
	if(!url){
		url = "files/home.html";
	}

	$.get(url,{"_":new Date().getTime()},function(data){
		blog.content.html(data);
		var count = $(blog.content).text().trim().split(/\s+/).length;
		$(blog.count).text(count);
	});
};
