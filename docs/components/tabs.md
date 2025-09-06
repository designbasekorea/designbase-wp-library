# 탭 (Tabs) 컴포넌트

## 📖 개요

DEWP 탭 컴포넌트는 콘텐츠를 여러 섹션으로 나누어 표시하는 네비게이션 컴포넌트입니다. 여러 탭 그룹이 있어도 독립적으로 동작합니다.

## 🚀 기본 사용법

### HTML 구조
```html
<div id="my-tabs" data-tabs="my-tabs">
  <!-- 탭 버튼들 -->
  <div class="dewp-tabs">
    <button class="dewp-tab-btn" data-tab="tab1">첫 번째 탭</button>
    <button class="dewp-tab-btn" data-tab="tab2">두 번째 탭</button>
    <button class="dewp-tab-btn" data-tab="tab3">세 번째 탭</button>
  </div>
  
  <!-- 탭 콘텐츠 -->
  <div class="dewp-tab-content">
    <div class="dewp-tab-panel" data-panel="tab1">
      <h3>첫 번째 탭 내용</h3>
      <p>이것은 첫 번째 탭의 내용입니다.</p>
    </div>
    <div class="dewp-tab-panel" data-panel="tab2">
      <h3>두 번째 탭 내용</h3>
      <p>이것은 두 번째 탭의 내용입니다.</p>
    </div>
    <div class="dewp-tab-panel" data-panel="tab3">
      <h3>세 번째 탭 내용</h3>
      <p>이것은 세 번째 탭의 내용입니다.</p>
    </div>
  </div>
</div>
```

### JavaScript 초기화
```javascript
// 기본 초기화
DEWP.initTabs(document.getElementById('my-tabs'), {
  activeTab: 'tab1',
  onTabChange: (tabId, previousTabId) => {
    console.log(`탭 변경: ${previousTabId} → ${tabId}`);
  }
});
```

## 🎨 스타일 변형

### 기본 스타일
```html
<!-- 기본 탭 -->
<div class="dewp-tabs">
  <button class="dewp-tab-btn active">기본</button>
  <button class="dewp-tab-btn">스타일</button>
</div>
```

### Pills 스타일
```html
<!-- 알약 모양 탭 -->
<div class="dewp-tabs dewp-tabs-pills">
  <button class="dewp-tab-btn active">알약</button>
  <button class="dewp-tab-btn">스타일</button>
</div>
```

### Underline 스타일
```html
<!-- 밑줄 스타일 탭 -->
<div class="dewp-tabs dewp-tabs-underline">
  <button class="dewp-tab-btn active">밑줄</button>
  <button class="dewp-tab-btn">스타일</button>
</div>
```

### Vertical 스타일
```html
<!-- 세로 탭 -->
<div class="dewp-tabs dewp-tabs-vertical">
  <button class="dewp-tab-btn active">세로</button>
  <button class="dewp-tab-btn">탭</button>
</div>
```

## 🎨 테마 색상

### 색상별 테마
```html
<!-- Primary 테마 -->
<div class="dewp-tabs dewp-tabs-primary">
  <button class="dewp-tab-btn active">Primary</button>
  <button class="dewp-tab-btn">색상</button>
</div>

<!-- Success 테마 -->
<div class="dewp-tabs dewp-tabs-success">
  <button class="dewp-tab-btn active">Success</button>
  <button class="dewp-tab-btn">색상</button>
</div>

<!-- Warning 테마 -->
<div class="dewp-tabs dewp-tabs-warning">
  <button class="dewp-tab-btn active">Warning</button>
  <button class="dewp-tab-btn">색상</button>
</div>
```

## 🔧 JavaScript API

### 초기화 옵션
```javascript
DEWP.initTabs(container, {
  // 활성 탭 ID (기본값: 첫 번째 탭)
  activeTab: 'tab1',
  
  // 탭 변경 콜백
  onTabChange: (tabId, previousTabId) => {
    console.log(`탭 변경: ${previousTabId} → ${tabId}`);
  },
  
  // 애니메이션 사용 여부 (기본값: true)
  animation: true,
  
  // URL 해시 동기화 (기본값: false)
  syncWithHash: false
});
```

### 탭 제어 함수
```javascript
// 특정 탭으로 전환
DEWP.activateTab('my-tabs', 'tab2');

// 현재 활성 탭 확인
const activeTab = DEWP.getActiveTab('my-tabs');
```

## 📱 여러 탭 그룹 사용법

### 독립적인 탭 그룹들
```html
<!-- 첫 번째 탭 그룹 -->
<div id="user-tabs" data-tabs="user-tabs">
  <div class="dewp-tabs">
    <button class="dewp-tab-btn" data-tab="profile">프로필</button>
    <button class="dewp-tab-btn" data-tab="settings">설정</button>
  </div>
  <div class="dewp-tab-content">
    <div class="dewp-tab-panel" data-panel="profile">프로필 내용</div>
    <div class="dewp-tab-panel" data-panel="settings">설정 내용</div>
  </div>
</div>

<!-- 두 번째 탭 그룹 -->
<div id="project-tabs" data-tabs="project-tabs">
  <div class="dewp-tabs">
    <button class="dewp-tab-btn" data-tab="overview">개요</button>
    <button class="dewp-tab-btn" data-tab="tasks">작업</button>
  </div>
  <div class="dewp-tab-content">
    <div class="dewp-tab-panel" data-panel="overview">프로젝트 개요</div>
    <div class="dewp-tab-panel" data-panel="tasks">작업 목록</div>
  </div>
</div>
```

### 각 그룹별 초기화
```javascript
// 사용자 탭 초기화
DEWP.initTabs(document.getElementById('user-tabs'), {
  activeTab: 'profile',
  onTabChange: (tabId, previousTabId) => {
    console.log(`사용자 탭 변경: ${previousTabId} → ${tabId}`);
  }
});

// 프로젝트 탭 초기화
DEWP.initTabs(document.getElementById('project-tabs'), {
  activeTab: 'overview',
  onTabChange: (tabId, previousTabId) => {
    console.log(`프로젝트 탭 변경: ${previousTabId} → ${tabId}`);
  }
});
```

## 🎯 실제 사용 예시

### 설정 페이지 탭
```html
<div id="settings-tabs" data-tabs="settings-tabs">
  <div class="dewp-tabs">
    <button class="dewp-tab-btn" data-tab="general">일반</button>
    <button class="dewp-tab-btn" data-tab="security">보안</button>
    <button class="dewp-tab-btn" data-tab="notifications">알림</button>
  </div>
  
  <div class="dewp-tab-content">
    <div class="dewp-tab-panel" data-panel="general">
      <div class="dewp-section">
        <h3>일반 설정</h3>
        <div class="dewp-form-group">
          <label class="dewp-form-label">사이트 이름</label>
          <input type="text" class="dewp-form-input" value="내 사이트">
        </div>
      </div>
    </div>
    
    <div class="dewp-tab-panel" data-panel="security">
      <div class="dewp-section">
        <h3>보안 설정</h3>
        <div class="dewp-form-group">
          <label class="dewp-toggle-label">
            <input type="checkbox" class="dewp-toggle-input">
            <span class="dewp-toggle-slider"></span>
            <span class="dewp-toggle-text">2단계 인증</span>
          </label>
        </div>
      </div>
    </div>
    
    <div class="dewp-tab-panel" data-panel="notifications">
      <div class="dewp-section">
        <h3>알림 설정</h3>
        <div class="dewp-form-group">
          <label class="dewp-form-label">이메일 알림</label>
          <select class="dewp-form-input">
            <option>즉시</option>
            <option>일일 요약</option>
            <option>비활성화</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// 설정 탭 초기화
DEWP.initTabs(document.getElementById('settings-tabs'), {
  activeTab: 'general',
  onTabChange: (tabId, previousTabId) => {
    // 탭 변경 시 설정 저장
    saveSettings();
    
    // URL 업데이트 (선택사항)
    if (window.history && window.history.pushState) {
      window.history.pushState(null, null, `#${tabId}`);
    }
  }
});

function saveSettings() {
  // 현재 활성 탭의 설정 저장
  const activeTab = DEWP.getActiveTab('settings-tabs');
  console.log(`설정 저장 중: ${activeTab} 탭`);
}
</script>
```

### 동적 탭 생성
```html
<div id="dynamic-tabs" data-tabs="dynamic-tabs">
  <div class="dewp-tabs" id="dynamic-tab-buttons"></div>
  <div class="dewp-tab-content" id="dynamic-tab-content"></div>
</div>

<button class="dewp-btn dewp-btn-primary" onclick="addNewTab()">새 탭 추가</button>

<script>
let tabCounter = 1;

function addNewTab() {
  const tabId = `dynamic-tab-${tabCounter}`;
  const tabTitle = `탭 ${tabCounter}`;
  
  // 탭 버튼 추가
  const tabButton = document.createElement('button');
  tabButton.className = 'dewp-tab-btn';
  tabButton.setAttribute('data-tab', tabId);
  tabButton.textContent = tabTitle;
  
  // 탭 콘텐츠 추가
  const tabPanel = document.createElement('div');
  tabPanel.className = 'dewp-tab-panel';
  tabPanel.setAttribute('data-panel', tabId);
  tabPanel.innerHTML = `<h3>${tabTitle}</h3><p>동적으로 생성된 탭입니다.</p>`;
  
  // DOM에 추가
  document.getElementById('dynamic-tab-buttons').appendChild(tabButton);
  document.getElementById('dynamic-tab-content').appendChild(tabPanel);
  
  // 탭 초기화 (기존 탭과 함께)
  DEWP.initTabs(document.getElementById('dynamic-tabs'), {
    activeTab: tabId
  });
  
  tabCounter++;
}
</script>
```

## 🎨 커스터마이징

### CSS 변수
```scss
// 탭 색상
--dewp-tab-active-color: #007cba;
--dewp-tab-inactive-color: #6c757d;
--dewp-tab-hover-color: #005a87;
--dewp-tab-border-color: #dee2e6;

// 탭 크기
--dewp-tab-padding-y: 12px;
--dewp-tab-padding-x: 20px;
--dewp-tab-font-size: 14px;
--dewp-tab-border-width: 2px;
```

### 커스텀 스타일
```css
/* 커스텀 탭 스타일 */
.dewp-tabs-custom .dewp-tab-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 25px;
  margin: 0 5px;
}

.dewp-tabs-custom .dewp-tab-btn.active {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
```

## ⚠️ 주의사항

### 접근성
- `data-tab`과 `data-panel` 속성은 필수
- 키보드 네비게이션 지원 (Tab, Enter, Space)
- ARIA 속성 자동 적용

### 성능
- 많은 탭이 있을 때는 지연 로딩 고려
- 탭 변경 시 불필요한 DOM 조작 피하기

### 브라우저 호환성
- IE11+ 지원
- 모던 브라우저에서 최적 성능
- 터치 디바이스 지원

## 🔧 문제 해결

### 일반적인 문제들
1. **탭이 동작하지 않음**
   - `data-tabs` 속성 확인
   - `DEWP.initTabs()` 호출 확인
   - HTML 구조 검증

2. **여러 탭 그룹이 서로 간섭**
   - 각 그룹에 고유한 `data-tabs` 값 사용
   - 독립적인 초기화 함수 호출

3. **탭 콘텐츠가 표시되지 않음**
   - `data-panel` 속성과 `data-tab` 속성 매칭 확인
   - CSS 클래스명 검증

### 디버깅 팁
```javascript
// 탭 컨테이너 확인
console.log('탭 컨테이너:', document.querySelectorAll('[data-tabs]'));

// 특정 탭 그룹의 상태 확인
const container = document.getElementById('my-tabs');
console.log('활성 탭:', container.querySelector('.dewp-tab-btn.active'));
console.log('탭 패널들:', container.querySelectorAll('.dewp-tab-panel'));

// DEWP 객체 상태 확인
console.log('DEWP 함수들:', Object.keys(window.DEWP));
```

---

**관련 문서**: [아코디언 컴포넌트](./accordion.md), [사이드바 컴포넌트](./sidebar.md)
