export const removeProtocol = (url: string) => {
  if (!url) return null
  const extractUrlDetail = new URL(url)
  return extractUrlDetail.search
    ? `${extractUrlDetail.hostname}${extractUrlDetail.pathname}${extractUrlDetail.search}`
    : `${extractUrlDetail.hostname}${extractUrlDetail.pathname}`
}
