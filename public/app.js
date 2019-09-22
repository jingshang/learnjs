'use strict';
var learnjs = {};

learnjs.problems = [
    {
        description: "What is truth?",
        code: "function problem() {return __;}"
    },
    {
        description: "Simple Math",
        code: "function problem(){return 42 === 6 * __;}"
    }
];

// 引数：data（int:表示するプログラム番号）
learnjs.problemView = function (data) {

    // 表示するプログラム番号を取得
    var problemNumber = parseInt(data, 10);

    // template内の問題を表示する領域をコピー
    var view = $('.templates .problem-view').clone();

    // 問題データを取得（ファイルの最初に書いてあるデータ構造）
    var problemData = learnjs.problems[problemNumber - 1];

    var resultFlash = view.find('.result');

    // 回答欄に入力された文字列を取得、問題の[__]と置換して実際にプログラムを実行
    function checkAnswer() {
        var answer = view.find('.answer').val();
        var test = problemData.code.replace('__', answer) + '; problem();';
        return eval(test);
    }

    // 問題のプログラムの実行結果は true or false なので結果に文字を表示
    function checkAnswerClick() {
        if (checkAnswer()) {

            // 次への<span>と<a>を取得
            var correctFlash = learnjs.template('correct-flash');

            // リンク先のアンカーをインクリメント
            correctFlash.find('a').attr('href', '#problem-' + (problemNumber + 1));

            // 結果表示要素に「<span>と<a>」をフワッと表示させる
            learnjs.flashElement(resultFlash, learnjs.buildCorrectFlash(problemNumber));
        } else {
            // 結果表示要素に「Incorrect!」をフワッと表示させる
            learnjs.flashElement(resultFlash, 'Incorrect!');
        }
        return false;
    }

    // 回答イベント設置
    view.find('.check-btn').click(checkAnswerClick);

    // 問題タイトル変更
    view.find('.title').text('Problem #' + problemNumber);

    // 問題の書き換え
    learnjs.applyObject(problemData, view);
    return view;
};

learnjs.showView = function (hash) {
    var routes = {
        '#problem': learnjs.problemView
    };
    var hasgParts = hash.split('-');
    var viewFn = routes[hasgParts[0]];
    if (viewFn) {
        $('.view-container').empty().append(viewFn(hasgParts[1]));
    }
};

learnjs.appOnReady = function () {
    //window.location.hashプロパティ
    //window.location.hashは、URLの「#」記号の後の部分を取得、もしくは、設定するプロパティ。
    //learnjs.showView(window.location.hash);

    window.onhashchange = function () {
        learnjs.showView(window.location.hash);
    };
    learnjs.showView(window.location.hash);

};

// HTML要素を渡してバインディング（値を挿入）します。
learnjs.applyObject = function (obj, elem) {
    for (var key in obj) {
        elem.find('[data-name="' + key + '"]').text(obj[key]);
    }
};

// 問題の答え合わせをした時の視覚的効果
learnjs.flashElement = function (elem, content) {
    elem.fadeOut('fast', function () {
        elem.html(content);
        elem.fadeIn();
    });
};

// templateをクローンする
learnjs.template = function (name) {
    return $('.templates .' + name).clone();
};

// 
learnjs.buildCorrectFlash = function (problemNum) {
    // 結果表示要素を取得
    var correctFlash = learnjs.template('correct-flash');
    // リンクを取得
    var link = correctFlash.find('a');

    // 問題が最後まで出てたらHomeに戻る、それ以外は次の問題に移動
    if (problemNum < learnjs.problems.length) {
        link.attr('href', '#problem-' + (problemNum + 1));
    } else {
        link.attr('href', '');
        link.text("You're Finished!");
    }
    return correctFlash;
}

