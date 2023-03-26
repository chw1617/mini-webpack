// 从入口模块依赖开始，递归构建模块与模块直接的依赖关系图的数据结构

import getModule from "./module.js";

const queue = [
    {
      file: './example/main.js',
      source: "import foo from './foo.js'\n" +
        'foo()\n' +
        'function main(){\n' +
        "    console.log('mian module')\n" +
        '}',
      deps: [ './foo.js' ]
    },
    {
      file: './example/bar.js',
      source: "export default function bar(){\n    console.log('bar module')\n}",
      deps: []
    },
    {
      file: './example/foo.js',
      source: "import bar from './bar.js'\n" +
        'export default function foo(){\n' +
        "    console.log('foo module')\n" +
        '}',
      deps: [ './bar.js' ]
    }
  ]

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

function createGraph(entry){
    const mainModle = getModule(entry)
    // 借助队列模拟图
    const queue = [mainModle]
    getDeps(queue,mainModle)
    const graph = {}

    
    for(let moduleInfo of queue){
      graph[moduleInfo.file] = {
        code:moduleInfo.source,
        deps:moduleInfo.deps
      }
    }
    console.log(queue)
    return graph
}

// 递归找模块之间的依赖关系
// 这块得多写
function getDeps(queue,module){
    for(let file of module.deps){
      const relativePath = './example/' + file.split('/')[1]
      console.log('relativePath',relativePath)
      const moduleInfo =  getModule(relativePath)
      // 递归执行
      getDeps(queue,moduleInfo)
      queue.push(moduleInfo)
    }
}

console.log(createGraph('./example/main.js'))