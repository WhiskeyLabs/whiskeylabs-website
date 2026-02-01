# Deployment Sync Diagnosis & Fix Plan

The goal is to determine why the live site at `whiskeylabs.io` is not reflecting the latest changes pushed to GitHub, despite the deployment action reporting success.

## Proposed Strategy

### 1. Diagnostic Phase
I will create a temporary GitHub Action workflow specifically for debugging the server state. This workflow will:
- List the contents of `/var/www/whiskeylabs-website` recursively.
- Show the last 10 commits on the server's local repository (`git log -n 10`).
- Check the PM2 process list and process details (`pm2 list`, `pm2 show whiskeylabs`).
- Check the current running port and Node.js environment on the server.
- Tail the PM2 logs to see if there are runtime errors.

### 2. Implementation Phase
Based on the diagnostics, I will:
- Correct the deployment path if it's mismatched.
- Fix any build errors or dependency issues found on the server.
- Ensure PM2 is correctly configured to serve the newly built application.
- Update the main `deploy.yml` workflow with more robust error checking (e.g., `set -e`, logging build output).

## Verification Plan

### Automated Tests
- **Diagnostic Workflow**: Push the `debug_server.yml` and inspect logs.
- **GitHub Action Logs**: Verify that the main `Deploy to Linode` workflow shows actual file changes during `git pull`.

### Manual Verification
- **Live Audit**: Visit `https://whiskeylabs.io` and check for the theme toggle and the new sculpture.
- **Console Check**: Verify that `api/contact` returns the expected response (or 400 for missing fields) instead of a 404 or 500.
