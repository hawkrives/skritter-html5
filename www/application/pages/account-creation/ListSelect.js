/**
 * @module Application
 */
define([
    'framework/BasePage',
    'require.text!templates/desktop/account-creation/list-select.html'
], function(BasePage, TemplateDesktop) {
    /**
     * @class PageListSelect
     * @extends BasePage
     */
    var PageListSelect = BasePage.extend({
        /**
         * @method initialize
         */
        initialize: function() {
            this.title = 'List Select';
            this.lists = [];
            this.listsFiltered = undefined;
        },
        /**
         * @method render
         * @returns {PageListSelect}
         */
        render: function() {
            this.$el.html(this.compile(TemplateDesktop));
            this.elements.listsContainer = this.$('.lists-container');
            this.elements.listTable = this.$('#list-table');
            this.elements.loadingBox = this.$('.loading-box');
            this.elements.searchBox = this.$('#search-box');
            this.loadLists();
            return this;
        },
        /**
         * @method renderListTable
         * @returns {PageListSelect}
         */
        renderListTable: function() {
            var divBody = '';
            var lists = this.getLists();
            for (var i = 0, length = lists.length; i < length; i++) {
                var list = lists[i];
                divBody += "<tr id='list-" + list.id + "' class='list'>";
                divBody += "<td class='list-image'><img src='http://www.skritter.com/vocab/listimage?list=" + list.id + "' alt=''></td>";
                divBody += "<td class='list-name'>" + list.name + "</td>";
                divBody += "</tr>";

            }
            this.elements.listTable.find('tbody').html(divBody);
            return this;
        },
        /**
         * @method events
         * @returns {Object}
         */
        events: _.extend({}, BasePage.prototype.events, {
            'vclick .list': 'handleListClicked',
            'vclick .recommended-list': 'handleRecommendedClicked',
            'keyup #search-box': 'handleSearchBoxChanged'
        }),
        /**
         * @method filterLists
         * @param {Object} criteria
         * @returns {PageListSelect}
         */
        filterLists: function(criteria) {
            this.listsFiltered = _.filter(this.lists, function(list) {
                for (var criterion in criteria) {
                    if (Array.isArray(list[criterion])) {
                        var normalizedArray = list[criterion].map(app.fn.toLowerCase);
                        if (normalizedArray.indexOf(criteria[criterion]) > -1) {
                            return true;
                        }
                    } else {
                        if (list[criterion].toLowerCase().indexOf(criteria[criterion].toLowerCase()) > -1) {
                            return true;
                        }
                    }
                }
            });
            return this;
        },
        /**
         * @method getLists
         * @returns {Array}
         */
        getLists: function() {
            return this.listsFiltered ? this.listsFiltered : this.lists;
        },
        /**
         * @method handleListClicked
         */
        handleListClicked: function(event) {
            event.preventDefault();
            var list = _.find(this.lists, {id: event.currentTarget.id.replace('list-', '')});
            app.api.setGuest('list', list.id);
            app.dialogs.show('list-confirmation');
            app.dialogs.element('.list-name').text(list.shortName);
            app.dialogs.element('.list-image').html("<img src='http://www.skritter.com/vocab/listimage?list=" + list.id + "' alt=''>");
            app.dialogs.element('.list-description').html(list.description);
            app.dialogs.element('.list-categories').text(list.categories.join(', '));
            app.dialogs.element('.list-studying').text(list.peopleStudying);
            app.dialogs.element('.select').on('vclick', this.handleListSelected);
        },
        /**
         * @method handleListSelected
         */
        handleListSelected: function(event) {
            event.preventDefault();
            app.router.navigate('getting-started/signup', {trigger: true});
        },
        /**
         * @method handleRecommendedClicked
         */
        handleRecommendedClicked: function(event) {
            event.preventDefault();
            this.elements.searchBox.val($(event.currentTarget).data('search'));
            this.handleSearchBoxChanged(event);
        },
        /**
         * @method handleSearchBoxChanged
         */
        handleSearchBoxChanged: function(event) {
            event.preventDefault();
            var searchText = this.elements.searchBox.val();
            this.filterLists({
                categories: searchText,
                name: searchText,
                shortName: searchText
            });
            this.renderListTable();
        },
        /**
         * @method initialListFilter
         * @param {Object} list
         * @returns {Boolean}
         */
        initialListFilter: function(list) {
            return list.categories.length;
        },
        /**
         * @method loadLists
         * @returns {PageListSelect}
         */
        loadLists: function() {
            var self = this;
            this.elements.listsContainer.hide();
            app.api.getVocabLists({
                sort: 'official',
                lang: app.api.getGuest('lang') ? app.api.getGuest('lang') : 'zh'
            }, function(lists) {
                self.lists = _.filter(lists, this.initialListFilter);
                self.sortLists();
                self.renderListTable();
                self.elements.loadingBox.hide();
                self.elements.listsContainer.show();
            }, function(error) {
                console.error(error);
            });
            return this;
        },
        /**
         * @method sortLists
         * @returns {PageListSelect}
         */
        sortLists: function() {
            this.lists = _.sortBy(this.lists, function(list) {
                return list.name;
            });
            return this;
        }
    });

    return PageListSelect;
});