import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {config as loadDotenv} from 'dotenv';

const envPath = resolve(process.cwd(), '../.env.local');

if (existsSync(envPath))
    loadDotenv({
        path: envPath,
        override: false,
        quiet: true,
    });
