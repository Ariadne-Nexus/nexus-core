# Contributing Guidelines

## Pull Request Best Practices

### Vercel Build Rate Limits

This project is deployed on Vercel's free tier, which has **build rate limits**. To avoid hitting these limits:

1. **Close stale PRs** - Don't leave PRs open indefinitely
2. **Limit concurrent PRs** - Keep maximum 3-5 PRs open at once
3. **Use Draft PRs** - Mark experimental work as drafts
4. **Merge or close quickly** - Don't let PRs sit for days

### When Builds Fail Due to Rate Limits

If you see this error:
```
Vercel build rate limit exceeded
upgradeToPro=build-rate-limit
```

**Solution:**
1. Close unnecessary open PRs
2. Wait 1-2 hours for the rate limit to reset
3. Push changes directly to `main` if urgent

### CI/CD Workflow

This project uses:
- **GitHub Actions** - Runs tests on every push/PR (Node 18, 20, 22)
- **Vercel** - Deploys preview for every PR and production for `main`

### Development Workflow

1. **Make changes on main** for quick fixes
2. **Create a PR** for major features that need review
3. **Test locally first**: `npm run build` before pushing
4. **Close your PR** once merged or if superseded

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests/validation
./scripts/validate.sh

# Build for production
npm run build
```

## Python Automation Stack

See [AUTOMATION_GUIDE.md](../AUTOMATION_GUIDE.md) for detailed documentation.

```bash
# Setup automation
./scripts/setup-automation.sh

# Run automation
./run-daily.sh

# Validate everything
./scripts/validate.sh
```

## Questions?

- 📚 See [QUICKSTART.md](../QUICKSTART.md)
- 📖 See [AUTOMATION_GUIDE.md](../AUTOMATION_GUIDE.md)
- 🐛 Open an issue
- 📅 [Book a call](https://cal.com/avidelta/15min)
