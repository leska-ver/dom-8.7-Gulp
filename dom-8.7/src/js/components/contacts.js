function contacts () {

  //Маска телефона//Здесь стоит другой вариант
  //var selector = document.querySelector("input[type='tel']"); //Всем input с атрибутом type со значением tel
  //var im = new Inputmask("+7 (999)-999-99-99"); //Задали внешний вид маски
  
  //С помощью метода .mask инициализировали этот плагин и натравили его на selector-ы input[type='tel']
  //im.mask(selector);
  
  //Валидация телефона//
  //Первый аргумент передаём селектор т.е html с классом form
  new JustValidate('.contacts__form', {
    //Второй аргумент передаём его(form) правила
    rules: {
      name: { //data-validate-field="name"
        required: true, //Это означает поле обязательное для заполнение
        minLength: 2,
        maxLenght: 30
      },
      tel: { //data-validate-rules="phone"
        required: true, //Это означает поле обязательное для заполнение
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          console.log(phone)
          return Number(phone) && phone.length === 10
        }
      },
      mail: { //data-validate-field="mail"
        required: true, //Это означает поле обязательное для заполнение
        email: true //Проверяет сама себя на валидность, например @ на месте
      },
    },
    
     //От проверяющего дополнен код
      messages: { //Извещает об ошибке
        tel: {
          required: 'Недопустимый формат' //'Укажите ваш телефон'
        },
        name: 'Недопустимый формат', //'Как вас зовут?',
        mail: 'Недопустимый формат' //'Укажите ваш e-mail'
      },
      colorWrong: '#ff3030' //цвет сообщений валидации(ошибки фразы) и бордера
    });
  
  
  
  
  }

  export default contacts;