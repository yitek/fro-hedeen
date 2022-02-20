const { spawn } =require('child_process');
const path = require('path');


function startCommand(workspacePath) {
  if(!workspacePath)workspacePath = process.cwd();
  
  const configFile = path.join(workspacePath,'ibuild/configVite.js')
  

  //node ./node_modules/vite/bin\vite.js --port 5000
  const args = [
    path.join(process.cwd(),'node_modules/vite/bin/vite.js')
  ];
  args.push('--config')
  args.push(configFile)
  //args.push('--host')
  //args.push('0.0.0.0')
  args.push('--port')
  args.push('6001')


  
  const viteService = spawn('node', args, {
    cwd: process.cwd(),
    stdio: 'inherit'
  });

  viteService.on('close', (code) => {
    process.exit(code);
  });
}

startCommand();