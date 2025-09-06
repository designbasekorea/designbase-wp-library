/**
 * DEWP 드롭다운 시스템 (FIXED)
 * - 유니크 ID 생성 보강(crypto.randomUUID() + fallback counter)
 * - 중복 초기화 가드
 * - autoClose 동작 보강
 * - 데모 페이지 전역 스크립트와의 충돌 가정 제거
 */

interface DropdownOptions {
    trigger: string | HTMLElement;
    content: string | HTMLElement; // 현재는 미사용(구조상 기존 메뉴 사용)
    position?: 'bottom' | 'top' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    offset?: number;
    autoClose?: boolean;
    placeholder?: string;
    onShow?: () => void;
    onHide?: () => void;
    onSelect?: (value: string, text: string) => void;
}

interface DropdownInstance {
    id: string;
    element: HTMLElement;
    options: DropdownOptions;
    trigger: HTMLElement;
    container: HTMLElement;
    selectedValue?: string;
    selectedText?: string;
}

class DEWPDropdown {
    private dropdowns: Map<string, DropdownInstance> = new Map();
    private activeDropdown: DropdownInstance | null = null;
    private zIndex: number = 1000;
    private uidCounter = 0;

    constructor() {
        this.init();
    }

    private init(): void {
        this.bindGlobalEvents();
    }

    private generateId(): string {
        // 최대한 충돌 없이 ID 생성
        // crypto.randomUUID()가 있으면 사용, 없으면 Date.now() + 증가 카운터
        const base =
            (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
                ? (crypto as any).randomUUID()
                : `${Date.now()}-${++this.uidCounter}`;
        return `dewp-dropdown-${base}`;
    }

    private bindGlobalEvents(): void {
        // 외부 클릭으로 드롭다운 닫기
        document.addEventListener('click', (e) => {
            if (!this.activeDropdown) return;

            const target = e.target as HTMLElement;
            const isTrigger = this.activeDropdown.trigger.contains(target);
            const isDropdown = this.activeDropdown.element.contains(target);

            if (!isTrigger && !isDropdown) {
                if (this.activeDropdown.options.autoClose !== false) {
                    this.hide(this.activeDropdown.id);
                }
            }
        });

        // ESC 키로 드롭다운 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeDropdown) {
                if (this.activeDropdown.options.autoClose !== false) {
                    this.hide(this.activeDropdown.id);
                }
            }
        });

        // 윈도우 리사이즈/스크롤 시 드롭다운 위치 재조정
        const reposition = () => {
            if (this.activeDropdown) {
                this.positionDropdown(this.activeDropdown);
            }
        };
        window.addEventListener('resize', reposition);
        window.addEventListener('scroll', reposition, true);
    }

    create(options: DropdownOptions): string {
        // 트리거 요소 찾기
        const trigger = typeof options.trigger === 'string'
            ? document.querySelector(options.trigger)
            : options.trigger;

        if (!trigger) {
            console.error('🔽 드롭다운 트리거 요소를 찾을 수 없음:', options.trigger);
            throw new Error('드롭다운 트리거 요소를 찾을 수 없습니다.');
        }

        // 컨테이너 찾기
        const container = this.findDropdownContainer(trigger as HTMLElement);
        if (!container) {
            console.error('🔽 드롭다운 컨테이너를 찾을 수 없음');
            throw new Error('드롭다운 컨테이너(.dewp-dropdown)를 찾을 수 없습니다.');
        }

        // 이미 초기화된 컨테이너라면 기존 id 반환(중복 초기화 방지)
        const alreadyId = (container as HTMLElement).dataset.dropdownId;
        if (alreadyId && this.dropdowns.has(alreadyId)) {
            return alreadyId;
        }

        // 기존 메뉴 찾기
        const existingMenu = container.querySelector('.dewp-dropdown-menu');
        if (!existingMenu) {
            console.error('🔽 기존 드롭다운 메뉴를 찾을 수 없음');
            throw new Error('기존 드롭다운 메뉴(.dewp-dropdown-menu)를 찾을 수 없습니다.');
        }

        const dropdownId = this.generateId();

        // 인스턴스 생성
        const instance: DropdownInstance = {
            id: dropdownId,
            element: existingMenu as HTMLElement,
            options,
            trigger: trigger as HTMLElement,
            container: container as HTMLElement,
        };

        this.dropdowns.set(dropdownId, instance);

        // 컨테이너/트리거/메뉴에 data/id 설정
        (container as HTMLElement).dataset.dropdownId = dropdownId;

        const triggerEl = instance.trigger;
        const menuEl = instance.element;

        if (!triggerEl.id) triggerEl.id = `${dropdownId}-trigger`;
        if (!menuEl.id) menuEl.id = `${dropdownId}-menu`;

        triggerEl.setAttribute('aria-haspopup', 'true');
        triggerEl.setAttribute('aria-controls', menuEl.id);
        triggerEl.setAttribute('aria-expanded', 'false');

        menuEl.setAttribute('role', 'menu');
        menuEl.setAttribute('aria-labelledby', triggerEl.id);

        // 메뉴 아이템 이벤트
        this.bindDropdownItemEvents(menuEl, dropdownId);

        // 트리거 이벤트
        this.bindTriggerEvents(instance);

        // 초기 텍스트
        this.updateTriggerText(instance, options.placeholder || '선택하세요');

        return dropdownId;
    }

    private findDropdownContainer(trigger: HTMLElement): HTMLElement | null {
        let current = trigger.parentElement;
        let depth = 0;
        const maxDepth = 10;

        while (current && depth < maxDepth) {
            if (current.classList.contains('dewp-dropdown')) {
                // 해당 컨테이너가 메뉴를 포함하는지 확인
                const hasMenu = current.querySelector('.dewp-dropdown-menu');
                if (hasMenu) return current as HTMLElement;
            }
            current = current.parentElement;
            depth++;
        }
        return null;
    }

    private bindDropdownItemEvents(dropdown: HTMLElement, dropdownId: string): void {
        const items = dropdown.querySelectorAll('.dewp-dropdown-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const el = e.currentTarget as HTMLElement;
                const value = el.getAttribute('data-value') || el.textContent || '';
                const text = el.textContent || '';

                this.selectItem(dropdownId, value, text);

                const instance = this.dropdowns.get(dropdownId);
                if (!instance) return;

                if (instance.options.autoClose !== false) {
                    this.hide(dropdownId);
                }
            });
        });
    }

    private selectItem(dropdownId: string, value: string, text: string): void {
        const instance = this.dropdowns.get(dropdownId);
        if (!instance) return;

        instance.selectedValue = value;
        instance.selectedText = text;

        this.updateTriggerText(instance, text);

        if (instance.options.onSelect) {
            instance.options.onSelect(value, text);
        }
    }

    private updateTriggerText(instance: DropdownInstance, text: string): void {
        const trigger = instance.trigger;
        const textElement = trigger.querySelector('.dewp-dropdown-text');

        if (textElement) {
            textElement.textContent = text;
            return;
        }

        const existingText = Array.from(trigger.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
        );

        if (existingText) {
            existingText.textContent = text;
        } else {
            const textNode = document.createTextNode(text);
            trigger.insertBefore(textNode, trigger.firstChild);
        }
    }

    private bindTriggerEvents(instance: DropdownInstance): void {
        const { trigger, id } = instance;
        const dropdownId = id;

        // 중복 바인딩 방지
        trigger.removeEventListener('click', (trigger as any).__dewpHandler as any);
        const handler = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (this.activeDropdown && this.activeDropdown.id === dropdownId) {
                this.hide(dropdownId);
            } else {
                if (this.activeDropdown) this.hide(this.activeDropdown.id);
                this.show(dropdownId);
            }
        };
        (trigger as any).__dewpHandler = handler;
        trigger.addEventListener('click', handler);
    }

    show(id: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) {
            console.error('🔽 드롭다운 인스턴스를 찾을 수 없음:', id);
            return;
        }

        // 기존 활성 드롭다운 닫기
        if (this.activeDropdown && this.activeDropdown.id !== id) {
            this.hide(this.activeDropdown.id);
        }

        this.activeDropdown = instance;

        this.positionDropdown(instance);

        instance.element.classList.add('show');
        instance.trigger.setAttribute('aria-expanded', 'true');

        if (instance.options.onShow) instance.options.onShow();
    }

    hide(id: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) {
            console.error('🔽 드롭다운 인스턴스를 찾을 수 없음:', id);
            return;
        }

        instance.element.classList.remove('show');
        instance.trigger.setAttribute('aria-expanded', 'false');

        try { instance.trigger.focus(); } catch { }

        if (this.activeDropdown && this.activeDropdown.id === id) {
            this.activeDropdown = null;
        }

        if (instance.options.onHide) instance.options.onHide();
    }

    private positionDropdown(instance: DropdownInstance): void {
        const { element, trigger, options } = instance;
        const position = options.position || 'bottom';
        const align = options.align || 'start';
        const offset = options.offset ?? 8;

        const triggerRect = trigger.getBoundingClientRect();
        const containerRect = instance.container.getBoundingClientRect();
        const dropdownRect = element.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (position) {
            case 'bottom':
                top = triggerRect.bottom - containerRect.top + offset;
                break;
            case 'top':
                top = triggerRect.top - containerRect.top - dropdownRect.height - offset;
                break;
            case 'left':
                left = triggerRect.left - containerRect.left - dropdownRect.width - offset;
                top = triggerRect.top - containerRect.top + (triggerRect.height / 2) - (dropdownRect.height / 2);
                break;
            case 'right':
                left = triggerRect.right - containerRect.left + offset;
                top = triggerRect.top - containerRect.top + (triggerRect.height / 2) - (dropdownRect.height / 2);
                break;
        }

        switch (align) {
            case 'center':
                if (position === 'top' || position === 'bottom') {
                    left = triggerRect.left - containerRect.left + (triggerRect.width / 2) - (dropdownRect.width / 2);
                }
                break;
            case 'end':
                if (position === 'top' || position === 'bottom') {
                    left = triggerRect.right - containerRect.left - dropdownRect.width;
                }
                break;
            default: // 'start'
                if (position === 'top' || position === 'bottom') {
                    left = triggerRect.left - containerRect.left;
                }
                break;
        }

        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
        element.style.zIndex = `${this.zIndex++}`;
    }

    toggle(id: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) {
            console.error('🔽 드롭다운 인스턴스를 찾을 수 없음:', id);
            return;
        }
        if (this.activeDropdown && this.activeDropdown.id === id) {
            this.hide(id);
        } else {
            this.show(id);
        }
    }

    getSelectedValue(id: string): string | undefined {
        return this.dropdowns.get(id)?.selectedValue;
    }

    getSelectedText(id: string): string | undefined {
        return this.dropdowns.get(id)?.selectedText;
    }

    setValue(id: string, value: string, text: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) return;
        this.selectItem(id, value, text);
    }

    getDropdown(id: string): HTMLElement | undefined {
        return this.dropdowns.get(id)?.element;
    }

    isOpen(id: string): boolean {
        const instance = this.dropdowns.get(id);
        return instance ? instance.element.classList.contains('show') : false;
    }

    closeAll(): void {
        this.dropdowns.forEach((_, id) => this.hide(id));
    }

    destroy(id: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) return;

        this.hide(id);
        // 기존 마크업을 재사용하는 구조이므로, DOM 제거는 하지 않음
        // 만약 메뉴 DOM을 동적으로 생성했다면 여기서 제거했겠지만,
        // 현재 구조에서는 이벤트만 정리합니다.
        const trigger = instance.trigger as any;
        if (trigger.__dewpHandler) {
            trigger.removeEventListener('click', trigger.__dewpHandler);
            delete trigger.__dewpHandler;
        }
        delete (instance.container as any).dataset.dropdownId;

        this.dropdowns.delete(id);
    }

    // 자동 감지 및 초기화 (중복 초기화 가드 포함)
    autoInitialize(): void {
        const dropdownContainers = document.querySelectorAll<HTMLElement>('.dewp-dropdown');

        dropdownContainers.forEach((container) => {
            // 이미 초기화된 경우 skip
            const hasId = container.dataset.dropdownId;
            if (hasId && this.dropdowns.has(hasId)) return;

            const trigger = container.querySelector<HTMLElement>('.dewp-dropdown-toggle');
            const menu = container.querySelector<HTMLElement>('.dewp-dropdown-menu');

            if (!trigger || !menu) {
                console.warn('⚠️ 드롭다운 구조 불완전:', { container });
                return;
            }

            try {
                const dropdownId = this.create({
                    trigger,
                    content: '', // 구조상 미사용
                    position: 'bottom',
                    align: 'start',
                    autoClose: true,
                    placeholder: (trigger.querySelector('.dewp-dropdown-text')?.textContent || '선택하세요').trim(),
                    onSelect: (value, text) => {
                        const textElement = container.querySelector('.dewp-dropdown-text');
                        if (textElement) textElement.textContent = text;
                        // 필요 시 value도 어디엔가 반영
                        container.setAttribute('data-selected-value', value);
                    }
                });

                // 메뉴에도 속성 남겨 디버깅 편의
                menu.setAttribute('data-dropdown-id', dropdownId);
            } catch (e) {
                console.error('❌ 드롭다운 자동 초기화 실패:', e);
            }
        });
    }
}

// 싱글톤 인스턴스
const dewpDropdown = new DEWPDropdown();

// 전역 export
export const createDropdown = (options: DropdownOptions): string => dewpDropdown.create(options);
export const showDropdown = (id: string): void => { dewpDropdown.show(id); };
export const hideDropdown = (id: string): void => { dewpDropdown.hide(id); };
export const toggleDropdown = (id: string): void => { dewpDropdown.toggle(id); };
export const closeAllDropdowns = (): void => { dewpDropdown.closeAll(); };
export const getSelectedValue = (id: string): string | undefined => dewpDropdown.getSelectedValue(id);
export const getSelectedText = (id: string): string | undefined => dewpDropdown.getSelectedText(id);
export const setDropdownValue = (id: string, value: string, text: string): void => { dewpDropdown.setValue(id, value, text); };
export const autoInitializeDropdowns = (): void => { dewpDropdown.autoInitialize(); };

export default dewpDropdown;
