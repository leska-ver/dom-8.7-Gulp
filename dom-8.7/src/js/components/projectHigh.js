


// Плавный скролл по якорям. В любое место можно кинуть.
function projectHigh(){
  $('a[href^="#"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $
  (target).offset().top},800);
    return false;
  })
}

export default projectHigh;
  
