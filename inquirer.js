const inquirer = require('inquirer');//引入

// 用户的交互
// const promptList = [{
//   type: 'input',
//   message: '设置一个用户名:',
//   name: 'name',
//   default: "user_name" // 默认值
// },{
//   type: 'input',
//   message: '请输入手机号:',
//   name: 'phone',
//   validate: function(val) {
//       if(!val.match(/\d{11}/g)) { // 校验位数
//           return "请输入11位数字";
//       }
//       return true
//   }
// }];
// const promptList = [{
//   type: "confirm",
//   message: "第一个条件是否成立",
//   name: "firstChange",
//   prefix: "第一个条件的前缀"
// },{
//   type: "confirm",
//   message: "第二个条件是否成立（依托于第一个条件）",
//   name: "secondChange",
//   suffix: "第二个条件的后缀",
//   when: function(answers) { // 当firstChange为true的时候才会提问当前问题
//       return answers.firstChange
//   }
// }];

// const promptList = [{
//   type: 'list',
//   message: '请选择一种水果:',
//   name: 'fruit',
//   choices: [
//       "🍎  Apple",
//       "🍐  Pear",
//       "🍌  Banana"
//   ],
//   filter: function (val) { // 使用filter将回答变为小写
//       return val.toLowerCase();
//   }
// }];

// const promptList = [{
//   type: "expand",
//   message: "请选择一种水果：",
//   name: "fruit",
//   choices: [
//       {
//           key: "a",
//           name: "Apple",
//           value: "apple"
//       },
//       {
//           key: "O",
//           name: "Orange",
//           value: "orange"
//       },
//       {
//           key: "p",
//           name: "Pear",
//           value: "pear"
//       }
//   ]
// }];

// const promptList = [{
//   type: "checkbox",
//   message: "类型:",
//   name: "color",
//   choices: [
//     new inquirer.Separator("--- 品牌 ---"), // 添加分隔符
//       {
//         name: "奥迪",
//       },
//       {
//         name: "奔驰",
//       },
//       {
//         name: "红旗",
//       },
//       new inquirer.Separator("--- 颜色 ---"), // 添加分隔符
//       {
//           name: "blur",
//           checked: true // 默认选中
//       },
//       {
//         name: "red",
//       },
//       {
//           name: "green"
//       }
//   ]
// }];
// const promptList = [{
//   type: "password", // 密码为密文输入
//   message: "请输入密码：",
//   name: "pwd"
// }];
const promptList = [{
  type: "editor",
  message: "请输入备注：",
  name: "editor"
}];

inquirer.prompt(promptList).then(answers => {
    console.log("最后输出")
    console.log(answers); // 返回的结果
})

