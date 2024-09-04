$(document).ready(function () {

    $('.fenlei-btn').click(function () {
        var data_id = $(this).attr('data-id')
        var grp_fenlei = $('.group-title-'+data_id)[0];
        var grp_fenlei_height = grp_fenlei.offsetTop+530;
        $(window).scrollTop(grp_fenlei_height);

        var grp_header = $('.group-header')[0].offsetTop;
        var grp_fenlei_lan = $('.group-fenlei');
        var fenlei_height = grp_fenlei_height-530;
        grp_fenlei_lan.css('top',fenlei_height);
    });

});