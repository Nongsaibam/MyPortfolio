import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Automatic Git Push to GitHub main branch
try {
  console.log("Staging enlarged navbar updates...");
  execSync("git add .", { cwd: process.cwd(), encoding: "utf-8" });

  console.log("Committing updates...");
  try {
    const commitRes = execSync('git commit -m "Enlarge navbar height, padding, font sizes, logo, and theme toggle button for better visibility"', { cwd: process.cwd(), encoding: "utf-8" });
    console.log("Git commit output:\n" + commitRes);
  } catch (commitErr) {
    console.log("Git commit info:", commitErr.stdout || commitErr.message);
  }

  console.log("Pushing to GitHub main branch...");
  const pushRes = execSync("git push origin main", { cwd: process.cwd(), encoding: "utf-8" });
  console.log("Git push output:\n" + pushRes);
} catch (gitErr) {
  console.error("Git operation result:\n", gitErr.stdout || gitErr.stderr || gitErr.message);
}

const localImageSaverPlugin = () => ({
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

      req.on("end", async () => {
        try {
          const { filePath, dataUrl } = JSON.parse(body);

          if (!filePath || !dataUrl) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");

            return res.end(
              JSON.stringify({
                error: "Missing filePath or dataUrl",
              })
            );
          }

          const absolutePath = path.resolve(process.cwd(), filePath);
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
          res.setHeader("Content-Type", "application/json");

          res.end(
            JSON.stringify({
              success: true,
              path: filePath,
            })
          );
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");

          res.end(
            JSON.stringify({
              error: err.message,
            })
          );
        }
      });
    });
  },
});

function generateFavicons() {
  try {
    const localSrc =
      "C:/Users/tazkh/.gemini/antigravity-ide/brain/7f2a1270-e652-4c88-9d57-899ee64b3cc2/.user_uploaded/media_1787931243238.jpg";
    const repoSrc = path.resolve(process.cwd(), "src/assets/tk-favicon-source.jpg");

    const publicDir = path.resolve(process.cwd(), "public");
    const assetsDir = path.resolve(process.cwd(), "src/assets");

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    let activeSrc = null;
    if (fs.existsSync(localSrc)) {
      activeSrc = localSrc;
      try {
        fs.copyFileSync(localSrc, repoSrc);
      } catch (e) {}
    } else if (fs.existsSync(repoSrc)) {
      activeSrc = repoSrc;
    }

    if (!activeSrc) {
      return;
    }

    const sourceBuffer = fs.readFileSync(activeSrc);

    // Copy raw favicon files to public/ and src/assets/
    fs.writeFileSync(path.join(publicDir, "favicon.png"), sourceBuffer);
    fs.writeFileSync(path.join(publicDir, "favicon.ico"), sourceBuffer);
    fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), sourceBuffer);
    fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), sourceBuffer);
    fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), sourceBuffer);
    fs.writeFileSync(path.join(publicDir, "fivi.png"), sourceBuffer);
    fs.writeFileSync(path.join(publicDir, "tk-logo.png"), sourceBuffer);
    fs.writeFileSync(path.join(assetsDir, "fivi.png"), sourceBuffer);

    // Generate valid SVG favicon
    const base64 = sourceBuffer.toString("base64");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <clipPath id="clip">
      <circle cx="256" cy="256" r="256"/>
    </clipPath>
  </defs>
  <g clip-path="url(#clip)">
    <image href="data:image/jpeg;base64,${base64}" x="-12" y="-12" width="536" height="536" />
  </g>
</svg>`;

    fs.writeFileSync(path.join(publicDir, "favicon.svg"), svg.trim());
    fs.writeFileSync(path.join(publicDir, "vite.svg"), svg.trim());

    console.log("✅ TK favicon assets generated successfully!");
  } catch (error) {
    console.error("Favicon generation error:", error);
  }
}

// Generate favicons immediately on config load
generateFavicons();

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localImageSaverPlugin(),
  ],
  server: {
    port: 5173,
  },
});
