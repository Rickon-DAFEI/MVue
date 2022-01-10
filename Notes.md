





### Vue

> ​	**1.聊聊对vue的理解** 
>
> >​	vue是一个渐进式的JS框架。他易用，灵活，高效;可以把一个页面分隔成多个组件;当其他页面有类似功能时，直接让封装的组件进行复用;他是构建用户界面的声明式框架，只关心图层;
> >
> >​	不关心具体是如何实现的
>
> ​	**2.V-model的原理是什么?** 
>
> > ​	Vue的双向数据绑定是由数据劫持结合发布者订阅者实现的。数据劫持是通过Object.defineProperty()来劫持对象数据的setter和getter操作。在数据变动时作你想做的事
> >
> > ​	**原理**  通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化->视图更新  在初始化vue实例时，遍历data这个对象，给每一个键值对利用Object.definedProperty对data的键值对新增get和set方法，利用了事件监听DOM的机制，让视图去改变数据
>
> ​	**3.谈谈对生命周期的理解** 
>
> >​	· beforeCreate阶段：vue实例的挂载元素el和数据对象data都是undefined，还没有初始化。
> >
> >​	· created阶段：vue实例的数据对象data有了，可以访问里面的数据和方法，未挂载到DOM，el还没有
> >
> >​	· beforeMount阶段：vue实例的el和data都初始化了，但是挂载之前为虚拟的dom节点
> >
> >​	· mounted阶段：vue实例挂载到真实DOM上，就可以通过DOM获取DOM节点
> >
> >​	·  beforeUpdate阶段：响应式数据更新时调用，发生在虚拟DOM打补丁之前，适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器
> >
> >​	· updated阶段：虚拟DOM重新渲染和打补丁之后调用，组成新的DOM已经更新，避免在这个钩子函数中操作数据，防止死循环
> >
> >​	· beforeDestroy阶段：实例销毁前调用，实例还可以用，this能获取到实例，常用于销毁定时器，解绑事件
> >
> >​	· destroyed阶段：实例销毁后调用，调用后所有事件监听器会被移除，所有的子实例都会被销毁	
>
> ​	**4.VUE和REACT有什么区别?** 
>
> > ​	react整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在react中，是单向数据流;
> >
> > ​	vue的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立Watcher来监听，当属性变化的时候，响应式的更新对应的虚拟dom。
>
> ​	**5.vuex的流程** 
>
> >​	页面通过mapAction异步提交事件到action。action通过commit把对应参数同步提交到mutation。
> >
> >​	mutation会修改state中对应的值。最后通过getter把对应值跑出去，在页面的计算属性中
> >
> >​	通过mapGetter来动态获取state中的值
>
> ​	**6.vuex有哪几种状态和属性** 
>
> > ​	· state中保存着共有数据，数据是响应式的
> >
> > ​    · getter可以对state进行计算操作，主要用来过滤一些数据，可以在多组件之间复用
> >
> > ​	· mutations定义的方法动态修改state中的数据，通过commit提交方法，方法必须是同步的
> >
> > ​	·  actions将mutations里面处理数据的方法变成异步的，就是异步操作数据，通store.dispatch来分发actions，把异步的方法写在actions中，通过commit提交mutations，进行修改数据。
> >
> > ​	· modules：模块化vuex
>
> ​	**7.vue路由的两种模式** 
>
> >​	· hash ——即地址栏URL中的#符号(此hsah 不是密码学里的散列运算) hash  虽然出现URL中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。
> >
> >​	· history ——利用了[HTML5](http://html5.tedu.cn/) History Interface 中新增的pushState() 和replaceState()  方法
> >
> >​	这两个方法应用于浏览器的历史记录站，在当前已有的back、forward、go  的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改是，虽然改变了当前的URL，但你浏览器不会立即向后端发送请求。
>
> ​	**8.vue中 key 值的作用** 
>
> ​	当 Vue.js 用v-for正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM  元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
>
> ​	key的作用主要是为了高效的更新虚拟DOM。
>
> ​	**9.$route和$router的区别** 
>
> >​	·  $route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
> >
> >​	· $router是“路由实例”对象包括了路由的跳转方法，钩子函数等。
>
> ​	**10.vue-router守卫** 
>
> >​	· 导航守卫 router.beforeEach 全局前置守卫
> >
> >​	· to: Route: 即将要进入的目标(路由对象)
> >
> >​	· from: Route: 当前导航正要离开的路由
> >
> >​	· next: Function: 一定要调用该方法来 resolve 这个钩子。(一定要用这个函数才能去到下一个路由，如果不用就拦截) 执行效果依赖  ext 方法的调用参数。
> >
> >​	· next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
> >
> >​	· next(false): 取消进入路由，url地址重置为from路由地址(也就是将要离开的路由地址)。
>
> ​	**11.axios是什么?怎么使用?描述使用它实现登录功能的流程?** 
>
> >​	请求后台资源的模块。
> >
> >​	$ npm install axios -S装好 复制代码
> >
> >​	然后发送的是跨域，需在配置文件中config/index.js进行设置。后台如果是Tp5则定义一个资源路由。js中使用import进来，然后.get或.post。返回在.then函数中如果成功，失败则是在.catch函数中
>
> ​	**12.vue修饰符** 
>
> >​	· stop：阻止事件的冒泡
> >
> >​	· prevent：阻止事件的默认行为
> >
> >​	· once：只触发一次
> >
> >​	· self：只触发自己的事件行为时，才会执行
>
> ​	**13.vue项目中的性能优化** 
>
> >​    1.不要在模板里面写过多表达式
> >
> >​	2.循环调用子组件时添加key
> >
> >​	3.频繁切换的使用v-show，不频繁切换的使用v-if
> >
> >​	4.尽量少用float，可以用flex
> >
> >​	5.按需加载，可以用require或者import()按需加载需要的组件
> >
> >​	6.路由懒加载
>
> **14. Watch和computed的用法**
>
> >computed 是基于响应性依赖来进行缓存的。只有依赖数据发生改变，才会重新进行计算（当触发重新渲染，若依赖数据没有改变，则 computed 不会重新计算）。若没改变，计算属性会立即返回之前缓存的计算结果。
> >
> >**computed 只有当依赖的数据变化时才会计算, 会缓存数据。**
> >
> >**watch 每次都需要执行函数。watch 更适用于数据变化时的异步操作。**
>
> **15. 组件通信**
>
> 父组件向子组件传递数据是通过prop传递的
>
> 子组件传递数据给父组件是通过$emit触发事件来做到的.
>
> **16.懒加载**
>
> Vue-router懒加载
> Vue-router懒加载就是按需加载组件，只有当路由被访问时才会加载对应的组件，而不是在加载首页的时候就加载，项目越大，对首屏加载的速度提升得越明显。











### JavaScipt

> 
>
> **1.数据类型**
>
> >值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol。
> >
> >引用数据类型：对象(Object)、数组(Array)、函数(Function)。
>
> **2.柯里化**
>
>  >只接受单一参数，返回函数处理余下参数
>
> **3.如何改变 this 的指向？以及三者的共同点和不同点**
>
> >call、apply、bind的异同
> >
> >    共同点：
> >        功能角度：三者都能改变this 指向，且第一个传递的参数都是 this 指向的对象。
> >        传参角度：三者都采用的后续传参的形式。
> >    不同点：
> >        传参方面： call 的传参是单个传递（序列），而 apply 后续传递的参 数是数组形式。而 bind 与call相同。
> >        执行方面： call 和 apply 函数的执行是直接执行的，而 bind 函数会返回一个函数，然后我 们想要调用的时候才会执行。
>
> **4.cookie、localstorage的区别，哪些情况和设置，请求不会携带cookie** 
>
> - localstorage 和sessionStorage 本地存储 （发送请求是不携带的）
>
> - localstorage 浏览器关闭之后不会销毁 必须手动销毁， 5M
>
> - sessionStorage 浏览器关闭之后就销毁
>
> localstorage 和 sessionStorage 不能跨域？ 不能跨域
>
> http 是无状态的，可以通过cookie 来制造状态，（浏览器设置cookie，服务端可以设置cookie）
>
> 每次发请求默认会携带cookie （不安全 数据是存在存储端的  不能存储敏感信息）
>
> session 基于cookie的 通过cookie的机制，制造一个服务端存储的空间（对象）。
>
> 重启服务就丢失了。存在缓存数据库redis中。 可以用来存储session。（多个平台共享状态）。
>
> ```
> cookie是网站为了标示用户身份存在用户本地终端上的数据（经过加密）。
> 
> cookie数据时钟在同源的http请求中携带（即使不需要），即会在浏览器和服务器之间传递。
> 
> seeeionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
> ```
>
> **5.深拷贝、浅拷贝**
>
> >* 基本数据类型是放在栈里面的，它是按值访问，在栈内存中发生复制行为时系统会为新的变量提供新值，所以两个变量互不影响 .clone()
> >* 引用数据类型是放在堆内存中的，它是按引用访问的，在栈内存中有一个地址是指向堆内存中的引用数据类型的，所以我们拷贝引用数据类型其实就是拷贝了栈内存中的地址，因为地址一样，他们都是指向同一个引用数据类型，所以两个变量会相互影响，这时就必须使用深拷贝了. 
> >
> >* ...运算符（ES6）可用于浅拷贝
> >
> >>深拷贝的递归实现
> >
> >>* 
> >
> >>  ```
> >>  functiondeepClone2(obj) {
> >>    let _obj = JSON.stringify(obj),
> >>    return JSON.parse(_obj);
> >>  }
> >>  ```
> >
> >>* 
> >
> >>```
> >>
> >>```
> >
> >>function copy(arr){
> >>var obj=arr.constructor==Array?[]:{};　　//第二种方法 var obj=arr instanceof Array?[]:{}　　//第三种方法 		 var obj=Array.isArray(arr)?[]:{}　　for(var item in arr){
> >>if(typeof arr[item]==="object"){
> >>  obj[item]=copy(arr[item]);
> >>}else{
> >>  obj[item]=arr[item];
> >>}
> >>}
> >>return obj;
> >>}
> >>var obj={a:1,b:2,c:{d:1,e:[3,4,5]}}
> >>var newobj=copy(obj);
> >>
> >>```
> >>
> >>```
> >
> >
>
> **6. 闭包**
>
> >1.函数嵌套函数，内部函数可以引用外部函数的参数和变量
> >
> >```
> >function  aaa() {
> >    var a = 5;
> >    function bbb() {
> >        alert(a)
> >    }
> >
> >    return bbb
> >}
> >var c = aaa();
> >c();
> >```
> >
> >1.希望变量长期驻扎在内存当中（一般函数执行完毕，变量和参数会被销毁）
> >
> >2.避免全局变量的污染
>
> **7.WebPack**
>
> >三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。
> >
> >WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
> >
> >把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。
> >
> >>- 体积更小（Tree-shaking、压缩、合并），加载更快
> >>- 编译高级语言和语法（TS、ES6、模块化、scss）
> >>- 兼容性和错误检查（polyfill,postcss,eslint）
> >>
> >>研发流程层面：
> >>
> >>- 1.识别入口文件
> >>- 2.通过逐层识别模块依赖。（Commonjs、amd或者es6的import，webpack都会对其进行分析。来获取代码的依赖）
> >>- 3.webpack做的就是分析代码。转换代码，编译代码，输出代码
> >>- 4.最终形成打包后的代码
> >
> >**grunt** 在一个配置文件中，指明对某些文件进行压缩、组合、检查等任务的具体步骤，然后在运行中输入相应的命令
> >
> >##### 8.vite改进 
> >
> >- Vite 将会使用 `esbuild` 预构建依赖。Esbuild 使用 Go 编写，并且比以 `Node.js` 编写的打包器预构建依赖快 10-100 倍
> >- Vite 同时利用 HTTP 头来加速整个页面的重新加载
>
> **8.**Less和Sass
>
> > **1、Less：**
> >
> >   是一种动态样式语言. 对CSS赋予了动态语言的特性，如变量、继承、运算、函数。
> >
> >   Less 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可在服务端运行。
>
> 
>
> > 2、Sass：
> >
> >   是一种动态样式语言，Sass语法属于缩排语法，
> >
> >   比css比多出好些功能(如变量、嵌套、运算,混入(Mixin)、继承、颜色处理，函数等)，更容易阅读。
>
> 

HTTPS加密原理

![image-20210608161818224](https://img-blog.csdnimg.cn/img_convert/4bf1e948001a4bf22a24f1140737f487.png)



### 基本

> * 语义化  
>
> 为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构
>
> * 解析url参数
>
> ```
> var hash = url.slice(url.indexOf("?") + 1).split('&');
> var params = []
> for (var i = 0; i < hash.length; i++) {
> 	h = hash[i].split("="); //
> 	params[h[0]] = h[1];
> 	console.log(h);
> }
> 	return params;
> }
> ```
>
> 







### Vue 源码 



![](C:\Users\1\MVue\1641795026(1).jpg)



数据=>视图

视图=>数据



MVVM



几种实现双向绑定的做法：

在单向绑定的基础上给可输入元素添加了change(input)事件，来动态修改model和view



>
>
>发布者-订阅者模式 backbone.js
>
>脏值检查 angular.js
>
>数据劫持。 vue.js



setInterval 设置定时器轮询检测数据变动。（特定事件触发时）

>
>
>DOM事件 
>
>XHR事件 （$http）
>
>Timer事件 
>
>执行$digest() 或 $apply()

### Vue 

Object.defineProperty()劫持各个属性的setter, getter 在数据变动时发布消息给订阅者，触发对应的监听回调



* 实现一个指令解析器compile
* 实现一个数据监听器 Observer
* 实现一个watcher去更新视图
* 实现一个proxy





querySelector(el)：CSS选择器类似



文档碎片对象：放入内存中减少页面的回流和重汇



[...].forEach es6语法

 node.attributes   获得元素属性的集合

{,} = Obj

.split('str')

Str.startsWith('str')



```javascript
compileUtil[dirName](node,value,this.vm,eventName)
```



```javascript
    getVal(expr,vm){//处理 调用对象中的属性 如 v-text = person.val
        return expr.split('.').reduce((data,currentVal)=>{
            console.log(currentVal);
            return data[currentVal]
        },vm.$data);
    },
```

[].reduce  reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

当reduce的第二个参数设置成0，index是从0开始的，第一个val是设置的值0

结论：当设置reduce的第二个参数时，val的初始值是reduce的第二个参数值，index从0开始；反之，val的初始值是数组的第一个元素，index从1开始！！！



```js
new Observer(this.$data);	
```





```js
this.defineReactive(data,key,data[key]);//劫持第一层
```



```js
set(newVal){//this指向有问题 修改后： set:(newVal)=>
   this.observe(newVal);//观察更新后数据
   if(newVal!==value){
        value = newVal;
   }}
```



























