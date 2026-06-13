'use client';
import { useEffect } from 'react';

export default function UseCasesClient(){
  useEffect(()=>{
    const grid = document.getElementById('uc-grid');
    const items = Array.from(grid?.querySelectorAll('article')||[]);
    const filters = Array.from(document.querySelectorAll('#uc-filters [data-filter]'));
    let active = 'All';
    function apply(){
      items.forEach(it=>{
        const cat = it.getAttribute('data-cat')||'';
        it.style.display = (active==='All' || active===cat) ? '' : 'none';
      });
    }
    filters.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        active = btn.getAttribute('data-filter')||'All';
        filters.forEach(b=>{
          const on = b===btn; b.classList.toggle('vk-outline', on); b.setAttribute('aria-checked', String(on)); b.tabIndex = on?0:-1;
        });
        apply();
      });
    });
    apply();
  },[]);
  return null;
}
