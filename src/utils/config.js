const domain = 'http://localhost:8808/api'
// const domainAuth = process.env['VUE_APP_AUTH_API'] || 'http://202.134.19.144:4060'
// const domainUpload = process.env['VUE_APP_UPLOAD_API'] || 'http://202.134.19.144:4062'

const config = {
  userKey: 'userinfo',
  tokenKey: 'access-token',
  permissionKey: 'permission',
  api: {
    base: domain,
    customer: `${domain}/customer`
    // auth: `${domainAuth}`,
    // upload: `${domainUpload}/upload`,
    // download: `${domainUpload}/download`,
    // user: `${domainAuth}/user`,
    // project: `${domain}/project`,
    // phase: `${domain}/phase`,
    // supplier: `${domain}/supplier`,
    // file: `${domain}/file`,
    // folder: `${domain}/folder`,
    // fileAndFolder: `${domain}/document`,
  },
  httpCode: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    TOKEN_EXPIRED: 409,
    UNKNOWN_ERROR: 520,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    ADMIN_REQUIRE: 406
  },
  fileStatus: {
    TOTAL: 1,
    PENDING: 2,
    COMPLETE: 3,
    REJECT: 4,
    RECALL: 5
  },
  viewType: {
    LIST: 1,
    GRID: 2
  },
  fileType: {
    1: 'excel',
    2: 'csv'
  },
  numberMap: {
    1: 'Có',
    0: 'Không'
  },
  genderMap: {
    0: 'Nam',
    1: 'Nữ'
  },
  statusColorMap: {
    total: 'info',
    complete: 'success',
    processing: 'primary',
    expire: 'danger',
    warning: 'warning'
  },
  localKeys: {
    fields: 'FIELDS_CONFIG'
  },
  methodAPI: ['get', 'post', 'put', 'delete']
}

export default config
