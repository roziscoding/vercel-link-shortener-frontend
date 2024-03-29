import { getUpdateHandler } from 'vercel-telegram-bot-api'
import { getAuthenticatedContext } from 'vercel-telegram-bot-api/lib/context'

import * as commands from '../lib/commands'
import { allowCors } from '../lib/utils/allow-cors'
import { assertAdmin } from '../lib/utils/assert-admin'

const handleBotRequest = allowCors(async (req, res) => {
  const token = process.env.TELEGRAM_TOKEN

  if (!token) return res.status(500).end()

  const handleUpdate = getUpdateHandler({ commands })

  return getAuthenticatedContext(token, req, res)
    .then(assertAdmin)
    .then(handleUpdate)
    .catch(err => {
      console.error(err.message)
    })
})

export default handleBotRequest
