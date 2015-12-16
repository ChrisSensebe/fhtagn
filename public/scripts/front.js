/**
 * Created by csensebe on 16/12/2015.
 */
$(function(){
    // add class to hide flash messages
    $('.hide-flash').click(function(){
        $(this).parent().addClass('hide-message');
        $(this).parents().eq(1).addClass('shrink-element');
    });
});