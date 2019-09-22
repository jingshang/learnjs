describe('LearnJS', function () {
    it('can show a problem view', function () {
        learnjs.showView('#problem-1');
        expect($('.view-container .problem-view').length).toEqual(1);
    });

    it('shows the landing page view when there is no hash', function () {
        learnjs.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    });

    // 文字列を半角ハイフンで分解し、インデックス１の文字列を引数とした呼び出しが実行されたことを確認します。
    // 要するに「showView」のテスト
    it('passes the hash view parameter to the view function', function () {
        spyOn(learnjs, 'problemView');
        learnjs.showView('#problem-42');
        //【toHaveBeenCalledWith】
        //expect(A).toHaveBeenCalledWith(B)
        //スパイAがBに指定した引数で少なくとも1回呼び出されていることをexpectします
        expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });

    // problemViewのテスト（ちゃんとViewコンテナの中身書き換わるよね？ってテスト）
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
            // problam-1を表示
            var view = learnjs.problemView('1');
            // 回答に「true」を入力
            view.find('.answer').val('true');
            // 答え合わせ
            view.find('.check-btn').click();
            // 正解であること
            expect(view.find('.result span').text()).toEqual('Correct!');
        });

        it('rejects an incorrect answer', function () {
            // problam-1を表示
            var view = learnjs.problemView('1');
            // 回答に「true」を入力
            view.find('.answer').val('false');
            // 答え合わせ
            view.find('.check-btn').click();
            // 不正解であること
            expect(view.find('.result').text()).toEqual('Incorrect!');
        });
    });

});