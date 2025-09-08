/**
 * DEWP 통합 토스트 시스템
 * 어드민과 프론트엔드에서 공통 사용
 */

interface ToastOptions {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    size?: 'sm' | 'md' | 'lg';
}

class DEWPToast {
    private container: HTMLElement | null = null;

    constructor() {
        this.init();
    }

    private init(): void {
        this.createContainer();
    }

    private createContainer(): void {
        // 기존 컨테이너가 있으면 제거
        const existing = document.getElementById('dewp-toast-container');
        if (existing) {
            existing.remove();
        }

        // 새 컨테이너 생성
        this.container = document.createElement('div');
        this.container.id = 'dewp-toast-container';
        this.container.className = 'dewp-toast-container dewp-toast-container-top-right';

        document.body.appendChild(this.container);
    }

    show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration: number = 5000, size: 'sm' | 'md' | 'lg' = 'md'): string {
        // dev log removed

        if (!this.container) {
            this.createContainer();
        }

        const toastId = 'dewp-toast-' + Date.now();
        const toast = this.createToastElement(toastId, message, type, size);

        // 동일 메시지 중복 방지: 같은 텍스트의 토스트가 이미 보이면 숨김
        try {
            const existingSame = Array.from(this.container!.querySelectorAll('.dewp-toast .dewp-toast-message'))
                .some(el => el.textContent === String(message));
            if (existingSame) {
                // 기존 토스트를 먼저 모두 닫고 새 토스트만 남김
                this.hideAll();
            }
        } catch (e) { /* noop */ }

        this.container!.appendChild(toast);

        // CSS 애니메이션으로 표시
        requestAnimationFrame(() => {
            toast.classList.add('show');
            toast.classList.add('toast-slide-in');
        });

        // 자동 숨김
        if (duration > 0) {
            setTimeout(() => {
                this.hide(toastId);
            }, duration);
        }

        return toastId;
    }

    private createToastElement(id: string, message: string, type: 'info' | 'success' | 'warning' | 'error', size: 'sm' | 'md' | 'lg' = 'md'): HTMLElement {
        const toast = document.createElement('div');
        toast.id = id;
        toast.className = `dewp-toast dewp-toast-${type} dewp-toast-${size}`;

        const content = document.createElement('div');
        content.className = 'dewp-toast-content';

        // 아이콘 생성
        const icon = document.createElement('span');
        icon.className = 'dewp-toast-icon';
        icon.innerHTML = this.getTypeIcon(type);

        // 메시지 생성
        const messageEl = document.createElement('div');
        messageEl.className = 'dewp-toast-message';
        messageEl.textContent = message;

        // 닫기 버튼 생성
        const closeBtn = document.createElement('button');
        closeBtn.className = 'dewp-toast-close';
        closeBtn.type = 'button';
        closeBtn.innerHTML = '<span>×</span>';
        closeBtn.setAttribute('aria-label', '토스트 닫기');

        // 닫기 버튼 이벤트 리스너
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.hide(id);
        });

        // 요소들을 content에 추가
        content.appendChild(icon);
        content.appendChild(messageEl);
        content.appendChild(closeBtn);

        // content를 toast에 추가
        toast.appendChild(content);

        return toast;
    }

    private getTypeIcon(type: 'info' | 'success' | 'warning' | 'error'): string {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        return icons[type];
    }

    hide(id: string): void {
        const toast = document.getElementById(id);
        if (toast) {
            // 애니메이션 클래스 추가
            toast.classList.remove('show', 'toast-slide-in');
            toast.classList.add('toast-slide-out');

            // 애니메이션 완료 후 DOM에서 제거
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300); // CSS 애니메이션 duration과 일치
        }
    }

    hideAll(): void {
        if (this.container) {
            const toasts = this.container.querySelectorAll('.dewp-toast');
            toasts.forEach(toast => {
                const toastId = toast.id;
                if (toastId) {
                    this.hide(toastId);
                }
            });
        }
    }

    // 편의 메서드들
    success(message: string, duration?: number, size?: 'sm' | 'md' | 'lg'): string {
        return this.show(message, 'success', duration, size);
    }

    error(message: string, duration?: number, size?: 'sm' | 'md' | 'lg'): string {
        return this.show(message, 'error', duration, size);
    }

    warning(message: string, duration?: number, size?: 'sm' | 'md' | 'lg'): string {
        return this.show(message, 'warning', duration, size);
    }

    info(message: string, duration?: number, size?: 'sm' | 'md' | 'lg'): string {
        return this.show(message, 'info', duration, size);
    }
}

// 싱글톤 인스턴스 생성
const dewpToast = new DEWPToast();

// 전역 함수들 export
export const showToast = (message: string, type?: 'info' | 'success' | 'warning' | 'error', duration?: number, size?: 'sm' | 'md' | 'lg'): string => {
    return dewpToast.show(message, type || 'info', duration, size);
};

export const showSuccessToast = (message: string, duration?: number, size?: 'sm' | 'md' | 'lg'): string => {
    return dewpToast.success(message, duration, size);
};

export const showErrorToast = (message: string, duration?: number, size?: 'sm' | 'md' | 'lg'): string => {
    return dewpToast.error(message, duration, size);
};

export const showWarningToast = (message: string, duration?: number, size?: 'sm' | 'md' | 'lg'): string => {
    return dewpToast.warning(message, duration, size);
};

export const showInfoToast = (message: string, duration?: number, size?: 'sm' | 'md' | 'lg'): string => {
    return dewpToast.info(message, duration, size);
};

export const hideToast = (id: string): void => {
    dewpToast.hide(id);
};

export const hideAllToasts = (): void => {
    dewpToast.hideAll();
};

// 기본 export
export default dewpToast;