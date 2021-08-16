// 首先，我们要创建几个用来存储信息的全局List
export const routerList: any[] = []
export const controllerList: any[] = []
export const parseList: any[] = []
export const paramList: any[] = []

// 虽说我们要有一个能够创建Router实例的装饰器
// 但是并不会直接去创建，而是在装饰器执行的时候进行一次注册
export function Router(basename = '') {
  return (constrcutor: any) => {
        console.log('Router', basename, constrcutor);
    routerList.push({
      constrcutor,
      basename
    })
  }
}

// 然后我们在创建对应的Get Post请求监听的装饰器
// 同样的，我们并不打算去修改他的任何属性，只是为了获取函数的引用
export function Method(type: any) {
  return (path: any) => (target: any, name: any, descriptor: any) => {
        console.log('Method', type, path, target, name, descriptor);
    controllerList.push({
      target,
      type,
      path,
      method: name,
      controller: descriptor.value
    })
  }
}

// 接下来我们还需要用来格式化参数的装饰器
export function Parse(type: any) {
  return (target: any, name: any, index: any) => {
        console.log('Parse', type, target, name, index);
    parseList.push({
      target,
      type,
      method: name,
      index
    })
  }
}

// 以及最后我们要处理的各种参数的获取
export function Param(position: any) {
  return (key: any) => (target: any, name: any, index: any) => {
        console.log('Param', position, key, target, name, index);
    paramList.push({
      target,
      key,
      position,
      method: name,
      index
    })
  }
}

export const Body = Param('body')
export const Header = Param('header')
export const Cookie = Param('cookie')
export const Query = Param('query')
export const Get = Method('get')
export const Post = Method('post')
