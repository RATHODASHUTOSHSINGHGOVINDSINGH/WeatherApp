 # Weather App

This is my  Weather App built using React.js and Vite and  Tailwind CSS.

## Installation

Follow these steps to set up the project locally.

### 1. Install Vite with React
```sh
npm create vite@latest my-portfolio --template react
cd my-portfolio
npm install
npm run dev
```

### 2. Install Tailwind CSS v4
```sh
npm install tailwindcss @tailwindcss/vite
```
Then, configure `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
Add Tailwind to `src/index.css`:
```css
 @import "tailwindcss";
```

### 3. Configure the Vite Plugin
Add the `@tailwindcss/vite` plugin to your Vite configuration.
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
```

### 4. Initialize Git Repository
```sh
git init
git remote add origin <your-repo-url>
git add .
git commit -m "Initial commit"
git push origin main
```

### 5. Build and Deploy on Vercel (Using GUI)

Before deploying, build the project for production:
```sh
npm run build
```

Then, follow these steps to deploy:
1. Go to [Vercel](https://vercel.com/).
2. Click on **New Project** and import your GitHub repository.
3. Select the repository and configure the settings.
4. Click **Deploy** and wait for the deployment to finish.
5. Once deployed, you will get a live URL for your portfolio.

### 6. Add `vercel.json`
Create a `vercel.json` file in the root directory with the following content:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 7. Using Vercel Serverless Functions
To add serverless functions, create an `api` directory inside `src`:

```sh
mkdir src/api
```

Create a simple serverless function `src/api/hello.js`:
```js
export default function handler(req, res) {
  return res.json({ message: "Hello from Vercel Serverless Functions!" });
}
```

Update `vercel.json`:
```json
 {
    "rewrites": [
      { "source": "/api/(.*)", "destination": "/api/$1" }
    ]
  }
```

 
### 8. Run Locally
To start the development server:
```sh
npm run dev
```

