lp.gallery = lp.block.extendOptions({
    init: function () {
        var jq = Component.previewFrame.window.$;
        if(jq){
            jq('.fancybox:visible').lpFancybox();
        }
    },
    change: function(){		
        var jq = Component.previewFrame.window.$;      

        this.variant.find(".gallery").css({
            background: this.value.background || '',
        }); 
		
		this.variant.find(".title").toggleVis(this.value.show_title);
		this.variant.find(".title_2").toggleVis(this.value.show_title_2);
        this.variant.find(".fancybox").toggleVis(this.value.enable_fancybox);
        
        if (jq && this.value.enable_fancybox) {            
            jq(".fancybox:visible").lpFancybox();
        }
        
		
        if (this.value.variant == 1 || this.value.variant == 5 || this.value.variant == 6 || this.value.variant == 7 || this.value.variant == 8 || this.value.variant == 9 || this.value.variant == 10) {  
			this.variant.find(".img_title").toggleVis(this.value.show_image_title);
			this.variant.find(".img_desc").toggleVis(this.value.show_image_desc);
            this.variant.find(".item_list").toggleClass("no_opacity", (!this.value.show_image_title && !this.value.show_image_desc));

		}    
		if (this.value.variant == 2) {
            this.variant.find(".img_text").unbind('keyup').on('keyup', function(){
                var inner = jq(this).parent('.in');
                var overlay = jq(this).parents('.overlay');
                overlay.height(inner.outerHeight());                
            });
			this.variant.find(".img_desc").toggleVis(this.value.show_image_desc);
			this.variant.find(".item_list").toggleClass("hide_desc",!this.value.show_image_desc);
			this.variant.find(".item_list").toggleClass("hide_overlay",!this.value.show_image_overlay);
            
            var textBlockHeight = this.variant.find('.gallery_2 .item_list .item_block .item');
            jq(textBlockHeight).textBlockHeight();
		}
		if (this.value.variant == 3 || this.value.variant == 4) {			
			this.variant.find(".img_desc").toggleVis(this.value.show_image_desc);
			this.variant.find(".overlay").toggleVis(this.value.show_image_overlay);	
			
		}
        if (this.value.variant == 5){ 
            var bxslider = this.variant.find('.slider [data-name=items]');
            jq(bxslider).lpBxSlider();
        }        
        if (this.value.variant == 6) {
            var masonry = this.variant.find(".masonry");
            jq(masonry).lpMasonry();
        }

    },
    configForm: {
        items: [   
            { 
                name: "show_title", label: _t("Show first title"), type: "checkbox", width: "auto",  
                margin: "5px 49% 0px 0px",
            },
            { 
                name: "show_title_2", label: _t("Show second title"), type: "checkbox", width: "auto",  
                margin: "5px 49% 0px 0px",
            },            
            { 
                name: "show_image_title", label: _t("Show image title"), type: "checkbox", width: "auto",  
                margin: "5px 49% 0px 0px", showWhen: { variant: [1,5,6,7,8,9,10] }
            },
            { 
                name: "show_image_overlay", label: _t("Show block with text"), type: "checkbox", width: "auto",  
                margin: "5px 49% 0px 0px", showWhen: { variant: [2,3,4] }
            },
            { 
                name: "show_image_desc", label: _t("Show image description"), type: "checkbox", width: "auto",  
                margin: "5px 49% 0px 0px", showWhen: { variant: [1,5,6,7,8,9,10] }
            }, 
            { 
                name: "show_image_desc", label: _t("Show image description"), type: "checkbox", width: "auto",  
                margin: "5px 49% 0px 0px", showWhen: { variant: [2,3,4], show_image_overlay: true}
            },
			{ 
                name: "enable_fancybox", label: _t("Show big image (enable fancybox)"), type: "checkbox", width: "auto",  
                margin: "5px 49% 0px 0px", showWhen: { variant: [1,3,4,5,6,7,8,9,10] }
            },			
            { type: "label", value: _t("Background color:"), margin: "5px 0"},
            { 
                type: lp.blockColor, name: "background",  
            }
        ]
    }
});