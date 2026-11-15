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
      '<p style="margin:0 0 10px">This site uses cookies for essential functionality (language/theme preferences and hosting security). '+
      '<a href="/cookie-policy">Learn more</a>.</p>'+
      '<button id="ccAccept" style="background:var(--brand);color:#fff;border:none;padding:9px 20px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px">OK</button>';
    bar.style.cssText='position:fixed;bottom:0;left:0;right:0;background:var(--card);border-top:1px solid var(--line);'+
      'padding:18px clamp(16px,4vw,40px);font-size:14px;color:var(--ink);z-index:9999;box-shadow:0 -4px 20px rgba(0,0,0,.08)';
    document.body.appendChild(bar);
    document.getElementById('ccAccept').onclick=function(){
      try{localStorage.setItem('cookieConsent','accepted');}catch(e){}bar.remove();
    };
  });
})();

/* ---------- AdSense ----------
   Activates every .adslot on the page. This lives in theme.js because it is the
   one script every page loads; guides do not load the app script. */
(function(){
  var CLIENT = 'ca-pub-4547647290394610';
  function run(){
    var slots = document.querySelectorAll('.adslot');
    if(!slots.length) return;
    if(!document.querySelector('script[src*="adsbygoogle.js"]')){
      var s = document.createElement('script');
      s.async = true; s.crossOrigin = 'anonymous';
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CLIENT;
      document.head.appendChild(s);
    }
    Array.prototype.forEach.call(slots, function(slot){
      if(slot.dataset.live) return;
      slot.dataset.live = '1'; slot.textContent = ''; slot.style.display = 'block';
      var ins = document.createElement('ins');
      ins.className = 'adsbygoogle'; ins.style.display = 'block'; ins.style.width = '100%';
      ins.setAttribute('data-ad-client', CLIENT);
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      slot.appendChild(ins);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
