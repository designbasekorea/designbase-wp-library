# 버튼 (Button) 컴포넌트

## 📖 개요

DEWP 버튼 컴포넌트는 다양한 스타일, 크기, 상태를 지원하는 현대적인 버튼입니다.

## 🚀 기본 사용법

### HTML 구조
```html
<button class="dewp-btn dewp-btn-primary">Primary Button</button>
```

### CSS 클래스
- `dewp-btn`: 기본 버튼 클래스 (필수)
- `dewp-btn-{variant}`: 버튼 스타일 변형
- `dewp-btn-{size}`: 버튼 크기
- `dewp-btn-{state}`: 버튼 상태

## 🎨 스타일 변형

### 기본 스타일
```html
<!-- Primary (기본) -->
<button class="dewp-btn dewp-btn-primary">Primary</button>

<!-- Secondary -->
<button class="dewp-btn dewp-btn-secondary">Secondary</button>

<!-- Tertiary -->
<button class="dewp-btn dewp-btn-tertiary">Tertiary</button>

<!-- Success -->
<button class="dewp-btn dewp-btn-success">Success</button>

<!-- Warning -->
<button class="dewp-btn dewp-btn-warning">Warning</button>

<!-- Danger -->
<button class="dewp-btn dewp-btn-danger">Danger</button>

<!-- Info -->
<button class="dewp-btn dewp-btn-info">Info</button>
```

### Outline 스타일
```html
<button class="dewp-btn dewp-btn-outline-primary">Primary Outline</button>
<button class="dewp-btn dewp-btn-outline-secondary">Secondary Outline</button>
<button class="dewp-btn dewp-btn-outline-success">Success Outline</button>
<button class="dewp-btn dewp-btn-outline-warning">Warning Outline</button>
<button class="dewp-btn dewp-btn-outline-danger">Danger Outline</button>
<button class="dewp-btn dewp-btn-outline-info">Info Outline</button>
```

## 📏 크기 옵션

### 크기 클래스
```html
<!-- Extra Small -->
<button class="dewp-btn dewp-btn-primary dewp-btn-xs">XS Button</button>

<!-- Small -->
<button class="dewp-btn dewp-btn-primary dewp-btn-s">S Button</button>

<!-- Medium (기본) -->
<button class="dewp-btn dewp-btn-primary dewp-btn-m">M Button</button>

<!-- Large -->
<button class="dewp-btn dewp-btn-primary dewp-btn-l">L Button</button>

<!-- Extra Large -->
<button class="dewp-btn dewp-btn-primary dewp-btn-xl">XL Button</button>
```

### 크기별 패딩
- **XS**: `8px 12px`
- **S**: `10px 16px`
- **M**: `12px 20px` (기본)
- **L**: `14px 24px`
- **XL**: `16px 28px`

## 🔄 상태 관리

### 기본 상태
```html
<!-- 기본 상태 -->
<button class="dewp-btn dewp-btn-primary">
  <span class="dewp-btn-text">기본 버튼</span>
</button>

<!-- 비활성화 -->
<button class="dewp-btn dewp-btn-primary" disabled>
  <span class="dewp-btn-text">비활성화</span>
</button>

<!-- 로딩 상태 -->
<button class="dewp-btn dewp-btn-primary dewp-btn-loading">
  <span class="dewp-btn-text">로딩 중...</span>
</button>
```

### 로딩 상태
```html
<button class="dewp-btn dewp-btn-primary dewp-btn-loading">
  <span class="dewp-btn-text">저장 중...</span>
</button>
```

**주의**: 로딩 상태일 때는 `dewp-btn-text`가 숨겨지고 로딩 스피너만 표시됩니다.

## 📱 반응형 및 특수 옵션

### Block 버튼
```html
<!-- 전체 너비 버튼 -->
<button class="dewp-btn dewp-btn-primary dewp-btn-block">
  <span class="dewp-btn-text">Block Button</span>
</button>
```

### 아이콘과 함께 사용
```html
<button class="dewp-btn dewp-btn-primary">
  <svg class="dewp-btn-icon" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
  <span class="dewp-btn-text">아이콘 버튼</span>
</button>
```

## 🎯 실제 사용 예시

### 폼 제출 버튼
```html
<form>
  <div class="dewp-form-group">
    <label class="dewp-form-label">이름</label>
    <input type="text" class="dewp-form-input" placeholder="이름을 입력하세요">
  </div>
  
  <div class="dewp-form-actions">
    <button type="button" class="dewp-btn dewp-btn-secondary">취소</button>
    <button type="submit" class="dewp-btn dewp-btn-primary">저장</button>
  </div>
</form>
```

### 액션 그룹
```html
<div class="dewp-header-actions">
  <button class="dewp-btn dewp-btn-outline-secondary">미리보기</button>
  <button class="dewp-btn dewp-btn-primary">저장</button>
</div>
```

### 로딩 상태 처리
```html
<button class="dewp-btn dewp-btn-primary" id="saveButton" onclick="saveData()">
  <span class="dewp-btn-text">저장</span>
</button>

<script>
function saveData() {
  const button = document.getElementById('saveButton');
  const buttonText = button.querySelector('.dewp-btn-text');
  
  // 로딩 상태로 변경
  button.classList.add('dewp-btn-loading');
  button.disabled = true;
  
  // API 호출 시뮬레이션
  setTimeout(() => {
    // 로딩 상태 해제
    button.classList.remove('dewp-btn-loading');
    button.disabled = false;
    buttonText.textContent = '저장 완료';
  }, 2000);
}
</script>
```

## 🎨 커스터마이징

### CSS 변수
```scss
// 버튼 색상
--dewp-btn-primary-bg: #007cba;
--dewp-btn-primary-color: #ffffff;
--dewp-btn-primary-border: #007cba;
--dewp-btn-primary-hover-bg: #005a87;
--dewp-btn-primary-hover-border: #005a87;

// 버튼 크기
--dewp-btn-padding-y: 12px;
--dewp-btn-padding-x: 20px;
--dewp-btn-font-size: 14px;
--dewp-btn-border-radius: 6px;
```

### 커스텀 스타일
```css
/* 커스텀 버튼 스타일 */
.dewp-btn-custom {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dewp-btn-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
```

## ⚠️ 주의사항

### 접근성
- `disabled` 속성을 사용하여 비활성화 상태 표시
- `aria-label`을 사용하여 스크린 리더 지원
- 키보드 네비게이션 지원

### 성능
- 로딩 상태일 때는 `dewp-btn-text`를 사용하여 텍스트 숨김
- 불필요한 상태 변경은 피하기

### 브라우저 호환성
- IE11+ 지원
- 모던 브라우저에서 최적 성능
- 터치 디바이스 지원

## 🔧 JavaScript API

### 상태 변경
```javascript
// 로딩 상태 활성화
button.classList.add('dewp-btn-loading');

// 로딩 상태 비활성화
button.classList.remove('dewp-btn-loading');

// 비활성화
button.disabled = true;

// 활성화
button.disabled = false;
```

### 이벤트 처리
```javascript
button.addEventListener('click', function(e) {
  if (this.disabled || this.classList.contains('dewp-btn-loading')) {
    e.preventDefault();
    return;
  }
  
  // 버튼 클릭 처리
  console.log('버튼이 클릭되었습니다');
});
```

---

**관련 문서**: [폼 컴포넌트](./form.md), [헤더 컴포넌트](./header.md)
