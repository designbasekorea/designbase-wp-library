# 배지 (Badge) 컴포넌트

## 📖 개요

DEWP 배지 컴포넌트는 상태 표시, 라벨링, 카운터 등을 위한 작은 UI 요소입니다. 다양한 스타일과 크기를 지원합니다.

## 🚀 기본 사용법

### HTML 구조
```html
<span class="dewp-badge dewp-badge-primary">Primary</span>
<span class="dewp-badge dewp-badge-secondary">Secondary</span>
<span class="dewp-badge dewp-badge-success">Success</span>
```

### CSS 클래스
- `dewp-badge`: 기본 배지 클래스 (필수)
- `dewp-badge-{variant}`: 배지 스타일 변형
- `dewp-badge-{size}`: 배지 크기
- `dewp-badge-{style}`: 배지 스타일

## 🎨 스타일 변형

### 기본 스타일
```html
<!-- Primary (기본) -->
<span class="dewp-badge dewp-badge-primary">Primary</span>

<!-- Secondary -->
<span class="dewp-badge dewp-badge-secondary">Secondary</span>

<!-- Success -->
<span class="dewp-badge dewp-badge-success">Success</span>

<!-- Warning -->
<span class="dewp-badge dewp-badge-warning">Warning</span>

<!-- Danger -->
<span class="dewp-badge dewp-badge-danger">Danger</span>

<!-- Info -->
<span class="dewp-badge dewp-badge-info">Info</span>
```

### Outline 스타일
```html
<!-- Primary Outline -->
<span class="dewp-badge dewp-badge-outline-primary">Primary</span>

<!-- Secondary Outline -->
<span class="dewp-badge dewp-badge-outline-secondary">Secondary</span>

<!-- Success Outline -->
<span class="dewp-badge dewp-badge-outline-success">Success</span>

<!-- Warning Outline -->
<span class="dewp-badge dewp-badge-outline-warning">Warning</span>

<!-- Danger Outline -->
<span class="dewp-badge dewp-badge-outline-danger">Danger</span>

<!-- Info Outline -->
<span class="dewp-badge dewp-badge-outline-info">Info</span>
```

## 📏 크기 옵션

### 크기 클래스
```html
<!-- Extra Small -->
<span class="dewp-badge dewp-badge-primary dewp-badge-xs">XS</span>

<!-- Small -->
<span class="dewp-badge dewp-badge-primary dewp-badge-s">S</span>

<!-- Medium (기본) -->
<span class="dewp-badge dewp-badge-primary dewp-badge-m">M</span>

<!-- Large -->
<span class="dewp-badge dewp-badge-primary dewp-badge-l">L</span>
```

### 크기별 패딩
- **XS**: `4px 8px`
- **S**: `6px 10px`
- **M**: `8px 12px` (기본)
- **L**: `10px 16px`

## 🎭 특수 스타일

### Dot 스타일
```html
<!-- 작은 점 형태의 배지 -->
<span class="dewp-badge dewp-badge-dot dewp-badge-primary"></span>
<span class="dewp-badge dewp-badge-dot dewp-badge-success"></span>
<span class="dewp-badge dewp-badge-dot dewp-badge-warning"></span>
```

### Ring 스타일
```html
<!-- 링 형태의 배지 -->
<span class="dewp-badge dewp-badge-ring dewp-badge-primary">Ring</span>
<span class="dewp-badge dewp-badge-ring dewp-badge-success">Ring</span>
<span class="dewp-badge dewp-badge-ring dewp-badge-warning">Ring</span>
```

### Pill 스타일
```html
<!-- 알약 형태의 배지 -->
<span class="dewp-badge dewp-badge-pill dewp-badge-primary">Pill</span>
<span class="dewp-badge dewp-badge-pill dewp-badge-success">Pill</span>
<span class="dewp-badge dewp-badge-pill dewp-badge-warning">Pill</span>
```

### Square 스타일
```html
<!-- 정사각형 형태의 배지 -->
<span class="dewp-badge dewp-badge-square dewp-badge-primary">Square</span>
<span class="dewp-badge dewp-badge-square dewp-badge-success">Square</span>
<span class="dewp-badge dewp-badge-square dewp-badge-warning">Square</span>
```

## 🎯 실제 사용 예시

### 상태 표시
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">사용자 상태</h3>
  </div>
  
  <div class="dewp-section-content">
    <table class="dewp-table">
      <thead>
        <tr>
          <th>사용자명</th>
          <th>이메일</th>
          <th>상태</th>
          <th>역할</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>김철수</td>
          <td>kim@example.com</td>
          <td><span class="dewp-badge dewp-badge-success">활성</span></td>
          <td><span class="dewp-badge dewp-badge-primary">관리자</span></td>
        </tr>
        <tr>
          <td>이영희</td>
          <td>lee@example.com</td>
          <td><span class="dewp-badge dewp-badge-warning">대기</span></td>
          <td><span class="dewp-badge dewp-badge-secondary">사용자</span></td>
        </tr>
        <tr>
          <td>박민수</td>
          <td>park@example.com</td>
          <td><span class="dewp-badge dewp-badge-danger">비활성</span></td>
          <td><span class="dewp-badge dewp-badge-info">편집자</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### 알림 카운터
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">알림 센터</h3>
  </div>
  
  <div class="dewp-section-content">
    <div style="display: flex; gap: 20px; align-items: center;">
      <!-- 이메일 알림 -->
      <div style="position: relative; display: inline-block;">
        <button class="dewp-btn dewp-btn-outline-primary">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          이메일
        </button>
        <span class="dewp-badge dewp-badge-danger dewp-badge-xs" style="position: absolute; top: -8px; right: -8px;">12</span>
      </div>
      
      <!-- 시스템 알림 -->
      <div style="position: relative; display: inline-block;">
        <button class="dewp-btn dewp-btn-outline-secondary">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          알림
        </button>
        <span class="dewp-badge dewp-badge-warning dewp-badge-xs" style="position: absolute; top: -8px; right: -8px;">3</span>
      </div>
      
      <!-- 메시지 -->
      <div style="position: relative; display: inline-block;">
        <button class="dewp-btn dewp-btn-outline-success">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          메시지
        </button>
        <span class="dewp-badge dewp-badge-info dewp-badge-xs" style="position: absolute; top: -8px; right: -8px;">7</span>
      </div>
    </div>
  </div>
</div>
```

### 카테고리 태그
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">제품 카테고리</h3>
  </div>
  
  <div class="dewp-section-content">
    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
      <span class="dewp-badge dewp-badge-outline-primary dewp-badge-pill">전자제품</span>
      <span class="dewp-badge dewp-badge-outline-secondary dewp-badge-pill">의류</span>
      <span class="dewp-badge dewp-badge-outline-success dewp-badge-pill">식품</span>
      <span class="dewp-badge dewp-badge-outline-warning dewp-badge-pill">도서</span>
      <span class="dewp-badge dewp-badge-outline-danger dewp-badge-pill">스포츠</span>
      <span class="dewp-badge dewp-badge-outline-info dewp-badge-pill">홈&가든</span>
    </div>
    
    <div style="margin-top: 20px;">
      <h4>선택된 카테고리:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
        <span class="dewp-badge dewp-badge-primary dewp-badge-pill">
          전자제품
          <button style="background: none; border: none; color: inherit; margin-left: 8px; cursor: pointer;">×</button>
        </span>
        <span class="dewp-badge dewp-badge-success dewp-badge-pill">
          식품
          <button style="background: none; border: none; color: inherit; margin-left: 8px; cursor: pointer;">×</button>
        </span>
      </div>
    </div>
  </div>
</div>
```

### 진행 상태 표시
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">작업 진행 상태</h3>
  </div>
  
  <div class="dewp-section-content">
    <div style="display: flex; flex-direction: column; gap: 15px;">
      <!-- 완료된 작업 -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="dewp-badge dewp-badge-dot dewp-badge-success"></span>
        <span>데이터베이스 백업</span>
        <span class="dewp-badge dewp-badge-success dewp-badge-xs">완료</span>
      </div>
      
      <!-- 진행 중인 작업 -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="dewp-badge dewp-badge-dot dewp-badge-warning"></span>
        <span>파일 업로드</span>
        <span class="dewp-badge dewp-badge-warning dewp-badge-xs">진행중</span>
        <span style="font-size: 12px; color: #6c757d;">(75%)</span>
      </div>
      
      <!-- 대기 중인 작업 -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="dewp-badge dewp-badge-dot dewp-badge-secondary"></span>
        <span>이메일 발송</span>
        <span class="dewp-badge dewp-badge-secondary dewp-badge-xs">대기</span>
      </div>
      
      <!-- 오류가 발생한 작업 -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="dewp-badge dewp-badge-dot dewp-badge-danger"></span>
        <span>로그 정리</span>
        <span class="dewp-badge dewp-badge-danger dewp-badge-xs">오류</span>
      </div>
    </div>
  </div>
</div>
```

### 우선순위 표시
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">작업 우선순위</h3>
  </div>
  
  <div class="dewp-section-content">
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="dewp-badge dewp-badge-danger dewp-badge-xs">높음</span>
        <span>서버 장애 복구</span>
      </div>
      
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="dewp-badge dewp-badge-warning dewp-badge-xs">보통</span>
        <span>사용자 피드백 검토</span>
      </div>
      
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="dewp-badge dewp-badge-info dewp-badge-xs">낮음</span>
        <span>문서 업데이트</span>
      </div>
    </div>
  </div>
</div>
```

## 🎨 커스터마이징

### CSS 변수
```scss
// 배지 색상
--dewp-badge-primary-bg: #007cba;
--dewp-badge-primary-color: #ffffff;
--dewp-badge-secondary-bg: #6c757d;
--dewp-badge-secondary-color: #ffffff;
--dewp-badge-success-bg: #28a745;
--dewp-badge-success-color: #ffffff;

// 배지 크기
--dewp-badge-padding-y: 4px;
--dewp-badge-padding-x: 8px;
--dewp-badge-font-size: 12px;
--dewp-badge-border-radius: 4px;
```

### 커스텀 스타일
```css
/* 커스텀 배지 스타일 */
.dewp-badge-custom {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.dewp-badge-custom:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* 애니메이션 배지 */
.dewp-badge-animated {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

## 🔧 JavaScript 기능

### 동적 배지 생성
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">동적 배지</h3>
    <div class="dewp-section-actions">
      <button class="dewp-btn dewp-btn-primary" onclick="addBadge()">배지 추가</button>
      <button class="dewp-btn dewp-btn-secondary" onclick="clearBadges()">모두 제거</button>
    </div>
  </div>
  
  <div class="dewp-section-content">
    <div id="dynamic-badges" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
  </div>
</div>

<script>
let badgeCounter = 1;
const badgeTypes = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

function addBadge() {
  const container = document.getElementById('dynamic-badges');
  const badgeType = badgeTypes[badgeCounter % badgeTypes.length];
  
  const badge = document.createElement('span');
  badge.className = `dewp-badge dewp-badge-${badgeType} dewp-badge-pill`;
  badge.textContent = `배지 ${badgeCounter}`;
  
  // 제거 버튼 추가
  const removeBtn = document.createElement('button');
  removeBtn.style.cssText = 'background: none; border: none; color: inherit; margin-left: 8px; cursor: pointer; font-size: 14px;';
  removeBtn.textContent = '×';
  removeBtn.onclick = function() {
    container.removeChild(badge);
  };
  
  badge.appendChild(removeBtn);
  container.appendChild(badge);
  badgeCounter++;
}

function clearBadges() {
  document.getElementById('dynamic-badges').innerHTML = '';
  badgeCounter = 1;
}
</script>
```

### 배지 상태 관리
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">배지 상태 관리</h3>
  </div>
  
  <div class="dewp-section-content">
    <div style="display: flex; gap: 15px; margin-bottom: 20px;">
      <button class="dewp-btn dewp-btn-primary" onclick="updateStatus('online')">온라인</button>
      <button class="dewp-btn dewp-btn-warning" onclick="updateStatus('away')">자리비움</button>
      <button class="dewp-btn dewp-btn-danger" onclick="updateStatus('offline')">오프라인</button>
    </div>
    
    <div style="display: flex; align-items: center; gap: 12px;">
      <span>현재 상태:</span>
      <span id="status-badge" class="dewp-badge dewp-badge-success">온라인</span>
    </div>
  </div>
</div>

<script>
function updateStatus(status) {
  const badge = document.getElementById('status-badge');
  
  // 기존 클래스 제거
  badge.className = 'dewp-badge';
  
  // 새 상태에 따른 클래스와 텍스트 설정
  switch(status) {
    case 'online':
      badge.classList.add('dewp-badge-success');
      badge.textContent = '온라인';
      break;
    case 'away':
      badge.classList.add('dewp-badge-warning');
      badge.textContent = '자리비움';
      break;
    case 'offline':
      badge.classList.add('dewp-badge-danger');
      badge.textContent = '오프라인';
      break;
  }
}
</script>
```

## ⚠️ 주의사항

### 접근성
- 배지 텍스트가 충분한 대비를 가지도록 색상 선택
- 스크린 리더에서 배지 내용을 인식할 수 있도록 적절한 텍스트 제공
- 색상만으로 정보를 전달하지 말고 텍스트나 아이콘 함께 사용

### 성능
- 많은 배지를 동적으로 생성할 때는 가상화 고려
- 불필요한 DOM 조작 최소화

### 브라우저 호환성
- IE11+ 지원
- 모던 브라우저에서 최적 성능
- CSS 애니메이션 지원 확인

## 🔧 문제 해결

### 일반적인 문제들
1. **배지가 표시되지 않음**
   - CSS 클래스명 확인
   - CSS 파일 로드 확인

2. **색상이 적용되지 않음**
   - CSS 우선순위 확인
   - 커스텀 스타일과의 충돌 확인

3. **크기가 맞지 않음**
   - CSS 클래스 조합 확인
   - 부모 요소의 스타일 영향 확인

### 디버깅 팁
```javascript
// 배지 요소 확인
const badges = document.querySelectorAll('.dewp-badge');
console.log('배지 개수:', badges.length);

// 배지 스타일 확인
badges.forEach((badge, index) => {
  const computedStyle = window.getComputedStyle(badge);
  console.log(`배지 ${index + 1}:`, {
    backgroundColor: computedStyle.backgroundColor,
    color: computedStyle.color,
    padding: computedStyle.padding
  });
});
```

---

**관련 문서**: [버튼 컴포넌트](./button.md), [테이블 컴포넌트](./table.md)
