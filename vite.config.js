import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
                res.end(
                  JSON.stringify({
                    error: "Missing filePath or dataUrl",
                  })
                );
                return;
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
        } else {
          next();
        }
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