# Design Patterns Catalog

Reference catalog for the frontend-design agent. Patterns are organized by category with implementation guidelines for each supported UI library.

---

## Table of Contents

1. [Layouts](#layouts)
2. [Navigation](#navigation)
3. [Components](#components)
4. [Sections](#sections)
5. [Data Display](#data-display)
6. [Forms](#forms)
7. [Feedback](#feedback)

---

## Layouts

### Dashboard Layout

**Structure:**
```
┌─────────────────────────────────────────────┐
│ Header (h-16)                               │
├──────────┬──────────────────────────────────┤
│ Sidebar  │ Main Content                     │
│ (w-64)   │                                  │
│          │                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

**Responsive behavior:**
- Desktop: Fixed sidebar + scrollable content
- Tablet: Collapsible sidebar (icons only)
- Mobile: Bottom nav or hamburger menu

**Implementation notes:**
- Sidebar: `fixed left-0 top-16 h-[calc(100vh-4rem)]`
- Content: `ml-64 p-6` (desktop), `ml-0 p-4` (mobile)
- Use `overflow-y-auto` on content area

---

### Auth Layout

**Structure:**
```
┌─────────────────────────────────────────────┐
│                                             │
│         ┌───────────────────┐               │
│         │   Logo            │               │
│         │   Form Card       │               │
│         │   Links           │               │
│         └───────────────────┘               │
│                                             │
└─────────────────────────────────────────────┘
```

**Variants:**
- Centered: Form in center, gradient background
- Split: Image left, form right (50/50)
- Minimal: Just the form, subtle background

**Implementation notes:**
- Container: `min-h-screen flex items-center justify-center`
- Card: `w-full max-w-md p-8`
- Background: subtle gradient or pattern

---

### Landing Layout

**Structure:**
```
┌─────────────────────────────────────────────┐
│ Navbar (sticky)                             │
├─────────────────────────────────────────────┤
│ Hero Section                                │
├─────────────────────────────────────────────┤
│ Features Section                            │
├─────────────────────────────────────────────┤
│ Pricing Section                             │
├─────────────────────────────────────────────┤
│ CTA Section                                 │
├─────────────────────────────────────────────┤
│ Footer                                      │
└─────────────────────────────────────────────┘
```

**Implementation notes:**
- Navbar: `sticky top-0 z-50 backdrop-blur`
- Sections: `py-16 md:py-24` for consistent rhythm
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

---

### Blog Layout

**Structure:**
```
┌─────────────────────────────────────────────┐
│ Navbar                                      │
├─────────────────────────────────────────────┤
│ Article Header (title, meta, image)         │
├──────────────────────────┬──────────────────┤
│ Article Content          │ Sidebar (TOC)    │
│ (max-w-prose)            │ (w-64, sticky)   │
│                          │                  │
└──────────────────────────┴──────────────────┘
```

**Implementation notes:**
- Content: `prose prose-lg dark:prose-invert`
- Sidebar: `sticky top-24` for TOC
- Reading width: `max-w-prose` (~65ch)

---

## Navigation

### Navbar

**Variants:**

| Variant | Description | Use Case |
|---------|-------------|----------|
| Simple | Logo + links + CTA | Landing pages |
| Complex | Logo + mega menu + search + user | SaaS apps |
| Minimal | Logo + hamburger | Mobile-first |
| Transparent | Over hero image | Marketing |

**Structure (Simple):**
```tsx
<nav className="border-b bg-background/95 backdrop-blur">
  <div className="container flex h-16 items-center justify-between">
    <Logo />
    <NavLinks />  {/* hidden md:flex */}
    <div className="flex items-center gap-4">
      <CTAButton />
      <MobileMenu />  {/* md:hidden */}
    </div>
  </div>
</nav>
```

---

### Sidebar Navigation

**Variants:**
- Icon + text (default)
- Icons only (collapsed)
- Grouped with headers
- With nested items

**Structure:**
```tsx
<aside className="flex flex-col gap-2 p-4">
  <NavGroup title="Main">
    <NavItem icon={Home} label="Dashboard" href="/" />
    <NavItem icon={Users} label="Users" href="/users" />
  </NavGroup>
  <NavGroup title="Settings">
    <NavItem icon={Settings} label="General" href="/settings" />
  </NavGroup>
</aside>
```

**States:**
- Default: `text-muted-foreground`
- Hover: `text-foreground bg-muted`
- Active: `text-primary bg-primary/10`

---

### Breadcrumb

**Structure:**
```tsx
<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2 text-sm">
    <li><a href="/" className="text-muted-foreground hover:text-foreground">Home</a></li>
    <li className="text-muted-foreground">/</li>
    <li><a href="/products" className="text-muted-foreground hover:text-foreground">Products</a></li>
    <li className="text-muted-foreground">/</li>
    <li className="text-foreground font-medium">Current Page</li>
  </ol>
</nav>
```

---

### Tabs

**Variants:**
- Underline (default)
- Pills
- Boxed

**Structure (Underline):**
```tsx
<div className="border-b">
  <nav className="flex gap-4">
    <button className="border-b-2 border-primary pb-2 text-primary">Active</button>
    <button className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground">Tab 2</button>
  </nav>
</div>
```

---

## Components

### Button

**Variants:**

| Variant | Classes | Use Case |
|---------|---------|----------|
| Primary | `bg-primary text-primary-foreground` | Main actions |
| Secondary | `bg-secondary text-secondary-foreground` | Secondary actions |
| Outline | `border border-input bg-background` | Tertiary actions |
| Ghost | `hover:bg-accent` | Subtle actions |
| Destructive | `bg-destructive text-destructive-foreground` | Delete, cancel |
| Link | `text-primary underline-offset-4 hover:underline` | Navigation |

**Sizes:**

| Size | Classes |
|------|---------|
| sm | `h-8 px-3 text-xs` |
| md | `h-10 px-4 text-sm` |
| lg | `h-12 px-6 text-base` |
| icon | `h-10 w-10` |

**States:**
- Disabled: `opacity-50 pointer-events-none`
- Loading: Show spinner, disable interaction

---

### Card

**Structure:**
```tsx
<div className="border bg-card text-card-foreground">
  <div className="p-6">
    <h3 className="font-semibold">Title</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>
  <div className="border-t p-6">
    {/* Content */}
  </div>
  <div className="border-t p-6">
    {/* Footer/Actions */}
  </div>
</div>
```

**Variants:**
- Default: `border bg-card`
- Elevated: `shadow-md`
- Interactive: `hover:shadow-lg transition-shadow cursor-pointer`

---

### Badge

**Variants:**

| Variant | Classes |
|---------|---------|
| Default | `bg-primary/10 text-primary` |
| Secondary | `bg-secondary text-secondary-foreground` |
| Success | `bg-green-500/10 text-green-500` |
| Warning | `bg-yellow-500/10 text-yellow-500` |
| Error | `bg-red-500/10 text-red-500` |
| Outline | `border text-foreground` |

**Base classes:** `inline-flex items-center px-2.5 py-0.5 text-xs font-medium`

---

### Avatar

**Structure:**
```tsx
<div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
  <img src={src} alt={name} className="h-full w-full object-cover" />
  {/* Fallback */}
  <span className="flex h-full w-full items-center justify-center text-sm font-medium">
    {initials}
  </span>
</div>
```

**Sizes:** `h-8 w-8`, `h-10 w-10`, `h-12 w-12`, `h-16 w-16`

---

### Modal/Dialog

**Structure:**
```tsx
{/* Backdrop */}
<div className="fixed inset-0 z-50 bg-black/50" />

{/* Modal */}
<div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
  <div className="border bg-background p-6">
    <header className="mb-4">
      <h2 className="text-lg font-semibold">Title</h2>
      <button className="absolute right-4 top-4">X</button>
    </header>
    <main>{/* Content */}</main>
    <footer className="mt-6 flex justify-end gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </footer>
  </div>
</div>
```

**Accessibility:**
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` pointing to title
- Trap focus inside
- Close on Escape

---

## Sections

### Hero

**Variants:**

| Variant | Description |
|---------|-------------|
| Centered | Text centered, CTA below |
| Split | Text left, image/illustration right |
| Background | Full-width background image |
| Video | Background video |
| Minimal | Just headline and CTA |

**Structure (Centered):**
```tsx
<section className="py-24 text-center">
  <div className="container max-w-4xl">
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
      Main Headline
    </h1>
    <p className="mt-6 text-lg text-muted-foreground">
      Supporting text that explains the value proposition
    </p>
    <div className="mt-10 flex justify-center gap-4">
      <Button size="lg">Primary CTA</Button>
      <Button size="lg" variant="outline">Secondary CTA</Button>
    </div>
  </div>
</section>
```

---

### Features Grid

**Variants:**
- 3 columns: `grid-cols-1 md:grid-cols-3`
- 4 columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Bento: Mixed sizes

**Structure:**
```tsx
<section className="py-24">
  <div className="container">
    <div className="text-center">
      <h2 className="text-3xl font-bold">Features</h2>
      <p className="mt-4 text-muted-foreground">Why choose us</p>
    </div>
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {features.map(feature => (
        <div key={feature.title} className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
            {feature.icon}
          </div>
          <h3 className="font-semibold">{feature.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### Pricing

**Variants:**
- Cards: Side by side comparison
- Table: Feature comparison matrix
- Toggle: Monthly/yearly switch

**Structure (Cards):**
```tsx
<section className="py-24">
  <div className="container">
    <div className="text-center">
      <h2 className="text-3xl font-bold">Pricing</h2>
    </div>
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {tiers.map(tier => (
        <div
          key={tier.name}
          className={cn(
            "border p-8",
            tier.popular && "border-primary ring-1 ring-primary"
          )}
        >
          {tier.popular && (
            <Badge className="mb-4">Most Popular</Badge>
          )}
          <h3 className="text-lg font-semibold">{tier.name}</h3>
          <div className="mt-4">
            <span className="text-4xl font-bold">${tier.price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="mt-8 space-y-3">
            {tier.features.map(feature => (
              <li key={feature} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full" variant={tier.popular ? 'default' : 'outline'}>
            Get Started
          </Button>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### Testimonials

**Variants:**
- Grid: Multiple cards
- Carousel: Sliding testimonials
- Single: One large featured quote

**Structure (Grid):**
```tsx
<section className="py-24 bg-muted/50">
  <div className="container">
    <h2 className="text-center text-3xl font-bold">What our customers say</h2>
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {testimonials.map(t => (
        <div key={t.name} className="border bg-background p-6">
          <p className="text-muted-foreground">"{t.quote}"</p>
          <div className="mt-6 flex items-center gap-4">
            <Avatar src={t.avatar} alt={t.name} />
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### CTA Section

**Structure:**
```tsx
<section className="py-24 bg-primary text-primary-foreground">
  <div className="container text-center">
    <h2 className="text-3xl font-bold">Ready to get started?</h2>
    <p className="mt-4 text-primary-foreground/80">
      Join thousands of satisfied customers
    </p>
    <div className="mt-8 flex justify-center gap-4">
      <Button size="lg" variant="secondary">Start Free Trial</Button>
      <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
        Contact Sales
      </Button>
    </div>
  </div>
</section>
```

---

## Data Display

### Table

**Structure:**
```tsx
<div className="border">
  <table className="w-full">
    <thead className="border-b bg-muted/50">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
        <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(row => (
        <tr key={row.id} className="border-b last:border-0">
          <td className="px-4 py-3 text-sm">{row.name}</td>
          <td className="px-4 py-3"><Badge>{row.status}</Badge></td>
          <td className="px-4 py-3 text-right">
            <Button variant="ghost" size="sm">Edit</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

**Features to add:**
- Sorting: Arrow indicators in headers
- Pagination: Footer with page controls
- Selection: Checkbox column
- Empty state: Centered message

---

### Stats/Metrics

**Structure:**
```tsx
<div className="grid gap-4 md:grid-cols-4">
  {stats.map(stat => (
    <div key={stat.label} className="border p-6">
      <p className="text-sm text-muted-foreground">{stat.label}</p>
      <p className="mt-2 text-3xl font-bold">{stat.value}</p>
      {stat.change && (
        <p className={cn(
          "mt-1 text-sm",
          stat.change > 0 ? "text-green-500" : "text-red-500"
        )}>
          {stat.change > 0 ? '+' : ''}{stat.change}%
        </p>
      )}
    </div>
  ))}
</div>
```

---

### List

**Variants:**
- Simple: Text only
- With icons: Icon + text
- With description: Title + subtitle
- With actions: Title + action buttons

**Structure (With description):**
```tsx
<ul className="divide-y">
  {items.map(item => (
    <li key={item.id} className="flex items-center justify-between py-4">
      <div>
        <p className="font-medium">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      <Button variant="ghost" size="sm">View</Button>
    </li>
  ))}
</ul>
```

---

## Forms

### Input

**Structure:**
```tsx
<div>
  <label className="text-sm font-medium" htmlFor="email">
    Email
  </label>
  <input
    id="email"
    type="email"
    className="mt-1 w-full border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
    placeholder="you@example.com"
  />
  <p className="mt-1 text-sm text-muted-foreground">Helper text</p>
</div>
```

**States:**
- Error: `border-destructive focus:ring-destructive`
- Disabled: `opacity-50 cursor-not-allowed`

---

### Select

**Structure:**
```tsx
<div>
  <label className="text-sm font-medium">Country</label>
  <select className="mt-1 w-full border bg-background px-3 py-2 text-sm">
    <option value="">Select a country</option>
    {countries.map(c => (
      <option key={c.code} value={c.code}>{c.name}</option>
    ))}
  </select>
</div>
```

---

### Checkbox & Radio

**Checkbox:**
```tsx
<label className="flex items-center gap-2">
  <input type="checkbox" className="h-4 w-4 border" />
  <span className="text-sm">I agree to the terms</span>
</label>
```

**Radio Group:**
```tsx
<fieldset>
  <legend className="text-sm font-medium">Plan</legend>
  <div className="mt-2 space-y-2">
    {plans.map(plan => (
      <label key={plan.id} className="flex items-center gap-2">
        <input type="radio" name="plan" value={plan.id} className="h-4 w-4" />
        <span className="text-sm">{plan.name}</span>
      </label>
    ))}
  </div>
</fieldset>
```

---

## Feedback

### Toast/Notification

**Structure:**
```tsx
<div className="fixed bottom-4 right-4 z-50">
  <div className="flex items-center gap-4 border bg-background p-4 shadow-lg">
    <CheckCircle className="h-5 w-5 text-green-500" />
    <div>
      <p className="font-medium">Success</p>
      <p className="text-sm text-muted-foreground">Your changes have been saved.</p>
    </div>
    <button className="text-muted-foreground hover:text-foreground">X</button>
  </div>
</div>
```

**Variants:** success, error, warning, info

---

### Empty State

**Structure:**
```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="h-12 w-12 text-muted-foreground">
    <InboxIcon />
  </div>
  <h3 className="mt-4 font-semibold">No items yet</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    Get started by creating your first item.
  </p>
  <Button className="mt-6">Create Item</Button>
</div>
```

---

### Loading States

**Spinner:**
```tsx
<div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
```

**Skeleton:**
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 w-3/4 bg-muted" />
  <div className="h-4 w-1/2 bg-muted" />
</div>
```

**Progress Bar:**
```tsx
<div className="h-2 w-full bg-muted">
  <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
</div>
```

---

## Library-Specific Notes

### shadcn/ui
- Use `cn()` utility for conditional classes
- Import components from `@/components/ui`
- Follows Radix primitives for accessibility

### DaisyUI
- Use `btn`, `card`, `modal` class naming
- Theme colors: `primary`, `secondary`, `accent`, `neutral`
- Built-in responsive variants

### Headless UI
- Fully unstyled, maximum flexibility
- Use with Tailwind for styling
- Excellent for custom designs

---

## Extending This Catalog

To add new patterns:
1. Follow the existing structure
2. Include all variants
3. Add implementation notes
4. Specify accessibility requirements
5. Include responsive behavior
