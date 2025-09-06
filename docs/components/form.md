# 폼 (Form) 컴포넌트

## 📖 개요

DEWP 폼 컴포넌트는 사용자 입력을 위한 다양한 폼 요소들을 제공합니다. 일관된 디자인과 접근성을 보장합니다.

## 🚀 기본 사용법

### HTML 구조
```html
<form class="dewp-form">
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="username">사용자명</label>
    <input type="text" class="dewp-form-input" id="username" placeholder="사용자명을 입력하세요">
  </div>
  
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="email">이메일</label>
    <input type="email" class="dewp-form-input" id="email" placeholder="이메일을 입력하세요">
  </div>
  
  <div class="dewp-form-actions">
    <button type="submit" class="dewp-btn dewp-btn-primary">제출</button>
    <button type="button" class="dewp-btn dewp-btn-secondary">취소</button>
  </div>
</form>
```

## 🎨 입력 필드

### 기본 입력 필드
```html
<!-- 텍스트 입력 -->
<input type="text" class="dewp-form-input" placeholder="텍스트를 입력하세요">

<!-- 이메일 입력 -->
<input type="email" class="dewp-form-input" placeholder="이메일을 입력하세요">

<!-- 비밀번호 입력 -->
<input type="password" class="dewp-form-input" placeholder="비밀번호를 입력하세요">

<!-- 숫자 입력 -->
<input type="number" class="dewp-form-input" placeholder="숫자를 입력하세요">

<!-- URL 입력 -->
<input type="url" class="dewp-form-input" placeholder="URL을 입력하세요">

<!-- 전화번호 입력 -->
<input type="tel" class="dewp-form-input" placeholder="전화번호를 입력하세요">
```

### 입력 필드 크기
```html
<!-- 작은 크기 -->
<input type="text" class="dewp-form-input dewp-form-input-sm" placeholder="작은 입력 필드">

<!-- 기본 크기 -->
<input type="text" class="dewp-form-input" placeholder="기본 입력 필드">

<!-- 큰 크기 -->
<input type="text" class="dewp-form-input dewp-form-input-lg" placeholder="큰 입력 필드">
```

### 입력 필드 상태
```html
<!-- 기본 상태 -->
<input type="text" class="dewp-form-input" placeholder="기본 상태">

<!-- 포커스 상태 (자동) -->
<input type="text" class="dewp-form-input" placeholder="포커스 시 스타일 변경">

<!-- 비활성화 상태 -->
<input type="text" class="dewp-form-input" disabled placeholder="비활성화">

<!-- 읽기 전용 -->
<input type="text" class="dewp-form-input" readonly value="읽기 전용 값">

<!-- 유효성 검사 실패 -->
<input type="email" class="dewp-form-input dewp-form-input-error" placeholder="잘못된 이메일">
```

## 📝 텍스트 영역

### 기본 텍스트 영역
```html
<textarea class="dewp-form-textarea" placeholder="메시지를 입력하세요" rows="4"></textarea>
```

### 크기별 텍스트 영역
```html
<!-- 작은 크기 -->
<textarea class="dewp-form-textarea dewp-form-textarea-sm" placeholder="작은 텍스트 영역" rows="2"></textarea>

<!-- 기본 크기 -->
<textarea class="dewp-form-textarea" placeholder="기본 텍스트 영역" rows="4"></textarea>

<!-- 큰 크기 -->
<textarea class="dewp-form-textarea dewp-form-textarea-lg" placeholder="큰 텍스트 영역" rows="6"></textarea>
```

## ✅ 체크박스와 라디오 버튼

### 체크박스
```html
<div class="dewp-form-check dewp-form-checkbox">
  <input type="checkbox" class="dewp-form-check-input" id="check1">
  <label class="dewp-form-check-label" for="check1">체크박스 1</label>
</div>

<div class="dewp-form-check dewp-form-checkbox">
  <input type="checkbox" class="dewp-form-check-input" id="check2" checked>
  <label class="dewp-form-check-label" for="check2">체크박스 2 (기본 체크)</label>
</div>

<div class="dewp-form-check dewp-form-checkbox">
  <input type="checkbox" class="dewp-form-check-input" id="check3" disabled>
  <label class="dewp-form-check-label" for="check3">체크박스 3 (비활성화)</label>
</div>
```

### 라디오 버튼
```html
<div class="dewp-form-check dewp-form-radio">
  <input type="radio" class="dewp-form-check-input" name="radio-group" id="radio1">
  <label class="dewp-form-check-label" for="radio1">라디오 1</label>
</div>

<div class="dewp-form-check dewp-form-radio">
  <input type="radio" class="dewp-form-check-input" name="radio-group" id="radio2" checked>
  <label class="dewp-form-check-label" for="radio2">라디오 2 (기본 선택)</label>
</div>

<div class="dewp-form-check dewp-form-radio">
  <input type="radio" class="dewp-form-check-input" name="radio-group" id="radio3" disabled>
  <label class="dewp-form-check-label" for="radio3">라디오 3 (비활성화)</label>
</div>
```

## 🔽 선택 필드

### 기본 선택 필드
```html
<select class="dewp-form-input">
  <option value="">선택하세요</option>
  <option value="option1">옵션 1</option>
  <option value="option2">옵션 2</option>
  <option value="option3">옵션 3</option>
</select>
```

### 크기별 선택 필드
```html
<!-- 작은 크기 -->
<select class="dewp-form-input dewp-form-input-sm">
  <option>작은 선택 필드</option>
</select>

<!-- 기본 크기 -->
<select class="dewp-form-input">
  <option>기본 선택 필드</option>
</select>

<!-- 큰 크기 -->
<select class="dewp-form-input dewp-form-input-lg">
  <option>큰 선택 필드</option>
</select>
```

### 다중 선택
```html
<select class="dewp-form-input" multiple>
  <option value="option1">옵션 1</option>
  <option value="option2">옵션 2</option>
  <option value="option3">옵션 3</option>
  <option value="option4">옵션 4</option>
</select>
```

## 🔗 입력 그룹

### 기본 입력 그룹
```html
<div class="dewp-form-input-group">
  <span class="dewp-form-input-group-text">@</span>
  <input type="text" class="dewp-form-input" placeholder="사용자명">
</div>

<div class="dewp-form-input-group">
  <input type="text" class="dewp-form-input" placeholder="도메인">
  <span class="dewp-form-input-group-text">.com</span>
</div>
```

### 복합 입력 그룹
```html
<div class="dewp-form-input-group">
  <span class="dewp-form-input-group-text">₩</span>
  <input type="number" class="dewp-form-input" placeholder="금액">
  <span class="dewp-form-input-group-text">원</span>
</div>

<div class="dewp-form-input-group">
  <span class="dewp-form-input-group-text">https://</span>
  <input type="text" class="dewp-form-input" placeholder="도메인">
  <span class="dewp-form-input-group-text">.com</span>
</div>
```

## 📋 폼 레이아웃

### 기본 폼 그룹
```html
<form class="dewp-form">
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="name">이름</label>
    <input type="text" class="dewp-form-input" id="name" placeholder="이름을 입력하세요">
    <div class="dewp-form-help">실명을 입력해주세요</div>
  </div>
  
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="email">이메일</label>
    <input type="email" class="dewp-form-input" id="email" placeholder="이메일을 입력하세요">
    <div class="dewp-form-error">올바른 이메일 형식이 아닙니다</div>
  </div>
  
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="message">메시지</label>
    <textarea class="dewp-form-textarea" id="message" placeholder="메시지를 입력하세요" rows="4"></textarea>
  </div>
  
  <div class="dewp-form-actions">
    <button type="submit" class="dewp-btn dewp-btn-primary">제출</button>
    <button type="button" class="dewp-btn dewp-btn-secondary">취소</button>
  </div>
</form>
```

### 인라인 폼
```html
<form class="dewp-form dewp-form-inline">
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="inline-email">이메일</label>
    <input type="email" class="dewp-form-input" id="inline-email" placeholder="이메일을 입력하세요">
  </div>
  
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="inline-password">비밀번호</label>
    <input type="password" class="dewp-form-input" id="inline-password" placeholder="비밀번호를 입력하세요">
  </div>
  
  <button type="submit" class="dewp-btn dewp-btn-primary">로그인</button>
</form>
```

### 수평 폼
```html
<form class="dewp-form dewp-form-horizontal">
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="horizontal-name">이름</label>
    <div class="dewp-form-control">
      <input type="text" class="dewp-form-input" id="horizontal-name" placeholder="이름을 입력하세요">
    </div>
  </div>
  
  <div class="dewp-form-group">
    <label class="dewp-form-label" for="horizontal-email">이메일</label>
    <div class="dewp-form-control">
      <input type="email" class="dewp-form-input" id="horizontal-email" placeholder="이메일을 입력하세요">
    </div>
  </div>
  
  <div class="dewp-form-group">
    <div class="dewp-form-control">
      <button type="submit" class="dewp-btn dewp-btn-primary">제출</button>
    </div>
  </div>
</form>
```

## 🎯 실제 사용 예시

### 로그인 폼
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">로그인</h3>
    <p class="dewp-section-description">계정에 로그인하세요</p>
  </div>
  
  <div class="dewp-section-content">
    <form class="dewp-form" id="login-form">
      <div class="dewp-form-group">
        <label class="dewp-form-label" for="login-email">이메일</label>
        <input type="email" class="dewp-form-input" id="login-email" required>
      </div>
      
      <div class="dewp-form-group">
        <label class="dewp-form-label" for="login-password">비밀번호</label>
        <input type="password" class="dewp-form-input" id="login-password" required>
      </div>
      
      <div class="dewp-form-group">
        <div class="dewp-form-check dewp-form-checkbox">
          <input type="checkbox" class="dewp-form-check-input" id="remember-me">
          <label class="dewp-form-check-label" for="remember-me">로그인 상태 유지</label>
        </div>
      </div>
      
      <div class="dewp-form-actions">
        <button type="submit" class="dewp-btn dewp-btn-primary dewp-btn-block">로그인</button>
      </div>
    </form>
  </div>
</div>

<script>
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // 로그인 처리
  console.log('로그인 시도:', { email, password });
});
</script>
```

### 설정 폼
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">사용자 설정</h3>
  </div>
  
  <div class="dewp-section-content">
    <form class="dewp-form" id="settings-form">
      <div class="dewp-form-group">
        <label class="dewp-form-label" for="display-name">표시 이름</label>
        <input type="text" class="dewp-form-input" id="display-name" value="현재 이름">
      </div>
      
      <div class="dewp-form-group">
        <label class="dewp-form-label" for="bio">자기소개</label>
        <textarea class="dewp-form-textarea" id="bio" rows="3" placeholder="자기소개를 입력하세요"></textarea>
      </div>
      
      <div class="dewp-form-group">
        <label class="dewp-form-label">알림 설정</label>
        <div class="dewp-form-check dewp-form-checkbox">
          <input type="checkbox" class="dewp-form-check-input" id="email-notifications" checked>
          <label class="dewp-form-check-label" for="email-notifications">이메일 알림</label>
        </div>
        <div class="dewp-form-check dewp-form-checkbox">
          <input type="checkbox" class="dewp-form-check-input" id="push-notifications">
          <label class="dewp-form-check-label" for="push-notifications">푸시 알림</label>
        </div>
      </div>
      
      <div class="dewp-form-group">
        <label class="dewp-form-label" for="timezone">시간대</label>
        <select class="dewp-form-input" id="timezone">
          <option value="Asia/Seoul">한국 표준시 (UTC+9)</option>
          <option value="America/New_York">미국 동부 시간 (UTC-5)</option>
          <option value="Europe/London">영국 시간 (UTC+0)</option>
        </select>
      </div>
      
      <div class="dewp-form-actions">
        <button type="submit" class="dewp-btn dewp-btn-primary">설정 저장</button>
        <button type="button" class="dewp-btn dewp-btn-secondary">초기화</button>
      </div>
    </form>
  </div>
</div>
```

## 🎨 커스터마이징

### CSS 변수
```scss
// 폼 색상
--dewp-form-input-bg: #ffffff;
--dewp-form-input-border: #dee2e6;
--dewp-form-input-focus-border: #007cba;
--dewp-form-input-error-border: #dc3545;
--dewp-form-input-disabled-bg: #e9ecef;

// 폼 크기
--dewp-form-input-padding: 12px 16px;
--dewp-form-input-border-radius: 6px;
--dewp-form-input-font-size: 14px;
--dewp-form-label-font-weight: 500;
```

### 커스텀 스타일
```css
/* 커스텀 폼 스타일 */
.dewp-form-custom .dewp-form-input {
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.dewp-form-custom .dewp-form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.dewp-form-custom .dewp-form-label {
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 8px;
}
```

## ⚠️ 주의사항

### 접근성
- `for` 속성과 `id` 속성 연결 필수
- `required`, `disabled` 속성 적절히 사용
- 스크린 리더 지원을 위한 라벨 제공

### 성능
- 폼 검증은 사용자 입력 후 지연 실행
- 불필요한 DOM 조작 최소화

### 브라우저 호환성
- IE11+ 지원
- 모던 브라우저에서 최적 성능
- 터치 디바이스 지원

## 🔧 문제 해결

### 일반적인 문제들
1. **폼이 제출되지 않음**
   - `type="submit"` 버튼 확인
   - JavaScript 이벤트 리스너 확인

2. **스타일이 적용되지 않음**
   - CSS 클래스명 확인
   - CSS 우선순위 확인

3. **유효성 검사가 작동하지 않음**
   - HTML5 유효성 속성 확인
   - JavaScript 검증 로직 확인

### 디버깅 팁
```javascript
// 폼 요소 상태 확인
const form = document.getElementById('my-form');
console.log('폼 요소:', form);
console.log('폼 입력들:', form.querySelectorAll('input, textarea, select'));

// 폼 데이터 수집
const formData = new FormData(form);
for (let [key, value] of formData.entries()) {
  console.log(`${key}: ${value}`);
}
```

---

**관련 문서**: [버튼 컴포넌트](./button.md), [테이블 컴포넌트](./table.md)
