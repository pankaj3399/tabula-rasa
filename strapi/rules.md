# Content Creation Guide for Strapi CMS

## Overview

This guide explains how to format medical content for our Strapi CMS system. Follow these exact formatting rules to ensure proper rendering and navigation generation.

## 📋 Critical Formatting Rules

### 1. High-Yield Points (Creates Blue Box)

**MUST use exactly:** `## High-Yield Points`

**MUST use:** `•` bullets (not `-` or `*`)

```markdown
## High-Yield Points

• GDMT for HFrEF includes 4 key medication classes: ACEI/ARB/ARNI, beta-blockers, MRAs, and SGLT2 inhibitors
• HFpEF is more common in elderly women with hypertension and is more difficult to treat than HFrEF
• BNP/NT-proBNP is useful for both diagnosis and prognosis in heart failure
```

### 2. Navigation Structure

```markdown
## Major Section (appears as • in navigation)

Content for major section.

### Subsection (appears as ◦ under major section)

Content for subsection.

#### Minor Heading (content only, not in navigation)
```

### 3. Standard Formatting

```markdown
**Bold text** for medications and key terms
_Italic text_ for medical terminology

• Main bullet point
◦ Sub-bullet point

| Parameter | Normal  | Abnormal |
| --------- | ------- | -------- |
| BP        | <120/80 | >140/90  |
```

## 🎯 Essential Characters Reference

| Element     | Character  | Usage                     |
| ----------- | ---------- | ------------------------- |
| Main bullet | `•`        | All primary bullet points |
| Sub bullet  | `◦`        | Secondary bullet points   |
| Bold        | `**text**` | Medications, key terms    |
| Italic      | `*text*`   | Medical terminology       |

## ✅ Complete Example

Below is a properly formatted medical topic showing all formatting rules:

---

# Heart Failure Clinical Guide


## Overview and Classification

Heart failure (HF) is a clinical syndrome characterized by the heart's inability to pump sufficient blood to meet the body's metabolic demands. It affects approximately **6.2 million adults** in the United States.

### Classification by Ejection Fraction

| Type      | Ejection Fraction | Alternative Name          | Primary Pathophysiology         |
| --------- | ----------------- | ------------------------- | ------------------------------- |
| **HFrEF** | ≤40%              | _Systolic heart failure_  | Impaired contractile function   |
| **HFpEF** | ≥50%              | _Diastolic heart failure_ | Impaired ventricular relaxation |

## Heart Failure with Reduced Ejection Fraction (HFrEF)

**HFrEF**, also known as _systolic heart failure_, is defined as heart failure with an ejection fraction **≤40%**.

### Clinical Presentation

• **Dyspnea** (at rest or with exertion)
• **Orthopnea** and _paroxysmal nocturnal dyspnea_
• **Fatigue** and exercise intolerance
• **Peripheral edema** and _jugular venous distention_
• **S3 heart sound** (_ventricular gallop_)

### Diagnostic Approach

• **Echocardiography**: Confirms reduced EF ≤40%, may show ventricular dilation
• **BNP/NT-proBNP**: Elevated in heart failure
• **ECG**: May show left ventricular hypertrophy, prior MI, conduction abnormalities
• **Chest X-ray**: May show cardiomegaly, pulmonary congestion

### Management

#### Guideline-Directed Medical Therapy (GDMT)

• **ACE inhibitors/ARBs/ARNI**: Reduce mortality and hospitalization
• **Beta-blockers**: Improve survival and symptoms
• **Mineralocorticoid receptor antagonists (MRAs)**: Additional mortality benefit
• **SGLT2 inhibitors**: Newer agents shown to reduce HF hospitalizations

#### Additional Therapies

• **Diuretics**: For symptom management of volume overload
• **Device therapy**:
◦ Consider **ICD** for primary prevention
◦ **CRT** for select patients

## Heart Failure with Preserved Ejection Fraction (HFpEF)

**HFpEF**, also known as _diastolic heart failure_, is defined as heart failure with an ejection fraction **≥50%**.

### Clinical Presentation

• Similar symptoms to **HFrEF**, but often more pronounced with exertion
• More common in **elderly**, **women**, and those with **hypertension**
• Often presents with **exercise intolerance** as the predominant symptom
• **S4 heart sound** (_atrial gallop_) may be present

### Management

• **Diuretics**: For symptom management of volume overload
• **SGLT2 inhibitors**: Recent data show benefit in reducing HF hospitalizations
• **Blood pressure control**: Essential to reduce cardiac afterload
• **Treatment of comorbidities**: Manage **hypertension**, **diabetes**, **obesity**

## High-Yield Points

• **GDMT for HFrEF** includes 4 key medication classes: **ACE inhibitors/ARBs/ARNI**, **beta-blockers**, **MRAs**, and **SGLT2 inhibitors**
• **HFpEF** is more common in elderly women with hypertension and is more difficult to treat than **HFrEF**
• **BNP/NT-proBNP** is useful for both diagnosis and prognosis in heart failure
• **NYHA classification** (I-IV) is used to classify heart failure severity based on symptoms
• Worsening renal function during heart failure treatment may represent _cardiorenal syndrome_
---

## ❌ Common Mistakes to Avoid

• **DO NOT** use `-` or `*` for bullets - ONLY use `•`
• **DO NOT** change "High-Yield Points" phrase - must be exact
• **DO NOT** skip navigation hierarchy - use ## then ### then ####
• **DO NOT** forget to bold medications and key medical terms
• **DO NOT** use numbered lists in place of bullet points

## ✅ Quality Checklist

Before submitting content, verify:

• High-Yield Points section uses exact phrase with `•` bullets
• All major sections use `##` for navigation
• All subsections use `###` for navigation  
• Medications are **bolded**
• Medical terminology is _italicized_
• Bullet points use `•` character consistently
• Tables are properly formatted with headers
• Sub-bullets use `◦` character

## 🚀 Quick Start Template

```markdown
# [Topic Name]

## High-Yield Points

• Point 1 with **bold terms**
• Point 2 with _italic medical terms_
• Point 3 with key information

## Overview

Brief introduction to the topic.

### Subtopic 1

Content with:
• **Bold medications**
• _Italic medical terms_
• Proper bullet formatting

### Subtopic 2

| Parameter | Value 1 | Value 2  |
| --------- | ------- | -------- |
| Item      | Normal  | Abnormal |

## Major Section 2

More content following the same pattern.
```

---

**Remember**: Consistency in formatting ensures proper system functionality and professional presentation. Always follow these exact formatting rules for optimal results.
