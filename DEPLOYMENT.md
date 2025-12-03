# Deploying COLY to DigitalOcean App Platform

This guide will help you deploy your COLY learning platform to DigitalOcean App Platform.

## Prerequisites

- DigitalOcean account (you already have this!)
- GitHub account
- Git repository with your code (initialized locally)

## Step 1: Push to GitHub

1. **Create a new GitHub repository**:
   - Go to https://github.com/new
   - Repository name: `coly`
   - Description: "Code Online, Learn Yourself - Software Engineering and DevOps learning platform"
   - Choose Public or Private
   - **Do NOT initialize with README** (we already have code)
   - Click "Create repository"

2. **Push your local code to GitHub**:
   ```bash
   cd /Users/dano/code/coly
   git remote add origin https://github.com/YOUR_USERNAME/coly.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to DigitalOcean App Platform

1. **Go to DigitalOcean App Platform**:
   - Log in to https://cloud.digitalocean.com/
   - Click "Create" → "Apps"

2. **Connect your GitHub repository**:
   - Choose "GitHub" as the source
   - Authorize DigitalOcean to access your GitHub (if first time)
   - Select your `coly` repository
   - Choose the `main` branch
   - Click "Next"

3. **Configure your app**:
   - **Name**: `coly`
   - **Region**: Choose the closest to your users (e.g., London for UK)
   - **Branch**: `main`
   - **Autodeploy**: Enable (recommended - deploys automatically on git push)

4. **Configure Build Settings**:
   - **Type**: Static Site
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Environment Variables**: None needed for now

5. **Choose a plan**:
   - **Starter** plan is free and perfect for getting started
   - Includes:
     - 3 static sites
     - 1 GB bandwidth/month
     - Custom domain support

6. **Review and Launch**:
   - Review your configuration
   - Click "Create Resources"
   - Wait for the build to complete (5-10 minutes)

## Step 3: Configure Custom Domain (coly.uk)

1. **Add your domain in DigitalOcean**:
   - In your app settings, go to "Settings" → "Domains"
   - Click "Add Domain"
   - Enter `coly.uk` and `www.coly.uk`

2. **Update DNS records**:
   - Go to your domain registrar where you bought `coly.uk`
   - Add these DNS records:

   **For coly.uk:**
   ```
   Type: A
   Host: @
   Value: [IP provided by DigitalOcean]
   ```

   **For www.coly.uk:**
   ```
   Type: CNAME
   Host: www
   Value: [CNAME provided by DigitalOcean]
   ```

3. **Wait for DNS propagation** (can take up to 48 hours, usually much faster)

4. **Enable HTTPS**:
   - DigitalOcean automatically provisions a free SSL certificate
   - Your site will be accessible via https://coly.uk

## Alternative: Deploy with DigitalOcean CLI

If you prefer command-line deployment:

```bash
# Install doctl (DigitalOcean CLI)
brew install doctl

# Authenticate
doctl auth init

# Create app from spec
doctl apps create --spec .do/app.yaml
```

Create `.do/app.yaml`:
```yaml
name: coly
region: lon
static_sites:
- name: coly
  github:
    repo: YOUR_USERNAME/coly
    branch: main
    deploy_on_push: true
  build_command: npm run build
  output_dir: build
  routes:
  - path: /
```

## Automatic Deployments

Once set up, your workflow is:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. DigitalOcean automatically builds and deploys
4. Your site updates in 5-10 minutes

## Build Configuration

The site is configured for static deployment with these npm scripts:

```json
{
  "scripts": {
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve"
  }
}
```

DigitalOcean will run `npm run build` which creates optimized static files in the `build/` directory.

## Troubleshooting

### Build Fails
- Check the build logs in DigitalOcean dashboard
- Ensure `package.json` has correct dependencies
- Try building locally: `npm run build`

### Site Not Updating
- Check if autodeploy is enabled
- Verify the correct branch is selected
- Manual trigger: Click "Actions" → "Force Rebuild"

### Domain Not Working
- Verify DNS records are correct
- Wait for DNS propagation (check with `dig coly.uk`)
- Ensure SSL certificate is provisioned

## Cost Estimate

- **Starter Plan**: Free
- **Basic Plan**: $5/month (if you need more bandwidth)
- **Custom Domain**: Already owned (no extra cost)

## Support

- DigitalOcean Docs: https://docs.digitalocean.com/products/app-platform/
- Community: https://www.digitalocean.com/community/

Enjoy your deployed COLY platform! 🚀
