# Admin Dashboard Setup Guide

This admin dashboard allows you to manage your portfolio content directly through GitHub.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# NextAuth Secret (required for session encryption)
# Generate with: openssl rand -base64 32
AUTH_SECRET=your_generated_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_USERNAME=your_github_username

# GitHub Repository (for content management)
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: "Portfolio Admin"
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-domain.com/api/auth/callback`
4. Copy the Client ID and Client Secret to your `.env.local`

## Features

- **Overview**: Dashboard analytics with project counts, article counts, and recent commits
- **Projects**: Create, edit, delete, and manage MDX project files
- **Articles**: Create, edit, delete, and manage MDX article files
- **Experience**: Visual form editor for work experience
- **Certifications**: Visual form editor for certifications
- **Settings**: Edit site configuration (name, social links, etc.)
- **Media Library**: View and manage uploaded images

## Access

Navigate to `/admin` to access the dashboard. You'll be redirected to GitHub OAuth login if not authenticated.

Only the GitHub username specified in `GITHUB_USERNAME` will have access.

## Content Structure

- Projects: `content/projects/*.mdx`
- Articles: `content/articles/*.mdx`
- Experience: `lib/experience.ts`
- Certifications: `lib/certifications.ts`
- Site Config: `lib/site-config.ts`
- Media: `public/`

All changes are committed directly to your GitHub repository, triggering Vercel redeployment.
