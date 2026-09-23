import fetch from 'node-fetch'

const payload = {
  email: 'test@financeai.local',
  password: 'Test123!@'
}

console.log('📤 Testing login...')
console.log(JSON.stringify(payload, null, 2))

const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})

const data = await response.json()
console.log('\n📥 Response:')
console.log(JSON.stringify(data, null, 2))
console.log(`\nStatus: ${response.status}`)

if (data.session?.access_token) {
  console.log('\n✅ Access token obtained:')
  console.log(data.session.access_token.substring(0, 50) + '...')
}
