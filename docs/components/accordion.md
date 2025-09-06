# 아코디언 (Accordion) 컴포넌트

## 📖 개요

DEWP 아코디언 컴포넌트는 접을 수 있는 콘텐츠 섹션을 제공하여 사용자가 필요한 정보만 볼 수 있도록 도와주는 컴포넌트입니다.

## 🚀 기본 사용법

### HTML 구조
```html
<div class="dewp-accordion" data-accordion="my-accordion">
  <div class="dewp-accordion-item" data-accordion-item="item-1">
    <button class="dewp-accordion-header" data-accordion-header>
      <span class="dewp-accordion-title">첫 번째 아이템</span>
      <svg class="dewp-accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="dewp-accordion-content" data-accordion-content>
      <div class="dewp-accordion-content-inner">
        <p>이것은 첫 번째 아코디언 아이템의 내용입니다.</p>
      </div>
    </div>
  </div>
  
  <div class="dewp-accordion-item" data-accordion-item="item-2">
    <button class="dewp-accordion-header" data-accordion-header>
      <span class="dewp-accordion-title">두 번째 아이템</span>
      <svg class="dewp-accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="dewp-accordion-content" data-accordion-content>
      <div class="dewp-accordion-content-inner">
        <p>이것은 두 번째 아코디언 아이템의 내용입니다.</p>
      </div>
    </div>
  </div>
</div>
```

### JavaScript 초기화
```javascript
// 기본 초기화
DEWP.initAccordion(document.querySelector('[data-accordion="my-accordion"]'), {
  animation: true,
  multiple: false,
  autoClose: true
});
```

## 🎨 스타일 변형

### 기본 스타일
```html
<!-- 기본 아코디언 -->
<div class="dewp-accordion" data-accordion="basic-demo">
  <!-- 아이템들 -->
</div>
```

### 분리된 스타일
```html
<!-- 각 아이템이 개별적으로 분리된 스타일 -->
<div class="dewp-accordion dewp-accordion-separated" data-accordion="separated-demo">
  <!-- 아이템들 -->
</div>
```

### 미니멀 스타일
```html
<!-- 테두리와 배경이 없는 깔끔한 스타일 -->
<div class="dewp-accordion dewp-accordion-minimal" data-accordion="minimal-demo">
  <!-- 아이템들 -->
</div>
```

## 🎨 테마 색상

### 색상별 테마
```html
<!-- Primary 테마 -->
<div class="dewp-accordion dewp-accordion-primary" data-accordion="primary-demo">
  <!-- 아이템들 -->
</div>

<!-- Success 테마 -->
<div class="dewp-accordion dewp-accordion-success" data-accordion="success-demo">
  <!-- 아이템들 -->
</div>

<!-- Warning 테마 -->
<div class="dewp-accordion dewp-accordion-warning" data-accordion="warning-demo">
  <!-- 아이템들 -->
</div>
```

## 🔧 JavaScript API

### 초기화 옵션
```javascript
DEWP.initAccordion(container, {
  // 애니메이션 사용 여부 (기본값: true)
  animation: true,
  
  // 여러 아이템을 동시에 열 수 있는지 여부 (기본값: false)
  multiple: false,
  
  // 다른 아이템 열 때 자동으로 닫기 (기본값: true)
  autoClose: true,
  
  // 초기 상태 (기본값: 'closed')
  initialState: 'closed'
});
```

### 아코디언 제어 함수
```javascript
// 특정 아이템 열기
DEWP.openAccordionItem('my-accordion', 'item-1');

// 특정 아이템 닫기
DEWP.closeAccordionItem('my-accordion', 'item-1');

// 특정 아이템 토글
DEWP.toggleAccordionItem('my-accordion', 'item-1');

// 모든 아이템 열기
DEWP.openAllAccordionItems('my-accordion');

// 모든 아이템 닫기
DEWP.closeAllAccordionItems('my-accordion');

// 아이템 상태 확인
const isOpen = DEWP.isAccordionItemOpen('my-accordion', 'item-1');

// 활성 아이템 목록 가져오기
const activeItems = DEWP.getActiveAccordionItems('my-accordion');
```

## 📱 고급 기능

### 메타 정보가 있는 아이템
```html
<div class="dewp-accordion-item" data-accordion-item="item-with-meta">
  <button class="dewp-accordion-header" data-accordion-header>
    <span class="dewp-accordion-title">메타 정보가 있는 아이템</span>
    <div class="dewp-accordion-meta">
      <span class="dewp-accordion-count">3</span>
      <svg class="dewp-accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </div>
  </button>
  <div class="dewp-accordion-content" data-accordion-content>
    <div class="dewp-accordion-content-inner">
      <p>이 아이템은 카운트 배지가 포함되어 있습니다.</p>
    </div>
  </div>
</div>
```

### 동적 콘텐츠 로딩
```html
<div class="dewp-accordion" data-accordion="dynamic-accordion">
  <div class="dewp-accordion-item" data-accordion-item="dynamic-item">
    <button class="dewp-accordion-header" data-accordion-header>
      <span class="dewp-accordion-title">동적 콘텐츠</span>
      <svg class="dewp-accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="dewp-accordion-content" data-accordion-content>
      <div class="dewp-accordion-content-inner">
        <div id="dynamic-content">로딩 중...</div>
      </div>
    </div>
  </div>
</div>

<script>
// 아코디언 초기화
DEWP.initAccordion(document.querySelector('[data-accordion="dynamic-accordion"]'), {
  onItemOpen: (itemId) => {
    if (itemId === 'dynamic-item') {
      loadDynamicContent();
    }
  }
});

function loadDynamicContent() {
  const contentDiv = document.getElementById('dynamic-content');
  
  // API 호출 시뮬레이션
  setTimeout(() => {
    contentDiv.innerHTML = `
      <h4>동적으로 로드된 콘텐츠</h4>
      <p>이 콘텐츠는 아코디언이 열릴 때 로드됩니다.</p>
      <ul>
        <li>항목 1</li>
        <li>항목 2</li>
        <li>항목 3</li>
      </ul>
    `;
  }, 500);
}
</script>
```

## 🎯 실제 사용 예시

### FAQ 섹션
```html
<div class="dewp-accordion" data-accordion="faq-section">
  <div class="dewp-accordion-item" data-accordion-item="faq-1">
    <button class="dewp-accordion-header" data-accordion-header>
      <span class="dewp-accordion-title">DEWP 라이브러리는 무엇인가요?</span>
      <svg class="dewp-accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="dewp-accordion-content" data-accordion-content>
      <div class="dewp-accordion-content-inner">
        <p>DEWP는 WordPress 관리자 페이지와 플러그인을 위한 현대적인 UI 컴포넌트 라이브러리입니다.</p>
      </div>
    </div>
  </div>
  
  <div class="dewp-accordion-item" data-accordion-item="faq-2">
    <button class="dewp-accordion-header" data-accordion-header>
      <span class="dewp-accordion-title">어떤 브라우저를 지원하나요?</span>
      <svg class="dewp-accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="dewp-accordion-content" data-accordion-content>
      <div class="dewp-accordion-content-inner">
        <p>IE11+ 및 모든 모던 브라우저를 지원합니다.</p>
      </div>
    </div>
  </div>
</div>

<script>
// FAQ 아코디언 초기화
DEWP.initAccordion(document.querySelector('[data-accordion="faq-section"]'), {
  animation: true,
  multiple: true, // FAQ는 여러 개를 동시에 열 수 있음
  autoClose: false
});
</script>
```

### 설정 페이지
```html
<div class="dewp-accordion" data-accordion="settings-accordion">
  <div class="dewp-accordion-item" data-accordion-item="general-settings">
    <button class="dewp-accordion-header" data-accordion-header>
      <span class="dewp-accordion-title">일반 설정</span>
      <svg class="dewp-accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="dewp-accordion-content" data-accordion-content>
      <div class="dewp-accordion-content-inner">
        <div class="dewp-form-group">
          <label class="dewp-form-label">사이트 이름</label>
          <input type="text" class="dewp-form-input" value="내 사이트">
        </div>
        <div class="dewp-form-group">
          <label class="dewp-form-label">설명</label>
          <textarea class="dewp-form-textarea" placeholder="사이트 설명을 입력하세요"></textarea>
        </div>
      </div>
    </div>
  </div>
  
  <div class="dewp-accordion-item" data-accordion-item="advanced-settings">
    <button class="dewp-accordion-header" data-accordion-header>
      <span class="dewp-accordion-title">고급 설정</span>
      <svg class="dewp-accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="dewp-accordion-content" data-accordion-content>
      <div class="dewp-accordion-content-inner">
        <div class="dewp-form-group">
          <label class="dewp-toggle-label">
            <input type="checkbox" class="dewp-toggle-input">
            <span class="dewp-toggle-slider"></span>
            <span class="dewp-toggle-text">디버그 모드</span>
          </label>
        </div>
        <div class="dewp-form-group">
          <label class="dewp-toggle-label">
            <input type="checkbox" class="dewp-toggle-input">
            <span class="dewp-toggle-slider"></span>
            <span class="dewp-toggle-text">캐시 사용</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// 설정 아코디언 초기화
DEWP.initAccordion(document.querySelector('[data-accordion="settings-accordion"]'), {
  animation: true,
  multiple: false, // 설정은 한 번에 하나만 열기
  autoClose: true,
  onItemOpen: (itemId) => {
    console.log(`설정 섹션 열림: ${itemId}`);
  },
  onItemClose: (itemId) => {
    console.log(`설정 섹션 닫힘: ${itemId}`);
  }
});
</script>
```

## 🎨 커스터마이징

### CSS 변수
```scss
// 아코디언 색상
--dewp-accordion-header-bg: #ffffff;
--dewp-accordion-header-hover-bg: #f8f9fa;
--dewp-accordion-header-active-bg: #e3f2fd;
--dewp-accordion-border-color: #dee2e6;
--dewp-accordion-content-bg: #ffffff;

// 아코디언 크기
--dewp-accordion-header-padding: 16px 20px;
--dewp-accordion-content-padding: 20px;
--dewp-accordion-border-radius: 6px;
--dewp-accordion-icon-size: 20px;
```

### 커스텀 스타일
```css
/* 커스텀 아코디언 스타일 */
.dewp-accordion-custom .dewp-accordion-header {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  margin-bottom: 8px;
}

.dewp-accordion-custom .dewp-accordion-header:hover {
  background: linear-gradient(45deg, #764ba2, #667eea);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dewp-accordion-custom .dewp-accordion-content {
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
}
```

## ⚠️ 주의사항

### 접근성
- `data-accordion-item`과 `data-accordion-content` 속성은 필수
- 키보드 네비게이션 지원 (Tab, Enter, Space)
- ARIA 속성 자동 적용

### 성능
- 많은 아이템이 있을 때는 지연 로딩 고려
- 애니메이션 사용 시 GPU 가속 활용

### 브라우저 호환성
- IE11+ 지원
- 모던 브라우저에서 최적 성능
- 터치 디바이스 지원

## 🔧 문제 해결

### 일반적인 문제들
1. **아코디언이 동작하지 않음**
   - `data-accordion` 속성 확인
   - `DEWP.initAccordion()` 호출 확인
   - HTML 구조 검증

2. **아이템이 열리자마자 닫힘**
   - 이벤트 리스너 중복 확인
   - `data-accordion-initialized` 플래그 확인

3. **애니메이션이 부자연스러움**
   - CSS transition과 JavaScript 애니메이션 충돌 확인
   - `cubic-bezier` 값 조정

### 디버깅 팁
```javascript
// 아코디언 컨테이너 확인
console.log('아코디언 컨테이너:', document.querySelectorAll('[data-accordion]'));

// 특정 아코디언의 상태 확인
const container = document.querySelector('[data-accordion="my-accordion"]');
console.log('열린 아이템들:', container.querySelectorAll('.dewp-accordion-item.open'));

// DEWP 객체 상태 확인
console.log('DEWP 함수들:', Object.keys(window.DEWP));
```

---

**관련 문서**: [탭 컴포넌트](./tabs.md), [사이드바 컴포넌트](./sidebar.md)
