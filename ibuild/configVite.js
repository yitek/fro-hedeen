

const path = require('path');
const {defineConfig} = require('vite');
const {readFileSync} = require('fs');

function loadViteConfig(){
	const workspacePath = process.cwd()
	const configJsonFile = path.join(workspacePath,'ibuild/vite.json')
	const configJsonContent = readFileSync(configJsonFile)
  const viteConfig = JSON.parse(configJsonContent)

  const pluginsPath = path.join(workspacePath,'ibuild')
  for(let i =0,j=viteConfig.plugins.length;i<j;i++){
    const pluginName = viteConfig.plugins[i];
    const pluginFile = path.join(pluginsPath, pluginName+".js");
    console.debug(`load vite plugin ${pluginName}:${pluginFile}`)
    const plugin = require(pluginFile)
		console.log(plugin)
		viteConfig.plugins[i] = plugin(viteConfig)
  }
  return defineConfig(viteConfig)
}

module.exports = loadViteConfig()