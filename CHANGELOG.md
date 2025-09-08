# designbase-wp-library

## 0.5.2

### Patch Changes

- dc3f6b9: 빌드/버전 주입 개선 및 로그 정리

  - 빌드 시 `package.json`의 버전을 번들에 주입(rollup-replace)
  - 로드 시 단일 버전 로그(`[DEWP] vX.Y.Z loaded`)만 출력
  - 개발용 console.log 제거(Drawer/Toast 등)
  - 문서/데모는 항상 CDN `@latest` 사용(연결 확인)

## 0.5.1

### Patch Changes

- ea37600: Progress Step 세로형 레이아웃 개선 및 콘솔 로그 정리

  - Progress Step: 세로형에서 라벨을 마커 오른쪽에 정렬하도록 레이아웃 개편(Grid 기반)
  - Progress Step: 완료 상태에서 숫자 숨김(체크 아이콘만 노출)
  - JS: Drawer/Toast/전역 초기화의 개발용 console.log 제거
  - JS: 로드 시 단일 버전 로그만 출력(`[DEWP] vX.Y.Z loaded`)

## 0.5.0

### Minor Changes

- 5e39bea: Progress Step 컴포넌트 추가 및 문서 보강

  - 새 컴포넌트: `dewp-progress-step`
    - 수평 단계 진행 표시(완료/활성/대기 상태 지원)
    - 크기 변형: `.dewp-progress-step-sm`, `.dewp-progress-step-lg`
  - 세로형 변형: `.dewp-progress-step-vertical` (sm/lg 보정 포함)
  - 문서 추가: `docs/dewp-progress-step.html` (예제/HTML 구조/상태/변형)
  - 번들 등록: SCSS 메인에 `@use 'components/dewp-progress-step'`

  마이그레이션 안내

  - 기존 UI와 독립적인 신규 컴포넌트로, 다른 컴포넌트에 영향 없음
  - 표준 클래스 조합으로 상태를 제어하세요: `.is-completed`, `.is-active`

## 0.4.1

### Patch Changes

- b68c1bf: 문서/예시 정리 및 UI 개선 작업

  - 예시 페이지 구조 통일: 모든 `css-examples` 페이지에 "예시(상단) → 문서 요약(하단)" 레이아웃 적용 (`ex-docs` 공통 스타일 추가)
  - 드롭다운: 기본 화살표 아이콘을 CSS `::after`로 자동 표시, 열림 시 회전 처리; 버튼 텍스트와 간격 정리
  - 아코디언: 기본 화살표 아이콘을 CSS `::after`로 자동 표시, `aria-expanded` 기준 회전 처리 (커스텀 아이콘 없을 때만)
  - 툴팁/팝오버: 상단 라이브 데모 강화 (위/아래/왼쪽/오른쪽 배치 데모 추가)
  - 스피너/Stat: 상단 라이브 데모 섹션 추가 (사이즈/색상, 카드 3종 예시)
  - 스테퍼/테이블/프로그레스/폼/헤더/섹션/칩/디바이더/드로어/사이드바/브레드크럼: 하단 문서 요약 섹션 추가 및 정리
  - 예시 내비게이션: 사이드바를 제목 알파벳순으로 정렬하도록 스크립트 수정 (`_examples-shell.js`)
  - 예시 일부 페이지에서 CDN 대신 로컬 빌드(`dist`) 참조로 교체하여 최신 스타일/스크립트 확인 용이 (`dewp-accordion.html`, `dewp-dropdown.html`)
  - 기타: 경미한 스타일 정돈 및 접근성 표기 유지

## 0.4.0

### Minor Changes

- 새 기능 추가 및 개선:

  - SCSS: `_dewp-spinner.scss`(크기/색상 변형), `_dewp-stat.scss`(KPI 카드), `_dewp-range-slider.scss`(단일/듀얼, 라벨/틱, 변수화된 트랙·썸), `_dewp-stepper.scss` 추가
  - JS: `dewp-stepper.ts` 추가, `initStepper`/`DEWPStepper` 노출
  - 모달: 긴 내용 스크롤 영역 개선(`flex` 레이아웃, 바디 자동 스크롤)
  - 데모: Range/Stepper/Spinner/Stat 섹션 및 듀얼 슬라이더 예시 추가

  변경사항:

  - Range Slider 썸 정렬 문제 수정(브라우저별 수직 보정 변수 지원)
  - 사이드바/테이블/섹션 색상·간격 토큰 정리

  마이그레이션 노트:

  - 범위 슬라이더 커스터마이징은 CSS 변수로 제어: `--dewp-track-size`, `--dewp-thumb-size`, `--dewp-thumb-shift-y`, `--dewp-range-start/end`

## 0.3.0

### Minor Changes

- ### 사이드바 컴포넌트 신규 추가

  - 워드프레스 관리자 페이지 스타일의 고정 사이드바 컴포넌트
  - 페이지 왼쪽에 250px 고정 너비로 메뉴 그룹 구성
  - 메뉴 그룹별 제목과 계층적 메뉴 구조 지원
  - 서브메뉴 토글 기능 및 활성 메뉴 상태 관리
  - 구분선 추가 기능으로 메뉴 그룹 간 시각적 구분
  - 아이콘 지원 (이모지, SVG) 및 반응형 디자인
  - 다크모드 지원 및 워드프레스 관리자 페이지와 일치하는 테마
  - 동적 메뉴 관리 (그룹/아이템 추가/제거)
  - 모바일 최적화 (768px 이하에서 자동 숨김/표시)

  ### 주요 기능

  - **고정 위치 사이드바**: 드로워와 달리 페이지 측면에 고정
  - **메뉴 그룹 시스템**: 관련 메뉴들을 논리적 그룹으로 구성
  - **구분선 지원**: `addDivider()` 메서드로 시각적 구분 추가
  - **동적 메뉴 관리**: 런타임에 메뉴 그룹 및 아이템 추가/제거
  - **서브메뉴**: 계층적 메뉴 구조로 복잡한 네비게이션 구성
  - **활성 상태**: 현재 선택된 메뉴 하이라이트 및 상태 관리
  - **반응형 디자인**: 모바일에서 자동 숨김/표시 및 ESC 키 지원

  ### 사용법

  ```javascript
  const sidebar = new window.DEWP.DEWPSidebar({
      title: '플러그인 관리',
      subtitle: 'DesignBase Plugin Suite',
      groups: [
          {
              id: 'main',
              title: '주요 기능',
              items: [
                  {
                      id: 'dashboard',
                      text: '대시보드',
                      icon: '📊',
                      url: '#dashboard'
                  }
              ]
          }
      ],
      footerText: 'v1.0.0 - DesignBase'
  });

  // 구분선 추가
  sidebar.addDivider('main', 'after');

  // 새 그룹 추가
  sidebar.addGroup({...});

  // 메뉴 아이템 추가
  sidebar.addMenuItem('main', {...});
  ```

  ### 기술적 개선사항

  - TypeScript 인터페이스로 타입 안전성 보장
  - 모듈화된 컴포넌트 구조로 유지보수성 향상
  - 이벤트 위임을 통한 효율적인 DOM 이벤트 처리
  - 메모리 누수 방지를 위한 적절한 정리 메서드 제공
  - 웹 접근성 고려한 키보드 네비게이션 지원

## 0.2.3

### Patch Changes

- ### 드롭다운 컴포넌트 개선

  - 드롭다운 컨테이너 자동 감지 및 초기화 기능 추가
  - 각 드롭다운의 독립적 동작 보장 (크로스 컨테이너 간섭 방지)
  - 불필요한 스타일 제거로 간소화된 디자인
  - 자세한 디버깅 로그 추가

  ### 아코디언 컴포넌트 개선

  - 불필요한 콘솔 로그 완전 제거
  - 깔끔한 콘솔 출력으로 사용자 경험 향상

  ### Drawer 컴포넌트 신규 추가

  - 페이지 측면에서 슬라이드되는 서랍 형태의 패널 컴포넌트
  - 기존 HTML 요소를 활용한 열기/닫기 기능
  - 위치별 변형 (left, right, top, bottom)
  - 크기별 변형 (sm, md, lg, xl)
  - dim layer (overlay) 옵션 지원
  - ESC 키로 닫기 기능
  - 그림자와 다크모드 제거로 깔끔한 디자인

  ### 버튼 컴포넌트 상태 개선

  - 로딩 상태일 때 텍스트 숨김 처리 (로딩 스피너만 표시)
  - 비활성화 상태 시각적 개선 (opacity, grayscale 필터)
  - 호버/프레스 상태 시각적 피드백 강화
  - 버튼 상태별 명확한 구분

## 0.2.2

### Patch Changes

- feat: 워드프레스 어드민용 헤더 및 섹션 컴포넌트 추가

  - 헤더 컴포넌트: 제목, 설명, 액션 버튼을 포함한 어드민 페이지 상단 헤더
  - 섹션 컴포넌트: 제목, 설명, 액션, 콘텐츠, 푸터를 포함한 콘텐츠 구분 영역
  - 반응형 디자인: 데스크톱에서는 좌우 배치, 모바일에서는 세로 배치
  - 다양한 크기 및 테마 변형 지원
  - 접을 수 있는 섹션 기능
  - 섹션 그룹 및 푸터 기능
