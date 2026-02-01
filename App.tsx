
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Timer, Menu, X, CheckCircle, ArrowRight, Minus, Plus, ChevronDown, Star, Search, Filter, ThumbsUp, ChevronRight, Trash2, Copy, AlertCircle, ArrowLeft, Clock, BookOpen, Share2 } from 'lucide-react';
import { Product } from './types';

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
    id: 'postbiotics',
    title: "포스트바이오틱스란 무엇인가요? 장 건강 지원의 숨겨진 열쇠",
    category: "INGREDIENT SCIENCE",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>건강한 장을 유지하는 두 가지 필수 요소인 프리바이오틱스와 프로바이오틱스에 대해 들어보셨을 것입니다. 하지만 그것이 전체 그림의 일부일 뿐이라는 사실을 알고 계셨나요?</li>
            <li>소화기 건강에 유익한 도움을 줄 수 있는 연구 결과들이 뒷받침하는 '포스트바이오틱스'를 소개합니다. 여기에 포스트바이오틱스에 대해 알아야 할 모든 것이 있습니다.</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          소화 시스템의 두 가지 핵심 요소인 프리바이오틱스와 프로바이오틱스에 대해서는 아마 들어보셨을 것입니다. 반면, 포스트바이오틱스는 그만큼의 주목을 받지 못하고 있습니다. 많은 사람들이 포스트바이오틱스에 대해 들어본 적조차 없으며, 일상 루틴에 포함시키는 것은 더더욱 고려하지 않습니다.<br/><br/>
          하지만 최근 연구에 따르면 포스트바이오틱스는 장내 박테리아를 지원하는 데 있어 프리바이오틱스나 프로바이오틱스만큼이나 중요할 수 있습니다. 이것이 바로 우리가 프리바이오틱스, 프로바이오틱스, 그리고 포스트바이오틱스를 하나로 결합하여 획기적인 장 건강 보충제인 Praxis를 만든 이유입니다. 포스트바이오틱스에 대해 알아야 할 사항은 다음과 같습니다.
        </p>

        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">포스트바이오틱스란 무엇인가요?</h3>
        <p className="text-slate-600 leading-loose">
          포스트바이오틱스는 발효 과정 동안 식품 등급 미생물에 의해 생성되는 생리 활성 화합물로 정의될 수 있습니다. 구체적으로는 장내 "유익균"이 식이섬유를 분해할 때 생성됩니다. 이는 식물 탄수화물의 자연스러운 부산물로서, 단쇄지방산(SCFA)이 생성되는 과정입니다(잠시 후에 더 자세히 설명하겠습니다). 프로바이오틱스가 장 건강을 위해 무대 뒤에서 일하는 것처럼, 포스트바이오틱스도 마찬가지입니다. 하지만 포스트바이오틱스는 프로바이오틱스와 달리 살아있는 미생물이 아닙니다.<br/><br/>
          장 건강 전략을 유지하기 위해 용어를 정리해 봅시다:
        </p>
        <ul className="list-disc list-inside space-y-4 text-slate-600 bg-slate-50 p-6 rounded-2xl">
          <li><strong>프리바이오틱스(Prebiotics):</strong> 위장관에 존재하는 프로바이오틱스와 유익한 박테리아의 성장을 돕는 소화되지 않는 식품 성분으로 정의할 수 있습니다.</li>
          <li><strong>프로바이오틱스(Probiotics):</strong> 세계보건기구(WHO)에 따르면 적절한 양을 섭취했을 때 건강상의 이점을 제공하는 살아있는 박테리아로 정의됩니다. 이러한 미생물은 식품(사워크라우트, 김치, 케피어, 콤부차)과 프로바이오틱스 보충제에서 찾을 수 있습니다.</li>
          <li><strong>포스트바이오틱스(Postbiotics):</strong> 장 내벽을 구성하는 세포에 주요 에너지원을 제공하여 장 장벽 건강과 기능을 지원하는 데 도움을 줍니다.</li>
        </ul>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">포스트바이오틱스의 이점</h3>
        <p className="text-slate-600 leading-loose">
          포스트바이오틱스는 장 내벽을 구성하는 세포에 연료를 공급하고 장 장벽 기능을 지원합니다. 앞서 언급한 발효 과정을 기억하시나요? 실제로 일어나는 일은 다음과 같습니다.<br/><br/>
          "섭취한 프로바이오틱스와 장에 이미 존재하는 '유익한' 박테리아를 포함한 유익균은 특정 성분, 즉 프리바이오틱스와 일부 유형의 섬유질을 선택적으로 발효시킵니다."라고 Ritual의 수석 과학자인 Arianne Vance, MPH는 설명합니다. "이 발효의 한 가지 결과는 뷰티르산(butyrate), 아세트산(acetate), 프로피온산(propionate)과 같은 단쇄지방산(SCFA)의 생성입니다."<br/><br/>
          여기서 가장 주목할 만한 것은 <strong>뷰티르산(Butyrate)</strong>입니다. 연구에 따르면 뷰티르산은 결장을 둘러싼 세포의 주요 에너지원입니다. 이것이 바로 우리가 뷰티르산의 공급원으로 트리뷰티린(Tributyrin)을 선택한 이유입니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">포스트바이오틱스 생성을 돕는 방법</h3>
        <p className="text-slate-600 leading-loose">
          장내 포스트바이오틱스 농도를 지원하는 방법이 있습니다. 포스트바이오틱스는 앞서 언급한 발효 과정의 최종 결과물 중 하나이므로, 섬유질과 프리바이오틱스를 제공하는 식품 섭취를 늘리는 것이 하나의 선택지가 될 수 있습니다. 이는 자연스럽게 결장에서 포스트바이오틱스 생성을 증가시킬 수 있습니다.<br/><br/>
          부추, 예루살렘 아티초크, 아스파라거스, 양파, 밀, 마늘, 치커리, 귀리, 콩과 같은 식품에는 프리바이오틱스가 풍부합니다. 건강한 장내 세균을 돕는 음식을 충분히 섭취하는 것(섬유질 및 프리바이오틱스 식품)은 전반적인 소화기 건강을 지원하는 데 도움이 될 수 있습니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">포스트바이오틱스 보충제에서 확인해야 할 것</h3>
        <p className="text-slate-600 leading-loose">
          프리바이오틱스, 프로바이오틱스, 포스트바이오틱스를 섭취하는 것이 그 어느 때보다 쉬워졌습니다. Praxis를 루틴에 추가함으로써 현대 생활의 피할 수 없는 장애물들—까다로운 식성, 바쁜 일정, 특정 음식에 대한 제한된 접근 등—을 우회할 수 있습니다. 식단이나 라이프스타일이 어떠하든 장 건강을 지원하는 것은 중요합니다. 다만 임상적으로 연구된 포스트바이오틱스가 포함되어 있는지 확인하세요. 참고로: 트리뷰티린(Tributyrin)은 300mg 용량에서 임상적으로 연구되었으며, 이는 Praxis에 포함된 양과 동일합니다. 포스트바이오틱스는 프리바이오틱스나 프로바이오틱스만큼 널리 이용 가능하지 않으므로, 고품질 포뮬러를 확보하는 것이 더욱 중요합니다.<br/><br/>
          참고: Praxis의 각 배치는 정체성, 순도, 구성을 테스트하므로 라벨에 있는 내용이 캡슐에 들어있는 내용과 일치함을 확신할 수 있습니다. 또한 중금속, 미생물 및 주요 알레르기 유발 물질에 대한 규정 및 지침을 준수하는지 확인하고 제품의 품질과 안전을 보장하기 위해 제3자 테스트를 완료합니다.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>Wegh CAM, Geerlings SY, Knol J, Roeselers G, Belzer C. Postbiotics and Their Potential Applications in Early Life Nutrition and Beyond. Int J Mol Sci. 2019 Sep 20;20(19):4673.</li>
            <li>Campos-Perez W, Martinez-Lopez E. Effects of short chain fatty acids on metabolic .... Biochim Biophys Acta Mol Cell Biol Lipids. 2021 Feb 9;1866(5):158900.</li>
            <li>Robles Alonso V, Guarner F. Linking the gut microbiota to human health. Br J Nutr. 2013 Jan;109 Suppl 2:S21-6.</li>
            <li>World Health Organization. Guidelines for the Evaluation of Probiotics in Food. Report of a Joint FAO/WHO Working Group on Drafting Guidelines for the Evaluation of Probiotics in Food. 2002.</li>
            <li>Gibson GR, Roberfroid MB. Dietary modulation of the human colonic microbiota: introducing the concept of prebiotics. J Nutr. 1995 Jun;125(6):1401-12.</li>
            <li>Carlson, J. L., Erickson, J. M., Lloyd, B. B., & Slavin, J. L. (2018). ...and Sources of Prebiotic Dietary Fiber. Current developments in nutrition, 2(3), nzy005.</li>
            <li>MD, Toni Golen, and Hope Ricciotti MD. “What Are Postbiotics?” Harvard Health, 1 Nov. 2021.</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'shelf-stability',
    title: "유산균에도 유통기한이 있나요? 전문가가 전하는 진실",
    category: "SHELF STABILITY",
    image: "https://images.unsplash.com/photo-1506330682178-5c41e4439c37?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>프로바이오틱스 영양제 속 살아있는 균에도 분명 유통기한은 존재합니다. 하지만 기한이 지난 후에는 언제까지 유효할까요?</li>
            <li>유산균의 유통기한(Shelf Life)은 사용된 균주, 캡슐화 기술, 그리고 보관 환경에 따라 결정됩니다.</li>
            <li>결론부터 말씀드리면, Trieb Praxis의 유통기한은 제조일로부터 약 1년입니다.</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          장 건강을 위해 프로바이오틱스를 챙겨 드시고 계신가요? 이는 전반적인 웰빙을 위한 아주 훌륭한 습관입니다. 하지만 우리가 섭취하는 유산균이 '살아있는 박테리아'라는 점을 떠올려보면 한 가지 의문이 생깁니다. <strong>"유산균에도 유통기한이 있을까요?"</strong> 짧게 답하자면, <strong>"네, 있습니다."</strong> 프로바이오틱스는 살아있는 생명체이기에 언젠가는 죽게 마련이며, 정확히 언제 효력을 잃는지는 제품마다 다릅니다.<br/><br/>
          우리는 전문가들의 의견을 바탕으로 유산균의 유통기한이 어떻게 결정되는지, 무엇을 주의해야 하는지, 그리고 왜 Praxis가 냉장 보관 없이도 신선하게 유지되는지 자세히 설명해 드리고자 합니다.
        </p>
        
        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">유산균의 수명은 얼마나 될까요?</h3>
        <p className="text-slate-600 leading-loose">
          유산균의 유통기한을 확인하는 가장 정확한 방법은 제품 패키지에 기재된 날짜를 확인하는 것입니다. 여기에는 유효 성분인 살아있는 유익균의 수, 즉 <strong>CFU(Colony-Forming Units)</strong>가 유통기한까지 얼마나 보장되는지도 함께 명시되어야 합니다.<br/><br/>
          대부분의 프로바이오틱스는 약 1년 정도의 유통기한을 가집니다. 하지만 캡슐화 방식이나 냉장 보관 필요 여부, 그리고 사용된 균주에 따라 수명은 더 짧아질 수도, 길어질 수도 있습니다. 어떤 균주들은 태생적으로 다른 균주들보다 환경 변화에 더 취약하고 불안정하기 때문입니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">유통기한이 지난 유산균을 먹어도 되나요?</h3>
        <p className="text-slate-600 leading-loose">
          가급적 유통기한이 지나기 전에 섭취할 것을 권장합니다. 냉장 보관용 제품이든 실온 보관 제품이든, 라벨에 표기된 보장 균수를 온전히 섭취하려면 기한 내 복용이 필수적입니다. 유통기한이 지난 제품에 대한 테스트 결과에 따르면, 시간이 지날수록 유효 성분의 농도와 효능은 점차 감소하게 됩니다. (1)
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">Trieb Praxis의 유통기한과 품질 유지</h3>
        <p className="text-slate-600 leading-loose">
          우리가 Praxis를 설계할 때 가장 중요하게 생각한 것은 '편의성'이었습니다. 언제 어디서든 챙겨 먹기 편해야 건강한 습관이 되기 때문입니다. 그래서 우리는 <strong>냉장 보관이 필요 없는(Shelf-stable)</strong> 실온 보관 기술을 적용했습니다. 습기를 완벽히 차단하도록 설계된 특수 용기를 사용해 유산균의 생존력을 극대화했습니다. (2)<br/><br/>
          또한 우리는 세계에서 가장 활발히 임상 연구된 두 가지 균주인 <strong>Lactobacillus rhamnosus (LGG®)</strong>와 <strong>Bifidobacterium animalis ssp. lactis (BB-12®)</strong>를 선택했습니다. Trieb Praxis는 권장 보관 조건에서 보관 시, 제조일로부터 1년 동안 라벨에 표기된 균수를 안정적으로 보장합니다.*
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">보관 방법은 어떻게 되나요?</h3>
        <p className="text-slate-600 leading-loose">
          매우 간단합니다. Praxis를 종합 비타민 옆, 혹은 손이 잘 닿는 선반 위에 두세요. 습기가 없는 건조한 환경이면 충분합니다. 직사광선을 피해 서늘하고 건조한 곳에 보관하는 것이 유산균의 활동성을 가장 잘 유지하는 방법입니다.<br/><br/>
          Trieb는 유통기한이 끝나는 그날까지 제품의 잠재력을 유지 위해 최선을 다합니다. 이제 여러분은 안심하고 여러분의 장에 무엇을 넣을지 결정하기만 하면 됩니다.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>Wilcox, Hannah, Carr, Charles, Seney, Shannon, Reid, Gregor, Burton, Jeremy. (2020). “Expired Probiotics: What is Really in Your Cabinet?” Retrieved from FEMS Microbes.</li>
            <li>Best Practices Guidelines for Probiotics. (2017). Retrieved from the Council for Responsible Nutrition.</li>
            <li>Hogan DE, Ivanina EA, Robbins DH. (2018). Probiotics: a review for clinical use. Retrieved from Gastroenterology & Endoscopy News.</li>
            <li>Fenster, Kurt, Freeburg, Barbara, Barbara, Hollard, Chris, Wong, Connie, Rønhave Laursen, Ouwehand, Arthur C. (2019). The Production and Delivery of Probiotics: A Review of a Practical Approach. Retrieved from Microorganisms.</li>
            <li>Govender, Mershen, Choonara, Yahya E., Kumar, Pradeep, du Toit, Lisa C., van Vuuren, Sandy, Pillay, Viness Pillay. (2014) A Review of the Advancements in Probiotic Delivery: Conventional vs. Non-conventional Formulations for Intestinal Flora Supplementation. Retrieved from AAPS PharmSciTech.</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'selection',
    title: "프로바이오틱스 선택 시 확인해야 할 4가지 요소",
    category: "GUIDE",
    image: "https://images.unsplash.com/photo-1550577624-42f7424ed08b?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Essential Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>시중에 정말 많은 제품이 출시되어 있어 고품질 프로바이오틱스 보충제를 선택하는 것이 까다로울 수 있습니다. 이에 Trieb의 과학 자문팀을 통해 장 건강 포뮬러에서 가장 중요하게 살펴봐야 할 핵심 요소가 무엇인지 확인했습니다.*</li>
            <li>임상 연구된 균주부터 지연 방출형 캡슐까지, 구매를 결정하기 전 반드시 확인해야 할 4가지 핵심 요소를 정리해 드립니다.*</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          <strong>ICYMI: 우리는 Praxis에 대해 <span className="underline decoration-[#0047AB] decoration-2 underline-offset-4">두 가지 체외 장 모델 연구</span>를 수행했으며, 결과는 매우 성공적이었습니다.</strong><br/><br/>
          고품질 프로바이오틱스 보충제를 쇼핑하는 것은 생각보다 훨씬 어려울 수 있습니다. 시중에는 너무 많은 정보가 넘쳐나기 때문에 선택 과정이 더욱 혼란스럽죠. 장 건강 포뮬러에서 가장 중요하게 살펴봐야 할 특징이 무엇인지, 그리고 보충제가 실제로 신뢰할 수 있는지 어떻게 판단하는지 Trieb의 과학 자문팀에게 물었습니다. 그들이 전하는 답변은 다음과 같습니다.*
        </p>

        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">Check 1: 임상 연구된 함량</h3>
        <p className="text-slate-600 leading-loose">
          프로바이오틱스 보충제를 섭취할 때 가장 큰 고민은 '과연 이것이 제 역할을 하고 있을까?'일 것입니다. 이 불안을 덜어내는 가장 좋은 방법은 임상 연구에서 사용된 것과 동일한 함량의 균주를 함유한 포뮬러를 선택하는 것입니다. 이는 제품의 품질과 정밀함을 나타내는 중요한 지표입니다. 각 균주에 대해 임상 연구 데이터가 일치하는 브랜드를 선택한다면, "이게 정말 효과가 있는 거야?"라는 내면의 의심을 지울 수 있습니다.*
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">Check 2: 포스트바이오틱스 지원</h3>
        <p className="text-slate-600 leading-loose">
          장 건강을 지원하는 데 있어 프로바이오틱스의 이점은 이미 잘 알고 계실 것입니다. 하지만 그것이 전체 그림의 절반에 불과하다는 사실을 알고 계셨나요? 포스트바이오틱스—즉 발효 과정에서 미생물에 의해 생성되는 생리 활성 요소—는 또 다른 중요한 요소입니다. 시장의 상위 제품 중 대다수는 포스트바이오틱스를 포함하지 않지만, Praxis는 장벽을 구성하는 세포의 주요 에너지원인 뷰티르산을 공급하는 트리뷰티린(Tributyrin)을 함유하고 있습니다.* (1, 2)
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">Check 3: 투명한 균주 정보</h3>
        <p className="text-slate-600 leading-loose">
          신뢰할 수 있는 브랜드를 고르는 가장 간단한 방법 중 하나는 그들이 성분과 제조 과정에 대해 얼마나 투명하게 공개하는지 살펴보는 것입니다. 즉, 성분의 품질을 입증할 수 있는 '영수증'을 보여줄 수 있는지 확인하세요. Praxis의 경우, 모든 정보가 투명하게 공개되는 'Made Traceable™' 원칙을 따릅니다. 이는 원산지부터 제조 공정까지 모든 정보가 투명하게 공개됨을 의미하며, 이는 시중의 많은 브랜드가 쉽게 따라 할 수 없는 Trieb만의 기준입니다.*
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">Check 4: 지연 방출형 캡슐</h3>
        <p className="text-slate-600 leading-loose">
          포뮬러 성분만큼이나 중요한 것이 바로 '전달 방식'입니다. 유산균은 위산이라는 험난한 환경을 지나 장까지 안전하게 도달해야 합니다. 전문가들은 위에서 녹지 않고 장에서 녹도록 설계된 <strong>DR(Delayed-Release) 캡슐</strong> 기술을 권장합니다. 이 기술은 핵심 성분이 위산의 가혹한 환경을 견뎌내고 목표 지점에 도달할 수 있도록 돕습니다.*<br/><br/>
          또한, 습기에 민감한 유산균을 보호하기 위한 전용 용기(CSP 용기) 사용 여부도 꼭 확인해야 할 포인트입니다. Praxis는 이 모든 조건을 충족하여 마지막 한 알까지 최적의 상태를 유지합니다.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>Wegh CAM, Geerlings SY, Knol J, Roeselers G, Belzer C. Postbiotics and Their Potential Applications in Early Life Nutrition and Beyond. Int J Mol Sci. 2019 Sep 20;20(19):4673.</li>
            <li>Campos-Perez W, Martinez-Lopez E. Effects of short chain fatty acids in human health. Biochim Biophys Acta Mol Cell Biol Lipids. 2021 Feb 9;1866(5):158900.</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'timing',
    title: "유산균, 언제 섭취하는 것이 가장 좋을까요?",
    category: "ROUTINE",
    image: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&q=80&w=800",
    readTime: "3 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Key Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>일반적인 유산균은 위산이 희석된 '식사 중'이나 '식후' 섭취가 권장됩니다.</li>
            <li>지연 방출형 캡슐 기술이 적용된 제품은 식전/식후 관계없이 섭취 가능합니다.</li>
            <li>가장 중요한 것은 '시간대'보다 '매일 꾸준히' 먹는 습관입니다.</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          아침 공복에 물 한 잔과 함께? 아니면 저녁 식사 후에? 유산균 섭취 시간에 대한 의견은 분분합니다. 어떤 것이 과학적으로 옳은 방법일까요? 결론부터 말하자면, 제품의 기술력에 따라 정답은 달라집니다.
        </p>

        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">위산의 공격을 피하라</h3>
        <p className="text-slate-600 leading-loose">
          프로바이오틱스 섭취의 최대 난관은 '위산'입니다. 공복 상태의 위 내부는 pH 2 이하의 강한 산성을 띱니다. 반면 식사를 하면 음식물이 위산을 중화시켜 pH가 일시적으로 상승합니다. 따라서 보호 코팅이 없는 일반적인 1세대 유산균이나 요거트라면, 위산의 공격이 덜한 <strong>식사 도중이나 식사 직후</strong>에 먹는 것이 생존율을 높이는 방법입니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">기술이 만드는 자유</h3>
        <p className="text-slate-600 leading-loose">
          하지만 현대의 기술은 이러한 제약을 극복했습니다. Trieb Praxis에 적용된 <strong>지연 방출형 캡슐(Delayed-Release Capsule)</strong>은 위산의 산도에서는 녹지 않고 견디다가, 소장에 도달했을 때 비로소 붕해되도록 설계되었습니다.<br/><br/>
          이러한 기술이 적용된 제품이라면 공복이든 식후든 상관없습니다. 아침에 일어나서 양치 후 먹거나, 점심 식사 전 챙겨 먹는 등 여러분의 라이프스타일에 가장 편한 시간을 선택하면 됩니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">일관성의 힘</h3>
        <p className="text-slate-600 leading-loose">
          장내 미생물 생태계는 하루아침에 바뀌지 않습니다. 유익균이 정착하고 군락을 형성하기 위해서는 지속적인 공급이 필수적입니다. 따라서 가장 좋은 섭취 시간은 <strong>'여러분이 까먹지 않고 매일 챙길 수 있는 시간'</strong>입니다. 침대 머리맡이나 정수기 옆 등 눈에 잘 띄는 곳에 두고 매일의 루틴으로 만드세요.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>Tompkins TA, et al. "The impact of meals on a probiotic during transit through a model of the human upper gastrointestinal tract." Beneficial Microbes. 2011.</li>
            <li>Bezkorovainy A. "Probiotics: determinants of survival and growth in the gut." Am J Clin Nutr. 2001.</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'definition',
    title: "프로바이오틱스란 무엇인가요?",
    category: "EDUCATION",
    image: "https://images.unsplash.com/photo-1579684385180-1ea55f61d2d2?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Key Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>프로바이오틱스는 적정량 섭취 시 숙주(사람)에게 건강상 이익을 주는 살아있는 미생물입니다.</li>
            <li>단순히 발효 식품에 들어있는 균이라고 해서 모두 프로바이오틱스는 아닙니다.</li>
            <li>이들은 소화기 건강, 면역 지원, 영양소 합성 등 다양한 역할을 수행합니다.</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          요거트, 콤부차, 김치, 그리고 캡슐 영양제까지. '프로바이오틱스'라는 단어는 우리 주변 어디에나 있습니다. 하지만 정확히 무엇을 의미하며, 우리 몸에서 어떤 역할을 할까요? 과학적 정의부터 역사까지, 프로바이오틱스의 모든 것을 파헤쳐 봅니다.
        </p>

        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">과학적 정의</h3>
        <p className="text-slate-600 leading-loose">
          2001년, 세계보건기구(WHO)와 국제식량농업기구(FAO)는 프로바이오틱스를 다음과 같이 정의했습니다:<br/>
          <strong>"적당량을 섭취했을 때 숙주의 건강에 유익한 작용을 하는 살아있는 미생물."</strong><br/><br/>
          이 정의에는 중요한 조건이 포함되어 있습니다. 1) 살아있어야 하고, 2) 충분한 양이어야 하며, 3) 과학적으로 입증된 건강상의 이점이 있어야 한다는 점입니다. 즉, 모든 유산균이 프로바이오틱스는 아닙니다. 임상 연구를 통해 그 효능이 검증된 균주만이 그 자격을 얻습니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">식품 vs 보충제</h3>
        <p className="text-slate-600 leading-loose">
          김치나 사워크라우트 같은 발효 식품에도 유익균이 풍부합니다. 하지만 이러한 식품 속 균들은 종류와 양을 정확히 알기 어렵고, 위산에 의해 쉽게 사멸될 수 있습니다. 반면 건강기능식품으로 만들어진 프로바이오틱스는 특정 균주를 선별하여 배양하고, 캡슐 기술 등으로 보호하여 장까지 도달할 수 있도록 설계된 '정밀한 도구'입니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">우리 몸의 수호자</h3>
        <p className="text-slate-600 leading-loose">
          우리 장에는 수조 마리의 미생물이 살고 있는 거대한 생태계(마이크로바이옴)가 있습니다. 프로바이오틱스는 이 생태계의 균형을 맞추는 평화 유지군입니다. 유해균의 증식을 억제하고, 장벽을 튼튼하게 하여 나쁜 물질이 몸속으로 들어오는 것을 막으며, 면역 시스템을 훈련시킵니다.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>FAO/WHO. "Health and Nutritional Properties of Probiotics in Food including Powder Milk with Live Lactic Acid Bacteria." 2001.</li>
            <li>Hill C, et al. "The International Scientific Association for Probiotics and Prebiotics consensus statement on the scope and appropriate use of the term probiotic." Nat Rev Gastroenterol Hepatol. 2014.</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'pre-vs-pro',
    title: "프리바이오틱스 vs 프로바이오틱스: 차이점이 무엇인가요?",
    category: "COMPARISON",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Key Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>프로바이오틱스는 '유익균(씨앗)', 프리바이오틱스는 '유익균의 먹이(비료)'입니다.</li>
            <li>프리바이오틱스는 소화되지 않고 장까지 내려가 유익균의 성장을 돕습니다.</li>
            <li>이 둘을 함께 섭취하는 것을 '신바이오틱스(Synbiotics)'라고 합니다.</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          건강기능식품 코너에서 '프리(Pre)'와 '프로(Pro)'라는 단어를 보고 헷갈린 적이 있으신가요? 글자 하나 차이지만 그 역할은 하늘과 땅 차이입니다. 정원을 가꾸는 것에 비유하여 이 둘의 관계를 명쾌하게 설명해 드립니다.
        </p>

        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">프로바이오틱스: 씨앗 (The Seed)</h3>
        <p className="text-slate-600 leading-loose">
          <strong>프로바이오틱스(Probiotics)</strong>는 살아있는 유익한 박테리아 자체를 말합니다. 황무지가 된 장이라는 토양에 심는 '씨앗'이라고 생각하면 됩니다. 락토바실러스나 비피도박테리움 등이 대표적이며, 이들이 장에 정착하여 군락을 이루는 것이 목표입니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">프리바이오틱스: 비료 (The Fertilizer)</h3>
        <p className="text-slate-600 leading-loose">
          <strong>프리바이오틱스(Prebiotics)</strong>는 우리 몸의 효소로는 소화되지 않는 식이섬유나 성분을 말합니다. 소화되지 않고 대장까지 내려간 이 성분들은 그곳에 살고 있는 유익균들의 훌륭한 '먹이'가 됩니다.<br/><br/>
          아무리 좋은 씨앗(프로바이오틱스)을 심어도, 영양분(프리바이오틱스)이 없으면 싹을 틔우고 자랄 수 없습니다. 프리바이오틱스는 유익균의 증식을 돕고 활동성을 높이는 비료 역할을 합니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">신바이오틱스: 완벽한 콤비</h3>
        <p className="text-slate-600 leading-loose">
          따라서 이 둘은 떼려야 뗄 수 없는 관계입니다. 프로바이오틱스와 프리바이오틱스를 함께 배합한 제품을 <strong>신바이오틱스(Synbiotics)</strong>라고 부릅니다. Trieb Praxis는 여기에 유산균의 대사산물인 포스트바이오틱스까지 더하여, 씨앗과 비료, 그리고 수확물까지 한 번에 제공하는 차세대 솔루션입니다.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>Gibson GR, et al. "Expert consensus document: The International Scientific Association for Probiotics and Prebiotics (ISAPP) consensus statement on the definition and scope of prebiotics." Nat Rev Gastroenterol Hepatol. 2017.</li>
            <li>Pandey KR, et al. "Probiotics, prebiotics, and synbiotics- a review." J Food Sci Technol. 2015.</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'mechanism',
    title: "프로바이오틱스는 어떻게 작용하나요?",
    category: "MECHANISM",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Key Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>유익균은 장내에서 유해균과 경쟁하여 그들의 성장을 억제합니다(경쟁적 배제).</li>
            <li>장 점막을 튼튼하게 하여 유해 물질이 침투하지 못하도록 방어벽을 강화합니다.</li>
            <li>면역 세포와 상호 작용하여 과도한 면역 반응을 조절하고 전반적인 면역력을 지원합니다.</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          눈에 보이지 않는 미세한 박테리아가 어떻게 소화 불량부터 피부 트러블, 심지어 기분까지 영향을 미칠까요? 프로바이오틱스가 우리 몸속에서 수행하는 세 가지 주요 작용 메커니즘을 알아봅니다.
        </p>

        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">1. 경쟁적 배제 (영토 전쟁)</h3>
        <p className="text-slate-600 leading-loose">
          장은 한정된 공간이고 영양분도 제한적입니다. 유익균이 장벽에 먼저 자리를 잡고 먹이를 선점하면, 병원성 박테리아(유해균)는 설 곳을 잃고 굶주리게 됩니다. 이를 '경쟁적 배제(Competitive Exclusion)'라고 합니다. 또한 유산균은 젖산(Lactic acid)을 분비하여 장내 환경을 산성으로 만드는데, 대부분의 유해균은 산성 환경에서 생존하기 어렵습니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">2. 장벽 강화 (성벽 보수)</h3>
        <p className="text-slate-600 leading-loose">
          우리의 장 점막은 외부의 독소와 병원균이 혈류로 들어오지 못하게 막는 1차 방어선입니다. 유익균은 장 상피세포 사이의 결합(Tight Junction)을 단단하게 유지하도록 돕고, 점액 분비를 촉진하여 물리적인 방어벽을 강화합니다. 이는 흔히 말하는 '장 누수 증후군'을 예방하는 데 중요한 역할을 합니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">3. 면역 조절 (지휘관 역할)</h3>
        <p className="text-slate-600 leading-loose">
          인체 면역 세포의 70% 이상이 장에 집중되어 있다는 사실을 아시나요? 장내 미생물은 장 점막 아래의 면역 세포들과 끊임없이 신호를 주고받습니다. 유익균은 면역 세포가 바이러스에 대항하도록 훈련시키기도 하고, 반대로 알레르기나 염증 같은 과도한 면역 반응은 진정시키는 지휘관(Regulator) 역할을 수행합니다.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>Plaza-Diaz J, et al. "Mechanisms of Action of Probiotics." Advances in Nutrition. 2019.</li>
            <li>Bermudez-Brito M, et al. "Probiotic mechanisms of action." Annals of Nutrition and Metabolism. 2012.</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'signs',
    title: "유산균이 효과가 있다는 신호들",
    category: "RESULTS",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Key Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>섭취 초기(첫 주)에는 가스가 차거나 배가 꾸르륵거리는 일시적인 적응 증상이 나타날 수 있습니다.</li>
            <li>몇 주가 지나면 배변 활동이 규칙적으로 변하고 속이 편안해집니다.</li>
            <li>장기적으로는 피부 개선, 활력 증진 등 전신적인 건강 혜택을 경험할 수 있습니다.</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          유산균 섭취를 시작했는데 아무런 변화가 없거나, 오히려 배에 가스가 차서 당황스러우신가요? 걱정하지 마세요. 장내 환경이 재건축되는 과정에서 일어나는 자연스러운 반응일 수 있습니다. 시간의 흐름에 따라 나타나는 몸의 변화를 미리 알아두세요.
        </p>

        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">1단계: 적응기 (1~7일)</h3>
        <p className="text-slate-600 leading-loose">
          새로운 유익균이 투입되어 기존의 미생물들과 경쟁하고 자리를 잡는 시기입니다. 이 과정에서 발효 활동이 활발해지며 일시적으로 가스가 차거나, 복부 팽만감, 가벼운 배변 변화(묽은 변 등)가 나타날 수 있습니다. 이를 흔히 '명현 현상'이라고 부르며, 보통 일주일 이내에 자연스럽게 사라집니다. 만약 불편함이 심하다면 섭취를 격일로 줄였다가 서서히 늘려보세요.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">2단계: 안정기 (2~4주)</h3>
        <p className="text-slate-600 leading-loose">
          유익균이 자리를 잡고 장내 환경이 안정화되는 시기입니다. 가장 먼저 느끼는 변화는 <strong>규칙적인 배변</strong>입니다. 변비나 설사가 줄어들고, 변의 형태가 바나나 모양처럼 건강해집니다. 식사 후 더부룩함이 줄어들고 속이 한결 가볍고 편안해지는 것을 느낄 수 있습니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">3단계: 변화기 (1개월 이상)</h3>
        <p className="text-slate-600 leading-loose">
          장 건강이 전신 건강으로 이어지는 단계입니다. 장내 독소가 줄어들면서 피부가 맑아지거나 트러블이 완화될 수 있습니다. 영양소 흡수율이 좋아져 활력이 생기고, 면역력이 균형을 잡으면서 환절기 건강 관리에 도움이 됩니다. 어떤 분들은 기분이 좋아지거나 수면의 질이 개선되는 것을 경험하기도 합니다(장-뇌 축 이론). 꾸준함이 가져다주는 진짜 선물입니다.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>Williams NT. "Probiotics." American Journal of Health-System Pharmacy. 2010.</li>
            <li>Zhang H, et al. "Impact of Probiotics on Gut Health: Clinical Evidence." International Journal of Molecular Sciences. 2018.</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'storage',
    title: "유산균, 반드시 냉장 보관해야 할까요?",
    category: "STORAGE",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800",
    readTime: "3 min read",
    content: (
      <div className="space-y-8">
        <div className="bg-[#F0F7FF] p-8 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="font-bold text-[#0047AB] uppercase tracking-widest text-xs mb-2">Key Takeaways</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
            <li>모든 유산균이 냉장 보관을 필요로 하는 것은 아닙니다. 기술 발전에 따라 실온 보관 제품이 늘어나고 있습니다.</li>
            <li>유산균의 가장 큰 적은 온도보다 '수분'입니다.</li>
            <li>동결 건조 기술과 특수 건조 용기(CSP)는 실온에서도 유산균의 생존을 보장합니다.</li>
          </ul>
        </div>

        <p className="lead text-lg md:text-xl font-medium text-slate-800 leading-loose">
          "생균이니까 당연히 냉장고에 넣어야지." 많은 분들이 이렇게 생각합니다. 과거에는 이것이 정답이었습니다. 하지만 유산균 보관의 상식도 과학 기술의 발전과 함께 변화하고 있습니다. 이제는 실온에 두고 먹어도 괜찮습니다. 그 이유를 알아볼까요?
        </p>

        <hr className="border-[#E0F2FE]" />

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">동결 건조: 시간을 멈추는 기술</h3>
        <p className="text-slate-600 leading-loose">
          초기의 액상 발효유나 1세대 유산균들은 열에 매우 취약했습니다. 하지만 현대의 고품질 프로바이오틱스는 <strong>동결 건조(Freeze-drying)</strong> 공정을 거칩니다. 균을 급속 동결시킨 후 수분을 제거하여 일종의 '가사 상태(Dormant state)'로 만드는 것입니다. 이렇게 잠든 유산균은 대사 활동을 멈추기 때문에 실온에서도 생명력을 유지할 수 있습니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">진짜 적은 '열'이 아니라 '습기'</h3>
        <p className="text-slate-600 leading-loose">
          실온 보관 시 가장 주의해야 할 것은 온도가 아니라 <strong>습기(Moisture)</strong>입니다. 미세한 수분이라도 침투하면 동결 건조된 유산균이 잠에서 깨어나게 됩니다. 먹이가 없는 캡슐 안에서 깨어난 유산균은 곧 굶어 죽게 되죠.<br/><br/>
          Trieb Praxis는 이 문제를 해결하기 위해 <strong>CSP(Active Scavenging Polymer)</strong> 용기를 사용합니다. 용기 벽면 자체가 강력한 흡습제 역할을 하도록 설계되어 있어, 뚜껑을 여닫을 때 들어가는 미세한 수분까지 즉각적으로 제거합니다. 덕분에 냉장고 밖에서도 마지막 한 알까지 신선함을 유지합니다.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-[#0047AB] serif-italic">눈에 보여야 챙겨 먹는다</h3>
        <p className="text-slate-600 leading-loose">
          냉장 보관이 필수라면 여행 갈 때 챙겨가기 어렵고, 냉장고 깊숙이 넣어두면 깜빡 잊기 쉽습니다. Trieb Praxis는 직사광선을 피해 서늘한 곳이라면 어디든 보관 가능합니다. 식탁 위, 정수기 옆, 사무실 책상 등 눈에 잘 띄는 곳에 두세요. 유산균의 효과를 보는 가장 확실한 방법은 '매일 꾸준히' 먹는 것이니까요.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E0F2FE]">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">References</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 font-mono">
            <li>Broeckx G, et al. "Drying techniques of probiotic bacteria as an important step towards the development of novel pharmaceutic products." Int J Pharm. 2016.</li>
            <li>Champagne CP, et al. "Challenges in the addition of probiotic cultures to foods." Crit Rev Food Sci Nutr. 2005.</li>
          </ol>
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

      <div className="max-w-2xl mx-auto">
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

// New SoldOutPopup component with the Trieb aesthetic and a discount incentive
const SoldOutPopup = ({ onClose }: { onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const code = "TRIEB-WAIT-30";

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
          <p className="text-xs text-slate-600 font-bold mb-4">기다려주시는 분들을 위한<br/>30% 시크릿 할인 코드</p>
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

const App: React.FC = () => {
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
              <div className="p-8 md:p-10 border-b border-[#E0F2FE] flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#0047AB]">쇼핑백 ({cartItems.length})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-8">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag className="w-12 h-12 text-[#E0F2FE] mb-4" />
                    <p className="text-slate-400 text-sm italic">쇼핑백이 비어 있습니다.</p>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex gap-6 pb-8 border-b border-[#E0F2FE] group last:border-0">
                      <div className="w-20 h-24 bg-[#F0F7FF] rounded-xl flex items-center justify-center shrink-0">
                        <img src={item.image} className="w-12 object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between font-bold text-sm mb-1 text-[#0047AB]">
                          <span>{item.name}</span>
                          <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic mb-4">Gut Health</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-[#E0F2FE]">
                             <button onClick={() => updateQty(item.id, -1)} className="text-slate-400 hover:text-[#0047AB]"><Minus className="w-3 h-3"/></button>
                             <span className="text-xs font-bold text-slate-600 w-4 text-center">{item.qty}</span>
                             <button onClick={() => updateQty(item.id, 1)} className="text-slate-400 hover:text-[#0047AB]"><Plus className="w-3 h-3"/></button>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-300 line-through">₩{(item.originalPrice * item.qty).toLocaleString()}</p>
                            <p className="font-black text-sm text-[#0047AB]">₩{(item.salePrice * item.qty).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-8 md:p-10 bg-white border-t border-[#E0F2FE] shadow-[0_-15px_40px_rgba(0,0,0,0.05)]">
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>정상금액</span>
                      <span>₩{totalOriginal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-blue-500 uppercase tracking-widest">
                      <span>할인금액</span>
                      <span>- ₩{totalDiscount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest border-t border-[#F8FAFC] pt-3">
                      <span>배송비</span>
                      <span>무료</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 font-black text-[#0047AB]">
                      <span className="text-xs uppercase tracking-[0.2em]">결제금액</span>
                      <span className="text-2xl tracking-tighter">₩{totalSale.toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout} 
                    className="w-full bg-[#0047AB] text-white py-5 rounded-full font-black uppercase tracking-[0.25em] text-[11px] hover:bg-blue-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                  >
                    주문하기 <ChevronRight className="w-4 h-4" />
                  </button>
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
