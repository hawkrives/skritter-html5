/**
 * @module Application
 */
define([
    "framework/BaseModel",
    "application/Strokes"
], function(BaseModel, Strokes) {
    /**
     * @class Assets
     * @extends BaseModel
     */
    var Assets = BaseModel.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {
            this.audio = new Audio();
            this.strokes = {};
            this.loadAll();
        },
        /**
         * @method getStroke
         * @param {Number} strokeId
         * @returns {createjs.Shape}
         */
        getStroke: function(strokeId) {
            return this.strokes[strokeId].clone(true);
        },
        /**
         * @method loadAll
         * @returns {Assets}
         */
        loadAll: function() {
            this.loadStrokes();
            return this;
        },
        /**
         * @method loadStrokes
         * @returns {Assets}
         */
        loadStrokes: function() {
            var data = Strokes.getData();
            this.strokes = {};
            for (var strokeId in data) {
                var stroke = data[strokeId]("#000000");
                stroke.name = "stroke-" + strokeId;
                this.strokes[strokeId] = stroke;
            }
            return this;
        },
        /**
         * @method playAudio
         * @param {String} value
         */
        playAudio: function(value) {
            if (app.isNative() && plugins.expansion) {
                plugins.expansion.media.play(decodeURIComponent(value));
            } else {
                if (this.audio.paused) {
                    this.audio.src = value;
                    this.audio.play();
                }
            }
        }
    });

    return Assets;
});