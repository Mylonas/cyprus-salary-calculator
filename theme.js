/* Theme: light by default (ignores OS dark preference). Manual toggle, persisted. */
(function(){
  var root=document.documentElement;
  var saved=localStorage.getItem('theme');
  root.dataset.theme=(saved==='dark'||saved==='light')?saved:'light';
  function icon(){return root.dataset.theme==='dark'?'☀':'☾';}
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
