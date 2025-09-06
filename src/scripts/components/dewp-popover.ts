type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

interface PopoverOptions {
    trigger: string | HTMLElement;
    content: string | HTMLElement;
    placement?: PopoverPlacement;
    closeOnEscape?: boolean;
}

interface PopoverInstance {
    id: string;
    trigger: HTMLElement;
    popover: HTMLElement;
    options: Required<Pick<PopoverOptions, 'placement' | 'closeOnEscape'>>;
    isOpen: boolean;
}

class DEWPPopover {
    private popovers = new Map<string, PopoverInstance>();
    private triggerIndex = new WeakMap<HTMLElement, string>(); // 트리거→id 역참조
    private active: PopoverInstance | null = null;
    private uid = 0;
    private docHandlersBound = false;

    constructor() {
        this.bindDocumentHandlers(); // 한 번만
    }

    private genId() {
        const base = (++this.uid).toString(36);
        try {
            return `dewp-popover-${crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${base}`}`;
        } catch {
            return `dewp-popover-${Date.now().toString(36)}-${base}`;
        }
    }

    create(options: PopoverOptions): string {
        const id = this.genId();
        const trigger = typeof options.trigger === 'string'
            ? (document.querySelector(options.trigger) as HTMLElement | null)
            : (options.trigger as HTMLElement);

        if (!trigger) throw new Error('Popover trigger not found');

        // content 생성/지정
        let popover: HTMLElement;
        if (typeof options.content === 'string') {
            popover = document.createElement('div');
            popover.className = 'dewp-popover-content dewp-popover-bottom';
            popover.innerHTML = options.content;
        } else {
            popover = options.content as HTMLElement;
            popover.classList.add('dewp-popover-content');
        }

        // ARIA
        if (!trigger.id) trigger.id = `${id}-trigger`;
        if (!popover.id) popover.id = `${id}-content`;
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.setAttribute('aria-controls', popover.id);
        trigger.setAttribute('aria-expanded', 'false');
        popover.setAttribute('role', 'dialog');
        popover.setAttribute('aria-labelledby', trigger.id);

        // DOM 부착: 래퍼(.dewp-popover) 안으로
        const wrapper = trigger.closest('.dewp-popover') || trigger.parentElement;
        if (!popover.parentElement && wrapper) wrapper.appendChild(popover);

        // placement
        const placement: PopoverPlacement = options.placement || 'bottom';
        popover.classList.remove('dewp-popover-top', 'dewp-popover-bottom', 'dewp-popover-left', 'dewp-popover-right');
        popover.classList.add(`dewp-popover-${placement}`);

        const instance: PopoverInstance = {
            id,
            trigger,
            popover,
            options: { placement, closeOnEscape: options.closeOnEscape !== false },
            isOpen: false,
        };

        // 저장
        this.popovers.set(id, instance);
        this.triggerIndex.set(trigger, id);

        // 트리거 핸들러 (id 고정)
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle(id);
        });

        return id;
    }

    private bindDocumentHandlers() {
        if (this.docHandlersBound) return;

        // 바깥 클릭으로 닫기 (active만 봄)
        document.addEventListener('click', (e) => {
            const t = e.target as HTMLElement;
            const inst = this.active;
            if (!inst) return;
            if (inst.trigger.contains(t) || inst.popover.contains(t)) return;
            this.close(inst.id);
        });

        // ESC 닫기 (active만)
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            const inst = this.active;
            if (inst && inst.options.closeOnEscape) this.close(inst.id);
        });

        this.docHandlersBound = true;
    }

    open(id: string) {
        const inst = this.popovers.get(id);
        if (!inst) return;
        if (this.active && this.active.id !== id) this.close(this.active.id);

        inst.popover.parentElement?.classList.add('is-open');
        inst.popover.classList.add('is-open');
        inst.trigger.setAttribute('aria-expanded', 'true');
        inst.isOpen = true;
        this.active = inst;
    }

    close(id: string) {
        const inst = this.popovers.get(id);
        if (!inst) return;

        inst.popover.parentElement?.classList.remove('is-open');
        inst.popover.classList.remove('is-open');
        inst.trigger.setAttribute('aria-expanded', 'false');
        inst.isOpen = false;
        if (this.active && this.active.id === id) this.active = null;
        try { inst.trigger.focus(); } catch { }
    }

    toggle(id: string) {
        const inst = this.popovers.get(id);
        if (!inst) return;
        inst.isOpen ? this.close(id) : this.open(id);
    }

    // 선택: 트리거 요소로 직접 제어하고 싶을 때
    toggleByTrigger(el: HTMLElement) {
        const id = this.triggerIndex.get(el);
        if (id) this.toggle(id);
    }

    // 선택: 정리
    destroy(id: string) {
        const inst = this.popovers.get(id);
        if (!inst) return;
        this.close(id);
        this.triggerIndex.delete(inst.trigger);
        this.popovers.delete(id);
    }
}

const dewpPopover = new DEWPPopover();

export const createPopover = (options: PopoverOptions) => dewpPopover.create(options);
export const openPopover = (id: string) => dewpPopover.open(id);
export const closePopover = (id: string) => dewpPopover.close(id);
export const togglePopover = (id: string) => dewpPopover.toggle(id);
export default dewpPopover;
