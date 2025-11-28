const fs = require("fs");
const path = require("path");

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createFile(filePath, content = "") {
  fs.writeFileSync(filePath, content);
}

console.log("🚀 Creating IBS Global Frontend Structure...");

// Root folders
const folders = [
  "src",
  "src/app",
  "src/assets",
  "src/components",
  "src/components/ui",
  "src/features",
  "src/hooks",
  "src/lib",
  "src/pages",
  "src/routes",
  "src/services",
  "src/store",
  "src/styles",
];

// Modules based on your dashboard flow
const modules = [
  "auth",
  "dashboard",
  "patients",
  "visits",
  "consultations",
  "prescriptions",
  "pharmacy",
  "lab",
  "imaging",
  "billing",
  "staff",
  "admin_exports",
  "history",
  "vitals",
  "appointments",
  "uploads",
];

folders.forEach((folder) => createDir(folder));

// Create module folders
modules.forEach((mod) => {
  createDir(`src/features/${mod}`);
});

// Base files
createFile(
  "src/main.jsx",
  `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`
);

createFile(
  "src/App.jsx",
  `export default function App() {
  return <div className="text-xl p-6">IBS Global EHR Frontend Loaded</div>;
}`
);

createFile(
  "src/store/store.js",
  `import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});`
);

createFile("src/styles/index.css", "@tailwind base;\n@tailwind components;\n@tailwind utilities;");

// RTK Query base API setup
createFile(
  "src/services/api.js",
  `import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: () => ({}),
});
`
);

console.log("✅ Frontend structure created successfully!");
