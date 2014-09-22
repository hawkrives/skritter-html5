/**
 * @module Application
 */
define([
    'prompts/Prompt',
    'require.text!templates/desktop/prompts/prompt-rdng.html'
], function(Prompt, DesktopTemplate) {
    /**
     * @class PromptRdng
     * @extends {Prompt}
     */
    var PromptRdng = Prompt.extend({
        /**
         * @method initialize
         * @param {Object} [options]
         * @param {PromptController} controller
         * @param {DataReview} review
         * @constructor
         */
        initialize: function(options, controller, review) {
            Prompt.prototype.initialize.call(this, options, controller, review);
        },
        /**
         * @method render
         * @returns {PromptRdng}
         */
        render: function() {
            this.$el.html(this.compile(DesktopTemplate));
            Prompt.prototype.render.call(this);
            app.timer.setLimits(30, 15);
            this.canvas.hideGrid().hide();
            if (this.review.isAnswered()) {
                this.renderAnswer();
            } else {
                this.renderQuestion();
            }
            return this;
        },
        /**
         * @method renderAnswer
         * @returns {PromptRdng}
         */
        renderAnswer: function() {
            this.gradingButtons.select(this.review.getAt('score')).show();
            this.review.setAt('newInterval', 1000);
            this.elements.fieldReading.text(this.vocab.getReading());
            this.elements.fieldQuestion.hide();
            return this;
        },
        /**
         * @method renderQuestion
         * @returns {PromptRdng}
         */
        renderQuestion: function() {
            this.gradingButtons.hide();
            this.elements.fieldDefinition.text(this.vocab.getDefinition());
            this.elements.fieldWriting.text(this.vocab.getWriting());
            this.elements.fieldQuestion.text(app.strings.prompt['reading-question']);
            return this;
        },
        /**
         * @method handlePromptClicked
         */
        handlePromptClicked: function() {
            if (this.review.isAnswered()) {
                this.gradingButtons.triggerSelected();
                this.next();
            } else {
                this.renderAnswer();
            }
        },
        /**
         * @method resize
         * @returns {PromptRdng}
         */
        resize: function() {
            Prompt.prototype.resize.call(this);
            var canvasSize = this.canvas.getWidth();
            var contentHeight = app.router.currentPage.getContentHeight();
            var contentWidth = app.router.currentPage.getContentWidth();
            if (app.isPortrait()) {
                this.$el.css({
                    height: contentHeight,
                    width: contentWidth
                });
            } else {
                this.$el.css({
                    height: canvasSize,
                    width: contentWidth
                });
            }
            return this;
        }
    });

    return PromptRdng;
});
