import { spawnSync } from 'node:child_process';
// Keep the local file editor out of the static production build.
const [command, ...args] = process.argv.slice(2);
const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' };
if (command !== 'dev') env.SKIP_KEYSTATIC = '1';
const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', command, ...args], { stdio: 'inherit', env });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
