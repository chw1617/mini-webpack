# 这是一个mini-webpack,为了方便大家最简单理解webpack打包过程中的原理知识
# 打包大体思路
 1. 从入口开始，利用node文件模块系统读取文件内容，借助@babel/paserer解析内容生成ast, 借助@bable/traverse遍历器 找出模块依赖关系deps，这一步还需要借助@bable/core 中的transformer 转换器转换es6->es5
 2. 根据入口deps的依赖递归读取文件内容，生成模块队列信息，转换模块信息成依赖图的数据结构，如下
  ```
    const graph = {
    './example/main.js': { //入口
      code: "import foo from './foo.js'\n" +
        'foo()\n' +
        'function main(){\n' +
        "    console.log('mian module')\n" +
        '}',
      deps: [ './foo.js' ]
    },
    './example/bar.js': { // bar.js
      code: "export default function bar(){\n    console.log('bar module')\n}",
      deps: []
    },
    './example/foo.js': { //foo.js
      code: "import bar from './bar.js'\n" +
        'export default function foo(){\n' +
        "    console.log('foo module')\n" +
        '}',
      deps: [ './bar.js' ]
    }
   }

  ```
 3. 浏览不支持require()方法,module.exports对象，那我们需要模拟实现
 4. 动态生成bundle.js 文件后写入文件