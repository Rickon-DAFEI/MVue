const compileUtil = {
    getVal(expr,vm){//处理 调用对象中的属性 如 v-text = person.val
        return expr.split('.').reduce((data,currentVal)=>{
          //  console.log(currentVal);
            return data[currentVal]
        },vm.$data);
    },
    text(node,expr,vm){
        let value;
        if(expr.indexOf('{{')!=-1){
          //  console.log(expr)
            //{{person.name}}-{{person.val}}
            value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
                //console.log(args,"----------");
                
                return this.getVal(args[1],vm);
            })

        }
        else{ 
            value = this.getVal(expr,vm);
        }
        
        this.updater.textUpdater(node,value)
    },
    html(node,expr,vm){
        const value = this.getVal(expr,vm);
        this.updater.htmlUpdater(node,value);
        // this.updater.appendNode(node,value)
    },

    model(node,expr,vm){
        const value = this.getVal(expr,vm);
        this.updater.modelupdater(node,value);

    },
    on(node,expr,vm,eventName){
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName,fn.bind(vm),false);
    },
    bind(node,expr,vm,eventName){
        console.log(expr);
        const value = this.getVal(expr,vm);
        // console.log(value);
        this.updater.bindUpdater(node,value,eventName);
    },
    //更新函数
    updater:{
        modelupdater(node,value){
            node.value = value;
        },
        bindUpdater(node,value,eventName){
            node.setAttribute(eventName,value);
        },
        textUpdater(node,value){
          node.textContent = value;
        },
        appendNode(node,value){
        //   node.appendChild(value);
        },
        htmlUpdater(node,value){
          node.textContent = value;
        }
    }
} 
class Compile{
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el);
        this.vm = vm;
        //console.log(this.el);
        const fragment = this.node2Fragment(this.el);
        // console.log(fragment);
        this.compile(fragment);
        //追加子元素到跟元素
        this.el.appendChild(fragment)
        
    }
    compile(fragment){
        //1.获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child=>{
            // console.log(child);
            if(this.isElementNode(child)){
                //是元素节点
                //编译元素节点
                this.compileElement(child);
                // console.log('是元素节点',child);

            }else{
                //文本节点
                //
                // this.childNodes
                this.compileText(child);
                // console.log('文本节点',child);
                
            }
            if(child.childNodes&&child.childNodes.length){
                this.compile(child);
            }
        })
    }
    compileElement(node){
        // console.log(node);
        // <div v-text='msg'></div>
        const attributes = node.attributes;
        [...attributes].forEach(attr=>{
            const {name,value} = attr;
            // console.log(name);
            if(this.isDirective(name)){
                const [,dirctive] = name.split('-')   //v-on:click
                // console.log(dirctive);
                const [dirName,tagName] = dirctive.split(':');
                // console.log(dirName)
                //更新数据 数据驱动视图
                compileUtil[dirName](node,value,this.vm,tagName)
                //删除有指令的标签上的属性
                node.removeAttribute('v-'+dirctive)
            }
            else if(this.isEventName(name)){
                let[,event] = name.split("@");
                compileUtil['on'](node,value,this.vm,event);
            }
        })
        // console.log(node)
    }
    compileText(node){
        // console.log()
        //正则匹配
        const content = node.textContent
        if(/\{\{(.+?)\}\}/.test(content)){
            compileUtil['text'](node,content,this.vm);
          //  console.log(content)
        }
    }
    isEventName(attrName){
        return (attrName.startsWith('@'));
    }
    isDirective(attrName){
        return (attrName.startsWith('v-'));
    }
    node2Fragment(el){
        //创建文档碎片对象
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            f.appendChild(firstChild);//从父节点开始添加，依次加入文档碎片对象
        }
        return f;
    }


    isElementNode(node){
        return node.nodeType === 1;  
    }
}



class MVue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if(this.$el){
            //实现数据观察者
            //实现指令解析器

            new Compile(this.$el,this);

        }
    }
}
