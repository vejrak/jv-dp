export default {
  options: {
    DATE_TIME_FORMAT: 'YYYY-MM-DD hh:mm',
  },
  datasource: {
    JSON: 'json',
    JSON_BINARY: 'json/binary',
    TEXT: 'text',
    BINARY: 'binary',
  },
  contentType: {
    JSON: 'application/json',
    TEXT: 'text/plain',
    BINARY: 'application/octet-stream',
  },
  roles: {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    USER: 3,
  },
}
