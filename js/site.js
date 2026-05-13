// site-wide JS: active nav + dropdowns + product gallery tabs
(function(){
  function setActiveNav(){
    const links = document.querySelectorAll('.tabs .tab');
    const path = location.pathname.split('/').pop() || 'index.html';

    const productPages = ['produtos.html', 'producao.html'];
    const isProductPage = productPages.includes(path);

    links.forEach(link=>{
      const href = link.getAttribute('href');
      if(!href) return;
      const isActive = href === path || (href === 'index.html' && path === '');
      link.classList.toggle('active', isActive);
    });

    const productDropdown = document.querySelector('.tabs .dropdown');
    const productToggle = productDropdown?.querySelector('.tab-toggle');
    if(productToggle){
      productToggle.classList.toggle('active', isProductPage);
      productToggle.setAttribute('aria-expanded', isProductPage ? 'true' : 'false');
    }
  }

  function initDropdowns(){
    const dropdowns = Array.from(document.querySelectorAll('.tabs .dropdown'));
    if(!dropdowns.length) return;

    const closeAll = () => {
      dropdowns.forEach(dd=>{
        dd.classList.remove('open');
        const toggle = dd.querySelector('.tab-toggle');
        if(toggle) toggle.setAttribute('aria-expanded','false');
      });
    };

    document.addEventListener('click', (e)=>{
      if(!dropdowns.some(dd=>dd.contains(e.target))){
        closeAll();
      }
    });

    dropdowns.forEach(dd=>{
      const toggle = dd.querySelector('.tab-toggle');
      const menu = dd.querySelector('.dropdown-menu');
      if(!toggle || !menu) return;

      toggle.addEventListener('click', (e)=>{
        e.preventDefault();
        const isOpen = dd.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      menu.querySelectorAll('a').forEach(link=>{
        link.addEventListener('click', ()=> closeAll());
      });
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{
    setActiveNav();
    initDropdowns();

    // Gallery category-tab switching
    function initGallery(){
      const tabs = Array.from(document.querySelectorAll('.category-tabs .cat-btn'));
      const galleries = document.querySelectorAll('.gallery');
      const headingLabel = document.querySelector('.product-section .active-category');

      const updateHeading = (btn)=>{
        if(!headingLabel || !btn) return;
        const label = btn.querySelector('.label')?.textContent.trim() || btn.textContent.trim();
        headingLabel.textContent = label;
      };

      tabs.forEach(btn=>{
        btn.addEventListener('click',()=>{
          tabs.forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
          updateHeading(btn);

          const cat = btn.dataset.cat;
          galleries.forEach(g=>{
            if(cat==='all' || g.dataset.cat===cat) g.style.display='grid'; else g.style.display='none';
          });
        });
      });

      const initial = tabs.find(b=>b.classList.contains('active')) || tabs[0];
      if(initial) updateHeading(initial);
    }

    initGallery();

    // Back-to-top: show/hide and smooth scroll
    (function(){
      const toTop = document.querySelector('.to-top');
      if(!toTop) return;
      toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
      window.addEventListener('scroll',()=>{
        if(window.scrollY>300) toTop.style.display='flex'; else toTop.style.display='none';
      });
      toTop.style.display='none';
    })();

    // Marquee: duplica conteúdo para rolagem contínua e ajusta duração
    ( async function(){
      const marquee = document.querySelector('.clients-marquee');
      const track = marquee && marquee.querySelector('.marquee-track');
      const group = track && track.querySelector('.marquee-group');
      if(!marquee || !track || !group) return;

      const imgs = Array.from(group.querySelectorAll('img'));
      const loads = imgs.map(img => img.complete ? Promise.resolve() : new Promise(res => img.addEventListener('load', res, {once:true})));
      Promise.all(loads).then(()=>{
        const clone = group.cloneNode(true);
        clone.setAttribute('aria-hidden','true');
        track.appendChild(clone);

        const groupWidth = Math.max(1, group.getBoundingClientRect().width);
        track.style.setProperty('--marquee-distance', groupWidth + 'px');
        const speed = 60;
        const duration = Math.max(8, Math.round((groupWidth / speed) * 100) / 100);
        track.style.animationDuration = duration + 's';
        marquee.classList.add('ready');

        track.addEventListener('mouseenter', ()=> track.style.animationPlayState='paused');
        track.addEventListener('mouseleave', ()=> track.style.animationPlayState='running');
        track.addEventListener('focusin', ()=> track.style.animationPlayState='paused');
        track.addEventListener('focusout', ()=> track.style.animationPlayState='running');

        let resizeTimer;
        window.addEventListener('resize', ()=>{
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(()=>{
            const clones = track.querySelectorAll('.marquee-group');
            if(clones.length > 1) track.removeChild(clones[1]);
            const newWidth = Math.max(1, group.getBoundingClientRect().width);
            track.style.setProperty('--marquee-distance', newWidth + 'px');
            const newDuration = Math.max(8, Math.round((newWidth / speed) * 100) / 100);
            track.style.animationDuration = newDuration + 's';
            const newClone = group.cloneNode(true);
            newClone.setAttribute('aria-hidden','true');
            track.appendChild(newClone);
          }, 180);
        });
      });
    })();

    // Slider: auto-advance, pause on hover, controls and dots
    (function(){
      const slider = document.querySelector('.slider');
      if(!slider) return;
      const slides = Array.from(slider.querySelectorAll('.slide'));
      const dotsContainer = slider.querySelector('.dots');
      const prevBtn = slider.querySelector('.prev');
      const nextBtn = slider.querySelector('.next');
      let current = 0;
      let timer = null;
      const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      slides.forEach((s,i)=>{
        const d = document.createElement('button');
        d.className='dot';
        d.setAttribute('aria-label', 'Ir para slide ' + (i+1));
        d.setAttribute('role','tab');
        d.addEventListener('click', ()=>{ stop(); goTo(i); start(); });
        dotsContainer.appendChild(d);
      });

      const dots = Array.from(dotsContainer.children);
      function update(){
        slides.forEach((s,i)=> s.classList.toggle('active', i===current));
        dots.forEach((d,i)=> d.classList.toggle('active', i===current));
      }

      function goTo(n){ current = (n + slides.length) % slides.length; update(); }
      function next(){ goTo(current+1); }
      function prev(){ goTo(current-1); }

      function start(){ if(prefersReduce) return; stop(); timer = setInterval(next, 5000); }
      function stop(){ if(timer) { clearInterval(timer); timer = null; } }

      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);
      slider.addEventListener('focusin', stop);
      slider.addEventListener('focusout', start);
      prevBtn && prevBtn.addEventListener('click', ()=>{ stop(); prev(); start(); });
      nextBtn && nextBtn.addEventListener('click', ()=>{ stop(); next(); start(); });
      slider.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowLeft') { stop(); prev(); start(); }
        if(e.key === 'ArrowRight') { stop(); next(); start(); }
      });

      update();
      start();
    })();


			// highlight active nav link based on filename
			(function(){
				const links = document.querySelectorAll('.tabs .tab');
				const path = location.pathname.split('/').pop() || 'index.html';
				links.forEach(link=>{
					const href = link.getAttribute('href');
					if(!href) return;
					if(href === path || (href === 'index.html' && path === '')) link.classList.add('active'); else link.classList.remove('active');
				});
			})();

			// back to top
			const toTop = document.querySelector('.to-top');
			toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

			// show/hide to-top
			window.addEventListener('scroll',()=>{
				if(window.scrollY>300) toTop.style.display='flex'; else toTop.style.display='none';
			});
			// initial hide
			toTop.style.display='none';
		
				// Marquee: duplica conteúdo para rolagem contínua e ajusta duração
				(function(){
					const marquee = document.querySelector('.clients-marquee');
					const track = marquee && marquee.querySelector('.marquee-track');
					const group = track && track.querySelector('.marquee-group');
					if(!marquee || !track || !group) return;

					// wait for group images to load to measure correctly
					const imgs = Array.from(group.querySelectorAll('img'));
					const loads = imgs.map(img => img.complete ? Promise.resolve() : new Promise(res => img.addEventListener('load', res, {once:true})));
					Promise.all(loads).then(()=>{
						// clone group to create seamless loop
						const clone = group.cloneNode(true);
						clone.setAttribute('aria-hidden','true');
						track.appendChild(clone);

						// compute width of one group and set CSS var + duration
						const groupWidth = Math.max(1, group.getBoundingClientRect().width);
						track.style.setProperty('--marquee-distance', groupWidth + 'px');
						const speed = 60; // pixels per second, lower = slower
						const duration = Math.max(8, Math.round((groupWidth / speed) * 100) / 100);
						track.style.animationDuration = duration + 's';
						// reveal smoothly
						marquee.classList.add('ready');

						// pause/resume on interactions
						track.addEventListener('mouseenter', ()=> track.style.animationPlayState='paused');
						track.addEventListener('mouseleave', ()=> track.style.animationPlayState='running');
						track.addEventListener('focusin', ()=> track.style.animationPlayState='paused');
						track.addEventListener('focusout', ()=> track.style.animationPlayState='running');

						// recompute on resize
						let resizeTimer;
						window.addEventListener('resize', ()=>{
							clearTimeout(resizeTimer);
							resizeTimer = setTimeout(()=>{
								// remove existing clone(s)
								const clones = track.querySelectorAll('.marquee-group');
								if(clones.length > 1) track.removeChild(clones[1]);
								const newWidth = Math.max(1, group.getBoundingClientRect().width);
								track.style.setProperty('--marquee-distance', newWidth + 'px');
								const newDuration = Math.max(8, Math.round((newWidth / speed) * 100) / 100);
								track.style.animationDuration = newDuration + 's';
								const newClone = group.cloneNode(true);
								newClone.setAttribute('aria-hidden','true');
								track.appendChild(newClone);
							}, 180);
						});
					});
				})();
			
		// Slider: auto-advance, pause on hover, controls and dots
		(function(){
			const slider = document.querySelector('.slider');
			if(!slider) return;
			const slides = Array.from(slider.querySelectorAll('.slide'));
			const dotsContainer = slider.querySelector('.dots');
			const prevBtn = slider.querySelector('.prev');
			const nextBtn = slider.querySelector('.next');
			let current = 0;
			let timer = null;
			const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			// build dots
			slides.forEach((s,i)=>{
				const d = document.createElement('button');
				d.className='dot';
				d.setAttribute('aria-label', 'Ir para slide ' + (i+1));
				d.setAttribute('role','tab');
				d.addEventListener('click', ()=>{ stop(); goTo(i); start(); });
				dotsContainer.appendChild(d);
			});

			const dots = Array.from(dotsContainer.children);
			function update(){
				slides.forEach((s,i)=> s.classList.toggle('active', i===current));
				dots.forEach((d,i)=> d.classList.toggle('active', i===current));
			}

			function goTo(n){ current = (n + slides.length) % slides.length; update(); }
			function next(){ goTo(current+1); }
			function prev(){ goTo(current-1); }

			function start(){ if(prefersReduce) return; stop(); timer = setInterval(next, 5000); }
			function stop(){ if(timer) { clearInterval(timer); timer = null; } }

			// events
			slider.addEventListener('mouseenter', stop);
			slider.addEventListener('mouseleave', start);
			slider.addEventListener('focusin', stop);
			slider.addEventListener('focusout', start);
			prevBtn && prevBtn.addEventListener('click', ()=>{ stop(); prev(); start(); });
			nextBtn && nextBtn.addEventListener('click', ()=>{ stop(); next(); start(); });
			// keyboard
			slider.addEventListener('keydown', (e)=>{
				if(e.key === 'ArrowLeft') { stop(); prev(); start(); }
				if(e.key === 'ArrowRight') { stop(); next(); start(); }
			});

			// init
			update();
			start();
		})();
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);


  }); // end of DOMContentLoaded listener

if (location.pathname.includes('produtos.html')) {
  const CATEGORIAS = [
    {
      id: 'forjados',
      nome: 'Forjados',
      descricao: 'Peças forjadas a frio e meio quente para o setor automotivo, com excelente acabamento superficial e tolerâncias apertadas.',
      pecas: [
        { codigo: 'FRJ-001', nome: 'Pinhão Helicoidal', aplicacao: 'Caixa de transmissão — veículos leves', dimensoes: 'Ø 42 × 28 mm' },
        { codigo: 'FRJ-002', nome: 'Engrenagem Cilíndrica', aplicacao: 'Sistema de redução — caminhões', dimensoes: 'Ø 78 × 22 mm' },
        { codigo: 'FRJ-003', nome: 'Coroa Dentada', aplicacao: 'Diferencial — utilitários', dimensoes: 'Ø 120 × 35 mm' },
        { codigo: 'FRJ-004', nome: 'Cubo de Roda', aplicacao: 'Suspensão — veículos comerciais', dimensoes: 'Ø 95 × 60 mm' },
      ],
    },
    {
      id: 'tubulares',
      nome: 'Peças Tubulares',
      descricao: 'Tubulares forjados com paredes de espessura uniforme, ideais para componentes estruturais e de transmissão.',
      pecas: [
        { codigo: 'TUB-001', nome: 'Luveira Estriada', aplicacao: 'Eixo de transmissão — veículos pesados', dimensoes: 'Ø 38 × 110 mm' },
        { codigo: 'TUB-002', nome: 'Bucha Cilíndrica', aplicacao: 'Suspensão — automóveis', dimensoes: 'Ø 24 × 65 mm' },
        { codigo: 'TUB-003', nome: 'Segmento de Tubo', aplicacao: 'Sistema hidráulico — máquinas', dimensoes: 'Ø 56 × 180 mm' },
      ],
    },
    {
      id: 'eixos',
      nome: 'Eixos Forjados',
      descricao: 'Eixos forjados com fibragem orientada, garantindo resistência mecânica superior em aplicações de alta carga.',
      pecas: [
        { codigo: 'EIX-001', nome: 'Eixo Pinhão', aplicacao: 'Caixa diferencial — caminhões', dimensoes: 'Ø 32 × 240 mm' },
        { codigo: 'EIX-002', nome: 'Semi-Eixo', aplicacao: 'Tração traseira — utilitários', dimensoes: 'Ø 28 × 410 mm' },
        { codigo: 'EIX-003', nome: 'Eixo Estriado', aplicacao: 'Transmissão — veículos leves', dimensoes: 'Ø 22 × 180 mm' },
        { codigo: 'EIX-004', nome: 'Eixo Cardã', aplicacao: 'Linha motriz — caminhões médios', dimensoes: 'Ø 45 × 520 mm' },
      ],
    },
    {
      id: 'pinhoes',
      nome: 'Pinhões',
      descricao: 'Pinhões forjados a frio com geometria precisa, dispensando usinagem em muitos casos e reduzindo custo total.',
      pecas: [
        { codigo: 'PIN-001', nome: 'Pinhão Reto Z14', aplicacao: 'Partida elétrica — motores', dimensoes: 'Ø 28 × 18 mm' },
        { codigo: 'PIN-002', nome: 'Pinhão Cônico', aplicacao: 'Diferencial — utilitários', dimensoes: 'Ø 52 × 30 mm' },
        { codigo: 'PIN-003', nome: 'Pinhão Helicoidal Z18', aplicacao: 'Câmbio manual — automóveis', dimensoes: 'Ø 36 × 24 mm' },
      ],
    },
    {
      id: 'outros',
      nome: 'Outros Forjados',
      descricao: 'Linha completa de pinos, rolos, flanges e peças sob encomenda conforme desenho do cliente.',
      pecas: [
        { codigo: 'OUT-001', nome: 'Pino de Articulação', aplicacao: 'Suspensão — caminhões', dimensoes: 'Ø 18 × 90 mm' },
        { codigo: 'OUT-002', nome: 'Rolo Cilíndrico', aplicacao: 'Rolamentos especiais', dimensoes: 'Ø 24 × 48 mm' },
        { codigo: 'OUT-003', nome: 'Flange', aplicacao: 'Conexão de eixos', dimensoes: 'Ø 110 × 20 mm' },
        { codigo: 'OUT-004', nome: 'Bucha Especial', aplicacao: 'Sob desenho do cliente', dimensoes: 'Variável' },
      ],
    },
  ];

  const PROCESSO = [
    { num: '01', titulo: 'Recebimento', icon: 'recebimento', desc: 'Verificação rigorosa do aço fornecido conforme especificações.' },
    { num: '02', titulo: 'Análise', icon: 'analise', desc: 'Análise detalhada do material para detectar imperfeições.' },
    { num: '03', titulo: 'Aquecimento', icon: 'aquecimento', desc: 'Aquecimento controlado em fornos de última geração.' },
    { num: '04', titulo: 'Forjamento', icon: 'forjamento', desc: 'Forjamento a frio ou meio quente com matrizes de alta tecnologia.' },
    { num: '05', titulo: 'Resfriamento', icon: 'resfriamento', desc: 'Resfriamento gradual para preservar propriedades mecânicas.' },
    { num: '06', titulo: 'Usinagem', icon: 'usinagem', desc: 'Centros CNC para tolerâncias milesimais quando necessário.' },
    { num: '07', titulo: 'Acabamento', icon: 'acabamento', desc: 'Jateamento, polimento e tratamentos superficiais.' },
    { num: '08', titulo: 'Inspeção', icon: 'inspecao', desc: 'Inspeção dimensional, dureza e ensaios não destrutivos.' },
    { num: '09', titulo: 'Expedição', icon: 'expedicao', desc: 'Embalagem segura e logística controlada de entrega.' },
  ];

  const CATEGORY_ICONS = {
    forjados: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="40" cy="40" r="22"/><circle cx="40" cy="40" r="10"/><path d="M40 18v-6M40 68v-6M18 40h-6M68 40h-6M24.5 24.5l-4.2-4.2M59.7 59.7l-4.2-4.2M24.5 55.5l-4.2 4.2M59.7 20.3l-4.2 4.2"/></svg>',
    tubulares: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="40" cy="20" rx="22" ry="6"/><path d="M18 20v40a22 6 0 0 0 44 0V20"/><ellipse cx="40" cy="60" rx="22" ry="6"/><line x1="30" y1="22" x2="30" y2="58"/><line x1="50" y1="22" x2="50" y2="58"/></svg>',
    eixos: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="34" width="60" height="12" rx="1"/><rect x="14" y="28" width="6" height="24"/><rect x="60" y="28" width="6" height="24"/><line x1="26" y1="40" x2="54" y2="40" stroke-dasharray="2 3"/></svg>',
    pinhoes: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M40 14l3 4 5-1 1 5 5 2-2 5 4 4-4 4 2 5-5 2-1 5-5-1-3 4-3-4-5 1-1-5-5-2 2-5-4-4 4-4-2-5 5-2 1-5 5 1z"/><circle cx="40" cy="40" r="10"/><circle cx="40" cy="40" r="3"/></svg>',
    outros: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="18" y="22" width="20" height="36" rx="2"/><circle cx="55" cy="32" r="10"/><rect x="44" y="48" width="22" height="14" rx="2"/></svg>',
  };

  const PROCESSO_ICONS = {
    recebimento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16"/></svg>',
    analise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    aquecimento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    forjamento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6"/><path d="m16 16 4 4"/><path d="m19 21 2-2"/></svg>',
    resfriamento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 6-8 4-8-4"/><path d="m20 18-8-4-8 4"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m4 6 16 12"/><path d="M20 6 4 18"/></svg>',
    usinagem: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    acabamento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 9.5 8.5 3 9.3l4.8 4.7L6.4 21 12 17.8 17.6 21l-1.4-7 4.8-4.7-6.5-.8z"/></svg>',
    inspecao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    expedicao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  };

  const pad2 = (n) => String(n).padStart(2, '0');

  const catNav = document.getElementById('cat-nav');
  const catTitle = document.getElementById('cat-title');
  const catDesc = document.getElementById('cat-desc');
  const catCount = document.getElementById('cat-count');
  const pecasGrid = document.getElementById('pecas-grid');

  function renderCatNav(activeId) {
    catNav.innerHTML = '';
    CATEGORIAS.forEach((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cat-btn' + (c.id === activeId ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', c.id === activeId ? 'true' : 'false');
      btn.innerHTML = `<span class="icon">${CATEGORY_ICONS[c.id]}</span><span>${c.nome}</span><span class="count">${pad2(c.pecas.length)}</span>`;
      btn.addEventListener('click', () => selectCategory(c.id));
      catNav.appendChild(btn);
    });
  }

  function renderGrid(cat) {
    catTitle.textContent = cat.nome;
    catDesc.textContent = cat.descricao;
    catCount.textContent = `${cat.pecas.length} peças`;
    pecasGrid.innerHTML = '';
    cat.pecas.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'peca-card';
      const patternId = `grid-${cat.id}-${p.codigo}`;
      card.innerHTML = `
        <div class="peca-thumb">
          <svg class="grid-pattern" aria-hidden="true">
            <defs>
              <pattern id="${patternId}" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#${patternId})"/>
          </svg>
          <div class="silhouette" aria-hidden="true">${CATEGORY_ICONS[cat.id]}</div>
          <div class="id-tag">${p.codigo}</div>
        </div>
        <div class="peca-body">
          <h3>${p.nome}</h3>
          <div class="peca-spec"><span class="key">Aplicação</span><span class="val">${p.aplicacao}</span></div>
          <div class="peca-spec"><span class="key">Dimensões</span><span class="val mono">${p.dimensoes}</span></div>
        </div>
      `;
      pecasGrid.appendChild(card);
    });
  }

  function selectCategory(id) {
    const cat = CATEGORIAS.find((c) => c.id === id) || CATEGORIAS[0];
    renderCatNav(cat.id);
    renderGrid(cat);
  }

  function renderProcesso() {
    const wrap = document.getElementById('processo-cards');
    wrap.innerHTML = '';
    PROCESSO.forEach((step) => {
      const card = document.createElement('div');
      card.className = 'processo-card';
      card.innerHTML = `
        <div class="ico" aria-hidden="true">${PROCESSO_ICONS[step.icon]}</div>
        <div style="flex:1;min-width:0">
          <div class="head"><span class="num">${step.num}</span><span class="title">${step.titulo}</span></div>
          <p>${step.desc}</p>
        </div>
      `;
      wrap.appendChild(card);
    });
  }

  selectCategory(CATEGORIAS[0].id);
  renderProcesso();
}

})