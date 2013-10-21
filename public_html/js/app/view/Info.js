/**
 * @module Skritter
 * @submodule View
 * @param PinyinConverter
 * @param templateInfo
 * @author Joshua McFarland
 */
define([
    'PinyinConverter',
    'require.text!template/info.html',
    'backbone'
], function(PinyinConverter, templateInfo) {
    /**
     * @class InfoView
     */
    var Info = Backbone.View.extend({
        initialize: function() {
            Info.vocab = null;
            Info.sentence = null;
        },
        render: function() {
            if (!Skritter.user.isLoggedIn()) {
                document.location.hash = '';
                return;
            }
            this.$el.html(templateInfo);
            
            //set the banned and starred buttons
            if (Info.vocab.has('bannedParts')) {
                this.$('#ban-button').text('{banned}');
            }
            if (Info.vocab.get('starred')) {
                this.$('#star-button').text('{starred}');
            }
            
            //fill in the basic fields describing the vocab item
            this.$('#writing').text(Info.vocab.get('writing'));
	    this.$('#reading').text(PinyinConverter.toTone(Info.vocab.get('reading')));
            this.$('#definition').text(Info.vocab.get('definitions')[Skritter.user.getSetting('sourceLang')]);
            this.$('#sentence').text(Info.sentence.get('writing'));
            this.$('#sentence-reading').text(PinyinConverter.toTone(Info.sentence.get('reading')));
            this.$('#sentence-translated').text(Info.sentence.get('definitions')[Skritter.user.getSetting('sourceLang')]);
            
            //loop through the contained characters and display information about them
            var contained = _.uniq(Info.vocab.get('containedVocabIds'));
            console.log(contained);
	    if (contained) {
                this.$('#contained-panel .panel-body').html('');
		for (var i in contained)
		{
		    var containedVocab = Skritter.study.vocabs.findWhere({id:contained[i]});
		    var div = "<div class='contained-vocab'>";
		    div += "<span class='writing'>" + containedVocab.get('writing') + "</span>";
		    div += "<span class='reading'>" + PinyinConverter.toTone(containedVocab.get('reading')) + ": </span>";
		    div += "<span class='definition'>" + containedVocab.get('definitions').en + "</span>";
		    div += "</div>";
		    this.$('#contained-panel .panel-body').append(div);
		}
	    }
            
            return this;
        },
        events: {
            'click.Info #ban-button': 'toggleBanned',
	    'click.Info #close-button': 'goBack',
	    'click.Info #star-button': 'toggleStarred'
	},
        goBack: function() {
            window.history.back();
        },
        load: function(id) {
            Info.vocab = Skritter.study.vocabs.findWhere({id: id});
	    if (Info.vocab.get('sentenceId'))
		Info.sentence = Skritter.study.sentences.findWhere({id: Info.vocab.get('sentenceId')});
        },
        toggleBanned: function() {
            if (Info.vocab.has('bannedParts')) {
		Info.vocab.unset('bannedParts');
		this.$('#ban-button').text('{ban}');
	    } else {
		Info.vocab.set('bannedParts', ['rune','tone','defn','rdng']);
		this.$('#ban-button').text('{banned}');
	    }
        },
        toggleStarred: function() {
            if (Info.vocab.get('starred')) {
		Info.vocab.set('starred', false);
		this.$('#star-button').text('{star}');
	    } else {
		Info.vocab.set('starred', true);
		this.$('#star-button').text('{starred}');
	    }
        }
    });
    
    
    return Info;
});