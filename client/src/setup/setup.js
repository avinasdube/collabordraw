/**
 * File: server/setup/setup.js, client/src/setup/setup.js
 * Author: Sailash sailashs2005@gmail.com
 * Description: Description: Automates the creation of the .env configuration file.
 *              Generates secure JWT secrets, sets default environment variables,
 *              and prompts the user before overwriting existing configuration.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientEnvPath = path.join(__dirname, '..', '.env');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askToOverwrite = () => {
    console.log();
    rl.question('⚠️  .env file already exists. Do you want to overwrite it? (y/n): ', (answer) => {
        const cleaned = answer.toLowerCase().trim();
        if (cleaned === 'y' || cleaned === 'yes') {
            rl.close();
            generateEnv(true);
        } else {
            console.log('\n❌ Aborted. Existing .env file was not modified.\n');
            rl.close();
            process.exit(0);
        }
    });
};

const generateEnv = (isModified=false) => {

    const envContent = `# ==================================================
# 🌐 Client Configuration
# ==================================================

# FOR PRODUCTION: Replacement this development by production
NODE_ENV=development
`;

    try {
        fs.writeFileSync(clientEnvPath, envContent.trim(), { flag: 'w' });

        console.log(`\n✅ .env file has been ${ isModified ? 'modified' : 'created' } successfully at:`);
        console.log(`   ${clientEnvPath}`);

        console.log('\n📦 Configuration complete! You can now run:');
        console.log('   npm run start-client');

        console.log('\n📝 Reminder: Update NODE_ENV as per your setup.\n');

        process.exit(0);
    }
    catch (err) {
        console.error('\n❌ Failed to write .env file:', err.message);
        process.exit(1);
    }
};

if (fs.existsSync(clientEnvPath)) {
    askToOverwrite();
}
else {
    generateEnv();
}
