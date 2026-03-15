export function getOffsetFromPage(page: number, limit: number) {
  return Math.max(0, (page - 1) * limit);
}

export function getPageFromOffset(offset: number, limit: number) {
  return Math.floor(offset / limit) + 1;
}
