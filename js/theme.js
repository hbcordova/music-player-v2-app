const theme = document.querySelector('#menuTheme');
const root = document.querySelector(':root');

export const toggleTheme = () => {
    theme.addEventListener('click', () => {
        root.classList.toggle('dark');
        theme.children[0].classList.toggle('bx-sun');
        theme.children[0].classList.toggle('bx-moon');
        theme.children[1].textContent = theme.children[1].textContent === 'Light Mode' ? 'Dark Mode' : 'Light Mode';
    });
};