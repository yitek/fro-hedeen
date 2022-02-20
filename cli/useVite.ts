import { spawn } from 'child_process'
import * as path from 'path'
import { createProject } from '../shared/project'


function startCommand(workspacePath:string=null) {
  if(!workspacePath)workspacePath = process.cwd();
  
  const configFile:string = path.join(workspacePath,'dist/cli/configVite.js')
  

  // node ./node_modules/vite/bin\vite.js --port 5000
  // node --enable-source-maps  node_modules/vite/bin/vite.js -c dist/cli/configVite.js
  const cmd = 'node'
  const args:string[] = [
    '--enable-source-maps',
    path.join(process.cwd(),'node_modules/vite/bin/vite.js')
  ];
  args.push('--config')
  args.push(configFile)
  //args.push('--host')
  //args.push('0.0.0.0')
  args.push('--port')
  args.push('6001')

  console.debug(`start a new process with command line:${cmd} ${args.join(' ')} `)

  
  const viteService = spawn(cmd, args, {
    cwd: process.cwd(),
    stdio: 'inherit'
  });

  viteService.on('close', (code) => {
    process.exit(code);
  });
}
createProject(null)
startCommand()