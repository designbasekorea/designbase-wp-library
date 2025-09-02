/**
 * DEWP 폼 검증 시스템
 * 어드민과 프론트엔드에서 공통 사용
 */

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    email?: boolean;
    url?: boolean;
    numeric?: boolean;
    min?: number;
    max?: number;
    custom?: (value: any) => boolean | string;
}

interface ValidationResult {
    isValid: boolean;
    errors: string[];
    field: string;
}

interface FormValidationOptions {
    showErrors?: boolean;
    errorClass?: string;
    successClass?: string;
    errorMessageClass?: string;
    onValidation?: (result: ValidationResult) => void;
}

class DEWPValidate {
    private options: FormValidationOptions;
    private errorClass: string;
    private successClass: string;
    private errorMessageClass: string;

    constructor(options: FormValidationOptions = {}) {
        this.options = {
            showErrors: true,
            errorClass: 'dewp-input-error',
            successClass: 'dewp-input-success',
            errorMessageClass: 'dewp-error-message',
            ...options
        };

        this.errorClass = this.options.errorClass!;
        this.successClass = this.options.successClass!;
        this.errorMessageClass = this.options.errorMessageClass!;
    }

    // 단일 필드 검증
    validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, rules: ValidationRule): ValidationResult {
        const value = field.value.trim();
        const fieldName = field.name || field.id || 'unknown';
        const errors: string[] = [];

        // 필수 필드 검증
        if (rules.required && !value) {
            errors.push('이 필드는 필수입니다.');
        }

        if (value) {
            // 길이 검증
            if (rules.minLength && value.length < rules.minLength) {
                errors.push(`최소 ${rules.minLength}자 이상 입력해주세요.`);
            }

            if (rules.maxLength && value.length > rules.maxLength) {
                errors.push(`최대 ${rules.maxLength}자까지 입력 가능합니다.`);
            }

            // 패턴 검증
            if (rules.pattern && !rules.pattern.test(value)) {
                errors.push('올바른 형식이 아닙니다.');
            }

            // 이메일 검증
            if (rules.email && !this.isValidEmail(value)) {
                errors.push('올바른 이메일 주소를 입력해주세요.');
            }

            // URL 검증
            if (rules.url && !this.isValidUrl(value)) {
                errors.push('올바른 URL을 입력해주세요.');
            }

            // 숫자 검증
            if (rules.numeric && !this.isNumeric(value)) {
                errors.push('숫자만 입력 가능합니다.');
            }

            // 범위 검증
            if (rules.min !== undefined && this.isNumeric(value)) {
                const numValue = parseFloat(value);
                if (numValue < rules.min) {
                    errors.push(`최소값은 ${rules.min}입니다.`);
                }
            }

            if (rules.max !== undefined && this.isNumeric(value)) {
                const numValue = parseFloat(value);
                if (numValue > rules.max) {
                    errors.push(`최대값은 ${rules.max}입니다.`);
                }
            }

            // 커스텀 검증
            if (rules.custom) {
                const customResult = rules.custom(value);
                if (customResult !== true) {
                    errors.push(typeof customResult === 'string' ? customResult : '유효하지 않은 값입니다.');
                }
            }
        }

        const result: ValidationResult = {
            isValid: errors.length === 0,
            errors,
            field: fieldName
        };

        // UI 업데이트
        if (this.options.showErrors) {
            this.updateFieldUI(field, result);
        }

        // 콜백 실행
        if (this.options.onValidation) {
            this.options.onValidation(result);
        }

        return result;
    }

    // 폼 전체 검증
    validateForm(form: HTMLFormElement, fieldRules: Record<string, ValidationRule>): ValidationResult[] {
        const results: ValidationResult[] = [];
        const fields = form.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

        fields.forEach(field => {
            const fieldName = field.name || field.id;
            if (fieldName && fieldRules[fieldName]) {
                const result = this.validateField(field, fieldRules[fieldName]);
                results.push(result);
            }
        });

        return results;
    }

    // 폼이 유효한지 확인
    isFormValid(form: HTMLFormElement, fieldRules: Record<string, ValidationRule>): boolean {
        const results = this.validateForm(form, fieldRules);
        return results.every(result => result.isValid);
    }

    // 필드 UI 업데이트
    private updateFieldUI(field: HTMLElement, result: ValidationResult): void {
        // 기존 상태 클래스 제거
        field.classList.remove(this.errorClass, this.successClass);

        // 기존 에러 메시지 제거
        const existingError = field.parentNode?.querySelector(`.${this.errorMessageClass}`);
        if (existingError) {
            existingError.remove();
        }

        if (result.isValid) {
            // 성공 상태
            field.classList.add(this.successClass);
        } else {
            // 에러 상태
            field.classList.add(this.errorClass);

            // 에러 메시지 표시
            if (result.errors.length > 0) {
                this.showErrorMessage(field, result.errors[0]);
            }
        }
    }

    // 에러 메시지 표시
    private showErrorMessage(field: HTMLElement, message: string): void {
        const errorDiv = document.createElement('div');
        errorDiv.className = this.errorMessageClass;
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 12px;
            margin-top: 4px;
            line-height: 1.4;
        `;

        // 필드 다음에 에러 메시지 삽입
        if (field.parentNode) {
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
    }

    // 유틸리티 메서드들
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    private isNumeric(value: string): boolean {
        return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
    }

    // 실시간 검증 설정
    setupRealTimeValidation(form: HTMLFormElement, fieldRules: Record<string, ValidationRule>): void {
        const fields = form.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

        fields.forEach(field => {
            const fieldName = field.name || field.id;
            if (fieldName && fieldRules[fieldName]) {
                // 입력 이벤트에 검증 바인딩
                field.addEventListener('input', () => {
                    this.validateField(field, fieldRules[fieldName]);
                });

                // 포커스 아웃 이벤트에 검증 바인딩
                field.addEventListener('blur', () => {
                    this.validateField(field, fieldRules[fieldName]);
                });
            }
        });
    }

    // 검증 상태 초기화
    resetValidation(form: HTMLFormElement): void {
        const fields = form.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
        
        fields.forEach(field => {
            field.classList.remove(this.errorClass, this.successClass);
        });

        const errorMessages = form.querySelectorAll(`.${this.errorMessageClass}`);
        errorMessages.forEach(message => message.remove());
    }

    // 특정 필드 검증 상태 초기화
    resetFieldValidation(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
        field.classList.remove(this.errorClass, this.successClass);
        
        const errorMessage = field.parentNode?.querySelector(`.${this.errorMessageClass}`);
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// 기본 인스턴스 생성
const dewpValidate = new DEWPValidate();

// 전역 함수들 export
export const validateField = (field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, rules: ValidationRule): ValidationResult => {
    return dewpValidate.validateField(field, rules);
};

export const validateForm = (form: HTMLFormElement, fieldRules: Record<string, ValidationRule>): ValidationResult[] => {
    return dewpValidate.validateForm(form, fieldRules);
};

export const isFormValid = (form: HTMLFormElement, fieldRules: Record<string, ValidationRule>): boolean => {
    return dewpValidate.isFormValid(form, fieldRules);
};

export const setupRealTimeValidation = (form: HTMLFormElement, fieldRules: Record<string, ValidationRule>): void => {
    dewpValidate.setupRealTimeValidation(form, fieldRules);
};

export const resetValidation = (form: HTMLFormElement): void => {
    dewpValidate.resetValidation(form);
};

export const resetFieldValidation = (field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void => {
    dewpValidate.resetFieldValidation(field);
};

// 기본 export
export default dewpValidate;

