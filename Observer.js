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
               console.log(key);
           })
        }
    }
    defineReactive(obj,key,value){
        this.observe(value);
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:false,
            get(){
                return value;
            },
            set:(newVal)=>{
                this.observe(newVal);
                if(newVal!==value){
                    value = newVal;
                }
            }
        })
    }
}