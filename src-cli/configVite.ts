

import * as path from 'path'
import {defineConfig} from 'vite'
import {readFileSync} from 'fs'

function loadViteConfig(){
	const workspacePath = process.cwd()
	const configJsonFile = path.join(workspacePath,'config/vite.json')
	const configJsonContent = readFileSync(configJsonFile)
  const viteConfig = JSON.parse(configJsonContent.toString())

  const pluginsPath = path.join(workspacePath,'dist/cli')
  for(let i =0,j=viteConfig.plugins.length;i<j;i++){
    const pluginName = viteConfig.plugins[i];
    const pluginFile = path.join(pluginsPath, pluginName+".js");
    console.debug(`load vite plugin [${pluginName}] at:${pluginFile}`)
    const plugin = require(pluginFile).default
		console.log(plugin)
		viteConfig.plugins[i] = plugin(workspacePath,viteConfig)
  }
  return defineConfig(viteConfig)
}

export default loadViteConfig()