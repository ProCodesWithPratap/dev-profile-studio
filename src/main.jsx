import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const initialProfile = {
  name: 'Pratap',
  headline: 'Frontend Developer | React Learner | Open Source Explorer',
  location: 'India',
  bio: 'I build clean web interfaces, learn modern JavaScript tools, and document my coding journey through practical projects.',
  currentlyWorking: 'a GitHub profile README generator',
  currentlyLearning: 'React, Vite, Tailwind CSS, and full-stack development',
  askMeAbout: 'React, JavaScript, GitHub, and web UI ideas',
  email: 'your-email@example.com',
  github: 'ProCodesWithPratap',
  linkedin: 'your-linkedin',
  portfolio: 'https://your-portfolio.com',
  skills: 'HTML, CSS, JavaScript, React, Tailwind CSS, Git, GitHub, Vite',
  tools: 'VS Code, Vercel, Canva, Google AI Studio',
  funFact: 'I believe small daily commits build strong developer momentum.',
  theme: 'radical',
  includeStats: true,
  includeStreak: true,
  includeTopLangs: true,
  includeVisitorBadge: true,
}

const templates = {
  focused: {
    headline: 'Frontend Developer focused on clean UI and practical web tools',
    bio: 'I enjoy turning ideas into responsive interfaces and learning by building real projects.',
  },
  student: {
    headline: 'Student Developer | Learning React | Building in Public',
    bio: 'I am growing my development skills through daily practice, small projects, and consistent GitHub activity.',
  },
  professional: {
    headline: 'Web Developer building modern, responsive, and maintainable products',
    bio: 'I work with modern frontend tools to create clean user experiences and developer-friendly applications.',
  },
}

const themeOptions = ['radical', 'tokyonight', 'dark', 'onedark', 'dracula', 'merko', 'gruvbox']

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

  return `<h1 align="center">Hi 👋, I'm ${profile.name}</h1>\n<h3 align="center">${profile.headline}</h3>\n\n${
    profile.includeVisitorBadge
      ? `<p align="center">\n  <img src="https://komarev.com/ghpvc/?username=${safeGithub}&label=Profile%20views&color=0e75b6&style=flat" alt="profile views" />\n</p>\n\n`
      : ''
  }## About Me\n\n- 🔭 I’m currently working on **${profile.currentlyWorking}**\n- 🌱 I’m currently learning **${profile.currentlyLearning}**\n- 💬 Ask me about **${profile.askMeAbout}**\n- 📍 Based in **${profile.location}**\n- ⚡ Fun fact: **${profile.funFact}**\n\n${profile.bio}\n\n## Connect with Me\n\n<p align="left">\n  <a href="https://github.com/${safeGithub}" target="blank">GitHub</a> ·\n  <a href="https://www.linkedin.com/in/${profile.linkedin}" target="blank">LinkedIn</a> ·\n  <a href="mailto:${profile.email}">Email</a> ·\n  <a href="${profile.portfolio}" target="blank">Portfolio</a>\n</p>\n\n## Skills\n\n<p align="left">\n${skills.map((skill) => `  ${badge(skill)}`).join('\n')}\n</p>\n\n## Tools\n\n<p align="left">\n${tools.map((tool) => `  ${badge(tool)}`).join('\n')}\n</p>\n\n${
    profile.includeStats
      ? `## GitHub Stats\n\n<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api?username=${safeGithub}&show_icons=true&theme=${profile.theme}" alt="${safeGithub} GitHub stats" />\n</p>\n\n`
      : ''
  }${
    profile.includeStreak
      ? `<p align="center">\n  <img src="https://streak-stats.demolab.com?user=${safeGithub}&theme=${profile.theme}" alt="${safeGithub} GitHub streak" />\n</p>\n\n`
      : ''
  }${
    profile.includeTopLangs
      ? `<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${safeGithub}&layout=compact&theme=${profile.theme}" alt="${safeGithub} top languages" />\n</p>\n\n`
      : ''
  }---\n\n<p align="center">Generated with ❤️ using Dev Profile Studio</p>\n`
}

function Field({ label, name, value, onChange, textarea = false, placeholder }) {
  const shared =
    'w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      {textarea ? (
        <textarea
          className={`${shared} min-h-24 resize-y`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input className={shared} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </label>
  )
}

function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-indigo-600"
      />
    </label>
  )
}

function IconBadge({ children }) {
  return (
    <span className="inline-grid h-5 w-5 place-items-center rounded-md bg-indigo-100 text-xs font-black text-indigo-700">
      {children}
    </span>
  )
}

function App() {
  const [profile, setProfile] = useState(initialProfile)
  const [copied, setCopied] = useState(false)
  const markdown = useMemo(() => generateMarkdown(profile), [profile])

  function updateProfile(event) {
    const { name, value, type, checked } = event.target
    setProfile((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
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

  function applyTemplate(templateName) {
    setProfile((current) => ({ ...current, ...templates[templateName] }))
  }

  function resetForm() {
    setProfile(initialProfile)
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0e7ff,transparent_32%),linear-gradient(135deg,#f8fafc,#eef2ff)] text-slate-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 lg:px-8">
        <header className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-xl shadow-indigo-100/70 backdrop-blur lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                <IconBadge>✦</IconBadge> Dev Profile Studio
              </div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Build a clean GitHub profile README in minutes.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Fill your details, preview the generated markdown, then copy or download your README.md file.
              </p>
            </div>
            <div className="grid gap-3 rounded-3xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300 md:min-w-72">
              <div className="flex items-center gap-3">
                <IconBadge>⌘</IconBadge>
                <span className="font-semibold">README Generator</span>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Includes badges, GitHub stats, streak cards, top languages, links, and personal intro sections.
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur lg:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Profile Details</h2>
                <p className="text-sm text-slate-500">Customize the sections used in your README.</p>
              </div>
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
              >
                <span>↻</span> Reset
              </button>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {Object.keys(templates).map((templateName) => (
                <button
                  key={templateName}
                  onClick={() => applyTemplate(templateName)}
                  className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-bold capitalize text-indigo-700 transition hover:bg-indigo-100"
                >
                  {templateName}
                </button>
              ))}
            </div>

            <div className="grid gap-4">
              <Field label="Name" name="name" value={profile.name} onChange={updateProfile} />
              <Field label="Headline" name="headline" value={profile.headline} onChange={updateProfile} />
              <Field label="Short Bio" name="bio" value={profile.bio} onChange={updateProfile} textarea />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Location" name="location" value={profile.location} onChange={updateProfile} />
                <Field label="GitHub Username" name="github" value={profile.github} onChange={updateProfile} />
              </div>
              <Field label="Currently Working On" name="currentlyWorking" value={profile.currentlyWorking} onChange={updateProfile} />
              <Field label="Currently Learning" name="currentlyLearning" value={profile.currentlyLearning} onChange={updateProfile} />
              <Field label="Ask Me About" name="askMeAbout" value={profile.askMeAbout} onChange={updateProfile} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Email" name="email" value={profile.email} onChange={updateProfile} />
                <Field label="LinkedIn Username" name="linkedin" value={profile.linkedin} onChange={updateProfile} />
              </div>
              <Field label="Portfolio URL" name="portfolio" value={profile.portfolio} onChange={updateProfile} />
              <Field label="Skills, comma separated" name="skills" value={profile.skills} onChange={updateProfile} textarea />
              <Field label="Tools, comma separated" name="tools" value={profile.tools} onChange={updateProfile} textarea />
              <Field label="Fun Fact" name="funFact" value={profile.funFact} onChange={updateProfile} />

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Stats Theme</span>
                <select
                  name="theme"
                  value={profile.theme}
                  onChange={updateProfile}
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                >
                  {themeOptions.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <Toggle label="Include GitHub stats" name="includeStats" checked={profile.includeStats} onChange={updateProfile} />
                <Toggle label="Include streak card" name="includeStreak" checked={profile.includeStreak} onChange={updateProfile} />
                <Toggle label="Include top languages" name="includeTopLangs" checked={profile.includeTopLangs} onChange={updateProfile} />
                <Toggle label="Include visitor badge" name="includeVisitorBadge" checked={profile.includeVisitorBadge} onChange={updateProfile} />
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300 lg:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <IconBadge>&lt;/&gt;</IconBadge> Generated README
                </h2>
                <p className="text-sm text-slate-400">Copy this into your GitHub profile repository README.md.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={copyMarkdown}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-400"
                >
                  <span>{copied ? '✓' : '⧉'}</span> {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={downloadMarkdown}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                >
                  <span>↓</span> Download
                </button>
              </div>
            </div>

            <textarea
              value={markdown}
              className="h-[620px] w-full resize-none rounded-3xl border border-white/10 bg-slate-900 p-5 font-mono text-sm leading-6 text-slate-100 outline-none"
              spellCheck="false"
              readOnly
            />

            <div className="mt-5 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 md:grid-cols-3">
              <div className="flex items-center gap-2"><IconBadge>G</IconBadge> Profile ready</div>
              <div className="flex items-center gap-2"><IconBadge>in</IconBadge> Social links</div>
              <div className="flex items-center gap-2"><IconBadge>@</IconBadge> Contact section</div>
            </div>
          </section>
        </div>

        <footer className="flex flex-col items-center justify-between gap-3 rounded-[2rem] border border-white/70 bg-white/70 p-5 text-sm text-slate-500 shadow-lg shadow-slate-200/70 md:flex-row">
          <span>Made for developers who want a polished GitHub presence.</span>
          <span className="inline-flex items-center gap-2 font-semibold text-indigo-700"><IconBadge>✨</IconBadge> Edit, copy, publish.</span>
        </footer>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
