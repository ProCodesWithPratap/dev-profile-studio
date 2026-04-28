import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const starterProfile = {
  name: 'Pratap',
  role: 'Frontend Developer',
  tagline: 'Building polished web experiences with React, clean UI systems, and product thinking.',
  location: 'India',
  bio: 'I design and build modern interfaces that feel clear, fast, and useful. My work focuses on responsive layouts, strong visual hierarchy, and practical tools that help people move faster.',
  currentlyWorking: 'premium frontend projects and profile branding tools',
  currentlyLearning: 'React architecture, design systems, Tailwind CSS, and production deployment',
  askMeAbout: 'React, JavaScript, GitHub branding, UI design, and web product ideas',
  email: 'your-email@example.com',
  github: 'ProCodesWithPratap',
  linkedin: 'your-linkedin',
  portfolio: 'https://your-portfolio.com',
  skills: 'React, JavaScript, Tailwind CSS, HTML, CSS, Vite, Git, GitHub',
  tools: 'VS Code, Vercel, Canva, Google AI Studio, Chrome DevTools',
  theme: 'tokyonight',
  includeStats: true,
  includeStreak: true,
  includeTopLangs: true,
  includeVisitorBadge: true,
}

const templates = [
  {
    key: 'executive',
    title: 'Executive',
    description: 'Premium, confident, and portfolio-ready.',
    patch: {
      role: 'Frontend Developer',
      tagline: 'Building polished web experiences with React, clean UI systems, and product thinking.',
      bio: 'I design and build modern interfaces that feel clear, fast, and useful. My work focuses on responsive layouts, strong visual hierarchy, and practical tools that help people move faster.',
    },
  },
  {
    key: 'product',
    title: 'Product Builder',
    description: 'Best for showing product sense and execution.',
    patch: {
      role: 'Product-minded Web Developer',
      tagline: 'Turning ideas into usable digital products with clean frontend execution.',
      bio: 'I build practical web products with a focus on usability, performance, and clean user flows. I care about shipping work that looks good and solves real problems.',
    },
  },
  {
    key: 'creative',
    title: 'Creative Dev',
    description: 'Visual, expressive, and less corporate.',
    patch: {
      role: 'Creative Frontend Developer',
      tagline: 'Creating expressive digital interfaces with motion, layout, and modern web tools.',
      bio: 'I enjoy creating interfaces that feel alive, intentional, and visually sharp. My focus is combining code, design, and storytelling into memorable web experiences.',
    },
  },
]

const themeOptions = ['tokyonight', 'radical', 'dark', 'onedark', 'dracula', 'merko', 'gruvbox']

function splitList(value) {
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

function badge(label) {
  const cleanLabel = encodeURIComponent(label)
  const cleanLogo = encodeURIComponent(label.toLowerCase())
  return `![${label}](https://img.shields.io/badge/${cleanLabel}-111827?style=for-the-badge&logo=${cleanLogo}&logoColor=white)`
}

function generateMarkdown(profile) {
  const skills = splitList(profile.skills)
  const tools = splitList(profile.tools)
  const safeGithub = profile.github.trim() || 'your-github-username'

  return `<div align="center">\n\n# ${profile.name}\n\n### ${profile.role}\n\n${profile.tagline}\n\n${profile.includeVisitorBadge ? `![Profile views](https://komarev.com/ghpvc/?username=${safeGithub}&label=Profile%20views&color=6366f1&style=for-the-badge)\n\n` : ''}[![GitHub](https://img.shields.io/badge/GitHub-${safeGithub}-111827?style=for-the-badge&logo=github)](https://github.com/${safeGithub})\n[![LinkedIn](https://img.shields.io/badge/LinkedIn-${profile.linkedin}-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/${profile.linkedin})\n[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-22c55e?style=for-the-badge)](${profile.portfolio})\n\n</div>\n\n---\n\n## Profile\n\n${profile.bio}\n\n- Currently building: **${profile.currentlyWorking}**\n- Currently learning: **${profile.currentlyLearning}**\n- Ask me about: **${profile.askMeAbout}**\n- Location: **${profile.location}**\n\n## Core Stack\n\n<p align="left">\n${skills.map((skill) => `  ${badge(skill)}`).join('\n')}\n</p>\n\n## Workflow Tools\n\n<p align="left">\n${tools.map((tool) => `  ${badge(tool)}`).join('\n')}\n</p>\n\n${profile.includeStats ? `## GitHub Analytics\n\n<p align="center">\n  <img height="165" src="https://github-readme-stats.vercel.app/api?username=${safeGithub}&show_icons=true&theme=${profile.theme}&hide_border=true" alt="GitHub stats" />\n</p>\n\n` : ''}${profile.includeStreak ? `<p align="center">\n  <img src="https://streak-stats.demolab.com?user=${safeGithub}&theme=${profile.theme}&hide_border=true" alt="GitHub streak" />\n</p>\n\n` : ''}${profile.includeTopLangs ? `<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${safeGithub}&layout=compact&theme=${profile.theme}&hide_border=true" alt="Top languages" />\n</p>\n\n` : ''}<div align="center">\n\nGenerated with **Dev Profile Studio**\n\n</div>\n`
}

function Field({ label, name, value, onChange, textarea = false }) {
  const className = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200'
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</span>
      {textarea ? <textarea className={`${className} min-h-24 resize-y`} name={name} value={value} onChange={onChange} /> : <input className={className} name={name} value={value} onChange={onChange} />}
    </label>
  )
}

function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="h-5 w-5 accent-slate-950" />
    </label>
  )
}

function PreviewCard({ profile }) {
  const skills = splitList(profile.skills)
  return (
    <div className="profile-card">
      <div className="profile-card-top">
        <div>
          <p className="tiny-label">Live README Preview</p>
          <h2>{profile.name}</h2>
          <p className="role-line">{profile.role}</p>
        </div>
        <div className="avatar-mark">{profile.name.slice(0, 1).toUpperCase()}</div>
      </div>

      <p className="tagline-line">{profile.tagline}</p>

      <div className="profile-links">
        <span>@{profile.github}</span>
        <span>{profile.location}</span>
        <span>Portfolio</span>
      </div>

      <div className="preview-section">
        <p className="section-title">Profile</p>
        <p>{profile.bio}</p>
      </div>

      <div className="preview-section">
        <p className="section-title">Stack</p>
        <div className="skill-cloud">
          {skills.slice(0, 10).map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </div>

      <div className="preview-grid">
        <div><strong>{skills.length}</strong><span>skills</span></div>
        <div><strong>{profile.includeStats ? 'On' : 'Off'}</strong><span>stats</span></div>
        <div><strong>MD</strong><span>export</span></div>
      </div>
    </div>
  )
}

function App() {
  const [profile, setProfile] = useState(starterProfile)
  const [copied, setCopied] = useState(false)
  const [activeView, setActiveView] = useState('preview')
  const markdown = useMemo(() => generateMarkdown(profile), [profile])

  function updateProfile(event) {
    const { name, value, type, checked } = event.target
    setProfile((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  function applyTemplate(template) {
    setProfile((current) => ({ ...current, ...template.patch }))
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'README.md'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="saas-shell min-h-screen text-slate-950">
      <section className="mx-auto w-full max-w-7xl px-5 py-6 lg:px-8">
        <nav className="topbar">
          <div className="brand-lockup">
            <div className="brand-logo">DP</div>
            <div>
              <p>Dev Profile Studio</p>
              <span>Profile README designer</span>
            </div>
          </div>
          <div className="nav-pill">No signup · instant export</div>
        </nav>

        <header className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">GitHub profile branding, made simple</p>
            <h1>Design a profile README that looks like a personal brand page.</h1>
            <p className="hero-text">Create a polished GitHub profile with structured sections, clean badges, social links, and analytics cards without touching markdown manually.</p>
            <div className="hero-actions">
              <button onClick={copyMarkdown} className="primary-btn">{copied ? 'Copied ✓' : 'Copy README'}</button>
              <button onClick={downloadMarkdown} className="secondary-btn">Download .md</button>
            </div>
            <div className="trust-row">
              <span>Live preview</span>
              <span>Template presets</span>
              <span>Export-ready markdown</span>
            </div>
          </div>
          <div className="hero-panel">
            <PreviewCard profile={profile} />
          </div>
        </header>

        <section className="template-strip">
          {templates.map((template) => (
            <button key={template.key} onClick={() => applyTemplate(template)}>
              <span>{template.title}</span>
              <p>{template.description}</p>
            </button>
          ))}
        </section>

        <section className="workspace-grid">
          <aside className="editor-panel">
            <div className="panel-heading">
              <div>
                <p className="tiny-label">Builder</p>
                <h2>Edit profile details</h2>
              </div>
              <button onClick={() => setProfile(starterProfile)}>Reset</button>
            </div>

            <div className="form-grid">
              <Field label="Name" name="name" value={profile.name} onChange={updateProfile} />
              <Field label="Role" name="role" value={profile.role} onChange={updateProfile} />
              <Field label="Tagline" name="tagline" value={profile.tagline} onChange={updateProfile} textarea />
              <Field label="Bio" name="bio" value={profile.bio} onChange={updateProfile} textarea />
              <div className="two-col">
                <Field label="Location" name="location" value={profile.location} onChange={updateProfile} />
                <Field label="GitHub" name="github" value={profile.github} onChange={updateProfile} />
              </div>
              <Field label="Currently Working" name="currentlyWorking" value={profile.currentlyWorking} onChange={updateProfile} />
              <Field label="Currently Learning" name="currentlyLearning" value={profile.currentlyLearning} onChange={updateProfile} />
              <Field label="Ask Me About" name="askMeAbout" value={profile.askMeAbout} onChange={updateProfile} />
              <div className="two-col">
                <Field label="Email" name="email" value={profile.email} onChange={updateProfile} />
                <Field label="LinkedIn" name="linkedin" value={profile.linkedin} onChange={updateProfile} />
              </div>
              <Field label="Portfolio" name="portfolio" value={profile.portfolio} onChange={updateProfile} />
              <Field label="Skills" name="skills" value={profile.skills} onChange={updateProfile} textarea />
              <Field label="Tools" name="tools" value={profile.tools} onChange={updateProfile} textarea />

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Stats theme</span>
                <select name="theme" value={profile.theme} onChange={updateProfile} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none focus:border-slate-950 focus:ring-4 focus:ring-slate-200">
                  {themeOptions.map((theme) => <option key={theme} value={theme}>{theme}</option>)}
                </select>
              </label>

              <div className="toggle-grid">
                <Toggle label="Visitor badge" name="includeVisitorBadge" checked={profile.includeVisitorBadge} onChange={updateProfile} />
                <Toggle label="GitHub stats" name="includeStats" checked={profile.includeStats} onChange={updateProfile} />
                <Toggle label="Contribution streak" name="includeStreak" checked={profile.includeStreak} onChange={updateProfile} />
                <Toggle label="Top languages" name="includeTopLangs" checked={profile.includeTopLangs} onChange={updateProfile} />
              </div>
            </div>
          </aside>

          <section className="output-panel">
            <div className="panel-heading">
              <div>
                <p className="tiny-label">Output</p>
                <h2>Preview and export</h2>
              </div>
              <div className="segmented">
                <button onClick={() => setActiveView('preview')} className={activeView === 'preview' ? 'active' : ''}>Preview</button>
                <button onClick={() => setActiveView('markdown')} className={activeView === 'markdown' ? 'active' : ''}>Markdown</button>
              </div>
            </div>

            {activeView === 'preview' ? (
              <PreviewCard profile={profile} />
            ) : (
              <div className="markdown-box">
                <div>
                  <span>README.md</span>
                  <button onClick={copyMarkdown}>{copied ? 'Copied ✓' : 'Copy'}</button>
                </div>
                <textarea value={markdown} readOnly spellCheck="false" />
              </div>
            )}
          </section>
        </section>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
