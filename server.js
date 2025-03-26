const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/run-ubuntu-container', (req, res) => {
    const { githubRepo } = req.body;
    if (!githubRepo) {
        return res.status(400).json({ error: 'GitHub repository URL is required' });
    }

    console.log(`Received request to run container for repo: ${githubRepo}`);

    // Run a Docker container (modify as per your requirement)
    const command = `
    docker run -i ubuntu:latest bash -c "
    apt update &&
    apt install -y git curl &&
    git clone https://github.com/MusheerRepo/PlayWright /app &&
    cd /app &&
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&
    apt install -y nodejs &&
    npm install &&
    npm run test"
`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting container: ${stderr}`);
            return res.status(500).json({ error: 'Failed to start container', details: stderr });
        }
        console.log(`Container started with ID: ${stdout.trim()}`);
        res.json({ message: 'Container started successfully', containerId: stdout.trim() });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
