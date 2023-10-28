import RaThemeTypeScript from "../../types";

/**
 * Ensures that path begins and ends with a slash.
 *
 * @param path The path to normalize.
 */
export function ensurePath(path: string): string {
  if (path[0] !== "/") {
    path = "/" + path;
  }

  if (path[path.length - 1] !== "/") {
    path = path + "/";
  }

  return path;
}

/**
 * Replaces WordPress paths with front-facing paths.
 *
 * @param path The path from WordPress.
 * @param config Configuration for paths.
 */
export function replacePath(
  path: string,
  config: RaThemeTypeScript["state"]["config"],
): string {
  const normalizedPath = ensurePath(path);

  const pageMatch = Object.entries(config.pages).find(([key]) => {
    const normalizedPagePath = ensurePath(key);
    return normalizedPath.startsWith(normalizedPagePath);
  });

  if (pageMatch) {
    const [key, value] = pageMatch;
    const normalizedPagePath = ensurePath(key);
    return normalizedPath.replace(normalizedPagePath, ensurePath(value.path));
  }

  const postMatch = Object.values(config.posts).find((value) => {
    const normalizedPostPath = ensurePath(value.wpPath);
    const normalizedPostArchivePath = ensurePath(value.wpArchivePath);
    return (
      normalizedPath.startsWith(normalizedPostPath) ||
      normalizedPath.startsWith(normalizedPostArchivePath)
    );
  });

  if (postMatch) {
    const normalizedPostPath = ensurePath(postMatch.wpPath);
    const normalizedPostArchivePath = ensurePath(postMatch.wpArchivePath);

    if (normalizedPostPath === normalizedPostArchivePath) {
      if (normalizedPath.replace(normalizedPostArchivePath, "") === "") {
        return normalizedPath.replace(
          normalizedPostArchivePath,
          ensurePath(postMatch.archivePath),
        );
      }

      return normalizedPath.replace(
        normalizedPostPath,
        ensurePath(postMatch.path),
      );
    }

    if (normalizedPath.startsWith(normalizedPostPath)) {
      return normalizedPath.replace(
        normalizedPostPath,
        ensurePath(postMatch.path),
      );
    }

    return normalizedPath.replace(
      normalizedPostArchivePath,
      ensurePath(postMatch.archivePath),
    );
  }

  return path;
}
