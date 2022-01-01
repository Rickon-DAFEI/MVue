class Compile{
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el);
        this,vm = vm;
        //console.log(this.el);
        const fragment = this.node2Fragment(this.el);
        console.log(fragment);
        this.compile(fragment);
        //追加子元素到跟元素
        this.el.appendChild(fragment)
        
    }
    compile(fragment){
        //1.获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child=>{
            console.log(child);
            if(this.isElementNode(child)){
                //是元素节点
                //编译元素节点
                console.log('是元素节点',child);

            }else{
                //文本节点
                //
                console.log('文本节点',child);
                
            }
            if(child.childNodes&&child.childNodes.length){
                this.compile(child);
            }
        })
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