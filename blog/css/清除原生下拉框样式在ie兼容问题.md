### 原生下拉框样式***<u>ie</u>***兼容问题

下面三行代码可清除火狐，chrome以及ie10以下版本的原生下拉框样式

```css

 select{
  appearance:none;
  -webkit-appearance:none;
  -moz-appearance: none;
 }
```

但是在我的电脑自带的ie11上失效了。。。。。

下方代码可清除在ie11上面的默认样式，不仅限于select

```css
select::-ms-expand {
   display: none;
 }
```

同时今天还碰到另一个问题，代码中写的颜色 #00000000  在ie中竟然也不能识别。。。必须要转化成rgba（0，0，0，0）才阔以。

