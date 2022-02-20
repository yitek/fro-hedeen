import { PluginOption, ViteDevServer } from 'vite'
import { readFileSync } from 'fs'
import * as path from 'path'

function loadHtmlContent(workspacePath:string, reqPath:string) {
  // 单页默认 public/index.html
  const tplPath = 'static'
  // 可以根据请求的path：reqPath 作进一步的判断
  const reqFilename = path.join(workspacePath,'static',reqPath)
  console.debug(`require static file: ${reqFilename}`)
  return readFileSync(reqFilename)
}

export default (workspacePath:string,config:any=null):PluginOption=>{
  if(!config) config = {}
  return {
    name: 'vite-plugin-hedeen-html-tpl',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      const { middlewares: app } = server;
      //server.middlewares.use
      app.use(async (req, res, next) => {
        const { pathname } = new URL(req.url, `http://${req.headers.host}`);
        const htmlAccepts = ['text/html', 'application/xhtml+xml'];
        const isHtml = !!htmlAccepts.find((a) => req.headers.accept.includes(a))
        if (isHtml) {
          const html = loadHtmlContent(workspacePath, pathname)
          res.end(html)
          return
        }
        next();
      }) // end server.middlewares.use()
    } // end configureServer()
  }// end return 
} 