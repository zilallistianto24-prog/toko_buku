# Supabase Configuration Guide

## Current Issues

### Issue: ANON Key Instead of Service Role Key
Your `.env` file currently uses an **ANON** key which has limited database access.

**Current Key Analysis**:
```
SUPABASE_URL=https://hgnctciijuxvhfhuhquz.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The key contains: `"role":"anon"` which is the **anonymous** role.

---

## How to Get Service Role Key

### Step 1: Login to Supabase Dashboard
Go to: https://app.supabase.com

### Step 2: Navigate to Project Settings
1. Select your project: **Toko Buku Online**
2. Click **Settings** (bottom left menu)
3. Click **API** tab

### Step 3: Find Your Keys
You'll see three sections:
- **Project URL** - Don't change
- **anon public** - This is what you currently have ❌
- **service_role secret** - This is what you need ✅

### Step 4: Copy Service Role Key
1. Click **Copy** on the **service_role secret** key
2. Update your `backend/.env`:

```env
# CHANGE FROM:
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbmN0Y2lpanV4dmhmaHVocXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTAzMDEsImV4cCI6MjA5MDU2NjMwMX0.Nn4UjkkBXS5cqVWuNrM__fs1Ef_NXgEjJpJM4gRfk5Y

# CHANGE TO:
SUPABASE_KEY=<paste-service-role-key-here>
```

---

## Why Service Role Key Is Needed

### Row Level Security (RLS) Impact

Your database tables have **RLS enabled**:
- Users table: Only owner can read
- Books table: 
  - ✅ Public can READ (true)
  - ❌ Only auth users can INSERT/UPDATE/DELETE using `auth.uid()`

### Problem with ANON Key
- ANON keys can read public books (`SELECT` works)
- But cannot insert/update books (need auth context)
- Registration/login queries might fail due to auth checks

### Solution with Service Role Key
- Service role bypasses all RLS policies
- Backend can read/write without RLS restrictions
- Perfect for server-to-database communication

---

## Implementation Steps

### 1. Update Backend .env
```bash
# File: backend/.env
SUPABASE_URL=https://hgnctciijuxvhfhuhquz.supabase.co
SUPABASE_KEY=<your-service-role-key>
JWT_SECRET=506cde0a-b9d4-4bc0-a273-96ef8e163ace
JWT_EXPIRE=86400
PORT=5000
NODE_ENV=development
```

### 2. Restart Backend Server
```bash
cd backend
npm run dev
```

### 3. Test the API
```bash
# Test getting books
curl http://localhost:5000/api/books

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "User Name"
  }'
```

---

## Expected Results After Fix

### Before (Current - With ANON Key)
```
GET /api/books → ✅ May work (public readable)
POST /api/auth/register → ❌ Might fail
POST /api/auth/login → ❌ Might fail
POST /api/books → ❌ Fails (RLS prevents insert)
```

### After (With Service Role Key)
```
GET /api/books → ✅ Works
POST /api/auth/register → ✅ Works
POST /api/auth/login → ✅ Works
POST /api/books → ✅ Works
```

---

## Verification Checklist

- [ ] Copied service role key from Supabase dashboard
- [ ] Updated `backend/.env` with service role key (NOT anon key)
- [ ] Backend server restarted (`npm run dev`)
- [ ] Can access `/api/books` without error
- [ ] Can successfully register new user
- [ ] JWT token is returned after registration
- [ ] Can login with registered credentials
- [ ] Can view products in frontend

---

## Troubleshooting

### Issue: "SUPABASE_KEY is still ANON"
- Make sure you copied from **service_role secret**, not **anon public**
- Check that `backend/.env` is in the right location
- Restart the backend server after updating .env

### Issue: "Still can't register"
- Clear frontend localStorage: `localStorage.clear()`
- Check browser console for error messages
- Check backend logs for database error details

### Issue: "Products still won't load"
- Verify Supabase tables exist (books, users)
- Check if there's any sample data in the books table
- Run seed.js: `npm run seed` (if seed script exists)

---

## Security Note ⚠️

**The service_role key is sensitive!**
- ✅ Use it only in backend .env files
- ❌ Never expose it in frontend code
- ❌ Never commit it to git
- ✅ Use .gitignore to exclude .env files

Your current .env files should already be in .gitignore.
