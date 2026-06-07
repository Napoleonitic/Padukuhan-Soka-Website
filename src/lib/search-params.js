export function getSearchParam(searchParams, key) {
  const value = searchParams?.[key];

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return typeof value === "string" ? value : null;
}
