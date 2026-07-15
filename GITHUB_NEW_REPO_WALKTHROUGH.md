# Ledger: complete GitHub walkthrough for absolute beginners

> Prefer using Git in Command Prompt instead of browser file upload?
>
> Use this file instead:
>
> `GITHUB_CMD_WALKTHROUGH.md`
>
> That guide walks you through the Git CMD method step by step.

This guide assumes:

- you are creating a **brand new GitHub repository**
- you have **little or no GitHub experience**
- you want GitHub to build your **Windows `.msi` installer** for you
- you already have the prepared Ledger project files

This is the easiest path because GitHub will do the Windows build for you.

---

# Part 1 — What you are trying to do

You are going to:

1. create a GitHub account (if needed)
2. create a new repository
3. upload the Ledger project files
4. let GitHub Actions build the Windows installer
5. download the finished `.msi`

You do **not** need to understand coding to do this.

---

# Part 2 — Before you start

You need the prepared Ledger project folder or ZIP.

If you downloaded a ZIP from me:

1. find `ledger-electron-project.zip`
2. extract it first
3. open the extracted folder

Important:

- upload the **contents of the extracted folder**
- do **not** upload the ZIP file itself as a single file

When extracted, you should see files/folders like these:

```text
.github
build
vendor
scripts
index.html
main.js
package.json
package-lock.json
README.md
GITHUB_NEW_REPO_WALKTHROUGH.md
WINDOWS_MSI_GUIDE.md
LICENSE
```

---

# Part 3 — Create a GitHub account

If you already have one, skip to Part 4.

1. Go to **https://github.com**
2. Click **Sign up**
3. Enter your email
4. Create a password
5. Choose a username
6. Complete the verification steps
7. Log in

Tip:
Your username becomes part of your public GitHub profile URL.

---

# Part 4 — Create a brand new repository

1. While logged into GitHub, click the **+** icon in the top-right corner
2. Click **New repository**
3. Fill in the form like this:

### Repository name
Use something simple like:

```text
ledger
```

or:

```text
litematica-ledger
```

### Description
You can put:

```text
Ledger desktop app and web app for analyzing Litematica schematic materials
```

### Public or Private
Choose **Public**.

Why public?

- easier for sharing
- Actions and Releases are straightforward
- simplest setup for a first repo

### Initialize repository options
If GitHub shows checkboxes like:

- Add a README file
- Add .gitignore
- Choose a license

then for this project:

- **leave README unchecked**
- **leave .gitignore unchecked**
- **leave license unchecked**

Why?
Because the prepared project already includes those files.

4. Click **Create repository**

GitHub will open your new empty repository page.

---

# Part 5 — Upload the Ledger files into the repo

On the new empty repository page, GitHub usually shows a setup screen.

Look for either:

- **uploading an existing file**
- or **Add file** → **Upload files**

## Upload method

1. Click **Upload files**
2. Open the extracted Ledger project folder on your computer
3. Select **everything inside that folder**
4. Drag all of it into the GitHub upload page

Very important:

- upload the **files and folders inside** the extracted folder
- not the outer folder alone if GitHub doesn’t include hidden folders
- especially make sure `.github` uploads too

### If you do not see `.github`
Some systems hide folders beginning with a dot.

If that happens, use one of these methods:

#### Option A — drag the whole extracted folder contents from your file manager
Sometimes this keeps hidden folders.

#### Option B — use GitHub Desktop later
Only do this if the browser upload gives you trouble.

But try browser upload first.

## Wait for upload to finish
GitHub will show the file list.

Scroll and confirm you can see things like:

- `README.md`
- `package.json`
- `main.js`
- `index.html`
- `.github/workflows/build-windows.yml`

## Commit the upload
At the bottom of the page, you will see **Commit changes**.

Use this message:

```text
Initial Ledger desktop app upload
```

Then click:

**Commit changes**

Your project is now in GitHub.

---

# Part 6 — Check that the important files are there

After upload, your repo home page should show files like:

```text
.github/
build/
vendor/
scripts/
index.html
main.js
package.json
package-lock.json
README.md
GITHUB_NEW_REPO_WALKTHROUGH.md
WINDOWS_MSI_GUIDE.md
LICENSE
```

Now check one especially important file:

1. click `.github`
2. click `workflows`
3. make sure `build-windows.yml` is there

If that file exists, GitHub Actions can build your Windows installer.

---

# Part 7 — Let GitHub build the Windows MSI automatically

The workflow is set to run automatically when you push to `main`.

Since your first upload was committed to `main`, GitHub should usually start building automatically.

## How to check

1. Click the **Actions** tab near the top of the repo
2. On the left, you should see a workflow called:

```text
Build Windows MSI
```

3. Click it
4. You should see a run either:
   - already in progress
   - completed successfully
   - or failed

If it is running, wait until it finishes.

The first build may take several minutes.

---

# Part 8 — If it did not start automatically

You can run it manually.

1. Go to the **Actions** tab
2. Click **Build Windows MSI** in the left sidebar
3. Click the **Run workflow** button
4. Choose the `main` branch
5. Click the green **Run workflow** button

Then wait for the build to finish.

---

# Part 9 — Download the finished MSI installer

When the workflow is done:

1. open the workflow run
2. scroll down to the **Artifacts** section
3. click:

```text
Ledger-Windows-MSI
```

4. download the artifact ZIP
5. open it on your computer
6. inside it, you should find your Windows `.msi` installer

That `.msi` is the Windows installer for Ledger.

---

# Part 10 — Install Ledger on Windows

Once you have the `.msi` file:

1. move it to a Windows computer
2. double-click it
3. follow the installation steps
4. launch **Ledger** from:
   - Desktop shortcut
   - or Start menu

---

# Part 11 — Optional: make a GitHub Release too

This is optional, but nice if you want a clean downloadable release page.

The workflow is already set up so that if you push a version tag like:

```text
v1.0.0
```

GitHub can attach the built `.msi` to a Release.

If you are a total beginner, skip this for now.
Use the **Actions artifact download** first.

---

# Part 12 — How to update the app later

If you want to replace the app with a newer version later:

1. open your GitHub repo
2. click **Add file** → **Upload files**
3. upload the updated files
4. choose to replace existing files when prompted
5. commit the changes

That new commit will trigger the Windows build again.

Then:

1. go to **Actions**
2. open the newest workflow run
3. download the newest `Ledger-Windows-MSI` artifact

---

# Part 13 — What README.md is for

`README.md` is the front page of your repository.

When someone opens your repo, GitHub automatically shows the contents of that file.

For Ledger, the README is already prepared.
You do not need to write one from scratch.

---

# Part 14 — Beginner troubleshooting

## Problem: I uploaded files but the Actions tab shows nothing

Possible reasons:

- the workflow file did not upload
- `.github/workflows/build-windows.yml` is missing
- you uploaded a ZIP instead of the extracted files

Fix:

1. go back to the repo home page
2. check that `.github/workflows/build-windows.yml` exists
3. if it does not, upload the missing files again

---

## Problem: The workflow failed

1. click the failed workflow run
2. click the failed step to open the logs
3. copy the error text
4. send it to me and I can help you fix it

---

## Problem: I cannot see the `.github` folder on my computer

That folder name starts with a dot, so some systems hide it.

If needed:

- on Mac: press `Cmd + Shift + .` in Finder to show hidden files
- on Windows: in File Explorer, turn on **View** → **Show** → **Hidden items**

Then upload again.

---

## Problem: I uploaded the ZIP file instead of the extracted contents

Delete it or ignore it, then:

1. extract the ZIP on your computer
2. upload the extracted files/folders instead

---

## Problem: I do not know if I should use the browser or GitHub Desktop

For your first time:

- use the **browser upload method** first
- it is simpler

Only switch to GitHub Desktop if the browser upload is giving you trouble.

---

# Part 15 — Your simplest possible path

If you want the shortest version:

1. create a new public repo
2. upload the extracted Ledger project files
3. commit changes
4. open **Actions**
5. run **Build Windows MSI** if needed
6. wait
7. download **Ledger-Windows-MSI** from Artifacts
8. extract the artifact ZIP
9. use the `.msi`

---

# Part 16 — If you want help during the process

If you get stuck, send me:

- a screenshot of what you see
- or the exact error message
- or tell me what step number you are on from this guide

Then I can guide you from that exact point.
