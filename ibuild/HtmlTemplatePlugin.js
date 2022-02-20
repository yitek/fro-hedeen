const { PluginOption } =require('vite')
const { readFileSync } = require('fs')
const path = require('path')

function loadHtmlContent(reqPath) {
  // 单页默认 public/index.html
  const tplPath = 'ibuild/start.html'
  // 可以根据请求的path：reqPath 作进一步的判断
  const reqFilename = path.resolve(process.cwd(), tplPath)
  return readFileSync(reqFilename)
}

module.exports =function(config){
  return {
    name: 'vite-plugin-hedeen-html-tpl',
    apply: 'serve',
    configureServer(server) {
      const { middlewares: app } = server;
      //server.middlewares.use
      app.use(async (req, res, next) => {
        const { pathname } = new URL(req.url, `http://${req.headers.host}`);
        const htmlAccepts = ['text/html', 'application/xhtml+xml'];
        const isHtml = !!htmlAccepts.find((a) => req.headers.accept.includes(a))
        if (isHtml) {
          const html = loadHtmlContent(pathname)
          res.end(html)
          return
        }
        next();
      }) // end server.middlewares.use()
    } // end configureServer()
  }// end return 
} 