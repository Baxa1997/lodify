export function getShortFileName(url, maxBaseLength = 5) {
  let fullName;
  try {
    const u = new URL(url);
    fullName = u.pathname.split("/").pop();
  } catch {
    fullName = url.split("/").pop();
  }

  const lastDot = fullName.lastIndexOf(".");
  let base = lastDot !== -1 ? fullName.substring(0, lastDot) : fullName;
  const ext = lastDot !== -1 ? fullName.substring(lastDot) : "";

  if (base.length > maxBaseLength) {
    base = base.substring(0, maxBaseLength) + "...";
  }

  return {
    shortName: base + ext, // truncated version with extension
    extension: ext, // file extension (.pdf, .png, etc.)
    fullName, // original filename if needed
  };
}
