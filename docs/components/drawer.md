# Drawer (드로어)

화면 가장자리에서 슬라이드되어 나타나는 패널입니다. 기존 DOM 요소를 대상으로 인스턴스를 생성해 제어합니다.

## 마크업 구조

```html
<!-- 대상 요소(기존 DOM)를 준비합니다 -->
<div id="my-drawer" class="dewp-drawer dewp-drawer-right dewp-drawer-md">
  <div class="dewp-drawer-header">
    <h3 class="dewp-drawer-title">제목</h3>
    <button class="dewp-drawer-close" type="button" aria-label="닫기" title="닫기" role="button">
      <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
  </div>
  <div class="dewp-drawer-content">
    내용
  </div>
</div>
```

위치/크기 클래스를 조합합니다:
- 위치: `dewp-drawer-left | dewp-drawer-right | dewp-drawer-top | dewp-drawer-bottom`
- 크기: `dewp-drawer-sm | dewp-drawer-md | dewp-drawer-lg | dewp-drawer-xl`

## JavaScript 사용법

```ts
// 생성: 기존 DOM 요소를 target으로 지정
const id = window.DEWP.createDrawer({
  target: '#my-drawer',
  overlay: true,
  closeOnEscape: true,
  closeOnOverlayClick: true,
  onOpen: () => {},
  onClose: () => {},
});

// 열기/닫기/토글
window.DEWP.openDrawer(id);
window.DEWP.closeDrawer(id);
window.DEWP.toggleDrawer(id);

// 상태/제거
window.DEWP.isDrawerOpen(id); // boolean
window.DEWP.destroyDrawer(id);

// 전체 닫기
window.DEWP.closeAllDrawers();

// 자동 초기화: 페이지 내 .dewp-drawer들을 스캔해 인스턴스화
window.DEWP.autoInitializeDrawers();
```

## 접근성
- 닫기 버튼에 `aria-label`/`title`/`role`이 설정됩니다.
- ESC 키로 닫기 지원(옵션 제어).
- 오버레이 클릭으로 닫기(옵션 제어).

## 팁
- 한 번에 하나만 열리도록 설계되어 `open` 호출 시 기존 열린 드로어는 자동으로 닫힙니다.
- 오픈 시 `body` 스크롤이 잠깁니다.
