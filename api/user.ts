import jwt from 'jsonwebtoken'
import { allowCors } from '../lib/utils/allow-cors'
import { requireAuth } from '../lib/utils/require-auth'

const requestHandler = allowCors(
  requireAuth(async (req, res) => {
    const { token } = req.body as { token: string }

    res.status(200).json(jwt.decode(token))
  })
)

export default requestHandler
