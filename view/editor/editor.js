if (window.locale_lang=="ru") {
    require("./editor_ru.js");
    window._t.load({
        "Yes" : "Да",
        "Cancel" : "Отмена",
        "Preview" : "Предпросмотр",
        "Publish" : "Публиковать",
        "Editor" : "Редактор",
        "Add Section" : "Добавить блок",
        "Select component type" : "Выбрать тип блока",
        'Your page was successfully published and now is available to your customers' : 'Ваша страница теперь опубликована и на нее смогут зайти посетители',
        'Publish success' : 'Успешная публикация'
    });
}

require("./editor.css");
require("./style/font-awesome.css");

require("./ui/internal/checkbox.js");

require("./ui/internal/block.js");
require("./ui/internal/repeater.js");

require("./lib/spacedText/spacedText.js");
require("./lib/spacedText/spacedText.css");

require('./lib/datetimePicker/jquery.datetimepicker.css');
require('./lib/datetimePicker/jquery.datetimepicker.js');

require("./ui/internal/text.js");
require("./ui/internal/color.js");
require("./ui/internal/cover.js");
require("./ui/internal/logo.js");
require("./ui/internal/icon.js");
require("./ui/internal/formOrder.js");
require("./ui/internal/image.js");
require("./ui/internal/logoItem.js");
require("./ui/internal/formButton.js");
require("./ui/internal/uploadButton.js");
require("./ui/internal/fontCombo.js");
require("./ui/internal/media.js");
require("./ui/internal/countdown.js");
require("./ui/internal/galleryRepeater.js");
require("./ui/internal/overlayImage.js");
require("./ui/internal/galleryImage.js");
require("./ui/internal/background.js");
require("./ui/internal/liquid.js");

require("./lib/ymaps.js");

require("./ui/header.js");
require("./ui/order.js");
require("./ui/benefits.js");
require("./ui/services.js");
require("./ui/reasons.js");
require("./ui/gallery.js");
require("./ui/logos.js");
require("./ui/cases.js");
require("./ui/stages.js");
require("./ui/feedback.js");
require("./ui/map.js");
require("./ui/footer.js");
require("./ui/video.js");
require("./ui/textBlock.js");
require("./ui/numbers.js");
require("./ui/timer.js");

require("./ui/extra/projects.js");

var dir = require.dir;

$.fn.toggleVis = function(flag) {
    $(this).toggleClass("hidden",!flag);
    $(this).toggleClass("visible",flag);
}

exports = function(templater_app,options) {
    var app = templater_app.extend({
        init: function (o) {
            teacss.ui.Control.prototype.init.call(this,o);
            Component.app = this;
            
            if (this.options.minified_style) {   
                this.staticStyles = [dir + "/style/style.min.tea"];
            } else {                
                this.staticStyles = [dir + "/style/style.tea"];
            }
            this.styles = [];
            
            var me = this;
            teacss.jQuery(function(){
                me.request('load',{cache:0},function (data){
                    try {
                        data = data || {};

                        me.settings = {};
                        me.settings.templates = $.parseJSON(data.templates || "{}");
                        me.settings.theme = $.parseJSON(data.theme || "{}");
                        teacss.functions.settings = me.settings

                        me.components = data.components;
                        me.settings.upload = data.upload;
                    } catch (e) {
                        alert(data);
                    }
                    
                    me.initUI();
                });            
            });
            
            
            this.bind("change",function(data){
                if (me.skipSave) return;
                me.request('save',{
                    templates: JSON.stringify(me.settings.templates),
                    theme: JSON.stringify(me.settings.theme,undefined, 2)
                });
            });
            
        },
        
        initUI: function () {
            var me = this;
            this._super();
            
            this.frame.bind("init",function(){
                me.frame.$f("head").append(
                    "<link type='text/css' rel='stylesheet' href='"+dir+"/style/frame.css'>"
                );
            });

            this.frame.element.css({left:0});
            $(".editor-sidebar").detach();
            $(".preview-toolbar").width("100%");
            
            $(".preview-toolbar").append($("#beejee_info"));
            
            me.templateTabs.element.detach();
            me.view3dButton.element.detach();
            
            me.publishButton.element.css({position:'relative'});
            me.addButton = ui.button({
                label:_t("Add Section"),
                icons:{ primary: "ui-icon-plus" },
                click: function (e) { 
                    me.addSection(e);
                }
            });
            me.addButton.element.insertAfter(me.publishButton.element);
        },
        
        addSection: function (e) {
            var root = Component.previewFrame.root;
            if (!root) return;
            if (root.children.length) {
                root.children[0].addTop(e);
            } else {
                root.addInside(e);
            }
        },
        
        publish: function () {
            this.request("publish",{},function(){
                ui.alert({
                    title:_t('Publish success'),
                    text:_t('Your page was successfully published and now is available to your customers')
                });
            });
        }
    });
    app(options);
}