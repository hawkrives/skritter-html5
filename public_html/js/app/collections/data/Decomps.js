/**
 * @module Skritter
 * @submodule Collections
 * @param Decomp
 * @author Joshua McFarland
 */
define([
    'models/data/Decomp'
], function(Decomp) {
    /**
     * @class DataDecomps
     */
    var Decomps = Backbone.Collection.extend({
        /**
         * @method initialize
         */
        initialize: function() {
        },
        /**
         * @property {Backbone.Model} model
         */
        model: Decomp,
        /**
         * @method insert
         * @param {Array|Object} decomps
         * @param {Function} callback
         */
        insert: function(decomps, callback) {
            skritter.storage.put('decomps', decomps, callback);
        },
        /**
         * @method loadAll
         * @param {Function} callback
         */
        loadAll: function(callback) {
            var self = this;
            skritter.storage.getAll('decomps', function(items) {
                self.add(items, {merge: true, silent: true, sort: false});
                callback();
            });
        }
    });

    return Decomps;
});