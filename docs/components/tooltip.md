# Tooltip (툴팁)

간단한 설명을 호버/포커스 시 노출합니다. CSS 기반이며, 접근성 보완을 위해 `aria-describedby`를 권장합니다.

## 마크업 구조
```html
<button class="dewp-btn dewp-tooltip" aria-describedby="tip-1">
  저장
  <span id="tip-1" role="tooltip" class="dewp-tooltip-content">설정을 저장합니다</span>
</button>
```

- `.dewp-tooltip` 래퍼(버튼/아이콘 등) 안에 `.dewp-tooltip-content`를 둡니다.
- 툴팁 콘텐츠는 `white-space: nowrap;`으로 길이가 늘어나지 않도록 처리됩니다.

## 사용법
- 별도의 JS 초기화 없이 CSS만으로 동작합니다.
- 키보드 포커스 접근을 위해 트리거 요소에 `aria-describedby`를 연결합니다.

## 팁
- 모바일 터치 환경에서는 툴팁 대신 Popover 사용을 고려하세요.
