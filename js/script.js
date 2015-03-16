/**
 * Created by vanya on 07.03.15.
 */


$(document).ready(function () {
    VK.init(function() {
       console.log('success vk init')
    }, function() {
        console.log('failed vk init')
    }, '5.29');

    if (($.cookie($.urlParam('user_id').toString())) == null) {
        console.log('null')
        setCoockie(0);
    }

    function init(rows, columns) {
        console.log(navigator.language);

        var current_level = getCurrent_level();

        $('.level-cell').removeClass('current_lvl');
        $('.level-cell:eq(' + current_level + ')').addClass('current_lvl');
        var $i = 0;

        //cell indexes
        var xPrevios;
        var yPrevios;

        var firstStepFlag = 1;
        var indexPrevios;

//        //
//        var rows = 10;
//        var columns = 10;

        function remove_grid() {
            $('.grid-container').empty();
        }

        /**
         * Generate grid with parameters from init(rows, columns)
         */
        function generage_grid() {

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
        }

        remove_grid();
        generage_grid();


        $('.grid-cell').click(function () {

            var $cells = $('.grid-cell');

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

                    if ($i > 99) $(this).css({'font-size': '14px'});

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


                    if ($i == ((columns * rows) - 1)) {
                        getPopUp('game_message_win');
                        current_level = getCurrent_level();
                        current_level++;
                        setCoockie(current_level);
                    }
                    $i++;
                }
            } else {

                console.log('Already set number.');
            }


        });

        /**
         * Field shading function, add black and white class to cell
         */
        function shading() {
            var $cells = $('.grid-cell');
            $cells.each(function () {
                if ((columns % 2) == 0) {
                    if ((Math.floor($i / columns) + $i) % 2 == 1) $(this).addClass('black')
                    else $(this).addClass('white');
                    $i++;
                } else {
                    if (($i % 2) == 1) $(this).addClass('black')
                    else $(this).addClass('white');
                    $i++;
                }

            });
            $i = 0;
        }

        shading();


        /**
         * Generate popup window after win or lose
         *
         * @param message_id get game_message_win or game_message_lose
         */
        function getPopUp(message_id) {

            var popupid = message_id;
            console.log(popupid);

            $('#' + popupid).fadeIn(900);

            $('#fade').css({'filter': 'alpha(opacity=80)'}).fadeIn(900);

            var popuptopmargin = ($('#' + popupid).height() + 10) / 2;
            var popupleftmargin = ($('#' + popupid).width() + 10) / 2;

            $('#' + popupid).css({
                'margin-top': -popuptopmargin,
                'margin-left': -popupleftmargin
            });

            $('#fade').click(function () {
                $('#fade , #game_message_win, #game_message_lose').fadeOut(900)
                return false;
            });
        }

        /**
         * Language select
         */
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
    }

    /**
     * Restart game with new grid that set in init()
     */
    $('.restart-button').click(function () {

        init_level();
        var $cells = $('.grid-cell');
        $cells.each(function () {
            $(this).fadeOut(900, function () {
                $cells.each(function () {
                    $(this).empty().removeClass('first last intermediate number');
                    $(this).stop().fadeIn(900);
                });
            })

            $i = 0;

            firstStepFlag = 1;

        });
        $('#fade , #game_message_win, #game_message_lose').fadeOut(900);


    });

    function setCoockie(level) {
        var value = $.urlParam('user_id') + level;
        var md5 = $.md5(value);
        $.cookie($.urlParam('user_id'), md5);
    }

    function init_level() {
        var level = getCurrent_level();
        switch (level) {
            case 1:
                init(6, 6);
                VK.callMethod("resizeWindow", 625, 630);
                $('blockquote').remove();
                $('.game-explanation').fadeOut(900, function() {
                $('.game-explanation').append('<blockquote><p tkey="quote1"></p><p tkey="quote1author"></p> </blockquote>');
                select_ln();
                $('.game-explanation').fadeIn(900);
                });
                break;
            case 2:
                init(7, 7);
                VK.callMethod("resizeWindow", 625, 675);
                $('blockquote').remove();
                $('.game-explanation').fadeOut(900, function() {
                    $('.game-explanation').append('<blockquote><p tkey="quote2"></p><p tkey="quote1author"></p> </blockquote>');
                    select_ln();
                    $('.game-explanation').fadeIn(900);
                });
                break;
            case 3:
                init(8, 8);
                VK.callMethod("resizeWindow", 625, 720);
                $('blockquote').remove();
                $('.game-explanation').fadeOut(900, function() {
                $('.game-explanation').append('<blockquote><p tkey="quote3"></p><p tkey="quote1author"></p> </blockquote>');
                select_ln();
                $('.game-explanation').fadeIn(900);
                });
                break;
            case 4:
                init(9, 9);
                VK.callMethod("resizeWindow", 625, 765);
                $('blockquote').remove();
                $('.game-explanation').fadeOut(900, function() {
                $('.game-explanation').append('<blockquote><p tkey="quote4"></p><p tkey="quote1author"></p> </blockquote>');
                select_ln();
                $('.game-explanation').fadeIn(900);
                });
                break;
            case 5:
                init(10, 10);
                VK.callMethod("resizeWindow", 625, 810);
                $('blockquote').remove();
                $('.game-explanation').fadeOut(900, function() {
                $('.game-explanation').append('<blockquote><p tkey="quote5"></p><p tkey="quote1author"></p> </blockquote>');
                select_ln();
                $('.game-explanation').fadeIn(900);
                });
                break;
            default:
                init(5, 5);
                VK.callMethod("resizeWindow", 625, 600);
                $('blockquote').remove();
                $('.game-explanation').fadeOut(900, function() {
                $('.game-explanation').append(' <blockquote><p tkey="how"></p><p tkey="rules"></p> </blockquote>');
                select_ln();
                $('.game-explanation').fadeIn(900);
                });
        }
    }

    init_level();
});






