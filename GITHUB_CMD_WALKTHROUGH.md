# Ledger: Git + Command Prompt walkthrough for complete beginners

This guide shows you how to put Ledger into a **brand new GitHub repository using Git in Windows Command Prompt**.

This is the best guide to use if you want to do the upload/push part with commands instead of dragging files into GitHub in the browser.

You will still use the GitHub website to create the empty repo, because that is the simplest beginner-friendly way.

---

## What you are doing

You are going to:

1. create an empty GitHub repo
2. download and extract the prepared Ledger project
3. open **Command Prompt** in that project folder
4. run a few Git commands
5. push the project to GitHub
6. let GitHub Actions build the Windows `.exe` installer
7. download the finished installer

---

## Before you start

You need:

- a GitHub account
- **Git for Windows** installed
- the prepared Ledger project ZIP: `ledger-electron-project.zip`

---

# Part 1 — Install Git for Windows

If Git is not installed yet:

1. Go to **https://git-scm.com/download/win**
2. Download **Git for Windows**
3. Run the installer
4. For a first-time setup, the default options are fine
5. Finish the install

### Check that Git works

Open **Command Prompt** and run:

```cmd
git --version
```

If it prints a Git version number, you are ready.

---

# Part 2 — Create a brand new empty GitHub repo

1. Go to **https://github.com**
2. Log in
3. Click the **+** in the top-right
4. Click **New repository**

Use settings like these:

- **Repository name:** `ledger`
- **Description:** `Ledger desktop app and web app for analyzing Litematica materials`
- **Visibility:** **Public**

Important:

If GitHub offers these checkboxes, leave them **unchecked**:

- Add a README file
- Add .gitignore
- Choose a license

Then click:

- **Create repository**

Leave that browser tab open.
You will need the repo URL in a minute.

It will look something like:

```text
https://github.com/YOUR-USERNAME/ledger.git
```

---

# Part 3 — Download and extract the prepared Ledger ZIP

1. Download `ledger-electron-project.zip`
2. Put it somewhere easy, like your **Downloads** folder
3. Extract it to a normal folder

A good example location is:

```text
C:\Users\YOUR-NAME\Desktop\ledger
```

Inside that extracted folder, you should see files like:

```text
.github
build
vendor
scripts
index.html
main.js
preload.js
package.json
package-lock.json
README.md
GITHUB_CMD_WALKTHROUGH.md
GITHUB_NEW_REPO_WALKTHROUGH.md
LICENSE
```

Important:
The `.github` folder must be there.
That folder contains the GitHub Actions workflow that builds your Windows installer.

---

# Part 4 — Open Command Prompt in the project folder

1. Open the extracted `ledger` folder in File Explorer
2. Click the address bar
3. Type:

```text
cmd
```

4. Press **Enter**

---

# Part 5 — Check that the files are there

In Command Prompt, run:

```cmd
dir /a
```

You should see normal files and also hidden/dot folders like:

- `.github`

---

# Part 6 — Initialize Git and make the first commit

Run these commands one by one.

```cmd
git init
git add .
git commit -m "Initial Ledger desktop app upload"
git branch -M main
```

If Git complains that your name/email is not set, use these commands first:

```cmd
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Then run the commit command again.

---

# Part 7 — Connect your local folder to your GitHub repo

Copy your GitHub repo URL from the browser.

Then run:

```cmd
git remote add origin https://github.com/YOUR-USERNAME/ledger.git
```

Example:

```cmd
git remote add origin https://github.com/iNotrez/ledger.git
```

---

# Part 8 — Push the project to GitHub

Run:

```cmd
git push -u origin main
```

If a browser sign-in opens, log in and approve it.

---

# Part 9 — Check the repo on GitHub

Refresh the repo page.

Important files to confirm:

- `README.md`
- `package.json`
- `main.js`
- `preload.js`
- `index.html`
- `.github/workflows/build-windows.yml`

---

# Part 10 — Let GitHub Actions build the Windows EXE

Now click the **Actions** tab in your GitHub repo.

You should see a workflow called:

```text
Build Windows EXE
```

Often it will start automatically after your push.

If it does **not** start automatically:

1. Click **Build Windows EXE**
2. Click **Run workflow**
3. Choose branch `main`
4. Click the green **Run workflow** button

---

# Part 11 — Download the finished Windows installer

When the workflow finishes:

1. click the completed workflow run
2. scroll down to **Artifacts**
3. click:

```text
Ledger-Windows-EXE
```

4. download the artifact ZIP
5. open that ZIP
6. inside it will be your Windows installer `.exe`

---

# Part 12 — Install Ledger on Windows

Once you have the `.exe` installer:

1. double-click it
2. follow the installation steps
3. launch **Ledger** from:
   - Desktop shortcut
   - or Start menu

This Windows build is set up for automatic update support through tagged GitHub Releases [2](https://www.electron.build/docs/features/auto-update/).

---

# Part 13 — Publish an update release later

For auto-updates, you should make real releases with version tags.

## Step A — bump the version in `package.json`

Example:

- `1.0.0` → `1.0.1`

## Step B — commit and push your changes

```cmd
git add .
git commit -m "Release 1.0.1"
git push
```

## Step C — create and push the tag

```cmd
git tag v1.0.1
git push origin v1.0.1
```

That tag triggers the release build/publish path.

---

# Part 14 — Update the app later using Git CMD

When you change files later, use this pattern:

```cmd
git add .
git commit -m "Describe what changed"
git push
```

Examples:

```cmd
git add .
git commit -m "Update Ledger UI"
git push
```

```cmd
git add .
git commit -m "Improve texture loading and updater"
git push
```

Each push to `main` builds a fresh installer artifact. Tagged pushes can also publish update releases.

---

# Part 15 — Very short version of all commands

Run these from inside the extracted Ledger project folder:

```cmd
dir /a
git init
git add .
git commit -m "Initial Ledger desktop app upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ledger.git
git push -u origin main
```

Then use GitHub Actions to download `Ledger-Windows-EXE`.

---

# Part 16 — Troubleshooting

## Error: `git` is not recognized

Install Git for Windows, close Command Prompt, reopen it, and run:

```cmd
git --version
```

## Error: Please tell me who you are

Run:

```cmd
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Error: remote origin already exists

Run:

```cmd
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/ledger.git
```

## Error: repository not found

Usually the repo URL is wrong or authentication failed.

## Error: failed to push some refs

For a first setup, the cleanest fix is usually creating a brand new empty repo and trying again.

---

# Part 17 — If you get stuck

Send me one of these:

- the exact command you ran
- the exact error message
- a screenshot of Command Prompt
- a screenshot of your GitHub repo page

and I can tell you exactly what to do next.
