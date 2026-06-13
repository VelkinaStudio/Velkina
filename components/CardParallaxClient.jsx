'use client';

import { useEffect } from 'react';

export default function CardParallaxClient(){
  useEffect(()=>{
    const root = document.getElementById('services');
    if(!root) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if(prefersReduced || coarse) return;

    const cards = Array.from(root.querySelectorAll('.vk-card'));
    if(!cards.length) return;

    const onMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100; // 0..100
      const y = ((e.clientY - rect.top) / rect.height) * 100; // 0..100
      el.style.setProperty('--mx', `${x}%`);
      el.style.setProperty('--my', `${y}%`);
    };
    const onLeave = (e) => {
      const el = e.currentTarget;
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
    };

    cards.forEach(c=>{
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
    });

    return ()=>{
      cards.forEach(c=>{
        c.removeEventListener('mousemove', onMove);
        c.removeEventListener('mouseleave', onLeave);
      });
    };
  },[]);
  return null;
}
