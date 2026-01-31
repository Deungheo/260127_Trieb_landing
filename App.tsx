
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Timer, Menu, X, CheckCircle, ArrowRight, Minus, Plus, ChevronDown, Star, Search, Filter, ThumbsUp, ChevronRight } from 'lucide-react';
import { Product } from './types';

const PRAXIS_DATA: Product = {
  id: 'praxis-01',
  name: 'Praxis',
  type: '신바이오틱스+',
  price: 54000,
  tagline: '장 건강의 미래가 이곳에 있습니다.',
  description: '당신의 마이크로바이옴을 위에서 아래까지 빈틈없이 케어하기 위해 설계된 임상 등급의 3-in-1 신바이오틱스입니다.',
  ingredients: [
    { name: '프리바이오틱스 15mg', source: '미국', location: 'Deerland', description: 'PreforPro® 기술 적용' },
    { name: '프로바이오틱스 11B CFU', source: '덴마크', location: 'Chr. Hansen', description: 'LGG® & BB-12® 균주' },
    { name: '포스트바이오틱스 300mg', source: '스페인', location: 'Sevilla', description: 'Tributyrin 함유' }
  ]
};

const MarqueeBanner = () => (
  <div className="bg-[#0047AB] text-white py-2 text-[10px] font-bold uppercase tracking-[0.2em] overflow-hidden whitespace-nowrap relative z-[110]">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="inline-block"
    >
      <span className="mx-8">첫 주문 한정: PRAXIS 25% 할인 혜택 <Timer className="w-3 h-3 inline ml-1" /></span>
      <span className="mx-8">임상 연구 완료 성분 사용 <CheckCircle className="w-3 h-3 inline ml-1" /></span>
      <span className="mx-8">첫 주문 한정: PRAXIS 25% 할인 혜택 <Timer className="w-3 h-3 inline ml-1" /></span>
      <span className="mx-8">임상 연구 완료 성분 사용 <CheckCircle className="w-3 h-3 inline ml-1" /></span>
    </motion.div>
  </div>
);

const Nav = ({ onOpenCart, cartCount }: { onOpenCart: () => void, cartCount: number }) => (
  <nav className="fixed top-0 left-0 right-0 z-[100]">
    <MarqueeBanner />
    <div className="h-16 bg-white/80 backdrop-blur-lg border-b border-[#E0F2FE] px-6 md:px-12 flex items-center justify-between">
      <div className="flex-1 hidden md:flex gap-8">
         <a href="#" className="text-xs font-bold text-[#0047AB] uppercase tracking-widest hover:text-blue-400">쇼핑</a>
         <a href="#" className="text-xs font-bold text-[#0047AB] uppercase tracking-widest hover:text-blue-400">과학</a>
      </div>
      <div className="md:hidden">
        <button className="p-2 hover:bg-[#F0F7FF] rounded-full transition-colors"><Menu className="w-5 h-5 text-[#0047AB]" /></button>
      </div>
      <div className="text-2xl font-black tracking-tighter text-[#0047AB] absolute left-1/2 -translate-x-1/2">TRIEB</div>
      <div className="flex-1 flex justify-end items-center gap-6">
        <a href="#" className="hidden md:block text-xs font-bold text-[#0047AB] uppercase tracking-widest hover:text-blue-400">브랜드 소개</a>
        <div className="flex items-center gap-4">
          <User className="w-5 h-5 text-[#0047AB] cursor-pointer" />
          <div onClick={onOpenCart} className="relative cursor-pointer group">
            <ShoppingBag className="w-5 h-5 text-[#0047AB] group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0047AB] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ onAddToCart }: { onAddToCart: () => void }) => (
  <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#E0F2FE_0%,#F0F9FF_100%)] opacity-100" />
    
    {/* Background Capsule Animation */}
    <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none">
       <motion.div
         animate={{ 
            rotateY: [-15, 15, -15],
            y: [-20, 20, -20]
         }}
         transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
         }}
         className="w-[80vw] max-w-[500px] opacity-90 perspective-1000"
       >
         <img 
            src="https://images.ctfassets.net/u9fvvze9asat/5xXpW4YxToxXqX9GvWlEwz/a2a3e6c38b2e35c8b3c3b4a2d3e4b5c6/Synbiotic_Product.png" 
            alt="Rotating Capsule" 
            className="w-full h-full object-contain drop-shadow-2xl" 
         />
       </motion.div>
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="max-w-4xl relative z-10"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-8 block">Next Generation Synbiotics</span>
      <h1 className="text-[12vw] md:text-[9rem] serif-italic text-[#0047AB] leading-[0.8] mb-12 select-none">Praxis</h1>
      <p className="text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed mb-12 text-[#102A43] px-4">
        불필요한 것은 덜어내고, 오직 임상 데이터가 증명하는 성분만을 담았습니다. <br className="hidden md:block" /> <strong>Trieb</strong>와 함께 시작하는 장 건강의 새로운 기준.
      </p>
      <button 
        onClick={onAddToCart}
        className="bg-[#0047AB] text-white px-10 py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.2em] shadow-xl hover:bg-blue-800 hover:-translate-y-1 transition-all"
      >
        지금 경험하기 — ₩54,000
      </button>
    </motion.div>
  </section>
);

const BenefitItem = ({ title, content, delay }: { title: string, content: string, delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative pl-12 mb-16 last:mb-0 group"
    >
      <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-[#E0F2FE] bg-white group-hover:border-[#0047AB] group-hover:scale-125 transition-all duration-500 z-10" />
      <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-[#0047AB] transition-colors">{title}</h3>
      <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
        {content}
      </p>
    </motion.div>
  );
};

const RitualBenefits = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="bg-white py-24 md:py-40">
      <div className="max-w-screen-xl mx-auto px-6 mb-24 md:mb-40">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="rounded-[2rem] overflow-hidden aspect-[4/5] bg-[#F0F7FF] relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Health Lifestyle" 
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-[#0047AB]/5 mix-blend-multiply" />
          </motion.div>
          
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-[#0047AB] serif-italic leading-tight"
            >
              Culture that moves you <br/>forward.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-slate-600 font-medium leading-relaxed"
            >
              우리는 장 건강에 대한 당신의 기준을 재정의합니다. <br/>
              과학적으로 설계된 싱글 네스티드 캡슐이 당신의 소화 시스템에 도달하는 순간, 진정한 변화가 시작됩니다.
            </motion.p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="max-w-4xl mx-auto px-6 relative">
        <div className="absolute left-6 md:left-[2.3rem] top-2 bottom-2 w-[2px] bg-[#E0F2FE]">
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-[#0047AB] origin-top" 
            style={{ scaleY: pathLength, height: '100%' }}
          />
        </div>
        
        <div className="ml-4 md:ml-12">
          <BenefitItem title="배변 활동 & 더부룩함 케어" content="임상 연구로 입증된 LGG® 및 BB-12® 균주가 규칙적인 배변 활동을 돕고 일상적인 가스 및 팽만감을 완화합니다." delay={0.1} />
          <BenefitItem title="유익균 성장 환경 조성" content="정밀 설계된 프리바이오틱스가 유해균의 성장을 억제하고 장내 유익균이 번성할 수 있는 최적의 환경을 조성합니다." delay={0.2} />
          <BenefitItem title="장벽 건강 강화" content="강력한 포스트바이오틱스 성분이 장벽 세포에 에너지를 공급하여 장 건강의 근본적인 방어력을 강화합니다." delay={0.3} />
          <BenefitItem title="기초 면역력 증진" content="면역 세포의 약 70%가 집중된 장을 케어함으로써 전반적인 신체 면역 시스템의 기초를 튼튼하게 다집니다." delay={0.4} />
        </div>
      </div>
      
      <div className="mt-32 border-y border-[#E0F2FE] py-12 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-12">
           {[
             { label: '임상 연구 완료', icon: '🔬' },
             { label: 'NON-GMO', icon: '🧬' },
             { label: '비건 친화적', icon: '🌱' },
             { label: '메이드 트레이서블', icon: '🗺️' }
           ].map((item, idx) => (
             <div key={idx} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <span className="text-xl grayscale">{item.icon}</span>
                {item.label}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

const IngredientFacts = () => {
  const sections = [
    {
      label: 'Prebiotics 15mg',
      title: 'PreforPro®',
      desc: 'PreforPro® 기술이 적용된 프리바이오틱스는 유익균의 먹이가 되어 장내 환경을 개선합니다. 15mg의 임상 용량을 함유하고 있습니다.',
      img: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=800'
    },
    {
      label: 'Probiotics 11B CFU',
      title: 'LGG® & BB-12®',
      desc: '세계적으로 가장 많이 연구된 두 가지 균주, LGG®와 BB-12®를 110억 마리(CFU) 담아 확실한 장 도달률과 효과를 보장합니다.',
      img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800'
    },
    {
      label: 'Postbiotic 300mg',
      title: 'Tributyrin',
      desc: '장 점막의 에너지원이 되는 부티르산을 공급하여 장벽을 튼튼하게 하고 면역 기능을 지원합니다.',
      img: 'https://images.unsplash.com/photo-1550577624-42f7424ed08b?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="bg-[#F0F7FF] py-40">
      <div className="max-w-4xl mx-auto px-6 text-center mb-32">
        <h2 className="text-5xl md:text-7xl font-bold text-[#0047AB] serif-italic mb-8">Traceable Ingredients</h2>
        <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Trieb Praxis는 성분의 원산지와 생산 과정을 투명하게 공개합니다. 내 몸에 들어가는 것이 무엇인지 정확히 확인하세요.
        </p>
        <button className="mt-8 text-[11px] font-black uppercase tracking-[0.3em] text-[#0047AB] flex items-center gap-2 mx-auto hover:gap-4 transition-all">
          영양 성분 정보 확인 <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-40">
        {sections.map((sec, i) => (
          <div key={i} className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`rounded-3xl overflow-hidden aspect-square bg-white shadow-xl ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <img src={sec.img} alt={sec.title} className="w-full h-full object-cover mix-blend-multiply opacity-80" />
            </motion.div>
            <div className={`space-y-6 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 block">{sec.label}</span>
               <h3 className="text-4xl md:text-5xl font-bold text-[#0047AB] serif-italic">{sec.title}</h3>
               <p className="text-lg text-slate-500 font-medium leading-relaxed">{sec.desc}</p>
               <div className="pt-4">
                  <button className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-[#0047AB] transition-colors ml-auto mr-auto md:ml-0 md:mr-0">
                    상세 정보 <ChevronDown className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const JournalSection = () => {
  const articles = [
    {
      category: 'SCIENCE',
      title: '프리바이오틱스 vs 프로바이오틱스: 무엇이 다른가요?',
      subtitle: '장 건강을 위한 두 가지 핵심 요소의 시너지 효과를 알아봅니다.*',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'SCIENCE',
      title: '포스트바이오틱스란 무엇인가? 장 건강의 새로운 열쇠',
      subtitle: '단순한 유산균을 넘어, 장벽 강화의 핵심인 포스트바이오틱스.*',
      img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="bg-white py-40">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-[#0047AB] serif-italic mb-20 tracking-tight">Trieb 저널</h2>
        <div className="grid md:grid-cols-2 gap-10 md:gap-20">
          {articles.map((article, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="group cursor-pointer">
              <div className="rounded-[2.5rem] overflow-hidden aspect-video bg-[#F0F7FF] mb-10 relative">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">{article.category}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors leading-tight">{article.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{article.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const reviews = [
    { name: '김지현 L.', date: '2026/01/27', rating: 5, title: '정말 만족해요!', body: '장 건강이 확실히 좋아진 느낌이에요. 매일 아침 상쾌하게 하루를 시작하고 있습니다. 특히 민트향 캡슐이라 거부감 없이 먹을 수 있어서 좋아요.' },
    { name: '이민수 B.', date: '2026/01/22', rating: 4, title: '민트향이 상쾌해요', body: '3-in-1이라 번거로움이 줄어들었습니다. 민트향 덕분에 입안이 깔끔하네요. 가격이 조금 있는 편이지만 성분을 생각하면 충분히 가치 있는 선택입니다.' },
    { name: '박소연 S.', date: '2026/01/18', rating: 5, title: '인생 영양제', body: '여러 제품을 먹어봤지만 트립만큼 몸으로 체감되는 제품은 없었어요. 속이 정말 편안해졌고 피부 컨디션도 좋아진 느낌입니다. 강력 추천해요!' },
    { name: '최현우 F.', date: '2026/01/20', rating: 5, title: '과학적인 설계', body: '단순한 유산균이 아니라 프리, 프로, 포스트까지 한 번에 챙길 수 있다는 점이 가장 마음에 듭니다. 투명한 원산지 공개도 신뢰가 가네요.' }
  ];

  return (
    <section className="bg-white py-40 border-t border-[#E0F2FE]">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#0047AB] serif-italic leading-tight mb-8">Transparency, <br/>Backed by Reviews.</h2>
            <div className="flex items-center gap-6">
               <span className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter">4.6</span>
               <div className="space-y-2">
                 <div className="flex gap-1 text-[#0047AB]">
                   {[...Array(5)].map((_, i) => <Star key={i} className={`w-6 h-6 ${i < 4 ? 'fill-current' : 'fill-[#E0F2FE] text-[#E0F2FE]'}`} />)}
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">평균 별점</p>
               </div>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input type="text" placeholder="후기 검색" className="w-full pl-14 pr-6 py-5 rounded-full border border-[#E0F2FE] bg-[#F0F7FF] text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all" />
            </div>
            <button className="px-8 py-5 rounded-full border border-[#E0F2FE] bg-white hover:bg-[#F0F7FF] transition-colors flex items-center gap-3">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">필터</span>
            </button>
          </div>
        </div>

        <div className="grid gap-12">
          {reviews.map((rev, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="pb-12 border-b border-[#E0F2FE]/50 last:border-0">
               <div className="flex justify-between items-start mb-6">
                 <div className="space-y-1">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-[#F0F7FF] flex items-center justify-center text-[10px] font-black text-[#0047AB]">{rev.name[0]}</div>
                     <span className="text-sm font-bold text-slate-900">{rev.name}</span>
                     <CheckCircle className="w-3 h-3 text-blue-400" />
                     <span className="text-[10px] text-slate-300 uppercase font-black tracking-widest">인증된 구매자</span>
                   </div>
                   <div className="flex gap-0.5 text-[#0047AB] pt-1">
                     {[...Array(5)].map((_, idx) => <Star key={idx} className={`w-3 h-3 ${idx < rev.rating ? 'fill-current' : 'text-[#E0F2FE] fill-[#E0F2FE]'}`} />)}
                   </div>
                 </div>
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{rev.date}</span>
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-4">{rev.title}</h3>
               <p className="text-slate-600 font-medium leading-relaxed max-w-3xl mb-8">{rev.body}</p>
               <div className="flex items-center gap-6">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">이 후기가 도움이 되었나요?</p>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-[#0047AB] transition-colors"><ThumbsUp className="w-3 h-3" /> <span className="text-[10px] font-black">0</span></button>
                  <button className="text-[10px] font-black text-slate-400 hover:text-[#0047AB] transition-colors">0</button>
               </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <button className="px-12 py-5 rounded-full border border-[#0047AB] text-[#0047AB] font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#F0F7FF] transition-all">후기 더 보기</button>
        </div>
      </div>
    </section>
  );
};

const WelcomePopup = ({ onClose, onNext }: { onClose: () => void, onNext: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-10 text-slate-400 hover:text-[#0047AB]"><X className="w-5 h-5" /></button>
        <div className="md:w-1/2 bg-[#F0F7FF] relative min-h-[200px] flex items-center justify-center overflow-hidden p-10">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-0 w-24 h-40 border-4 border-[#E0F2FE] rounded-full bg-white shadow-xl flex items-center justify-center">
            <div className="w-16 h-16 bg-[#E0F2FE] rounded-full blur-xl animate-pulse" />
          </motion.div>
        </div>
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">Exclusive Membership</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0047AB] serif-italic leading-tight mb-6">첫 주문 <br/>25% 할인 받기</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">트립 멤버십에 가입하고 첫 주문 25% 할인 코드와 장 건강을 위한 인사이트를 받아보세요.</p>
          <div className="space-y-4">
            <input type="tel" placeholder="휴대폰 번호" className="w-full px-6 py-4 rounded-full border border-[#E0F2FE] bg-[#F0F7FF] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-medium" />
            <button onClick={onNext} className="w-full bg-[#0047AB] text-white py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-lg">할인받기 <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const BundleItem = ({ 
  title, 
  discount, 
  originalPrice, 
  salePrice, 
  perBoxPrice, 
  image, 
  onClick 
}: { 
  title: string; 
  discount: string; 
  originalPrice: number; 
  salePrice: number; 
  perBoxPrice: number; 
  image: string; 
  onClick?: () => void; 
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center p-4 rounded-2xl hover:bg-[#F0F7FF] border border-transparent hover:border-[#E0F2FE] transition-all group text-left mb-3"
  >
    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 relative shadow-sm">
      <img src={image} alt={title} className="w-full h-full object-cover mix-blend-multiply p-1" />
      <div className="absolute top-0 left-0 bg-[#0047AB] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-lg z-10">
        {discount}
      </div>
    </div>
    <div className="ml-5 flex-1 flex justify-between items-center">
      <div>
        <div className="font-bold text-slate-800 text-sm mb-1">{title}</div>
        <div className="flex flex-col items-start -mt-0.5">
           <span className="text-[10px] font-bold text-[#0047AB] opacity-80 mb-0.5">1박스 당</span>
           <span className="font-black text-xl text-[#0047AB] tracking-tight leading-none">₩{perBoxPrice.toLocaleString()}</span>
        </div>
      </div>
      <div className="text-right flex flex-col justify-center gap-0.5">
         <span className="text-[10px] text-slate-300 line-through font-medium">
           ₩{originalPrice.toLocaleString()}
         </span>
         <span className="text-[10px] text-slate-400 font-bold">
           ₩{salePrice.toLocaleString()}
         </span>
      </div>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0047AB] transition-colors shrink-0 ml-3" />
  </button>
);

const SelectionPopup = ({ onClose }: { onClose: () => void }) => {
  const praxisImage = "https://images.ctfassets.net/u9fvvze9asat/5xXpW4YxToxXqX9GvWlEwz/a2a3e6c38b2e35c8b3c3b4a2d3e4b5c6/Synbiotic_Product.png";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-white w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl p-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-[#F0F7FF] rounded-full transition-colors text-slate-400 hover:text-[#0047AB]"><X className="w-5 h-5" /></button>
        
        <div className="text-center mt-4 mb-8">
           <h4 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-4">Exclusive Offer</h4>
           <h2 className="text-4xl text-[#0047AB] leading-tight mb-4">
              <span className="serif-italic">Unlock 25%</span> <span className="serif-italic">off your</span> <br />
              <span className="font-bold font-sans">new Trieb</span>
           </h2>
           <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[240px] mx-auto">
              Plus, get a free gut health guide ($50 value) on your first order.
           </p>
        </div>

        <div className="space-y-2">
           <BundleItem 
             title="Praxis 6+6" 
             discount="52% OFF"
             originalPrice={840000}
             salePrice={410688}
             perBoxPrice={33474}
             image={praxisImage}
             onClick={onClose}
           />
           <BundleItem 
             title="Praxis 4+3" 
             discount="47% OFF"
             originalPrice={490000}
             salePrice={262080}
             perBoxPrice={37440}
             image={praxisImage}
             onClick={onClose}
           />
           <BundleItem 
             title="Praxis 3+2" 
             discount="26% OFF"
             originalPrice={350000}
             salePrice={258406}
             perBoxPrice={51681}
             image={praxisImage}
             onClick={onClose}
           />
        </div>
      </motion.div>
    </motion.div>
  );
};

const MobileStickyFooter = ({ onAddToCart }: { onAddToCart: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 z-[150] bg-white/95 backdrop-blur-2xl border-t border-[#E0F2FE] px-6 py-5 md:hidden flex items-center justify-between shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col">
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Praxis Synbiotics+</h4>
            <p className="font-black text-lg text-[#0047AB] tracking-tight">₩54,000</p>
          </div>
          <button onClick={onAddToCart} className="bg-[#0047AB] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.25em] shadow-lg active:scale-95 transition-transform">장바구니 담기</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [popupStage, setPopupStage] = useState<'none' | 'welcome' | 'selection'>('none');
  const [cartItems, setCartItems] = useState<{ product: Product, qty: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setPopupStage('welcome'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = () => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === PRAXIS_DATA.id);
      if (existing) return prev.map(i => i.product.id === PRAXIS_DATA.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: PRAXIS_DATA, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(i => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900 pb-24 md:pb-0">
      <Nav onOpenCart={() => setIsCartOpen(true)} cartCount={cartItems.reduce((acc, i) => acc + i.qty, 0)} />
      
      <Hero onAddToCart={addToCart} />

      {/* RotatingCapsule section removed as requested */}
      
      <RitualBenefits />
      
      <IngredientFacts />

      <JournalSection />
      <ReviewsSection />
      
      <footer className="py-32 px-6 bg-[#F0F7FF] border-t border-[#E0F2FE] text-center">
        <div className="text-3xl font-black text-[#0047AB] mb-10 tracking-tighter">TRIEB</div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <span className="cursor-pointer hover:text-blue-600">개인정보처리방침</span>
          <span className="cursor-pointer hover:text-blue-600">이용약관</span>
          <span className="cursor-pointer hover:text-blue-600">인스타그램</span>
          <span className="cursor-pointer hover:text-blue-600">과학적 근거</span>
        </div>
        <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest leading-loose">
          &copy; 2026 Trieb Ritual. Crafted for Excellence. <br className="md:hidden"/>
          *These statements have not been evaluated by the FDA.
        </p>
      </footer>

      <MobileStickyFooter onAddToCart={addToCart} />

      <AnimatePresence>
        {popupStage === 'welcome' && (
          <WelcomePopup 
            onClose={() => setPopupStage('none')} 
            onNext={() => setPopupStage('selection')} 
          />
        )}
        {popupStage === 'selection' && (
          <SelectionPopup onClose={() => setPopupStage('none')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[200]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col p-8 md:p-10">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#0047AB]">쇼핑백</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm mt-20 italic">쇼핑백이 비어 있습니다.</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.product.id} className="flex gap-6 mb-8 pb-8 border-b border-[#E0F2FE]">
                      <div className="w-20 h-24 bg-[#F0F7FF] rounded-xl flex items-center justify-center">
                        <div className="w-8 h-12 border-2 border-[#E0F2FE] rounded-full bg-white shadow-sm" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between font-bold text-sm mb-1 text-[#0047AB]"><span>{item.product.name}</span><span>₩{(item.product.price * item.qty).toLocaleString()}</span></div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic mb-4">Praxis Synbiotics+</div>
                        <div className="flex items-center gap-4">
                           <button onClick={() => updateQty(item.product.id, -1)} className="p-1 border border-[#E0F2FE] rounded-md hover:bg-[#F0F7FF]"><Minus className="w-3 h-3 text-slate-400"/></button>
                           <span className="text-xs font-bold text-slate-600">{item.qty}</span>
                           <button onClick={() => updateQty(item.product.id, 1)} className="p-1 border border-[#E0F2FE] rounded-md hover:bg-[#F0F7FF]"><Plus className="w-3 h-3 text-slate-400"/></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="pt-8 bg-white">
                  <div className="flex justify-between items-center mb-6 font-bold text-slate-600">
                    <span className="text-xs uppercase tracking-widest">합계</span>
                    <span className="text-lg">₩{cartItems.reduce((acc, i) => acc + i.product.price * i.qty, 0).toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-[#0047AB] text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-blue-800 transition-colors shadow-lg">결제하기</button>
                  <p className="text-center text-[9px] text-slate-300 mt-6 uppercase tracking-widest">Free Shipping on all orders</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
