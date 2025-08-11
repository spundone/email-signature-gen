# Pre-Commit Security Checklist

Before committing and pushing code to this repository, please ensure you've completed the following security checks:

## 🔍 Essential Checks

### ✅ No Secrets or Credentials
- [ ] No `.env` files
- [ ] No API keys in code
- [ ] No database connection strings
- [ ] No private keys or certificates
- [ ] No hardcoded passwords
- [ ] No access tokens

### ✅ No Build Artifacts
- [ ] No `dist/` folder
- [ ] No `build/` folder
- [ ] No `node_modules/` folder
- [ ] No `.next/` folder
- [ ] No `.nuxt/` folder

### ✅ No IDE or OS Files
- [ ] No `.vscode/` folder
- [ ] No `.idea/` folder
- [ ] No `.DS_Store` files
- [ ] No `Thumbs.db` files
- [ ] No temporary files

### ✅ No Logs or Cache
- [ ] No `*.log` files
- [ ] No `.eslintcache`
- [ ] No `.stylelintcache`
- [ ] No `.npm` cache folder

## 🛠️ Development Checks

### ✅ Code Quality
- [ ] TypeScript compiles without errors
- [ ] No console.log statements in production code
- [ ] No debugger statements
- [ ] No TODO comments with sensitive information

### ✅ Dependencies
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] No suspicious packages added
- [ ] All dependencies are from trusted sources

### ✅ Testing
- [ ] All tests pass
- [ ] No sensitive data in test files
- [ ] Mock external services properly

## 🚀 Deployment Checks

### ✅ Environment Variables
- [ ] No environment files committed
- [ ] Use platform-specific secret management
- [ ] No secrets in deployment configs

### ✅ Build Process
- [ ] Build succeeds locally
- [ ] No build warnings about secrets
- [ ] Production build works correctly

## 📋 Quick Commands

Run these commands before committing:

```bash
# Check for secrets
grep -r "password\|secret\|key\|token" src/ --exclude-dir=node_modules

# Check for environment files
ls -la | grep "\.env"

# Check for build artifacts
ls -la | grep -E "(dist|build|node_modules)"

# Security audit
npm audit

# Type check
npm run build

# Test build
npm run preview
```

## 🚨 If You Find Issues

1. **DO NOT COMMIT** the problematic code
2. **DO** fix the issue locally
3. **DO** test the fix thoroughly
4. **DO** update this checklist if needed
5. **DO** inform the team about the issue

## 📚 Resources

- [GitHub Security Best Practices](https://docs.github.com/en/github/security)
- [OWASP Security Guidelines](https://owasp.org/)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)

## 🔄 Regular Maintenance

- **Weekly**: Run `npm audit`
- **Monthly**: Review security checklist
- **Quarterly**: Update dependencies
- **Annually**: Security code review

---

**Remember**: Security is everyone's responsibility. When in doubt, ask for help!
