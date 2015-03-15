/**
 * Created by vanya on 07.03.15.
 */

$(document).ready(function () {
    console.log(navigator.language);

    //cell number
    var $i = 0;

    var $n = 0;

    //cell indexes
    var xPrevios;
    var yPrevios;

    var firstStepFlag = 1;
    var indexPrevios;

    //
    var rows = 10;
    var columns = 20;

    for (var i = 0; i < rows; i++) {
        $('.grid-container').append('<div class="grid-row"></div>');
    }


    $('.grid-row').each(function () {
        for (i = 0; i < columns; i++) {
            $(this).append('<div class="grid-cell"></div>')
        }
    });

    var game_container_height = (34.5 * rows)
    $('.game-container').height(game_container_height);
    var game_container_width = (34.5 * columns)
    $('.game-container').width(game_container_width);

    var $cells = $('.grid-cell');

    $cells.click(function () {

        var $index = $cells.index(this);
        //$n = $(this).classList[3];
        var x = Math.floor($index / columns);
        var y = $index % columns;
        // console.log(x + ':' + y);

        if (!$(this).hasClass('number')) {
            if (firstStepFlag == 1 || (x == xPrevios - 2 && y == yPrevios - 1)
                || (x == xPrevios - 2 && y == yPrevios + 1)
                || (x == xPrevios - 1 && y == yPrevios - 2)
                || (x == xPrevios - 1 && y == yPrevios + 2)
                || (x == xPrevios + 2 && y == yPrevios + 1)
                || (x == xPrevios + 2 && y == yPrevios - 1)
                || (x == xPrevios + 1 && y == yPrevios + 2)
                || (x == xPrevios + 1 && y == yPrevios - 2)
                ) {
                if (firstStepFlag == 1) {
                    $(this).append($i).addClass('number').fadeTo("fast", 1).addClass('first');
                    indexPrevios = $index;
                }
                else $(this).append($i).addClass('number').fadeTo("fast", 1).addClass('last');


                xPrevios = x;
                yPrevios = y;
                //console.log($i - 1);
                firstStepFlag = 0;
                //  console.log('Last ' + $('.grid-cell').get($index).className);
                //$( '.grid-cell:eq(' + $index-1 + ' )' ).addClass('number');
                if (!$('.grid-cell:eq(' + indexPrevios + ' )').hasClass('first')) $('.grid-cell:eq(' + indexPrevios + ' )').removeClass('last').addClass('intermediate');
                indexPrevios = $index;

                //check step available
                   if (($('.grid-cell:eq(' + ((x - 2) * columns + (y - 1)) + ' )').hasClass('number') || 0 > (x - 2) || 0 > (y - 1) || (x - 2) >= rows || (y - 1) >= columns)
                    && ($('.grid-cell:eq(' + ((x - 2) * columns + (y + 1)) + ' )').hasClass('number') || 0 > (x - 2) || 0 > (y + 1) || (x - 2) >= rows || (y + 1) >= columns)
                    && ($('.grid-cell:eq(' + ((x - 1) * columns + (y - 2)) + ' )').hasClass('number') || 0 > (x - 1) || 0 > (y - 2) || (x - 1) >= rows || (y - 2) >= columns)
                    && ($('.grid-cell:eq(' + ((x - 1) * columns + (y + 2)) + ' )').hasClass('number') || 0 > (x - 1) || 0 > (y + 2) || (x - 1) >= rows || (y + 2) >= columns)
                    && ($('.grid-cell:eq(' + ((x + 2) * columns + (y + 1)) + ' )').hasClass('number') || 0 > (x + 2) || 0 > (y + 1) || (x + 2) >= rows || (y + 1) >= columns)
                    && ($('.grid-cell:eq(' + ((x + 2) * columns + (y - 1)) + ' )').hasClass('number') || 0 > (x + 2) || 0 > (y - 1) || (x + 2) >= rows || (y - 1) >= columns)
                    && ($('.grid-cell:eq(' + ((x + 1) * columns + (y + 2)) + ' )').hasClass('number') || 0 > (x + 1) || 0 > (y + 2) || (x + 1) >= rows || (y + 2) >= columns)
                    && ($('.grid-cell:eq(' + ((x + 1) * columns + (y - 2)) + ' )').hasClass('number') || 0 > (x + 1) || 0 > (y - 2) || (x + 1) >= rows || (y - 2) >= columns)
                    && $i < ((columns * rows) - 1)) {
                    console.log('Game over!');
                    getPopUp('game_message_lose');
                }
                console.log('========== true  unavailable ============');
                console.log((x - 2) + ' ' + (y - 1) + ' ' + ($('.grid-cell:eq(' + ((x - 2) * columns + (y - 1)) + ' )').hasClass('number') || 0 > (x - 2) || 0 > (y - 1) || (x - 2) >= rows || (y - 1) >= columns));
                console.log((x - 2) + ' ' + (y + 1) + ' ' + ($('.grid-cell:eq(' + ((x - 2) * columns + (y + 1)) + ' )').hasClass('number') || 0 > (x - 2) || 0 > (y + 1) || (x - 2) >= rows || (y + 1) >= columns));
                console.log((x - 1) + ' ' + (y - 2) + ' ' + ($('.grid-cell:eq(' + ((x - 1) * columns + (y - 2)) + ' )').hasClass('number') || 0 > (x - 1) || 0 > (y - 2) || (x - 1) >= rows || (y - 2) >= columns));
                console.log((x - 1) + ' ' + (y + 2) + ' ' + ($('.grid-cell:eq(' + ((x - 1) * columns + (y + 2)) + ' )').hasClass('number') || 0 > (x - 1) || 0 > (y + 2) || (x - 1) >= rows || (y + 2) >= columns));
                console.log((x + 2) + ' ' + (y + 1) + ' ' + ($('.grid-cell:eq(' + ((x + 2) * columns + (y + 1)) + ' )').hasClass('number') || 0 > (x + 2) || 0 > (y + 1) || (x + 2) >= rows || (y + 1) >= columns));
                console.log((x + 2) + ' ' + (y - 1) + ' ' + ($('.grid-cell:eq(' + ((x + 2) * columns + (y - 1)) + ' )').hasClass('number') || 0 > (x + 2) || 0 > (y - 1) || (x + 2) >= rows || (y - 1) >= columns));
                console.log((x + 1) + ' ' + (y + 2) + ' ' + ($('.grid-cell:eq(' + ((x + 1) * columns + (y + 2)) + ' )').hasClass('number') || 0 > (x + 1) || 0 > (y + 2) || (x + 1) >= rows || (y + 2) >= columns));
                console.log((x + 1) + ' ' + (y - 2) + ' ' + ($('.grid-cell:eq(' + ((x + 1) * columns + (y - 2)) + ' )').hasClass('number') || 0 > (x + 1) || 0 > (y - 2) || (x + 1) >= rows || (y - 2) >= columns));
                console.log($i < ((columns * rows) - 1));
               // console.log('======================');

                if ($i == ((columns * rows) - 1)) getPopUp('game_message_win');
                $i++;
            }
        } else {

            console.log('Already set number.');
        }


    });

    //field shading
    $cells.each(function () {
        if ((columns % 2) == 0) {
            if ((Math.floor($n / columns) + $n) % 2 == 1) $(this).addClass('black')
            else $(this).addClass('white');
            $n++;
        } else {
            if (($n % 2) == 1) $(this).addClass('black')
            else $(this).addClass('white');
            $n++;
        }

    });

//    $('.restart-button').click(function () {
//        location.reload();
//    });

    $('.restart-button').click(function () {
        $cells.each(function () {
            $(this).fadeOut(900, function () {
                $cells.each(function () {
                    $(this).empty().removeClass('first last intermediate number');
                    $(this).stop().fadeIn(900);
                });
            })

            $i = 0;
            $n = 0;
            firstStepFlag = 1;

        });
        $('#fade , #game_message_win, #game_message_lose').fadeOut(900);
    });
    function getPopUp(message_id) {

// Here we will describe a variable popupid which gets the
// rel attribute from the clicked link
        var popupid = message_id;
        console.log(popupid);

// Now we need to popup the marked which belongs to the rel attribute
// Suppose the rel attribute of click link is popuprel then here in below code
// #popuprel will fadein
        $('#' + popupid).fadeIn(900);


// append div with id fade into the bottom of body tag
// and we allready styled it in our step 2 : CSS
//$('body').append('<div id="fade"></div>');
        $('#fade').css({'filter': 'alpha(opacity=80)'}).fadeIn(900);


// Now here we need to have our popup box in center of
// webpage when its fadein. so we add 10px to height and width
        var popuptopmargin = ($('#' + popupid).height() + 10) / 2;
        var popupleftmargin = ($('#' + popupid).width() + 10) / 2;


// Then using .css function style our popup box for center allignment
        $('#' + popupid).css({
            'margin-top': -popuptopmargin,
            'margin-left': -popupleftmargin
        });

        // Now define one more function which is used to fadeout the
// fade layer and popup window as soon as we click on fade layer
        $('#fade').click(function () {


// Add markup ids of all custom popup box here
            $('#fade , #game_message_win, #game_message_lose').fadeOut(900)
            return false;

        });
    }

    $('#en').click(function () {
        console.log('change to en');
        $('#lang').text('English');
        $.getJSON('lang/en.json', translate);
    });

    $('#ru').click(function () {
        console.log('change to ru');
        $('#lang').text('Русский');
        $.getJSON('lang/ru.json', translate);

    });
});



