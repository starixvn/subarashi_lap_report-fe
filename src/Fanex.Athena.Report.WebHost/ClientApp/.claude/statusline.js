#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to estimate token count (rough approximation)
function estimateTokens(text) {
    // Rough approximation: 4 characters per token on average
    return Math.ceil(text.length / 4);
}

// Function to get token usage from transcript
function getTokenUsage(transcriptPath) {
    try {
        if (fs.existsSync(transcriptPath)) {
            const transcript = fs.readFileSync(transcriptPath, 'utf8');
            const estimatedTokens = estimateTokens(transcript);

            // Try to extract actual token counts from transcript if available
            const tokenMatch = transcript.match(/tokens?[:\s]*(\d+)/i);
            const actualTokens = tokenMatch ? parseInt(tokenMatch[1]) : estimatedTokens;

            return {
                used: actualTokens,
                // For demonstration, using a typical context window size
                total: getModelContextWindow(transcript)
            };
        }
    } catch (e) {
        // Error reading transcript
    }
    return { used: 0, total: 200000 };
}

// Function to get model context window size
function getModelContextWindow(transcript) {
    if (transcript.includes('claude-3-5-sonnet')) return 200000;
    if (transcript.includes('claude-3-opus')) return 200000;
    if (transcript.includes('claude-3-haiku')) return 200000;
    if (transcript.includes('sonnet-4')) return 200000;
    return 200000; // default
}

// Function to format token usage with color
function formatTokenUsage(used, total) {
    const percentage = (used / total) * 100;
    let color = '';

    if (percentage > 80) color = '\x1b[31m'; // Red
    else if (percentage > 60) color = '\x1b[33m'; // Yellow
    else color = '\x1b[32m'; // Green

    const reset = '\x1b[0m';
    const formattedUsed = used.toLocaleString();
    const formattedTotal = total.toLocaleString();
    const formattedPercentage = percentage.toFixed(2);

    return `${color}${formattedUsed}/${formattedTotal} (${formattedPercentage}%)${reset}`;
}

// Read JSON from stdin
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    const data = JSON.parse(input);

    // Extract values
    const model = data.model.display_name;
    const nodeVersion = process.version;

    // Get token usage
    const tokenUsage = getTokenUsage(data.transcript_path);
    const tokenDisplay = formatTokenUsage(tokenUsage.used, tokenUsage.total);

    // Check for git branch (up to 5 parent directories)
    let gitBranch = '';
    function findGitHead(currentPath, level = 0) {
        if (level > 5) return null;
        
        const gitHeadPath = path.join(currentPath, '.git', 'HEAD');
        try {
            if (fs.existsSync(gitHeadPath)) {
                return fs.readFileSync(gitHeadPath, 'utf8').trim();
            }
        } catch (e) {
            // Continue searching
        }
        
        const parentPath = path.dirname(currentPath);
        if (parentPath === currentPath) return null; // Reached root
        
        return findGitHead(parentPath, level + 1);
    }
    
    try {
        const headContent = findGitHead(process.cwd());
        if (headContent && headContent.startsWith('ref: refs/heads/')) {
            gitBranch = ` | 🌿 ${headContent.replace('ref: refs/heads/', '')}`;
        }
    } catch (e) {
        // Not a git repo or can't read HEAD
    }

    // TUI Status Line with token usage
    console.log(`[${model}] 📊 ${tokenDisplay} tokens | ⚡ ${nodeVersion}${gitBranch}`);
});