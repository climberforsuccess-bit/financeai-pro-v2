const payload = {
  email: "test@financeai.local",
  password: "Test123!@",
  fullName: "Test User"
}

console.log('📤 Enviando payload:')
console.log(JSON.stringify(payload, null, 2))

const response = await fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})

const data = await response.json()
console.log('\n📥 Respuesta:')
console.log(JSON.stringify(data, null, 2))
console.log(`Status: ${response.status}`)
