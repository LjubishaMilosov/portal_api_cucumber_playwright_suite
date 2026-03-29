# Security Guidelines

## 🔐 Critical: Never Commit These Files

### Environment Secrets

- ❌ `.env` (contains API keys)

- ❌ `.env.local`

- ❌ `.env.*.local`

- ❌ `.env.production`

- ❌ `.env.development`

### Credentials & Keys

- ❌ JWT tokens or OAuth credentials

- ❌ Database passwords

- ❌ SSL certificates (`.pem`, `.key`, `.pfx`)

- ❌ SSH keys

- ❌ AWS credentials

- ❌ API tokens from 3rd-party services

### Generated Data

- ❌ `data/*.json` (contains API responses - may have sensitive data)

- ❌ `reports/` (may contain test data)

- ❌ `node_modules/` (dependency cache)

---

## ✅ Setup for New Developers

### Step 1: Clone the Repository

```bash

git clone <repo-url>

cd Playwright_API_Test_Complete_Artem

```

### Step 2: Create Local Configuration

```bash

# Copy the template

cp .env.example .env



# Edit the file with your credentials (DO NOT COMMIT)

# Use your editor or command line:

# macOS/Linux:

nano .env



# Windows (PowerShell):

notepad .env

```

### Step 3: Fill in Credentials

```env

API_KEY=Kk6XpXF1Fkah6URiKruJJw==

API_BASE_URL=https://api-bo-core-qa.btobet.net/

INTERNALID=710308

DEFAULT_GAME_CODE=PPL_PGC_vs7pigs

```

### Step 4: Verify Setup

```bash

# Check that .env is NOT tracked by git

git status | grep ".env"

# Should return: nothing (file is ignored)



# Install dependencies

npm install



# Run a test to verify

npm run test:dev

```

---

## 🛡️ Pre-Commit Verification

Before pushing to remote, verify no sensitive files are staged:

```bash

# Show all files to be committed

git diff --cached --name-only



# If you see .env or data files, unstage them:

git reset .env

git reset data/



# Use git status to double-check

git status

```

### Git Hooks (Optional but Recommended)

Create `.git/hooks/pre-commit` to auto-check:

```bash

#!/bin/bash

# Prevent committing .env files

if git diff --cached --name-only | grep -E "\.env|secrets/"; then

  echo "❌ ERROR: Attempting to commit sensitive files!"

  echo "   Do not commit: .env, .env.local, secrets/, API keys"

  exit 1

fi

```

Make it executable:

```bash

chmod +x .git/hooks/pre-commit

```

---

## 🚨 If You Accidentally Commit Secrets

### Immediate Action

```bash

# Stop and do NOT push to remote

git log --oneline | head -1



# Remove from git history (careful: rewrites history)

git rm --cached .env

git commit --amend --no-edit



# Rotate your credentials immediately

# (treat as if they were exposed)

```

### Report to Team

- Notify team lead immediately

- Rotate API keys/tokens in BtoBet admin panel

- Create a new API key for development

---

## 📋 Data Sensitivity

### Response Data in `data/` Folder

Test response files may contain:

- ✅ Safe to keep: Non-sensitive API structures

- ⚠️ Be careful with: Customer IDs, pagination data

- ❌ Remove before committing: PII (personal info), emails, real player data

**How to handle:**

1. Keep local `data/` folder for debugging

2. Add `data/` to `.gitignore` (already done)

3. Share sanitized examples in documentation only

---

## 🔑 API Key Rotation

### When to Rotate

- A developer leaves the team

- Key accidentally exposed/committed

- Security audit or policy change

- Quarterly security rotation

### How to Rotate

1. Generate new key in BtoBet admin panel

2. Update your local `.env` file

3. Test with new key: `npm run test:dev`

4. Notify team to update their local `.env`

5. Retire/disable old key in admin panel

---

## 🤝 Sharing Credentials Securely

### For Onboarding Team Members

**DON'T:** Send via email, Slack, or chat

**DO:** Use secure methods:

- Password manager with shared vault (1Password, Vault, LastPass)

- In-person or video call (read back to confirm)

- Secure credential store (AWS Secrets Manager, HashiCorp Vault)

---

## Sensitive File Checklist

- [ ] `.env` is in `.gitignore` ✓ (already added)

- [ ] `.env` file exists locally but NOT in repo

- [ ] `.env.example` exists with placeholders (✓ created)

- [ ] `data/` folder is in `.gitignore` ✓ (already added)

- [ ] No API keys in feature files (.feature)

- [ ] No credentials in step definitions (.ts)

- [ ] No secrets in README or documentation

- [ ] Team members understand to never commit `.env`

---

## Reference Documents

- See: `.env.example` - Template for new setup

- See: `.gitignore` - Complete list of ignored files

- See: `.vscode/settings.json` - IDE configuration (secure defaults)

---

## Questions?

If you're unsure whether a file should be committed:

1. Check `.gitignore` matching

2. Run: `git status`

3. If in doubt, ask before pushing!

**Remember: It's easier to add files later than to remove them from git history.**
