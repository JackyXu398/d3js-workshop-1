# D3.js Workshop 1

## Getting Started

### 1. Fork this repository
Click the **Fork** button in the top-right corner of this GitHub page. This creates your own personal copy of the workshop materials under your GitHub account — all your changes will be saved there.

### 2. Clone your fork
Once you've forked it, clone **your fork** (not the original) to your local machine. Copy the URL from your forked repo and run:

```bash
git clone https://github.com/YOUR-USERNAME/d3js-workshop-1.git
```

Then navigate into the folder:

```bash
cd d3js-workshop-1
```

### 3. Open in VS Code
Open the project folder in VS Code

### 4. Install the Live Server extension
D3 loads data files using `fetch`, which requires a local server — opening the HTML file directly in your browser will not work due to browser security restrictions.

In VS Code, go to the Extensions panel and search for **Live Server** by Ritwick Dey. Install it.

### 5. Launch Live Server
For the class demo: 
Right-click on `demo.html` in the VS Code file explorer and select **Open with Live Server**.

For the class activity: 
Right-click on `index.html` in the VS Code file explorer and select **Open with Live Server**.

### 6. Working Documents:
For the class demo:
We will be coding in parallel in `js/demo.js` to learn the concepts of D3. 

For the class activity:
After the demo you will be asked to complete TODO steps in `js/stocks.js` to apply the concepts. We will grade your code in stocks.js

---

## Saving your work
As you complete the TODO exercises, commit and push your changes to your fork:

```bash
git add .
git commit -m "your message here"
git push
```