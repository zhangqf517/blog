<h1><center> 常用js </center></h1>





## 常用正则

##### 邮箱：

```javascript
var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
```







## 数组操作

##### 判断是否为数组：

```javascript
Array.isArray([]);//true
[] instanseof Array;//true
({}).toString.apply([])==='[object Array]';//true
[].construtor === Array;//true
```



##### 排序：(小到大，原数组被修改)

```javascript
arr.sort(function(a,b){
    return a-b
})
```

##### 拼接：（可数组合并,原数组不会被修改）

```javascript
let arr[1,2,3];
arr.concat(4,5);		//[1,2,3,4,5]
arr;					//[1,2,3]

arr.concat([10,11],13);	//[1,2,3,10,11,13]
arr.concat([1,[2,3]]);	//[1,2,3,1,[2,3]]
```

##### 截取：（左闭右开区间，原数组未修改）

```javascript
let arr[1,2,3,4,5];
arr.slice(1,3);		//[2,3]
arr.slice(1);		//[2,3,4,5]
arr.slice(1,-1);	//[2,3,4]
arr.slice(-4,-3);	//[2]
```

##### 拼接：（元素组被修改）

```javascript
let arr[1,2,3,4,5]
arr.splice(2)			//return [3,4,5]
arr;					//[1,2]

arr.splice(2,2);		//return [3,4]
arr;					//[1,2,5]

arr.splice(1,1,'a','b');//return [2]
arr;					//[1,'a','b',3,4,5]
```

##### 遍历：

```javascript
let arr[1,2,3,4,5];
arr.foreach(function(x,index,a){
    console.log(`${{x}}|${{index}}|${{a===arr}}`)	//1|0|true
    //值，下标，指向数组本身
})
```

##### 映射：（原数组不修改）

```javascript
let arr[1,2,3];
arr.map(function(x){
	return x+10
})		//[11,12,13]
arr;	//[1,2,3]
```

##### 过滤：（不改变原数组）

```javascript
let arr[1,2,3,4,5,6,7,8,9];
arr.filter(function(x,index){
    return index % 3 === 0 || x >= 7; 
})			//return [1,4,7,8,9]
arr;		//[1,2,3,4,5,6,7,8,9]
```

##### 判断：

```javascript
let arr[1,2,3,4,5]
arr.every(function(x){
    return x<10
})			//true
arr.every(function(x){
    return x<3
})			//false

arr.some(function(x){
    return x===3
})			//true
arr.some(function(x){
    return x===300
})			//false
```

两两操作：

```javascript
let arr[1,2,3];
let sum = arr.reduce(function(x,y){
    return x + y
},0);		//6			没有第二个参数默认从数组前两个参数开始执行
arr;//[1,2,3]

let max = arr.reduce(function(x,y){
    return x > y ? x : y;
})				//1|2,,,,,2|3
max;			//3

let max = arr.reduceRight(function(x,y){
    return x > y ? x : y;
})				//3|2,,,,,3|1
max;			//3
```

检索：

```javascript
let arr = [1,2,3,2,1];
arr.indexOf(2);			//1
arr.indexOf(99);		//-1
arr.indexOf(1,1);		//4
arr.indexOf(1,-3);		//4
arr.indexOf(2,-1);		//-1
arr.lastIndexOf(2);		//3
arr.lastIndexOf(2,-2);	//3
arr.lastIndexOf(2,-3);	//1
```

