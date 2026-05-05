// patch-build.ts
import { readFileSync, writeFileSync, readdirSync } from 'fs';

const dir = 'build/server/chunks';
const files = readdirSync(dir).filter(
	(f) => f.startsWith('internal-') && f.endsWith('.js') && !f.endsWith('.js.map')
);
const file = files.find((f) => readFileSync(`${dir}/${f}`, 'utf-8').includes('get_hooks'))!;
const path = `${dir}/${file}`;

let content = readFileSync(path, 'utf-8');

content = content.replace(
	'{handle, handleFetch, handleError, handleValidationError, init} = await import',
	'{handle, websocket, handleFetch, handleError, handleValidationError, init} = await import'
);

content = content.replace(
	'\t\treroute,\n\t\ttransport\n\t};',
	'\t\treroute,\n\t\ttransport,\n\t\twebsocket\n\t};'
);

writeFileSync(path, content);
console.log(`Patched ${path}`);
