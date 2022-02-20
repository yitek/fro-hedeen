## 引入vite[^webpack_and_vite]
npm i -D vite
在 package.json/scripts加入如下内容
可以指定额外的命令行选项，如 --port 或 --https。运行 npx vite --help 获得完整的命令行选项列表。
下面的命令会在工程中重写
```json
"dev": "vite --port 5000", 
    "vite:build": "vite build",
    "vite:preview": "vite preview"
```

####添加一段node代码，启动vite
```js
import { spawn } from 'child_process';

export default function startCommand() {
  const viteService = spawn('vite', ['--host', '0.0.0.0'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  viteService.on('close', (code) => {
    process.exit(code);
  });
}
```

[^webpack_and_vite]: [webpack项目接入 Vite 通用方案介绍](https://jishuin.proginn.com/p/763bfbd7392c)