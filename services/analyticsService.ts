
/**
 * GA4 이벤트 추적 서비스
 * 실제 적용 시 window.gtag가 정의되어 있어야 합니다.
 */

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  console.log(`[GA4 Event]: ${eventName}`, params);
  
  // 브라우저에 gtag가 설정되어 있는 경우 실제 데이터 전송
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

export const funnelEvents = {
  // 1단계: 팝업 상호작용
  popupClosed: () => trackEvent('popup_interaction', { action: 'close', step: 'welcome_popup' }),
  phoneSubmitted: (phone: string) => trackEvent('lead_submitted', { method: 'welcome_popup_sms', phone_length: phone.length }),
  
  // 2단계: 상품 선택
  addToCart: (productId: string, name: string, price: number) => trackEvent('add_to_cart', { 
    item_id: productId, 
    item_name: name, 
    price: price,
    currency: 'KRW'
  }),
  
  // 3단계: 결제 시도
  checkoutInitiated: (cartTotal: number, itemsCount: number) => trackEvent('begin_checkout', { 
    value: cartTotal, 
    currency: 'KRW',
    items_count: itemsCount
  }),
  
  // 4단계: 사후 상호작용
  discountCopied: (code: string) => trackEvent('discount_code_copied', { coupon: code })
};
