const btnPlaylist = document.querySelector('.btn-playlist');
const btnPlaylistClose = document.querySelector('.playlist__navigation--close');
const btnCollapse = document.querySelector('.player__navigation--collapse');
const btnCollapseIcon = document.querySelector('.player__navigation--collapse i');
const btnMenu = document.querySelector('.player__navigation--menu');
const menu = document.querySelector('.menu');
const playlistSection = document.querySelector('.playlist');
const container = document.querySelector('.container');

const toggleCollapse = () => {
    btnCollapse.addEventListener('click', () => {
        playlistSection.classList.remove('active');
        container.classList.toggle('active');
        btnCollapseIcon.classList.toggle('bx-chevron-down');
        btnCollapseIcon.classList.toggle('bx-chevron-up');
    });
};

const togglePlaylist = () => {
    btnPlaylist.addEventListener('click', () => {
        playlistSection.classList.add('active');
    });
    
    btnPlaylistClose.addEventListener('click', () => {
        playlistSection.classList.remove('active');
    });
};


const toggleMenu = () => {
    btnMenu.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
};

export const toggleNavigation = () => {
    toggleCollapse();
    togglePlaylist();
    toggleMenu();
};