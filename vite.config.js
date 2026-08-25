import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy custom TK logo to assets & public defaults on server startup
try {
  const tkLogoSrc = "C:/Users/tazkh/.gemini/antigravity-ide/brain/0ed0c906-669d-4b18-954e-35d02580549e/.user_uploaded/media_1787681815044.jpg";
  if (fs.existsSync(tkLogoSrc)) {
    fs.copyFileSync(tkLogoSrc, path.resolve(__dirname, "src/assets/1736923031405.jpg"));
    fs.copyFileSync(tkLogoSrc, path.resolve(__dirname, "public/vite.svg"));
    fs.copyFileSync(tkLogoSrc, path.resolve(__dirname, "public/favicon.ico"));
    fs.copyFileSync(tkLogoSrc, path.resolve(__dirname, "public/favicon.png"));
    console.log("Successfully copied custom TK logo as default image everywhere!");
  }
} catch (err) {
  console.error("Logo copy error:", err);
}

function localImageSaverPlugin() {
  return {
    name: "local-image-saver-plugin",
    configureServer(server) {
      server.middlewares.use("/api/upload-image", (req, res, next) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const { filePath, dataUrl } = JSON.parse(body);
              if (!filePath || !dataUrl) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Missing filePath or dataUrl" }));
                return;
              }

              const absolutePath = path.resolve(__dirname, filePath);
              const dir = path.dirname(absolutePath);

              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }

              const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
              fs.writeFileSync(absolutePath, Buffer.from(base64Data, "base64"));

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, path: filePath }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  darkMode: "class",
  theme: { extend: {} },
  plugins: [react(), tailwindcss(), localImageSaverPlugin()],
});
