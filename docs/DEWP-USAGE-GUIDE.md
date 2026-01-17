# DEWP (DesignBase WordPress Library) 사용 가이드

간단하고 강력한 프론트엔드 UI 컴포넌트 라이브러리입니다.

## 🚀 빠른 시작

### 1. 스크립트 로드

```html
<link rel="stylesheet" href="dewp.min.css">
<script src="dewp.min.js"></script>
```

### 2. 초기화 (한 줄!)

```javascript
// 모든 컴포넌트 자동 초기화
DEWP.init();

// 또는 선택적 초기화
DEWP.init({
    dropdown: true,
    tabs: true,
    drawer: false,   // Drawer는 제외
    carousel: true,
    lightbox: true
});
```

---

## 📦 컴포넌트 사용법

### 드롭다운 (Dropdown)

```html
<div class="dewp-dropdown">
    <button class="dewp-dropdown-toggle">
        <span class="dewp-dropdown-text">선택하세요</span>
        <span class="dewp-dropdown-arrow">▼</span>
    </button>
    <div class="dewp-dropdown-menu">
        <div class="dewp-dropdown-item" data-value="1">옵션 1</div>
        <div class="dewp-dropdown-item" data-value="2">옵션 2</div>
        <div class="dewp-dropdown-item" data-value="3">옵션 3</div>
    </div>
</div>
```

**JavaScript API:**
```javascript
// 수동 초기화
const id = DEWP.createDropdown({
    trigger: '.my-button',
    position: 'bottom',
    align: 'start',
    onSelect: (value, text) => console.log(`선택: ${text}`)
});

// 제어
DEWP.showDropdown(id);
DEWP.hideDropdown(id);
DEWP.closeAllDropdowns();
```

---

### 탭 (Tabs)

```html
<div data-tabs="my-tabs">
    <div class="dewp-tabs">
        <button class="dewp-tab-btn active" data-tab="tab1">탭 1</button>
        <button class="dewp-tab-btn" data-tab="tab2">탭 2</button>
        <button class="dewp-tab-btn" data-tab="tab3">탭 3</button>
    </div>
    <div class="dewp-tab-panel active" data-panel="tab1">탭 1 내용</div>
    <div class="dewp-tab-panel" data-panel="tab2">탭 2 내용</div>
    <div class="dewp-tab-panel" data-panel="tab3">탭 3 내용</div>
</div>
```

**JavaScript API:**
```javascript
// 수동 초기화
const tabsId = DEWP.initTabs(document.querySelector('[data-tabs]'), {
    onTabChange: (tabId, prevTabId) => console.log(`탭 변경: ${tabId}`)
});

// 제어
DEWP.activateTab('my-tabs', 'tab2');
DEWP.getActiveTab('my-tabs');  // 'tab2'
```

---

### 모달 (Modal)

모달은 **JavaScript로만 생성**합니다 (DOM 마크업 불필요).

```javascript
// 간단한 모달
DEWP.showModal({
    title: '알림',
    content: '작업이 완료되었습니다.',
    confirmText: '확인'
});

// 확인/취소 모달
DEWP.showConfirmModal({
    title: '삭제 확인',
    message: '정말 삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
    type: 'danger',
    onConfirm: () => console.log('삭제됨'),
    onCancel: () => console.log('취소됨')
});

// 직접 제어
const modalId = DEWP.createModal({ title: '설정', content: myForm });
DEWP.openModal(modalId);
DEWP.closeModal(modalId);
```

---

### 토스트 (Toast)

토스트도 **JavaScript로만 생성**합니다.

```javascript
// 타입별 토스트
DEWP.showSuccessToast('저장되었습니다');
DEWP.showErrorToast('오류가 발생했습니다');
DEWP.showWarningToast('주의가 필요합니다');
DEWP.showInfoToast('알림 메시지');

// 커스텀 옵션
DEWP.showToast('메시지', 'success', 3000, 'md');
//                       타입      지속시간  크기(sm/md/lg)
```

---

### 드로어 (Drawer)

```html
<div class="dewp-drawer dewp-drawer-left">
    <div class="dewp-drawer-header">
        <h3 class="dewp-drawer-title">메뉴</h3>
        <button class="dewp-drawer-close">×</button>
    </div>
    <div class="dewp-drawer-content">
        <!-- 내용 -->
    </div>
</div>
```

**JavaScript API:**
```javascript
// 수동 초기화
const drawerId = DEWP.createDrawer({
    target: '.dewp-drawer',
    position: 'left',
    overlay: true,
    onOpen: () => console.log('열림'),
    onClose: () => console.log('닫힘')
});

// 제어
DEWP.openDrawer(drawerId);
DEWP.closeDrawer(drawerId);
DEWP.toggleDrawer(drawerId);
```

**위치 클래스:**
- `dewp-drawer-left` (기본)
- `dewp-drawer-right`
- `dewp-drawer-top`
- `dewp-drawer-bottom`

---

### 아코디언 (Accordion)

```html
<div class="dewp-accordion" data-accordion="my-accordion">
    <div class="dewp-accordion-item">
        <button class="dewp-accordion-header">질문 1</button>
        <div class="dewp-accordion-content">답변 1</div>
    </div>
    <div class="dewp-accordion-item">
        <button class="dewp-accordion-header">질문 2</button>
        <div class="dewp-accordion-content">답변 2</div>
    </div>
</div>
```

**JavaScript API:**
```javascript
const accId = DEWP.initAccordion(element, { multiple: false });
DEWP.toggleAccordionItem(accId, 0);
DEWP.openAllAccordionItems(accId);
DEWP.closeAllAccordionItems(accId);
```

---

## 🎨 클래스 네이밍 규칙

- **접두사**: 모든 클래스는 `dewp-` 접두사 사용
- **구조**: `dewp-[컴포넌트]-[요소]-[수정자]`
- **예시**:
  - `dewp-dropdown-menu` (드롭다운 메뉴)
  - `dewp-tab-btn` (탭 버튼)
  - `dewp-modal-lg` (큰 모달)
  - `dewp-toast-success` (성공 토스트)

---

## 🔧 DOM 유틸리티

```javascript
// 선택
DEWP.qs('.selector');          // querySelector
DEWP.qsa('.selector');         // querySelectorAll (배열 반환)

// 클래스 조작
DEWP.addClass(el, 'active');
DEWP.removeClass(el, 'active');
DEWP.toggleClass(el, 'active');
DEWP.hasClass(el, 'active');

// 이벤트
DEWP.on(el, 'click', handler);
DEWP.off(el, 'click', handler);

// DOM 조작
DEWP.create('div', { className: 'my-class' });
DEWP.append(parent, child);
DEWP.remove(el);

// DOM 준비
DEWP.ready(() => {
    // DOM 로드 완료 후 실행
});
```

---

## 📋 버전 정보

```javascript
console.log(DEWP.version);  // "1.x.x"
console.log(DEWP.info);     // { name, description, version, author, license }
```
