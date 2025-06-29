# Deploying Pichicato to Heroku

This guide will walk you through deploying the Pichicato React application to Heroku.

## Prerequisites

1. **Node.js and npm** installed on your machine
2. **Git** installed and configured
3. **Heroku CLI** installed (download from [heroku.com](https://devcenter.heroku.com/articles/heroku-cli))
4. **Heroku account** (free tier available)

## Step 1: Install Heroku CLI

If you haven't installed the Heroku CLI yet:

```bash
# macOS (using Homebrew)
brew tap heroku/brew && brew install heroku

# Windows
# Download and run the installer from https://devcenter.heroku.com/articles/heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

## Step 2: Login to Heroku

```bash
heroku login
```

This will open your browser to complete the login process.

## Step 3: Prepare Your Application

Make sure your application is ready for deployment:

1. **Build the application locally** (optional, to test):
   ```bash
   npm run build
   ```

2. **Test the production build locally** (optional):
   ```bash
   npm start
   ```

## Step 4: Create a Heroku App

From your project directory:

```bash
# Create a new Heroku app
heroku create your-app-name

# Or let Heroku generate a random name
heroku create
```

## Step 5: Configure Environment Variables

Set up any environment variables your app needs:

```bash
# Set environment variables (replace with your actual values)
heroku config:set NODE_ENV=production
heroku config:set REACT_APP_SPREEDLY_ENVIRONMENT_KEY=your_spreedly_key
heroku config:set REACT_APP_SPREEDLY_ACCESS_TOKEN=your_spreedly_token
```

## Step 6: Deploy to Heroku

```bash
# Add all files to git (if not already done)
git add .

# Commit your changes
git commit -m "Prepare for Heroku deployment"

# Push to Heroku
git push heroku main
```

If your default branch is `master` instead of `main`:
```bash
git push heroku master
```

## Step 7: Open Your App

```bash
# Open your app in the browser
heroku open
```

## Step 8: Monitor Your App

```bash
# View logs
heroku logs --tail

# Check app status
heroku ps
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check the logs with `heroku logs --tail`
2. **App crashes**: Ensure all dependencies are in `package.json`
3. **Environment variables**: Make sure they're set correctly

### Useful Commands

```bash
# View detailed logs
heroku logs --tail

# Restart the app
heroku restart

# Check app status
heroku ps

# Open Heroku dashboard
heroku dashboard

# Run commands on the Heroku dyno
heroku run bash

# Scale your app (if needed)
heroku ps:scale web=1
```

### Performance Optimization

1. **Enable compression** (already included in Express server)
2. **Use CDN** for static assets
3. **Optimize images** before deployment
4. **Enable caching** headers

## Environment Variables

Make sure to set these environment variables in Heroku:

- `NODE_ENV=production`
- `REACT_APP_SPREEDLY_ENVIRONMENT_KEY` (if using Spreedly)
- `REACT_APP_SPREEDLY_ACCESS_TOKEN` (if using Spreedly)

## Custom Domain (Optional)

To use a custom domain:

```bash
# Add your domain
heroku domains:add www.yourdomain.com

# Configure DNS (follow Heroku's instructions)
```

## SSL Certificate (Automatic)

Heroku provides automatic SSL certificates for all apps.

## Monitoring and Analytics

Consider adding monitoring:

```bash
# Add New Relic (free tier available)
heroku addons:create newrelic:wayne

# Add Logentries for log management
heroku addons:create logentries:le_tryit
```

## Scaling (When Needed)

```bash
# Scale to multiple dynos
heroku ps:scale web=2

# Scale down
heroku ps:scale web=1
```

## Maintenance Mode

```bash
# Enable maintenance mode
heroku maintenance:on

# Disable maintenance mode
heroku maintenance:off
```

## Rollback (If Needed)

```bash
# List recent releases
heroku releases

# Rollback to previous version
heroku rollback v42
```

## Cost Management

- **Free tier**: Limited dyno hours per month
- **Hobby dyno**: $7/month for always-on
- **Standard dynos**: $25/month and up

## Support

- [Heroku Documentation](https://devcenter.heroku.com/)
- [Heroku Support](https://help.heroku.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

## Next Steps

After successful deployment:

1. Set up monitoring and logging
2. Configure custom domain (if needed)
3. Set up CI/CD pipeline
4. Add performance monitoring
5. Configure backup strategies

---

**Note**: The free tier of Heroku has been discontinued. You'll need to use a paid plan starting at $7/month for the Hobby dyno. 