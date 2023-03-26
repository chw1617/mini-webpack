// 打包器，生成bundle.js
// 1、拿到模块依赖关系图
// 2、转换es6 代码成es5
// 3、替换exports,require()



// 3、浏览器不能识别require()方法，需要模拟实现
function require(filepath){
    const map = {
        'foo':foojs,  
        'main':mianjs
    }
    const fn = map[filepath]
    const module = {
        exports:{}
    }
    fn(module,module.exports,require) 
    return module.exports //导出模块内容
}

// 模块隐式加入导出信息 module.exports，读到内容，输出
var module = {} //这里就包含当前模块的信息
(function(module,code){
    eval(code)
})(module,'module.exports = function foo(){console.log("foo")}')


// 结合require,module.exports
function require(file){
    var module = {}
    (function(module,code){
        eval(code) //源代码放到module
    })(module,file)
    return module.exports
}

// 结合require,module,graph,利用立即执行函数，就可以在浏览器里边执行了，牛
// 也就是最终打包之后的文件了，牛
(function(graph){
    // 模拟require 读取文件，立即执行源文件
    function require(file){
        var module = {};
        (function (module,code){
            eval(code)
        })(module,graph[file])
        return module.exports
    }
    // 从入口开始
    require('main.js')
})({
    'main.js':`
        var foo = require('foo.js')
        console.log(foo)
        foo()
        console.log('main')
    `,
    'foo.js':`
        function foo(){console.log('foo module')}
        module.exports = foo
    `
})



// 原理 -----
// 1、解决命名冲突，作用域问题
// 2、import 转换成 require 支持了动态导入
function mianjs(module,exports,require){
    const foo = require('foo') //模拟reuqire
    function mian(){
        console.log('main')
    }
    foo()
}

function foojs(module,exports,require){
    function foo(){
        console.log('foo')
    }
    module.exports = foo
}


// 解决缓存
// 解决文件名字相同