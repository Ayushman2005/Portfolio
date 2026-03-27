import { exec } from 'child_process';
import fs from 'fs';

exec('npx vite build', (err, stdout, stderr) => {
    fs.writeFileSync('clean_build_err.txt', stdout + '\n\n' + stderr);
});
