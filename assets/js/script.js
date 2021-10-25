//open - close mobile menu
$('.nav__open').on('click', function() {
    $(this).toggleClass('open-menu');
    $('.nav').toggle('close');
});

//plugin connection for select
$(function() {
    $('select.choose-type').selectric();
});

//change value output
let inputRange = $('input[type="range"]');
let outputValuePercent = $("#percents__value");
outputValuePercent.text(inputRange.val() + " %");
inputRange.on('input', function() {
    outputValuePercent.text($(this).val() + " %");
});

//add step dots
$('.step').not(':last-child').append(`<div class="step__circles">
<span class="circle"></span>
<span class="circle"></span>
<span class="circle"></span>
<span class="circle"></span>
<span class="circle"></span>
</div>`);

//set interval animation between steps
let index = 0;
setInterval(function($items) {
    $items.eq(index).removeClass('active');
    index = (index + 1) % $items.length;
    $items.eq(index).addClass('active');
}, 4500, $('.step'));