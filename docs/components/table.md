# 테이블 (Table) 컴포넌트

## 📖 개요

DEWP 테이블 컴포넌트는 데이터를 체계적으로 표시하기 위한 테이블입니다. 다양한 스타일과 기능을 지원합니다.

## 🚀 기본 사용법

### HTML 구조
```html
<table class="dewp-table">
  <thead>
    <tr>
      <th>이름</th>
      <th>이메일</th>
      <th>역할</th>
      <th>상태</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>김철수</td>
      <td>kim@example.com</td>
      <td>관리자</td>
      <td><span class="dewp-badge dewp-badge-success">활성</span></td>
    </tr>
    <tr>
      <td>이영희</td>
      <td>lee@example.com</td>
      <td>사용자</td>
      <td><span class="dewp-badge dewp-badge-warning">대기</span></td>
    </tr>
  </tbody>
</table>
```

## 🎨 테이블 스타일

### 기본 테이블
```html
<!-- 기본 테이블 -->
<table class="dewp-table">
  <thead>
    <tr>
      <th>제목 1</th>
      <th>제목 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>데이터 1</td>
      <td>데이터 2</td>
    </tr>
  </tbody>
</table>
```

### 테이블 크기
```html
<!-- 작은 테이블 -->
<table class="dewp-table dewp-table-sm">
  <thead>
    <tr>
      <th>작은 테이블</th>
      <th>컴팩트</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>데이터 1</td>
      <td>데이터 2</td>
    </tr>
  </tbody>
</table>

<!-- 기본 크기 -->
<table class="dewp-table">
  <thead>
    <tr>
      <th>기본 테이블</th>
      <th>표준</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>데이터 1</td>
      <td>데이터 2</td>
    </tr>
  </tbody>
</table>

<!-- 큰 테이블 -->
<table class="dewp-table dewp-table-lg">
  <thead>
    <tr>
      <th>큰 테이블</th>
      <th>여유로운</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>데이터 1</td>
      <td>데이터 2</td>
    </tr>
  </tbody>
</table>
```

### 테이블 변형

#### 줄무늬 테이블
```html
<table class="dewp-table dewp-table-striped">
  <thead>
    <tr>
      <th>이름</th>
      <th>이메일</th>
      <th>역할</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>김철수</td>
      <td>kim@example.com</td>
      <td>관리자</td>
    </tr>
    <tr>
      <td>이영희</td>
      <td>lee@example.com</td>
      <td>사용자</td>
    </tr>
    <tr>
      <td>박민수</td>
      <td>park@example.com</td>
      <td>편집자</td>
    </tr>
  </tbody>
</table>
```

#### 호버 효과 테이블
```html
<table class="dewp-table dewp-table-hover">
  <thead>
    <tr>
      <th>제품</th>
      <th>가격</th>
      <th>재고</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>노트북</td>
      <td>₩1,200,000</td>
      <td><span class="dewp-badge dewp-badge-success">재고있음</span></td>
    </tr>
    <tr>
      <td>마우스</td>
      <td>₩50,000</td>
      <td><span class="dewp-badge dewp-badge-warning">부족</span></td>
    </tr>
  </tbody>
</table>
```

#### 테두리 테이블
```html
<table class="dewp-table dewp-table-bordered">
  <thead>
    <tr>
      <th>항목</th>
      <th>설명</th>
      <th>상태</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>서버</td>
      <td>웹 서버</td>
      <td><span class="dewp-badge dewp-badge-success">정상</span></td>
    </tr>
    <tr>
      <td>데이터베이스</td>
      <td>MySQL</td>
      <td><span class="dewp-badge dewp-badge-info">점검중</span></td>
    </tr>
  </tbody>
</table>
```

#### 둥근 모서리 테이블
```html
<table class="dewp-table dewp-table-rounded">
  <thead>
    <tr>
      <th>카테고리</th>
      <th>수량</th>
      <th>비율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>전자제품</td>
      <td>150</td>
      <td>45%</td>
    </tr>
    <tr>
      <td>의류</td>
      <td>120</td>
      <td>36%</td>
    </tr>
  </tbody>
</table>
```

## 🎯 실제 사용 예시

### 사용자 관리 테이블
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">사용자 관리</h3>
    <div class="dewp-section-actions">
      <button class="dewp-btn dewp-btn-primary">새 사용자 추가</button>
    </div>
  </div>
  
  <div class="dewp-section-content">
    <table class="dewp-table dewp-table-striped dewp-table-hover">
      <thead>
        <tr>
          <th>사용자명</th>
          <th>이메일</th>
          <th>역할</th>
          <th>가입일</th>
          <th>상태</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div style="display: flex; align-items: center;">
              <img src="https://via.placeholder.com/32x32" alt="프로필" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 12px;">
              <div>
                <div style="font-weight: 500;">김철수</div>
                <div style="font-size: 12px; color: #6c757d;">kim.chulsoo</div>
              </div>
            </div>
          </td>
          <td>kim@example.com</td>
          <td><span class="dewp-badge dewp-badge-primary">관리자</span></td>
          <td>2024-01-01</td>
          <td><span class="dewp-badge dewp-badge-success">활성</span></td>
          <td>
            <div class="dewp-btn-group">
              <button class="dewp-btn dewp-btn-sm dewp-btn-outline-primary">편집</button>
              <button class="dewp-btn dewp-btn-sm dewp-btn-outline-danger">삭제</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="display: flex; align-items: center;">
              <img src="https://via.placeholder.com/32x32" alt="프로필" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 12px;">
              <div>
                <div style="font-weight: 500;">이영희</div>
                <div style="font-size: 12px; color: #6c757d;">lee.younghee</div>
              </div>
            </div>
          </td>
          <td>lee@example.com</td>
          <td><span class="dewp-badge dewp-badge-secondary">사용자</span></td>
          <td>2024-01-05</td>
          <td><span class="dewp-badge dewp-badge-warning">대기</span></td>
          <td>
            <div class="dewp-btn-group">
              <button class="dewp-btn dewp-btn-sm dewp-btn-outline-primary">편집</button>
              <button class="dewp-btn dewp-btn-sm dewp-btn-outline-danger">삭제</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### 제품 목록 테이블
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">제품 목록</h3>
    <div class="dewp-section-actions">
      <button class="dewp-btn dewp-btn-outline-secondary">내보내기</button>
      <button class="dewp-btn dewp-btn-primary">제품 추가</button>
    </div>
  </div>
  
  <div class="dewp-section-content">
    <table class="dewp-table dewp-table-bordered dewp-table-hover">
      <thead>
        <tr>
          <th style="width: 60px;">
            <input type="checkbox" class="dewp-form-check-input" id="select-all">
          </th>
          <th>제품 정보</th>
          <th>카테고리</th>
          <th>가격</th>
          <th>재고</th>
          <th>판매량</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" class="dewp-form-check-input" name="product" value="1">
          </td>
          <td>
            <div style="display: flex; align-items: center;">
              <img src="https://via.placeholder.com/48x48" alt="제품" style="width: 48px; height: 48px; border-radius: 4px; margin-right: 12px;">
              <div>
                <div style="font-weight: 500;">MacBook Pro 16"</div>
                <div style="font-size: 12px; color: #6c757d;">SKU: MB-001</div>
              </div>
            </div>
          </td>
          <td>노트북</td>
          <td>
            <div style="font-weight: 500;">₩3,200,000</div>
            <div style="font-size: 12px; color: #6c757d;">할인가: ₩2,800,000</div>
          </td>
          <td>
            <span class="dewp-badge dewp-badge-success">재고있음</span>
            <div style="font-size: 12px; color: #6c757d;">15개</div>
          </td>
          <td>
            <div style="font-weight: 500;">127개</div>
            <div style="font-size: 12px; color: #6c757d;">이번 달</div>
          </td>
          <td><span class="dewp-badge dewp-badge-success">판매중</span></td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" class="dewp-form-check-input" name="product" value="2">
          </td>
          <td>
            <div style="display: flex; align-items: center;">
              <img src="https://via.placeholder.com/48x48" alt="제품" style="width: 48px; height: 48px; border-radius: 4px; margin-right: 12px;">
              <div>
                <div style="font-weight: 500;">Magic Mouse</div>
                <div style="font-size: 12px; color: #6c757d;">SKU: MM-001</div>
              </div>
            </div>
          </td>
          <td>액세서리</td>
          <td>₩89,000</td>
          <td>
            <span class="dewp-badge dewp-badge-warning">부족</span>
            <div style="font-size: 12px; color: #6c757d;">3개</div>
          </td>
          <td>
            <div style="font-weight: 500;">89개</div>
            <div style="font-size: 12px; color: #6c757d;">이번 달</div>
          </td>
          <td><span class="dewp-badge dewp-badge-warning">재고부족</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### 통계 데이터 테이블
```html
<div class="dewp-section">
  <div class="dewp-section-header">
    <h3 class="dewp-section-title">월별 통계</h3>
    <div class="dewp-section-actions">
      <select class="dewp-form-input dewp-form-input-sm">
        <option>2024년</option>
        <option>2023년</option>
      </select>
    </div>
  </div>
  
  <div class="dewp-section-content">
    <table class="dewp-table dewp-table-striped dewp-table-rounded">
      <thead>
        <tr>
          <th>월</th>
          <th>매출</th>
          <th>주문 수</th>
          <th>고객 수</th>
          <th>성장률</th>
          <th>트렌드</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1월</td>
          <td>
            <div style="font-weight: 500;">₩12,450,000</div>
            <div style="font-size: 12px; color: #6c757d;">전월 대비 +15%</div>
          </td>
          <td>1,247</td>
          <td>892</td>
          <td>
            <span class="dewp-badge dewp-badge-success">+15.2%</span>
          </td>
          <td>
            <div style="display: flex; align-items: center;">
              <span style="color: #28a745; margin-right: 4px;">↗</span>
              <span style="font-size: 12px; color: #6c757d;">상승</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>2월</td>
          <td>
            <div style="font-weight: 500;">₩11,890,000</div>
            <div style="font-size: 12px; color: #6c757d;">전월 대비 -4.5%</div>
          </td>
          <td>1,189</td>
          <td>856</td>
          <td>
            <span class="dewp-badge dewp-badge-warning">-4.5%</span>
          </td>
          <td>
            <div style="display: flex; align-items: center;">
              <span style="color: #ffc107; margin-right: 4px;">↘</span>
              <span style="font-size: 12px; color: #6c757d;">하락</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## 🔧 JavaScript 기능

### 테이블 정렬
```html
<table class="dewp-table" id="sortable-table">
  <thead>
    <tr>
      <th data-sort="name">이름 <span class="sort-icon">↕</span></th>
      <th data-sort="email">이메일 <span class="sort-icon">↕</span></th>
      <th data-sort="role">역할 <span class="sort-icon">↕</span></th>
    </tr>
  </thead>
  <tbody>
    <tr data-name="김철수" data-email="kim@example.com" data-role="관리자">
      <td>김철수</td>
      <td>kim@example.com</td>
      <td>관리자</td>
    </tr>
    <tr data-name="이영희" data-email="lee@example.com" data-role="사용자">
      <td>이영희</td>
      <td>lee@example.com</td>
      <td>사용자</td>
    </tr>
  </tbody>
</table>

<script>
// 테이블 정렬 기능
document.querySelectorAll('#sortable-table th[data-sort]').forEach(th => {
  th.addEventListener('click', function() {
    const sortKey = this.dataset.sort;
    const tbody = this.closest('table').querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 정렬 방향 결정
    const isAscending = !this.classList.contains('sort-asc');
    
    // 정렬 실행
    rows.sort((a, b) => {
      const aValue = a.dataset[sortKey];
      const bValue = b.dataset[sortKey];
      
      if (isAscending) {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    
    // 정렬된 행들을 테이블에 다시 추가
    rows.forEach(row => tbody.appendChild(row));
    
    // 정렬 방향 표시 업데이트
    document.querySelectorAll('#sortable-table th[data-sort]').forEach(header => {
      header.classList.remove('sort-asc', 'sort-desc');
    });
    this.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
  });
});
</script>
```

### 테이블 검색
```html
<div class="dewp-form-group">
  <label class="dewp-form-label" for="table-search">테이블 검색</label>
  <input type="text" class="dewp-form-input" id="table-search" placeholder="검색어를 입력하세요">
</div>

<table class="dewp-table" id="searchable-table">
  <thead>
    <tr>
      <th>이름</th>
      <th>이메일</th>
      <th>역할</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>김철수</td>
      <td>kim@example.com</td>
      <td>관리자</td>
    </tr>
    <tr>
      <td>이영희</td>
      <td>lee@example.com</td>
      <td>사용자</td>
    </tr>
  </tbody>
</table>

<script>
// 테이블 검색 기능
document.getElementById('table-search').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const table = document.getElementById('searchable-table');
  const rows = table.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
</script>
```

## 🎨 커스터마이징

### CSS 변수
```scss
// 테이블 색상
--dewp-table-bg: #ffffff;
--dewp-table-border: #dee2e6;
--dewp-table-striped-bg: #f8f9fa;
--dewp-table-hover-bg: #e9ecef;

// 테이블 크기
--dewp-table-padding: 12px 16px;
--dewp-table-border-radius: 6px;
--dewp-table-font-size: 14px;
--dewp-table-header-font-weight: 600;
```

### 커스텀 스타일
```css
/* 커스텀 테이블 스타일 */
.dewp-table-custom {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dewp-table-custom th {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
}

.dewp-table-custom td {
  border-bottom: 1px solid #f0f0f0;
}

.dewp-table-custom tbody tr:hover {
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## ⚠️ 주의사항

### 접근성
- `thead`와 `tbody` 사용으로 테이블 구조 명확화
- 적절한 `scope` 속성 사용
- 스크린 리더 지원을 위한 테이블 캡션 제공

### 성능
- 많은 행이 있을 때는 가상 스크롤링 고려
- 불필요한 DOM 조작 최소화

### 브라우저 호환성
- IE11+ 지원
- 모던 브라우저에서 최적 성능
- 반응형 테이블 지원

## 🔧 문제 해결

### 일반적인 문제들
1. **테이블이 반응형이 아님**
   - `dewp-table-responsive` 클래스 추가
   - CSS 미디어 쿼리 확인

2. **정렬이 작동하지 않음**
   - `data-sort` 속성 확인
   - JavaScript 이벤트 리스너 확인

3. **검색이 작동하지 않음**
   - 검색 입력 필드 ID 확인
   - 테이블 ID 확인

### 디버깅 팁
```javascript
// 테이블 요소 확인
const table = document.getElementById('my-table');
console.log('테이블:', table);
console.log('테이블 행들:', table.querySelectorAll('tbody tr'));

// 테이블 데이터 추출
const rows = Array.from(table.querySelectorAll('tbody tr'));
const data = rows.map(row => {
  const cells = row.querySelectorAll('td');
  return Array.from(cells).map(cell => cell.textContent);
});
console.log('테이블 데이터:', data);
```

---

**관련 문서**: [폼 컴포넌트](./form.md), [배지 컴포넌트](./badge.md)
