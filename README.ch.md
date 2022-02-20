
前端异构开发环境
=========================

## 假设项目集的目录结构如下
${workspaceFolder}
├─electron项目 // 桌面壳相关代码
├─vue项目 // 
├─react项目 //  
├─jQuery项目 // 该项目的程序为vue/react项目程序运行的引导程序。一个明显的例子为该项目为sso项目
├─iweb //集成前述jquery、vue、react3个异构的项目到一个界面,可以理解为spa(Single Page Application)的主控程序。vue/react自己本身就是单独的spa应用
└ ibuild //将上述项目整个起来的构建项目

## 技术要求
1. vue/react项目可独立启动web调试
2. 各项目都尽可能支持ts
3. 开发打包用vite，部署打包用webpack
4. 在本例只集成了electron,可以一次性生成 web/desktop版本。如果集成了phone的外壳程序，就应该生成/web/desktop/phone3个版本，各版本都应该可以启动调试。最好能将断点转到vscode等ide中

## 前提假设
1. 以node为开发构建基础平台
2. web项目的运行期依赖项由项目集技术经理统一管理，pack split 由项目集技术经理管理。