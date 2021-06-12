#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob') // npm i glob -D
const downLoad = require('./lib/downLoad') //下载配置
const inquirer = require('inquirer') // 按需引入
// const logSymbols = require("log-symbols");
// const chalk = require('chalk')
const remove = require('./lib/remove') // 删除文件js
// const generator = require('./lib/generator')// 模版插入
// const CFonts = require('cfonts');

program.usage('<项目名称>')
            .parse(process.argv) // 加入这个能获取到项目名称

// 根据输入，获取项目名称
let projectName = program.rawArgs[2] // 获取项目名称


if (!projectName) {  // project-name 必填  如果没有输入名称执行helphelp
  program.help()// 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  return
}

// 当前目录为空，如果当前目录的名称和project-name一样，则直接在当前目录下创建工程，否则，在当前目录下创建以project-name作为名称的目录作为工程的根目录
// 当前目录不为空，如果目录中不存在与project-name同名的目录，则创建以project-name作为名称的目录作为工程的根目录，否则提示项目已经存在，结束命令执行。
// process.cwd() 是当前执行node命令时候的文件夹地址
//__dirname 是被执行的js 文件的地址 ——文件所在目录
const list = glob.sync('*')  // 遍历当前目录,数组类型

let next = undefined;
let rootName = path.basename(process.cwd());

if (list.length) {  // 如果当前目录不为空
  if (list.some(n => {
    const fileName = path.resolve(process.cwd(), n);
    const isDir = fs.statSync(fileName).isDirectory();
    return projectName === n && isDir // 找到创建文件名和当前目录文件存在一致的文件
  })) { // 如果文件已经存在
    next = inquirer.prompt([
      {
        name:"isRemovePro",
        message:`项目${projectName}已经存在，是否覆盖文件`,
        type: 'confirm',
        default: true
      }
    ]).then(answer=>{
        if(answer.isRemovePro){
          remove(path.resolve(process.cwd(), projectName))
          rootName = projectName;
          return Promise.resolve(projectName);
        }else{
          console.log("停止创建工程")
          return Promise.reject();
        }
      })
  } else {
    next = Promise.resolve(projectName)
  }
} else if (rootName === projectName) {  // 如果文件名和根目录文件名一致
  rootName = '.';
  next = inquirer.prompt([
    {
      name: 'buildInCurrent',
      message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
      type: 'confirm',
      default: true
    }
  ]).then(answer => {
    return Promise.resolve(answer.buildInCurrent ? '.' : projectName)
  })
} else {
  rootName = projectName;
  next = Promise.resolve(projectName) // 返回resole函数，并传递projectName
}

next.then(projectRoot => { //
    if (projectRoot !== '.') {
      fs.mkdirSync(projectRoot)//创建目录文件
    }

    return downLoad(projectRoot).then(target => {//下载模版
      return {
        projectRoot,
        downloadTemp: target
      }
    })
}).catch(err => {
  console.log(err)
})



