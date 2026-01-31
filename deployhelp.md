# Whiskey Labs - Deployment Guide

Complete step-by-step guide for deploying the Whiskey Labs website to Linode Ubuntu server.

---

## Server Information

| Item | Value |
|------|-------|
| **Provider** | Linode |
| **IP Address** | `198.74.62.215` |
| **SSH Access** | `ssh root@198.74.62.215` |
| **OS** | Ubuntu 25.10 |
| **Domain** | whiskeylabs.io |

---

## Part 1: Initial Server Setup

### 1.1 SSH into server
```bash
ssh root@198.74.62.215
```

### 1.2 Update system
```bash
apt update && apt upgrade -y
```

---

## Part 2: Install Node.js

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
node --version   # Should show v20.x
npm --version
```

---

## Part 3: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

---

## Part 4: Clone and Build Application

```bash
# Create web directory
mkdir -p /var/www && cd /var/www

# Clone repository
git clone https://github.com/WhiskeyLabs/whiskeylabs-website.git
cd whiskeylabs-website/web

# Install dependencies
npm install

# Build production bundle
npm run build
```

---

## Part 5: Start with PM2

```bash
# Start the application
pm2 start npm --name "whiskeylabs" -- start

# Save PM2 configuration
pm2 save

# Setup auto-start on server reboot
pm2 startup
# Run the command it outputs
```

### Verify PM2 is running:
```bash
pm2 status
curl http://localhost:3000
```

---

## Part 6: Install and Configure Nginx

### 6.1 Install Nginx
```bash
apt install nginx -y
```

### 6.2 Create site configuration
```bash
cat > /etc/nginx/sites-available/whiskeylabs << 'EOF'
server {
    listen 80;
    server_name whiskeylabs.io www.whiskeylabs.io 198.74.62.215;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

### 6.3 Enable the site
```bash
ln -s /etc/nginx/sites-available/whiskeylabs /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
```

---

## Part 7: Configure Firewall

```bash
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable
```

---

## Part 8: SSL Certificate (HTTPS)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Generate SSL certificate
certbot --nginx -d whiskeylabs.io -d www.whiskeylabs.io

# Test auto-renewal
certbot renew --dry-run
```

Certificate auto-renews via systemd timer.

---

## Part 9: DNS Configuration

In your domain registrar's DNS settings, add:

| Type | Host | Value |
|------|------|-------|
| A | @ (or blank) | `198.74.62.215` |
| A | www | `198.74.62.215` |

DNS propagation takes 5-30 minutes.

---

## Part 10: GitHub Actions Auto-Deploy

### 10.1 Generate SSH key (on your Mac)
```bash
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/github_deploy
```

### 10.2 Add public key to server
```bash
ssh-copy-id -i ~/.ssh/github_deploy.pub root@198.74.62.215
```

### 10.3 Add GitHub Secrets
Go to: **GitHub repo → Settings → Secrets and variables → Actions**

Add these secrets:
| Secret Name | Value |
|-------------|-------|
| `SERVER_HOST` | `198.74.62.215` |
| `SERVER_USER` | `root` |
| `SERVER_SSH_KEY` | Contents of `~/.ssh/github_deploy` (private key) |

### 10.4 Workflow file
Location: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Linode

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/whiskeylabs-website
            git pull origin main
            cd web
            npm install
            npm run build
            pm2 restart whiskeylabs
            echo "✅ Deployed at $(date)"
```

---

## Quick Reference Commands

### PM2 Commands
```bash
pm2 status              # Check app status
pm2 logs whiskeylabs    # View logs
pm2 restart whiskeylabs # Restart app
pm2 stop whiskeylabs    # Stop app
pm2 delete whiskeylabs  # Remove from PM2
```

### Nginx Commands
```bash
nginx -t                      # Test config
systemctl restart nginx       # Restart Nginx
systemctl status nginx        # Check status
tail -f /var/log/nginx/error.log  # View errors
```

### Manual Deploy (on server)
```bash
cd /var/www/whiskeylabs-website
git pull origin main
cd web
npm install
npm run build
pm2 restart whiskeylabs
```

---

## Deployment Flow

```
┌─────────────────┐
│  Local Machine  │
│  (make changes) │
└────────┬────────┘
         │
         ▼ git push origin main
┌─────────────────┐
│     GitHub      │
│  (triggers CI)  │
└────────┬────────┘
         │
         ▼ GitHub Actions
┌─────────────────┐
│  Linode Server  │
│  git pull       │
│  npm install    │
│  npm run build  │
│  pm2 restart    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  whiskeylabs.io │
│   (live site)   │
└─────────────────┘
```

---

## Key Credentials & Paths

### Server
| Item | Value |
|------|-------|
| IP | `198.74.62.215` |
| SSH | `ssh root@198.74.62.215` |
| App Path | `/var/www/whiskeylabs-website/web` |
| Nginx Config | `/etc/nginx/sites-available/whiskeylabs` |
| SSL Certs | `/etc/letsencrypt/live/whiskeylabs.io/` |

### Local (Mac)
| Item | Value |
|------|-------|
| Project | `/Users/hmenon/Documents/Projects/WhiskeyLabs Website` |
| Deploy Key | `~/.ssh/github_deploy` |
| Deploy Key (pub) | `~/.ssh/github_deploy.pub` |

### GitHub
| Item | Value |
|------|-------|
| Repo | `WhiskeyLabs/whiskeylabs-website` |
| Actions | `github.com/WhiskeyLabs/whiskeylabs-website/actions` |
| Secrets | 3 configured (SERVER_HOST, SERVER_USER, SERVER_SSH_KEY) |

### URLs
| Environment | URL |
|-------------|-----|
| Production | https://whiskeylabs.io |
| Direct IP | http://198.74.62.215 |
| Local Dev | http://localhost:6006 |

---

## Troubleshooting

### App not responding
```bash
pm2 logs whiskeylabs --lines 50
pm2 restart whiskeylabs
```

### Nginx errors
```bash
nginx -t
tail -f /var/log/nginx/error.log
```

### Port 3000 in use
```bash
lsof -i :3000
pm2 delete all
pm2 start npm --name "whiskeylabs" -- start
```

### SSL certificate issues
```bash
certbot renew --force-renewal
systemctl restart nginx
```

### GitHub Actions failing
1. Check Actions tab for error logs
2. Verify secrets are set correctly
3. Test SSH key: `ssh -i ~/.ssh/github_deploy root@198.74.62.215 "echo works"`
