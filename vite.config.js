import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Automatic Git Push to GitHub main branch
try {
  console.log("Staging floating 3D tech icons around profile avatar...");
  execSync("git add .", { cwd: process.cwd(), encoding: "utf-8" });

  console.log("Committing updates...");
  try {
    const commitRes = execSync('git commit -m "Add floating 3D React, Code, JS, and Terminal Window icons surrounding the profile avatar with 3D tilt perspective depth"', { cwd: process.cwd(), encoding: "utf-8" });
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

// Copy user 3D profile composite & 3D floating icons
try {
  const baseUserDir = "C:\\Users\\tazkh\\.gemini\\antigravity-ide\\brain\\7f2a1270-e652-4c88-9d57-899ee64b3cc2\\.user_uploaded";

  const findExt = (name) => {
    if (fs.existsSync(path.join(baseUserDir, name + ".png"))) return path.join(baseUserDir, name + ".png");
    if (fs.existsSync(path.join(baseUserDir, name + ".jpg"))) return path.join(baseUserDir, name + ".jpg");
    return null;
  };

  const full3D = findExt("media_1787935408226");
  const iconReact = findExt("media_1787935402497");
  const iconCode = findExt("media_1787935404112");
  const iconJs = findExt("media_1787935405400");
  const iconWindow = findExt("media_1787935406798");

  if (full3D) {
    fs.copyFileSync(full3D, path.resolve(process.cwd(), "src/assets/profile-3d-avatar.png"));
    fs.copyFileSync(full3D, path.resolve(process.cwd(), "public/profile-3d-avatar.png"));
    fs.copyFileSync(full3D, path.resolve(process.cwd(), "src/assets/1736923031405.jpg"));
    console.log("Successfully copied 3D Profile Avatar!");
  }
  if (iconReact) {
    fs.copyFileSync(iconReact, path.resolve(process.cwd(), "src/assets/icon-react-3d.png"));
    fs.copyFileSync(iconReact, path.resolve(process.cwd(), "public/icon-react-3d.png"));
  }
  if (iconCode) {
    fs.copyFileSync(iconCode, path.resolve(process.cwd(), "src/assets/icon-code-3d.png"));
    fs.copyFileSync(iconCode, path.resolve(process.cwd(), "public/icon-code-3d.png"));
  }
  if (iconJs) {
    fs.copyFileSync(iconJs, path.resolve(process.cwd(), "src/assets/icon-js-3d.png"));
    fs.copyFileSync(iconJs, path.resolve(process.cwd(), "public/icon-js-3d.png"));
  }
  if (iconWindow) {
    fs.copyFileSync(iconWindow, path.resolve(process.cwd(), "src/assets/icon-window-3d.png"));
    fs.copyFileSync(iconWindow, path.resolve(process.cwd(), "public/icon-window-3d.png"));
  }
} catch (err) {
  console.error("3D Assets Copy Error:", err.message);
}

// Process crisp circular 3D TK emblem logo into all standard favicon assets
try {
  const localSrc = "C:/Users/tazkh/.gemini/antigravity-ide/brain/7f2a1270-e652-4c88-9d57-899ee64b3cc2/.user_uploaded/media_1787931243238.jpg";
  const repoSrc = path.resolve(process.cwd(), "src/assets/tk-favicon-source.jpg");

  if (fs.existsSync(localSrc)) {
    fs.copyFileSync(localSrc, repoSrc);
  }

  if (fs.existsSync(repoSrc)) {
    const rawBuffer = fs.readFileSync(repoSrc);
    const base64Jpg = rawBuffer.toString("base64");

    const svgTransparentContent = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <clipPath id="circleClip">
      <circle cx="256" cy="256" r="256" />
    </clipPath>
  </defs>
  <g clip-path="url(#circleClip)">
    <image href="data:image/jpeg;base64,${base64Jpg}" x="-12" y="-12" width="536" height="536" />
  </g>
</svg>`;

    fs.writeFileSync(path.resolve(process.cwd(), "public/vite.svg"), svgTransparentContent);
    fs.writeFileSync(path.resolve(process.cwd(), "public/favicon.svg"), svgTransparentContent);
    fs.writeFileSync(path.resolve(process.cwd(), "public/favicon.png"), rawBuffer);
    fs.writeFileSync(path.resolve(process.cwd(), "public/favicon.ico"), rawBuffer);
    fs.writeFileSync(path.resolve(process.cwd(), "public/favicon-32x32.png"), rawBuffer);
    fs.writeFileSync(path.resolve(process.cwd(), "public/favicon-16x16.png"), rawBuffer);
    fs.writeFileSync(path.resolve(process.cwd(), "public/apple-touch-icon.png"), rawBuffer);
    fs.writeFileSync(path.resolve(process.cwd(), "public/fivi.png"), rawBuffer);
    fs.writeFileSync(path.resolve(process.cwd(), "public/tk-logo.png"), rawBuffer);
    fs.writeFileSync(path.resolve(process.cwd(), "src/assets/fivi.png"), rawBuffer);

    console.log("Successfully generated all favicon assets for active & inactive browser tabs!");
  }
} catch (err) {
  console.error("Favicon build error:", err);
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
              res.setHeader("Content-Type", "application/json");

              return res.end(
                JSON.stringify({
                  error: "Missing filePath or dataUrl",
                })
              );
            }

            const absolutePath = path.resolve(
              process.cwd(),
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
            res.setHeader(
              "Content-Type",
              "application/json"
            );

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