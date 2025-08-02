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
import crypto from 'crypto';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverEnvPath = path.join(__dirname, '..', '.env');

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
    const accessTokenSecret = crypto.randomBytes(64).toString('hex');
    const refreshTokenSecret = crypto.randomBytes(64).toString('hex');

    const envContent = `# ==================================================
# 🌐 Server Configuration
# ==================================================

# Port on which the backend server will run
PORT=4000

# MongoDB connection string
# Replace 'collabordraw' with your preferred database name if needed
MONGODB_URI=mongodb://localhost:27017/collabordraw


# ==================================================
# 🔐 CORS (Cross-Origin Resource Sharing)
# ==================================================

# Comma-separated list of allowed frontend origins
# Modify these URLs to match the domains of your frontend apps
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://127.0.0.1:5173


# ==================================================
# 🔑 JWT Authentication Settings
# ==================================================

# Secret key used to sign access tokens (keep this safe!)
ACCESS_TOKEN_SECRET=${accessTokenSecret}

# Access token lifetime (e.g., 15m = 15 minutes, 1h = 1 hour)
ACCESS_TOKEN_EXPIRY=1h

# Secret key used to sign refresh tokens (keep this safe!)
REFRESH_TOKEN_SECRET=${refreshTokenSecret}

# Refresh token lifetime (e.g., 7d = 7 days, 30d = 30 days)
REFRESH_TOKEN_EXPIRY=30d`;

    try {
        fs.writeFileSync(serverEnvPath, envContent.trim(), { flag: 'w' });

        console.log(`\n✅ .env file has been ${ isModified ? 'modified' : 'created' } successfully at:`);
        console.log(`   ${serverEnvPath}`);

        console.log('\n📦 Configuration complete! You can now run:');
        console.log('   npm run start-server');

        console.log('\n📝 Reminder: Update PORT, MONGODB_URI, and CORS_ORIGIN as per your setup.\n');

        process.exit(0); // Clean exit after writing
    } catch (err) {
        console.error('\n❌ Failed to write .env file:', err.message);
        process.exit(1); // Exit with failure code
    }
};

if (fs.existsSync(serverEnvPath)) {
    askToOverwrite();
}
else {
    generateEnv();
}
