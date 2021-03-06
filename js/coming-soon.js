(function($) {
  "use strict"; // Start of use strict
  $(window).bind('hashchange', detectLanguage);
  detectLanguage();

  function detectLanguage(){
    // detect browser language or url-hash
    var hash = window.location.hash && window.location.hash.substring(1);
    var lang = (hash || navigator.language || navigator.browserLanguage).split('-')[0];
    var langs = ["en", "ru"];

    if (!langs.includes(lang)) {
      lang = "en"; // default;
    }

    // setup hash-languagge
    window.location.hash = lang;
    updateContent(lang);
  }

  function updateContent(lang){
    $.getJSON(`/data/${lang}.json`, function(a) {
    var html = `<div class="masthead-content text-white py-5 py-md-0">
              <h1 class="mb-3">${a.title}</h1>
              <p class="mb-5">${a.content}</p>
              <div class="input-group input-group-newsletter">
                <input type="email" class="form-control" placeholder="${a.emailPlaceholder}" aria-label="${a.emailPlaceholder}" aria-describedby="basic-addon">
                <div class="input-group-append">
                  <button class="btn btn-secondary" type="button">${a.notifyMe}</button>
                </div>
              </div>
            </div>`;
      $('#content').html(html);
    });
  }

  $('.dropdown-menu a').click(function () {
    $('#selected').html($(this).html());
  });

  $(".dropdown .dropdown-menu a")[0].click();

})(jQuery); // End of use strict
