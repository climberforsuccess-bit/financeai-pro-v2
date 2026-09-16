import jwt from 'jsonwebtoken'

export function signToken(payload: any, expiresIn = '7d') {
  const secret = process.env.JWT_SECRET || 'secret'
  return jwt.sign(payload, secret, { expiresIn })
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'secret'
  try {
    return jwt.verify(token, secret)
  } catch (e) {
    return null
  }
}
