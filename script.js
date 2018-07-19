var progress = 0;
var main = $('.main');
var complete = false;
var randIndex;
var months = [
    { en: 'January', ru: 'Январь', ua: 'Січень' },
    { en: 'February', ru: 'Февраль', ua: 'Лютий' },
    { en: 'March', ru: 'Март', ua: 'Березень' },
    { en: 'April', ru: 'Апрель', ua: 'Квітень' },
    { en: 'May', ru: 'Май', ua: 'Травень' },
    { en: 'June', ru: 'Июнь	', ua: 'Червень' },
    { en: 'July', ru: 'Июль', ua: 'Липень' },
    { en: 'August', ru: 'Август', ua: 'Серпень' },
    { en: 'September', ru: 'Сентябрь', ua: 'Вересень' },
    { en: 'October', ru: 'Октябрь', ua: 'Жовтень' },
    { en: 'November', ru: 'Ноябрь', ua: 'Листопад' },
    { en: 'December', ru: 'Декабрь', ua: 'Грудень' }
];

$(() => {
    newMonth();

    for (var i = 1; i <= 12; i++) {
        $('.container').append(`<div class="button" id="${i}">${i}</div> `);
        if (i == 1 || i == 2 || i == 12) $(`#${i}`).css('background-color', 'rgb(123, 165, 248)');
        if (i == 3 || i == 4 || i == 5) $(`#${i}`).css('background-color', 'rgb(115, 235, 82)');
        if (i == 6 || i == 7 || i == 8) $(`#${i}`).css('background-color', 'rgb(247, 247, 73)');
        if (i == 9 || i == 10 || i == 11) $(`#${i}`).css('background-color', 'rgb(235, 132, 1)');
    }

    main.click(() => {
        console.log(randIndex + 1, months[randIndex]);
        setTimeout(() => console.clear(), 3000);
        newMonth();
    });

    $('.button').click((data) => {
        var index = +data.target.innerHTML - 1;
        var month = main.html();
        var isCorrect = index == randIndex;
        if (isCorrect) progress += 5;
        else if (progress > 10) progress -= 10;
        else progress = 0;

        if (isCorrect) main.attr('id', 'ok');
        else main.attr('id', 'wrong');

        main.css('background', `linear-gradient(to right, gray ${progress - 5}%, white ${progress}%)`);
        setTimeout(() => { main.attr('id', ''); if (isCorrect) newMonth() }, 250);
    });
});

function newMonth() {
    var rand = int(random(12));
    while(randIndex == rand) rand = int(random(12));
    randIndex = rand;
    var randLang = random(['en', 'ru', 'ua']);
    var randMonth = months[randIndex][randLang];
    main.html(randMonth);
    main.css('background', `linear-gradient(to right, gray ${progress - 5}%, white ${progress}%)`);
    if (progress > 100 && !complete) {
        $('.container').append('<hr> Поздравляем, вы прошли игру. Нажмите на <div class="button" id="R">R</div> чтобы начать заново.');
        $('#R').click(() => { progress = 0; newMonth() });
        complete = true;
        // $('#R').click(() => {location.reload());        
    }
}

var int = function (num) {
    return Math.floor(num);
}

var random = function (min, max) {
    var rand = Math.random();
    if (typeof min === 'undefined') {
        return rand;
    } else if (typeof max === 'undefined') {
        if (min instanceof Array) {
            return min[int(rand * min.length)];
        } else {
            return rand * min;
        }
    } else {
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }

        return rand * (max - min) + min;
    }
};
