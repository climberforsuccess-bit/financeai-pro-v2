#!/bin/bash

# Detener servidor
pkill -f "next dev"
rm -rf .next

# Limpiar estructura rota
rm -rf app/test-route

# Recrear estructura correcta
rm -f app/layout.tsx
rm -f app/layout.ts

mkdir -p app

# Crear layout.tsx correcto
cat > app/layout.tsx << 'LAYOUT'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceAI Pro V2.0",
  description: "Platform de finanzas personales con IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
LAYOUT

# Crear página principal
mkdir -p app
cat > app/page.tsx << 'PAGE'
export default function Home() {
  return (
    <div>
      <h1>FinanceAI Pro V2.0</h1>
      <p>API routes disponibles en /api/*</p>
    </div>
  );
}
PAGE

# Recrear API routes con estructura correcta
rm -rf app/api
mkdir -p app/api/auth
mkdir -p app/api/dashboard
mkdir -p app/api/test

# Auth routes
cat > app/api/auth/login/route.ts << 'LOGIN'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({
    message: "Login successful",
    user: {
      id: "1",
      email: body.email
    }
  })
}
LOGIN

cat > app/api/auth/signup/route.ts << 'SIGNUP'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({
    message: "Signup successful",
    user: {
      id: "new-user-id",
      email: body.email
    }
  })
}
SIGNUP

cat > app/api/auth/logout/route.ts << 'LOGOUT'
import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: "Logout successful" })
}
LOGOUT

cat > app/api/auth/setup/route.ts << 'SETUP'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase keys' },
        { status: 400 }
      )
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'test@example.com',
      password: 'password123',
      email_confirm: true
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    await supabaseAdmin
      .from('profiles')
      .upsert({
        id: data.user.id,
        email: 'test@example.com',
        full_name: 'Test User',
        country: 'CO',
        currency: 'COP'
      })

    return NextResponse.json({
      success: true,
      message: 'Usuario creado exitosamente',
      credentials: {
        email: 'test@example.com',
        password: 'password123'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
SETUP

# Dashboard route
cat > app/api/dashboard/summary/route.ts << 'SUMMARY'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    totalBalance: 0,
    totalDebt: 0,
    transactions: []
  })
}
SUMMARY

# Test routes
cat > app/api/test/reset-user/route.ts << 'RESET'
import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: "User reset" })
}
RESET

echo "✓ App Router structure fixed"
echo "✓ Starting dev server..."

npm run dev
