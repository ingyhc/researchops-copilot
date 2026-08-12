# Evaluation prompt

Paste the block below into ChatGPT, then attach either the screenshots
(`demo/screenshots/`) or `demo/source-bundle.md` — or both in one message.

---

I'm going to show you an internal product I designed and built. I want a hard,
specific critique, not encouragement. Assume I can take it.

## Context

**Product:** ResearchOps Copilot — an internal AI research tool for junior Client
Service Associates (CSAs) at an expert network company.

**The user's problem:** A junior CSA receives a client research brief in an
industry they've never covered. Before they can source experts, they have to work
out four things that a senior CSA would know instinctively:

1. What is the client actually trying to understand?
2. How does this industry work?
3. Where does the relevant knowledge sit?
4. Which expert profiles should be sourced?

**What the product does:** The CSA pastes the raw brief. Three agents run, and the
output is a dashboard with one tab each — Brief Understanding, Industry
Intelligence (an interactive value-chain map), and Knowledge Owners (a sourcing
table mapping each research question to the function, department and job titles
that own the answer, plus profiles to avoid).

**The example brief** in the demo is a real-shaped one: a client wants experts on
Chinese automotive OEM export strategy (CBU vs CKD) and how that decision drives
seating Tier 1 supplier selection across Lear, Adient, Yanfeng and Jifeng.

**Deliberate constraints — do not flag these as gaps:**

- This is Phase 1. There is **no AI integration**, no API, no agent workflow. All
  output is mock data behind a service layer (`analyzeBrief()`) that returns a
  fixture on a timer. The goal is to validate the UX and product concept *before*
  building the AI pipeline.
- It is intentionally **not a chatbot**. The design target is Linear / Notion /
  Palantir-style analytical tooling, not a conversational assistant.
- There is no auth, no persistence, no project list, no multi-user.

## What I want evaluated

**Product thinking (weight this heaviest)**

- Does the three-agent decomposition match how a CSA actually works, or is it a
  tidy structure imposed on a messy job?
- Is the output *actionable* — could a junior CSA source experts from this — or is
  it just well-organised summary?
- Showing three ranked intent hypotheses instead of one answer: right call for
  this user, or does it push the interpretation burden back onto the person least
  equipped to resolve it?
- What is the single most valuable thing missing before Phase 2?

**UX and information architecture**

- Is the tab order right? Would a CSA under time pressure use them in that order?
- Is anything on screen decorative rather than decision-supporting?
- Where would a real user get stuck, or stop trusting the output?

**Visual and interaction craft**

- Does it read as credible enterprise software, or as a portfolio piece imitating
  one? Be specific about what gives it away.
- Typography, spacing, colour restraint, hierarchy — where does it break down?

**Credibility to a hiring manager**

- Looking only at this, what would you conclude about the person who made it?
- What would make a reviewer suspicious that the thinking is thinner than the
  visuals?

## How to answer

1. Your three strongest criticisms, ranked, each with a concrete fix.
2. The two things most worth keeping.
3. One structural change you'd make if this had to ship to real CSAs next quarter.

Skip the summary of what you see — I built it, I know what it is. Go straight to
judgement.
