'use client';
import { useEffect } from 'react';

export default function BlogClient(){
  useEffect(()=>{
    const posts = Array.from(document.querySelectorAll('#posts article'));
    const qEl = document.getElementById('q');
    const statusEl = document.getElementById('filter-status');
    const filters = Array.from(document.querySelectorAll('#filters [data-filter]'));

    let active = 'All';
    function apply(){
      const term = (qEl?.value || '').trim().toLowerCase();
      const matches = posts.filter(p=>{
        const cat = (p.getAttribute('data-cat')||'');
        const title = (p.getAttribute('data-title')||'').toLowerCase();
        const okCat = active==='All' || cat===active;
        const okTerm = !term || title.includes(term);
        p.style.display = (okCat && okTerm) ? '' : 'none';
        return okCat && okTerm;
      }).length;
      if(statusEl) statusEl.textContent = `${matches} articles shown`;
    }

    filters.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        active = btn.getAttribute('data-filter')||'All';
        filters.forEach(b=>{
          const on = b===btn;
          b.classList.toggle('vk-outline', on);
          b.setAttribute('aria-checked', String(on));
          b.tabIndex = on ? 0 : -1;
        });
        apply();
      });
    });

    qEl?.addEventListener('input', apply);
    apply();

    // Pause ticker on Space/Focus for accessibility if present
    const ticker = document.querySelector('[data-ticker]');
    if(ticker){
      let paused = false;
      const onKey = (e)=>{
        if(e.code==='Space'){
          e.preventDefault(); paused = !paused;
          ticker.style.animationPlayState = paused ? 'paused' : 'running';
        }
      };
      ticker.addEventListener('keydown', onKey);
      return () => ticker.removeEventListener('keydown', onKey);
    }
  },[]);
  return null;
}
