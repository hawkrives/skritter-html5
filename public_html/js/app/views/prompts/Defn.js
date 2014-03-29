/**
 * @module Skritter
 * @submodule Views
 * @param templateDefn
 * @param Prompt
 * @author Joshua McFarland
 */
define([
    'require.text!templates/prompt-defn.html',
    'views/prompts/Prompt'
], function(templateDefn, Prompt) {
    /**
     * @class PromptDefn
     */
    var Defn = Prompt.extend({
        /**
         * @method initialize
         */
        initialize: function() {
            Prompt.prototype.initialize.call(this);
            skritter.timer.setReviewLimit(30);
            skritter.timer.setThinkingLimit(15);
        },
        /**
         * @method render
         * @returns {Backbone.View}
         */
        render: function() {
            this.$el.html(templateDefn);
            Prompt.prototype.render.call(this);
            this.$('#prompt-text').hammer().on('tap', _.bind(this.handleTap, this));
            this.resize();
            if (this.review.get('finished')) {
                this.show().showAnswer();
            } else {
                this.show();
            }
            return this;
        },
        /**
         * @method handleTap
         * @param {Object} event
         */
        handleTap: function(event) {
            if (this.review.get('finished')) {
                this.handleGradingSelected(Prompt.gradingButtons.grade());
            } else {
                this.showAnswer();
            }
            event.preventDefault();
        },
        /**
         * @method remove
         */
        remove: function() {
            this.$('#prompt-text').hammer().off();
            Prompt.prototype.remove.call(this);
        },
        /**
         * @method resize
         */
        resize: function() {
            Prompt.prototype.resize.call(this);
            if (skritter.settings.isPortrait()) {
                this.$('.prompt-container').addClass('portrait');
                this.$('.prompt-container').removeClass('landscape');
            } else {
                this.$('.prompt-container').addClass('landscape');
                this.$('.prompt-container').removeClass('portrait');
            }
            this.$('#input-section').height(skritter.settings.canvasSize());
            this.$('#input-section').width(skritter.settings.canvasSize());
            this.$('#prompt-writing').fitText(0.65, {maxFontSize: '128px'});
        },
        /**
         * @method show
         * @returns {Backbone.View}
         */
        show: function() {
            skritter.timer.start();
            this.$('#prompt-definition').html(this.review.vocab().get('definitions').en);
            if (this.review.baseItem().isNew())
                this.$('#prompt-new-tag').show();
            this.$('#prompt-reading').html(this.review.baseVocab().reading());
            this.$('#prompt-sentence').html(this.review.baseVocab().sentenceWriting());
            this.$('#prompt-style').html(this.review.baseVocab().style());
            this.$('#prompt-writing').html(this.review.baseVocab().get('writing'));
            return this;
        },
        /**
         * @method showAnswer
         * @returns {Backbone.View}
         */
        showAnswer: function() {
            skritter.timer.stop();
            this.$('.question').hide();
            this.$('.answer').show('fade', 200);
            this.$('#question-text').html('Answer:');
            Prompt.gradingButtons.show();
            this.review.set('finished', true);
            return this;
        }
    });

    return Defn;
});