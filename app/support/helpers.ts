export const removeProtocol = (url: string) => {
  if (!url) return null
  const extractUrlDetail = new URL(url)
  return `${extractUrlDetail.hostname}${extractUrlDetail.pathname}`
}
