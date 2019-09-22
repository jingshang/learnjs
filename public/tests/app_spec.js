describe('LearnJS', function () {
    it('can show a problem view', function () {
        learnjs.showView('#problem-1');
        expect($('.view-container .problem-view').length).toEqual(1);
    });

    it('shows the landing page view when there is no hash', function () {
        learnjs.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    });

    // ������𔼊p�n�C�t���ŕ������A�C���f�b�N�X�P�̕�����������Ƃ����Ăяo�������s���ꂽ���Ƃ��m�F���܂��B
    // �v����ɁushowView�v�̃e�X�g
    it('passes the hash view parameter to the view function', function () {
        spyOn(learnjs, 'problemView');
        learnjs.showView('#problem-42');
        //�ytoHaveBeenCalledWith�z
        //expect(A).toHaveBeenCalledWith(B)
        //�X�p�CA��B�Ɏw�肵�������ŏ��Ȃ��Ƃ�1��Ăяo����Ă��邱�Ƃ�expect���܂�
        expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });

    // problemView�̃e�X�g�i������View�R���e�i�̒��g����������ˁH���ăe�X�g�j
    describe('problem view', function () {
        it('has a title that includes the problem number', function () {
            var view = learnjs.problemView('1');
            expect(view.find('.title').text()).toEqual('Problem #1');
        });
        it('shows the description', function () {
            var view = learnjs.problemView('1');
            expect(view.find('[data-name="description"]').text()).toEqual('What is truth?');
        });

        it('shows the problem code', function () {
            var view = learnjs.problemView('1');
            expect(view.find('[data-name="code"]').text()).toEqual('function problem() {return __;}');
        });
    });


    it('invokes the router when load', function () {
        spyOn(learnjs, 'showView');
        learnjs.appOnReady();
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });

    it('subscribes to thehash change event', function () {
        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });

    describe('answer section', function () {
        it('can check a correct answer by hitting a button', function () {
            // problam-1��\��
            var view = learnjs.problemView('1');
            // �񓚂Ɂutrue�v�����
            view.find('.answer').val('true');
            // �������킹
            view.find('.check-btn').click();
            // �����ł��邱��
            expect(view.find('.result span').text()).toEqual('Correct!');
        });

        it('rejects an incorrect answer', function () {
            // problam-1��\��
            var view = learnjs.problemView('1');
            // �񓚂Ɂutrue�v�����
            view.find('.answer').val('false');
            // �������킹
            view.find('.check-btn').click();
            // �s�����ł��邱��
            expect(view.find('.result').text()).toEqual('Incorrect!');
        });
    });

});