
# 📄 SkillDrift — AI-Powered Resume Intelligence Platform

> “Upload your resume. Get AI-powered skill analysis, gap detection, personalized quizzes, improvement plans, and job-fit recommendations — all in one dashboard.”

---

## 🚀 Overview

**SkillDrift** is an AI-driven web application that analyzes resumes to:
- Extract key information (skills, experience, education)
- Detect job-fit and skill gaps
- Generate quizzes to assess knowledge
- Recommend career improvements
- Review and rewrite resumes using AI

Built using **Laravel + Inertia + React**, this platform empowers users to better understand their capabilities, target suitable job roles, and improve their personal branding.

---

## 🎯 Real-World Problem

Many job seekers:
- Don’t know which skills they truly lack
- Use outdated or vague resumes
- Waste time on irrelevant tests or courses

**SkillDrift solves this** by offering an AI-first approach to personalized career growth.

---

## 🧠 Core Features

| Feature | Description |
|--------|-------------|
| 🧾 **Resume Parsing** | Extracts skills, education, certifications, job history from uploaded resume (PDF/DOCX) |
| 🧠 **AI Skill Analysis** | Detects strengths, weaknesses, job fit, missing skills |
| 📊 **Skill Gap Dashboard** | Visual radar chart of technical and soft skills |
| ❓ **Quiz Generator** | AI-generated quizzes based on resume content |
| 📘 **Career Recommendations** | Personalized test links, certifications, and course suggestions |
| ✍️ **CV Critique** | Flags buzzwords, outdated formats, missing impact statements |
| 📈 **Progress Tracker** | Monitor skill improvements and quiz performance over time |

---

## 🖥️ UI & Dashboard Layout

### Sidebar Navigation
- 📂 Resume Upload
- 📊 My Skill Profile
- 🧠 Quizzes
- 📘 Suggestions
- ✍️ CV Review
- 📝 Resume History

### Dashboard Widgets
- ✅ Resume Summary
- 📉 Skill Radar Chart
- 🧑‍💼 Suggested Roles (with Fit %)
- 📘 Learning Suggestions
- 🧪 Latest Quiz Scores

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 11, Laravel Scout, Sanctum API |
| Frontend | Inertia.js + React.js + Tailwind CSS |
| AI Integration | OpenAI GPT-4, LangChain, Python Microservice (for PDF parsing) |
| Storage | MySQL, Spatie Media Library (for file uploads) |
| Charts | Recharts, Chart.js |
| Search/Similarity | Meilisearch or Pinecone (for embedding-based role matching) |

---

## 🧪 Sample AI Prompts

### 🎯 Resume Analysis
```
Analyze this resume text and return:
1. Suggested job roles
2. Missing skills for each role
3. Course or certification recommendations
4. Resume critique
```

### ❓ Quiz Generation
```
Create 5 multiple-choice questions to test knowledge on [React, Laravel, REST APIs] based on this resume content.
```

---

## 🛠️ MVP Roadmap

| Phase | Goal |
|-------|------|
| ✅ Phase 1 | Resume Upload + Parsing + Job Role Detection |
| ✅ Phase 2 | Skill Visualization + Gap Detection |
| ✅ Phase 3 | Quiz Generator + Score Tracking |
| ✅ Phase 4 | CV Review and Rewrite Suggestions |
| 🚀 Phase 5 | Personalized Learning Paths + Career Coach AI |

---

## 🔮 Future Enhancements

- 🧑‍💼 AI Career Coach (chat-based guidance)
- 📄 LinkedIn Profile & Cover Letter Generator
- 🔗 GitHub/LinkedIn Integrations
- 🧠 Role-Based Interview Question Generator
