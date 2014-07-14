define([
    'require.text!template/study-settings.html',
    'view/View'
], function(templateStudySettings, View) {
    /**
     * @class StudySettings
     */
    var StudySettings = View.extend({
        /**
         * @method initialize
         */
        initialize: function() {
            View.prototype.initialize.call(this);
            this.activeParts = [];
            this.activeStyles = [];
            this.enabledParts = [];
        },
        /**
         * @method render
         * @returns {StudySettings}
         */
        render: function() {
            this.setTitle('Study Settings');
            this.$el.html(templateStudySettings);
            this.activeParts = skritter.user.getActiveParts();
            this.activeStyles = skritter.user.getActiveStyles();
            this.enabledParts = skritter.user.getEnabledParts();
            this.$('input.bootswitch').bootstrapSwitch();
            this.$('#general #audio').bootstrapSwitch('state', skritter.user.isAudioEnabled());
            this.$('#general #hide-due-count').bootstrapSwitch('state', skritter.user.settings.get('hideCounter'));
            this.$('#general #hide-timer').bootstrapSwitch('state', skritter.user.settings.get('hideTimer'));
            this.$('#general #hide-reading').bootstrapSwitch('state', skritter.user.settings.get('hideReading'));
            this.$('#general #raw-squigs').bootstrapSwitch('state', skritter.user.settings.get('squigs'));
            this.$('#general #teaching-mode').bootstrapSwitch('state', skritter.user.settings.get('teachingMode'));
            if (skritter.user.isChinese()) {
                this.$('#general #reading-style').bootstrapSwitch('state', skritter.user.settings.get('readingStyle') === 'pinyin' ? true : false);
            } else {
                this.$('#general #reading-style').parent().parent().parent().hide();
            }
            this.$('#parts #defn').bootstrapSwitch('state', this.activeParts.indexOf('defn') > -1);
            this.$('#parts #rdng').bootstrapSwitch('state', this.activeParts.indexOf('rdng') > -1);
            this.$('#parts #rune').bootstrapSwitch('state', this.activeParts.indexOf('rune') > -1);
            if (skritter.user.isJapanese()) {
                this.$('#parts #tone').parent().parent().parent().hide();
            } else {
                this.$('#parts #tone').bootstrapSwitch('state', this.activeParts.indexOf('tone') > -1);
            }
            this.$('#parts #defn').bootstrapSwitch('disabled', this.enabledParts.indexOf('defn') === -1);
            this.$('#parts #rdng').bootstrapSwitch('disabled', this.enabledParts.indexOf('rdng') === -1);
            this.$('#parts #rune').bootstrapSwitch('disabled', this.enabledParts.indexOf('rune') === -1);
            this.$('#parts #tone').bootstrapSwitch('disabled', this.enabledParts.indexOf('tone') === -1);
            if (skritter.user.isChinese()) {
                this.$('#styles #simp').bootstrapSwitch('state', this.activeStyles.indexOf('simp') > -1);
                this.$('#styles #trad').bootstrapSwitch('state', this.activeStyles.indexOf('trad') > -1);
            } else {
                this.$('#styles').hide();
            }
            return this;
        },
        /**
         * @property {Object} events
         */
        events: function() {
            return _.extend({}, View.prototype.events, {
                'vclick .button-cancel': 'cancel',
                'vclick .button-save': 'save'
            });
        },
        /**
         * @method cancel
         * @param {Object} event
         */
        cancel: function(event) {
            skritter.router.navigate('study', {replace: true, trigger: true});
            event.preventDefault();
        },
        /**
         * @method save
         * @param {Object} event
         */
        save: function(event) {
            this.activeParts = [];
            this.activeStyles = [];
            skritter.user.settings.set('volume', this.$('#general #audio').prop('checked') ? 1 : 0);
            skritter.user.settings.set('hideCounter', this.$('#general #hide-due-count').prop('checked'));
            skritter.user.settings.set('hideTimer', this.$('#general #hide-timer').prop('checked'));
            skritter.user.settings.set('hideReading', this.$('#general #hide-reading').prop('checked'));
            skritter.user.settings.set('squigs', this.$('#general #raw-squigs').prop('checked'));
            skritter.user.settings.set('teachingMode', this.$('#general #teaching-mode').prop('checked'));
            skritter.user.settings.set('readingStyle', this.$('#general #reading-style').prop('checked') ? 'pinyin' : 'zhuyin');
            if (this.$('#parts #defn').bootstrapSwitch('state')) {
                this.activeParts.push('defn');
            }
            if (this.$('#parts #rdng').bootstrapSwitch('state')) {
                this.activeParts.push('rdng');
            }
            if (this.$('#parts #rune').bootstrapSwitch('state')) {
                this.activeParts.push('rune');
            }
            if (this.$('#parts #tone').bootstrapSwitch('state')) {
                this.activeParts.push('tone');
            }
            if (this.activeParts.length === 0) {
                skritter.modal.show('confirm').set('.modal-header', false).set('.modal-body', 'You must enable at least one part!', 'text-center');
                return false;
            }
            if (this.$('#styles #simp').bootstrapSwitch('state')) {
                this.activeStyles.push('simp');
            }
            if (this.$('#styles #trad').bootstrapSwitch('state')) {
                this.activeStyles.push('trad');
            }
            if (this.activeStyles.length === 0) {
                skritter.modal.show('confirm').set('.modal-header', false).set('.modal-body', 'You must enable at least one style!', 'text-center');
                return false;
            }
            skritter.user.setActiveParts(this.activeParts);
            skritter.user.setActiveStyles(['both'].concat(this.activeStyles));
            skritter.user.update();
            skritter.router.navigate('study', {replace: true, trigger: true});
            event.preventDefault();
        }
    });

    return StudySettings;
});

