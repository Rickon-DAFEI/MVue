const compileUtil = {
    // 获取值的方法
    getVal(expr, vm) {
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)
    },
    //设置值
    setVal(vm,expr,val){
        return expr.split('.').reduce((data, currentVal, index, arr) => {
            return data[currentVal] = val
        }, vm.$data)
    },
    //获取新值 对{{a}}--{{b}} 这种格式进行处理
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm);
        })
    },
    text(node, expr, vm) { //expr 可能是 {{obj.name}}--{{obj.age}} 
        let val;
        if (expr.indexOf('{{') !== -1) {
            // 
            val = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                //绑定watcher从而更新视图
                new Watcher(vm,args[1],()=>{           
                    this.updater.textUpdater(node,this.getContentVal(expr, vm));
                })
                return this.getVal(args[1], vm);
            })
        }else{ //也可能是v-text='obj.name' v-text='msg'
            val = this.getVal(expr,vm);
        }
        this.updater.textUpdater(node, val);

    },
    html(node, expr, vm) {
        // html处理 非常简单 直接取值 然后调用更新函数即可
        let val = this.getVal(expr,vm);
        // 订阅数据变化时 绑定watcher,从而更新函数
        new Watcher(vm,expr,(newVal)=>{
            this.updater.htmlUpdater(node, newVal);
        })
        this.updater.htmlUpdater(node,val);
    },
    model(node, expr, vm) {
        const val = this.getVal(expr,vm);
        // 订阅数据变化时 绑定更新函数 更新视图的变化

        // 数据==>视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal);
        })
        // 视图==>数据
        node.addEventListener('input',(e)=>{
            // 设置值
            this.setVal(vm,expr,e.target.value);

        },false);
        this.updater.modelUpdater(node,val);
    },
    // 对事件进行处理
    on(node, expr, vm, eventName) {
        // 获取事件函数
        let fn = vm.$options.methods && vm.$options.methods[expr];
        // 添加事件 因为我们使用vue时 都不需要关心this的指向问题,这是因为源码的内部帮咱们处理了this的指向
        node.addEventListener(eventName,fn.bind(vm),false);
    },
    // 绑定属性 简单的属性 已经处理 类名样式的绑定有点复杂 因为对应的值可能是对象 也可能是数组 大家根据个人能力尝试写一下
    bind(node,expr,vm,attrName){
        let attrVal = this.getVal(expr,vm);
        this.updater.attrUpdater(node,attrName,attrVal);
    },
    updater: {
        attrUpdater(node, attrName, attrVal){
            node.setAttribute(attrName,attrVal);
        },
        modelUpdater(node,value){
            node.value = value;
        },
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater(node,value){
            node.innerHTML = value;
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
            new Observer(this.$data);
            new Compile(this.$el,this);
            
        }
    }
}
