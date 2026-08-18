/* Shared trilingual (EN / EL / RU) engine for cyprussalary.com content pages.
   A page defines  window.T = { key:{en,el,ru}, ... }  and marks elements with
   data-i (innerHTML) or data-ph (placeholder). The language <select class="lang">
   calls setLang() via its onchange. Language is remembered across pages via
   localStorage 'csLang' — the same key the calculators use. */
(function(){
  var LANGS = ['en','el','ru'];
  function apply(l){
    if(LANGS.indexOf(l) < 0) l = 'en';
    window.csLang = l;
    document.documentElement.lang = l;
    document.querySelectorAll('select.lang').forEach(function(s){ if(s.value !== l) s.value = l; });
    var T = window.T || {};
    document.querySelectorAll('[data-i]').forEach(function(el){
      var e = T[el.dataset.i]; if(e) el.innerHTML = (e[l] != null ? e[l] : e.en);
    });
    document.querySelectorAll('[data-ph]').forEach(function(el){
      var e = T[el.dataset.ph]; if(e && (e[l] != null || e.en != null)) el.setAttribute('placeholder', e[l] != null ? e[l] : e.en);
    });
    try{ localStorage.setItem('csLang', l); }catch(e){}
    if(typeof window.afterLang === 'function') window.afterLang(l);
  }
  window.setLang = apply;

  function initial(){
    var p = new URLSearchParams(location.search).get('lang');
    if(LANGS.indexOf(p) >= 0) return p;
    try{ var s = localStorage.getItem('csLang'); if(LANGS.indexOf(s) >= 0) return s; }catch(e){}
    return 'en';
  }
  function init(){ apply(initial()); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
