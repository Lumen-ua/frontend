export function resolveAvatarSrc(avatarUrl) {
  if (!avatarUrl) return null;

  // якщо вже повний URL
  if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) {
    return avatarUrl;
  }

  // якщо в БД зберігся лише filename типу "u_1_....webp"
  const normalized =
    avatarUrl.startsWith("/uploads/")
      ? avatarUrl
      : avatarUrl.startsWith("/uploads")
        ? "/uploads/" + avatarUrl.replace("/uploads", "").replace(/^\/+/, "")
        : avatarUrl.startsWith("/")
          ? avatarUrl // типу "/something"
          : `/uploads/${avatarUrl}`; // filename -> /uploads/filename

  const api = import.meta.env.VITE_API_URL;

  // якщо env не заданий — повернемо шлях, щоб було видно проблему одразу
  if (!api) return normalized;

  return `${api}${normalized}`;
}