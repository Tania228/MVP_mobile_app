/*
Файл с логикой для страницы с моими нейросотрудниками
*/

import { getMyEmployees } from './api_client.js';
import MenuPage from './menu_page.js';
import ChatPage from './chat_page.js';

export default class MyAgentsPage {
    private employees: any[] = [];

    async render(): Promise<void> {
        const template = document.getElementById('my-agents') as HTMLTemplateElement;
        const app = document.getElementById('app') as HTMLElement;
        app.innerHTML = '';
        const clone = template.content.cloneNode(true) as DocumentFragment;
        app.appendChild(clone);

        await this.loadEmployees();
        this.renderEmployees();

        const backBtn = document.querySelector('.back-button-agents');
        backBtn?.addEventListener('click', () => {
            new MenuPage().render();
        });
    }

    private async loadEmployees(): Promise<void> {
        try {
            const data = await getMyEmployees();
            this.employees = data.employees || [];

        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.employees = [];
            const container = document.querySelector('.list-agents');
            if (container) {
                container.innerHTML = '<div class="error-message">Не удалось загрузить сотрудников. Запустите бэкенд.</div>';
            }
        }
    }

    private renderEmployees(): void {
        const container = document.querySelector('.list-agents');
        if (!container) return;
        container.innerHTML = '';

        const cardTemplate = document.getElementById('employee-card-template') as HTMLTemplateElement;

        this.employees.forEach(emp => {
            const card = cardTemplate.content.cloneNode(true) as DocumentFragment;
            
            card.querySelector('.employee-name')!.textContent = emp.name;
            card.querySelector('.employee-description')!.textContent = emp.description;
            card.querySelector('.employee-status')!.textContent = emp.status;
            
            const unreadEl = card.querySelector('.employee-unread') as HTMLElement;
            if (emp.count_message && emp.count_message > 0) {
                unreadEl.textContent = String(emp.count_message);
            } else {
                unreadEl.style.display = 'none';
            }

            const avatarEl = card.querySelector('.employee-avatar') as HTMLElement;
            if (avatarEl) {
                avatarEl.textContent = '👤';
            }

            const cardDiv = card.querySelector('.employee-card') as HTMLElement;
            cardDiv?.addEventListener('click', () => {
                new ChatPage(emp.id, emp.name).render();
            });

            container.appendChild(card);
        });
    }
}