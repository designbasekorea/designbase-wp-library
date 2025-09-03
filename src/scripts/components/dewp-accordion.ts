/**
 * DEWP 아코디언 시스템
 * 접을 수 있는 콘텐츠 섹션을 제공하는 컴포넌트
 */

interface AccordionOptions {
    container?: string | HTMLElement;
    items?: string[];
    activeItem?: string;
    onItemToggle?: (itemId: string, isOpen: boolean) => void;
    animation?: boolean;
    multiple?: boolean;
    autoClose?: boolean;
}

interface AccordionInstance {
    id: string;
    container: HTMLElement;
    options: AccordionOptions;
    items: Map<string, HTMLElement>;
    headers: Map<string, HTMLElement>;
    contents: Map<string, HTMLElement>;
    activeItems: Set<string>;
}

class DEWPAccordion {
    private accordionInstances: Map<string, AccordionInstance> = new Map();

    constructor() {
        this.autoInit();
    }

    private autoInit(): void {
        // 페이지 로드 시 자동으로 아코디언 초기화
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // DOM이 완전히 로드된 후 약간의 지연을 두고 초기화
                setTimeout(() => this.autoInitAccordions(), 100);
            });
        } else {
            // 이미 로드된 경우에도 약간의 지연을 두고 초기화
            setTimeout(() => this.autoInitAccordions(), 100);
        }
    }

    private autoInitAccordions(): void {
        // data-accordion 속성이 있는 컨테이너들을 자동으로 초기화
        const containers = document.querySelectorAll('[data-accordion]');

        containers.forEach((container) => {
            try {
                const containerId = container.getAttribute('data-accordion') || container.id || 'accordion-' + Date.now();
                this.initAccordion(container as HTMLElement, {});
            } catch (error) {
                // 아코디언 자동 초기화 실패 시 조용히 처리
            }
        });
    }

    initAccordion(container: HTMLElement, options: AccordionOptions): string {
        // data-accordion 속성 값을 우선으로 사용, 없으면 id, 마지막으로 타임스탬프
        const containerId = container.getAttribute('data-accordion') || container.id || 'accordion-' + Date.now();

        // 이미 초기화된 컨테이너인지 확인
        if (container.hasAttribute('data-accordion-initialized')) {
            return containerId;
        }

        // 기존 인스턴스가 있으면 제거
        if (this.accordionInstances.has(containerId)) {
            this.destroy(containerId);
        }

        // 아코디언 아이템들 찾기
        const items = this.findAccordionItems(container);
        const headers = this.findAccordionHeaders(container);
        const contents = this.findAccordionContents(container);

        if (items.size === 0) {
            throw new Error('아코디언 아이템을 찾을 수 없습니다.');
        }

        // 아코디언 인스턴스 생성
        const instance: AccordionInstance = {
            id: containerId,
            container,
            options: { ...this.getDefaultOptions(), ...options },
            items,
            headers,
            contents,
            activeItems: new Set()
        };

        this.accordionInstances.set(containerId, instance);

        // 이벤트 바인딩
        this.bindAccordionEvents(instance);

        // 모든 아코디언을 닫힌 상태로 초기화
        items.forEach((item, itemId) => {
            const header = headers.get(itemId);
            const content = contents.get(itemId);
            if (header && content) {
                // CSS 클래스 제거
                item.classList.remove('active');
                header.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');

                // 콘텐츠 숨기기
                content.style.display = 'none';
                content.style.height = '';
                content.style.opacity = '';
                content.style.transform = '';
                content.style.transition = '';
                content.style.overflow = '';
            }
        });

        // 기본 활성 아이템 설정
        if (options.activeItem && items.has(options.activeItem)) {
            this.toggleItem(containerId, options.activeItem, true);
        }

        // 초기화 완료 플래그 설정
        container.setAttribute('data-accordion-initialized', 'true');

        return containerId;
    }

    private getDefaultOptions(): Partial<AccordionOptions> {
        return {
            animation: true,
            multiple: false,
            autoClose: true
        };
    }

    private findAccordionItems(container: HTMLElement): Map<string, HTMLElement> {
        const items = new Map<string, HTMLElement>();

        // data-accordion-item 속성이 있는 요소들 찾기
        const accordionItems = container.querySelectorAll('[data-accordion-item]');
        accordionItems.forEach(item => {
            const itemId = item.getAttribute('data-accordion-item');
            if (itemId) {
                items.set(itemId, item as HTMLElement);
            }
        });

        // .dewp-accordion-item 클래스가 있는 요소들 찾기
        if (items.size === 0) {
            const accordionItems = container.querySelectorAll('.dewp-accordion-item');
            accordionItems.forEach((item, index) => {
                const itemId = item.id || `accordion-item-${index}`;
                items.set(itemId, item as HTMLElement);
            });
        }

        return items;
    }

    private findAccordionHeaders(container: HTMLElement): Map<string, HTMLElement> {
        const headers = new Map<string, HTMLElement>();

        // data-accordion-header 속성이 있는 요소들 찾기
        const accordionHeaders = container.querySelectorAll('[data-accordion-header]');
        accordionHeaders.forEach(header => {
            const itemId = this.findParentItemId(header);
            if (itemId) {
                headers.set(itemId, header as HTMLElement);
            }
        });

        // .dewp-accordion-header 클래스가 있는 요소들 찾기
        if (headers.size === 0) {
            const accordionHeaders = container.querySelectorAll('.dewp-accordion-header');
            accordionHeaders.forEach(header => {
                const itemId = this.findParentItemId(header);
                if (itemId) {
                    headers.set(itemId, header as HTMLElement);
                }
            });
        }

        return headers;
    }

    private findAccordionContents(container: HTMLElement): Map<string, HTMLElement> {
        const contents = new Map<string, HTMLElement>();

        // data-accordion-content 속성이 있는 요소들 찾기
        const accordionContents = container.querySelectorAll('[data-accordion-content]');
        accordionContents.forEach(content => {
            const itemId = this.findParentItemId(content);
            if (itemId) {
                contents.set(itemId, content as HTMLElement);
            }
        });

        // .dewp-accordion-content 클래스가 있는 요소들 찾기
        if (contents.size === 0) {
            const accordionContents = container.querySelectorAll('.dewp-accordion-content');
            accordionContents.forEach(content => {
                const itemId = this.findParentItemId(content);
                if (itemId) {
                    contents.set(itemId, content as HTMLElement);
                }
            });
        }

        return contents;
    }

    private findParentItemId(element: Element): string | null {
        let parent = element.parentElement;
        while (parent) {
            if (parent.hasAttribute('data-accordion-item') || parent.classList.contains('dewp-accordion-item')) {
                return parent.getAttribute('data-accordion-item') || parent.id || null;
            }
            parent = parent.parentElement;
        }
        return null;
    }

    private bindAccordionEvents(instance: AccordionInstance): void {
        const { headers, container } = instance;

        headers.forEach((header, itemId) => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // 이벤트 버블링 방지
                this.toggleItem(instance.id, itemId);
            });

            // 키보드 접근성
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation(); // 이벤트 버블링 방지
                    this.toggleItem(instance.id, itemId);
                }
            });

            // 포커스 관리
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            header.setAttribute('aria-controls', `accordion-content-${itemId}`);
        });

        // 콘텐츠 접근성 설정
        instance.contents.forEach((content, itemId) => {
            content.setAttribute('id', `accordion-content-${itemId}`);
            content.setAttribute('role', 'region');
            content.setAttribute('aria-labelledby', `accordion-header-${itemId}`);
        });
    }

    toggleItem(containerId: string, itemId: string, forceOpen?: boolean): void {
        const instance = this.accordionInstances.get(containerId);
        if (!instance) {
            return;
        }

        const { items, headers, contents, options } = instance;
        const item = items.get(itemId);
        const header = headers.get(itemId);
        const content = contents.get(itemId);

        if (!item || !header || !content) {
            return;
        }

        const isCurrentlyOpen = instance.activeItems.has(itemId);
        const shouldOpen = forceOpen !== undefined ? forceOpen : !isCurrentlyOpen;

        if (shouldOpen) {
            // 아이템 열기
            this.openItemInternal(instance, itemId, item, header, content);
        } else {
            // 아이템 닫기
            this.closeItemInternal(instance, itemId, item, header, content);
        }

        // 콜백 실행
        if (options.onItemToggle) {
            options.onItemToggle(itemId, shouldOpen);
        }
    }

    private openItemInternal(instance: AccordionInstance, itemId: string, item: HTMLElement, header: HTMLElement, content: HTMLElement): void {
        const { options, activeItems } = instance;

        // 다중 선택이 아닌 경우 다른 아이템들 닫기
        if (!options.multiple && options.autoClose) {
            activeItems.forEach(activeId => {
                if (activeId !== itemId) {
                    this.closeItemInternal(instance, activeId, instance.items.get(activeId)!, instance.headers.get(activeId)!, instance.contents.get(activeId)!);
                }
            });
        }

        // 아이템 열기
        activeItems.add(itemId);
        item.classList.add('active');
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');

        if (options.animation) {
            this.animateContent(content, true);
        } else {
            content.style.display = 'block';
        }
    }

    private closeItemInternal(instance: AccordionInstance, itemId: string, item: HTMLElement, header: HTMLElement, content: HTMLElement): void {
        const { options, activeItems } = instance;

        // 아이템 닫기
        activeItems.delete(itemId);
        item.classList.remove('active');
        header.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');

        if (options.animation) {
            this.animateContent(content, false);
        } else {
            content.style.display = 'none';
        }
    }

    private animateContent(content: HTMLElement, isOpen: boolean): void {
        if (isOpen) {
            // 열기 애니메이션
            content.style.display = 'block';
            content.style.overflow = 'hidden';
            content.style.height = '0px';
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';

            // 강제 리플로우
            content.offsetHeight;

            // 부드러운 애니메이션 적용
            content.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            content.style.height = content.scrollHeight + 'px';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';

            // 애니메이션 완료 후 스타일 정리
            setTimeout(() => {
                content.style.height = '';
                content.style.overflow = '';
                content.style.transition = '';
                content.style.opacity = '';
                content.style.transform = '';
            }, 400);
        } else {
            // 닫기 애니메이션
            content.style.overflow = 'hidden';
            content.style.height = content.scrollHeight + 'px';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';

            // 강제 리플로우
            content.offsetHeight;

            // 부드러운 애니메이션 적용
            content.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            content.style.height = '0px';
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';

            // 애니메이션 완료 후 숨김
            setTimeout(() => {
                content.style.display = 'none';
                content.style.height = '';
                content.style.overflow = '';
                content.style.transition = '';
                content.style.opacity = '';
                content.style.transform = '';
            }, 400);
        }
    }

    public openItem(containerId: string, itemId: string): void {
        this.toggleItem(containerId, itemId, true);
    }

    public closeItem(containerId: string, itemId: string): void {
        this.toggleItem(containerId, itemId, false);
    }

    openAllItems(containerId: string): void {
        const instance = this.accordionInstances.get(containerId);
        if (!instance) return;

        instance.items.forEach((item, itemId) => {
            this.openItem(containerId, itemId);
        });
    }

    closeAllItems(containerId: string): void {
        const instance = this.accordionInstances.get(containerId);
        if (!instance) return;

        instance.items.forEach((item, itemId) => {
            this.closeItem(containerId, itemId);
        });
    }

    getActiveItems(containerId: string): string[] {
        const instance = this.accordionInstances.get(containerId);
        return instance ? Array.from(instance.activeItems) : [];
    }

    isItemOpen(containerId: string, itemId: string): boolean {
        const instance = this.accordionInstances.get(containerId);
        return instance ? instance.activeItems.has(itemId) : false;
    }

    getAccordionInstance(containerId: string): AccordionInstance | null {
        return this.accordionInstances.get(containerId) || null;
    }

    destroy(containerId: string): void {
        const instance = this.accordionInstances.get(containerId);
        if (!instance) {
            return;
        }

        // 이벤트 리스너 제거
        instance.headers.forEach(header => {
            header.removeEventListener('click', () => { });
            header.removeEventListener('keydown', () => { });
        });

        // 인스턴스 제거
        this.accordionInstances.delete(containerId);
    }

    destroyAll(): void {
        this.accordionInstances.forEach((instance, containerId) => {
            this.destroy(containerId);
        });
    }
}

// 싱글톤 인스턴스 생성
const accordionInstance = new DEWPAccordion();

// 공개 API
export const initAccordion = (container: HTMLElement, options: AccordionOptions): string => {
    return accordionInstance.initAccordion(container, options);
};

export const toggleAccordionItem = (containerId: string, itemId: string, forceOpen?: boolean): void => {
    accordionInstance.toggleItem(containerId, itemId, forceOpen);
};

export const openAccordionItem = (containerId: string, itemId: string): void => {
    accordionInstance.openItem(containerId, itemId);
};

export const closeAccordionItem = (containerId: string, itemId: string): void => {
    accordionInstance.closeItem(containerId, itemId);
};

export const openAllAccordionItems = (containerId: string): void => {
    accordionInstance.openAllItems(containerId);
};

export const closeAllAccordionItems = (containerId: string): void => {
    accordionInstance.closeAllItems(containerId);
};

export const getActiveAccordionItems = (containerId: string): string[] => {
    return accordionInstance.getActiveItems(containerId);
};

export const isAccordionItemOpen = (containerId: string, itemId: string): boolean => {
    return accordionInstance.isItemOpen(containerId, itemId);
};

export const getAccordionInstance = (containerId: string): AccordionInstance | null => {
    return accordionInstance.getAccordionInstance(containerId);
};

export const destroyAccordion = (containerId: string): void => {
    accordionInstance.destroy(containerId);
};

export const destroyAllAccordions = (): void => {
    accordionInstance.destroyAll();
};

// 타입 내보내기
export type { AccordionOptions, AccordionInstance };
