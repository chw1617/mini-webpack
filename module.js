// 1、 读取入口文件内容
// 2、 读取文件依赖关系(正则、ast)
import fs from 'fs'
import {parse} from '@babel/parser'
import traverse from '@babel/traverse'

function getModule(file){
    const source = fs.readFileSync(file,'utf-8')
    const ast = parse(source,{sourceType:'module'})
    // 利用遍历器遍历ast,找出需要的依赖
    const deps = []
    traverse.default(ast,{
        ImportDeclaration({node}){
            console.log('node',node.source.value)
            deps.push(node.source.value)
        }
    })
    // 返回依赖
    return  {
        file,
        source,
        deps
    }
}

export default getModule