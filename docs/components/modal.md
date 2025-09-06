# Modal (모달)

DEWP 모달은 간단한 API로 생성/표시/닫기/확인 대화상자까지 처리할 수 있는 UI 컴포넌트입니다. 긴 내용 스크롤을 위해 `.dewp-modal` 내부가 플렉스 레이아웃으로 구성되며, `.dewp-modal-body`에 자연스러운 스크롤이 적용됩니다.

## 마크업 구조

```html
<!-- 동적 생성되므로 기본적으로 마크업을 작성할 필요는 없습니다 -->
<!-- 필요 시 서버 템플릿에 빈 컨테이너를 둘 수도 있으나 일반적으론 JS로 생성/제어합니다 -->
```

출력되는 구조는 다음과 같습니다.

```html
<div id="dewp-modal-..." class="dewp-modal dewp-modal-md">
  <div class="dewp-modal-header">
    <h3>제목</h3>
    <button class="dewp-modal-close">×</button>
  </div>
  <div class="dewp-modal-body">
    <!-- HTML 문자열 또는 HTMLElement 삽입 -->
  </div>
  <div class="dewp-modal-footer">
    <button class="dewp-modal-cancel">취소</button>
    <button class="dewp-modal-confirm">확인</button>
  </div>
</div>
<div class="dewp-modal-backdrop"></div>
```

- 사이즈 클래스: `dewp-modal-sm | dewp-modal-md | dewp-modal-lg | dewp-modal-xl | dewp-modal-full`
- 백드롭은 라이브러리가 자동 생성/관리합니다.

## JavaScript 사용법

모든 함수는 `window.DEWP` 전역 또는 ESM import로 사용 가능합니다.

```html
<script>
  // 간단 표시 (생성 + 열기)
  const id = window.DEWP.showModal({
    title: '알림',
    content: '모달이 표시됩니다',
    size: 'md',
  });

  // 확인 대화상자
  window.DEWP.showConfirmModal({
    title: '확인',
    message: '정말 진행하시겠습니까?',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: () => console.log('confirmed'),
    onCancel: () => console.log('cancelled'),
  });

  // 수동 생성/제어
  const modalId = window.DEWP.createModal({ title: '제목', content: '<p>내용</p>', size: 'lg' });
  window.DEWP.openModal(modalId);
  window.DEWP.closeModal(modalId);
  window.DEWP.closeAllModals?.();
</script>
```

ESM 사용 예:

```ts
import { createModal, openModal, closeModal, showModal, showConfirmModal } from 'designbase-wp-library';

const modalId = createModal({ title: '제목', content: '내용', size: 'lg' });
openModal(modalId);
closeModal(modalId);
showModal({ title: '알림', content: '바로 표시' });
showConfirmModal({ message: '삭제하시겠습니까?', onConfirm: () => {/* ... */} });
```

## API 레퍼런스

타입(요약):

```ts
interface ModalOptions {
  title?: string;
  content?: string | HTMLElement;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;       // 헤더 닫기 버튼 표시 여부 (기본 true)
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;     // 확인 버튼 텍스트 존재 시 footer 생성
  cancelText?: string;      // showCancel이 true일 때 표시
  showCancel?: boolean;     // 취소 버튼 표시 여부
  backdrop?: boolean;       // (현재 기본 표시)
  keyboard?: boolean;       // ESC 허용 여부(전역 핸들러로 처리)
  focus?: boolean;          // 오픈 시 포커스 이동 (기본 버튼)
  show?: boolean;           // 생성 즉시 표시 여부 (showModal로 대체 권장)
}

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
}
```

함수:
- `createModal(options?: ModalOptions): string` — 모달을 생성하고 id 반환(표시는 별도)
- `openModal(id: string): void` — 생성된 모달 열기
- `closeModal(id: string): void` — 모달 닫기 및 DOM 제거
- `showModal(options?: ModalOptions): string` — 생성 후 즉시 열기
- `showConfirmModal(options: ConfirmOptions): void` — 확인 모달 표시
- `closeAllModals(): void` — 열린 모달 모두 닫기

유틸리티:
- `isOpen(id: string): boolean` — 특정 모달 오픈 여부 (내부에서 사용)
- `getModal(id: string): HTMLElement | undefined` — 모달 DOM 반환 (디버깅용)

## 접근성
- ESC로 닫기 지원.
- 열릴 때 첫 번째 버튼으로 포커스 이동.
- 백드롭 클릭 시 닫힘.
- 헤더 닫기 버튼은 키보드 접근 가능.

## 긴 내용 처리
- `.dewp-modal`은 `display: flex; flex-direction: column;`으로 구성됩니다.
- `.dewp-modal-body`에 `flex: 1 1 auto; min-height: 0; overflow-y: auto;`가 적용되어 본문이 길어질 경우 내부 스크롤이 활성화됩니다.

## 팁
- 긴 HTML은 문자열보다 `HTMLElement`를 넘기면 성능/유지보수에 유리합니다.
- confirm/alert 대화상자는 `showConfirmModal`/`showAlertModal`(내부 제공)로 간단히 구현 가능합니다.
