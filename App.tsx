
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Timer, Menu, X, CheckCircle, ArrowRight, Minus, Plus, ChevronDown, Star, Search, Filter, ThumbsUp, ChevronRight, Trash2, Copy, AlertCircle, ArrowLeft, Clock, BookOpen, Share2, CreditCard } from 'lucide-react';
import { Product } from './types';
import AIChat from './components/AIChat';

// Bundle definitions
const BUNDLES = [
  {
    id: 'bundle-6-6',
    name: 'Praxis 6+6',
    originalPrice: 840000,
    salePrice: 410688,
    perBoxPrice: 33474,
    discount: '52% OFF',
    image: "https://images.ctfassets.net/u9fvvze9asat/5xXpW4YxToxXqX9GvWlEwz/a2a3e6c38b2e35c8b3c3b4a2d3e4b5c6/Synbiotic_Product.png"
  },
  {
    id: 'bundle-4-3',
    name: 'Praxis 4+3',
    originalPrice: 490000,
    salePrice: 262080,
    perBoxPrice: 37440,
    discount: '47% OFF',
    image: "https://images.ctfassets.net/u9fvvze9asat/5xXpW4YxToxXqX9GvWlEwz/a2a3e6c38b2e35c8b3c3b4a2d3e4b5c6/Synbiotic_Product.png"
  },
  {
    id: 'bundle-3-2',
    name: 'Praxis 3+2',
    originalPrice: 350000,
    salePrice: 258406,
    perBoxPrice: 51681,
    discount: '26% OFF',
    image: "https://images.ctfassets.net/u9fvvze9asat/5xXpW4YxToxXqX9GvWlEwz/a2a3e6c38b2e35c8b3c3b4a2d3e4b5c6/Synbiotic_Product.png"
  }
];

interface CartItem {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  qty: number;
  image: string;
}

interface ArticleData {
  id: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  content: React.ReactNode;
}

const ARTICLES_DATA: ArticleData[] = [
  {
    id: 'meet-synbiotic',
    title: "Praxis를 만나보세요: 장 건강의 새로운 기준, 3-in-1 신바이오틱스*",
    category: "SCIENCE",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=1200",
    readTime: "6 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>Praxis는 매일 섭취하는 프리, 프로, 포스트바이오틱스가 결합된 3-in-1 보충제로 장과 소화기 건강을 전면적으로 지원하도록 설계되었습니다.*</li>
            <li>인비트로(In-vitro) 테스트와 임상 연구를 통해 투명하게 검증된 원료만을 사용하며, 이것이 바로 Praxis의 진정한 가치입니다.*</li>
          </ul>
        </div>
        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          우리는 장 건강을 관리할 때 단순히 유산균 하나를 먹는 것 이상의 의미가 있다고 믿습니다. 많은 사람들이 김치나 콤부차로 충분하다고 생각하지만, 과학은 더 깊은 이야기를 하고 있습니다.
        </p>
        <p className="text-slate-600 leading-loose">
          Praxis는 단순히 박테리아를 넣는 것에 그치지 않습니다. 유익균이 잘 정착할 수 있도록 돕는 프리바이오틱스와, 장벽 건강을 직접적으로 지원하는 포스트바이오틱스를 하나의 지연 방출형 캡슐에 담았습니다. 이는 위산의 공격을 이겨내고 유효 성분이 장내에 도달하여 실제로 작용할 수 있게 설계된 혁신적인 솔루션입니다.*
        </p>
        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References:</h4>
          <ul className="list-none space-y-2 text-xs text-slate-400 font-mono">
            <li>1. Dimidi, E., Cox, S.R., Rossi, M., & Whelan, K. (2019). Fermented foods: Definitions and characteristics, impact on the gut microbiota and effects on gastrointestinal health. Nutrients, 11(8), 1806.</li>
            <li>2. Office of Dietary Supplements. Probiotics: Fact Sheet for Health Professionals. National Institutes of Health, Department of Health & Human Services. 2020.</li>
            <li>3. Guarner F, Sanders ME, Eliakim R, et al. World Gastroenterology Organisation Global Guidelines: Probiotics and Prebiotics. 2017.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'meet-cfus',
    title: "보장균수(CFU) 가이드: 우리 장 건강의 진정한 지원군*",
    category: "SCIENCE",
    image: "https://images.ctfassets.net/u9fvvze9asat/5xXpW4YxToxXqX9GvWlEwz/68e27c15e8b35c8b3c3b4a2d3e4b5c6/CFU_Guide.jpg?auto=format&fit=crop&q=80&w=1200",
    readTime: "4 min read",
    content: (
      <div className="space-y-12">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-4">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-4 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>우리는 식단에 프로바이오틱스를 추가하는 것의 이점을 잘 알고 있지만, 유산균 포뮬러의 가장 중요한 요소 중 하나인 CFU(군집 형성 단위)에 대해 자세히 알아볼 필요가 있습니다.*</li>
            <li>장 건강을 지원하기 위해 하루에 몇십억 마리의 프로바이오틱스가 적정한지 확인해 보세요.*</li>
          </ul>
        </div>

        <div className="space-y-8 text-slate-600 leading-loose">
          <p>
            자, 이제 프로바이오틱스에 대해서는 어느 정도 들어보셨을 겁니다. 장 건강이 우리 <span className="underline">면역 체계</span>와 전반적인 건강을 어떻게 지원하는지도 잘 알고 계시겠죠. 하지만 정작 프로바이오틱스를 특별하게 만드는 핵심 요소인 <strong>CFU</strong>에 대해서는 얼마나 알고 계신가요?
          </p>
          <p>
            CFU, 즉 "군집 형성 단위(Colony forming units)"는 유산균 보충제나 실험실 샘플 내에 존재하는 활성 상태의 박테리아 세포 수를 결정하는 데 사용되는 측정 단위입니다. 쉽게 말해, CFU 수치는 해당 제품이 포함하고 있는 프로바이오틱스의 품질과 생존력에 대한 정보를 제공합니다.*
          </p>
          <p>
            CFU에 대해 더 깊이 알아보고, 이것이 무엇인지, 어떤 역할을 하는지, 그리고 장 건강을 지원하기 위해 얼마나 많은 양이 필요한지 알아보겠습니다.*
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">CFU란 정확히 무엇인가요?</h3>
          <p>
            좀 더 자세히 들어가 볼까요? Praxis 한 병을 자세히 살펴보면 영양 정보 라벨에서 해당 제품에 포함된 구체적인 박테리아 균주(예: <i>Lactobacillus rhamnosus</i> GG®)와 각 균주가 제공하는 CFU 수치를 확인할 수 있습니다. (3) <strong>CFU 수치는 제조 시점에 얼마나 많은 활성 미생물이 들어 있는지, 그리고 유통기한이 끝날 때까지 얼마나 많은 균이 살아남아 있는지를 나타냅니다.</strong> 우리가 보충제를 섭취하면, 이러한 미생물들이 장 내에서 증식하고 군집을 형성하여 장내 마이크로바이옴을 다양화할 기회를 얻게 됩니다.*
          </p>
          <p>
             이제 스티커 충격에 대비하세요. CFU는 종종 수십억 단위로 계산되기 때문에, 우리 몸 안에 이미 수조 마리의 박테리아가 살고 있다는 것을 알고 계실 겁니다. 하지만 때로는 약간의 추가 지원이 필요할 때가 있습니다.*
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">프로바이오틱스에서 CFU가 왜 중요한가요?</h3>
          <p>
            고품질의 프로바이오틱스를 선택할 때 CFU는 전체 그림의 일부일 뿐입니다. Ritual의 수석 과학자인 Arianne Vance, MPH는 "프로바이오틱스 보충제에서 단순히 CFU의 숫자에만 집중하기보다는, 그 숫자가 나타내는 품질과 과학적 근거를 확인하는 것이 훨씬 중요합니다"라고 설명합니다. 프로바이오틱스의 혜택은 <strong>균주 특이적</strong>(균주마다 다른 혜택을 제공함)이기 때문에, 단순히 양이 많은 것보다 임상적으로 연구된 균주가 포함되었는지를 먼저 확인해야 합니다. Praxis에는 이러한 과학적 검증을 마친 균주들이 정밀하게 배합되어 있습니다.*
          </p>
          <p>
            쇼핑할 때 투명성을 주시하세요. 라벨에 표시된 CFU는 제조 시점에 살아있는 CFU 수를 나타낼 수도 있고, 제품의 유통기한이 끝날 때 존재하는 CFU 수를 나타낼 수도 있습니다. 이것이 중요한 이유는 보충제의 프로바이오틱스 중 일부는 제품의 유효 기간 동안 자연스럽게 사멸할 수 있기 때문입니다. (5)
          </p>
          <p>
            CFU 수치와 함께 고려해야 할 또 다른 요소는 박테리아 균주입니다. 과학에 따르면 일부 프로바이오틱스의 이점은 특정 균주에 특화되어 있으므로, 모든 프로바이오틱스가 동일한 이점을 제공한다고 가정할 수 없습니다. 프로바이오틱스 보충제를 쇼핑할 때 좋은 경험 법칙은 보충제 라벨에 나열된 임상적으로 연구된 균주를 찾는 것입니다. (더 자세한 내용은 나중에 다루겠습니다.)*
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">얼마나 많은 CFU가 충분할까요? 숫자가 중요할까요?</h3>
          <p>
            이제 CFU가 무엇인지 알았으니, 얼마나 섭취해야 할지 궁금하실 겁니다. 정답은 개인마다 다르지만 몇 가지 지침을 드릴 수 있습니다. 시중의 많은 제품들은 하루 10억에서 100억 CFU 사이를 함유하고 있지만, 일부는 500억 CFU 이상을 함유하기도 합니다. <strong>하지만 CFU 수치가 무조건 높다고 해서 제품의 혜택이 비례해서 증가하는 것은 아닙니다.</strong> (5) 포함된 균주와 그 균주 뒤에 있는 임상적 증거의 질이 CFU 수치보다 더 중요할 가능성이 높습니다.*
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Trieb Praxis의 CFU 설계</h3>
          <p>
            장 건강 보충제인 Praxis에 대해 들어보셨을 것입니다. 우리는 3-in-1 프리, 프로, 포스트바이오틱스 보충제인 이 제품에 대해 열정을 가지고 있습니다. 품질과 과학적 증거, 그리고 CFU 함량에 있어서 우리는 타협하지 않았습니다. Praxis는 세계에서 가장 활발히 연구된 두 가지 프로바이오틱스 균주인 <strong>LGG®와 BB-12®를 110억 CFU 함유</strong>하고 있습니다. 또한 유익균의 성장을 돕는 프리바이오틱스 PreforPro®와 장벽 세포에 에너지를 공급하는 포스트바이오틱스 Tributyrin이 결합되어 있습니다.
          </p>
          <p>
            모든 Ritual 제품과 마찬가지로 Praxis는 품질과 투명성을 염두에 두고 Made Traceable®로 만들어졌으므로, 매일 몸에 무엇을 넣고 있는지 알 수 있습니다.*
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References:</h4>
          <ul className="list-none space-y-4 text-xs text-slate-400 font-mono">
            <li>1. Terpou, Antonia, Papadakis, Aikaterini, Lappa, Iliada K., Kachrimanidou, Vasiliki, Bosnea, Loulouda A., Kopsahelis, Nikolaos. (2019). Probiotics in Food Systems: Significance and Emerging Strategies Towards Improved Viability and Delivery of Enhanced Beneficial Value. Retrieved from PubMed Central.</li>
            <li>2. Kechagia, Maria, Basoulis, Dimitrios, Konstantopoulou, Stavroula, Dimitriadi, Dimitra, Gyftopoulou, Konstantina, Skarmoutsou, Nikoletta, Fakiri, Eleni Maria. (2013). Health Benefits of Probiotics: A Review. Retrieved from PubMed Central.</li>
            <li>3. Mazzantini, Diletta, Calvigioni, Marco, Celandroni, Francesco, Lupetti, Antonella, Ghelardi, Emilia. (2021). Spotlight on the Compositional Quality of Probiotic Formulations Marketed Worldwide. Retrieved from Frontiers in Molecular Biology.</li>
            <li>4. Guarner F, Sanders ME, Eliakim R, et al. World Gastroenterology Organisation Global Guidelines: Probiotics and Prebiotics. 2017.</li>
            <li>5. Office of Dietary Supplements. Probiotics: Fact Sheet for Health Professionals. National Institutes of Health, Department of Health & Human Services. 2022.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'postbiotics-guide',
    title: "포스트바이오틱스란 무엇인가요? 장 건강을 위한 잃어버린 조각*",
    category: "SCIENCE",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1200",
    readTime: "4 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>포스트바이오틱스는 장내 유익균이 식이섬유를 분해하면서 만들어내는 유익한 대사 산물입니다.*</li>
            <li>이들은 장벽의 방어 기능을 지원하고, 장내 환경을 건강하게 유지하는 데 핵심적인 역할을 수행합니다.*</li>
          </ul>
        </div>
        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          프리바이오틱스와 프로바이오틱스에 대해서는 익숙하시겠지만, 포스트바이오틱스는 장 건강의 완성을 위한 '최종 결과물'입니다.
        </p>
        <p className="text-slate-600 leading-loose">
          포스트바이오틱스는 장벽 세포의 주 에너지원인 부티르산(Butyrate) 등을 포함하며, 이는 장내 유익한 환경을 물리적으로 지원합니다. Praxis는 Tributyrin과 같은 고품질 원료를 통해 유익균이 만들어내는 이 핵심 성분을 직접 공급하여 더욱 빠르고 확실한 장 건강 관리를 가능하게 합니다. (1, 2)
        </p>
        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References:</h4>
          <ul className="list-none space-y-2 text-xs text-slate-400 font-mono">
            <li>1. Wegh CAM, et al. Postbiotics and Their Potential Applications in Early Life Nutrition and Beyond. 2019.</li>
            <li>2. Campos-Perez W, et al. Effects of short chain fatty acids on metabolic health. 2021.</li>
            <li>3. Gibson GR, et al. Dietary modulation of the human colonic microbiota. 1995.</li>
            <li>4. MD. Toni Golen, et al. "What Are Postbiotics?" Harvard Health. 2021.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'expire-guide',
    title: "유산균도 유통기한이 있나요? 전문가가 답해드립니다",
    category: "SCIENCE",
    image: "https://images.unsplash.com/photo-1506330682178-5c41e4439c37?auto=format&fit=crop&q=80&w=1200",
    readTime: "3 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>네, 프로바이오틱스 보충제 속 살아있는 박테리아에도 유효기간이 있습니다.*</li>
            <li>유통기한은 균의 종류, 캡슐화 기술, 그리고 보관 방법에 따라 달라집니다.*</li>
            <li>Praxis는 제조일로부터 1년간의 안정적인 유효 기간을 보장합니다.*</li>
          </ul>
        </div>
        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          살아있는 생명체인 프로바이오틱스는 시간이 지남에 따라 그 생존 능력이 자연스럽게 감소합니다. 따라서 단순히 유통기한 내에 섭취하는 것뿐만 아니라, 그 기한까지 균수가 유지되도록 설계되었는지가 중요합니다.
        </p>
        <p className="text-slate-600 leading-loose">
          Praxis는 외부 습기와 빛을 차단하는 특수 용기와 지연 방출형 캡슐 기술을 통해, 실온에서도 마지막 한 알까지 보장균수가 안정적으로 유지되도록 설계되었습니다. (1, 2)
        </p>
        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References:</h4>
          <ul className="list-none space-y-2 text-xs text-slate-400 font-mono">
            <li>1. Wilcox, et al. (2020). "Expired Probiotics: What is Really in Your Cabinet?"</li>
            <li>2. Council for Responsible Nutrition. (2017). Best Practices Guidelines for Probiotics.</li>
            <li>3. Fenster, et al. (2019). The Production and Delivery of Probiotics.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    title: "유산균은 어떻게 작용하나요? '착한' 박테리아의 과학적 원리",
    category: "SCIENCE",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=1200",
    readTime: "4 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>박테리아는 전반적인 건강 유지에 중요한 역할을 하며, 장내 마이크로바이옴은 우리 몸의 '컨트롤 센터'와 같습니다.*</li>
            <li>프로바이오틱스는 장내 '유익균'의 성장을 지원하고, 건강한 균형을 유지하도록 돕습니다.*</li>
          </ul>
        </div>
        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          여러분이 유산균을 섭취하면, 이들은 장내 미생물 생태계에 합류하여 유해균의 성장을 억제하고 유익한 환경을 조성하기 시작합니다.
        </p>
        <p className="text-slate-600 leading-loose">
          하지만 단순히 먹는 것만으로는 부족합니다. 캡슐이 위산을 견디고 안전하게 대장에 도달해야 하며, 그곳에서 살아남아 번식할 수 있는 환경이 갖춰져야 합니다. Praxis의 3-in-1 시스템은 균주가 장에 무사히 정착할 수 있도록 '먹이'와 '대사 산물'을 동시에 공급하는 정교한 메커니즘으로 작동합니다.
        </p>
        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References:</h4>
          <ul className="list-none space-y-2 text-xs text-slate-400 font-mono">
            <li>1. Bull, M. J., & Plummer, N. T. (2014). The human gut microbiome in health and disease.</li>
            <li>2. Wang, et al. (2021). Probiotics Regulate Gut Microbiota: An Effective Method to Improve Immunity.</li>
            <li>3. Office of Dietary Supplements. NIH. (2020). Probiotics Fact Sheet.</li>
            <li>4. Hemarajata, P., & Versalovic, J. (2013). Effects of probiotics on gut microbiota: Mechanisms of action.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'timing-science',
    title: "과학적으로 입증된 유산균 섭취의 최적 시간",
    category: "SCIENCE",
    image: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&q=80&w=1200",
    readTime: "6 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>프로바이오틱스는 장내 웰빙을 돕는 유익한 박테리아입니다.*</li>
            <li>언제 섭취하는 것이 가장 좋은지는 여전히 많은 논의가 있지만, 과학적 근거를 바탕으로 한 가이드를 제안합니다.*</li>
          </ul>
        </div>
        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          많은 분들이 아침 공복에 먹어야 하는지, 식사 후에 먹어야 하는지 궁금해합니다. 사실 가장 중요한 것은 '매일 일정한 시간에 꾸준히 먹는 습관'입니다.
        </p>
        <p className="text-slate-600 leading-loose">
          일부 연구는 공복 섭취가 균의 도달률을 높인다고 하지만, Praxis와 같이 지연 방출형 캡슐 기술이 적용된 제품은 섭취 시간과 관계없이 위산으로부터 균을 안전하게 보호합니다. 따라서 여러분의 라이프스타일에 맞춰 잊지 않고 먹을 수 있는 최적의 루틴을 만드는 것이 정답입니다.
        </p>
        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References:</h4>
          <ul className="list-none space-y-2 text-xs text-slate-400 font-mono">
            <li>1. WHO Global Guidelines: Probiotics and Prebiotics. (2017).</li>
            <li>2. NIH. Probiotics: Fact Sheet for Health Professionals. (2020).</li>
            <li>3. McFarland, L. V. (2015). From yaks to yogurt: The history of probiotics.</li>
            <li>4. Lynch SV, Pedersen O. N Engl J Med. (2016).</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'signs-working-full',
    title: "유산균이 효과를 내고 있다는 3가지 신체 신호",
    category: "SCIENCE",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
    readTime: "5 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>유산균 보충제의 효과를 평가할 때는 단순히 물리적인 느낌 그 이상의 지표들이 필요합니다.*</li>
            <li>적응 기간부터 실제 변화가 나타나기까지, 여러분이 주목해야 할 신호들을 정리했습니다.*</li>
          </ul>
        </div>
        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          새로운 유산균을 먹기 시작하면 장내 미생물 지형도가 바뀌기 시작합니다. 처음 1~2주 동안은 가벼운 가스나 꾸르륵거림을 느낄 수 있는데, 이는 '적응기'의 자연스러운 현상입니다.
        </p>
        <p className="text-slate-600 leading-loose">
          2주 이후부터는 배변의 규칙성이 개선되거나, 식사 후 습관적으로 느끼던 더부룩함이 줄어드는 것을 경험할 수 있습니다. 장 건강은 면역력 및 에너지 수치와도 직결되어 있으므로, 장기적으로는 전반적인 신체 활력이 좋아지는 것을 느끼는 것이 유산균이 제 역할을 하고 있다는 가장 큰 신호입니다.
        </p>
        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References:</h4>
          <ul className="list-none space-y-2 text-xs text-slate-400 font-mono">
            <li>1. WHO World Gastroenterology Organisation. (2017).</li>
            <li>2. Lynch SV, Pedersen O. The Human Intestinal Microbiome. (2016).</li>
            <li>3. Robles Alonso V, et al. Linking the gut microbiota to human health. (2013).</li>
            <li>4. Gilbert JA, et al. Current understanding of the human microbiome. (2018).</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'refrigeration-facts',
    title: "유산균, 꼭 냉장고에 넣어야 하나요?",
    category: "SCIENCE",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=1200",
    readTime: "4 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>모든 유산균이 냉장 보관을 필요로 하는 것은 아닙니다. 기술 발전에 따라 실온에서도 안정적인 'Shelf-stable' 제품들이 많아졌습니다.*</li>
            <li>냉장 보관 유무보다 습기 제어와 균주의 안정성이 더 중요합니다.*</li>
          </ul>
        </div>
        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          과거에는 유산균의 활성을 유지하기 위해 냉장 보관이 필수였지만, 현대의 제조 기술은 이를 뛰어넘었습니다.
        </p>
        <p className="text-slate-600 leading-loose">
          Praxis는 실온에서도 박테리아의 생존 능력을 유지하도록 습기 방지 기술이 적용된 병을 사용합니다. 이는 여행 중이거나 책상 위에 두고 언제든 편하게 섭취할 수 있게 하여, 결과적으로 섭취의 꾸준함을 도와 장 건강 혜택을 극대화합니다.
        </p>
        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References:</h4>
          <ul className="list-none space-y-2 text-xs text-slate-400 font-mono">
            <li>1. IPA Best Practices for Probiotics in Dietary Supplements. (2023).</li>
            <li>2. Yoha, et al. Targeted Delivery of Probiotics: Perspectives. (2022).</li>
            <li>3. Fenster, et al. The Production and Delivery of Probiotics. (2019).</li>
            <li>4. Govender M, et al. Convention vs. Non-conventional Formulations. (2014).</li>
          </ul>
        </div>
      </div>
    )
  }
];

const MarqueeBanner = ({ onClick }: { onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-[#0047AB] text-white py-2 text-[10px] font-bold uppercase tracking-[0.2em] overflow-hidden whitespace-nowrap relative z-[110] cursor-pointer hover:bg-blue-800 transition-colors"
  >
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="inline-block"
    >
      <span className="mx-8">첫 주문 한정: PRAXIS 52% 할인 혜택 <Timer className="w-3 h-3 inline ml-1" /></span>
      <span className="mx-8">임상 연구 완료 성분 사용 <CheckCircle className="w-3 h-3 inline ml-1" /></span>
      <span className="mx-8">첫 주문 한정: PRAXIS 52% 할인 혜택 <Timer className="w-3 h-3 inline ml-1" /></span>
      <span className="mx-8">임상 연구 완료 성분 사용 <CheckCircle className="w-3 h-3 inline ml-1" /></span>
    </motion.div>
  </div>
);

const Nav = ({ onOpenCart, cartCount, onBannerClick, onMenuClick, onNavigateHome, onNavigateScience }: { onOpenCart: () => void, cartCount: number, onBannerClick: () => void, onMenuClick: () => void, onNavigateHome: () => void, onNavigateScience: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-[100]">
    <MarqueeBanner onClick={onBannerClick} />
    <div className="h-16 bg-white/80 backdrop-blur-lg border-b border-[#E0F2FE] px-6 md:px-12 flex items-center justify-between">
      <div className="flex-1 hidden md:flex gap-8">
         <button onClick={onNavigateHome} className="text-xs font-bold text-[#0047AB] uppercase tracking-widest hover:text-blue-400">쇼핑</button>
         <button onClick={onNavigateScience} className="text-xs font-bold text-[#0047AB] uppercase tracking-widest hover:text-blue-400">과학</button>
      </div>
      <div className="md:hidden">
        <button onClick={onMenuClick} className="p-2 hover:bg-[#F0F7FF] rounded-full transition-colors"><Menu className="w-5 h-5 text-[#0047AB]" /></button>
      </div>
      <div onClick={onNavigateHome} className="text-2xl font-black tracking-tighter text-[#0047AB] absolute left-1/2 -translate-x-1/2 cursor-pointer">TRIEB</div>
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

const MobileMenu = ({ isOpen, onClose, onShop, onScience }: { isOpen: boolean, onClose: () => void, onShop: () => void, onScience: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-[300] bg-white px-6 py-4 flex flex-col"
        >
          <div className="flex items-center justify-between mb-16">
             <div className="text-2xl font-black tracking-tighter text-[#0047AB]">TRIEB</div>
             <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-[#0047AB]">
               <X className="w-6 h-6" />
             </button>
          </div>
          
          <nav className="flex flex-col gap-10">
            <button onClick={onShop} className="text-left group">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 block group-hover:text-[#0047AB] transition-colors">Collection</span>
               <span className="text-4xl font-bold text-[#0047AB] serif-italic leading-none group-hover:pl-4 transition-all duration-300">Shop Praxis</span>
            </button>
            
            <button onClick={onScience} className="text-left group">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 block group-hover:text-[#0047AB] transition-colors">Research</span>
               <span className="text-4xl font-bold text-[#0047AB] serif-italic leading-none group-hover:pl-4 transition-all duration-300">Science</span>
            </button>
          </nav>
          
          <div className="mt-auto mb-8 space-y-4">
             <div className="w-full h-[1px] bg-[#E0F2FE]" />
             <div className="flex gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
               <a href="#">Log In</a>
               <a href="#">Account</a>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ArticleDetail = ({ article, onBack }: { article: ArticleData, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 px-6 max-w-screen-lg mx-auto min-h-screen"
    >
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#0047AB] transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Science
      </button>

      <div className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">{article.category}</span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#0047AB] serif-italic mb-6 leading-tight">{article.title}</h1>
        <div className="flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</span>
          <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Trieb Research</span>
        </div>
      </div>

      <div className="w-full aspect-[21/9] bg-slate-100 rounded-[2rem] overflow-hidden mb-16 shadow-lg">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-[#0047AB] prose-p:text-slate-600 prose-p:leading-8 mb-20">
          {article.content}
        </div>
        
        <div className="border-t border-[#E0F2FE] pt-12 flex justify-between items-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Share this article</p>
          <div className="flex gap-4">
             <button className="p-3 rounded-full bg-[#F0F7FF] text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors">
               <Share2 className="w-5 h-5" />
             </button>
             <button className="p-3 rounded-full bg-[#F0F7FF] text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors">
               <Copy className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SciencePage = ({ onArticleSelect }: { onArticleSelect: (article: ArticleData) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 max-w-screen-xl mx-auto min-h-screen"
    >
      <div className="mb-20 text-center md:text-left">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">Trieb Research</span>
        <h1 className="text-5xl md:text-8xl font-bold text-[#0047AB] serif-italic mb-6">Science</h1>
        <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
          투명한 연구, 입증된 결과. Trieb의 모든 제품은 철저한 과학적 검증을 거칩니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {ARTICLES_DATA.map((item) => (
          <div key={item.id} onClick={() => onArticleSelect(item)} className="group cursor-pointer">
            <div className="aspect-[4/3] bg-[#F0F7FF] rounded-2xl overflow-hidden mb-6 relative">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#0047AB]">
                 {item.category}
               </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#0047AB] transition-colors mb-2">
              {item.title}
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Hero = ({ onAddToCart }: { onAddToCart: () => void }) => (
  <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#E0F2FE_0%,#F0F9FF_100%)] opacity-100" />
    <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none">
       <motion.div
         animate={{ rotateY: [-15, 15, -15], y: [-20, 20, -20] }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
      img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1200'
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

interface BundleItemProps {
  title: string;
  discount: string;
  originalPrice: number;
  salePrice: number;
  perBoxPrice: number;
  image: string;
  onClick?: () => void;
}

const BundleItem: React.FC<BundleItemProps> = ({ 
  title, 
  discount, 
  originalPrice, 
  salePrice, 
  perBoxPrice, 
  image, 
  onClick 
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
         <span className="text-[10px] text-slate-300 line-through font-medium">₩{originalPrice.toLocaleString()}</span>
         <span className="text-[10px] text-slate-400 font-bold">₩{salePrice.toLocaleString()}</span>
      </div>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0047AB] transition-colors shrink-0 ml-3" />
  </button>
);

const SelectionPopup = ({ onClose, onAddBundle, onAddSingle }: { onClose: () => void, onAddBundle: (bundle: any) => void, onAddSingle: () => void }) => {
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
              <span className="serif-italic">Unlock 52%</span> <span className="serif-italic">off your</span> <br />
              <span className="font-bold font-sans">new Trieb</span>
           </h2>
           <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[240px] mx-auto">Plus, get a free gut health guide ($50 value) on your first order.</p>
        </div>
        <div className="space-y-2 mb-4">
           {BUNDLES.map(bundle => (
             <BundleItem 
               key={bundle.id}
               title={bundle.name} 
               discount={bundle.discount}
               originalPrice={bundle.originalPrice}
               salePrice={bundle.salePrice}
               perBoxPrice={bundle.perBoxPrice}
               image={bundle.image}
               onClick={() => onAddBundle(bundle)}
             />
           ))}
        </div>
        <button 
          onClick={onAddSingle}
          className="w-full py-4 rounded-2xl border border-[#E0F2FE] bg-white text-slate-500 font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 hover:text-[#0047AB] transition-colors"
        >
          1박스만 구매하기 — ₩54,000
        </button>
      </motion.div>
    </motion.div>
  );
};

const SoldOutPopup = ({ onClose }: { onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const code = "TRIEB-WAIT-10";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl p-10 text-center"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-[#F0F7FF] rounded-full transition-colors text-slate-400 hover:text-[#0047AB]">
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-[#0047AB]" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#0047AB] serif-italic leading-tight mb-4">
          Currently <br/> Sold Out
        </h2>
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
          죄송합니다. 예상보다 많은 주문으로 인해<br/> 준비된 수량이 모두 소진되었습니다.
        </p>
        
        <div className="bg-[#F0F7FF] rounded-2xl p-6 mb-8 border border-[#E0F2FE]">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3">Next Purchase Gift</p>
          <p className="text-xs text-slate-600 font-bold mb-4">기다려주시는 분들을 위한<br/>10% 시크릿 할인 코드</p>
          <div 
            onClick={handleCopy}
            className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-blue-100 cursor-pointer hover:border-blue-300 transition-colors group"
          >
            <span className="font-mono font-bold text-[#0047AB] tracking-wider">{code}</span>
            {copied ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-slate-300 group-hover:text-[#0047AB] transition-colors" />
            )}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-[#0047AB] text-white py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-blue-800 transition-colors shadow-lg"
        >
          확인
        </button>
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

export const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'science'>('home');
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [popupStage, setPopupStage] = useState<'none' | 'welcome' | 'selection' | 'soldout'>('none');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setPopupStage('welcome'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleShopNav = () => {
    setCurrentView('home');
    setSelectedArticle(null);
    setIsMobileMenuOpen(false);
    setPopupStage('selection');
  };

  const handleScienceNav = () => {
    setCurrentView('science');
    setSelectedArticle(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedArticle(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addBundleToCart = (bundle: any) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === bundle.id);
      if (existing) return prev.map(i => i.id === bundle.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { 
        id: bundle.id, 
        name: bundle.name, 
        originalPrice: bundle.originalPrice, 
        salePrice: bundle.salePrice, 
        qty: 1, 
        image: bundle.image 
      }];
    });
    setPopupStage('none');
    setIsCartOpen(true);
  };

  const handleAddSingle = () => {
    addBundleToCart({
      id: 'single-box',
      name: 'Praxis Synbiotics+',
      originalPrice: 54000,
      salePrice: 54000,
      perBoxPrice: 54000,
      discount: '',
      image: "https://images.ctfassets.net/u9fvvze9asat/5xXpW4YxToxXqX9GvWlEwz/a2a3e6c38b2e35c8b3c3b4a2d3e4b5c6/Synbiotic_Product.png"
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setPopupStage('soldout');
  };

  // Pricing calculations
  const totalOriginal = cartItems.reduce((acc, i) => acc + (i.originalPrice * i.qty), 0);
  const totalSale = cartItems.reduce((acc, i) => acc + (i.salePrice * i.qty), 0);
  const totalDiscount = totalOriginal - totalSale;

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900 pb-24 md:pb-0">
      <Nav 
        onOpenCart={() => setIsCartOpen(true)} 
        cartCount={cartItems.reduce((acc, i) => acc + i.qty, 0)} 
        onBannerClick={() => setPopupStage('welcome')} 
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateScience={handleScienceNav}
      />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onShop={handleShopNav} 
        onScience={handleScienceNav} 
      />
      
      {currentView === 'home' && (
        <>
          <Hero onAddToCart={() => setPopupStage('selection')} />
          <RitualBenefits />
          <IngredientFacts />
          <JournalSection />
          <ReviewsSection />
        </>
      )}

      {currentView === 'science' && !selectedArticle && (
        <SciencePage onArticleSelect={(article) => setSelectedArticle(article)} />
      )}

      {currentView === 'science' && selectedArticle && (
        <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
      )}
      
      <footer className="py-32 px-6 bg-[#F0F7FF] border-t border-[#E0F2FE] text-center">
        <div className="text-3xl font-black text-[#0047AB] mb-10 tracking-tighter">TRIEB</div>
        <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest leading-loose">
          &copy; 2026 Trieb Ritual. Crafted for Excellence.
        </p>
      </footer>

      <MobileStickyFooter onAddToCart={() => setPopupStage('selection')} />

      <AnimatePresence>
        {popupStage === 'welcome' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button onClick={() => setPopupStage('none')} className="absolute top-4 right-4 p-2 text-slate-400 z-10"><X className="w-5 h-5" /></button>
              <div className="md:w-1/2 bg-[#F0F7FF] p-10 flex items-center justify-center relative">
                 <div className="w-24 h-40 border-4 border-[#E0F2FE] rounded-full bg-white shadow-xl flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#E0F2FE] rounded-full blur-xl animate-pulse" />
                 </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">Exclusive Membership</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0047AB] serif-italic leading-tight mb-6">첫 주문 <br/>52% 할인 받기</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">트립 멤버십에 가입하고 첫 주문 52% 할인 코드와 장 건강을 위한 인사이트를 받아보세요.</p>
                <div className="space-y-4">
                  <input type="tel" placeholder="휴대폰 번호" className="w-full px-6 py-4 rounded-full border border-[#E0F2FE] bg-[#F0F7FF] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-medium" />
                  <button onClick={() => setPopupStage('selection')} className="w-full bg-[#0047AB] text-white py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-lg">할인받기 <ArrowRight className="w-4 h-4" /></button>
                  <p className="text-[9px] text-slate-300 text-center mt-3 leading-tight">
                    * <span className="underline cursor-pointer hover:text-slate-400 decoration-slate-200 underline-offset-2">개인정보 수집 및 이용</span>에 동의합니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {popupStage === 'selection' && (
          <SelectionPopup onClose={() => setPopupStage('none')} onAddBundle={addBundleToCart} onAddSingle={handleAddSingle} />
        )}
        {popupStage === 'soldout' && (
          <SoldOutPopup onClose={() => setPopupStage('none')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[200]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col">
              {/* Header */}
              <div className="px-6 py-6 border-b border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#0047AB]">장바구니</h2>
                  <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
                </div>
                <div className="mb-2">
                   <span className="text-sm font-bold text-slate-800">첫 구매 30% 할인 혜택이 적용되었습니다 🎉</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-full rounded-full" />
                </div>
              </div>
              
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag className="w-12 h-12 text-[#E0F2FE] mb-4" />
                    <p className="text-slate-400 text-sm italic">쇼핑백이 비어 있습니다.</p>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex gap-5 mb-8">
                      <div className="w-24 h-24 bg-[#FFFDEB] rounded-none flex items-center justify-center shrink-0 p-2">
                        <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="text-[#0047AB] font-bold text-lg leading-tight">{item.name}</h3>
                            <p className="text-slate-500 serif-italic text-sm">장 건강</p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-slate-500 font-medium mb-3">
                          <p>30일 분</p>
                          <p>민트향</p>
                        </div>

                        <div className="flex items-end justify-between mt-auto">
                          <div>
                             <div className="flex items-center gap-2">
                               <span className="text-slate-300 text-xs line-through font-medium">₩{(item.originalPrice * item.qty).toLocaleString()}</span>
                               <span className="text-[#0047AB] font-bold text-sm">₩{(item.salePrice * item.qty).toLocaleString()}</span>
                             </div>
                             <p className="text-[10px] text-green-600 font-bold mt-0.5">
                               ₩{((item.originalPrice - item.salePrice) * item.qty).toLocaleString()} 할인
                             </p>
                          </div>
                          
                          <div className="flex items-center border border-slate-200 rounded-full h-8 px-2 bg-white">
                             <button 
                               onClick={item.qty === 1 ? () => removeItem(item.id) : () => updateQty(item.id, -1)} 
                               className="w-6 h-full flex items-center justify-center text-slate-400 hover:text-[#0047AB]"
                             >
                               {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5"/>}
                             </button>
                             <span className="text-xs font-bold text-slate-800 w-6 text-center">{item.qty}</span>
                             <button onClick={() => updateQty(item.id, 1)} className="w-6 h-full flex items-center justify-center text-slate-400 hover:text-[#0047AB]"><Plus className="w-3.5 h-3.5"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-slate-100">
                  <div className="mb-6 relative">
                    <label className="text-xs font-bold text-[#0047AB] mb-2 block">할인 코드</label>
                    <div className="relative">
                      <input type="text" className="w-full border-b border-slate-200 py-2 pr-12 text-sm focus:outline-none focus:border-[#0047AB] transition-colors bg-transparent" />
                      <button className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-[#0047AB] underline underline-offset-2">적용</button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm font-bold text-green-600">
                      <span>번들 할인</span>
                      <span>-₩{totalDiscount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900">
                      <span>합계</span>
                      <span>₩{totalSale.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout} 
                    className="w-full bg-[#102A43] text-white py-4 rounded-full font-bold text-sm hover:bg-[#0047AB] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    결제하기
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AIChat />
    </div>
  );
};
