/**
 * Auto-compresses an uploaded image file, converts it to WebP format with size <= 200KB,
 * physically saves the file to local disk via Vite dev server endpoint at:
 * public/storage/TK/{category}/YYYY-MM-DD-HHMMSS.webp
 * 
 * @param {File} file - Uploaded Image File
 * @param {string} category - 'profile' | 'projects' | 'certificate' | 'cerdificate'
 * @param {number} maxKB - Maximum target size in KB (default 200)
 * @returns {Promise<{ dataUrl: string, path: string, filename: string, sizeKB: number }>}
 */
export async function compressAndConvertToWebP(file, category = "cerdificate", maxKB = 200) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const maxDimension = 1600;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.85;
        let dataUrl = canvas.toDataURL("image/webp", quality);
        const maxBytes = maxKB * 1024;

        while (dataUrl.length * (3 / 4) > maxBytes && quality > 0.1) {
          quality -= 0.08;
          dataUrl = canvas.toDataURL("image/webp", quality);
        }

        if (dataUrl.length * (3 / 4) > maxBytes) {
          canvas.width = Math.round(width * 0.75);
          canvas.height = Math.round(height * 0.75);
          const ctx2 = canvas.getContext("2d");
          ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);
          dataUrl = canvas.toDataURL("image/webp", 0.7);
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const timestampStr = `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
        const filename = `${timestampStr}.webp`;
        const categoryFolder = (category === "certificate" || category === "cerdificate") ? "cerdificate" : category;
        const path = `public/storage/TK/${categoryFolder}/${filename}`;
        const sizeKB = Math.round((dataUrl.length * (3 / 4)) / 1024);

        // Store WebP image data in local image cache as fallback
        try {
          const cache = JSON.parse(localStorage.getItem("portfolio_image_cache") || "{}");
          cache[path] = dataUrl;
          cache[`/${path.substring(7)}`] = dataUrl;
          localStorage.setItem("portfolio_image_cache", JSON.stringify(cache));
        } catch (err) {
          console.error("Cache store error:", err);
        }

        // Physically save file to disk via Vite server middleware endpoint
        try {
          await fetch("/api/upload-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filePath: path, dataUrl }),
          });
        } catch (err) {
          console.error("Physical disk write endpoint error:", err);
        }

        resolve({
          dataUrl,
          path,
          filename,
          sizeKB,
        });
      };

      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Resolves a storage path or URL string for rendering in <img> tags.
 * Checks local image cache for uploaded files; fallback to URL path.
 */
export function resolveImagePath(pathStr, fallback = "") {
  if (!pathStr || pathStr.includes("vite.svg") || pathStr.includes("favicon")) {
    return fallback || pathStr;
  }

  // Check local image cache
  try {
    const cache = JSON.parse(localStorage.getItem("portfolio_image_cache") || "{}");
    if (cache[pathStr]) {
      return cache[pathStr];
    }
    if (pathStr.startsWith("public/") && cache[`/${pathStr.substring(7)}`]) {
      return cache[`/${pathStr.substring(7)}`];
    }
    if (pathStr.startsWith("public/") && cache[pathStr]) {
      return cache[pathStr];
    }
  } catch (err) {
    console.error("Cache lookup error:", err);
  }

  if (pathStr.startsWith("public/")) {
    return "/" + pathStr.substring(7);
  }
  return pathStr;
}
