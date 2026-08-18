/* Shared trilingual (EN / EL / RU) engine for cyprussalary.com content pages.
   A page defines  window.T = { key:{en,el,ru}, ... }  and marks elements with
   data-i (innerHTML) or data-ph (placeholder). Language is remembered across
   pages via localStorage 'csLang' — the same key the calculators use. */
(function(){
  var LANGS = ['en','el','ru'];
  function apply(l){
    if(LANGS.indexOf(l) < 0) l = 'en';
    window.csLang = l;
    document.documentElement.lang = l;
    document.querySelectorAll('.lang button[data-lang]').forEach(function(b){
      b.classList.toggle('on', b.dataset.lang === l);
    });
    var T = window.T || {};
    document.querySelectorAll('[data-i]').forEach(function(el){
      var e = T[el.dataset.i]; if(e && e[l] != null) el.innerHTML = e[l]; else if(e && e.en != null) el.innerHTML = e.en;
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
  function init(){
    document.querySelectorAll('.lang button[data-lang]').forEach(function(b){
      b.addEventListener('click', function(){ apply(b.dataset.lang); });
    });
    apply(initial());
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
