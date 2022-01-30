class Watcher{
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldVal = this.getOldVal();
    }
    getOldVal(){
        Dep.target = this;
        const oldVal = compileUtil.getVal(this.expr,this.vm);
        Dep.target = null;
        return oldVal;
    }
    update(){
        const newVal = compileUtil.getVal(this.expr,this.vm);
        if(newVal !== this.oldVal){
            this.cb(newVal);                             
        }
    }
}
class Dep{
    constructor(){
        this.subs = [];
    }
    //收集观察者
    addSub(watcher){
        this.subs.push(watcher);
    }
    //通知观察者去更新
    notify(){
        // 观察者中有个update方法 来更新视图
        this.subs.forEach(w=>w.update());
    }
}
class Observer{
    constructor(data){
        this.observe(data);
    }
    observe(data){ 
        /*
        需要递归
        {
            person:{
                name:"张三";
                fav:{
                    a:"爱好"
                }
            }
        }

        */
        if(data && typeof data === 'object'){
           Object.keys(data).forEach(key=>{
               this.defineReactive(data,key,data[key]);
            //    console.log(key);
           })
        }
    }
    defineReactive(obj,key,value){
        this.observe(value);
        const dep = new Dep();
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:false,
            get(){
                //订阅数据变化时，往Dep中添加观察者
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set:(newVal)=>{
                if(newVal!==value){
                this.observe(newVal);
                    value = newVal;
                    //告诉dep通知变化
                   
                }
                dep.notify();
                
            }
        })
    }
}