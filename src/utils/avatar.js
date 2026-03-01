export function resolveAvatarSrc(avatarUrl) {
  if (!avatarUrl) return null;

  if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) {
    return avatarUrl;
  }
  
  const normalized =
    avatarUrl.startsWith("/uploads/")
      ? avatarUrl
      : avatarUrl.startsWith("/uploads")
        ? "/uploads/" + avatarUrl.replace("/uploads", "").replace(/^\/+/, "")
        : avatarUrl.startsWith("/")
          ? avatarUrl 
          : `/uploads/${avatarUrl}`; 

  const api = import.meta.env.VITE_API_URL;

  if (!api) return normalized;

  return `${api}${normalized}`;
}