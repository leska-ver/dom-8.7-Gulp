function searchMobile () {
  //Проверка ошибок console.log() 

    const search = document.querySelector('.search-mobile');
    const searchBtn = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-mobile__input');
    const searchClose = document.querySelector('.search-mobile__close');
  
     // search Лупа
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.classList.add('search-mobile__input--active');
        search.classList.add('search-active');
        searchClose.classList.add('search-mobile__close-active');
      })
  
      searchClose.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.classList.remove('search-mobile__input--active');
        search.classList.remove('search-active');
        searchClose.classList.remove('search-mobile__close-active');
      })
  
      window.addEventListener('click', (event) => {
        if (!search.contains(event.target)) searchInput.classList.remove('search-mobile__input--active');
        if (!search.contains(event.target)) search.classList.remove('search-active');
        if (!search.contains(event.target)) searchClose.classList.remove('search-mobile__close-active');
      });
  
        
  
  }

  export default searchMobile;
