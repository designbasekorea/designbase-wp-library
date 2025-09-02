/**
 * DEWP 드롭다운 시스템
 * 어드민과 프론트엔드에서 공통 사용
 */

interface DropdownOptions {
    trigger: string | HTMLElement;
    content: string | HTMLElement;
    position?: 'bottom' | 'top' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    offset?: number;
    autoClose?: boolean;
    placeholder?: string; // 기본 표시 텍스트
    onShow?: () => void;
    onHide?: () => void;
    onSelect?: (value: string, text: string) => void; // 선택 콜백 추가
}

interface DropdownInstance {
    id: string;
    element: HTMLElement;
    options: DropdownOptions;
    trigger: HTMLElement;
    container: HTMLElement;
    selectedValue?: string; // 선택된 값 저장
    selectedText?: string;  // 선택된 텍스트 저장
}

class DEWPDropdown {
    private dropdowns: Map<string, DropdownInstance> = new Map();
    private activeDropdown: DropdownInstance | null = null;
    private zIndex: number = 1000;

    constructor() {
        this.init();
    }

    private init(): void {
        this.bindGlobalEvents();
    }

    private bindGlobalEvents(): void {
        // 외부 클릭으로 드롭다운 닫기
        document.addEventListener('click', (e) => {
            if (this.activeDropdown) {
                const target = e.target as HTMLElement;
                const isTrigger = this.activeDropdown.trigger.contains(target);
                const isDropdown = this.activeDropdown.element.contains(target);

                // 트리거나 드롭다운 내부가 아닌 곳을 클릭했을 때만 닫기
                if (!isTrigger && !isDropdown) {
                    this.hide(this.activeDropdown.id);
                }
            }
        });

        // ESC 키로 드롭다운 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeDropdown) {
                this.hide(this.activeDropdown.id);
            }
        });

        // 윈도우 리사이즈 시 드롭다운 위치 재조정
        window.addEventListener('resize', () => {
            if (this.activeDropdown) {
                this.positionDropdown(this.activeDropdown);
            }
        });

        // 스크롤 시 드롭다운 위치 재조정
        window.addEventListener('scroll', () => {
            if (this.activeDropdown) {
                this.positionDropdown(this.activeDropdown);
            }
        }, true);
    }

    create(options: DropdownOptions): string {
        const dropdownId = 'dewp-dropdown-' + Date.now();
        console.log('🔽 드롭다운 생성 시작:', dropdownId);

        // 트리거 요소 찾기
        const trigger = typeof options.trigger === 'string'
            ? document.querySelector(options.trigger)
            : options.trigger;

        if (!trigger) {
            console.error('🔽 드롭다운 트리거 요소를 찾을 수 없음:', options.trigger);
            throw new Error('드롭다운 트리거 요소를 찾을 수 없습니다.');
        }
        console.log('🔽 트리거 요소 찾음:', trigger);

        // 드롭다운을 넣을 컨테이너 찾기 (부모 요소)
        const container = this.findDropdownContainer(trigger as HTMLElement);
        if (!container) {
            console.error('🔽 드롭다운 컨테이너를 찾을 수 없음');
            throw new Error('드롭다운 컨테이너를 찾을 수 없습니다. .dropdown 클래스가 있는 부모 요소가 필요합니다.');
        }
        console.log('🔽 컨테이너 찾음:', container);

        // 드롭다운 요소 생성
        const dropdown = this.createDropdownElement(dropdownId, options);
        console.log('🔽 드롭다운 요소 생성됨:', dropdown);

        // 드롭다운 인스턴스 생성
        const instance: DropdownInstance = {
            id: dropdownId,
            element: dropdown,
            options: options,
            trigger: trigger as HTMLElement,
            container: container
        };

        this.dropdowns.set(dropdownId, instance);
        console.log('🔽 드롭다운 인스턴스 저장됨:', dropdownId);

        // 컨테이너에 드롭다운 추가
        container.appendChild(dropdown);
        console.log('🔽 컨테이너에 드롭다운 추가됨');

        // 트리거 요소에 이벤트 바인딩
        this.bindTriggerEvents(instance);
        console.log('🔽 트리거 이벤트 바인딩 완료');

        // 초기 텍스트 설정
        this.updateTriggerText(instance, options.placeholder || '선택하세요');
        console.log('🔽 초기 텍스트 설정 완료');

        console.log('🔽 드롭다운 생성 완료:', dropdownId);
        return dropdownId;
    }

    private findDropdownContainer(trigger: HTMLElement): HTMLElement | null {
        // 트리거 요소에서 시작해서 .dropdown 클래스를 가진 부모 요소 찾기
        let current = trigger.parentElement;
        while (current) {
            if (current.classList.contains('dropdown')) {
                return current;
            }
            current = current.parentElement;
        }
        return null;
    }

    private createDropdownElement(id: string, options: DropdownOptions): HTMLElement {
        const dropdown = document.createElement('div');
        dropdown.id = id;
        dropdown.className = 'dropdown-menu';

        // 컨텐츠 추가
        if (typeof options.content === 'string') {
            dropdown.innerHTML = options.content;
        } else {
            dropdown.appendChild(options.content);
        }

        // 드롭다운 아이템에 클릭 이벤트 추가
        this.bindDropdownItemEvents(dropdown, id);

        return dropdown;
    }

    private bindDropdownItemEvents(dropdown: HTMLElement, dropdownId: string): void {
        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const value = item.getAttribute('data-value') || item.textContent || '';
                const text = item.textContent || '';

                // 선택된 값 저장
                this.selectItem(dropdownId, value, text);

                // 드롭다운 닫기
                this.hide(dropdownId);
            });
        });
    }

    private selectItem(dropdownId: string, value: string, text: string): void {
        const instance = this.dropdowns.get(dropdownId);
        if (!instance) return;

        // 선택된 값 저장
        instance.selectedValue = value;
        instance.selectedText = text;

        // 트리거 버튼 텍스트 업데이트
        this.updateTriggerText(instance, text);

        // 선택 콜백 호출
        if (instance.options.onSelect) {
            instance.options.onSelect(value, text);
        }
    }

    private updateTriggerText(instance: DropdownInstance, text: string): void {
        const trigger = instance.trigger;
        const textElement = trigger.querySelector('.dropdown-text');

        if (textElement) {
            textElement.textContent = text;
        } else {
            // 텍스트 요소가 없으면 기존 텍스트를 교체
            const existingText = Array.from(trigger.childNodes).find(node =>
                node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
            );

            if (existingText) {
                existingText.textContent = text;
            } else {
                // 텍스트 노드가 없으면 새로 생성
                const textNode = document.createTextNode(text);
                trigger.insertBefore(textNode, trigger.firstChild);
            }
        }
    }

    private bindTriggerEvents(instance: DropdownInstance): void {
        const { trigger, id } = instance;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // 현재 드롭다운이 열려있으면 닫기
            if (this.activeDropdown && this.activeDropdown.id === id) {
                this.hide(id);
            } else {
                // 다른 드롭다운이 열려있으면 닫고 새로 열기
                if (this.activeDropdown) {
                    this.hide(this.activeDropdown.id);
                }
                this.show(id);
            }
        });
    }

    show(id: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) return;

        // 기존 활성 드롭다운 닫기
        if (this.activeDropdown && this.activeDropdown.id !== id) {
            this.hide(this.activeDropdown.id);
        }

        this.activeDropdown = instance;

        // 위치 계산 및 설정
        this.positionDropdown(instance);

        // 표시
        instance.element.classList.add('show');

        // 이벤트 콜백
        if (instance.options.onShow) {
            instance.options.onShow();
        }
    }

    hide(id: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) return;

        instance.element.classList.remove('show');

        if (this.activeDropdown && this.activeDropdown.id === id) {
            this.activeDropdown = null;
        }

        // 이벤트 콜백
        if (instance.options.onHide) {
            instance.options.onHide();
        }
    }

    private positionDropdown(instance: DropdownInstance): void {
        const { element, trigger, options } = instance;
        const position = options.position || 'bottom';
        const align = options.align || 'start';
        const offset = options.offset || 8;

        const triggerRect = trigger.getBoundingClientRect();
        const containerRect = instance.container.getBoundingClientRect();
        const dropdownRect = element.getBoundingClientRect();

        let top = 0;
        let left = 0;

        // 컨테이너 기준으로 상대 위치 계산
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

        // 정렬 조정
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

        // 위치 설정
        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
        element.style.zIndex = `${this.zIndex++}`;
    }

    // 편의 메서드들
    toggle(id: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) return;

        if (this.activeDropdown && this.activeDropdown.id === id) {
            this.hide(id);
        } else {
            this.show(id);
        }
    }

    // 선택된 값 가져오기
    getSelectedValue(id: string): string | undefined {
        const instance = this.dropdowns.get(id);
        return instance?.selectedValue;
    }

    getSelectedText(id: string): string | undefined {
        const instance = this.dropdowns.get(id);
        return instance?.selectedText;
    }

    // 값 설정
    setValue(id: string, value: string, text: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) return;

        this.selectItem(id, value, text);
    }

    // 유틸리티 메서드들
    getDropdown(id: string): HTMLElement | undefined {
        return this.dropdowns.get(id)?.element;
    }

    isOpen(id: string): boolean {
        const instance = this.dropdowns.get(id);
        return instance ? instance.element.classList.contains('show') : false;
    }

    closeAll(): void {
        this.dropdowns.forEach((instance, id) => {
            this.hide(id);
        });
    }

    destroy(id: string): void {
        const instance = this.dropdowns.get(id);
        if (!instance) return;

        this.hide(id);
        if (instance.element.parentNode) {
            instance.element.parentNode.removeChild(instance.element);
        }
        this.dropdowns.delete(id);
    }
}

// 싱글톤 인스턴스 생성
const dewpDropdown = new DEWPDropdown();

// 전역 함수들 export
export const createDropdown = (options: DropdownOptions): string => {
    return dewpDropdown.create(options);
};

export const showDropdown = (id: string): void => {
    dewpDropdown.show(id);
};

export const hideDropdown = (id: string): void => {
    dewpDropdown.hide(id);
};

export const toggleDropdown = (id: string): void => {
    dewpDropdown.toggle(id);
};

export const closeAllDropdowns = (): void => {
    dewpDropdown.closeAll();
};

export const getSelectedValue = (id: string): string | undefined => {
    return dewpDropdown.getSelectedValue(id);
};

export const getSelectedText = (id: string): string | undefined => {
    return dewpDropdown.getSelectedText(id);
};

export const setDropdownValue = (id: string, value: string, text: string): void => {
    return dewpDropdown.setValue(id, value, text);
};

// 기본 export
export default dewpDropdown;

