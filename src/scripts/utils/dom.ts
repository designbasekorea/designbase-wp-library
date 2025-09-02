/**
 * DOM 유틸리티 함수들
 * 워드프레스 플러그인에서 자주 사용하는 DOM 조작 기능을 제공합니다.
 */

/**
 * 단일 요소 선택 (querySelector 래퍼)
 * @param sel CSS 선택자
 * @param scope 검색 범위 (기본값: document)
 * @returns 선택된 요소 또는 null
 */
export function qs<T extends Element = Element>(
    sel: string,
    scope: Document | Element = document
): T | null {
    return scope.querySelector<T>(sel);
}

/**
 * 여러 요소 선택 (querySelectorAll 래퍼)
 * @param sel CSS 선택자
 * @param scope 검색 범위 (기본값: document)
 * @returns 선택된 요소들의 배열
 */
export function qsa<T extends Element = Element>(
    sel: string,
    scope: Document | Element = document
): T[] {
    return Array.from(scope.querySelectorAll<T>(sel));
}

/**
 * HTML 요소 생성
 * @param tag 태그명
 * @param attrs 요소 속성들
 * @returns 생성된 HTML 요소
 */
export function create<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    attrs: Partial<HTMLElementTagNameMap[K]> = {}
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    Object.assign(el, attrs);
    return el;
}

/**
 * 요소에 클래스 추가
 * @param el 대상 요소
 * @param className 추가할 클래스명
 */
export function addClass(el: Element, className: string): void {
    el.classList.add(className);
}

/**
 * 요소에서 클래스 제거
 * @param el 대상 요소
 * @param className 제거할 클래스명
 */
export function removeClass(el: Element, className: string): void {
    el.classList.remove(className);
}

/**
 * 요소의 클래스 토글
 * @param el 대상 요소
 * @param className 토글할 클래스명
 * @param force 강제 설정 (true: 추가, false: 제거, undefined: 토글)
 */
export function toggleClass(
    el: Element,
    className: string,
    force?: boolean
): boolean {
    return el.classList.toggle(className, force);
}

/**
 * 요소에 클래스가 있는지 확인
 * @param el 대상 요소
 * @param className 확인할 클래스명
 * @returns 클래스 존재 여부
 */
export function hasClass(el: Element, className: string): boolean {
    return el.classList.contains(className);
}

/**
 * 요소의 텍스트 내용 설정
 * @param el 대상 요소
 * @param text 설정할 텍스트
 */
export function setText(el: Element, text: string): void {
    el.textContent = text;
}

/**
 * 요소의 HTML 내용 설정
 * @param el 대상 요소
 * @param html 설정할 HTML
 */
export function setHTML(el: Element, html: string): void {
    el.innerHTML = html;
}

/**
 * 요소에 이벤트 리스너 추가
 * @param el 대상 요소
 * @param event 이벤트 타입
 * @param handler 이벤트 핸들러
 * @param options 이벤트 옵션
 */
export function on<K extends keyof (HTMLElementEventMap & DocumentEventMap)>(
    el: Element | Document,
    event: K,
    handler: (e: (HTMLElementEventMap & DocumentEventMap)[K]) => void,
    options?: AddEventListenerOptions
): void {
    el.addEventListener(event, handler as EventListener, options);
}

/**
 * 요소에서 이벤트 리스너 제거
 * @param el 대상 요소
 * @param event 이벤트 타입
 * @param handler 이벤트 핸들러
 * @param options 이벤트 옵션
 */
export function off<K extends keyof (HTMLElementEventMap & DocumentEventMap)>(
    el: Element | Document,
    event: K,
    handler: (e: (HTMLElementEventMap & DocumentEventMap)[K]) => void,
    options?: EventListenerOptions
): void {
    el.removeEventListener(event, handler as EventListener, options);
}

/**
 * 요소를 부모에서 제거
 * @param el 제거할 요소
 */
export function remove(el: Element): void {
    el.remove();
}

/**
 * 부모 요소에 자식 요소 추가
 * @param parent 부모 요소
 * @param child 자식 요소
 */
export function append(parent: Element, child: Element): void {
    parent.appendChild(child);
}

/**
 * 요소를 특정 위치에 삽입
 * @param parent 부모 요소
 * @param child 삽입할 요소
 * @param ref 참조 요소 (이 요소 앞에 삽입)
 */
export function insertBefore(parent: Element, child: Element, ref: Element): void {
    parent.insertBefore(child, ref);
}

/**
 * 요소의 스타일 속성 설정
 * @param el 대상 요소
 * @param property CSS 속성명
 * @param value CSS 값
 */
export function setStyle(el: HTMLElement, property: string, value: string): void {
    el.style.setProperty(property, value);
}

/**
 * 요소의 데이터 속성 설정
 * @param el 대상 요소
 * @param key 데이터 키
 * @param value 데이터 값
 */
export function setData(el: Element, key: string, value: string): void {
    el.setAttribute(`data-${key}`, value);
}

/**
 * 요소의 데이터 속성 가져오기
 * @param el 대상 요소
 * @param key 데이터 키
 * @returns 데이터 값 또는 null
 */
export function getData(el: Element, key: string): string | null {
    return el.getAttribute(`data-${key}`);
}

/**
 * 토스트 알림 표시
 * @param message 표시할 메시지
 * @param type 토스트 타입 ('success', 'warning', 'error', 'info')
 * @param duration 표시 시간 (밀리초, 기본값: 3000)
 */
export function showToast(
    message: string,
    type: 'success' | 'warning' | 'error' | 'info' = 'success',
    duration: number = 3000
): void {
    // 토스트 컨테이너 찾기 또는 생성
    let toastContainer = qs('.dbfk-toast') as HTMLDivElement | null;
    if (!toastContainer) {
        toastContainer = create('div', { className: 'dbfk-toast' });
        document.body.appendChild(toastContainer);
    }

    // 토스트 아이템 생성
    const toastItem = create('div', {
        className: `dbfk-toast__item dbfk-toast__item--${type}`,
        textContent: message
    });

    // 토스트 추가
    append(toastContainer, toastItem);

    // 지정된 시간 후 제거
    setTimeout(() => {
        remove(toastItem);
        // 컨테이너에 자식이 없으면 컨테이너도 제거
        if (toastContainer && toastContainer.children.length === 0) {
            remove(toastContainer);
        }
    }, duration);
}

/**
 * 성공 토스트 알림
 * @param message 표시할 메시지
 * @param duration 표시 시간 (밀리초)
 */
export function showSuccessToast(message: string, duration?: number): void {
    showToast(message, 'success', duration);
}

/**
 * 경고 토스트 알림
 * @param message 표시할 메시지
 * @param duration 표시 시간 (밀리초)
 */
export function showWarningToast(message: string, duration?: number): void {
    showToast(message, 'warning', duration);
}

/**
 * 오류 토스트 알림
 * @param message 표시할 메시지
 * @param duration 표시 시간 (밀리초)
 */
export function showErrorToast(message: string, duration?: number): void {
    showToast(message, 'error', duration);
}

/**
 * 정보 토스트 알림
 * @param message 표시할 메시지
 * @param duration 표시 시간 (밀리초)
 */
export function showInfoToast(message: string, duration?: number): void {
    showToast(message, 'info', duration);
}

/**
 * DOM이 로드 완료되었는지 확인
 * @returns DOM 로드 완료 여부
 */
export function isDOMReady(): boolean {
    return document.readyState === 'loading' ? false : true;
}

/**
 * DOM 로드 완료 대기
 * @param callback DOM 로드 완료 후 실행할 콜백
 */
export function onDOMReady(callback: () => void): void {
    if (isDOMReady()) {
        callback();
    } else {
        on(document, 'DOMContentLoaded', callback, { once: true });
    }
}

/**
 * 요소가 화면에 보이는지 확인 (Intersection Observer 사용)
 * @param el 확인할 요소
 * @param threshold 임계값 (0~1, 기본값: 0)
 * @returns Promise<boolean> 요소가 보이는지 여부
 */
export function isElementVisible(
    el: Element,
    threshold: number = 0
): Promise<boolean> {
    return new Promise((resolve) => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                observer.disconnect();
                resolve(entry.isIntersecting);
            },
            { threshold }
        );
        observer.observe(el);
    });
}

/**
 * 요소를 화면에 스크롤
 * @param el 스크롤할 요소
 * @param behavior 스크롤 동작 ('smooth' | 'auto', 기본값: 'smooth')
 */
export function scrollToElement(
    el: Element,
    behavior: ScrollBehavior = 'smooth'
): void {
    el.scrollIntoView({ behavior, block: 'start' });
}

/**
 * 요소의 위치 정보 가져오기
 * @param el 대상 요소
 * @returns 요소의 위치 정보
 */
export function getElementRect(el: Element): DOMRect {
    return el.getBoundingClientRect();
}

/**
 * 요소가 부모 요소 안에 있는지 확인
 * @param child 자식 요소
 * @param parent 부모 요소
 * @returns 포함 여부
 */
export function isChildOf(child: Element, parent: Element): boolean {
    return parent.contains(child);
}

/**
 * 요소의 모든 자식 요소 제거
 * @param el 대상 요소
 */
export function clearChildren(el: Element): void {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

/**
 * 모달 생성 및 관리
 */
export interface ModalOptions {
    title?: string;
    content?: string | Element;
    footer?: string | Element;
    onClose?: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
}

/**
 * 모달 생성
 * @param options 모달 옵션
 * @returns 모달 요소
 */
export function createModal(options: ModalOptions = {}): HTMLDivElement {
    const {
        title = '',
        content = '',
        footer,
        onClose,
        onConfirm,
        confirmText = '확인',
        cancelText = '취소',
        closeOnBackdrop = true,
        closeOnEscape = true
    } = options;

    // 모달 컨테이너 생성
    const modal = create('div', { className: 'dbfk-modal' });

    // 모달 콘텐츠 생성
    const modalContent = create('div', { className: 'dbfk-modal__content' });

    // 헤더 생성
    const header = create('div', { className: 'dbfk-modal__header' });
    const titleEl = create('h3', { className: 'dbfk-modal__title', textContent: title });
    const closeBtn = create('button', {
        className: 'dbfk-modal__close',
        textContent: '×',
        type: 'button'
    });

    append(header, titleEl);
    append(header, closeBtn);

    // 바디 생성
    const body = create('div', { className: 'dbfk-modal__body' });
    if (typeof content === 'string') {
        setHTML(body, content);
    } else if (content) {
        append(body, content);
    }

    // 푸터 생성
    let footerEl: HTMLDivElement | null = null;
    if (footer || onConfirm) {
        footerEl = create('div', { className: 'dbfk-modal__footer' });

        if (typeof footer === 'string') {
            setHTML(footerEl, footer);
        } else if (footer) {
            append(footerEl, footer);
        }

        if (onConfirm) {
            const confirmBtn = create('button', {
                className: 'dbfk-btn dbfk-btn--primary',
                textContent: confirmText,
                type: 'button'
            });
            append(footerEl, confirmBtn);

            on(confirmBtn, 'click', () => {
                onConfirm();
                closeModal(modal);
            });
        }

        const cancelBtn = create('button', {
            className: 'dbfk-btn',
            textContent: cancelText,
            type: 'button'
        });
        append(footerEl, cancelBtn);

        on(cancelBtn, 'click', () => {
            closeModal(modal);
        });
    }

    // 모달 조립
    append(modalContent, header);
    append(modalContent, body);
    if (footerEl) {
        append(modalContent, footerEl);
    }
    append(modal, modalContent);

    // 이벤트 리스너 추가
    on(closeBtn, 'click', () => {
        closeModal(modal);
    });

    if (closeOnBackdrop) {
        on(modal, 'click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }

    if (closeOnEscape) {
        on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && hasClass(modal, 'dbfk-modal--open')) {
                closeModal(modal);
            }
        });
    }

    return modal;
}

/**
 * 모달 열기
 * @param modal 모달 요소
 */
export function openModal(modal: HTMLDivElement): void {
    append(document.body, modal);
    // 다음 프레임에서 애니메이션 시작
    requestAnimationFrame(() => {
        addClass(modal, 'dbfk-modal--open');
    });
}

/**
 * 모달 닫기
 * @param modal 모달 요소
 */
export function closeModal(modal: HTMLDivElement): void {
    removeClass(modal, 'dbfk-modal--open');
    setTimeout(() => {
        if (modal.parentNode) {
            remove(modal);
        }
    }, 300);
}

/**
 * 간단한 모달 표시
 * @param title 제목
 * @param content 내용
 * @param options 추가 옵션
 */
export function showModal(title: string, content: string, options: ModalOptions = {}): HTMLDivElement {
    const modal = createModal({ title, content, ...options });
    openModal(modal);
    return modal;
}

/**
 * 확인 모달 표시
 * @param title 제목
 * @param content 내용
 * @param onConfirm 확인 콜백
 * @param onCancel 취소 콜백
 */
export function showConfirmModal(
    title: string,
    content: string,
    onConfirm: () => void,
    onCancel?: () => void
): HTMLDivElement {
    return showModal(title, content, {
        onConfirm,
        onClose: onCancel,
        confirmText: '확인',
        cancelText: '취소'
    });
}

/**
 * 드롭다운 생성 및 관리
 */
export interface DropdownOptions {
    items: Array<{
        label: string;
        value?: string;
        disabled?: boolean;
        onClick?: () => void;
    }>;
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    closeOnClick?: boolean;
    onSelect?: (value: string, index: number) => void;
}

/**
 * 드롭다운 생성
 * @param toggleElement 토글 요소
 * @param options 드롭다운 옵션
 * @returns 드롭다운 컨테이너
 */
export function createDropdown(toggleElement: Element, options: DropdownOptions): HTMLDivElement {
    const { items, position = 'bottom-left', closeOnClick = true, onSelect } = options;

    // 드롭다운 컨테이너 생성
    const dropdown = create('div', { className: 'dbfk-dropdown' });

    // 토글 요소를 드롭다운으로 이동
    if (toggleElement.parentNode) {
        toggleElement.parentNode.insertBefore(dropdown, toggleElement);
    }
    append(dropdown, toggleElement);
    addClass(toggleElement, 'dbfk-dropdown__toggle');

    // 드롭다운 메뉴 생성
    const menu = create('div', { className: 'dbfk-dropdown__menu' });

    // 메뉴 아이템 생성
    items.forEach((item, index) => {
        if (item.label === '---') {
            // 구분선
            const divider = create('div', { className: 'dbfk-dropdown__divider' });
            append(menu, divider);
        } else {
            const menuItem = create('button', {
                className: `dbfk-dropdown__item${item.disabled ? ' dbfk-dropdown__item--disabled' : ''}`,
                textContent: item.label,
                type: 'button',
                disabled: item.disabled
            });

            if (!item.disabled) {
                on(menuItem, 'click', () => {
                    if (item.onClick) {
                        item.onClick();
                    }
                    if (onSelect && item.value !== undefined) {
                        onSelect(item.value, index);
                    }
                    if (closeOnClick) {
                        closeDropdown(dropdown);
                    }
                });
            }

            append(menu, menuItem);
        }
    });

    append(dropdown, menu);

    // 토글 이벤트 추가
    on(toggleElement, 'click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(dropdown);
    });

    // 외부 클릭 시 닫기
    on(document, 'click', (e) => {
        if (!dropdown.contains(e.target as Element)) {
            closeDropdown(dropdown);
        }
    });

    // ESC 키로 닫기
    on(document, 'keydown', (e) => {
        if (e.key === 'Escape' && hasClass(dropdown, 'dbfk-dropdown--open')) {
            closeDropdown(dropdown);
        }
    });

    return dropdown;
}

/**
 * 드롭다운 토글
 * @param dropdown 드롭다운 요소
 */
export function toggleDropdown(dropdown: HTMLDivElement): void {
    if (hasClass(dropdown, 'dbfk-dropdown--open')) {
        closeDropdown(dropdown);
    } else {
        openDropdown(dropdown);
    }
}

/**
 * 드롭다운 열기
 * @param dropdown 드롭다운 요소
 */
export function openDropdown(dropdown: HTMLDivElement): void {
    addClass(dropdown, 'dbfk-dropdown--open');
}

/**
 * 드롭다운 닫기
 * @param dropdown 드롭다운 요소
 */
export function closeDropdown(dropdown: HTMLDivElement): void {
    removeClass(dropdown, 'dbfk-dropdown--open');
}
