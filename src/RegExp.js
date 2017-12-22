//作者：dragonir

// 匹配特定数字
// 匹配正数
var RegExp = {

	// 匹配正整数
	isPositiveNum: function(val){
		return /^[1-9]d*$/.test(val);
	},

	// 匹配负整数
	isNegativeNum: function(val){
		return /^-[1-9]d*$/.test(val);
	},

	// 匹配整数
	isInteger(val){
		return /^(-|\+)?\d+$/.test(val);
	},

	// 匹配非负浮点数
	isNotNegativeFloatNum: function(val){
		return /^\d+(\.\d+)?$/.test(val);
	}




	// 匹配特定字符串：
	//匹配由 26 个英文字母组成的字符串
	isAZaz: function(val){
		return /^[A-Za-z]+$/.test(val);
	},

	//匹配由 26 个英文字母的大写组成的字符串
	isAZ: function(val){
		return /^[A-Z]+$/.test(val);
	},

	isaz: function(val){
		return /^[a-z]+$/.test(val);
	},




	// 匹配电子邮件地址
	isEmailAddress(val){
		return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(val);
	}


};
