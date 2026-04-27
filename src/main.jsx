import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const starterProfile = {
  name: 'Pratap',
  headline: 'Frontend Developer crafting clean digital experiences',
  location: 'India',
  bio: 'I build modern, responsive web interfaces and turn ideas into polished browser experiences. I enjoy working with React, clean layouts, and practical developer tools.',
  currentlyWorking: 'Dev Profile Studio and portfolio-grade frontend projects',
  currentlyLearning: 'React architecture, Tailwind CSS, Vite, and production deployment workflows',
  askMeAbout: 'React, JavaScript, GitHub profiles, UI design, and web projects',
  email: 'your-email@example.com',
  github: 'ProCodesWithPratap',
  linkedin: 'your-linkedin',
  portfolio: 'https://your-portfolio.com',
  skills: 'HTML, CSS, JavaScript, React, Tailwind CSS, Git, GitHub, Vite',
  tools: 'VS Code, Vercel, Canva, Google AI Studio, Chrome DevTools',
  funFact: 'I believe consistency beats perfection when building developer momentum.',
  theme: 'tokyonight',
  accent: 'indigo',
  includeStats: true,
  includeStreak: true,
  includeTopLangs: true,
  includeVisitorBadge: true,
}

const templates = [
  {
    key: 'creator',
    title: 'Creator',
    eyebrow: 'Portfolio energy',
    description: 'Confident, visual, and polished for a public developer brand.',
    patch: {
      headline: 'Frontend Developer crafting clean digital experiences',
      bio: 'I build modern, responsive web interfaces and turn ideas into polished browser experiences. I enjoy working with React, clean layouts, and practical developer tools.',
    },
  },
  {
    key: 'builder',
    title: 'Builder',
    eyebrow: 'Startup style',
    description: 'Direct and product-focused for people building real things.',
    patch: {
      headline: 'Web Developer building fast, useful, and elegant products',
      bio: 'I like creating practical tools that solve real problems. My focus is clean frontend architecture, reliable deployments, and user-friendly product design.',
    },
  },
  {
    key: 'learner',
    title: 'Learner',
    eyebrow: 'Growth mode',
    description: 'Best for a student or early developer growing in public.',
    patch: {
      headline: 'Student Developer learning, building, and improving every day',
      bio: 'I am growing my skills through consistent practice, public projects, and hands-on learning. Every project helps me become a stronger developer.',
    },
  },
]

const themeOptions = ['tokyonight', 'radical', 'dark', 'onedark', 'dracula', 'merko', 'gruvbox']
const accentOptions = ['indigo', 'cyan', 'violet', 'rose']

function splitList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
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

  return `<div align="center">\n\n# Hi, I'm ${profile.name} 👋\n\n### ${profile.headline}\n\n${profile.includeVisitorBadge ? `![Profile views](https://komarev.com/ghpvc/?username=${safeGithub}&label=Profile%20views&color=6366f1&style=for-the-badge)\n\n` : ''}[![GitHub](https://img.shields.io/badge/GitHub-${safeGithub}-111827?style=for-the-badge&logo=github)](https://github.com/${safeGithub})\n[![LinkedIn](https://img.shields.io/badge/LinkedIn-${profile.linkedin}-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/${profile.linkedin})\n[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-22c55e?style=for-the-badge)](${profile.portfolio})\n\n</div>\n\n---\n\n## About Me\n\n${profile.bio}\n\n- 🔭 Currently working on **${profile.currentlyWorking}**\n- 🌱 Currently learning **${profile.currentlyLearning}**\n- 💬 Ask me about **${profile.askMeAbout}**\n- 📍 Based in **${profile.location}**\n- ⚡ Fun fact: **${profile.funFact}**\n\n## Tech Stack\n\n<p align="left">\n${skills.map((skill) => `  ${badge(skill)}`).join('\n')}\n</p>\n\n## Tools I Use\n\n<p align="left">\n${tools.map((tool) => `  ${badge(tool)}`).join('\n')}\n</p>\n\n${profile.includeStats ? `## GitHub Analytics\n\n<p align="center">\n  <img height="165" src="https://github-readme-stats.vercel.app/api?username=${safeGithub}&show_icons=true&theme=${profile.theme}&hide_border=true" alt="${safeGithub} GitHub stats" />\n</p>\n\n` : ''}${profile.includeStreak ? `<p align="center">\n  <img src="https://streak-stats.demolab.com?user=${safeGithub}&theme=${profile.theme}&hide_border=true" alt="${safeGithub} GitHub streak" />\n</p>\n\n` : ''}${profile.includeTopLangs ? `<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${safeGithub}&layout=compact&theme=${profile.theme}&hide_border=true" alt="${safeGithub} top languages" />\n</p>\n\n` : ''}<div align="center">\n\n### Thanks for visiting my profile.\n\nGenerated with **Dev Profile Studio**\n\n</div>\n`
}

function Field({ label, name, value, onChange, textarea = false }) {
  const className = 'w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/[0.10] focus:ring-4 focus:ring-cyan-300/10'

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</span>
      {textarea ? (
        <textarea className={`${className} min-h-24 resize-y`} name={name} value={value} onChange={onChange} />
      ) : (
        <input className={className} name={name} value={value} onChange={onChange} />
      )}
    </label>
  )
}

function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-200">
      <span>{label}</span>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="h-5 w-5 accent-cyan-300" />
    </label>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-center backdrop-blur">
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
    </div>
  )
}

function SkillPills({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.slice(0, 12).map((item) => (
        <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
          {item}
        </span>
      ))}
    </div>
  )
}

function ReadmePreview({ profile }) {
  const skills = splitList(profile.skills)
  const tools = splitList(profile.tools)

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1117] text-slate-100 shadow-2xl shadow-black/30">
      <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-400">README.md preview</span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="rounded-[1.5rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-indigo-500/10 to-fuchsia-500/10 p-6 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-cyan-300 to-indigo-400 text-3xl font-black text-slate-950 shadow-xl shadow-cyan-500/20">
            {profile.name.slice(0, 1).toUpperCase()}
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-white">Hi, I'm {profile.name} 👋</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-300">{profile.headline}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-bold">@{profile.github}</span>
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-bold">{profile.location}</span>
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-bold">Portfolio Ready</span>
          </div>
        </div>

        <section className="mt-7 grid gap-4 md:grid-cols-3">
          <Metric value={skills.length} label="Skills" />
          <Metric value={tools.length} label="Tools" />
          <Metric value="Live" label="Export" />
        </section>

        <section className="mt-7 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="text-lg font-black text-white">About Me</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{profile.bio}</p>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <p><span className="text-cyan-200">Working on:</span> {profile.currentlyWorking}</p>
            <p><span className="text-cyan-200">Learning:</span> {profile.currentlyLearning}</p>
            <p><span className="text-cyan-200">Ask me about:</span> {profile.askMeAbout}</p>
          </div>
        </section>

        <section className="mt-7 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="text-lg font-black text-white">Tech Stack</h3>
          <div className="mt-4"><SkillPills items={skills} /></div>
        </section>

        <section className="mt-7 grid gap-4 md:grid-cols-2">
          {profile.includeStats && <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="font-bold text-white">GitHub Stats Card</p><div className="mt-4 h-24 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-cyan-400/20" /></div>}
          {profile.includeStreak && <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="font-bold text-white">Contribution Streak</p><div className="mt-4 h-24 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-rose-400/20" /></div>}
        </section>
      </div>
    </article>
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
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
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
    <main className="premium-shell min-h-screen text-white">
      <div className="aurora-one" />
      <div className="aurora-two" />

      <section className="relative mx-auto w-full max-w-7xl px-5 py-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-indigo-400 font-black text-slate-950">D</div>
            <div>
              <p className="text-sm font-black leading-none">Dev Profile Studio</p>
              <p className="mt-1 text-xs text-slate-400">README generator</p>
            </div>
          </div>
          <div className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 sm:block">Live Builder</div>
        </nav>

        <header className="grid items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-fuchsia-100">
              Premium GitHub Branding
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
              Turn your GitHub profile into a polished developer brand.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Build a clean, professional README with profile sections, social links, stack badges, analytics cards, and export-ready markdown.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={copyMarkdown} className="rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-100">
                {copied ? 'Copied Markdown ✓' : 'Copy README'}
              </button>
              <button onClick={downloadMarkdown} className="rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.10]">
                Download README.md
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/20 via-indigo-500/10 to-fuchsia-500/20 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-slate-950 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-sm font-bold text-slate-300">Profile score</span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-200">Ready</span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <Metric value="12+" label="Sections" />
                  <Metric value="1" label="Click Export" />
                  <Metric value="100%" label="Responsive" />
                </div>
                <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="text-sm font-black text-white">Generated for</p>
                  <p className="mt-2 text-3xl font-black tracking-tight text-cyan-100">@{profile.github}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{profile.headline}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Control Panel</h2>
                <p className="mt-1 text-sm text-slate-400">Edit once. Preview instantly.</p>
              </div>
              <button onClick={() => setProfile(starterProfile)} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black text-slate-200 hover:bg-white/[0.10]">Reset</button>
            </div>

            <div className="mb-6 grid gap-3">
              {templates.map((template) => (
                <button key={template.key} onClick={() => applyTemplate(template)} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-black text-white">{template.title}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{template.eyebrow}</p>
                    </div>
                    <span className="text-xl">→</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{template.description}</p>
                </button>
              ))}
            </div>

            <div className="grid gap-4">
              <Field label="Name" name="name" value={profile.name} onChange={updateProfile} />
              <Field label="Headline" name="headline" value={profile.headline} onChange={updateProfile} />
              <Field label="Bio" name="bio" value={profile.bio} onChange={updateProfile} textarea />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Location" name="location" value={profile.location} onChange={updateProfile} />
                <Field label="GitHub" name="github" value={profile.github} onChange={updateProfile} />
              </div>
              <Field label="Currently Working" name="currentlyWorking" value={profile.currentlyWorking} onChange={updateProfile} />
              <Field label="Currently Learning" name="currentlyLearning" value={profile.currentlyLearning} onChange={updateProfile} />
              <Field label="Ask Me About" name="askMeAbout" value={profile.askMeAbout} onChange={updateProfile} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" value={profile.email} onChange={updateProfile} />
                <Field label="LinkedIn" name="linkedin" value={profile.linkedin} onChange={updateProfile} />
              </div>
              <Field label="Portfolio" name="portfolio" value={profile.portfolio} onChange={updateProfile} />
              <Field label="Skills" name="skills" value={profile.skills} onChange={updateProfile} textarea />
              <Field label="Tools" name="tools" value={profile.tools} onChange={updateProfile} textarea />
              <Field label="Fun Fact" name="funFact" value={profile.funFact} onChange={updateProfile} />

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Stats Theme</span>
                <select name="theme" value={profile.theme} onChange={updateProfile} className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/60">
                  {themeOptions.map((theme) => <option key={theme} value={theme} className="bg-slate-950">{theme}</option>)}
                </select>
              </label>

              <div className="grid gap-3">
                <Toggle label="Visitor badge" name="includeVisitorBadge" checked={profile.includeVisitorBadge} onChange={updateProfile} />
                <Toggle label="GitHub stats" name="includeStats" checked={profile.includeStats} onChange={updateProfile} />
                <Toggle label="Contribution streak" name="includeStreak" checked={profile.includeStreak} onChange={updateProfile} />
                <Toggle label="Top languages" name="includeTopLangs" checked={profile.includeTopLangs} onChange={updateProfile} />
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Output Studio</h2>
                <p className="mt-1 text-sm text-slate-400">Preview the README or copy the exact markdown.</p>
              </div>
              <div className="flex rounded-full border border-white/10 bg-slate-950/70 p-1">
                <button onClick={() => setActiveView('preview')} className={`rounded-full px-4 py-2 text-sm font-black transition ${activeView === 'preview' ? 'bg-white text-slate-950' : 'text-slate-300 hover:text-white'}`}>Preview</button>
                <button onClick={() => setActiveView('markdown')} className={`rounded-full px-4 py-2 text-sm font-black transition ${activeView === 'markdown' ? 'bg-white text-slate-950' : 'text-slate-300 hover:text-white'}`}>Markdown</button>
              </div>
            </div>

            {activeView === 'preview' ? (
              <ReadmePreview profile={profile} />
            ) : (
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
                <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.04] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-black text-white">README.md</span>
                  <div className="flex gap-2">
                    <button onClick={copyMarkdown} className="rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-slate-950">{copied ? 'Copied ✓' : 'Copy'}</button>
                    <button onClick={downloadMarkdown} className="rounded-full border border-white/10 px-4 py-2 text-xs font-black text-white">Download</button>
                  </div>
                </div>
                <textarea value={markdown} readOnly spellCheck="false" className="h-[720px] w-full resize-none bg-slate-950 p-5 font-mono text-sm leading-6 text-slate-100 outline-none" />
              </div>
            )}
          </section>
        </section>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
