/* 
Файл с логикой для входа
*/

import { login } from './api_client.js';
import { saveUser } from './storage.js';


export default class LoginPage {
    private form: HTMLFormElement | null = null;
    private emailInput: HTMLInputElement | null = null;
    private passwordInput: HTMLInputElement | null = null;

    render(): void {
        const template = document.getElementById('login-template')  as HTMLTemplateElement;

        const app = document.getElementById('app') as HTMLElement;
        app.innerHTML = '';
        const clone = template.content.cloneNode(true) as DocumentFragment;
        app.appendChild(clone);

        this.form = document.querySelector('.container-for-login');
        this.emailInput = document.querySelector('.email-mobile');
        this.passwordInput = document.querySelector('.password-mobile');

        this.attachEvents();
    }

    private attachEvents(): void {
        this.form?.addEventListener('submit', (e) =>{
            e.preventDefault();
            this.handleLogin();
        });
    }

    private clearError(): void {
        const oldError = this.form?.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }
    }

    private showError(message: string): void {
        this.clearError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.form?.appendChild(errorDiv);
    }

    private async handleLogin(): Promise<void> {
        const email = this.emailInput?.value.trim() || '';
        const password = this. passwordInput?.value.trim() || '';

        if (!email || !password) {
            this.showError('Для входа заполните все поля!');
            return;
        }

        try {
            const data = await login(email, password);

            if (data.success && data.user) {
                saveUser(data.user);
                console.log('Вход выполнен.');
            } else {
                this.showError(data.error || 'Неверный логин или пароль.');
            }
        } catch (e) {
            this.showError(`Произошла ошибка: ${e}`);
            console.error(e);
        }
    }
}