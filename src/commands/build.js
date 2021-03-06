import glob from 'glob'

import {REACT_APP, REACT_COMPONENT, WEB_APP, WEB_MODULE} from '../constants'
import getUserConfig from '../getUserConfig'

function buildDemo(args, cb) {
  if (glob.sync('demo/').length > 0) {
    require('./build-demo')(args, cb)
  }
}

export default function(args, cb) {
  let userConfig = getUserConfig(args, {required: true})
  if (userConfig.type === REACT_APP) {
    require('./build-react-app')(args, cb)
  }
  if (userConfig.type === WEB_APP) {
    require('./build-web-app')(args, cb)
  }
  else if (userConfig.type === REACT_COMPONENT || userConfig.type === WEB_MODULE) {
    require('./build-module')(args)
    if (userConfig.build.umd) {
      require('./build-umd')(args, () => buildDemo(args, cb))
    }
    else {
      buildDemo(args, cb)
    }
  }
}
