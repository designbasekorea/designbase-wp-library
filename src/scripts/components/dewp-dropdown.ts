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
            throw new Error('드롭다운 컨테이너를 찾을 수 없습니다. .dewp-dropdown 클래스가 있는 부모 요소가 필요합니다.');
        }
        console.log('🔽 컨테이너 찾음:', container);

        // 기존 메뉴 요소 찾기 (새로 생성하지 않음)
        const existingMenu = container.querySelector('.dewp-dropdown-menu');
        if (!existingMenu) {
            console.error('🔽 기존 드롭다운 메뉴를 찾을 수 없음');
            throw new Error('기존 드롭다운 메뉴를 찾을 수 없습니다.');
        }
        console.log('🔽 기존 메뉴 요소 찾음:', {
            menu: existingMenu,
            menuClasses: existingMenu.className,
            container: container,
            containerId: container.id,
            trigger: trigger,
            triggerClasses: trigger.className
        });

        // 드롭다운 인스턴스 생성 (기존 메뉴 사용)
        const instance: DropdownInstance = {
            id: dropdownId,
            element: existingMenu as HTMLElement, // 기존 메뉴 사용
            options: options,
            trigger: trigger as HTMLElement,
            container: container
        };

        this.dropdowns.set(dropdownId, instance);
        console.log('🔽 드롭다운 인스턴스 저장됨:', dropdownId);
        console.log('🔽 현재 등록된 드롭다운 수:', this.dropdowns.size);

        // 기존 메뉴에 이벤트 바인딩
        this.bindDropdownItemEvents(existingMenu as HTMLElement, dropdownId);
        console.log('🔽 기존 메뉴에 이벤트 바인딩 완료');

        // 트리거 요소에 데이터 속성 추가 (디버깅용)
        trigger.setAttribute('data-dropdown-id', dropdownId);
        console.log('🔽 트리거에 드롭다운 ID 설정:', dropdownId);

        // 트리거 요소에 이벤트 바인딩
        this.bindTriggerEvents(instance);
        console.log('🔽 트리거 이벤트 바인딩 완료');
        console.log('🔽 트리거 요소:', trigger);

        // 초기 텍스트 설정
        this.updateTriggerText(instance, options.placeholder || '선택하세요');
        console.log('🔽 초기 텍스트 설정 완료');

        console.log('🔽 드롭다운 생성 완료:', dropdownId);
        return dropdownId;
    }

    private findDropdownContainer(trigger: HTMLElement): HTMLElement | null {
        console.log('🔽 드롭다운 컨테이너 찾기 시작');
        console.log('🔽 트리거 요소:', trigger);
        console.log('🔽 트리거 클래스:', trigger.className);
        console.log('🔽 트리거 부모:', trigger.parentElement?.tagName, trigger.parentElement?.className, trigger.parentElement?.id);

        let current = trigger.parentElement;
        let depth = 0;
        const maxDepth = 10;

        while (current && depth < maxDepth) {
            console.log(`🔽 부모 ${depth} 검사:`, {
                tagName: current.tagName,
                className: current.className,
                id: current.id,
                isDropdown: current.classList.contains('dewp-dropdown')
            });

            if (current.classList.contains('dewp-dropdown')) {
                // 컨테이너에 메뉴가 있는지 확인
                const hasMenu = current.querySelector('.dewp-dropdown-menu');
                console.log('🔽 컨테이너 후보 발견:', {
                    container: current,
                    containerClasses: current.className,
                    containerId: current.id,
                    hasMenu: !!hasMenu,
                    menuElement: hasMenu
                });

                if (hasMenu) {
                    console.log('✅ 유효한 컨테이너 찾음:', current);
                    return current;
                } else {
                    console.log('⚠️ 컨테이너에 메뉴가 없음, 계속 검색');
                }
            }

            current = current.parentElement;
            depth++;
        }

        console.log('❌ 드롭다운 컨테이너를 찾을 수 없음');
        console.log('🔽 부모 체인:', this.getParentChain(trigger));
        return null;
    }

    private getParentChain(element: HTMLElement): string[] {
        const chain: string[] = [];
        let current = element.parentElement;
        while (current) {
            chain.push(`${current.tagName.toLowerCase()}.${current.className.replace(/\s+/g, '.')}`);
            current = current.parentElement;
        }
        return chain;
    }



    private bindDropdownItemEvents(dropdown: HTMLElement, dropdownId: string): void {
        const items = dropdown.querySelectorAll('.dewp-dropdown-item');
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
        const textElement = trigger.querySelector('.dewp-dropdown-text');

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
        console.log('🔽 트리거 이벤트 바인딩 시작:', id);
        console.log('🔽 트리거 요소:', trigger);
        console.log('🔽 트리거 클래스:', trigger.className);

        // 클로저를 사용해서 정확한 인스턴스 ID 참조
        const dropdownId = id;

        trigger.addEventListener('click', (e) => {
            console.log('🔽 트리거 클릭 이벤트 발생:', dropdownId);
            console.log('🔽 클릭된 요소:', e.target);
            console.log('🔽 현재 활성 드롭다운:', this.activeDropdown?.id);
            console.log('🔽 이 트리거가 연결된 드롭다운 ID:', dropdownId);
            console.log('🔽 트리거의 data-dropdown-id:', trigger.getAttribute('data-dropdown-id'));

            e.preventDefault();
            e.stopPropagation();

            // 현재 드롭다운이 열려있으면 닫기
            if (this.activeDropdown && this.activeDropdown.id === dropdownId) {
                console.log('🔽 현재 열린 드롭다운 닫기:', dropdownId);
                this.hide(dropdownId);
            } else {
                // 다른 드롭다운이 열려있으면 닫고 새로 열기
                if (this.activeDropdown) {
                    console.log('🔽 다른 드롭다운 닫기:', this.activeDropdown.id);
                    this.hide(this.activeDropdown.id);
                }
                console.log('🔽 새 드롭다운 열기:', dropdownId);
                this.show(dropdownId);
            }
        });

        console.log('🔽 트리거 이벤트 바인딩 완료:', dropdownId);
    }

    show(id: string): void {
        console.log('🔽 드롭다운 show 호출:', id);

        const instance = this.dropdowns.get(id);
        if (!instance) {
            console.error('🔽 드롭다운 인스턴스를 찾을 수 없음:', id);
            return;
        }

        // 기존 활성 드롭다운 닫기
        if (this.activeDropdown && this.activeDropdown.id !== id) {
            console.log('🔽 기존 활성 드롭다운 닫기:', this.activeDropdown.id);
            this.hide(this.activeDropdown.id);
        }

        this.activeDropdown = instance;
        console.log('🔽 활성 드롭다운 설정:', id);

        // 위치 계산 및 설정
        this.positionDropdown(instance);

        // 표시
        instance.element.classList.add('show');
        console.log('🔽 드롭다운 표시됨:', id);

        // 이벤트 콜백
        if (instance.options.onShow) {
            instance.options.onShow();
        }
    }

    hide(id: string): void {
        console.log('🔽 드롭다운 hide 호출:', id);

        const instance = this.dropdowns.get(id);
        if (!instance) {
            console.error('🔽 드롭다운 인스턴스를 찾을 수 없음:', id);
            return;
        }

        instance.element.classList.remove('show');
        console.log('🔽 드롭다운 숨김됨:', id);

        if (this.activeDropdown && this.activeDropdown.id === id) {
            this.activeDropdown = null;
            console.log('🔽 활성 드롭다운 해제:', id);
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

        console.log('🔽 드롭다운 위치 계산 시작:', instance.id);
        console.log('🔽 위치 설정:', position, align, offset);

        const triggerRect = trigger.getBoundingClientRect();
        const containerRect = instance.container.getBoundingClientRect();
        const dropdownRect = element.getBoundingClientRect();

        console.log('🔽 트리거 위치:', triggerRect);
        console.log('🔽 컨테이너 위치:', containerRect);
        console.log('🔽 드롭다운 크기:', dropdownRect);

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

        console.log('🔽 계산된 위치:', { top, left });

        // 위치 설정
        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
        element.style.zIndex = `${this.zIndex++}`;

        console.log('🔽 드롭다운 위치 설정 완료:', { top, left, zIndex: this.zIndex - 1 });
    }

    // 편의 메서드들
    toggle(id: string): void {
        console.log('🔽 드롭다운 toggle 호출:', id);

        const instance = this.dropdowns.get(id);
        if (!instance) {
            console.error('🔽 드롭다운 인스턴스를 찾을 수 없음:', id);
            return;
        }

        if (this.activeDropdown && this.activeDropdown.id === id) {
            console.log('🔽 드롭다운이 열려있음, 닫기:', id);
            this.hide(id);
        } else {
            console.log('🔽 드롭다운이 닫혀있음, 열기:', id);
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

    // 자동 감지 및 초기화
    autoInitialize(): void {
        console.log('🔽 자동 드롭다운 초기화 시작');

        // 모든 .dewp-dropdown 요소 찾기
        const dropdownContainers = document.querySelectorAll('.dewp-dropdown');
        console.log(`📋 찾은 드롭다운 컨테이너: ${dropdownContainers.length}개`);

        dropdownContainers.forEach((container, index) => {
            console.log(`\n🔍 드롭다운 ${index + 1} 분석 시작:`, {
                container: container,
                containerId: container.id,
                containerClasses: container.className
            });

            // 각 컨테이너 내에서만 요소 찾기 (독립성 보장)
            const trigger = container.querySelector('.dewp-dropdown-toggle');
            const menu = container.querySelector('.dewp-dropdown-menu');

            console.log(`🔍 드롭다운 ${index + 1} 요소 검색 결과:`, {
                hasTrigger: !!trigger,
                hasMenu: !!menu,
                trigger: trigger,
                triggerClasses: trigger?.className,
                menu: menu,
                menuClasses: menu?.className
            });

            if (trigger && menu) {
                console.log(`✅ 드롭다운 ${index + 1} 구조 완성, 초기화 시작:`, {
                    container: container,
                    containerId: container.id,
                    containerClasses: container.className,
                    trigger: trigger,
                    triggerClasses: trigger.className,
                    menu: menu,
                    menuClasses: menu.className
                });

                try {
                    const dropdownId = this.create({
                        trigger: trigger as HTMLElement,
                        content: '', // content는 더 이상 사용하지 않음
                        position: 'bottom',
                        align: 'start',
                        autoClose: true,
                        placeholder: '선택하세요',
                        onSelect: (value, text) => {
                            console.log(`🔽 드롭다운 ${dropdownId} 선택됨: ${value} - ${text}`);
                            // 선택된 텍스트를 토글 버튼에 표시
                            const textElement = container.querySelector('.dewp-dropdown-text');
                            if (textElement) {
                                textElement.textContent = text;
                            }
                        }
                    });
                    console.log(`🎉 드롭다운 자동 초기화 완료: ${dropdownId} (컨테이너: ${index + 1}, ID: ${container.id})`);
                } catch (error) {
                    console.error(`❌ 드롭다운 자동 초기화 실패 (${index + 1}):`, error);
                }
            } else {
                console.warn(`⚠️ 드롭다운 ${index + 1} 구조 불완전:`, {
                    hasTrigger: !!trigger,
                    hasMenu: !!menu,
                    container: container,
                    containerId: container.id
                });
            }
        });
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

export const autoInitializeDropdowns = (): void => {
    return dewpDropdown.autoInitialize();
};

// 기본 export
export default dewpDropdown;

