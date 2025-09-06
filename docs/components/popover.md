# Popover (팝오버)

버튼 클릭 시 인접 위치에 설명/컨텐츠를 표시합니다. 바깥 클릭/ESC로 닫히며, 포커스가 트리거로 복귀합니다.

## 마크업 구조
```html
<div class="dewp-popover">
  <button class="dewp-btn" id="infoBtn">도움말</button>
  <!-- 컨텐츠는 동적으로 생성되거나, 아래처럼 미리 둘 수도 있음 -->
  <div class="dewp-popover-content dewp-popover-bottom" id="infoContent" hidden>
    안내 텍스트
  </div>
</div>
```

## JavaScript 사용법
```ts
// 생성: trigger와 content를 선택자 또는 요소로 지정
const id = window.DEWP.createPopover({
  trigger: '#infoBtn',
  content: document.getElementById('infoContent')!,
  placement: 'bottom',           // top | bottom | left | right (기본 bottom)
  closeOnEscape: true,
});

// 열기/닫기/토글
window.DEWP.openPopover(id);
window.DEWP.closePopover(id);
window.DEWP.togglePopover(id);
```

## 동작
- 다른 팝오버가 열려있으면 새로운 팝오버를 열 때 기존 팝오버는 자동으로 닫힙니다.
- 트리거 클릭 시 토글.
- 바깥 클릭/ESC로 닫힘.
- 닫힐 때 트리거로 포커스 복귀.

## 접근성
- 트리거: `aria-haspopup="dialog"`, `aria-controls`, `aria-expanded` 적용.
- 컨텐츠: `role="dialog"`, `aria-labelledby` 적용.
- `.is-open` 클래스로 열림 상태를 표시하며, CSS에서 가시성을 제어합니다.

## 팁
- 컨텐츠를 미리 DOM에 넣어두면 SSR/SEO에 유리합니다.
- 여러 팝오버가 동일 부모 내에서 겹치지 않도록 `.dewp-popover` 래퍼로 그룹화하세요.
