/**
 * @module Application
 */
define([
    "framework/GelatoModel"
], function(GelatoModel) {
    return GelatoModel.extend({
        /**
         * @class UserSettings
         * @extends GelatoModel
         * @constructor
         */
        initialize: function() {
            this.on("change", this.cache);
        },
        /**
         * @method cache
         */
        cache: function() {
            localStorage.setItem(app.user.id + "-settings", JSON.stringify(this.toJSON()));
        },
        /**
         * @method sync
         * @param {Function} callback
         */
        sync: function(callback) {
            app.user.api.getUserSettings(app.user.id, function(data, status) {
                if (status === 200) {
                    app.user.settings.set(data);
                    callback();
                } else {
                    callback(data, status);
                }
            });
        }
    });
});
