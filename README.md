# 🚀 AI Resume Builder (Powered by Google Gemini & Next.js 14)

A modern, full-featured AI-powered Resume Builder web application built with **Next.js 14 (App Router)**, **React 18**, **Tailwind CSS**, and the **Google Gemini API** (`@google/generative-ai`).

Craft high-impact, ATS-optimized resumes in minutes. Use Gemini AI to rewrite your experience bullet points with strong action verbs and metrics, polish your executive summary, switch between 3 professional templates, and export print-ready PDFs with 1 click.

---

## ✨ Features

- **🤖 Google Gemini AI Integration (`gemini-1.5-flash`)**:
  - Automatically turns raw bullet points into quantifiable, ATS-friendly achievement statements (Google X-Y-Z formula: *Accomplished [X] as measured by [Y] by doing [Z]*).
  - Crafts tailored executive professional summaries based on your experience and target role.
  - Suggests high-demand industry skills based on your target job title and description.
- **🎨 3 Professional Resume Templates**:
  - **Modern**: Clean tech & startup layout with bold accent headers, sleek metadata, and badge skill tags.
  - **Classic**: Traditional Ivy League / Wall Street serif format with horizontal rules, preferred by traditional corporate and finance recruiters.
  - **Minimal**: Scandinavian minimalist monochrome aesthetic with crisp typography and elegant whitespace.
- **⚡ Real-Time Live Preview**:
  - Live side-by-side editing on desktop, with intuitive tab toggling on mobile.
  - Real-time two-way synchronization: manually edit any line after AI generation.
  - Zoom controls (70% – 130%) to view A4 paper accurately on any screen size.
- **📄 1-Click PDF Export**:
  - High-resolution client-side vector PDF generation using `html2pdf.js`.
  - Built-in `@media print` fallback with browser system print (`window.print()`) for pixel-perfect A4 printing.
- **🔒 Zero-Database, 100% Client-Side Privacy**:
  - No user registration, no login, no database, no trackers, and no payment walls.
  - All resume data lives safely in React client state.
- **📋 1-Click Sample Data**:
  - Instantly load a complete, realistic software engineering profile with one click to test templates and AI generation immediately.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Frontend Library** | [React 18](https://react.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **AI Engine** | [Google Gemini API](https://ai.google.dev/) (`@google/generative-ai` SDK) |
| **PDF Generation** | `html2pdf.js` + Native CSS Print Engine |

---

## 📁 Project Structure

```
/
├── app/
│   ├── api/
│   │   └── generate-resume/
│   │       └── route.js          # Next.js API route handling Gemini AI requests
│   ├── builder/
│   │   └── page.js               # Resume builder page (Form + Live Preview)
│   ├── globals.css               # Tailwind directives & A4 print media styles
│   ├── layout.js                 # App root layout with Inter font & metadata
│   └── page.js                   # High-converting landing page with Hero & Templates
├── components/
│   ├── templates/
│   │   ├── ModernTemplate.jsx    # Modern tech resume layout
│   │   ├── ClassicTemplate.jsx   # Classic corporate serif layout
│   │   └── MinimalTemplate.jsx   # Minimalist monochrome layout
│   ├── DownloadButton.jsx        # Client-side PDF export with print fallback
│   ├── EducationField.jsx        # Repeatable education section
│   ├── ExperienceField.jsx       # Repeatable work experience section
│   ├── Hero.jsx                  # Hero section with template preview cards
│   ├── LoadingSpinner.jsx        # AI generation loading indicator
│   ├── Navbar.jsx                # Responsive navigation header
│   ├── ResumeForm.jsx            # Accordion form organizing all resume fields
│   ├── ResumePreview.jsx         # A4 paper wrapper with zoom controls
│   ├── SkillsInput.jsx           # Interactive tag/chip input for skills
│   └── TemplateSelector.jsx      # Visual template picker
├── lib/
│   ├── geminiClient.js           # Gemini SDK client, prompt engineering & JSON parser
│   └── sampleData.js             # Realistic sample data for 1-click preview
├── .env.local.example            # Example environment variables file
├── .gitignore                    # Git ignore file (excludes .env.local & node_modules)
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS plugins
├── tailwind.config.js            # Custom Tailwind theme configuration
└── README.md                     # Documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your computer.

Check your version:
```bash
node -v
npm -v
```

### 1. Clone or Open the Project

Navigate to the project root directory:
```bash
cd Project-Resume
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Your Gemini API Key

1. Obtain a free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```
   *(On Windows PowerShell: `Copy-Item .env.local.example .env.local`)*
3. Open `.env.local` and add your key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

> **Note**: `.env.local` is automatically gitignored so your API key will never be committed.

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🎯 How to Use the App

1. **Visit the Landing Page (`http://localhost:3000`)**:
   - Explore the feature overview and preview the 3 resume templates.
   - Click **"Create My Resume"** or pick a specific template thumbnail to start.
2. **Build Your Resume (`/builder`)**:
   - Click **"Load Sample Data"** in the top bar to instantly test with realistic software engineer data, or fill in your own information.
   - Set an optional **Target Job Title / Description** in the AI Context section.
3. **Generate with AI**:
   - Click the purple **"Generate with AI"** button in the header.
   - Gemini will analyze your background, rewrite each experience entry into quantifiable achievement statements starting with action verbs, optimize your summary, and suggest relevant skills.
4. **Fine-Tune & Choose Layout**:
   - Switch between **Modern**, **Classic**, and **Minimal** templates using the template selector.
   - Manually tweak any field directly in the form; the preview updates in real time.
5. **Download PDF**:
   - Click **"Download PDF"** to export your formatted A4 PDF.
   - You can also use **"Print / System PDF"** to print directly or save as PDF using your browser's native print engine.

---

## 🧠 AI Prompt Engineering Details

Located in `lib/geminiClient.js`, the prompt instructs Gemini to:
1. Adhere to the **Google X-Y-Z formula** (*"Accomplished [X] as measured by [Y] by doing [Z]"*).
2. Begin every bullet point with strong action verbs (*Architected, Spearheaded, Engineered, Orchestrated*).
3. Align keywords to the candidate's target job posting.
4. Output strictly valid JSON without conversational filler or Markdown blocks.

---

## 🛡️ License

MIT License. Free to use for personal or commercial projects.
