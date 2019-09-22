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

// �����Fdata�iint:�\������v���O�����ԍ��j
learnjs.problemView = function (data) {

    // �\������v���O�����ԍ����擾
    var problemNumber = parseInt(data, 10);

    // template���̖���\������̈���R�s�[
    var view = $('.templates .problem-view').clone();

    // ���f�[�^���擾�i�t�@�C���̍ŏ��ɏ����Ă���f�[�^�\���j
    var problemData = learnjs.problems[problemNumber - 1];

    var resultFlash = view.find('.result');

    // �񓚗��ɓ��͂��ꂽ��������擾�A����[__]�ƒu�����Ď��ۂɃv���O���������s
    function checkAnswer() {
        var answer = view.find('.answer').val();
        var test = problemData.code.replace('__', answer) + '; problem();';
        return eval(test);
    }

    // ���̃v���O�����̎��s���ʂ� true or false �Ȃ̂Ō��ʂɕ�����\��
    function checkAnswerClick() {
        if (checkAnswer()) {

            // ���ւ�<span>��<a>���擾
            var correctFlash = learnjs.template('correct-flash');

            // �����N��̃A���J�[���C���N�������g
            correctFlash.find('a').attr('href', '#problem-' + (problemNumber + 1));

            // ���ʕ\���v�f�Ɂu<span>��<a>�v���t���b�ƕ\��������
            learnjs.flashElement(resultFlash, learnjs.buildCorrectFlash(problemNumber));
        } else {
            // ���ʕ\���v�f�ɁuIncorrect!�v���t���b�ƕ\��������
            learnjs.flashElement(resultFlash, 'Incorrect!');
        }
        return false;
    }

    // �񓚃C�x���g�ݒu
    view.find('.check-btn').click(checkAnswerClick);

    // ���^�C�g���ύX
    view.find('.title').text('Problem #' + problemNumber);

    // ���̏�������
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
    //window.location.hash�v���p�e�B
    //window.location.hash�́AURL�́u#�v�L���̌�̕������擾�A�������́A�ݒ肷��v���p�e�B�B
    //learnjs.showView(window.location.hash);

    window.onhashchange = function () {
        learnjs.showView(window.location.hash);
    };
    learnjs.showView(window.location.hash);

};

// HTML�v�f��n���ăo�C���f�B���O�i�l��}���j���܂��B
learnjs.applyObject = function (obj, elem) {
    for (var key in obj) {
        elem.find('[data-name="' + key + '"]').text(obj[key]);
    }
};

// ���̓������킹���������̎��o�I����
learnjs.flashElement = function (elem, content) {
    elem.fadeOut('fast', function () {
        elem.html(content);
        elem.fadeIn();
    });
};

// template���N���[������
learnjs.template = function (name) {
    return $('.templates .' + name).clone();
};

// 
learnjs.buildCorrectFlash = function (problemNum) {
    // ���ʕ\���v�f���擾
    var correctFlash = learnjs.template('correct-flash');
    // �����N���擾
    var link = correctFlash.find('a');

    // ��肪�Ō�܂ŏo�Ă���Home�ɖ߂�A����ȊO�͎��̖��Ɉړ�
    if (problemNum < learnjs.problems.length) {
        link.attr('href', '#problem-' + (problemNum + 1));
    } else {
        link.attr('href', '');
        link.text("You're Finished!");
    }
    return correctFlash;
}

