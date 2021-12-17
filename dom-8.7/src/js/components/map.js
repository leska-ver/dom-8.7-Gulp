//Проверка ошибок console.log() 
import $ from "jquery";


function map () {

  //Яндекс карта map//
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', { //1 метка
        center: [55.76825820559357, 37.63947647901066],
        zoom: 14,
        controls: ['geolocationControl', 'zoomControl']  //Убрали увеличитель и др..
      }, {
        searchControlProvider: 'yandex#search',
        //Для controls: 
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition:  { top: "310px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "235px", right: "20px" }
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myGeoObject = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'High pass',
        balloonContent: '10:00-20:00'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/map.png',
        // iconImageHref: 'https://e7.pngegg.com/pngimages/142/60/png-clipart-computer-icons-geo-fence-others-miscellaneous-fence.png',
        // Размеры метки.
        iconImageSize: [12, 12],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
      }),

      myPlacemark = new ymaps.Placemark([], { //2 метка
        hintContent: 'High pass',
        balloonContent: 'июль',
        iconContent: '12'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        iconImageHref: 'https://e7.pngegg.com/pngimages/142/60/png-clipart-computer-icons-geo-fence-others-miscellaneous-fence.png',
        // Размеры метки.
        iconImageSize: [48, 48],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-24, -24],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [15, 15],
        // Макет содержимого.
        iconContentLayout: MyIconContentLayout
      });

    myMap.geoObjects.add(myGeoObject);
  });




  //Клик в модальном окне в Яндекс карте
  // $(document).ready(function(){
    $(".contacts__close").click(function(){
      $(".contacts__modal").toggleClass("close__maps"); return false;
    });
  // });


  // Открывающийся блок в Яндекс карте(Контакты Студия “High pass”). При другой обёртке(в кодепене Вариант 1) 
  //$('.contacts__close').click(function(){
    ////После нажатие на кнопку, скроет её
    //$(this).fadeOut(300)
    //$(".contacts__info").fadeOut(300);
    ////Или так просто будет клик. Не удалять
    ////$(".contacts__info").fadeToggle(100);
  // });

}    

export default map;