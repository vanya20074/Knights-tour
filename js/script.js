/**
 * Created by vanya on 07.03.15.
 */


$(document).ready(function () {
    VK.init(function () {
        console.log('success vk init')
    }, function () {
        console.log('failed vk init')
    }, '5.29');
    /**
     * Set level and select into cookies if run first time
     */
    if (($.cookie('level')) == null) {
        console.log('null')
        $.cookie('level', '0');
        $.cookie('select', '0');

    }
    /**
     * Set lock on all lvls that more then level in cookie
     */
    $('.level-cell').each(function () {
        $(this).addClass('lock');
        if ($(this).index() <= $.cookie('level').toString()) $(this).removeClass('lock');
    })

//    $('level-cell').removeClass('current_lvl');
//    $('level-cell:eq(' + $.cookie('level')+ ')').addClass('current_lvl');

    function init(rows, columns) {

        console.log(navigator.language);

        var current_level = $.cookie('select');

        //  $('.level-cell').removeClass('current_lvl');
        $('.level-cell:eq(' + current_level + ')').addClass('current_lvl');
        var $i = 0;

        //cell indexes
        var xPrevios;
        var yPrevios;

        var firstStepFlag = 1;
        var indexPrevios;

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

                /**
                 * Check if cell have already busy
                 */
                if (!$(this).hasClass('number')) {

                    /**
                     * Check move conformity to knight move
                     */
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

                        /**
                         * Check is any moves for player or not
                         */
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

                            current_level = $.cookie('select');
                            if (current_level == '5') {
                                getPopUp('game_message_win');
                            }
                            else {
                                getPopUp('game_message_next_level');
                                //console.log(current_level + ' ' + getCurrent_level());

                                current_level++;
                                $.cookie('level', current_level);
                                $.cookie('select', current_level);
                                console.log(current_level + ' ----')
                                $('.level-cell:eq(' + current_level + ')').removeClass('lock');
                                console.log('2')
                                $('.level-cell').removeClass('current_lvl');
                                $('.level-cell:eq(' + current_level + ')').addClass('current_lvl');
                                // init_next_level(current_level);
                            }
                        }

                        $i++;
                    }
                }

                else {

                    console.log('Already set number.');
                }


            }
        )
        ;


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
                $('#fade , #game_message_win, #game_message_losem, #game_message_next_level').fadeOut(900)
                return false;
            });
        }


    }

    /**
     * Restart game with new grid that set in init()
     */
    $('.restart-button').click(function () {
        var level = $.cookie('select');
        console.log(level);
        switch (level) {
            case '1':
                init(6, 6);
                break;
            case '2':
                init(7, 7);
                break;
            case '3':
                init(8, 8);
                break;
            case '4':
                init(9, 9);
                break;
            case '5':
                init(10, 10);
                break;
            default:
                init(5, 5);
        }
        clear_grid();

    });

    $('.next-level-button').click(function () {
        //var level = getCurrent_level();

        var level = $.cookie('select').toString();
        init_next_level(level);
        clear_grid();
        //  $('.level-cell').removeClass('current_lvl');
        $('.level-cell:eq(' + level + ')').addClass('current_lvl');
    });
    function clear_grid() {
        var $cells = $('.grid-cell');
        $cells.each(function () {
            $(this).fadeOut(900, function () {
                $cells.each(function () {
                    $(this).empty().removeClass('first last intermediate number');
                    $(this).stop().fadeIn(900);
                });
            })
        });
        $('#fade , #game_message_win, #game_message_lose, #game_message_next_level').fadeOut(900);
    }

    function setCoockie(level) {
        //    var value = 'level' + level;
        //   var md5 = $.md5(value);
        //$.cookie('level', level);
        $.cookie('level', level);
    }

    /**
     * Init new level with next quote and board
     */
    function init_next_level(level) {

        switch (level) {
            case '1':
                init(6, 6);
                VK.callMethod("resizeWindow", 625, 630);
                $('.game-explanation').fadeOut(900, function () {
                    $('blockquote').remove();
                    $('.game-explanation').append('<blockquote><p tkey="quote1"></p> </blockquote>');
                    select_ln();
                    $('.game-explanation').fadeIn(900);
                });
                break;
            case '2':
                init(7, 7);
                VK.callMethod("resizeWindow", 625, 675);
                $('.game-explanation').fadeOut(900, function () {
                    $('blockquote').remove();
                    $('.game-explanation').append('<blockquote><p tkey="quote2"></p> </blockquote>');
                    select_ln();
                    $('.game-explanation').fadeIn(900);
                });
                break;
            case '3':
                init(8, 8);
                VK.callMethod("resizeWindow", 625, 750);
                $('.game-explanation').fadeOut(900, function () {
                    $('blockquote').remove();
                    $('.game-explanation').append('<blockquote><p tkey="quote3"></p> </blockquote>');
                    select_ln();
                    $('.game-explanation').fadeIn(900);
                });
                break;
            case '4':
                init(9, 9);
                VK.callMethod("resizeWindow", 625, 765);
                $('.game-explanation').fadeOut(900, function () {
                    $('blockquote').remove();
                    $('.game-explanation').append('<blockquote><p tkey="quote4"></p> </blockquote>');
                    select_ln();
                    $('.game-explanation').fadeIn(900);
                });
                break;
            case '5':
                init(10, 10);
                VK.callMethod("resizeWindow", 625, 810);
                $('.game-explanation').fadeOut(900, function () {
                    $('blockquote').remove();
                    $('.game-explanation').append('<blockquote><p tkey="quote5"></p> </blockquote>');
                    select_ln();
                    $('.game-explanation').fadeIn(900);
                });
                break;
            default:
                init(5, 5);
                VK.callMethod("resizeWindow", 625, 600);
                $('.game-explanation').fadeOut(900, function () {
                    $('blockquote').remove();
                    $('.game-explanation').append(' <blockquote><p tkey="how"></p><p tkey="rules"></p></blockquote>');
                    select_ln();
                    $('.game-explanation').fadeIn(900);
                });
        }
    }

//var level = getCurrent_level();
    var level = $.cookie('select');
    init_next_level(level);
// $('.level-cell').removeClass('current_lvl');
//$('.level-cell:eq(' + level + ')').addClass('current_lvl');

    $('.level-cell').click(function () {
        if (!$(this).hasClass('lock')) {
            var level = $(this).index();
            init_next_level(level.toString());
            $.cookie('select', level);
            $('.level-cell').removeClass('current_lvl');
            $('.level-cell:eq(' + level + ')').addClass('current_lvl');
        }
    });
})
;






