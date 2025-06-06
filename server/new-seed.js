const axios = require('axios');
require('dotenv').config();

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('❌ STRAPI_TOKEN environment variable is required!');
  console.log(
    'Please set your Strapi API token in .env file or environment variables'
  );
  process.exit(1);
}

// Axios instance with auth
const strapi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Comprehensive Seed Data
const seedData = {
  systems: [
    {
      name: 'Cardiovascular System',
      slug: 'cardiovascular-system',
      percentage: 11,
      order: 1,
    },
    {
      name: 'Pulmonary System',
      slug: 'pulmonary-system',
      percentage: 9,
      order: 2,
    },
    {
      name: 'Gastrointestinal System/Nutrition',
      slug: 'gastrointestinal-system-nutrition',
      percentage: 8,
      order: 3,
    },
    {
      name: 'Musculoskeletal System',
      slug: 'musculoskeletal-system',
      percentage: 8,
      order: 4,
    },
    {
      name: 'Neurologic System',
      slug: 'neurologic-system',
      percentage: 7,
      order: 5,
    },
    {
      name: 'Psychiatry/Behavioral Science',
      slug: 'psychiatry-behavioral-science',
      percentage: 7,
      order: 6,
    },
    {
      name: 'Infectious Diseases',
      slug: 'infectious-diseases',
      percentage: 7,
      order: 7,
    },
    {
      name: 'Reproductive System',
      slug: 'reproductive-system',
      percentage: 7,
      order: 8,
    },
    {
      name: 'Endocrine System',
      slug: 'endocrine-system',
      percentage: 6,
      order: 9,
    },
    {
      name: 'Eyes, Ears, Nose, and Throat',
      slug: 'eyes-ears-nose-throat',
      percentage: 6,
      order: 10,
    },
    {
      name: 'Professional Practice',
      slug: 'professional-practice',
      percentage: 6,
      order: 11,
    },
    {
      name: 'Hematologic System',
      slug: 'hematologic-system',
      percentage: 5,
      order: 12,
    },
    {
      name: 'Renal System',
      slug: 'renal-system',
      percentage: 5,
      order: 13,
    },
    {
      name: 'Dermatologic System',
      slug: 'dermatologic-system',
      percentage: 4,
      order: 14,
    },
    {
      name: 'Genitourinary System',
      slug: 'genitourinary-system',
      percentage: 4,
      order: 15,
    },
  ],

  topics: [
    // Cardiovascular System Topics
    {
      name: 'Cardiomyopathies',
      slug: 'cardiomyopathies',
      description:
        'Comprehensive study of various cardiomyopathies including dilated, hypertrophic, restrictive, and stress-induced cardiomyopathies.',
      systemSlug: 'cardiovascular-system',
    },
    {
      name: 'Coronary Artery Disease',
      slug: 'coronary-artery-disease',
      description:
        'Acute coronary syndromes, stable angina, and myocardial infarction management.',
      systemSlug: 'cardiovascular-system',
    },
    {
      name: 'Heart Failure',
      slug: 'heart-failure',
      description:
        'Pathophysiology, classification, and management of acute and chronic heart failure.',
      systemSlug: 'cardiovascular-system',
    },
    {
      name: 'Valvular Disorders',
      slug: 'valvular-disorders',
      description:
        'Aortic and mitral valve pathologies including stenosis and regurgitation.',
      systemSlug: 'cardiovascular-system',
    },
    {
      name: 'Arrhythmias',
      slug: 'arrhythmias',
      description:
        'Common cardiac arrhythmias, their recognition, and management strategies.',
      systemSlug: 'cardiovascular-system',
    },
    {
      name: 'Hypertension',
      slug: 'hypertension',
      description:
        'Primary and secondary hypertension diagnosis and management.',
      systemSlug: 'cardiovascular-system',
    },

    // Pulmonary System Topics
    {
      name: 'Asthma and COPD',
      slug: 'asthma-copd',
      description:
        'Obstructive lung diseases including asthma and chronic obstructive pulmonary disease.',
      systemSlug: 'pulmonary-system',
    },
    {
      name: 'Pneumonia',
      slug: 'pneumonia',
      description:
        'Community-acquired, hospital-acquired, and atypical pneumonias.',
      systemSlug: 'pulmonary-system',
    },
    {
      name: 'Pulmonary Embolism',
      slug: 'pulmonary-embolism',
      description:
        'Diagnosis and management of acute pulmonary embolism and DVT.',
      systemSlug: 'pulmonary-system',
    },
    {
      name: 'Pleural Diseases',
      slug: 'pleural-diseases',
      description:
        'Pleural effusions, pneumothorax, and other pleural pathologies.',
      systemSlug: 'pulmonary-system',
    },

    // Gastrointestinal System/Nutrition Topics
    {
      name: 'Peptic Ulcer Disease',
      slug: 'peptic-ulcer-disease',
      description:
        'Gastric and duodenal ulcers, H. pylori infection, and management strategies.',
      systemSlug: 'gastrointestinal-system-nutrition', // Updated slug
    },
    {
      name: 'Inflammatory Bowel Disease',
      slug: 'inflammatory-bowel-disease',
      description: "Crohn's disease, ulcerative colitis, and their management.",
      systemSlug: 'gastrointestinal-system-nutrition', // Updated slug
    },
    {
      name: 'Hepatitis and Liver Disease',
      slug: 'hepatitis-liver-disease',
      description: 'Viral hepatitis, cirrhosis, and other liver pathologies.',
      systemSlug: 'gastrointestinal-system-nutrition', // Updated slug
    },
    {
      name: 'GI Bleeding',
      slug: 'gi-bleeding',
      description:
        'Upper and lower gastrointestinal bleeding evaluation and management.',
      systemSlug: 'gastrointestinal-system-nutrition', // Updated slug
    },

    // Musculoskeletal System Topics
    {
      name: 'Fractures and Trauma',
      slug: 'fractures-trauma',
      description:
        'Common fractures, their recognition, and initial management.',
      systemSlug: 'musculoskeletal-system',
    },
    {
      name: 'Arthritis',
      slug: 'arthritis',
      description:
        'Osteoarthritis, rheumatoid arthritis, and other arthritic conditions.',
      systemSlug: 'musculoskeletal-system',
    },
    {
      name: 'Back Pain',
      slug: 'back-pain',
      description: 'Evaluation and management of acute and chronic back pain.',
      systemSlug: 'musculoskeletal-system',
    },

    // Eyes, Ears, Nose, and Throat Topics
    {
      name: 'Otitis and Hearing Loss',
      slug: 'otitis-hearing-loss',
      description: 'Otitis media, externa, and hearing loss evaluation.',
      systemSlug: 'eyes-ears-nose-throat', // Updated slug
    },
    {
      name: 'Sinusitis and Rhinitis',
      slug: 'sinusitis-rhinitis',
      description:
        'Acute and chronic sinusitis, allergic and non-allergic rhinitis.',
      systemSlug: 'eyes-ears-nose-throat', // Updated slug
    },
    {
      name: 'Eye Disorders',
      slug: 'eye-disorders',
      description:
        'Common eye conditions including conjunctivitis, glaucoma, and cataracts.',
      systemSlug: 'eyes-ears-nose-throat', // Updated slug
    },

    // Additional topics for other systems
    {
      name: 'Diabetes Mellitus',
      slug: 'diabetes-mellitus',
      description:
        'Type 1 and Type 2 diabetes diagnosis, management, and complications.',
      systemSlug: 'endocrine-system',
    },
    {
      name: 'Thyroid Disorders',
      slug: 'thyroid-disorders',
      description: 'Hyperthyroidism, hypothyroidism, and thyroid nodules.',
      systemSlug: 'endocrine-system',
    },
  ],

  subtopics: [
    // Cardiomyopathies Subtopics
    {
      title: 'Dilated Cardiomyopathy (DCM)',
      slug: 'dilated-cardiomyopathy',
      content: `<h2>Definition & Epidemiology</h2>
<p>DCM is a heart muscle disease characterized by the enlargement and weakened contraction of the left ventricle or both ventricles, leading to impaired systolic function. It is not caused by coronary artery disease, hypertension, or valvular disease. DCM is a leading cause of heart failure, affecting approximately 6 per 100,000 individuals annually.</p>

<h2>Pathophysiology</h2>
<p>Diverse genetic and environmental factors can cause DCM, ultimately leading to myocardial damage, inflammation, fibrosis (scarring), and impaired contractility. Genetic mutations, infections, toxins, and autoimmune reactions are major contributors to its development.</p>

<h2>Risk Factors</h2>
<ul>
<li><strong>Sex:</strong> DCM is more prevalent in men than in women.</li>
<li><strong>Family history:</strong> A family history of DCM significantly increases an individual's risk.</li>
<li><strong>Other factors:</strong> Alcohol abuse, exposure to cardiotoxic drugs (like anthracyclines), and certain infections are established risk factors for DCM.</li>
</ul>

<h2>Clinical Presentation</h2>
<p>DCM presents with a wide spectrum of symptoms, often related to the degree of left ventricular or biventricular dysfunction:</p>
<ul>
<li>Common symptoms include dyspnea (shortness of breath), fatigue, orthopnea (difficulty breathing while lying down), and peripheral edema (swelling in the legs, ankles, or feet).</li>
<li>Less common symptoms may include chest pain, palpitations, and syncope (fainting).</li>
</ul>

<h2>Diagnostic Testing</h2>
<ul>
<li><strong>Echocardiography:</strong> This is the gold standard for diagnosing DCM, revealing left ventricular dilation and reduced ejection fraction (EF).</li>
<li><strong>Electrocardiography (ECG):</strong> May show abnormalities such as tachycardia, arrhythmias, conduction blocks, or non-specific ST-T wave changes.</li>
<li><strong>Cardiac catheterization:</strong> Used to exclude coronary artery disease as a cause of heart failure.</li>
</ul>

<h2>Treatment</h2>
<ul>
<li><strong>Heart failure management:</strong> ACE inhibitors, ARBs, beta-blockers, and diuretics as indicated.</li>
<li><strong>Device therapy:</strong> ICD or CRT-D may be indicated for primary prevention of sudden cardiac death.</li>
<li><strong>Heart transplantation:</strong> For end-stage disease refractory to medical therapy.</li>
</ul>`,
      topicSlug: 'cardiomyopathies',
    },

    {
      title: 'Hypertrophic Cardiomyopathy (HCM)',
      slug: 'hypertrophic-cardiomyopathy',
      content: `<h2>Definition & Epidemiology</h2>
<p>HCM is a genetic heart muscle disease characterized by left ventricular hypertrophy in the absence of another cardiac or systemic disease that could account for the degree of hypertrophy observed. It affects approximately 1 in 500 people, making it the most common inherited cardiac disease.</p>

<h2>Pathophysiology</h2>
<p>HCM is caused by mutations in genes encoding sarcomeric proteins. The hallmark feature is asymmetric septal hypertrophy, which can lead to left ventricular outflow tract obstruction, diastolic dysfunction, mitral regurgitation, and arrhythmias.</p>

<h2>Clinical Presentation</h2>
<ul>
<li><strong>Often asymptomatic:</strong> Many patients are diagnosed incidentally or through family screening.</li>
<li><strong>Symptoms when present:</strong> Dyspnea, chest pain, palpitations, presyncope, or syncope.</li>
<li><strong>Sudden cardiac death:</strong> Can be the first presentation, particularly in young athletes.</li>
</ul>

<h2>Physical Examination</h2>
<ul>
<li><strong>Harsh systolic murmur:</strong> At left sternal border, increases with Valsalva maneuver and decreases with squatting.</li>
<li><strong>Bifid pulse:</strong> "Spike and dome" arterial pulse contour.</li>
<li><strong>S4 gallop:</strong> Due to decreased ventricular compliance.</li>
</ul>

<h2>Diagnostic Testing</h2>
<ul>
<li><strong>Echocardiography:</strong> Shows asymmetric septal hypertrophy, systolic anterior motion of mitral valve, and dynamic outflow tract obstruction.</li>
<li><strong>ECG:</strong> May show left ventricular hypertrophy, Q waves, or arrhythmias.</li>
<li><strong>Cardiac MRI:</strong> Provides detailed assessment of wall thickness and can identify myocardial fibrosis.</li>
</ul>

<h2>Management</h2>
<ul>
<li><strong>Beta-blockers:</strong> First-line therapy for symptomatic patients.</li>
<li><strong>Activity restriction:</strong> Competitive sports should be avoided.</li>
<li><strong>ICD:</strong> For high-risk patients to prevent sudden cardiac death.</li>
<li><strong>Septal reduction therapy:</strong> For severe obstruction refractory to medical therapy.</li>
</ul>`,
      topicSlug: 'cardiomyopathies',
    },

    {
      title: 'Takotsubo Cardiomyopathy',
      slug: 'takotsubo-cardiomyopathy',
      content: `<h2>Definition & Epidemiology</h2>
<p>Takotsubo cardiomyopathy (TCM), also known as stress cardiomyopathy or "broken heart syndrome," is a temporary heart condition that mimics a heart attack. It primarily affects postmenopausal women and is often triggered by intense emotional or physical stress.</p>

<h2>Pathophysiology</h2>
<p>The exact mechanism is unclear, but the leading theory involves catecholamine-mediated cardiotoxicity. Excessive release of stress hormones leads to temporary stunning of the myocardium, particularly affecting the left ventricular apex.</p>

<h2>Clinical Presentation</h2>
<ul>
<li><strong>Acute chest pain:</strong> Similar to myocardial infarction</li>
<li><strong>Dyspnea:</strong> Shortness of breath</li>
<li><strong>Emotional or physical stressor:</strong> Recent intense stress preceding symptoms</li>
<li><strong>Demographics:</strong> Predominantly postmenopausal women</li>
</ul>

<h2>Diagnostic Criteria</h2>
<ul>
<li>Transient hypokinesis or akinesis of left ventricular segments</li>
<li>Absence of obstructive coronary artery disease</li>
<li>New ECG abnormalities or modest elevation of cardiac troponin</li>
<li>Absence of pheochromocytoma or myocarditis</li>
</ul>

<h2>Treatment</h2>
<ul>
<li><strong>Supportive care:</strong> Most patients recover completely within days to weeks</li>
<li><strong>ACE inhibitors/ARBs:</strong> For heart failure symptoms</li>
<li><strong>Beta-blockers:</strong> Use cautiously as they may worsen acute phase</li>
<li><strong>Anticoagulation:</strong> Consider if severe dysfunction with risk of thromboembolism</li>
</ul>`,
      topicSlug: 'cardiomyopathies',
    },

    // Coronary Artery Disease Subtopics
    {
      title: 'ST-Elevation Myocardial Infarction (STEMI)',
      slug: 'stemi',
      content: `<h2>Definition</h2>
<p>STEMI is an acute coronary syndrome caused by complete occlusion of a coronary artery, resulting in transmural myocardial necrosis. It represents a true medical emergency requiring immediate reperfusion therapy.</p>

<h2>Pathophysiology</h2>
<p>STEMI occurs when an atherosclerotic plaque ruptures, leading to thrombosis and complete occlusion of a coronary artery. This results in transmural ischemia and necrosis of the myocardium supplied by that vessel.</p>

<h2>Clinical Presentation</h2>
<ul>
<li><strong>Chest pain:</strong> Severe, crushing, substernal pain lasting >20 minutes</li>
<li><strong>Associated symptoms:</strong> Nausea, vomiting, diaphoresis, dyspnea</li>
<li><strong>Radiation:</strong> Pain may radiate to left arm, jaw, or back</li>
</ul>

<h2>ECG Findings</h2>
<ul>
<li><strong>ST elevation:</strong> ≥1mm in two contiguous leads</li>
<li><strong>Reciprocal changes:</strong> ST depression in opposite leads</li>
<li><strong>Q waves:</strong> Develop later, indicating established MI</li>
</ul>

<h2>Management</h2>
<ul>
<li><strong>Primary PCI:</strong> Preferred reperfusion strategy if available within 90 minutes</li>
<li><strong>Fibrinolytic therapy:</strong> If PCI not available within 120 minutes</li>
<li><strong>Dual antiplatelet therapy:</strong> Aspirin + P2Y12 inhibitor</li>
<li><strong>Anticoagulation:</strong> Heparin or alternative anticoagulant</li>
<li><strong>Beta-blockers, ACE inhibitors, statins:</strong> Post-MI care</li>
</ul>`,
      topicSlug: 'coronary-artery-disease',
    },

    // Asthma Subtopic
    {
      title: 'Asthma Diagnosis and Management',
      slug: 'asthma-diagnosis-management',
      content: `<h2>Definition</h2>
<p>Asthma is a chronic inflammatory disease of the airways characterized by variable and recurring symptoms, reversible airflow obstruction, and bronchospasm.</p>

<h2>Pathophysiology</h2>
<p>Asthma involves chronic airway inflammation leading to increased airway reactivity, mucus production, and smooth muscle contraction. This results in variable airway obstruction.</p>

<h2>Clinical Presentation</h2>
<ul>
<li><strong>Wheezing:</strong> High-pitched whistling sound, especially on expiration</li>
<li><strong>Dyspnea:</strong> Shortness of breath, particularly with exertion</li>
<li><strong>Chest tightness:</strong> Feeling of constriction in the chest</li>
<li><strong>Cough:</strong> Often dry, worse at night or early morning</li>
</ul>

<h2>Triggers</h2>
<ul>
<li>Allergens (dust mites, pollen, pet dander)</li>
<li>Respiratory infections</li>
<li>Exercise</li>
<li>Cold air</li>
<li>Stress</li>
<li>Certain medications (aspirin, beta-blockers)</li>
</ul>

<h2>Diagnostic Testing</h2>
<ul>
<li><strong>Spirometry:</strong> Shows reversible airway obstruction (>12% improvement in FEV1 after bronchodilator)</li>
<li><strong>Peak flow monitoring:</strong> Helps assess control and detect exacerbations</li>
<li><strong>Fractional exhaled nitric oxide (FeNO):</strong> Measures airway inflammation</li>
</ul>

<h2>Treatment</h2>
<h3>Quick-Relief Medications</h3>
<ul>
<li><strong>Short-acting beta-agonists (SABA):</strong> Albuterol for acute symptoms</li>
</ul>

<h3>Long-Term Control Medications</h3>
<ul>
<li><strong>Inhaled corticosteroids (ICS):</strong> First-line controller therapy</li>
<li><strong>Long-acting beta-agonists (LABA):</strong> Added to ICS for better control</li>
<li><strong>Leukotriene modifiers:</strong> Alternative controller option</li>
</ul>`,
      topicSlug: 'asthma-copd',
    },

    // Peptic Ulcer Disease Subtopic
    {
      title: 'Peptic Ulcer Disease Management',
      slug: 'peptic-ulcer-management',
      content: `<h2>Definition</h2>
<p>Peptic ulcer disease (PUD) refers to painful sores or ulcers in the lining of the stomach (gastric ulcers) or the first part of the small intestine (duodenal ulcers).</p>

<h2>Pathophysiology</h2>
<p>PUD results from an imbalance between aggressive factors (acid, pepsin, H. pylori, NSAIDs) and protective factors (mucus, bicarbonate, prostaglandins, mucosal blood flow).</p>

<h2>Etiology</h2>
<ul>
<li><strong>H. pylori infection:</strong> Most common cause of duodenal ulcers (95%) and gastric ulcers (70%)</li>
<li><strong>NSAIDs:</strong> Second most common cause, especially gastric ulcers</li>
<li><strong>Zollinger-Ellison syndrome:</strong> Rare cause due to gastrinoma</li>
<li><strong>Other factors:</strong> Smoking, alcohol, stress, certain medications</li>
</ul>

<h2>Clinical Presentation</h2>
<ul>
<li><strong>Epigastric pain:</strong> Burning or gnawing sensation</li>
<li><strong>Duodenal ulcers:</strong> Pain 2-3 hours after meals, relieved by food or antacids</li>
<li><strong>Gastric ulcers:</strong> Pain may worsen with food</li>
<li><strong>Other symptoms:</strong> Nausea, vomiting, bloating, early satiety</li>
</ul>

<h2>Complications</h2>
<ul>
<li><strong>Bleeding:</strong> Most common complication (hematemesis, melena)</li>
<li><strong>Perforation:</strong> Medical emergency with acute abdominal pain</li>
<li><strong>Gastric outlet obstruction:</strong> Due to scarring from chronic ulcers</li>
<li><strong>Malignancy:</strong> Risk with gastric ulcers (requires endoscopic follow-up)</li>
</ul>

<h2>Diagnostic Testing</h2>
<ul>
<li><strong>Upper endoscopy:</strong> Gold standard for diagnosis and therapeutic intervention</li>
<li><strong>H. pylori testing:</strong> Stool antigen, urea breath test, or endoscopic biopsy</li>
<li><strong>Upper GI series:</strong> Less sensitive but may be used when endoscopy contraindicated</li>
</ul>

<h2>Treatment</h2>
<h3>H. pylori Eradication (if positive)</h3>
<ul>
<li><strong>Triple therapy:</strong> PPI + amoxicillin + clarithromycin for 14 days</li>
<li><strong>Quadruple therapy:</strong> PPI + bismuth + metronidazole + tetracycline for 14 days</li>
</ul>

<h3>Acid Suppression</h3>
<ul>
<li><strong>Proton pump inhibitors (PPIs):</strong> First-line therapy</li>
<li><strong>H2 receptor antagonists:</strong> Alternative option</li>
</ul>

<h3>Lifestyle Modifications</h3>
<ul>
<li>Discontinue NSAIDs if possible</li>
<li>Avoid alcohol and smoking</li>
<li>Stress management</li>
</ul>`,
      topicSlug: 'peptic-ulcer-disease',
    },
  ],

  cards: [
    // Dilated Cardiomyopathy Cards
    {
      question_text:
        '<p>A 45-year-old man presents with progressive shortness of breath and fatigue over 6 months. Echocardiogram shows left ventricular dilation with ejection fraction of 25%. Coronary angiography reveals normal coronary arteries. What is the most likely diagnosis?</p>',
      scenario:
        '<p>Patient has no history of hypertension, valvular disease, or substance abuse. Family history is significant for sudden cardiac death in father at age 50.</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Ischemic cardiomyopathy',
        B: 'Dilated cardiomyopathy',
        C: 'Hypertrophic cardiomyopathy',
        D: 'Restrictive cardiomyopathy',
      },
      correct_answer: 'B',
      explanation:
        '<p>This patient presents with classic features of dilated cardiomyopathy (DCM): progressive heart failure symptoms, left ventricular dilation with reduced ejection fraction, and normal coronary arteries ruling out ischemic cardiomyopathy. The family history of sudden cardiac death suggests a possible genetic component common in DCM.</p>',
      slug: 'dcm-case-1',
      topicSlug: 'cardiomyopathies',
    },

    {
      question_text:
        '<p>What is the gold standard diagnostic test for dilated cardiomyopathy?</p>',
      card_type: 'fill-in-blank',
      correct_answer: 'Echocardiography',
      explanation:
        '<p>Echocardiography is the gold standard for diagnosing dilated cardiomyopathy as it can reveal left ventricular dilation and reduced ejection fraction, which are the hallmark features of this condition.</p>',
      slug: 'dcm-diagnostic-test',
      topicSlug: 'cardiomyopathies',
    },

    // Takotsubo Cardiomyopathy Cards
    {
      question_text:
        "<p>A 65-year-old woman develops severe chest pain 2 hours after receiving news of her husband's death. ECG shows ST elevations in leads I, aVL, V2-V6, but coronary angiography reveals normal coronary arteries. What is the most likely diagnosis?</p>",
      card_type: 'clinical-vignette',
      options: {
        A: 'STEMI',
        B: 'Takotsubo cardiomyopathy',
        C: 'Pericarditis',
        D: 'Aortic dissection',
      },
      correct_answer: 'B',
      explanation:
        '<p>Takotsubo cardiomyopathy (stress cardiomyopathy) classically presents in elderly women following severe emotional stress. The combination of ST elevations with normal coronary arteries in this clinical context is pathognomonic for Takotsubo cardiomyopathy.</p>',
      slug: 'takotsubo-case-1',
      topicSlug: 'cardiomyopathies',
    },

    // Hypertrophic Cardiomyopathy Cards
    {
      question_text:
        '<p>A 20-year-old athlete presents with exertional dyspnea and chest pain. Physical exam reveals a harsh systolic murmur at the left sternal border that increases with Valsalva maneuver. What is the most likely diagnosis?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Aortic stenosis',
        B: 'Mitral regurgitation',
        C: 'Hypertrophic cardiomyopathy',
        D: 'Ventricular septal defect',
      },
      correct_answer: 'C',
      explanation:
        '<p>Hypertrophic cardiomyopathy typically presents with a harsh systolic murmur that increases with decreased preload (Valsalva maneuver, standing) and decreases with increased preload (squatting, leg raise). This is due to dynamic left ventricular outflow tract obstruction.</p>',
      slug: 'hcm-case-1',
      topicSlug: 'cardiomyopathies',
    },

    // STEMI Cards
    {
      question_text:
        '<p>A 55-year-old man presents with severe crushing chest pain for 45 minutes. ECG shows ST elevations in leads II, III, and aVF with reciprocal depressions in I and aVL. Which coronary artery is most likely occluded?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Left anterior descending (LAD)',
        B: 'Left circumflex (LCX)',
        C: 'Right coronary artery (RCA)',
        D: 'Left main coronary artery',
      },
      correct_answer: 'C',
      explanation:
        '<p>ST elevations in the inferior leads (II, III, aVF) with reciprocal changes in the lateral leads (I, aVL) indicate an inferior wall MI, which is typically caused by occlusion of the right coronary artery (RCA).</p>',
      slug: 'stemi-inferior-mi',
      topicSlug: 'coronary-artery-disease',
    },

    {
      question_text:
        '<p>What is the preferred reperfusion strategy for STEMI if a cardiac catheterization lab is available within 90 minutes?</p>',
      card_type: 'fill-in-blank',
      correct_answer: 'Primary PCI',
      explanation:
        '<p>Primary percutaneous coronary intervention (PCI) is the preferred reperfusion strategy for STEMI when it can be performed within 90 minutes of first medical contact, as it provides superior outcomes compared to fibrinolytic therapy.</p>',
      slug: 'stemi-reperfusion-strategy',
      topicSlug: 'coronary-artery-disease',
    },

    // Asthma Cards
    {
      question_text:
        '<p>A 25-year-old woman presents with recurrent episodes of wheezing, chest tightness, and cough that worsen at night. Spirometry shows FEV1 improvement of 15% after bronchodilator administration. What is the most likely diagnosis?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'COPD',
        B: 'Asthma',
        C: 'Pneumonia',
        D: 'Pulmonary embolism',
      },
      correct_answer: 'B',
      explanation:
        '<p>Asthma is characterized by reversible airway obstruction. The spirometry finding of >12% improvement in FEV1 after bronchodilator administration confirms the diagnosis of asthma. The young age and episodic nature also support this diagnosis.</p>',
      slug: 'asthma-diagnosis-case',
      topicSlug: 'asthma-copd',
    },

    {
      question_text:
        '<p>What is the first-line long-term controller medication for persistent asthma?</p>',
      card_type: 'fill-in-blank',
      correct_answer: 'Inhaled corticosteroids',
      explanation:
        '<p>Inhaled corticosteroids (ICS) are the first-line controller therapy for persistent asthma as they effectively reduce airway inflammation, which is the underlying pathophysiology of asthma.</p>',
      slug: 'asthma-controller-therapy',
      topicSlug: 'asthma-copd',
    },

    {
      question_text:
        '<p>A patient with asthma experiences acute worsening of symptoms with severe dyspnea and wheezing. What is the most appropriate immediate treatment?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Inhaled corticosteroids',
        B: 'Short-acting beta-agonist (albuterol)',
        C: 'Long-acting beta-agonist',
        D: 'Leukotriene modifier',
      },
      correct_answer: 'B',
      explanation:
        '<p>Short-acting beta-agonists (SABA) like albuterol are the first-line treatment for acute asthma exacerbations. They provide rapid bronchodilation and symptom relief within minutes.</p>',
      slug: 'asthma-acute-treatment',
      topicSlug: 'asthma-copd',
    },

    // Peptic Ulcer Disease Cards
    {
      question_text:
        '<p>A 40-year-old man presents with burning epigastric pain that occurs 2-3 hours after meals and is relieved by food or antacids. He also experiences nocturnal awakening due to pain. What is the most likely diagnosis?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Gastric ulcer',
        B: 'Duodenal ulcer',
        C: 'GERD',
        D: 'Gastritis',
      },
      correct_answer: 'B',
      explanation:
        '<p>Duodenal ulcers typically present with epigastric pain that occurs 2-3 hours after meals when the stomach is empty, and the pain is often relieved by food or antacids. Nocturnal pain is also characteristic of duodenal ulcers.</p>',
      slug: 'duodenal-ulcer-case',
      topicSlug: 'peptic-ulcer-disease',
    },

    {
      question_text: '<p>What is the most common cause of duodenal ulcers?</p>',
      card_type: 'fill-in-blank',
      correct_answer: 'H. pylori infection',
      explanation:
        '<p>Helicobacter pylori infection is the most common cause of duodenal ulcers, found in approximately 95% of duodenal ulcer cases. It causes chronic gastritis and disrupts the protective mucosal barrier.</p>',
      slug: 'duodenal-ulcer-etiology',
      topicSlug: 'peptic-ulcer-disease',
    },

    {
      question_text:
        '<p>A patient with confirmed H. pylori-positive peptic ulcer disease requires eradication therapy. What is the recommended first-line treatment?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'PPI alone for 8 weeks',
        B: 'PPI + amoxicillin + clarithromycin for 14 days',
        C: 'H2 blocker + antibiotics for 7 days',
        D: 'Bismuth subsalicylate alone',
      },
      correct_answer: 'B',
      explanation:
        '<p>Triple therapy consisting of a proton pump inhibitor (PPI) plus amoxicillin and clarithromycin for 14 days is the recommended first-line treatment for H. pylori eradication in areas with low clarithromycin resistance.</p>',
      slug: 'h-pylori-treatment',
      topicSlug: 'peptic-ulcer-disease',
    },

    // Heart Failure Cards
    {
      question_text:
        '<p>A 68-year-old man with a history of hypertension presents with progressive dyspnea, orthopnea, and bilateral lower extremity edema. Echocardiogram shows ejection fraction of 35%. What type of heart failure does this represent?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Heart failure with preserved ejection fraction (HFpEF)',
        B: 'Heart failure with reduced ejection fraction (HFrEF)',
        C: 'High-output heart failure',
        D: 'Right heart failure',
      },
      correct_answer: 'B',
      explanation:
        "<p>Heart failure with reduced ejection fraction (HFrEF) is defined as heart failure with an ejection fraction ≤40%. This patient's EF of 35% places him in this category, and the symptoms are classic for systolic heart failure.</p>",
      slug: 'hfref-diagnosis',
      topicSlug: 'heart-failure',
    },

    {
      question_text:
        '<p>What is the first-line medication class for treating heart failure with reduced ejection fraction?</p>',
      card_type: 'fill-in-blank',
      correct_answer: 'ACE inhibitors',
      explanation:
        '<p>ACE inhibitors are first-line therapy for HFrEF as they reduce mortality and improve symptoms by blocking the renin-angiotensin system, reducing afterload, and preventing ventricular remodeling.</p>',
      slug: 'hfref-first-line-treatment',
      topicSlug: 'heart-failure',
    },

    // Pneumonia Cards
    {
      question_text:
        '<p>A 35-year-old healthy adult presents with fever, productive cough with purulent sputum, and chest pain. Chest X-ray shows a right lower lobe infiltrate. What is the most likely pathogen?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Streptococcus pneumoniae',
        B: 'Haemophilus influenzae',
        C: 'Mycoplasma pneumoniae',
        D: 'Staphylococcus aureus',
      },
      correct_answer: 'A',
      explanation:
        '<p>Streptococcus pneumoniae is the most common cause of community-acquired pneumonia in healthy adults. The presentation with fever, purulent sputum, and lobar infiltrate is classic for pneumococcal pneumonia.</p>',
      slug: 'cap-typical-pathogen',
      topicSlug: 'pneumonia',
    },

    // Diabetes Cards
    {
      question_text:
        '<p>A 45-year-old obese man presents with polyuria, polydipsia, and fatigue. Random plasma glucose is 285 mg/dL. HbA1c is 9.2%. What is the most likely diagnosis?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Type 1 diabetes mellitus',
        B: 'Type 2 diabetes mellitus',
        C: 'Gestational diabetes',
        D: 'Diabetes insipidus',
      },
      correct_answer: 'B',
      explanation:
        "<p>Type 2 diabetes mellitus is most likely given the patient's age, obesity, and gradual onset of symptoms. The high HbA1c and random glucose confirm the diagnosis of diabetes mellitus.</p>",
      slug: 'type2-diabetes-diagnosis',
      topicSlug: 'diabetes-mellitus',
    },

    {
      question_text:
        '<p>What is the target HbA1c level for most adults with diabetes mellitus?</p>',
      card_type: 'fill-in-blank',
      correct_answer: 'Less than 7%',
      explanation:
        '<p>The American Diabetes Association recommends an HbA1c target of less than 7% for most adults with diabetes to reduce the risk of microvascular and macrovascular complications.</p>',
      slug: 'diabetes-hba1c-target',
      topicSlug: 'diabetes-mellitus',
    },

    // Thyroid Disorder Cards
    {
      question_text:
        '<p>A 32-year-old woman presents with weight loss, heat intolerance, palpitations, and tremor. Physical exam reveals warm, moist skin and a diffusely enlarged thyroid with a bruit. What is the most likely diagnosis?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: "Graves' disease",
        B: 'Toxic multinodular goiter',
        C: "Hashimoto's thyroiditis",
        D: 'Thyroid cancer',
      },
      correct_answer: 'A',
      explanation:
        "<p>Graves' disease is the most common cause of hyperthyroidism and typically presents with a diffusely enlarged thyroid gland with a bruit, along with classic hyperthyroid symptoms. The presence of a bruit suggests increased vascularity characteristic of Graves' disease.</p>",
      slug: 'graves-disease-diagnosis',
      topicSlug: 'thyroid-disorders',
    },

    // Pulmonary Embolism Cards
    {
      question_text:
        '<p>A 28-year-old woman on oral contraceptives presents with sudden onset chest pain and dyspnea after a long flight. D-dimer is elevated. What is the most appropriate next step?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Chest X-ray',
        B: 'ECG',
        C: 'CT pulmonary angiogram (CTPA)',
        D: 'Echocardiogram',
      },
      correct_answer: 'C',
      explanation:
        '<p>Given the high clinical suspicion for pulmonary embolism (young woman on OCPs with acute chest pain and dyspnea after prolonged immobilization), CT pulmonary angiogram is the most appropriate diagnostic test to confirm or rule out PE.</p>',
      slug: 'pe-diagnosis-ctpa',
      topicSlug: 'pulmonary-embolism',
    },

    // Fractures Cards
    {
      question_text:
        '<p>An elderly woman falls and presents with severe hip pain and inability to bear weight. Physical exam shows external rotation and shortening of the affected leg. What is the most likely diagnosis?</p>',
      card_type: 'clinical-vignette',
      options: {
        A: 'Hip dislocation',
        B: 'Femoral neck fracture',
        C: 'Trochanteric fracture',
        D: 'Pelvic fracture',
      },
      correct_answer: 'B',
      explanation:
        '<p>Femoral neck fractures typically present with external rotation and shortening of the affected leg after a fall in elderly patients. This is a common osteoporotic fracture requiring urgent orthopedic consultation.</p>',
      slug: 'femoral-neck-fracture',
      topicSlug: 'fractures-trauma',
    },
  ],
};

// Helper functions with comprehensive error handling
async function clearExistingData() {
  console.log('🗑️ Clearing existing data...');

  try {
    const collections = ['cards', 'subtopics', 'topics', 'systems'];

    for (const collection of collections) {
      try {
        const response = await strapi.get(
          `/${collection}?pagination[limit]=100`
        );
        const items = response.data.data;

        if (items.length > 0) {
          console.log(`Found ${items.length} existing ${collection} items`);

          for (const item of items) {
            try {
              await strapi.delete(
                `/${collection}/${item.documentId || item.id}`
              );
            } catch (deleteError) {
              console.warn(
                `⚠️ Could not delete ${collection} item ${item.id}:`,
                deleteError.response?.data?.error?.message ||
                  deleteError.message
              );
            }
          }
          console.log(`✅ Cleared ${items.length} items from ${collection}`);
        } else {
          console.log(`✅ No existing ${collection} items to clear`);
        }
      } catch (error) {
        console.warn(
          `⚠️ Could not clear ${collection}:`,
          error.response?.data?.error?.message || error.message
        );
      }
    }
  } catch (error) {
    console.warn('⚠️ Error during cleanup:', error.message);
  }
}

async function createSystems() {
  console.log('🏥 Creating systems...');
  const createdSystems = {};

  for (const systemData of seedData.systems) {
    try {
      const response = await strapi.post('/systems', {
        data: systemData,
      });
      createdSystems[systemData.slug] = response.data.data.id;
      console.log(
        `✅ Created system: ${systemData.name} (ID: ${response.data.data.id})`
      );
    } catch (error) {
      console.error(
        `❌ Error creating system ${systemData.name}:`,
        error.response?.data?.error?.message || error.message
      );
    }
  }

  return createdSystems;
}

async function createTopics(systemIds) {
  console.log('📚 Creating topics...');
  const createdTopics = {};

  for (const topicData of seedData.topics) {
    try {
      const systemId = systemIds[topicData.systemSlug];
      if (!systemId) {
        console.error(
          `❌ System not found for slug: ${topicData.systemSlug} (Topic: ${topicData.name})`
        );
        continue;
      }

      const { systemSlug, ...topicPayload } = topicData;
      topicPayload.system = systemId;

      const response = await strapi.post('/topics', {
        data: topicPayload,
      });
      createdTopics[topicData.slug] = response.data.data.id;
      console.log(
        `✅ Created topic: ${topicData.name} (ID: ${response.data.data.id})`
      );
    } catch (error) {
      console.error(
        `❌ Error creating topic ${topicData.name}:`,
        error.response?.data?.error?.message || error.message
      );
    }
  }

  return createdTopics;
}

async function createSubtopics(topicIds) {
  console.log('📝 Creating subtopics...');
  const createdSubtopics = {};

  for (const subtopicData of seedData.subtopics) {
    try {
      const topicId = topicIds[subtopicData.topicSlug];
      if (!topicId) {
        console.error(
          `❌ Topic not found for slug: ${subtopicData.topicSlug} (Subtopic: ${subtopicData.title})`
        );
        continue;
      }

      const { topicSlug, ...subtopicPayload } = subtopicData;
      subtopicPayload.topic = topicId;

      const response = await strapi.post('/subtopics', {
        data: subtopicPayload,
      });
      createdSubtopics[subtopicData.slug] = response.data.data.id;
      console.log(
        `✅ Created subtopic: ${subtopicData.title} (ID: ${response.data.data.id})`
      );
    } catch (error) {
      console.error(
        `❌ Error creating subtopic ${subtopicData.title}:`,
        error.response?.data?.error?.message || error.message
      );
    }
  }

  return createdSubtopics;
}

async function createCards(topicIds) {
  console.log('🃏 Creating cards...');
  const createdCards = {};

  for (const cardData of seedData.cards) {
    try {
      const topicId = topicIds[cardData.topicSlug];
      if (!topicId) {
        console.error(
          `❌ Topic not found for slug: ${cardData.topicSlug} (Card: ${cardData.slug})`
        );
        continue;
      }

      const { topicSlug, ...cardPayload } = cardData;
      cardPayload.topic = topicId;

      const response = await strapi.post('/cards', {
        data: cardPayload,
      });
      createdCards[cardData.slug] = response.data.data.id;
      console.log(
        `✅ Created card: ${cardData.slug} (ID: ${response.data.data.id})`
      );
    } catch (error) {
      console.error(
        `❌ Error creating card ${cardData.slug}:`,
        error.response?.data?.error?.message || error.message
      );
    }
  }

  return createdCards;
}

// Main seed function
async function seed() {
  try {
    console.log('🌱 Starting comprehensive seed process...');
    console.log(`📡 Strapi URL: ${STRAPI_URL}`);

    // Test connection first
    try {
      await strapi.get('/systems?pagination[limit]=1');
      console.log('✅ Connected to Strapi successfully');
    } catch (error) {
      console.error(
        '❌ Failed to connect to Strapi:',
        error.response?.data?.error?.message || error.message
      );
      process.exit(1);
    }

    // Clear existing data
    await clearExistingData();

    // Create data in dependency order
    const systemIds = await createSystems();
    const topicIds = await createTopics(systemIds);
    const subtopicIds = await createSubtopics(topicIds);
    const cardIds = await createCards(topicIds);

    console.log('\n🎉 Seed process completed successfully!');
    console.log('\n📊 Final Summary:');
    console.log(
      `- Systems: ${Object.keys(systemIds).length}/${seedData.systems.length}`
    );
    console.log(
      `- Topics: ${Object.keys(topicIds).length}/${seedData.topics.length}`
    );
    console.log(
      `- Subtopics: ${Object.keys(subtopicIds).length}/${
        seedData.subtopics.length
      }`
    );
    console.log(
      `- Cards: ${Object.keys(cardIds).length}/${seedData.cards.length}`
    );

    console.log('\n🔗 You can now access your data at:');
    console.log(`- Admin panel: ${STRAPI_URL}/admin`);
    console.log(`- API endpoints: ${STRAPI_URL}/api/[collection-name]`);
  } catch (error) {
    console.error(
      '❌ Seed process failed:',
      error.response?.data?.error?.message || error.message
    );
    process.exit(1);
  }
}

// Run the seed
if (require.main === module) {
  seed();
}

module.exports = { seed };
