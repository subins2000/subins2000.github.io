/**
 * Francium Disqus In Blogger Dynamic Views (DIBD) Plugin by Subin Siby [http://goo.gl/jPb8TR]
 * 2015-09-24
 */
(function(window){
  window.Fr = window.Fr || {};
  Fr.url = "", Fr.identifier = "";
  window.disqus_url = Fr.url;
  
  Fr.loadDisqus = function(){
    if($("#disqus_thread.subinsblogdisqus").length == 0 && $('.article-footer .share-controls').length != 0 && Fr.url != location.href){
      console.log("DIBD (Disqus In Blogger Dynamic views) : http://goo.gl/jPb8TR http://subinsb.com/how-to-integrate-disqus-into-blogger-dynamic-views");
      $('.article-footer .share-controls').after('<'+'div id="disqus_thread" class="subinsblogdisqus"><'+'/div><'+'a href="http://goo.gl/jPb8TR">Disqus for Blogger Dynamic views<'+'/a>');
      Fr.url = $(".article .title.entry-title:first a[href]").attr("href");
      Fr.url = Fr.url == "" || typeof Fr.url == "undefined" ? window.location.href : Fr.url;
      a = document.createElement('a'), a.href = Fr.url, Fr.identifier = a.pathname;
      
      window.disqus_url = Fr.url, window.disqus_identifier = Fr.identifier;
      DISQUS.reset({
        reload: true,
        config: function () {  
          this.page.identifier = Fr.identifier;
          this.page.url = Fr.url;
        }
      });
    }
  }
  
  $(document).ready(function(){
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    setInterval(function(){
      Fr.loadDisqus();
    }, 5000);
  });
})(window);
