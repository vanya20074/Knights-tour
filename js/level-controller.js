/**
 * Created by vanya on 16.03.15.
 */
function getCurrent_level(){
    switch ($.cookie('state')){
        case $.md5($.urlParam('user_id') + 1):
            return 1;
            break;
        case $.md5($.urlParam('user_id') + 2):
            return 2;
            break;
        case $.md5($.urlParam('user_id') + 3):
            return 3;
            break;
        case $.md5($.urlParam('user_id') + 4):
            return 4;
            break;
        default :
            return 0;
    }
}