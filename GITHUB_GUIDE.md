<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1b1b1f,50:1c3a4a,100:1b1b1f&height=150&section=header&text=Getting%20Started%20with%20GitHub&fontSize=32&fontColor=e9e7de&animation=fadeIn&fontAlignY=40&desc=A%20complete%2C%20zero-experience%20walkthrough&descAlignY=62&descSize=15&descColor=a7ab9f" width="100%"/>

</div>

This guide assumes you have **never used GitHub before**. No command line, no software to install — everything below happens in your web browser. By the end, your project will have a home online, and you'll have a live link you can share with anyone.

<br/>

## 📖 Quick glossary

A few words you'll see below, explained in plain terms:

| Term | What it means |
|---|---|
| **GitHub** | A free website that stores your project's files and their history |
| **Repository** (or "repo") | A single project's folder on GitHub — where your files live |
| **Commit** | A saved snapshot of a change, with a short message describing it |
| **Branch** | A named version of your project's files — most projects just use one, called `main` |
| **README** | A `.md` file that GitHub automatically displays as your repo's homepage |
| **GitHub Pages** | A free feature that turns your repo's files into a live website with its own link |

<br/>

## ✅ What you'll need

- An email address
- The three files from this project: `litematica-analyzer.html`, `README.md`, and `RELEASE.md`
- About 10 minutes

<br/>

---

## Step 1 — Create a GitHub account

1. Go to **[github.com](https://github.com)**
2. Click **Sign up** in the top-right corner
3. Enter your email, create a password, and choose a username (this username becomes part of your future website link, so pick something you're happy with — e.g. `intorez`)
4. Follow the verification steps GitHub shows you (usually a quick puzzle and an email confirmation code)
5. Once verified, you'll land on your GitHub homepage — you're in!

<br/>

## Step 2 — Create a new repository

1. In the top-right corner, click the **`+`** icon, then **New repository**
2. Fill in the form:
   - **Repository name** — something like `litematica-ledger`
   - **Description** (optional) — e.g. "A material analyzer for Litematica schematics"
   - **Public** — make sure this is selected, not Private (Public repos are what let GitHub Pages serve your site for free, and it's what lets anyone open your link)
   - Leave everything else as default — **don't** check "Add a README file" since you already have one
3. Click the green **Create repository** button
4. You'll land on a mostly-empty page with setup instructions — you can ignore those, the next step covers everything you need

<br/>

## Step 3 — Upload your files

1. On your new repository's page, click **uploading an existing file** (a blue link in the middle of the page) — or if you don't see it, click **Add file → Upload files** near the top right
2. Either drag all three files (`litematica-analyzer.html`, `README.md`, `RELEASE.md`) straight into the browser window, or click **choose your files** and select them from wherever you saved them
3. Wait for the upload progress bars to finish
4. Scroll down to the **Commit changes** box. You can leave the default message ("Add files via upload") as-is
5. Click the green **Commit changes** button

Your files are now live on GitHub. Refresh the page and you'll see them listed — and since GitHub automatically displays a repo's `README.md` right on the homepage, you'll also see your nicely formatted README appear below the file list.

<br/>

## Step 4 — Rename the HTML file to `index.html`

This step makes your live link as short and clean as possible.

1. Click on `litematica-analyzer.html` in your file list to open it
2. Click the **pencil icon** (Edit this file) near the top right of the file view
3. In the box at the very top showing the filename, click into it and change it to just: `index.html`
4. Scroll down and click **Commit changes**

> Why this matters: GitHub Pages automatically loads whatever file is named `index.html` when someone visits your site's root address. Without this rename, your link would need the full filename tacked on the end.

<br/>

## Step 5 — Turn on GitHub Pages

1. Near the top of your repository, click the **Settings** tab (you'll need to scroll the tab bar or look for a gear icon)
2. In the left sidebar, click **Pages**
3. Under **Build and deployment → Source**, make sure **Deploy from a branch** is selected
4. Under **Branch**, open the dropdown, choose **`main`**, leave the folder as **`/ (root)`**, then click **Save**
5. GitHub will show a message like "Your site is ready to be published" — give it about a minute
6. Refresh the Pages settings page. Near the top you'll now see a green box with your live link, something like:

   ```
   https://yourusername.github.io/litematica-ledger/
   ```

7. Click it — your app should open, fully working, at that address

<br/>

## Step 6 — Share it

That link now works for anyone, instantly, with no download or install:

- Paste it into a Discord server, a Discord DM, a Reddit post, a forum signature, wherever
- It'll keep working as long as your repository stays Public

<br/>

## 🔄 Making updates later

Whenever you improve the tool:

1. Open your repository and click the file you want to update (e.g. `index.html`)
2. Click the **pencil icon** (Edit this file)
3. Make your changes, or select all the existing content and paste in the new version
4. Scroll down and click **Commit changes**
5. Give it a minute — your live Pages link automatically updates to the new version, no extra steps needed

<br/>

## 🩹 Troubleshooting

<details>
<summary><b>My Pages link shows a 404 error</b></summary>
<br/>

- Double-check the repository is set to **Public**, not Private — Pages doesn't work on private repos on free accounts
- Make sure you selected the **`main`** branch and **`/ (root)`** folder in the Pages settings, then clicked Save
- Give it a couple of minutes after saving — the first deploy can be slow
- Confirm the file is named exactly `index.html` (all lowercase, in the root of the repo, not inside a folder)

</details>

<details>
<summary><b>My changes aren't showing up on the live link</b></summary>
<br/>

- Make sure you clicked **Commit changes** after editing, not just closed the tab
- Hard-refresh your browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac) — browsers aggressively cache pages, so you might just be seeing an old cached copy
- Check the **Actions** tab in your repository — GitHub Pages deployments show up there, and you can see if one is still in progress or failed

</details>

<details>
<summary><b>I accidentally made the repo Private, or want to rename it</b></summary>
<br/>

- Go to **Settings** (the repo-level one, top of the repo page, not your account settings)
- Scroll to the very bottom for **Danger Zone**, or near the top for the repo name field and visibility settings
- Renaming a repo does change its GitHub Pages URL, so re-check the Pages settings afterward if you rename it

</details>

<br/>

<div align="center">

---

Made with <img src="https://img.shields.io/badge/-❤️-transparent?style=flat" height="16" valign="middle"/> by **intorez**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1b1b1f,50:1c3a4a,100:1b1b1f&height=90&section=footer" width="100%"/>

</div>
