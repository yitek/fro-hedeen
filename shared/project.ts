export interface ProjectOptions{
	name?:string
	description?:string
	path?:string
	dependences?:any
	devDependences?:any
}
export function createProject(options: ProjectOptions){
	console.log(' create project')
	return options
}