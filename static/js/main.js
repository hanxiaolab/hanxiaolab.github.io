$(document).ready(function () {
    $('.ui.secondary.inverted.pointing.menu a').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })


    $('.dropdown').dropdown({
        // you can use any ui transition
        transition: 'drop'
      });
    var path = window.location.origin;
    var url = path+'/set/language/';
    $('.language-item').click(function() {

          var language_code = $(this).attr('data-language');
          $.ajax({
             url: url,
             type: 'GET',
             data: {
                 "language":language_code
             },
             success:function(re) {
                 console.log(re)
                if(re.flag==true){
                    location.reload();
                }else{
                    alert('')
                }
             },
             error:function() {
                console.log('')
             }
         })
    })
});