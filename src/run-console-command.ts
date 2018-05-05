import { spawn } from 'child_process';
import Logger from './logger';

const _log = Logger('runConsoleCommand');

export default function runConsoleCommand(rootPath:string, ...args:string[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const output:string[] = [];

    const commandSplat:string[] = args.reduce((arr:string[], arg:string) => {
      return [...arr, ...arg.split(' ')];
    }, []); 

    _log('Running >>', commandSplat.join(' '));
    _log('Working Dir: ', rootPath);

    const command = spawn(commandSplat[0], commandSplat.slice(1), { cwd: rootPath });

    command.stdout.on('data', (data:Buffer) => {
      output.push(data.toString('utf-8'));
    });
    
    command.stderr.on('data', (data:any) => {
      _log('Error! ', data, output);
      reject(data);
    });
    
    command.on('close', () => {
      const collection = output.reduce((arr:string[], out:string) => {
        return [...arr, ...out.split(/[\n\r]/)];
      }, []);

      _log('Finished!', collection);
      resolve(collection);
    });
  });
}
