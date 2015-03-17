function select_ln() {
    $.urlParam = function (name) {
        var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        if (results != null)   return results[1];
        else return '0';
    }

    var langCode = $.urlParam('language');

    var translate = function (jsdata) {
        $("[tkey]").each(function (index) {
            var strTr = jsdata [$(this).attr('tkey')];
            $(this).html(strTr);
        });
    }


    switch (langCode) {
        case 0 || '0':
            $.getJSON('lang/ru.json', translate);
            break;

        default:
            $.getJSON('lang/en.json', translate);
            break;
    }
}
select_ln();