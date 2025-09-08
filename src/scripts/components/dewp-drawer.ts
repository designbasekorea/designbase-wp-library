/**
 * DesignBase Frontend Kit - Drawer 컴포넌트
 * 페이지 측면에서 슬라이드되어 나타나는 서랍 형태의 패널
 */

export interface DrawerOptions {
    target?: HTMLElement | string;  // Drawer 대상 요소 (ID 또는 요소)
    content?: string;
    position?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    theme?: 'default' | 'dark' | 'primary';
    overlay?: boolean;
    closeOnEscape?: boolean;
    closeOnOverlayClick?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onBeforeOpen?: () => void;
    onBeforeClose?: () => void;
}

export interface DrawerInstance {
    id: string;
    element: HTMLElement;
    options: DrawerOptions;
    trigger?: HTMLElement;
    isOpen: boolean;
    overlay?: HTMLElement;
}

export class DEWPDrawer {
    private drawers: Map<string, DrawerInstance> = new Map();
    private activeDrawer: DrawerInstance | null = null;
    private overlay: HTMLElement | null = null;

    constructor() {
        this.initGlobalEvents();
    }

    create(options: DrawerOptions): string {
        const drawerId = 'dewp-drawer-' + Date.now();
        // dev log removed

        // 기존 Drawer 요소 찾기 (ID 또는 선택자로)
        let drawerElement: HTMLElement | null = null;

        if (options.target) {
            drawerElement = typeof options.target === 'string'
                ? document.querySelector(options.target)
                : options.target;
        }

        if (!drawerElement) {
            throw new Error('Drawer 대상 요소를 찾을 수 없습니다.');
        }

        // 오버레이 생성 (옵션에 따라)
        let overlay: HTMLElement | null = null;
        if (options.overlay !== false) {
            overlay = this.createOverlay();
            document.body.appendChild(overlay);
        }

        // Drawer 인스턴스 생성
        const instance: DrawerInstance = {
            id: drawerId,
            element: drawerElement,
            options: options,
            trigger: undefined,
            isOpen: false,
            overlay: overlay || undefined
        };

        this.drawers.set(drawerId, instance);
        // dev log removed

        // 이벤트 바인딩
        this.bindDrawerEvents(instance);

        // dev log removed
        return drawerId;
    }

    private createDrawerElement(options: DrawerOptions): HTMLElement {
        const drawer = document.createElement('div');
        drawer.className = 'dewp-drawer';

        // 위치 설정
        if (options.position) {
            drawer.classList.add(`dewp-drawer-${options.position}`);
        }

        // 크기 설정
        if (options.size) {
            drawer.classList.add(`dewp-drawer-${options.size}`);
        }

        // 테마 설정
        if (options.theme) {
            drawer.classList.add(`dewp-drawer-${options.theme}`);
        }

        // 기본 구조 생성
        const title = this.getDrawerTitle(options);
        drawer.innerHTML = `
            <div class="dewp-drawer-header">
                <h3 class="dewp-drawer-title">${title}</h3>
                <button class="dewp-drawer-close">
                    <svg viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
            <div class="dewp-drawer-content">
                ${options.content || '<p>Drawer 내용을 여기에 입력하세요.</p>'}
            </div>
        `;

        return drawer;
    }

    private createOverlay(): HTMLElement {
        const overlay = document.createElement('div');
        overlay.className = 'dewp-drawer-overlay';
        overlay.addEventListener('click', () => {
            this.closeAll();
        });
        return overlay;
    }

    private bindDrawerEvents(instance: DrawerInstance): void {
        const { element, id } = instance;

        // 닫기 버튼 이벤트
        const closeBtn = element.querySelector('.dewp-drawer-close');
        if (closeBtn) {
            const closeEl = closeBtn as HTMLElement;
            // 접근성 이름과 역할 부여
            closeEl.setAttribute('type', 'button');
            closeEl.setAttribute('aria-label', '닫기');
            closeEl.setAttribute('title', '닫기');
            closeEl.setAttribute('role', 'button');
            closeEl.addEventListener('click', () => {
                this.close(id);
            });
            // 키보드 접근성 (Enter/Space)
            closeEl.addEventListener('keydown', (e) => {
                const ke = e as KeyboardEvent;
                if (ke.key === 'Enter' || ke.key === ' ') {
                    ke.preventDefault();
                    this.close(id);
                }
            });
        }

        // ESC 키 이벤트
        if (instance.options.closeOnEscape !== false) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && instance.isOpen) {
                    this.close(id);
                }
            });
        }
    }

    private bindTriggerEvents(instance: DrawerInstance): void {
        const { trigger, id } = instance;
        if (!trigger) return;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (instance.isOpen) {
                this.close(id);
            } else {
                this.open(id);
            }
        });
    }

    open(id: string): void {
        const instance = this.drawers.get(id);
        if (!instance || instance.isOpen) return;

        // dev log removed

        // 다른 Drawer 닫기
        this.closeAll();

        // Before Open 콜백
        if (instance.options.onBeforeOpen) {
            instance.options.onBeforeOpen();
        }

        // Drawer 열기 (기존 요소 활용)
        instance.element.classList.add('dewp-drawer-open');
        instance.isOpen = true;
        this.activeDrawer = instance;

        // 오버레이 표시
        if (instance.overlay) {
            instance.overlay.classList.add('show');
        }

        // body 스크롤 방지
        document.body.style.overflow = 'hidden';

        // Open 콜백
        if (instance.options.onOpen) {
            instance.options.onOpen();
        }

        // dev log removed
    }

    close(id: string): void {
        const instance = this.drawers.get(id);
        if (!instance || !instance.isOpen) return;

        // dev log removed

        // Before Close 콜백
        if (instance.options.onBeforeClose) {
            instance.options.onBeforeClose();
        }

        // Drawer 닫기
        instance.element.classList.remove('dewp-drawer-open');
        instance.isOpen = false;
        this.activeDrawer = null;

        // 오버레이 숨기기
        if (instance.overlay) {
            instance.overlay.classList.remove('show');
        }

        // body 스크롤 복원
        document.body.style.overflow = '';

        // Close 콜백
        if (instance.options.onClose) {
            instance.options.onClose();
        }

        // dev log removed
    }

    closeAll(): void {
        this.drawers.forEach((instance) => {
            if (instance.isOpen) {
                this.close(instance.id);
            }
        });
    }

    toggle(id: string): void {
        const instance = this.drawers.get(id);
        if (!instance) return;

        if (instance.isOpen) {
            this.close(id);
        } else {
            this.open(id);
        }
    }

    destroy(id: string): void {
        const instance = this.drawers.get(id);
        if (!instance) return;

        // Drawer 닫기
        this.close(id);

        // DOM에서 제거
        if (instance.element.parentNode) {
            instance.element.parentNode.removeChild(instance.element);
        }

        // Map에서 제거
        this.drawers.delete(id);

        // dev log removed
    }

    getInstance(id: string): DrawerInstance | undefined {
        return this.drawers.get(id);
    }

    isOpen(id: string): boolean {
        const instance = this.drawers.get(id);
        return instance ? instance.isOpen : false;
    }

    private initGlobalEvents(): void {
        // 윈도우 리사이즈 시 Drawer 위치 재조정
        window.addEventListener('resize', () => {
            if (this.activeDrawer) {
                this.adjustDrawerPosition(this.activeDrawer);
            }
        });

        // 스크롤 시 Drawer 위치 재조정
        window.addEventListener('scroll', () => {
            if (this.activeDrawer) {
                this.adjustDrawerPosition(this.activeDrawer);
            }
        }, true);
    }

    private adjustDrawerPosition(instance: DrawerInstance): void {
        // Drawer 위치 조정 로직 (필요시 구현)
        // dev log removed
    }

    private getDrawerTitle(options: DrawerOptions): string {
        if (options.position === 'right') return '정보 패널';
        if (options.theme === 'dark') return '다크 테마';
        if (options.size === 'sm') return '작은 Drawer';
        if (options.size === 'lg') return '큰 Drawer';
        if (options.size === 'xl') return '매우 큰 Drawer';
        return '네비게이션';
    }

    // 자동 초기화
    autoInitialize(): void {
        // dev log removed

        // 모든 .dewp-drawer 요소 찾기
        const drawerElements = document.querySelectorAll('.dewp-drawer');
        // dev log removed

        drawerElements.forEach((element, index) => {
            const drawerId = `auto-drawer-${index + 1}`;

            // 이미 초기화된 요소는 건너뛰기
            if (element.getAttribute('data-drawer-id')) {
                return;
            }

            try {
                const id = this.create({
                    target: element as HTMLElement,  // 기존 요소를 대상으로 지정
                    position: this.detectPosition(element),
                    size: this.detectSize(element),
                    theme: this.detectTheme(element),
                    overlay: true,
                    closeOnEscape: true,
                    closeOnOverlayClick: true
                });

                // 원본 요소에 ID 설정
                element.setAttribute('data-drawer-id', id);

                // dev log removed
            } catch (error) {
                console.error(`