import MenuPage from './menu_page.js';
import { sendMessageToBot } from './api_client.js';

export default class ChatPage {
    private employeeId: number;
    private employeeName: string;

    constructor(employeeId: number, employeeName: string) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
    }

    render(): void {
        const template = document.getElementById('chat-template') as HTMLTemplateElement;
        const app = document.getElementById('app') as HTMLElement;
        app.innerHTML = '';
        const clone = template.content.cloneNode(true) as DocumentFragment;
        app.appendChild(clone);

        const nameEl = document.querySelector('.chat-employee-name');
        if (nameEl) nameEl.textContent = this.employeeName;

        this.loadMessages();

        const backBtn = document.querySelector('.chat-back-btn');
        backBtn?.addEventListener('click', () => {
            new MenuPage().render();
        });

        const sendBtn = document.getElementById('chat-send-btn');
        const input = document.getElementById('chat-input') as HTMLInputElement;
        sendBtn?.addEventListener('click', () => this.sendMessage(input.value));
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage(input.value);
        });

        const attachBtn = document.getElementById('chat-attach-btn');
        attachBtn?.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, audio/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) this.handleFileUpload(file);
        };
        input.click();
        });
    }

    private handleFileUpload(file: File): void {
        const fileInfo = {
            name: file.name,
            type: file.type,
            size: this.formatFileSize(file.size),
            icon: this.getFileIcon(file.type)
        };

        const messageText = `📎 Файл: ${fileInfo.name}\n📁 Тип: ${fileInfo.type}\n💾 Размер: ${fileInfo.size}\n🖼️ Иконка: ${fileInfo.icon}`;

        const fileMsg = {
            role: 'user',
            text: messageText,
            timestamp: new Date().toISOString(),
            isFile: true,
            fileInfo: fileInfo
        };

        this.saveMessage(fileMsg);
        this.addMessageToUI(fileMsg);
    }

    private formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    private getFileIcon(mimeType: string): string {
        if (mimeType.startsWith('image/')) return '🖼️';
        if (mimeType === 'application/pdf') return '📄';
        if (mimeType.includes('word')) return '📝';
        if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
        if (mimeType.startsWith('audio/')) return '🎵';
        return '📎';
    }

    private loadMessages(): void {
        const saved = localStorage.getItem(`chat_${this.employeeId}`);
        const messages = saved ? JSON.parse(saved) : [];
        const container = document.getElementById('chat-messages');
        if (!container) return;

        container.innerHTML = '';
        messages.forEach((msg: any) => {
            const div = document.createElement('div');
            div.className = `message ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`;
            div.textContent = msg.text;
            container.appendChild(div);
        });
        container.scrollTop = container.scrollHeight;
    }

    private async sendMessage(text: string): Promise<void> {
    if (!text.trim()) return;

    const input = document.getElementById('chat-input') as HTMLInputElement;
    input.value = '';

    const userMsg = { role: 'user', text: text.trim(), timestamp: new Date().toISOString() };
    this.saveMessage(userMsg);
    this.addMessageToUI(userMsg);

    const typingIndicator = this.showTypingIndicator();

    try {
        await this.delay(1500);  


        const response = await sendMessageToBot(text);

        typingIndicator.remove();

        const botMsg = { role: 'assistant', text: response.reply, timestamp: new Date().toISOString() };
        this.saveMessage(botMsg);
        this.addMessageToUI(botMsg);
    } catch (error) {
        typingIndicator.remove();
        console.error('Ошибка при отправке сообщения:', error);
        const errorMsg = { role: 'assistant', text: 'Ошибка связи с сервером. Попробуйте позже.', timestamp: new Date().toISOString() };
        this.saveMessage(errorMsg);
        this.addMessageToUI(errorMsg);
    }
}

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private showTypingIndicator(): HTMLElement {
        const container = document.getElementById('chat-messages');
        if (!container) throw new Error('Контейнер сообщений не найден');

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message-assistant typing-indicator';
        typingDiv.textContent = 'Нейросотрудник печатает...';
        container.appendChild(typingDiv);
        container.scrollTop = container.scrollHeight;

        return typingDiv;
    }

    private saveMessage(msg: any): void {
        const saved = localStorage.getItem(`chat_${this.employeeId}`);
        const messages = saved ? JSON.parse(saved) : [];
        messages.push(msg);
        localStorage.setItem(`chat_${this.employeeId}`, JSON.stringify(messages));
    }

    private addMessageToUI(msg: any): void {
        const container = document.getElementById('chat-messages');
        if (!container) return;

        const div = document.createElement('div');
        div.className = `message ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`;
        div.textContent = msg.text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }
}

