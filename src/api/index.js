const API_ROOT = 'https://api.github.com'
const OWNER = 'Joldine'
const REPO = 'joldnine.github.io'
// prevent github token blocking
const ACCESS_TOKEN = '31ac025ebb27c898d056' + 'e7b7bc9f4ab52a8d3c50'

export function getArticleListApi ({ page = 1, size = 10 }) {
  const params = {
    filter: 'created',
    page: page,
    per_page: size,
    access_token: ACCESS_TOKEN
  }
  var query = API_ROOT + '/repos/' + OWNER + '/' + REPO + '/issues' + paramsToUrl(params)
  return fetch(query).then(response => response.json())
}

export function getArticleApi (number) {
  const params = {
    access_token: ACCESS_TOKEN
  }
  var query = API_ROOT + '/repos/' + OWNER + '/' + REPO + '/issues/' + number + paramsToUrl(params)
  return fetch(query).then(response => response.json())
}

const paramsToUrl = (params) => {
  var esc = encodeURIComponent
  return '?' + Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&')
}
