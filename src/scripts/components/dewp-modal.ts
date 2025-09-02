/**
 * DEWP 모달 시스템
 * 어드민과 프론트엔드에서 공통 사용
 */

interface ModalOptions {
    title?: string;
    content?: string | HTMLElement;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closable?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    backdrop?: boolean;
    keyboard?: boolean;
    focus?: boolean;
    show?: boolean;
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

class DEWPModal {
    private modals: Map<string, HTMLElement> = new Map();
    private activeModal: HTMLElement | null = null;
    private backdrop: HTMLElement | null = null;
    private zIndex: number = 1050;

    constructor() {
        this.init();
    }

    private init(): void {
        this.createBackdrop();
        this.bindEvents();
    }

    private createBackdrop(): void {
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'dewp-modal-backdrop';
        document.body.appendChild(this.backdrop);
    }

    private bindEvents(): void {
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close(this.activeModal.id);
            }
        });

        // 백드롭 클릭으로 모달 닫기
        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => {
                if (this.activeModal) {
                    this.close(this.activeModal.id);
                }
            });
        }
    }

    create(options: ModalOptions = {}): string {
        const modalId = 'dewp-modal-' + Date.now();
        const modal = this.createModalElement(modalId, options);

        this.modals.set(modalId, modal);
        document.body.appendChild(modal);

        return modalId;
    }

    private createModalElement(id: string, options: ModalOptions): HTMLElement {
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'dewp-modal';

        const size = options.size || 'md';
        const sizeClasses = {
            sm: 'dewp-modal-sm',
            md: 'dewp-modal-md',
            lg: 'dewp-modal-lg',
            xl: 'dewp-modal-xl',
            full: 'dewp-modal-full'
        };

        modal.className = `dewp-modal ${sizeClasses[size]}`;

        // 헤더
        if (options.title) {
            const header = document.createElement('div');
            header.className = 'dewp-modal-header';

            const title = document.createElement('h3');
            title.textContent = options.title;
            header.appendChild(title);

            if (options.closable !== false) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'dewp-modal-close';
                closeBtn.innerHTML = '×';

                closeBtn.addEventListener('click', () => {
                    this.close(id);
                });

                header.appendChild(closeBtn);
            }

            modal.appendChild(header);
        }

        // 바디
        if (options.content) {
            const body = document.createElement('div');
            body.className = 'dewp-modal-body';

            if (typeof options.content === 'string') {
                body.innerHTML = options.content;
            } else {
                body.appendChild(options.content);
            }

            modal.appendChild(body);
        }

        // 푸터
        if (options.showCancel || options.confirmText) {
            const footer = document.createElement('div');
            footer.className = 'dewp-modal-footer';

            if (options.showCancel) {
                const cancelBtn = document.createElement('button');
                cancelBtn.className = 'dewp-modal-cancel';
                cancelBtn.textContent = options.cancelText || '취소';

                cancelBtn.addEventListener('click', () => {
                    if (options.onCancel) {
                        options.onCancel();
                    }
                    this.close(id);
                });

                footer.appendChild(cancelBtn);
            }

            if (options.confirmText) {
                const confirmBtn = document.createElement('button');
                confirmBtn.className = 'dewp-modal-confirm';
                confirmBtn.textContent = options.confirmText;

                confirmBtn.addEventListener('click', () => {
                    if (options.onConfirm) {
                        options.onConfirm();
                    }
                    this.close(id);
                });

                footer.appendChild(confirmBtn);
            }

            modal.appendChild(footer);
        }

        return modal;
    }

    open(id: string): void {
        const modal = this.modals.get(id);
        if (!modal) return;

        this.activeModal = modal;
        this.showBackdrop();

        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.transform = 'translate(-50%, -50%) scale(1)';

        // 포커스 트랩
        if (modal.querySelector('button')) {
            (modal.querySelector('button') as HTMLElement).focus();
        }
    }

    close(id: string): void {
        const modal = this.modals.get(id);
        if (!modal) return;

        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.style.transform = 'translate(-50%, -50%) scale(0.9)';

        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            this.modals.delete(id);

            if (this.activeModal === modal) {
                this.activeModal = null;
                this.hideBackdrop();
            }
        }, 300);
    }

    private showBackdrop(): void {
        if (this.backdrop) {
            this.backdrop.style.opacity = '1';
            this.backdrop.style.visibility = 'visible';
        }
    }

    private hideBackdrop(): void {
        if (this.backdrop) {
            this.backdrop.style.opacity = '0';
            this.backdrop.style.visibility = 'hidden';
        }
    }

    // 편의 메서드들
    show(options: ModalOptions = {}): string {
        const id = this.create(options);
        this.open(id);
        return id;
    }

    confirm(options: ConfirmOptions): void {
        const modalId = this.create({
            title: options.title || '확인',
            content: options.message,
            confirmText: options.confirmText || '확인',
            cancelText: '취소',
            showCancel: true,
            onConfirm: options.onConfirm,
            onCancel: options.onCancel
        });
        this.open(modalId);
    }

    alert(message: string, title?: string): void {
        const modalId = this.create({
            title: title || '알림',
            content: message,
            confirmText: '확인'
        });
        this.open(modalId);
    }

    // 유틸리티 메서드들
    getModal(id: string): HTMLElement | undefined {
        return this.modals.get(id);
    }

    isOpen(id: string): boolean {
        const modal = this.modals.get(id);
        return modal ? modal.style.visibility === 'visible' : false;
    }

    closeAll(): void {
        this.modals.forEach((modal, id) => {
            this.close(id);
        });
    }
}

// 싱글톤 인스턴스 생성
const dewpModal = new DEWPModal();

// 전역 함수들 export
export const createModal = (options: ModalOptions = {}): string => {
    return dewpModal.create(options);
};

export const openModal = (id: string): void => {
    dewpModal.open(id);
};

export const closeModal = (id: string): void => {
    dewpModal.close(id);
};

export const showModal = (options: ModalOptions = {}): string => {
    return dewpModal.show(options);
};

export const showConfirmModal = (options: ConfirmOptions): void => {
    dewpModal.confirm(options);
};

export const showAlertModal = (message: string, title?: string): void => {
    dewpModal.alert(message, title);
};

export const closeAllModals = (): void => {
    dewpModal.closeAll();
};

// 기본 export
export default dewpModal;