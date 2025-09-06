# Dropdown (드롭다운)

DEWP 드롭다운은 접근성을 고려한 토글/메뉴 컴포넌트입니다. 전역 자동 초기화와 수동 제어를 모두 지원합니다.

## 마크업 구조

```html
<div class="dewp-dropdown">
  <button class="dewp-dropdown-toggle" type="button">
    선택하세요
  </button>
  <div class="dewp-dropdown-menu" role="menu">
    <div class="dewp-dropdown-item" data-value="opt1" role="menuitem">옵션 1</div>
    <div class="dewp-dropdown-item" data-value="opt2" role="menuitem">옵션 2</div>
  </div>
</div>
```

- 토글과 메뉴는 동일한 `.dewp-dropdown` 래퍼의 자식이어야 서로 바르게 연결됩니다.
- 라이브러리가 id/`aria-controls`/`aria-expanded` 등 접근성 속성을 자동으로 부여합니다.

## JavaScript 사용법

전역 자동 초기화:

```html
<script>
  // DOM 준비 후 페이지 내 모든 .dewp-dropdown을 자동 인식
  window.DEWP.autoInitializeDropdowns();
</script>
```

수동 제어 API:

```ts
// 생성
const id = window.DEWP.createDropdown('.dewp-dropdown');

// 토글/표시/숨김
window.DEWP.toggleDropdown(id);
window.DEWP.showDropdown(id);
window.DEWP.hideDropdown(id);

// 값 제어
window.DEWP.setDropdownValue('.dewp-dropdown', 'opt1');
const value = window.DEWP.getSelectedValue('.dewp-dropdown');
const text = window.DEWP.getSelectedText('.dewp-dropdown');
```

## 접근성
- 트리거에 `aria-haspopup="menu" | aria-controls | aria-expanded` 자동 설정
- 메뉴/아이템에 `role="menu" | role="menuitem"` 적용
- ESC 시 닫히고, 포커스는 트리거로 복귀

## 팁
- 동일 라인에 여러 드롭다운이 있을 때, 각 토글은 자신이 속한 `.dewp-dropdown` 내부의 메뉴만 열고 닫습니다.
- 드롭다운 아이템은 `data-value`로 값을 갖습니다. `getSelectedValue/getSelectedText`로 조회 가능.
