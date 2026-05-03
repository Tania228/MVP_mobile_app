import LoginPage from './login_page.js';
import MenuPage from './menu_page.js';
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('user');
    if (user) {
        new MenuPage().render();
    }
    else {
        new LoginPage().render();
    }
});
