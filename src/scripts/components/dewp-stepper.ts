export interface StepperOptions {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (value: number) => void;
}

export class DEWPStepper {
    private input: HTMLInputElement;
    private decrementBtn: HTMLButtonElement;
    private incrementBtn: HTMLButtonElement;
    private options: Required<Pick<StepperOptions, 'min' | 'max' | 'step'>>;

    constructor(root: HTMLElement, opts: StepperOptions = {}) {
        this.input = root.querySelector('.dewp-stepper-input') as HTMLInputElement;
        this.decrementBtn = root.querySelector('.dewp-stepper-decrement') as HTMLButtonElement;
        this.incrementBtn = root.querySelector('.dewp-stepper-increment') as HTMLButtonElement;
        this.options = { min: opts.min ?? Number.MIN_SAFE_INTEGER, max: opts.max ?? Number.MAX_SAFE_INTEGER, step: opts.step ?? 1 };

        if (typeof opts.value === 'number') this.input.value = String(opts.value);

        this.bindEvents(opts.onChange);
        this.syncDisabled();
    }

    private bindEvents(onChange?: (v: number) => void) {
        const parse = () => this.clamp(parseFloat(this.input.value || '0'));
        const emit = (v: number) => { if (onChange) onChange(v); };

        this.decrementBtn.addEventListener('click', () => {
            const v = this.clamp(parse() - this.options.step);
            this.input.value = String(v);
            this.syncDisabled();
            emit(v);
        });
        this.incrementBtn.addEventListener('click', () => {
            const v = this.clamp(parse() + this.options.step);
            this.input.value = String(v);
            this.syncDisabled();
            emit(v);
        });
        this.input.addEventListener('input', () => {
            const v = parse();
            this.input.value = String(v);
            this.syncDisabled();
            emit(v);
        });
    }

    private clamp(v: number) { return Math.min(this.options.max, Math.max(this.options.min, isNaN(v) ? 0 : v)); }
    private syncDisabled() {
        const v = parseFloat(this.input.value || '0');
        this.decrementBtn.disabled = v <= this.options.min;
        this.incrementBtn.disabled = v >= this.options.max;
    }
}

export const initStepper = (root: HTMLElement, options: StepperOptions = {}) => new DEWPStepper(root, options);


