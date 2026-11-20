async function checkDrive() {
  try {
    const res = await fetch("https://drive.google.com/drive/folders/1GxXz-QZ0WKB-bPZLDBCcowLA91xf627d?usp=drive_link", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Status:", res.status);
    const html = await res.text();
    console.log("HTML length:", html.length);
    
    // Look for file metadata or names in the HTML
    const matches = [...html.matchAll(/"([^"]+\.(mp4|mov|mkv|avi|webm|png|jpg))"/gi)].map(m => m[1]);
    console.log("Matched media names:", [...new Set(matches)]);

    // Check if sign-in is required
    if (html.includes("accounts.google.com/signin") || html.includes("ServiceLogin")) {
      console.log("Requires Google Sign-in!");
    } else {
      console.log("Publicly accessible!");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

checkDrive();
