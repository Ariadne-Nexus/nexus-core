# Pre-commit Framework Guide

> Comprehensive guide to the pre-commit framework integration for automated code quality and security checks

## 📋 Overview

This project uses [pre-commit](https://pre-commit.com/) to automatically validate code quality, detect secrets, and update documentation **before every commit**. This catches issues early and maintains consistency across the team.

## 🚀 Quick Start

### Installation (One-Time Setup)

```bash
# Install pre-commit and detect-secrets
pip install pre-commit detect-secrets

# Install git hooks
pre-commit install

# Run all hooks on all files (recommended)
pre-commit run --all-files
```

**Time to complete:** ~2-3 minutes for first run (hooks are cached for subsequent runs)

### Verification

```bash
# Check installation
pre-commit --version
detect-secrets --version

# View configured hooks
pre-commit run --all-files --show-diff-on-failure
```

## 🎯 What Gets Checked

### Standard Hooks (8 hooks)

| Hook | What It Does | Auto-Fix |
|------|--------------|----------|
| **check-yaml** | Validates YAML syntax | ❌ |
| **check-json** | Validates JSON syntax | ❌ |
| **end-of-file-fixer** | Ensures newline at end of files | ✅ |
| **trailing-whitespace** | Removes trailing whitespace (preserves markdown line breaks) | ✅ |
| **check-added-large-files** | Prevents commits over 1MB | ❌ |
| **check-merge-conflict** | Detects merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) | ❌ |
| **check-executables-have-shebangs** | Validates script shebangs (`#!/bin/bash`, `#!/usr/bin/env python3`) | ❌ |
| **mixed-line-ending** | Normalizes to LF line endings | ✅ |

### Security Hooks (1 hook)

| Hook | What It Does | Auto-Fix |
|------|--------------|----------|
| **detect-secrets** | Scans for accidentally committed secrets (API keys, tokens, passwords) | ❌ |

### Custom Hooks (1 hook)

| Hook | What It Does | Auto-Fix |
|------|--------------|----------|
| **security-dashboard-updater** | Auto-updates quarterly compliance dashboard in audit template | ✅ |

## 📖 Usage Patterns

### Normal Workflow (Hooks Run Automatically)

```bash
# Make changes
vim docs/security-audit-template.md

# Stage changes
git add docs/security-audit-template.md

# Commit (hooks run automatically)
git commit -m "docs: Update audit findings"

# Hooks will:
# 1. Check YAML/JSON syntax
# 2. Fix end-of-file issues
# 3. Trim trailing whitespace
# 4. Check for large files
# 5. Detect merge conflicts
# 6. Validate shebangs
# 7. Normalize line endings
# 8. Scan for secrets
# 9. Update security dashboard (if audit template or updater script changed)
```

**If hooks find issues:**
- **Auto-fix hooks** (EOF, whitespace, line endings, dashboard) will fix issues and re-stage files
- **Validation hooks** (YAML, JSON, secrets) will block commit and show errors

### Manual Run (Without Committing)

```bash
# Run all hooks on all files
pre-commit run --all-files

# Run all hooks on staged files only
pre-commit run

# Run specific hook
pre-commit run check-yaml
pre-commit run detect-secrets
pre-commit run security-dashboard-updater

# Show diffs when hooks fail
pre-commit run --all-files --show-diff-on-failure
```

### Bypassing Hooks (Emergency Only)

```bash
# Skip all hooks (not recommended)
git commit --no-verify -m "emergency: Fix production issue"

# Or use env variable
SKIP=all git commit -m "emergency: Fix production issue"

# Skip specific hook
SKIP=detect-secrets git commit -m "docs: Update example with dummy API key"
```

**⚠️ Use bypass sparingly!** Bypassing hooks means:
- Code quality issues may slip through
- Secrets might be committed accidentally
- Dashboard may become out of sync
- CI enforcement will catch issues later (causing PR failures)

## 🔧 Configuration

### Main Configuration File

`.pre-commit-config.yaml` defines all hooks:

```yaml
repos:
  # Standard hooks from pre-commit-hooks repo
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: check-yaml
      - id: check-json
      - id: end-of-file-fixer
      # ... 5 more hooks

  # Secret detection from detect-secrets repo
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.5.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
        exclude: package-lock.json

  # Custom local hooks
  - repo: local
    hooks:
      - id: security-dashboard-updater
        name: Update Security Dashboard
        language: system
        entry: bash -c '${PYTHON_BIN:-python3} scripts/update_security_dashboard.py'
```

### Secret Detection Baseline

`.secrets.baseline` contains known false positives:

```bash
# Update baseline (after reviewing flagged secrets)
detect-secrets scan --baseline .secrets.baseline

# View current baseline
cat .secrets.baseline | jq
```

## 🚨 Troubleshooting

### Issue: Hook Failed with Error

```bash
# Run hook manually to see full error
pre-commit run <hook-id> --all-files --verbose

# Examples:
pre-commit run check-yaml --all-files --verbose
pre-commit run detect-secrets --all-files --verbose
```

### Issue: Hooks Are Slow

```bash
# Pre-commit caches hook environments
# First run: ~2-3 minutes
# Subsequent runs: ~5-10 seconds

# Clear cache if needed
pre-commit clean
pre-commit gc

# Reinstall hooks
pre-commit install --install-hooks
```

### Issue: False Positive Secret Detection

```bash
# If detect-secrets flags a non-secret:
# 1. Review the flagged content
# 2. If it's a false positive, update baseline:
detect-secrets scan --baseline .secrets.baseline

# 3. Commit the updated baseline:
git add .secrets.baseline
git commit -m "chore: Update secrets baseline"
```

### Issue: Dashboard Not Updating

```bash
# Run updater manually to see errors
python3 scripts/update_security_dashboard.py

# Check if hook is configured correctly
pre-commit run security-dashboard-updater --all-files

# Verify Python binary is found
which python3
echo ${PYTHON_BIN:-python3}
```

### Issue: Git Hooks Not Running

```bash
# Verify installation
ls -la .git/hooks/pre-commit

# Reinstall if needed
pre-commit uninstall
pre-commit install

# Check hook configuration
cat .git/hooks/pre-commit
```

## 🔄 Maintenance

### Updating Hooks

```bash
# Update all hooks to latest versions
pre-commit autoupdate

# This updates .pre-commit-config.yaml:
# - pre-commit-hooks: v4.6.0 → v4.7.0
# - detect-secrets: v1.5.0 → v1.6.0

# Review changes
git diff .pre-commit-config.yaml

# Test with updated hooks
pre-commit run --all-files

# Commit if tests pass
git add .pre-commit-config.yaml
git commit -m "chore: Update pre-commit hooks"
```

### Adding New Hooks

See [pre-commit hook repository](https://github.com/pre-commit/pre-commit-hooks) and [awesome-pre-commit](https://github.com/pre-commit/pre-commit-hooks#hooks-available) for available hooks.

```bash
# Example: Add Python linter (ruff)
# Edit .pre-commit-config.yaml:

repos:
  # ... existing repos ...

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.0
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]

# Install and test
pre-commit run ruff --all-files
```

### Removing Hooks

```bash
# Edit .pre-commit-config.yaml and remove unwanted hook
# Then reinstall:
pre-commit install

# Clean up cached environments
pre-commit clean
```

## 📊 CI/CD Integration

### GitHub Actions Enforcement

`.github/workflows/pre-commit.yml` runs all hooks on every push/PR:

```yaml
name: Pre-commit Checks
on: [push, pull_request]

jobs:
  pre-commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - uses: actions/cache@v4
        with:
          path: ~/.cache/pre-commit
          key: pre-commit-${{ hashFiles('.pre-commit-config.yaml') }}
      - run: pip install pre-commit
      - run: pre-commit run --all-files --show-diff-on-failure
```

**Benefits:**
- ✅ Catches issues if developers bypass local hooks
- ✅ Ensures consistency across all contributors
- ✅ Blocks PRs with failing checks
- ✅ Shows diffs in CI output for easy debugging

## 🎓 Best Practices

### For Contributors

1. **Always install hooks:** Run `pre-commit install` after cloning repository
2. **Run before committing:** Run `pre-commit run --all-files` before creating PR
3. **Don't bypass carelessly:** Only use `--no-verify` for genuine emergencies
4. **Update baseline carefully:** Review flagged secrets before updating `.secrets.baseline`
5. **Keep hooks updated:** Run `pre-commit autoupdate` monthly

### For Maintainers

1. **Document custom hooks:** Add clear descriptions in `.pre-commit-config.yaml`
2. **Test hook updates:** Always test `pre-commit autoupdate` before committing
3. **Monitor CI failures:** Investigate pre-commit failures in CI immediately
4. **Review baseline changes:** Audit `.secrets.baseline` changes in PRs carefully
5. **Educate team:** Share this guide with new contributors

### For Security

1. **Never bypass secret detection:** If detect-secrets flags something, investigate thoroughly
2. **Rotate exposed secrets:** If secret is committed, rotate immediately (even if removed in next commit)
3. **Review false positives:** Ensure `.secrets.baseline` only contains genuine false positives
4. **Audit hook configuration:** Review `.pre-commit-config.yaml` changes in PRs
5. **Monitor secret detection logs:** Check CI output for secret detection warnings

## 📚 Additional Resources

- **Official Docs:** https://pre-commit.com/
- **Hook Repository:** https://github.com/pre-commit/pre-commit-hooks
- **Detect-Secrets:** https://github.com/Yelp/detect-secrets
- **Awesome Pre-commit:** https://github.com/pre-commit/pre-commit-hooks#hooks-available

## 🆘 Getting Help

### Common Questions

**Q: Do I need to run pre-commit install on every clone?**
A: Yes, git hooks are local to each clone. Run `pre-commit install` once after cloning.

**Q: Can I use pre-commit with other git hooks?**
A: Yes, pre-commit preserves existing hooks. Your custom hooks will be backed up to `.git/hooks/pre-commit.legacy`.

**Q: Why are my commits slower now?**
A: First run installs hook environments (~2-3 minutes). Subsequent runs are fast (~5-10 seconds) due to caching.

**Q: What if I need to commit urgently?**
A: Use `git commit --no-verify` to bypass hooks, but fix issues immediately after.

**Q: How do I disable a specific hook?**
A: Use `SKIP=hook-id git commit -m "message"` or remove from `.pre-commit-config.yaml`.

**Q: Can I run hooks on specific files?**
A: Yes: `pre-commit run --files file1.py file2.py`

### Support Channels

- **GitHub Issues:** Report bugs or request features
- **Pull Requests:** Contribute improvements to hook configuration
- **Documentation:** See `docs/SECURITY_COMPLIANCE.md` for related security docs

---

**Built with care by [automation.link](https://automation.link)** 🤖
