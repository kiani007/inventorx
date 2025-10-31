# InventorX - Project Structure Guide

## 🏗️ Architecture

**Clean Architecture** with separation of concerns:
```
Domain → Use Cases → Infrastructure → Presentation
```

---

## 📂 Folder Structure

```
src/
├── core/                   # Business Logic (framework-agnostic)
│   ├── domain/            # Entities & types
│   ├── usecases/          # Business use cases
│   └── repositories/      # Repository interfaces
│
├── infrastructure/        # External services implementation
│   └── repositories/      # Supabase, APIs
│
├── presentation/          # UI Components (Atomic Design)
│   ├── atoms/            # Basic building blocks
│   ├── molecules/        # Simple component combinations
│   ├── organisms/        # Complex UI sections
│   ├── templates/        # Page layouts
│   └── pages/            # Full page components
│
├── shared/               # Shared utilities & config
│   ├── validation/       # Form & domain validation
│   ├── forms/           # Form initial values
│   ├── utils/           # Helper functions
│   ├── mappers/         # Data transformation
│   └── services/        # Client-side services
│
└── app/                 # Next.js App Router (routes only)
```

---

## 🧩 Available Components (Atoms)

### Form Inputs
- `<Input />` - Text input with label & error
- `<PasswordInput />` - Password with show/hide toggle
- `<PhoneInput />` - Phone with country code
- `<CountrySelect />` - Country dropdown
- `<Textarea />` - Multi-line text input
- `<FileUpload />` - File upload with preview
- `<URLInput />` - URL input with validation
- `<Checkbox />` - Checkbox with label
- `<Select />` - Dropdown select

### Buttons & Actions
- `<Button />` - Primary/secondary button (variants: primary, secondary, ghost, link)
- `<LikeButton />` - Like/favorite button

### Display
- `<Alert />` - Error/success/warning/info messages (variants: error, success, warning, info)
- `<Badge />` - Status badge
- `<Avatar />` - User avatar
- `<StatusIndicator />` - Status dot
- `<PriceDisplay />` - Formatted price
- `<CountdownTimer />` - Countdown display
- `<VerifiedBadge />` - Verified checkmark
- `<CountryFlag />` - Country flag icon
- `<EmptyState />` - Empty state placeholder

### Navigation
- `<BackLinkButton />` - Back button (supports href or router.back())
- `<Tabs />` - Tab navigation

**Usage:**
```tsx
// With specific route
<BackLinkButton href="/" label="Back to Home" />

// Browser back
<BackLinkButton label="Go Back" />
```

### Loaders
- `<ButtonLoader />` - Button loading state (sizes: sm, md, lg)
- `<PageLoader />` - Full page loader with message
- `<SectionLoader />` - Section loader with message & custom height

**Usage:**
```tsx
// In buttons
<Button disabled={isLoading}>
  {isLoading ? <><ButtonLoader size="lg" className="mr-2" />Loading...</> : 'Submit'}
</Button>

// Page loading (Suspense fallback)
<Suspense fallback={<PageLoader message="Loading..." />}>
  <YourComponent />
</Suspense>

// Section loading
{loading && <SectionLoader message="Loading data..." height={400} />}
```

---

## 🎨 Design System

### Colors
- **Primary Gold**: `#D4AF37` → `#E5C558`
- **Background**: `#FAFAFA`, `#F0F0F0`
- **Text**: `#1A1A1A` (dark), `#666666` (gray), `#999999` (light)

### Styling
- **Neo-morphic shadows**: `var(--neo-shadow)`, `var(--neo-shadow-hover)`
- **Rounded corners**: `20px` (inputs), `40px` (cards)
- **Font sizes**: `13px`, `14px`, `16px`, `18px`, `24px`, `48px`

---

## 🔐 Authentication Flow

### Signup
```
SignupPage → SignupForm → SignUpWithEmail use case → SupabaseAuthRepository
```

### Login
```
LoginPage → LoginForm → SignInWithEmail use case → SupabaseAuthRepository
```

### Protected Routes
Middleware checks auth status and redirects to `/login` if unauthenticated.

---

## 📝 Form Handling

### Pattern
1. **Validation Rules**: `src/shared/validation/form.*.ts`
2. **Initial Values**: `src/shared/forms/initialValues/*.ts`
3. **Form Component**: Uses React Hook Form
4. **Use Case**: Business logic in `src/core/usecases/`

### Example
```tsx
import { useForm } from 'react-hook-form';
import { loginValidation } from '@/shared/validation/form.login';
import { loginInitialValues } from '@/shared/forms/initialValues';
import { Input, Button, Alert } from '@/presentation/atoms';

const { register, handleSubmit, formState: { errors } } = useForm({
  defaultValues: loginInitialValues,
});

<Input
  {...register('email', loginValidation.email)}
  label="Email"
  error={!!errors.email}
  errorMessage={errors.email?.message}
/>
```

---

## 🚨 Error Handling

### Toast Notifications (Temporary - Auto-dismiss)
**Use for:** Process feedback, success messages, temporary errors

```tsx
import toast from 'react-hot-toast';

// Success (auto-dismisses in 3s)
toast.success('Account created!');

// Error (auto-dismisses)
toast.error('Something went wrong');

// Loading with manual dismiss
const loadingToast = toast.loading('Processing...');
toast.success('Done!', { id: loadingToast }); // Updates the same toast
```

### Inline Alerts (Persistent - Until action)
**Use for:** Validation errors, auth errors, important warnings that need user action

```tsx
import { Alert } from '@/presentation/atoms';

<Alert variant="error" message="Invalid credentials. Please try again." />
<Alert variant="success" message="Profile updated successfully" />
<Alert variant="warning" title="Warning" message="Check your data" />
<Alert variant="info" message="New features available" />
```

### When to Use Which?

| Scenario | Use |
|----------|-----|
| Form submission success | **Toast** |
| API request loading | **Toast** (loading) |
| Network error | **Toast** |
| Invalid credentials | **Alert** (persistent) |
| Validation errors | Field errors + optional **Alert** |
| Important notices | **Alert** |
| Redirect notifications | **Toast** |

---

## 🔌 Use Cases (Business Logic)

### Auth Use Cases
- `SignUpWithEmail` - Email/password registration
- `SignInWithEmail` - Email/password login
- `SignUpWithSocial` - OAuth (Google/LinkedIn)
- `VerifyEmail` - Email verification
- `GetCurrentUser` - Get logged-in user
- `CompleteProfileAfterVerification` - Profile completion

### Usage
```tsx
import { SignInWithEmail } from '@/core/usecases/auth';
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';

const authRepo = new SupabaseAuthRepository();
const signInUseCase = new SignInWithEmail(authRepo);
const result = await signInUseCase.execute(email, password);
```

---

## 📊 State Management

- **Forms**: React Hook Form
- **Server State**: Supabase (via use cases)
- **UI State**: React useState
- **Sessions**: Supabase cookies (middleware)

---

## 🛣️ Routes

### Public
- `/` - Homepage
- `/marketplace` - Browse projects
- `/about` - About page
- `/contact` - Contact page
- `/signup` - Sign up
- `/login` - Login

### Protected (Auth Required)
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/settings` - Account settings

### Auth Flow
- `/auth/callback` - OAuth callback
- `/auth/complete-profile` - Profile completion
- `/verify-email` - Email verification

---

## 🧪 Testing

```bash
# Development server
npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 📦 Key Dependencies

- **Framework**: Next.js 14 (App Router)
- **Database/Auth**: Supabase
- **Forms**: React Hook Form
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Validation**: Zod (TBD) / Custom validators

---

## 🎯 Quick Start Checklist

✅ **Need a form?**
1. Create validation rules in `shared/validation/`
2. Create initial values in `shared/forms/initialValues/`
3. Use existing atoms: `Input`, `Button`, `Checkbox`, etc.
4. Add business logic as use case in `core/usecases/`

✅ **Need to show messages?**
- **Temporary feedback** (auto-dismiss): `toast.success()`, `toast.error()`, `toast.loading()`
- **Persistent messages** (stays until action): `<Alert variant="error" message="..." />`
- **Loading states**: `<ButtonLoader />`, `<PageLoader />`, `<SectionLoader />`

✅ **Need auth?**
- Login: Use `SignInWithEmail` use case
- Signup: Use `SignUpWithEmail` use case
- Check session: Middleware handles it

✅ **Need a new component?**
- **Atom**: Single element (button, input)
- **Molecule**: 2-3 atoms combined (search bar)
- **Organism**: Complex section (form, navigation)
- **Page**: Full page with business logic

---

## 💡 Best Practices

1. **Keep atoms simple** - No business logic, just UI
2. **Use use cases** - Never call repositories directly from UI
3. **Validate twice** - Form validation + domain validation
4. **Reuse components** - Check atoms before creating new ones
5. **Follow naming** - `PascalCase` for components, `camelCase` for functions
6. **Type everything** - Use TypeScript interfaces
7. **Error handling** - Always handle use case errors
8. **Use reusable loaders** - Don't create custom spinners, use ButtonLoader/PageLoader/SectionLoader
9. **Consistent UI elements** - Use BackLinkButton for back navigation
10. **Feedback consistency**:
    - **Toast** for temporary feedback (success, loading, quick errors)
    - **Alert** for persistent messages (auth errors, validation issues)
    - Never show both for the same error

---

## 🚀 What's Already Built

✅ **Authentication System**
- Email/password signup & login
- Google & LinkedIn OAuth
- Email verification flow
- Protected routes
- Session management

✅ **Form Components**
- Complete form atom library
- Validation system
- Error handling
- Loading states

✅ **Design System**
- Neomorphic UI
- Gold gradient theme
- Consistent styling
- Responsive layouts

---

**Need help?** Check existing components in `src/presentation/atoms/` before building new ones!

