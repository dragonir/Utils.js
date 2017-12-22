/****************************************************************************
名称：常用工具函数集合
作者：dragonir
日期：2017年12月16日
****************************************************************************/

var Util = {
	
	/************************************************************************
	* Arrays
	************************************************************************/
	
	// arrayMax: 返回数组中的最大值
	// 将Math.max()与扩展运算符 (...) 结合使用以获取数组中的最大值。
	arrayMax: arr => Math.max(...arr),

	// arrayMin: 返回数组中的最小值
	// 将Math.min()与扩展运算符 (...) 结合使用以获取数组中的最小值。
	arrayMin: arr => Math.min(...arr),

	// chunk: 将数组块划分为指定大小的较小数组。
	// 使用Array.from()创建新的数组, 这符合将生成的区块数。使用Array.slice()将新数组的每个元素映射到size长度的区块。如果原始数组不能均匀拆分, 则最终的块将包含剩余的元素。
	chunk: (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i*size, i*size+size)),

	// compact: 从数组中移除 falsey 值。
	// 使用Array.filter()筛选出 falsey 值 (false、null、0、""、undefined和NaN).
	compact: arr => arr.filter(Boolean),

	// countOccurrences: 计算数组中值的出现次数
	// 使用Array.reduce()在每次遇到数组中的特定值时递增计数器。
	countOccurrences: (arr, value) => arr.reduce((a, v) => v === value ? a+1 : a+0, 0),

	// deepFlatten: 深拼合数组
	// 使用递归。使用Array.concat()与空数组 ([]) 和跨页运算符 (...) 来拼合数组。递归拼合作为数组的每个元素。
	// deepFlatten: arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v)),

	// difference: 返回两个数组之间的差异
	// 从b创建Set, 然后使用Array.filter() on 只保留a b中不包含的值.
	difference: (a, b) => {const s = new Set(b); return a.filter(x => !s.has(x)); },

	// distinctValuesOfArray: 返回数组的所有不同值
	// 使用 ES6 Set和...rest运算符放弃所有重复的值。
	distinctValuesOfArray: arr => [...new Set(arr)],

	// dropElements: 移除数组中的元素, 直到传递的函数返回true
	// 移除数组中的元素, 直到传递的函数返回true。返回数组中的其余元素。 在数组中循环, 使用Array.shift()将数组的第一个元素除去, 直到函数的返回值为true。返回其余元素。
	dropElements: (arr, func) => {
		while (arr.length > 0 && !func(arr[0]))
			arr.shift();
		return arr;
	},

	// everyNth: 返回数组中的每个第 n 个元素
	// 使用Array.filter()创建一个包含给定数组的每个第 n 个元素的新数组。
	everyNth: (arr, nth) => arr.filter((e, i) => i % nth === 0),

	// filterNonUnique：筛选出数组中的非唯一值
	// 对于只包含唯一值的数组, 请使用Array.filter()。
	filterNonUnique: arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i)),

	// flatten: 拼合数组
	// 使用Array.reduce()获取数组中的所有元素和concat()以拼合它们
	flatten: arr => arr.reduce((a, v) => a.concat(v), []),

	// falttenDepth: 将数组向上拼合到指定深度
	// 使用递归, 递减depth, 每层深度为1。使用Array.reduce()和Array.concat()来合并元素或数组。基本情况下, 对于等于1的depth停止递归。省略第二个元素,depth仅拼合到1的深度 (单个拼合)。
	// falttenDepth: (arr, depth = 1) => depth != 1 ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v), []) : arr.reduce((a, v) => a.concat(v), []),

	// groupby: 根据给定函数对数组元素进行分组
	// 使用Array.map()将数组的值映射到函数或属性名。使用Array.reduce()创建一个对象, 其中的键是从映射的结果生成的。
	// groupBy: (arr, func) => arr.map(typeof func === 'function' ? func : val => val[func]).reduce((acc, val, i) => { acc[val] = (acc[val] || []).concat(arr[i]); return acc; }, {}),

	// head: 返回列表的头
	// 使用arr[0]可返回传递的数组的第一个元素。
	head: arr => arr[0],

	// initial: 返回除最后一个数组之外的所有元素
	// 使用 "arr.slice(0,-1)" 返回数组的最后一个元素。
	initial: arr => arr.slice(0, -1),

	// initializeArrayWithRange: 初始化并填充具有指定值的数组
	// 使用Array(n)创建所需长度的数组,fill(v)以填充所需的值。可以省略value以使用默认值0.
	initializeArrayWithRange: (end, start = 0) => Array.from({length: end - start }).map((v, i) => i + start),

	// initializeArrayWithValues: 初始化并填充具有指定值的数组
	// 使用Array(n)创建所需长度的数组,fill(v)以填充所需的值。可以省略value以使用默认值0
	initializeArrayWithValues: (n, value = 0) => Array(n).fill(value),

	// intersection: 返回两个数组中存在的元素的列表
	// 从b创建Set, 然后使用Array.filter()on a只保留b中包含的值.
	intersection: (a, b) => {const s = new Set(b); return a.filter(x => s.has(x)); },

	// last: 返回数组中的最后一个元素
	// 使用arr.length - 1可计算给定数组的最后一个元素的索引并返回它
	last: arr => arr[arr.length - 1],

	// mapObject: 使用函数将数组的值映射到对象, 其中键值对由原始值作为键和映射值组成
	// 使用匿名内部函数范围来声明未定义的内存空间, 使用闭包来存储返回值。使用新的Array可将该数组与函数的映射放在其数据集上, 而逗号运算符返回第二个步骤, 而不需要从一个上下文移动到另一个环境 (由于关闭和操作顺序)。
	mapObject: (arr, fn) => (a => (a =[arr, arr.map(fn)], a[0].reduce((acc, val, ind) => (acc[val] = a[1][ind], acc), {}) ))( ),

	// nthElement: 返回数组的第 n 个元素
	// 使用Array.slice()可获取包含第 n 个元素的数组。如果索引超出界限, 则返回[]。省略第二个参数n, 以获取数组的第一个元素
	nthElement: (arr, n=0) => (n>0 ? arr.slice(n, n+1) : arr.slice(n))[0],

	// pick: 从对象中选取对应于给定键的键值对
	// 使用Array.reduce()将筛选/选取的密钥转换回具有相应键值对的对象 (如果在 obj 中存在该键)。
	pick: (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {}),

	// pull: 对原始数组进行变异, 以筛选出指定的值
	// 使用Array.filter()和Array.includes()来拉出不需要的值。使用Array.length = 0可将传入的数组中的长度重置为零, 并将其设置为Array.push(), 以便仅使用所提取的值填充它。
	pull: (arr, ...args) => {
		let pulled = arr.filter((v, i) => !args.includes(v));
		arr.length = 0;
		pulled.forEach(v => arr.push(v));
	},

	// remove: 从数组中移除给定函数返回false的元素
	//  使用Array.filter()查找返回 truthy 值的数组元素和Array.reduce()以使用Array.splice()删除元素。使用三参数 (func value, index, array调用函数).
	remove: (arr, func) => Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
		arr.splice(arr.indexOf(val), 1);
		return acc.concat(val);
	}, []) : [],

	// sample: 返回数组中的随机元素
	// 使用Math.random()生成一个随机数, 将它与length相乘, 并使用数学将其舍入到最接近的整数Math.floor()。此方法也适用于字符串
	sample: arr => arr[Math.floor(Math.random() * arr.length)],

	// shuffle: 随机数组值的顺序
	// 使用Array.sort()可在比较器中使用Math.random()重新排序元素。
	shuffle: arr => arr.sort(() => Math.random() - 0.5),

	// similarity: 返回两个数组中都显示的元素的数组
	// 使用filter()可删除不属于values的值, 使用includes()确定.
	similarity: (arr, values) => arr.filter(v => values.includes(v)),

	// symmetricDifference: 返回两个数组之间的对称差
	// 从每个数组创建一个Set, 然后对它们中的每一个都使用Array.filter(), 以便只保留其他值中不包含的数值。
	symmetricDifference: (a, b) => {
		const sA = new Set(a), sB = new Set(b);
		return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
	},

	// tail: 返回数组中的所有元素, 除第一个
	// 如果数组的length大于1, 则返回arr.slice(1), 否则返回整个数组。
	tail: arr => arr.length > 1 ? arr.slice(1) : arr,

	// take: 返回一个数组, 其中 n 个元素从开始处移除
	// 使用Array.slice()创建数组的切片, 其中包含从开始处取出的n元素
	take: (arr, n=1) => arr.slice(0, n),

	// takeRight: 返回一个数组, 其中 n 个元素从末尾移除
	// 使用Array.slice()创建数组的切片, 其中包含从末尾取出的n元素
	takeRight: (arr, n=1) => arr.slice(arr.length - n, arr.length),

	// union: 返回在两个数组中的任意一个中存在的每个元素
	// 创建一个Set, 其中包含a和b的所有值, 并将其转换为数组。
	union: (a, b) => Array.from(new Set([...a, ...b])),

	// without: 筛选出数组中具有指定值之一的元素
	// 使用Array.filter()创建不包括的数组 (使用!Array.includes()) 所有给定值。
	without: (arr, ...args) => arr.filter(v => !args.includes(v)),

	// zip: 创建基于原始数组中的位置分组的元素数组
	// 使用Math.max.apply()获取参数中最长的数组。创建一个以该长度为返回值的数组, 并使用 map 函数创建一个分组元素的数组Array.from()如果参数数组的长度不同, 则在未找到任何值的情况下使用undefined。
	zip: (...arrays) => {
		const maxLength = Math.max(...arrays.map(x => x.length));
		return Array.from({length: maxLength}).map((_, i) => {
			return Array.from({length: arrays.length}, (_, k) => arrays[k][i]);
		})
	},

	// 从给定数组中移除一项
	removeArrayItem: function(arr, item){
		var i = 0;
		while(i< arr.length){
			if(arr[i] == item){
				arr.splice(i, 1);
			}
			else{
				i++;
			}
		}
		return arr;
	},

	// 检查给定数组中是否包含某项
	contains: function(arr, item){
		var i = arr.length;
		while(i--){
			if(arr[i] === item){
				return true;
			}
		}
		return false;
	},



	/************************************************************************
	* browser浏览器
	************************************************************************/
	
	// bottomVisible: 如果页的底部可见, 则返回true, 否则为false
	// 使用scrollY、scrollHeight和clientHeight来确定页面底部是否可见。
	bottomVisible: () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight,

	// currentURL: 返回当前 URL
	// 使用window.location.href获取当前 URL
	currentURL: () => window.location.href,

	// elementIsVisibleInViewport： 如果指定的元素在视区中可见, 则返回true, 否则为false
	// 使用Element.getBoundingClientRect()和window.inner(Width|Height)值以确定给定元素在视区中是否可见。省略第二个参数以确定该元素是否完全可见, 或指定true以确定它是否部分可见
	elementIsVisibleInViewport: (el, partiallyVisible = false) => {
		const {top, left, bottom, right} = el.getBoundingClientRect();
		return partiallyVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
	},

	// getScrollPosition: 返回当前页的滚动位置
	// 如果已定义, 则使用pageXOffset和pageYOffset, 否则scrollLeft和scrollTop。可以省略el以使用window的默认值
	getScrollPosition: (el = window) => ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft, y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop}),

	// getURLParameters: 返回一个包含当前 URL 参数的对象
	// 使用match()与适当的正则表达式来获取所有键值对,Array.reduce()可将它们映射并合并到单个对象中。将location.search作为要应用于当前url的参数传递
	getURLParameters: url => url.match(/([^?=&]+)(=([^&]*))/g).reduce( (a, v) => (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1), a), {}),

	// redirect: 重定向到指定的 URL
	// 使用window.location.href或window.location.replace()重定向到url。传递第二个参数以模拟链接单击 (true-默认值) 或 HTTP 重定向 (false)
	redirect: (url, asLink = true) => asLink ? window.location.href = url : window.location.replace(url),

	// scrollToTop: 平滑滚动到页面顶部
	// 使用document.documentElement.scrollTop或document.body.scrollTop从顶部获取距离。从顶部的距离的一小部分滚动。使用window.requestAnimationFrame()对滚动进行动画处理
	scrolllToTop: () => {
		const c = document.documentElement.scrollTop || document.body.scrollTop;
		if(c > 0){
			window.requestAnimationFrame(scrollToTop);
			window.scrollTo(0, c - c/8);
		}
	},




	/************************************************************************
	* 日期类
	************************************************************************/

	// ISODateString: 将本地日期格式转换为 ISO 日期
	ISODateString: (date) => {
		pad = (n) => n< 10 ? "0" + n : n;
		return date.getUTCFullYear() + "-"
			+ pad(date.getUTCMonth() + 1) + "-"
			+ pad(date.getUTCDate()) + "T"
			+ pad(date.getUTCHours()) + ":"
			+ pad(date.getUTCMinutes()) + ":"
			+ pad(date.getUTCSeconds()) + "Z";
	},

	// getDaysDiffBetweenDates: 返回两个日期之间的差异 (以天为值)
	// 计算Date对象之间的差异 (以天为)
	getDayDiffBetweenDates: (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24),

	// JSONToDate: 将 JSON 对象转换为日期
	// 用Date(), 将 JSON 格式的日期转换为可读格式 (dd/mm/yyyy日)).
	JSONToDate: arr => {
		const date = new Date(parseInt(arr.toString().substr(6)));
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	},

	// toEnglishDate: 将日期从美国格式转换为英文格
	toEnglishDate: (time) => {
		try{
			return new Date(time).toISOString().split("T")[0].replace(/-/g, "/");
		}
		catch(e){
			return;
		}
	},




	/************************************************************************
	* 函数类
	************************************************************************/

	// chainAsync: 链异步函数
	// 循环遍历包含异步事件的函数数组, 当每个异步事件完成时调用next
	chainAsync: fns => {let curr = 0; const next = () => fns[curr++](next); next();},

	// compose: 执行从右向左的函数组合
	// 使用Array.reduce()执行从右向左的函数组合。最后一个 (最右边) 的函数可以接受一个或多个参数;其余的函数必须是一元的。
	compose: (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),

	// curry: 函数柯里化
	// curry()函数的主要作用是对被返回函数的参数进行排序，柯里化函数通过以下步骤动态创建：调用另一个函数并为它传入要柯里化的函数和必要参数，下面是创建柯里化函数的通用方式
	curry: function(fn){
		var args = Array.prototype.slice.call(arguments, 1);
		return function(){
			var innerArgs = Array.prototype.slice.call(arguments);
			var finalArgs = args.concat(innerArgs);
			return fn.apply(null, finalArgs);
		};
	},

	// functionName: 记录函数的名称
	// 使用console.debug()和传递的方法的name属性将方法的名称记录到控制台的debug通道中。
	functionName: fn => (console.debug(fn, name), fn),

	// pipeFunctions: 执行从左向右的函数组合
	// 使用Array.reduce()与扩展运算符 (...) 执行从左向右的函数组合。第一个 (最左边的) 函数可以接受一个或多个参数;其余的函数必须是一元的
	pipeFunctions: (...fns) => fns.reduce((f, g) => (...args) => g(f(...args))),

	// promisify: 转换异步函数以返回一个promise
	// 使用讨好返回一个返回调用原始函数的Promise的函数。使用...rest运算符传入所有参数。 在节点 8 + 中, 可以使用 util.promisify
	promisify: func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => err ? reject(err) : resolve(result))),

	// runPromisesInSeries: 运行一系列的promise
	// 使用Array.reduce()创建一个promise链, 每个promise在解决时返回下一个promise
	runPromisesInSeries: ps => ps.reduce((p, next) => p.then(next), Promise.resolve()),

	// sleep: 延迟异步函数的执行
	sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),




	/************************************************************************
	* Math 数学类
	************************************************************************/

	// generateRandom: 产生两个参数之间的随机数
	generateRandom: (lowerValue, upperValue) => {
		var chioces = upperValue - lowerValue + 1;
		return Math.floor(Math.random() * chioces + lowerValue);
	},

	// arrayAverage: 返回数字数组的平均值
	// 使用Array.reduce()将每个值添加到累加器中, 并以0的值初始化, 除以数组的length
	arrayAverage: arr => arr.reduce((acc, val) => acc + val, 0) / arr.length,

	// arraySum: 返回一个数字数组的总和
	// 使用Array.reduce()将每个值添加到累加器中, 并以0值初始化
	arraySum: arr => arr.reduce((acc, val) => acc + val, 0),

	// collatz: 实现collatz算法
	// 如果n是偶数, 则返回n/2。否则返回3n+1
	collatz: n => (n % 2 == 0) ? (n / 2) : (3 * n + 1),

	// digitize: 将数字转换为数字数组
	// 将数字转换为字符串, 在 ES6 ([...string]) 中使用扩展运算符生成数组。使用Array.map()和parseInt()将每个值转换为整数
	digitize: n => [...""+n].map(i => parseInt(i)),

	// distance 返回两点之间的距离
	// 使用Math.hypot()计算两个点之间的欧氏距离
	distance: (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0),

	// fibonacci: 返回从0开始的长度为n的斐波那契数列
	// 创建一个指定长度的空数组, 初始化前两个值 (0和1)。使用Array.reduce()可将值添加到数组中, 方法是使用前两个值的总和, 但前两个数值除外。
	fibonacci: n => Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []),

	// gcd: 计算最大公约数
	// 使用递归。基本情况是当y等于0时。在这种情况下, 返回x。否则, 返回y的 GCD 和除法的其余部分x/y
	gcd: (a, b) => { 
		let x = a, y = b; 
		_gcd = (_x, _y) => !_y ? _x : _gcd(_y, _x % _y);
		return _gcd(a, b);
	},

	// hammingDistance: 计算两个值之间的汉明距离
	// 使用 XOR 运算符 (^) 可查找两个数字之间的位差, 使用toString(2)转换为二进制字符串。使用match(/1/g)计算并返回字符串中1的数目。
	hammingDistance: (num1, num2) => ((num1 ^ num2).toString(2).match(/1/g) || "").length,

	// isDivisible: 检查第一个数值参数是否可被另一个数字变量整除
	// 使用模数运算符 (%) 检查余数是否等于0
	isDivisible: (dividend, divisor) => dividend % divisor === 0,

	// isEven: 如果给定的数字为偶数, 则返回true, 否则为false
	isEven: num => num % 2 === 0,

	// lcm：最小公倍数
	// 结合最大公约数以及Math.abs()来确定最小公约数
	lcm: (x, y) => {
		const gcd = (x, y) => !y ? x : gcd(y, x%y);
		return Math.abs(x * y) / (gcd(x, y));
	},

	// median: 返回数组的中间
	// 返回数组的中间，使用Array.sort()来对值进行排序，若length为奇数返回中间的数，若为偶数，返回中间两个值的平均值
	median: arr => {
		const mid = Math.floor(arr.length / 2), nums = arr.sort((a, b) => a - b);
		return arr.length % 2 !== 0 ? nums[mid] : (nums[mid-1] + nums[mid]) / 2;
	},

	// palindrome: 如果给定字符串为回文, 则返回true, 否则为false
	// 转换字符串toLowerCase()并使用replace()从其中删除非字母数字字符。然后,split('')到各个字符,reverse(),join(''), 并将其与原始的、不可逆转的字符串进行比较, 然后将其转换为tolowerCase().
	palindrome: str => {
		const s = str.toLowerCase().replace(/[\W]/g, "");
		return s === s.split("").reverse().join("");
	},

	// percentile: 使用百分比公式计算给定数组中有多少个数小于或等于给定值
	percentile: (arr, val) => 100 * arr.reduce((acc ,v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length,

	// powerset: 返回给定数组的真子集
	// 使用Array.reduce()与Array.map()组合, 以循环访问元素并将其合并到包含所有组合的数组中
	powerset: arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]),

	// randomIntegerInRange: 返回指定范围内的随机整数
	// 使用Math.random()生成一个随机数并将其映射到所需的范围, 使用Math.floor()使其成为整数
	randomIntegerInRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

	// randomNumberInRange: 返回指定范围内的随机数
	// 使用Math.random()生成随机值, 并使用乘法将其映射到所需的范围
	randomNumberInRange: (min, max) => Math.random() * (max - min) + min,

	// round: 将数字四舍五入到指定的位数
	// 使用Math.round()和模板文本将数字舍入到指定的位数。省略第二个参数,decimals舍入为整数
	round: (n, decimals=0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`),

	// standardDeviation: 返回数字数组的标准偏差
	// 使用Array.reduce()计算值的平均值、方差和方差的总和, 值的方差, 然后确定标准偏差。可以省略第二个参数以获取样本标准偏差, 或将其设置为true以获取总体标准 偏差
	// standardDeviation: (arr, usePopulation = false) => {
	// 	const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
	// 	return Math.sqrt(arr.reduce((acc, val) => concat(Math.pow(val - mean, 2)), []).reduce((acc, val) => acc + val, 0) / (arr.length - (usePopulation ? 0 : 1)));
	// },




	/************************************************************************
	* 媒体类
	************************************************************************/

	// speechSynthsis: 执行语音合成 (实验)
	// 使用SpeechSynthesisUtterance.voice和window.speechSynthesis.getVoices()将邮件转换为语音。使用window.speechSynthesis.speak()播放该消息。了解有关Web 语音 API 的 SpeechSynthesisUtterance 接口的详细信息
	speechSynthesis: message => {
		const msg = new SpeechSynthesisUtterance(message);
		msg.voice = window.speechSynthesis.getVoices()[0];
		window.speechSynthesis.speak(msg);
	},




	/************************************************************************
	* DOMs 节点
	************************************************************************/
	
	// 判断某个节点是否有某个class
	hasClass: function(node, className){
		if(node.className){
			return node.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
		}
		else{
			return false;
		}
	},

	// 给节点添加一个class
	// addClass: function(node, className){
	// 	if(hasClass(node, className)){
	// 		node.className += " " + className;
	// 	}
	// },

	// JSONToFile: 将 JSON 对象写入文件
	// 使用fs.writeFile()、模板文本和JSON.stringify()将json对象写入.json文件
	// JSONToFile: (obj, filename) => {
	// 	const fs = require("fs");
	// 	var o = obj, f = filename;
	// 	const _JSONToFile = (_obj, _filename) => fs.writeFile(`${_filename}.json`, JSON.stringify(_obj, null, 2));
	// 	return _JSONToFile(o, f);
	// },

	// readFileLines: 返回指定文件中的行的数组
	// 在fs节点包中使用readFileSync函数可以从文件创建Buffer。使用toString(encoding)函数将缓冲区转换为字符串。通过spliting 文件内容行从文件内容创建数组 (每个\n).
	// const fs = require("fs");
	// const readFileLines =  filename => fs.readFileSync(filename).toString("UTF8").split("\n");
	/*
	contents of test.txt :
	  line1
	  line2
	  line3
	  ___________________________
	let arr = readFileLines('test.txt')
	console.log(arr) // -> ['line1', 'line2', 'line3']
	*/




	/************************************************************************
	* 对象类
	************************************************************************/

	// cleanObj: 移除从 JSON 对象指定的属性之外的任何特性
	// 使用Object.keys()方法可以遍历给定的 json 对象并删除在给定数组中不是included 的键。另外, 如果给它一个特殊的键 (childIndicator), 它将在里面深入搜索, 并将函数应用于内部对象
	cleanObj: (obj, keysToKeep = [], childIndicator) => {
		let o = obj, k = keysToKeep, c = childIndicator;
		_cleanObj = (_obj, _keysToKeep = [], _childIndicator ) => {
			Object.keys(_obj).forEach(key => {
				if(key === _childIndicator){
					_cleanObj(_obj[key], _keysToKeep, _childIndicator);
				}
				else if(!_keysToKeep.includes(key)){
					delete _obj[key];
				}
			})
		}
		return _cleanObj(o, k, c);
	},

	// objectFromParis: 从给定的键值对创建对象
	// 使用Array.reduce()创建和组合键值对
	objectFromPairs: arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {}),

	// objectToPairs: 从对象创建键值对数组
	// 使用Object.keys()和Array.map()循环访问对象的键并生成具有键值对的数组
	objectToPairs: obj => Object.keys(obj).map(k => [k, obj[k]]),

	// shallowClone: 创建对象的浅复制
	// 使用Object.assign()和一个空对象 ({}) 创建原始的浅克隆
	shallowClone: obj => Object.assign({}, obj),

	// truthCheckCollection: 检查谓词 (第二个参数) 是否 truthy 集合的所有元素 (第一个参数)
	// 使用Array.every()检查每个传递的对象是否具有指定的属性, 以及是否返回 truthy值
	truthCheckCollection: (collection, pre) => (collection.every(obj => obj[pre])),




	/************************************************************************
	* 字符串类
	************************************************************************/

	// 清除字符串左侧或右侧的任意空格
	trim: function(str){
		return str.replace(/^\s+|\s+$/g, "");
	},

	// 清除左空格
	ltrim: function(str){
		return str.replace(/^\s+/, "");
	},

	// 清除右空格
	rtrim: function(val){
		return val.replace(/\s+$/, "");
	},

	// 截取给定长度的字符串
	truncate: function(str, len){
		if(str.length >len){
			str = str.substring(0, len);
		}
		return str;
	},

	// 只返回字符串a-z字符
	onlyLetters: function(str){
		return str.toLowerCase().replace(/[^a-z]/g, "");
	},

	// 只返回字符串中a-z和数字
	onlyLettersNums: function(str){
		return str.toLowerCase().replace(/[^a-z,0-9]/g, "");
	},

	// anagrams: 返回字符串的所有异序字符串
	// 使用递归。对于给定字符串中的每个字母, 为其其余字母创建所有部分字谜。使用Array.map()将字母与每个部分变位词组合在一起, 然后将Array.reduce()组合在一个数组中的所有字谜。基本情况为字符串length等于2或1
	anagrams: str => {
		_anagrams = _str => {
			if(_str.length <= 2){
				return _str.length === 2 ? [_str, _str[1] + _str[0]] : [_str];
			}
			return _str.split("").reduce((acc, letter, i) => acc.concat(_anagrams(_str.slice(0, i) + _str.slice(i + 1)).map(val => letter + val)), []);
		}
		s = str;
		return _anagrams(s);
	},

	// capitalize: 将字符串的第一个字母大写
	// 使用 destructuring 和toUpperCase()可将第一个字母、...rest用于获取第一个字母之后的字符数组, 然后是Array.join('')以使其成为字符串。省略lowerRest参数以保持字符串的其余部分不变, 或将其设置为true以转换为小写
	capitalize: ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join("").toLowerCase() : rest.join("")),

	// capitalizeEveryWord: 将字符串中每个单词的首字母大写
	// 使用replace()匹配每个单词和toUpperCase()的第一个字符以将其大写
	capitalizeEveryWord: str => str.replace(/\b[a-z]/g, char => char.toUpperCase()),

	// escapeRegExp: 转义要在正则表达式中使用的字符串
	// 使用replace()可转义特殊字符
	escapeRegExp: str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),

	// fromCamelCase: 从驼峰表示法转换为字符串形式
	// 使用replace()可删除下划线、连字符和空格, 并将单词转换为匹配。省略第二个参数以使用默认分隔符_
	fromCamelCase: (str, separator = "_") => str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase(),

	// reverseString: 反转字符串
	// 使用数组 destructuring 和Array.reverse()可反转字符串中字符的顺序。使用join('')组合字符以获取字符串
	reverseString: str => [...str].reverse().join(""),

	// sortCharactersInString: 按字母顺序对字符串中的字符进行排序
	// 使用split('')、Array.sort()利用localeCompare()重新组合使用join('').
	sortCharactersInString: str => str.split("").sort((a, b) => a.localeCompare(b)).join(""),

	// toCamelCase: 字符串转换为驼峰模式
	// 使用replace()可删除下划线、连字符和空格, 并将单词转换为驼峰模式
	toCamelCase: str => str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => p2 ? p2.toUpperCase() : p1.toLowerCase()),

	// truncateString: 将字符串截断为指定长度
	// 确定字符串的length是否大于num。将截断的字符串返回到所需的长度, 并将...追加到末尾或原始字符串
	truncateString: (str, num) => str.length > num ? str.slice(0, num > 3 ? num -3 : num) + "..." : str,




	/************************************************************************
	* 类型检测类
	************************************************************************/
	// 判断是否为一个数字
	isNumber: function(value){
		return !isNaN(parseFloat(value)) && isFinite(value);
	},

	// 判断数组
	isArray: function(value){
		return Object.prototype.toString.call(value) == "[object Array]";
	},
	// 或
	// isArray: val => !!val && Array.isArray(val),

	// 判断原生函数
	isFunction: function(value){
		return Object.prototype.toString.call(value) == "[object Function]";
	},
	// 或
	// isFunction: val => val && typeof val === "function",

	// 判断正则表达式
	isRegExp: function(value){
		return Object.prototype.toString.call(value) == "[object RegExp]";
	},

	// 判断字符串
	isString: str => Object.prototype.toString.call(str) == "[object String]",
	// 或
	// isString: val => typeof val === "string",

	// 判断布尔值
	isBoolean: val => Object.prototype.toString.call(val) == "[object Boolean]",
	// 或
	// isBoolean: val => typeof val === "boolean",

	// 判断是否为Symbol
	isSymbol: val => Object.prototype.toString.call(val) == "[object Symbol]",
	// 或
	// isSymbol: val => typeof val === "symbol",




	/************************************************************************
	* JSON
	************************************************************************/
	// Loads a JSON file into document
	// getJSON: function(url) {
	//     script = document.createElement("script");
	//     script.setAttribute("type", "text/javascript");
	//     if (url.indexOf('?') > -1)
	//         url += '&';
	//     else
	//         url += '?';
	//     url += 'rand=' + Math.random();
	//     script.setAttribute("src", url);
	//     document.getElementsByTagName('head')[0].appendChild(script);
	// },




	/************************************************************************
	* 其他
	************************************************************************/
	
	// maxNum: 获取数组中最大的数字的另一种写法
	// maxNum: function(arr){
	// 	return Math.max.apply(Math, arr);
	// },
	maxNum: arr => Math.max.apply(Math, arr),

	// minNum: 获取数组中最小的数字另一种写法
	// minNum: function(arr){
	// 	return Math.min.apply(Math, arr);
	// },
	minNum: arr => Math.max.apply(Math, arr),

	// coalesce: 返回第一个非空/未定义参数
	coalesce: (...args) => args.find(_ => ![undefined, null].includes(_)),

	// coalesceFactory: 返回自定义的联合函数, 返回从提供的参数验证函数返回true的第一个参数。
	// 使用Array.find()返回从提供的参数验证函数返回true的第一个参数。
	coalesceFactory: valid => (...args) => args.find(valid),

	// extendHex: 将3位色码扩展为6位色码
	// 使用Array.map()、split()和Array.join()来加入映射数组, 将3位的 RGB notated 十六进制 color-code 转换为6位数字形式。Array.slice()用于从字符串启动中删除#, 因为它添加了一次
	// extendHex: shortHex => "#" + shortHex.slice(shortHex.startWith("#") ? 1 : 0).split("").map(x => x+x).join(""),
	extendHex: shortHex => {
		 _extendHex = _shortHex => (_shortHex.length <=4) ?
		 	"#" + _shortHex.slice(_shortHex.startsWith("#") ? 1: 0).split("").map(x => x+x).join("") : shortHex;
		let _shortHex = shortHex;
		return _extendHex(_shortHex);
	},

	// gettype: 返回值的本机类型
	// 如果值未定义或为 null, 则返回小写的构造函数名称、"未定义" 或 "null"
	gettype: v => v === undefined ? "undefined" : v === null ? "null" : v.constructor.name.toLowerCase(),

	// hexToRGB: 将 colorcode 转换为rgb()字符串
	// 使用按位右运算符和掩码位与&(and) 运算符将十六进制颜色代码 (前缀为#) 转换为具有 RGB 值的字符串。如果它是一个3位数的 colorcode, 那么用 extendHex () 函数 (ref.extendHex代码段) 扩展的6位 colorcode 进行相同的处理
	hexToRGB: hex => {
		const extendHex = shortHex => "#" + shortHex.slice(shortHex.startsWith("#") ? 1 : 0).split("").map(x => x+x).join("");
		const extendedHex = hex.slice(hex.startsWith("#") ? 1 : 0).length === 3 ? extendHex(hex) : hex;
		return `rgb(${parseInt(extendedHex.slice(1), 16) >> 16}, ${(parseInt(extendedHex.slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(extendedHex.slice(1), 16) & 0x0000ff})`;
	},

	// RGBToHex: 将 RGB 组件的值转换为 colorcode。
	// 使用按位左移位运算符 (<<) 和toString(16)将给定的 RGB 参数转换为十六进制字符串, 然后padStart(6,'0')以获取6位十六进制值
	RGBToHex: (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0"),

	// timeTaken: 测量执行函数所用的时间
	// 使用console.time()和console.timeEnd()来测量开始和结束时间之间的差异, 以确定回调执行所用的时间
	timeTaken: callback => {
		console.time("timeTaken");
		const r = callback();
		console.timeEnd("timeTaken");
		return r;
	},

	// toOridinalSuffix: 将给序数添加英文后缀
	toOridinalSuffix: num => {
		const int = parseInt(num), digits = [(int % 10)], ordinals = ["st", "nd", "rd", "th"], oPattern = [1, 2, 3, 4], tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
		return oPattern.includes(digits[0]) && !tPattern.includes(digits[1]) ? int + ordinals[digits[0] - 1] : int + ordinals[3];
	},

	// UUIDGenerator: 生成 UUID
	// 使用cryptoAPI 生成 UUID, 符合RFC4122版本4
	UUIDGenerator: () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)),

	// validateEmail: 如果给定的字符串是有效的电子邮件, 则返回true, 否则为false
	// 使用正则表达式检查电子邮件是否有效。如果电子邮件有效, 则返回 true, 如果没有, 则返回false
	validateEmail: str =>  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str),

};