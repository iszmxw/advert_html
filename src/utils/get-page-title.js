import defaultSettings from '@/settings'

const title = defaultSettings.title || '热讯头条广告投放平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
