import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'dcrrvv3m',
    dataset: 'production'
  },
  autoUpdates: true,
})