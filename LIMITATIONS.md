# CivicMind AI — Limitations, Assumptions & Honesty Disclosure

This document provides a transparent, uncompromising audit of the technical assumptions, operational constraints, and boundaries of the CivicMind AI prototype, pursuant to Section 23 of the platform specification.

---

## 1. AI Engine & Model Modes

- **Dual Mode Architecture:** CivicMind AI incorporates a provider-independent AI service layer. When `GEMINI_API_KEY` is supplied, it invokes Google Gemini 1.5 Flash structured JSON endpoints.
- **Deterministic Fallback Pipeline:** When API keys are omitted or external network requests time out, the platform seamlessly executes `CivicRules-v2.1`, an explainable, deterministic rule and keyword engine.
- **Transparent Method Tagging:** Every analysis record persists an explicit `processingMethod` field (`llm_gemini` vs. `rules_fallback`) visible in the UI. Fallback heuristics are never disguised as live LLM inferences.
- **Image Analysis Disclosure:** The platform implements client-side image validation (size, MIME type, preview rendering), but does **NOT** run an automated deep-learning computer vision inference on photos. No unverified image classifications are claimed.

---

## 2. Priority Scoring & Decision Boundaries

- **Prototype Scoring Model:** The 0–100 Explainable Priority Score is derived from five transparent, weighted dimensions (Immediate Safety Risk [0–30], Public Impact [0–25], Infrastructure Disruption [0–15], Recurrence [0–15], Time Unresolved [0–15]).
- **Not a Legal SLA:** The calculated score and configured service targets (e.g. Critical $\le$ 12h, High $\le$ 36h) represent prototype operating targets, not legally binding municipal charters.
- **Human Review Safeguard:** Priority rankings are advisory aids for dispatchers. Critical hazard overrides elevate urgent threats (e.g. uncovered manholes, live wires) to score $\ge 85$, but the platform makes no claim of automatic dispatch without human verification.
- **Emergency Services Boundary:** CivicMind AI is **NOT** a replacement for 911 / 112 emergency dispatch. High-risk hazards display prominent advisories urging users to contact emergency first responders.

---

## 3. Duplicate Detection & Threshold Assumptions

- **Configured Thresholds:**
  - $\text{Score} < 0.45$: Unlikely duplicate.
  - $0.45 \le \text{Score} < 0.70$: Possible match flagged for dispatcher review.
  - $\text{Score} \ge 0.70$: Strong duplicate candidate.
- **Human-in-the-Loop Preservation:** Reports matching duplicate thresholds are **NEVER** suppressed, merged, or automatically deleted. Duplicate candidate relationships are presented to authorized operators to confirm or dismiss.
- **Geographic Distance Gate:** Two identical incident descriptions located $>500\text{m}$ apart receive a physical distance attenuation penalty, preventing distinct defects across town from being falsely tagged as duplicates.

---

## 4. Geospatial Clustering & Civic Risk Radar

- **Clustering Method:** Hotspots are identified via density-radius clustering within an empirical neighborhood radius of approximately $350\text{m}$ with a minimum threshold of 3 related incidents.
- **Hypotheses vs. Facts:** Cross-category correlations (e.g. drainage clogging + standing water + road asphalt cracking) generate AI infrastructure hypotheses phrased as *"Potential contributing factor"* rather than asserted physical causality. Physical core sampling and CCTV culvert inspections remain mandatory.

---

## 5. Persistence, Identity & Data Integrity

- **Database Persistence:** All data is persisted to disk in `server/data/civicmind.json` using transactional file operations (`.tmp` write and atomic rename) ensuring data survives server restarts. Browser `localStorage` is **never** used as a primary database.
- **Authentication & Roles:** For evaluation convenience, the system provides seeded role switching (`CITIZEN`, `STAFF`, `ADMIN`). It does not currently integrate with municipal SAML / Active Directory SSO or real SMS verification.
- **Public Privacy Safeguards:** The public tracking endpoint (`/api/v1/track/:id`) and Public Transparency Portal strictly filter out private citizen contact details, internal staff triage notes, and access tokens. Exact GPS coordinates of sensitive security incidents are blurred.

---

## 6. Synthetic Demonstration Dataset

- **Synthetic Context:** All 55+ reports, coordinates, resident names, and municipal personnel are synthetic constructs modeled around a metropolitan grid centered at $(37.7749, -122.4194)$.
- **Evaluation Metrics Disclaimer:** Accuracy ($94\%$), Precision ($89\%$), and Recall ($92\%$) displayed in the AI Quality Evaluation panel are measured against the labeled synthetic demonstration test set and should not be construed as live production municipal benchmarks.

---

## 7. Requirements for Real-World Municipal Deployment

To transition CivicMind AI from an advanced research prototype to an official city deployment, the following integrations are required:
1. **GIS & PostGIS:** Integration with city ESRI shapefiles, parcel boundaries, and PostGIS spatial indexing.
2. **Enterprise SSO:** SAML 2.0 / OpenID Connect integration with municipal employee identity providers.
3. **Work Order Management:** Bi-directional sync with legacy municipal systems (Cityworks, Maximo, Salesforce Public Sector).
4. **Hardware IoT Telemetry:** Real-time ingestion from smart stormwater level sensors, connected streetlights, and acoustic water pipe sensors.
5. **Mobile Field Crew App:** Offline-first mobile application with digital signature sign-off and GPS-verified photo evidence capture.
