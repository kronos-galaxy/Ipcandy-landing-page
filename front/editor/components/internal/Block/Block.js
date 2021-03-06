require("./Block.tea");
const {Dialog} = require("../Dialog/Dialog");

const ValueContext = preact.createContext({name:"",value:{}});
const BlockContext = preact.createContext(false);

class Block extends preact.Component {
    static register(clsName,cls) {
        Block.list = Block.list || {};
        Block.list[clsName] = cls;
        cls.id = clsName;
        cls.currentScript = lpcandyRun.currentScript;
    }

    constructor(props) {
        super(props);

        this.configButton = preact.createRef();
        this.configDialog = preact.createRef();
        this.variantValues = {}

        this.variantCount = 0;
        while (this['tpl_'+(this.variantCount+1)]) this.variantCount++;

        this.setValue(props.value);
    }

    shouldComponentUpdate(nextProps) {
        var res = nextProps.value != this.props.value || Editor.instance.state.preview != this.preview;
        this.preview = Editor.instance.state.preview;
        return res;
    }    

    setValue(val) {
        var variant = val.variant || 1;
        var def_f = this['tpl_default_'+variant] || (() => {});
        var defaultValue = def_f();
        var fullValue = {...{variant},...defaultValue,...val};
        
        this.defaultValue = defaultValue;
        this.value = fullValue;
    }

    editorChange(fullName,val,cb) {
        function shallowClone(o) {
            if(!o || "object" !== typeof o) return o || {};
            var c = "function" === typeof o.pop ? [] : {};
            for(var p in o) {
                if(o.hasOwnProperty(p)) c[p] = o[p];
            }
            return c;
        }

        var ret = shallowClone(this.value);
        var current = ret;

        var parts = fullName.split(".");
        parts.forEach((part,i)=>{
            if (parts.length==i+1) {
                current[part] = val;
            } else {
                current[part] = shallowClone(current[part]);
            }
            current = current[part];
        });
        this.value = ret;
        Editor.instance.blockChanged(this,cb);
    }


    prev() {
        var newVariant = (this.value.variant - 2 + this.variantCount) % this.variantCount + 1;
        this.setVariant(newVariant);
    }

    next() {
        var newVariant = (this.value.variant % this.variantCount) + 1;
        this.setVariant(newVariant);
    }

    setVariant(variant) {
        this.variantValues[this.value.variant] = this.value;
        this.setValue({
            ...(this.variantValues[variant] || { type:this.value.type, id:this.value.id }),
            variant
        });
        Editor.instance.blockChanged(this);
    }

    remove() {
        Dialog.confirm({title:_t("Remove confirmation"),text:_t("Sure to remove component?")},(res) => {
            if (res) Editor.instance.removeBlock(this);
        })
    }

    configForm() {
        return false;
    }

    bg_style(bg) {
        if (bg.url)
            return `background:url("${config.base_url}/${bg.url}")`;
        else
            return `background:${bg.color}`;
    }    

    render(props,state) {
        var variant = this.value.variant;
        var tpl_f = this['tpl_'+variant] || (() => html`<div>Unsupported variant ${variant}</div>`);

        var configForm = this.configForm();
        if (configForm) {
            configForm.ref = this.configDialog;
            configForm.props.title = configForm.props.title || _t("Settings");
        }

        return html`
        <${BlockContext.Provider} value=${this}>
        <${ValueContext.Provider} value=${{name:"",value:this.value,defaultValue:this.defaultValue}}>
            <div class="lp-block" id=${this.value.id}>
                ${tpl_f.call(this,this.value,props,state)}
                ${ !Editor.instance.state.preview && html`
                    <div class='cmp-controls'>
                        ${ this.variantCount > 1 && html`
                            <div class='fa fa-chevron-left lp-button' onClick=${()=>this.prev()} />
                            <div class='fa fa-chevron-right lp-button' onClick=${()=>this.next()} />
                            <div class='lp-variant-label'>
                                ${variant}/${this.variantCount}
                            </div>
                        `}
                        ${ configForm && html`
                            <div 
                                ref=${this.configButton} 
                                class='fa fa-gear lp-button right' 
                                onClick=${
                                    () => {
                                        let dlg = this.configDialog.current;
                                        let rect = this.configButton.current.getBoundingClientRect();
                                        dlg.open({x:rect.x-dlg.props.width+rect.width-1,y:rect.y});
                                    }
                                } 
                            />
                        `}
                        <div class='fa fa-arrows lp-button right' onMouseDown=${(e)=>Editor.instance.draggableMouseDown(e,this)} />
                        <div class='fa fa-trash-o lp-button right' onClick=${()=>this.remove()} />
                    </div>
                `}
            </div>
            ${ !Editor.instance.state.preview && configForm }
        <//>
        <//>
        `;
    }
}

exports.BlockContext = BlockContext;
exports.ValueContext = ValueContext;
exports.Block = Block;