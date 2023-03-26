
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