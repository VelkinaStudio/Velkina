'use client';

import { useEffect } from 'react';

export default function RevealClient(){
  useEffect(()=>{
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(document.querySelectorAll('.reveal-on-scroll'));
    if(reduce){
      els.forEach(el=>el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      for(const e of entries){
        if(e.isIntersecting){
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    }, { root: null, threshold: 0.2 });
    els.forEach(el=>io.observe(el));
    return () => io.disconnect();
  },[]);
  return null;
}
