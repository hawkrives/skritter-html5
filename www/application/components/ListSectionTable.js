
/**
 * @module Application
 * @submodule Components
 */
define([
    'framework/BaseView'
], function(BaseView) {
    /**
     * @class ListSectionTable
     * @extend BaseView
     */
    var ListSectionTable = BaseView.extend({
        /**
         * @method initialize
         * @constructor
         */
        initialize: function() {
            this.fields = {name: 'Name'};
            this.list = undefined;
            this.sections = [];
        },
        /**
         * @method render
         * @returns {ListSectionTable}
         */
        render: function() {
            this.$el.html("<table class='table table-hover'><thead></thead><tbody></tbody></table>");
            return this;
        },
        /**
         * @method renderTable
         * @returns {ListSectionTable}
         */
        renderTable: function() {
            var divBody = '';
            var divHead = '';
            this.$('table tbody').empty();
            this.$('table thead').empty();
            //generates the header section
            if (this.fields) {
                divHead += '<tr>';
                for (var header in this.fields) {
                    divHead += "<th>" + this.fields[header] + "</th>";
                }
                divHead += '</tr>';
            }
            //generates the body section
            for (var i = 0, length = this.sections.length; i < length; i++) {
                var section = this.sections[i];
                divBody += "<tr id='section-" + section.id + "' class='cursor'>";
                for (var field in this.fields) {
                    var fieldValue = section[field];
                    if (field === 'rows') {
                        divBody += "<td class='section-field-" + field + "'>" + fieldValue.length + "</td>";
                    } else {
                        divBody += "<td class='section-field-" + field + "'>" + fieldValue + "</td>";
                    }
                }
            }
            this.$('table thead').html(divHead);
            this.$('table tbody').html(divBody);
            return this;
        },
        /**
         * @property {Object} events
         */
        events: function() {
            return _.extend({}, BaseView.prototype.events, {});
        },
        /**
         * @method clear
         * @returns {ListSectionTable}
         */
        clear: function() {
            this.$('table thead').empty();
            this.$('table tbody').empty();
        },
        /**
         * @method set
         * @param {Object} fields
         * @param {Object} list
         * @returns {ListSectionTable}
         */
        set: function(fields, list) {
            this.setFields(fields).setList(list);
            return this;
        },
        /**
         * @method setFields
         * @param {Object} fields
         * @returns {ListSectionTable}
         */
        setFields: function(fields) {
            this.fields = fields || {name: 'Name'};
            return this;
        },
        /**
         * @method setLists
         * @param {Object} list
         * @returns {ListSectionTable}
         */
        setList: function(list) {
            this.list = list;
            this.sections = list.sections || [];
            return this;
        }
    });

    return ListSectionTable;
});