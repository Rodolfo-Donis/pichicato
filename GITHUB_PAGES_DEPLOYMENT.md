# Deploying Pichicato to GitHub Pages

This guide will walk you through deploying the Pichicato React application to GitHub Pages for free hosting.

## Prerequisites

1. **GitHub account** (free)
2. **Git** installed and configured on your machine
3. **Node.js and npm** installed
4. **GitHub CLI** (optional but recommended)

## Step 1: Install GitHub CLI (Optional)

```bash
# macOS
brew install gh

# Windows
# Download from https://cli.github.com/

# Linux
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

## Step 2: Login to GitHub CLI

```bash
gh auth login
```

Follow the prompts to authenticate with your GitHub account.

## Step 3: Create a GitHub Repository

### Option A: Using GitHub CLI
```bash
# Create a new repository
gh repo create pichicato --public --source=. --remote=origin --push

# Or if you want it private
gh repo create pichicato --private --source=. --remote=origin --push
```

### Option B: Using GitHub Web Interface
1. Go to [github.com](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it "pichicato"
5. Choose public or private
6. Don't initialize with README (since you already have one)
7. Click "Create repository"

Then connect your local repository:
```bash
git remote add origin https://github.com/YOUR_USERNAME/pichicato.git
git branch -M main
git push -u origin main
```

## Step 4: Install gh-pages Package

```bash
npm install --save-dev gh-pages
```

## Step 5: Update package.json

Add the following to your `package.json`:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/pichicato",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 6: Configure for GitHub Pages

Since this is a React Router app, you need to handle client-side routing. Create a `public/404.html` file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Pichicato - Toy Store</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script takes the current url and converts the path and query
      // string into just a query string, and then redirects the browser
      // to the new url with only a query string and hash fragment.
      var pathSegmentsToKeep = 0;

      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

And update your `public/index.html` to include this script before the closing `</head>` tag:

```html
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  // MIT License
  // https://github.com/rafgraph/spa-github-pages
  // This script checks to see if a redirect is present in the query string,
  // converts it back into the correct url and adds it to the
  // browser's history using window.history.replaceState(...),
  // which won't cause the browser to attempt to load the new url.
  // When the single page app is loaded further down in this file,
  // the correct url will be waiting in the browser's history for
  // the single page app to route accordingly.
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

## Step 7: Build and Deploy

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Step 8: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Click "Save"

## Step 9: Wait for Deployment

GitHub Pages may take a few minutes to deploy your site. You can check the status in the "Actions" tab of your repository.

## Step 10: Access Your Site

Your site will be available at: `https://YOUR_USERNAME.github.io/pichicato`

## Automatic Deployment with GitHub Actions

For automatic deployment on every push, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## Troubleshooting

### Common Issues

1. **404 Errors on Refresh**: Make sure you've added the 404.html and the script to index.html
2. **Build Fails**: Check that all dependencies are properly installed
3. **Deployment Fails**: Ensure you have write permissions to the repository

### Useful Commands

```bash
# Check deployment status
gh pages status

# Force rebuild and redeploy
npm run build
npm run deploy

# Check if gh-pages branch exists
git branch -a

# Clean gh-pages branch (if needed)
git push origin --delete gh-pages
npm run deploy
```

### Environment Variables

For GitHub Pages, you'll need to set environment variables differently since it's a static site:

1. **For development**: Use `.env.local` file
2. **For production**: Use `REACT_APP_` prefix and set them in your build process

Example `.env.local`:
```
REACT_APP_SPREEDLY_ENVIRONMENT_KEY=your_key_here
REACT_APP_SPREEDLY_ACCESS_TOKEN=your_token_here
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain:
   ```
   yourdomain.com
   ```

2. Configure your domain's DNS settings to point to `YOUR_USERNAME.github.io`

3. In GitHub repository settings, add your custom domain

## Performance Optimization

1. **Enable compression** (GitHub Pages does this automatically)
2. **Optimize images** before adding them
3. **Use lazy loading** for images
4. **Minimize bundle size**

## Monitoring

- **GitHub Pages Analytics**: Available in repository settings
- **Google Analytics**: Add tracking code to index.html
- **Error Monitoring**: Consider adding Sentry or similar service

## Security Considerations

1. **Don't commit sensitive data** like API keys
2. **Use environment variables** for configuration
3. **Enable branch protection** on main branch
4. **Regular dependency updates**

## Cost

GitHub Pages is **completely free** for:
- Public repositories
- Private repositories (with GitHub Pro or higher)

## Support

- [GitHub Pages Documentation](https://pages.github.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/#github-pages)
- [GitHub Community](https://github.community/)

## Next Steps

After successful deployment:

1. Set up custom domain (if desired)
2. Add analytics tracking
3. Configure automatic deployments
4. Set up monitoring and error tracking
5. Optimize performance

---

**Note**: GitHub Pages is perfect for static sites and React applications. It's free, reliable, and integrates seamlessly with GitHub workflows. 