## 类型判别
### True or False:
+ 任意值与布尔值比较，都会将两边的值转化为Number。 
如arr与false比较，false转化为0，而arr为空数组，也转化为0.
+ 被当作*假* 的值：
  + `false`
  + `null`
  + `空字符串`
  + `0`
  + `NaN`
+ 其他所有值都被当作真，包括true、字符串"false"，以及所有的对象。
### TypeOf:
+ typeof 运算符产生的值有：
  + `number`
  + `string`
  + `boolean`
  + `undefined`
  + `function`
  + `object`
+ 如果运算数是一个数组或null，那么结果是`object`


## Html5新特性
+ 语义化标签
  ```java
  从 <div id="header"></div>     到 <header>
  从 <div id="menu"></div>       到 <nav>
  从 <div id="content"></div>    到 <section>
  从 <div class="article"></div> 到 <article>
  从 <div id="footer"></div>     到 <footer>
  ```
+ 增强型表单
  ```js
  多个input输入类型：
    1.color: 用于选取颜色
    2.date: 从一个日期选择器选择一个日期
    3.datetime: 选择一个日期（UTC 时间）
    4.datetime-local: 选择一个日期和时间 (无时区)
    5.email: 包含 e-mail 地址的输入域
    6.month: 选择一个月份
    7.number: 数值的输入域
    8.range: 一定范围内数字值的输入域
    9.search: 用于搜索域
    10.tel: 定义输入电话号码字段
    11.time: 选择一个时间
    12.url: URL 地址的输入域
    13.week: 选择周和年
  ```
+ 音频和视频
  ```js
  audio 元素:

    <audio controls>
      <source src="horse.ogg" type="audio/ogg">
      <source src="horse.mp3" type="audio/mpeg">
      您的浏览器不支持 audio 元素。
    </audio>

  video 元素:

    <video width="320" height="240" controls>
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
    您的浏览器不支持Video标签。
    </video>
  ```
+ Canvas绘图
+ SVG绘图
+ 地理位置
  + 获取用户地理位置：
  ```js
  navigator.geolocation.getCurrentPosition(
    function(pos){
　　　　console.log('用户定位数据获取成功')
　　　　//console.log(arguments);
　　　　console.log('定位时间：',pos.timestamp)
　　　　console.log('经度：',pos.coords.longitude)
　　　　console.log('纬度：',pos.coords.latitude)
　　　　console.log('海拔：',pos.coords.altitude)
　　　　console.log('速度：',pos.coords.speed)
    },    //定位成功的回调
    function(err){ 
    　　　　console.log('用户定位数据获取失败')
    　　　　//console.log(arguments);
    }        //定位失败的回调
  )
  ```
+ 拖放API
+ Web Worker
+ Web Storage
  + 客户端存储数据的两个对象:
    ```js
    localStorage - 没有时间限制的数据存储
    sessionStorage - 针对一个 session 的数据存储, 当用户关闭浏览器窗口后，数据会被删除。
    ```
  + 二者通用API:
    ```js
    保存数据：localStorage.setItem(key,value);
    读取数据：localStorage.getItem(key);
    删除单个数据：localStorage.removeItem(key);
    删除所有数据：localStorage.clear();
    得到某个索引的key：localStorage.key(index);
    ```
+ Web Socket

  + 在单个 TCP 连接上进行全双工通讯的协议。在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。

## JS操作
+ new
  + new 操作符新建了一个空对象，这个对象原型指向构造函数的prototype，执行构造函数后返回这个对象。



+ 垃圾回收机制
  + 标记清除:
    + 当变量进入环境时，就标记这个变量为“进入环境”,从逻辑上讲，永远不能释放进入环境的变量所占的内存，永远不能释放进入环境变量所占用的内存，只要执行流程进入相应的环境，就可能用到他们。当离开环境时，就标记为“离开环境”。删除所有被标记的变量，删除的变量无法在环境变量中被访问，最后垃圾回收器，完成了内存的清除工作，并回收他们所占用的内存。
  + 引用计数法:
    + 引用计数法的意思就是每个值没引用的次数，当声明了一个变量，并用一个引用类型的值赋值给改变量，则这个值的引用次数为1,；相反的，如果包含了对这个值引用的变量又取得了另外一个值，则原先的引用值引用次数就减1，当这个值的引用次数为0的时候，说明没有办法再访问这个值了，因此就把所占的内存给回收进来，这样垃圾收集器再次运行的时候，就会释放引用次数为0的这些值。



+ 事件流
  事件流描述的是从页面中接收事件的顺序,DOM2级事件流包括:
  + 事件捕获阶段
  + 处于目标阶段
  + 事件冒泡阶段



+ ==和===、以及Object.is的区别
  + ==：等同，比较运算符，两边值类型不同的时候，先进行类型转换，再比较；
  + ===：恒等，严格比较运算符，不做类型转换，类型不同就是不等；
  + Object.is()是ES6新增的用来比较两个值是否严格相等的方法，与===的行为基本一致。

  + 区别：
  ```js
  +0 === -0  //true
  NaN === NaN  //false

  Object.is(+0,-0)  //false
  Object.is(NaN,NaN)  //true
  ```



+ 实现一个bind函数
  通过apply或者call方法来实现。
  ```js
  Function.prototype.bind = function (obj,arg) {
    var arg = Array.prototype.slice.call(arguments,1);
    var context = this;
    var bound = function (newArg) {
      arg = arg.concat(Array.prototype.slice.call(newArg));
      return context.apply(obj,arg);
    }
    //因为在new 一个bind过生成的新函数的时候，必须的条件是要继承原函数的原型,这里需要一个寄生组合继承.
    var F = function () {}
    F.prototype = context.prototype;
    bound.prototype = new F();
    return bound;
  }
  ```



+ 将伪数组arguments转化为数组
  ```js
  arr = Array.prototype.slice.call(arr);
  ```



+ setTimeout、setInterval和requestAnimationFrame之间的区别
  + https://www.cnblogs.com/xiaohuochai/p/5777186.html



+ 防抖（Debouncing）和节流（Throttling）
  + https://www.cnblogs.com/coco1s/p/5499469.html




## 渲染流程有四个主要步骤：

1. **解析HTML生成DOM树** - 渲染引擎首先解析HTML文档，生成DOM树
2. **构建Render树** - 接下来不管是内联式，外联式还是嵌入式引入的CSS样式会被解析生成CSSOM树，根据DOM树与CSSOM树生成另外一棵用于渲染的树-渲染树(Render tree)，
3. **布局Render树** - 然后对渲染树的每个节点进行布局处理，确定其在屏幕上的显示位置
4. **绘制Render树** - 最后遍历渲染树并用UI后端层将每一个节点绘制出来



## Ajax
### ajax返回的状态:
```js
0 － （未初始化）还没有调用send()方法

1 － （载入）已调用send()方法，正在发送请求

2 － （载入完成）send()方法执行完成，已经接收到全部响应内容

3 － （交互）正在解析响应内容

4 － （完成）响应内容解析完成，可以在客户端调用了
```



### 实现ajax请求
  ```js
    var xhr = new XMLHttpRequest();
      xhr.open('get', 'aabb.php', true);
      xhr.send(null);
      xhr.onreadystatechange = function() {
      if(xhr.readyState==4) {
        if(xhr.status==200) {
          console.log(xhr.responseText);
        }
      }
    }
  ```



## 面经：
  + https://www.nowcoder.com/discuss/165786
  + https://www.nowcoder.com/discuss/337035
