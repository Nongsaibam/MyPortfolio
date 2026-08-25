import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Process new custom blue TK emblem logo, clip background, and make big favicon logo
try {
  const tkLogoSrc = "C:/Users/tazkh/.gemini/antigravity-ide/brain/0ed0c906-669d-4b18-954e-35d02580549e/.user_uploaded/media_1787691072277.jpg";
  if (fs.existsSync(tkLogoSrc)) {
    const base64Jpg = fs.readFileSync(tkLogoSrc).toString("base64");
    const svgTransparentContent = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <defs>
        <clipPath id="squircleClip">
          <rect x="0" y="0" width="512" height="512" rx="70" ry="70" />
        </clipPath>
      </defs>
      <g clip-path="url(#squircleClip)">
        <image href="data:image/jpeg;base64,${base64Jpg}" x="-230" y="-230" width="972" height="972" />
      </g>
    </svg>`;

    fs.writeFileSync(path.resolve(__dirname, "public/vite.svg"), svgTransparentContent);
    fs.writeFileSync(path.resolve(__dirname, "public/favicon.svg"), svgTransparentContent);
    fs.writeFileSync(path.resolve(__dirname, "public/favicon.png"), svgTransparentContent);
    fs.writeFileSync(path.resolve(__dirname, "src/assets/fivi.png"), svgTransparentContent);

    const storageFaviconDir = path.resolve(__dirname, "public/storage/TK/favicon");
    if (!fs.existsSync(storageFaviconDir)) {
      fs.mkdirSync(storageFaviconDir, { recursive: true });
    }
    fs.writeFileSync(path.resolve(storageFaviconDir, "2026-08-25-225325.webp"), svgTransparentContent);
    console.log("Successfully created big transparent TK emblem favicon logo!");
  }
} catch (err) {
  console.error("Favicon copy error:", err);
}

function localImageSaverPlugin() {
  return {
    name: "local-image-saver-plugin",

    configureServer(server) {
      server.middlewares.use("/api/upload-image", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        let body = "";

        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          try {
            const { filePath, dataUrl } = JSON.parse(body);

            if (!filePath || !dataUrl) {
              res.statusCode = 400;

              return res.end(
                JSON.stringify({
                  error: "Missing filePath or dataUrl",
                })
              );
            }

            const absolutePath = path.resolve(
              __dirname,
              filePath
            );

            const dir = path.dirname(absolutePath);

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, {
                recursive: true,
              });
            }

            const base64Data = dataUrl.replace(
              /^data:image\/\w+;base64,/,
              ""
            );

            fs.writeFileSync(
              absolutePath,
              Buffer.from(base64Data, "base64")
            );

            res.statusCode = 200;
            res.setHeader(
              "Content-Type",
              "application/json"
            );

            res.end(
              JSON.stringify({
                success: true,
                path: filePath,
              })
            );
          } catch (err) {
            res.statusCode = 500;

            res.end(
              JSON.stringify({
                error: err.message,
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localImageSaverPlugin(),
  ],
});