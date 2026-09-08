/* Theme: follows OS preference by default. Manual toggle overrides and is persisted. */
(function(){
  var root=document.documentElement;
  var saved=localStorage.getItem('theme');
  var osDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches;
  root.dataset.theme=(saved==='dark'||saved==='light')?saved:(osDark?'dark':'light');
  function icon(){return root.dataset.theme==='dark'?'☀':'🌙';}
  function build(){
    var b=document.querySelector('[data-theme-toggle]');
    if(!b){
      b=document.createElement('button');
      b.setAttribute('data-theme-toggle','');
      var host=document.querySelector('.lang')||document.querySelector('.nav')||document.body;
      host.parentNode?host.parentNode.insertBefore(b,host):host.appendChild(b);
    }
    b.type='button';
    b.className='themetog';
    b.setAttribute('aria-label','Toggle dark mode');
    b.textContent=icon();
    b.onclick=function(){
      root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
      localStorage.setItem('theme',root.dataset.theme);
      b.textContent=icon();
    };
  }
  if(document.readyState!=='loading')build();else document.addEventListener('DOMContentLoaded',build);
})();

/* Cookie consent banner — required for AdSense GDPR compliance */
(function(){
  try{if(localStorage.getItem('cookieConsent'))return;}catch(e){return;}
  document.addEventListener('DOMContentLoaded',function(){
    var bar=document.createElement('div');
    bar.id='cookieConsent';
    bar.setAttribute('role','dialog');
    bar.setAttribute('aria-label','Cookie consent');
    bar.innerHTML=
      '<p style="margin:0 0 10px">This site uses cookies from Google to deliver and enhance the quality of its services and to analyse traffic. '+
      '<a href="/cookie-policy">Learn more</a>.</p>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
      '<button id="ccAccept" style="background:var(--brand);color:#fff;border:none;padding:9px 20px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px">Accept</button>'+
      '<button id="ccReject" style="background:transparent;color:var(--soft);border:1.5px solid var(--line);padding:9px 20px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px">Reject non-essential</button>'+
      '</div>';
    bar.style.cssText='position:fixed;bottom:0;left:0;right:0;background:var(--card);border-top:1px solid var(--line);'+
      'padding:18px clamp(16px,4vw,40px);font-size:14px;color:var(--ink);z-index:9999;box-shadow:0 -4px 20px rgba(0,0,0,.08)';
    document.body.appendChild(bar);
    document.getElementById('ccAccept').onclick=function(){
      try{localStorage.setItem('cookieConsent','accepted');}catch(e){}bar.remove();
    };
    document.getElementById('ccReject').onclick=function(){
      try{localStorage.setItem('cookieConsent','rejected');}catch(e){}bar.remove();
      document.querySelectorAll('script[src*="adsbygoogle"]').forEach(function(s){s.remove();});
    };
  });
})();
