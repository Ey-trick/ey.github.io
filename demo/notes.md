# 简书的复刻
### Day 1
> 首页导航栏`nav`的搭建。

1. 个人比较熟悉的一种导航框架：
```
     <div>
        <a>
            <img>
        </a>
        <ul>
            <li>
                <img>
                <a></a>
            </li>
            <li>
                <a></a>
            </li>
            <li>
                <form>
                    <input type="text">
                </form>
            </li>
            <li>
                <a href="#"></a>
            </li>
            <li>
                <a href="#"></a>
            </li>
            ...
        </ul>       
```
然后设置ul的display为flex，可以将所有li横向排列，这样在li里设置html标签就能铺展导航栏。

2. 收获到的知识点：
+ `positio`的`absolute`属性,是相对于父元素定位，且该父元素的`position`属性不是`static`(默认值)。

> 故为了使`input`能够居于父元素`form`中间，消除上边距影响；给`input`一个`absolute`的`position`,同时form也使用`position：absolute`。

### DAy 2
> 轮播图的制作。

search过的知识点：
+ `HTML DOM setInterval()`方法
+ `JavaScript parseInt()` 函数
+ ` onmousemove, onmouseenter 和 onmouseover` 事件
[demo讲解三者区别](http://www.runoob.com/try/try.php?filename=tryjsref_onmousemove_over_enter "RUNOOB.COM")

> 轮播图的实现
1. `js`代码注释已写在`app.js`。 
2. 遇到的问题：
  + 最初`.tab`写在`.rollpic`外部，鼠标悬停事件在底层`button`上作用不到，便将其写入内部，更改CSS样式
  + 在底层`.tab`上选择序列后移走鼠标，会有图片播放错乱出现。于是在`.tab`鼠标悬浮事件的函数末尾加入当前索引赋值给滚动播放做记录的`flag`。

### Day 3
**Section 1.**
> 主页面的完善

**遇到的问题 & 学到的新知识：**
+ `a.degree:hover .append{}`的`CSS`样式不起作用。
**原因：**`.append`是`.degree`的兄弟元素，上面写法是父子选择器。
**解决：**`a.degree:hover+.append{}`[‘+’是相邻选择器]。
+ 一个块区的内部元素的定位：
**套路：**可以设置其父元素`position:relative`CSS样式，再给自己设置`position:absolute`。
**原理：**`absolute`是相对于`position`属性值不为`static`（默认值）的父元素定位。
+ 导航栏随浏览窗口变小的布局错乱：
**原因：**固定宽度+百分比宽度会导致页面过宽引发换行。
**解决：**将`width、margin、padding`都设置为百分比。
+ CSS属性声明顺序。
推荐的样式编写顺序：
  1. Positioning
  2. Box model
  3. Typographic
  4. Visual
  > 举个栗子：
  ```
  .declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc */
  opacity: 1;
  }
  ```
+ 变量声明符`let`和`var`的区别：
  > 1. `let`和`var`的区别体现在作用域上。`var`的作用域被规定为一个函数作用域，而`le`t则被规定为块作用域，块作用域要比函数作用域小一些，但是如果两者既没在函数中，也没在块作用域中定义，那么两者都属于全局作用域。
  > 2. **全局作用域**: 被`let`声明的变量不会作为全局对象`window`的属性，而被`var`声明的变量却可以。
  > 3. **函数作用域**: `var` 和 `let` 在函数作用域中声明一个变量，两个变量的意义是相同的。
  > 4. **块作用域**: [栗子] `let`只在`for()`循环中可用，而 `var`是对于包围`for()`循环的整个函数可用。
  > 5. **重新声明**：`var`允许在同一作用域中声明同名的变量，而`let`不可以。
  > 6. **总结**：为了降低变量污染的风险，在块作用域中使用`let`来代替`var`，这样不会污染块作用域的外部作用域，降低 `bug`率，使代码更安全。
+ **闭包**：
  > 嵌套的函数可以访问在其外部声明的变量。
  > `JavaScript`中的函数会形成闭包。 闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。

  栗子1：
  ```
  function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
  }

  var myFunc = makeFunc();
  myFunc();
  ```
  > 当` myFunc `被调用时，`name `仍可被访问，其值` Mozilla `就被传递到`alert`中。

  栗子2：
  ```
  function makeAdder(x) {
  return function(y) {
    return x + y;
  };
  }

  var add5 = makeAdder(5);
  var add10 = makeAdder(10);

  console.log(add5(2));  // 7
  console.log(add10(2)); // 12
  ```
  > 定义了` makeAdder(x) `函数，它接受一个参数` x `，并返回一个新的函数。返回的函数接受一个参数` y`，并返回`x+y`的值。从本质上讲，`makeAdder `是一个函数工厂 — 他创建了将指定的值和它的参数相加求和的函数。`add5 `和` add10` 都是闭包。

  栗子3：(在循环中创建闭包：一个常见错误)
  ```
  function showHelp(help) {
    document.getElementById('help').innerHTML = help;
  }

  function setupHelp() {
    var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
      var item = helpText[i];
      document.getElementById(item.id).onfocus = function() {
        showHelp(item.help);
      }
    }
  }

  setupHelp();
  ```
  > 赋值给 onfocus 的是闭包。这些闭包是由他们的函数定义和在 setupHelp 作用域中捕获的环境所组成的。这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量item。当onfocus的回调执行时，item.help的值被决定。由于循环在事件触发之前早已执行完毕，变量对象item（被三个闭包所共享）已经指向了helpText的最后一项。

  改进：
  1. 使用了匿名闭包
  ```
  function showHelp(help) {
    document.getElementById('help').innerHTML = help;
  }

  function setupHelp() {
    var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
      (function() {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = function() {
          showHelp(item.help);
        }
      })(); // 马上把当前循环项的item与事件回调相关联起来
    }
  }

  setupHelp();
  ```
  2. 避免使用过多的闭包，可以用let关键词：
  ```
  function showHelp(help) {
    document.getElementById('help').innerHTML = help;
  }

  function setupHelp() {
    var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
      let item = helpText[i];
      document.getElementById(item.id).onfocus = function() {
        showHelp(item.help);
      }
    }
  }

  setupHelp();
  ```

**Section 2.**
> 瀑布流的实现

+ 查阅的知识：
  + `document.creatElement`
  + `appendChild()`