// seed-cards.js
const axios = require('axios');
const dotenv = require('dotenv');
const slugify = require('slugify');

// Load environment variables
dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('STRAPI_TOKEN is not defined in your environment variables.');
  process.exit(1);
}

// Card data mapped by topic title - CORRECTED topic_name values
const cardsData = [
  // --- Cardiovascular System ---
  {
    question_text: 'What is the primary difference between HFrEF and HFpEF?',
    scenario:
      'A 68-year-old woman presents with exertional dyspnea, orthopnea, and lower extremity edema. Her echocardiogram shows a preserved left ventricular ejection fraction (60%).',
    card_type: 'clinical-vignette',
    options: {
      a: 'HFrEF has reduced ejection fraction; HFpEF has preserved ejection fraction',
      b: 'HFrEF primarily affects younger patients; HFpEF affects older patients',
      c: 'HFrEF responds to diuretics; HFpEF does not',
      d: 'HFrEF shows ventricular dilation; HFpEF shows normal ventricular size',
    },
    correct_answer: 'a',
    explanation:
      'Heart failure is classified as heart failure with reduced ejection fraction (HFrEF) when EF is ≤40%, and heart failure with preserved ejection fraction (HFpEF) when EF is ≥50%. Both types can present with similar symptoms of fluid overload, but the underlying pathophysiology differs.',
    topic_name: 'Heart Failure', // Matches topicsData
  },
  {
    question_text:
      'Which of the following is a characteristic ECG finding in acute ST-elevation myocardial infarction (STEMI)?',
    scenario:
      'A 55-year-old man with a history of hypertension and smoking presents to the emergency department with crushing chest pain radiating to the left arm and jaw for the past hour.',
    card_type: 'clinical-vignette',
    options: {
      a: 'ST-segment depression in contiguous leads',
      b: 'ST-segment elevation of ≥1 mm in two or more contiguous leads',
      c: 'T-wave inversion only',
      d: 'Left bundle branch block that was present on previous ECGs',
    },
    correct_answer: 'b',
    explanation:
      'The diagnostic criteria for STEMI include ST-segment elevation of ≥1 mm in two or more contiguous leads (except in V2-V3 where it should be ≥2 mm in men and ≥1.5 mm in women).',
    topic_name: 'Coronary Artery Disease', // Matches topicsData
  },
  {
    question_text:
      'What is the classic auscultatory finding in severe Aortic Stenosis?',
    scenario:
      'An 80-year-old patient presents with exertional dyspnea, angina, and syncope.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Holosystolic murmur at the apex radiating to the axilla',
      b: 'Late-systolic click followed by a murmur',
      c: 'Harsh crescendo-decrescendo systolic murmur at the right upper sternal border',
      d: 'Diastolic rumble at the apex',
    },
    correct_answer: 'c',
    explanation:
      'Severe aortic stenosis is characterized by a harsh, crescendo-decrescendo systolic murmur best heard at the right upper sternal border, often radiating to the carotids.',
    topic_name: 'Valvular Heart Disease', // Matches topicsData
  },

  // --- Pulmonary System ---
  {
    question_text:
      'What is the cornerstone of long-term controller therapy for persistent asthma?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Short-acting beta-agonists (SABA)',
      b: 'Inhaled corticosteroids (ICS)',
      c: 'Oral corticosteroids',
      d: 'Leukotriene receptor antagonists',
    },
    correct_answer: 'b',
    explanation:
      'Inhaled corticosteroids (ICS) are the most effective long-term controller medications for persistent asthma, reducing airway inflammation, symptoms, and risk of exacerbations.',
    topic_name: 'Asthma', // Matches topicsData
  },
  {
    question_text:
      'Which spirometry finding confirms persistent airflow limitation in COPD?',
    scenario:
      'A 62-year-old man with a 40 pack-year smoking history presents with progressive dyspnea on exertion and chronic cough.',
    card_type: 'clinical-vignette',
    options: {
      a: 'FEV1 > 80% predicted',
      b: 'FVC significantly reduced',
      c: 'Post-bronchodilator FEV1/FVC < 0.7',
      d: 'Significant FEV1 reversibility after bronchodilator',
    },
    correct_answer: 'c',
    explanation:
      'The diagnosis of COPD requires spirometry demonstrating a post-bronchodilator FEV1/FVC ratio of less than 0.7, confirming persistent airflow limitation.',
    topic_name: 'Chronic Obstructive Pulmonary Disease', // Matches topicsData
  },
  {
    question_text:
      'What is the most likely diagnosis in a patient presenting with sudden onset pleuritic chest pain, dyspnea, and tachycardia, especially after recent surgery?',
    scenario:
      'A 65-year-old woman develops acute shortness of breath and sharp right-sided chest pain 3 days after undergoing hip replacement surgery.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Pneumonia',
      b: 'Pulmonary Embolism',
      c: 'Acute Myocardial Infarction',
      d: 'Pneumothorax',
    },
    correct_answer: 'b',
    explanation:
      'The clinical presentation in the setting of recent surgery (a major risk factor for VTE) strongly suggests pulmonary embolism (PE).',
    topic_name: 'Pulmonary Embolism', // Matches topicsData
  },

  // --- Gastrointestinal System/Nutrition ---
  {
    question_text:
      'Which pattern of gastrointestinal inflammation features skip lesions and can affect any part of the GI tract from mouth to anus?',
    scenario:
      'Endoscopy reveals inflammation affecting the terminal ileum and ascending colon, with areas of normal mucosa in between.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Ulcerative Colitis',
      b: 'Microscopic Colitis',
      c: "Crohn's Disease",
      d: 'Ischemic Colitis',
    },
    correct_answer: 'c',
    explanation:
      "Crohn's disease is characterized by skip lesions (areas of inflammation interspersed with normal mucosa) and can affect any part of the GI tract transmurally.",
    topic_name: 'Inflammatory Bowel Disease', // Matches topicsData
  },
  {
    question_text:
      'What are the two main causes of Peptic Ulcer Disease (PUD)?',
    scenario:
      'A patient presents with epigastric pain. History reveals regular NSAID use.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Alcohol and stress',
      b: 'H. pylori infection and NSAID use',
      c: 'Spicy foods and caffeine',
      d: 'Viral infection and smoking',
    },
    correct_answer: 'b',
    explanation:
      'The vast majority of peptic ulcers are caused by either infection with Helicobacter pylori bacteria or the use of nonsteroidal anti-inflammatory drugs (NSAIDs).',
    topic_name: 'Peptic Ulcer Disease', // Matches topicsData
  },
  {
    question_text:
      'Which complication of cirrhosis involves fluid accumulation in the peritoneal cavity?',
    scenario:
      'A patient with known cirrhosis presents with increasing abdominal distension and shifting dullness on percussion.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Hepatic Encephalopathy',
      b: 'Variceal Bleeding',
      c: 'Ascites',
      d: 'Hepatocellular Carcinoma',
    },
    correct_answer: 'c',
    explanation:
      'Ascites, the accumulation of fluid in the peritoneal cavity, is a common complication of advanced liver cirrhosis due to portal hypertension and hypoalbuminemia.',
    topic_name: 'Liver Cirrhosis', // Matches topicsData
  },

  // --- Musculoskeletal System ---
  {
    question_text: 'Which joint is most commonly affected by osteoarthritis?',
    scenario:
      'A 70-year-old woman complains of progressive pain and stiffness in her joints, worse with activity and relieved by rest.',
    card_type: 'clinical-vignette',
    options: { a: 'Wrist', b: 'Knee', c: 'Elbow', d: 'Ankle' },
    correct_answer: 'b',
    explanation:
      'Osteoarthritis (OA) commonly affects weight-bearing joints. The knee is the most frequently affected joint, followed by the hip and hands.',
    topic_name: 'Osteoarthritis', // Matches topicsData
  },
  {
    question_text:
      'Which laboratory finding is most specific for Rheumatoid Arthritis?',
    scenario:
      'A 40-year-old woman presents with symmetric polyarthritis and morning stiffness.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Elevated CRP',
      b: 'Positive ANA',
      c: 'Positive RF',
      d: 'Positive ACPA (anti-CCP)',
    },
    correct_answer: 'd',
    explanation:
      'Anti-citrullinated protein antibodies (ACPA), also known as anti-CCP antibodies, are highly specific (>95%) for rheumatoid arthritis.',
    topic_name: 'Rheumatoid Arthritis', // Matches topicsData
  },
  {
    question_text:
      "Which symptom constitutes a 'red flag' in the evaluation of low back pain, potentially indicating a serious underlying condition?",
    scenario: 'A 60-year-old man presents with new-onset low back pain.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Pain worse with movement',
      b: 'Pain radiating to the knee',
      c: 'Fever or unexplained weight loss',
      d: 'Pain duration of 2 weeks',
    },
    correct_answer: 'c',
    explanation:
      'Red flags suggesting serious pathology include fever, unexplained weight loss, history of cancer, night pain, saddle anesthesia, bowel/bladder incontinence, and progressive neurologic deficit.',
    topic_name: 'Low Back Pain', // Matches topicsData
  },

  // --- Neurologic System ---
  {
    question_text:
      'What is the time window for intravenous thrombolysis (rtPA) in eligible patients with acute ischemic stroke?',
    scenario:
      'A 72-year-old man presents with sudden onset right-sided weakness and slurred speech that began 3 hours ago.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Within 1 hour',
      b: 'Within 4.5 hours',
      c: 'Within 6 hours',
      d: 'Within 24 hours',
    },
    correct_answer: 'b',
    explanation:
      'Intravenous rtPA is recommended within 3 hours of symptom onset for most eligible patients, and the window can be extended to 4.5 hours for selected patients meeting specific criteria.',
    topic_name: 'Stroke', // Matches topicsData
  },
  {
    question_text:
      'Which type of seizure involves both hemispheres of the brain from the onset and is characterized by sudden, brief lapses in awareness?',
    scenario:
      'A 7-year-old child experiences brief episodes of staring blankly for 10-15 seconds, after which they resume activity unaware.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Focal impaired awareness seizure',
      b: 'Absence seizure',
      c: 'Myoclonic seizure',
      d: 'Tonic-clonic seizure',
    },
    correct_answer: 'b',
    explanation:
      'Absence seizures are generalized seizures characterized by brief (~10-20 seconds) episodes of impaired awareness, often with staring and subtle motor automatisms.',
    topic_name: 'Seizure Disorders', // Matches topicsData
  },
  {
    question_text:
      'Which type of dementia often presents with early and prominent episodic memory impairment?',
    scenario:
      'An elderly patient has progressive difficulty recalling recent events and learning new information.',
    card_type: 'clinical-vignette',
    options: {
      a: "Alzheimer's Disease",
      b: 'Vascular Dementia',
      c: 'Frontotemporal Dementia',
      d: 'Lewy Body Dementia',
    },
    correct_answer: 'a',
    explanation:
      "Alzheimer's disease typically presents initially with impairment in episodic memory (recalling recent events), followed by progressive decline in other cognitive domains.",
    topic_name: 'Dementia', // Matches topicsData
  },

  // --- Psychiatry/Behavioral Science ---
  {
    question_text:
      'What is the first-line pharmacologic treatment class for most patients with moderate to severe Major Depressive Disorder?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Benzodiazepines',
      b: 'Antipsychotics',
      c: 'SSRIs or SNRIs',
      d: 'Mood stabilizers',
    },
    correct_answer: 'c',
    explanation:
      'Selective Serotonin Reuptake Inhibitors (SSRIs) or Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs) are generally considered first-line pharmacotherapy for MDD.',
    topic_name: 'Major Depressive Disorder', // Matches topicsData
  },
  {
    question_text:
      'Which condition is characterized by excessive worry about multiple topics, occurring more days than not for at least 6 months, along with physical symptoms like restlessness and fatigue?',
    scenario:
      'A patient reports constant, difficult-to-control worry about finances, health, and family, accompanied by muscle tension and trouble sleeping.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Panic Disorder',
      b: 'Social Anxiety Disorder',
      c: 'Generalized Anxiety Disorder',
      d: 'Obsessive-Compulsive Disorder',
    },
    correct_answer: 'c',
    explanation:
      'Generalized Anxiety Disorder (GAD) is defined by persistent, excessive, and difficult-to-control worry about various life domains, accompanied by at least three physical or cognitive symptoms.',
    topic_name: 'Anxiety Disorders', // Matches topicsData
  },
  {
    question_text:
      'What is the defining feature required for the diagnosis of Bipolar I Disorder?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'A major depressive episode',
      b: 'A hypomanic episode',
      c: 'A manic episode',
      d: 'Cyclothymia',
    },
    correct_answer: 'c',
    explanation:
      'The essential feature for diagnosing Bipolar I Disorder is the occurrence of at least one lifetime manic episode. Depressive episodes are common but not required.',
    topic_name: 'Bipolar Disorders', // Matches topicsData
  },

  // --- Infectious Diseases ---
  {
    question_text:
      'What is the most common bacterial cause of community-acquired pneumonia (CAP) in adults?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Haemophilus influenzae',
      b: 'Streptococcus pneumoniae',
      c: 'Mycoplasma pneumoniae',
      d: 'Staphylococcus aureus',
    },
    correct_answer: 'b',
    explanation:
      'Streptococcus pneumoniae remains the most frequently identified bacterial pathogen responsible for community-acquired pneumonia in adults worldwide.',
    topic_name: 'Pneumonia', // Matches topicsData
  },
  {
    question_text:
      'What is the most common organism causing uncomplicated urinary tract infections (UTIs) in women?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Klebsiella pneumoniae',
      b: 'Staphylococcus saprophyticus',
      c: 'Proteus mirabilis',
      d: 'Escherichia coli',
    },
    correct_answer: 'd',
    explanation:
      'Escherichia coli (E. coli) is responsible for the vast majority (80-90%) of uncomplicated urinary tract infections, particularly cystitis, in women.',
    topic_name: 'Urinary Tract Infections', // Matches topicsData
  },
  {
    question_text:
      'Which two bacterial STIs are most commonly screened for together using Nucleic Acid Amplification Tests (NAATs)?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Syphilis and Chancroid',
      b: 'Gonorrhea and Chlamydia',
      c: 'Herpes and HPV',
      d: 'BV and Trichomoniasis',
    },
    correct_answer: 'b',
    explanation:
      'Neisseria gonorrhoeae and Chlamydia trachomatis infections frequently occur together. Guidelines recommend testing for both simultaneously using NAATs.',
    topic_name: 'Sexually Transmitted Infections', // Matches topicsData
  },

  // --- Reproductive System ---
  {
    question_text:
      'Which contraceptive method is considered the most effective form of emergency contraception?',
    scenario:
      'A patient requires emergency contraception 4 days after unprotected intercourse.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Levonorgestrel pill',
      b: 'Ulipristal acetate pill',
      c: 'Yuzpe method',
      d: 'Copper Intrauterine Device (IUD)',
    },
    correct_answer: 'd',
    explanation:
      'The copper IUD is the most effective emergency contraception method (<0.1% failure rate), can be inserted up to 5 days after unprotected intercourse, and provides ongoing contraception.',
    topic_name: 'Contraception', // Matches topicsData
  },
  {
    question_text:
      'What is the most effective treatment for moderate to severe vasomotor symptoms (hot flashes) associated with menopause?',
    scenario:
      'A 52-year-old woman experiences frequent, bothersome hot flashes and night sweats 1 year after her LMP.',
    card_type: 'clinical-vignette',
    options: {
      a: 'SSRIs',
      b: 'Gabapentin',
      c: 'Systemic estrogen therapy',
      d: 'Black cohosh',
    },
    correct_answer: 'c',
    explanation:
      'Systemic hormone therapy (estrogen +/- progestogen) remains the most effective treatment for relieving moderate to severe vasomotor symptoms of menopause.',
    topic_name: 'Menopause', // Matches topicsData
  },
  {
    question_text:
      'According to the PALM-COEIN classification, which category includes uterine fibroids (leiomyomas) as a cause of abnormal uterine bleeding?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'PALM (Structural causes)',
      b: 'COEIN (Non-structural causes)',
    },
    correct_answer: 'a',
    explanation:
      'PALM represents structural causes: Polyp, Adenomyosis, Leiomyoma (fibroids), and Malignancy/hyperplasia.',
    topic_name: 'Abnormal Uterine Bleeding', // Matches topicsData
  },

  // --- Endocrine System ---
  {
    question_text:
      'Which medication is the preferred initial pharmacologic agent for most patients with type 2 diabetes?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Insulin',
      b: 'Sulfonylureas',
      c: 'Metformin',
      d: 'SGLT2 inhibitors',
    },
    correct_answer: 'c',
    explanation:
      'Metformin is recommended as first-line pharmacologic therapy for type 2 diabetes due to efficacy, safety, weight neutrality, and potential cardiovascular benefits.',
    topic_name: 'Diabetes Mellitus', // Matches topicsData
  },
  {
    question_text:
      'What is the most common cause of primary hypothyroidism in iodine-sufficient areas?',
    scenario:
      'Patient has fatigue, weight gain, cold intolerance, elevated TSH, low free T4, and positive anti-TPO antibodies.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Post-surgical',
      b: 'Medication-induced',
      c: "Hashimoto's thyroiditis",
      d: 'Central hypothyroidism',
    },
    correct_answer: 'c',
    explanation:
      "Hashimoto's thyroiditis (chronic autoimmune thyroiditis) is the most common cause of primary hypothyroidism in iodine-sufficient regions.",
    topic_name: 'Thyroid Disorders', // Matches topicsData
  },
  {
    question_text:
      'Which condition is characterized by autonomous aldosterone production leading to hypertension and potentially hypokalemia?',
    scenario: 'A patient presents with resistant hypertension and hypokalemia.',
    card_type: 'clinical-vignette',
    options: {
      a: "Cushing's syndrome",
      b: "Primary hyperaldosteronism (Conn's syndrome)",
      c: 'Pheochromocytoma',
      d: "Addison's disease",
    },
    correct_answer: 'b',
    explanation:
      'Primary hyperaldosteronism involves excessive aldosterone secretion independent of the renin-angiotensin system, causing sodium retention, potassium excretion, and hypertension.',
    topic_name: 'Adrenal Disorders', // Matches topicsData
  },

  // --- Eyes, Ears, Nose, and Throat ---
  {
    question_text:
      'Which diagnosis is suggested by acute onset of ear pain, fever, and a bulging, erythematous tympanic membrane on otoscopy?',
    scenario:
      'A 2-year-old child presents with ear pain and fever following a cold.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Otitis externa',
      b: 'Otitis media with effusion',
      c: 'Acute otitis media',
      d: 'Mastoiditis',
    },
    correct_answer: 'c',
    explanation:
      'Acute onset of symptoms with signs of middle ear effusion (bulging TM) and inflammation (erythema) meets the criteria for acute otitis media (AOM).',
    topic_name: 'Otitis Media', // Matches topicsData
  },
  {
    question_text:
      'What is the primary goal of treatment for primary open-angle glaucoma?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Reversing optic nerve damage',
      b: 'Lowering intraocular pressure',
      c: 'Improving central vision',
      d: 'Curing the condition',
    },
    correct_answer: 'b',
    explanation:
      'The primary goal of glaucoma treatment is to lower intraocular pressure (IOP) to prevent or slow further optic nerve damage and visual field loss.',
    topic_name: 'Glaucoma', // Matches topicsData
  },
  {
    question_text:
      'Which duration of symptoms is a key criterion for diagnosing acute bacterial rhinosinusitis (ABRS) over viral rhinosinusitis?',
    scenario:
      'A patient has had nasal congestion and purulent discharge for 12 days.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Less than 5 days',
      b: '5-7 days',
      c: 'More than 10 days without improvement',
      d: 'Symptoms improving after 7 days',
    },
    correct_answer: 'c',
    explanation:
      "ABRS is suspected when symptoms persist >10 days without improvement, are severe at onset, or worsen after initial improvement ('double worsening').",
    topic_name: 'Sinusitis', // Matches topicsData
  },

  // --- Professional Practice ---
  {
    question_text:
      "Which ethical principle emphasizes the 'duty to do good' and act in the patient's best interest?",
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Autonomy',
      b: 'Non-maleficence',
      c: 'Beneficence',
      d: 'Justice',
    },
    correct_answer: 'c',
    explanation:
      'Beneficence is the ethical principle that obligates healthcare providers to act for the benefit of their patients and promote their welfare.',
    topic_name: 'Healthcare Ethics', // Matches topicsData
  },
  {
    question_text:
      "What is a 'near miss' or 'close call' in the context of patient safety?",
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'An error causing harm',
      b: 'An error causing no harm',
      c: 'An error caught before reaching the patient',
      d: 'An unavoidable adverse event',
    },
    correct_answer: 'c',
    explanation:
      'A near miss is an error or unsafe condition intercepted before causing harm to the patient. Analyzing near misses helps identify system vulnerabilities.',
    topic_name: 'Medical Error and Patient Safety', // Matches topicsData
  },
  {
    question_text:
      "What does the 'I' stand for in the PICO framework for formulating clinical questions?",
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Indication',
      b: 'Investigation',
      c: 'Interest',
      d: 'Intervention',
    },
    correct_answer: 'd',
    explanation:
      'PICO stands for: P=Patient/Problem, I=Intervention (or Exposure), C=Comparison, O=Outcome.',
    topic_name: 'Evidence-Based Medicine', // Matches topicsData
  },

  // --- Hematologic System ---
  {
    question_text:
      'Which type of anemia is characterized by microcytic, hypochromic red blood cells and low ferritin levels?',
    scenario:
      'Patient has fatigue, low Hgb, low MCV, low serum iron, high TIBC, low ferritin.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Anemia of chronic disease',
      b: 'Iron deficiency anemia',
      c: 'Megaloblastic anemia',
      d: 'Hemolytic anemia',
    },
    correct_answer: 'b',
    explanation:
      'Iron deficiency anemia typically presents with microcytic (low MCV), hypochromic red cells and iron studies showing low serum iron, low ferritin (iron stores), and high TIBC.',
    topic_name: 'Anemia', // Matches topicsData
  },
  {
    question_text:
      'What is the characteristic finding in immune thrombocytopenia (ITP)?',
    scenario:
      'Patient presents with petechiae. Labs show platelets 25,000/μL, normal WBC, normal Hgb.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Pancytopenia',
      b: 'Isolated thrombocytopenia',
      c: 'Schistocytes',
      d: 'Prolonged PT/aPTT',
    },
    correct_answer: 'b',
    explanation:
      'ITP is characterized by isolated thrombocytopenia (low platelet count) without other significant abnormalities in the CBC or peripheral smear.',
    topic_name: 'Thrombocytopenia', // Matches topicsData
  },
  {
    question_text:
      'Which coagulation factor is deficient in Hemophilia B (Christmas disease)?',
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Factor VII',
      b: 'Factor VIII',
      c: 'Factor IX',
      d: 'Factor XI',
    },
    correct_answer: 'c',
    explanation:
      'Hemophilia B is an X-linked recessive bleeding disorder caused by a deficiency or dysfunction of coagulation Factor IX.',
    topic_name: 'Coagulation Disorders', // Matches topicsData
  },

  // --- Renal System ---
  {
    question_text:
      'Which category of Acute Kidney Injury (AKI) is typically associated with decreased renal perfusion due to hypovolemia or decreased cardiac output?',
    scenario: 'A patient develops rising creatinine after severe dehydration.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Prerenal AKI',
      b: 'Intrinsic AKI',
      c: 'Postrenal AKI',
      d: 'Obstructive AKI',
    },
    correct_answer: 'a',
    explanation:
      'Prerenal AKI results from decreased blood flow to the kidneys, leading to reduced GFR without direct kidney damage. Causes include hypovolemia and low cardiac output.',
    topic_name: 'Acute Kidney Injury', // Matches topicsData
  },
  {
    question_text: 'What GFR level defines Stage 3 Chronic Kidney Disease?',
    scenario: null,
    card_type: 'basic-recall',
    options: { a: 'GFR 90+', b: 'GFR 60-89', c: 'GFR 30-59', d: 'GFR 15-29' },
    correct_answer: 'c',
    explanation:
      'Stage 3 CKD is defined by a GFR between 30 and 59 mL/min/1.73 m². It is further subdivided into Stage 3a (GFR 45-59) and Stage 3b (GFR 30-44).',
    topic_name: 'Chronic Kidney Disease', // Matches topicsData
  },
  {
    question_text:
      'Which clinical syndrome is characterized by hematuria (RBC casts), hypertension, edema, and often reduced GFR due to glomerular inflammation?',
    scenario:
      'Patient presents with tea-colored urine, facial swelling, high blood pressure, and RBC casts on urinalysis.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Nephrotic Syndrome',
      b: 'Acute Tubular Necrosis',
      c: 'Interstitial Nephritis',
      d: 'Nephritic Syndrome',
    },
    correct_answer: 'd',
    explanation:
      'Nephritic syndrome is characterized by glomerular inflammation leading to hematuria (with dysmorphic RBCs and RBC casts), proteinuria (usually sub-nephrotic), hypertension, edema, and often acute kidney injury.',
    topic_name: 'Glomerular Diseases', // Matches topicsData
  },

  // --- Dermatologic System ---
  {
    question_text:
      'Which inflammatory skin condition is characterized by intense pruritus and eczematous lesions, often starting in childhood and associated with asthma or allergic rhinitis?',
    scenario:
      'A child presents with itchy, red, weeping patches in the elbow creases and behind the knees.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Psoriasis',
      b: 'Atopic Dermatitis',
      c: 'Seborrheic Dermatitis',
      d: 'Contact Dermatitis',
    },
    correct_answer: 'b',
    explanation:
      'Atopic dermatitis (eczema) is a chronic, pruritic inflammatory skin disease commonly associated with a personal or family history of atopy (asthma, allergic rhinitis, food allergies).',
    topic_name: 'Dermatitis', // Matches topicsData
  },
  {
    question_text:
      'Which type of psoriasis typically appears as small, drop-like, scaly papules often triggered by a streptococcal infection?',
    scenario:
      'A teenager develops widespread small, red, scaly spots 2 weeks after having strep throat.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Plaque Psoriasis',
      b: 'Pustular Psoriasis',
      c: 'Guttate Psoriasis',
      d: 'Inverse Psoriasis',
    },
    correct_answer: 'c',
    explanation:
      'Guttate psoriasis is characterized by the sudden onset of multiple small (<1 cm), erythematous, teardrop-shaped papules with fine scale, often following a streptococcal infection.',
    topic_name: 'Psoriasis', // Matches topicsData
  },
  {
    question_text:
      "Using the ABCDE criteria for melanoma evaluation, what does 'E' stand for?",
    scenario: null,
    card_type: 'basic-recall',
    options: {
      a: 'Elevation',
      b: 'Erythema',
      c: 'Evolution (Changing)',
      d: 'Eccentricity',
    },
    correct_answer: 'c',
    explanation:
      'The ABCDE criteria help evaluate pigmented lesions: A=Asymmetry, B=Border irregularity, C=Color variegation, D=Diameter >6mm, E=Evolution (changing in size, shape, color, symptoms).',
    topic_name: 'Skin Cancer', // Matches topicsData
  },

  // --- Genitourinary System ---
  {
    question_text:
      'Which condition commonly causes urinary obstruction in older men, leading to symptoms like hesitancy, weak stream, and nocturia?',
    scenario:
      'An elderly man presents with difficulty initiating urination and frequent nighttime voiding.',
    card_type: 'clinical-vignette',
    options: {
      a: 'Prostate cancer',
      b: 'Benign Prostatic Hyperplasia (BPH)',
      c: 'Urethral stricture',
      d: 'Bladder stones',
    },
    correct_answer: 'b',
    explanation:
      'Benign Prostatic Hyperplasia (BPH), a non-malignant enlargement of the prostate gland, is a very common cause of lower urinary tract symptoms (LUTS) due to bladder outlet obstruction in older men.',
    topic_name: 'Genitourinary System', // Matches a system name; ensure a topic with this EXACT title exists or link to a specific topic.
  },
];

// Function to generate a slug from the card question
function generateCardSlug(card) {
  // Extract the first 50 characters of the question and create a slug
  const questionText =
    card.question_text.length > 50
      ? card.question_text.substring(0, 50)
      : card.question_text;

  return slugify(questionText, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@?]/g, // Added '?' to remove characters
  });
}

// Helper function to fetch all topics with pagination
async function fetchAllTopics() {
  let allTopics = [];
  let page = 1;
  let totalPages = 1; // Initialize with 1, will be updated after first fetch
  const pageSize = 100; // Adjust page size as needed (Strapi default might be 25 or 100)

  console.log(`Fetching topics page ${page}...`);
  try {
    const response = await axios.get(`${STRAPI_URL}/api/topics`, {
      params: {
        populate: '*', // Ensure relations are populated if needed later
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
      },
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    if (
      !response.data ||
      !response.data.data ||
      !response.data.meta ||
      !response.data.meta.pagination
    ) {
      console.error(
        'Initial topic fetch failed or returned unexpected format:',
        response.data
      );
      return []; // Return empty array on failure
    }

    // Process the first page
    allTopics = allTopics.concat(response.data.data);
    totalPages = response.data.meta.pagination.pageCount;
    console.log(`Total topic pages: ${totalPages}`);

    // Fetch remaining pages if necessary
    if (totalPages > 1) {
      const pageRequests = [];
      for (page = 2; page <= totalPages; page++) {
        console.log(`Queueing fetch for topic page ${page}...`);
        pageRequests.push(
          axios.get(`${STRAPI_URL}/api/topics`, {
            params: {
              populate: '*',
              'pagination[page]': page,
              'pagination[pageSize]': pageSize,
            },
            headers: {
              Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
          })
        );
      }
      // Execute all page requests concurrently
      const responses = await Promise.all(pageRequests);
      responses.forEach((pageResponse) => {
        if (pageResponse.data && pageResponse.data.data) {
          allTopics = allTopics.concat(pageResponse.data.data);
        } else {
          console.warn('Received incomplete data for a subsequent topic page.');
        }
      });
    }
    console.log(
      `Successfully fetched a total of ${allTopics.length} topic entries.`
    );
    return allTopics; // Return all fetched topic entries
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error(`Error fetching topics: ${errorMessage}`);
    if (error.response?.data?.error?.details) {
      console.error('Error Details:', error.response.data.error.details);
    }
    return []; // Return empty array on error
  }
}

// Main function to seed cards
async function seedCards() {
  console.log('Starting to seed cards...');
  const createdCards = [];

  // 1. Fetch ALL topics using the helper function
  const allTopicEntries = await fetchAllTopics();

  if (allTopicEntries.length === 0) {
    console.error(
      'No topic entries fetched from Strapi. Cannot proceed with card seeding.'
    );
    return;
  }

  // Log the raw structure of the first few fetched entries for debugging
  console.log('--- Raw Structure of First Few Fetched Topic Entries ---');
  console.log(JSON.stringify(allTopicEntries.slice(0, 3), null, 2));
  console.log('--- End Raw Structure Log ---');

  // 2. Process fetched topics to extract IDs and titles reliably
  const topics = allTopicEntries
    .map((item) => {
      if (!item || !item.id) {
        console.warn(`Skipping item due to missing item or item.id.`);
        return null;
      }
      // Check for title within attributes first
      let title = item.attributes?.title;
      // Ensure title is a non-empty string
      if (typeof title !== 'string' || title.trim() === '') {
        console.warn(
          `Skipping topic item due to missing, empty, or invalid title in attributes: ID=${item.id}`
        );
        console.log(
          `Problematic item structure (ID: ${item.id}):`,
          JSON.stringify(item, null, 2)
        );
        return null; // Mark invalid items as null
      }

      return {
        id: item.id,
        title: title.trim(), // Trim whitespace
      };
    })
    .filter((topic) => topic !== null); // Remove any null entries

  if (topics.length === 0) {
    console.error(
      'No valid topics found after processing API response. Please check the raw structure log above and your Strapi topic data.'
    );
    return; // Stop if no topics could be processed
  }

  console.log(`Found ${topics.length} valid topics after processing.`);
  // Optional: Log processed topics for verification
  // console.log('Processed Topics:', topics.map(t => `ID: ${t.id}, Title: "${t.title}"`).join('\n'));

  // 3. Create cards and link them to topics by name
  let cardsCreated = 0;
  let cardsSkipped = 0;

  for (const card of cardsData) {
    // Find the matching topic based on the 'topic_name' field in the card data
    // Using case-insensitive and trimmed comparison for robustness
    const cardTopicNameLower = card.topic_name.trim().toLowerCase();
    const matchingTopic = topics.find(
      (t) => t.title.trim().toLowerCase() === cardTopicNameLower
    );

    if (!matchingTopic) {
      console.warn(
        `Topic "${
          card.topic_name
        }" not found for card: "${card.question_text.substring(
          0,
          30
        )}...". Skipping card.`
      );
      // Log available titles once if needed for debugging
      if (cardsSkipped < 5) {
        // Limit logging
        console.log(
          'Available topic titles sample:',
          topics
            .slice(0, 20)
            .map((t) => t.title)
            .join(', ')
        );
      }
      cardsSkipped++;
      continue; // Skip this card if the topic doesn't exist
    }

    try {
      // Generate a unique slug with timestamp to avoid conflicts
      const uniqueSlug = `${generateCardSlug(card)}-${Date.now()}`;

      // Prepare the card data for Strapi, linking the topic ID
      const cardPayload = {
        question_text: card.question_text,
        scenario: card.scenario,
        card_type: card.card_type,
        options: card.options,
        correct_answer: card.correct_answer,
        explanation: card.explanation,
        topic: matchingTopic.id, // Use the found topic ID
        slug: uniqueSlug,
      };

      const response = await axios.post(
        `${STRAPI_URL}/api/cards`,
        { data: cardPayload },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${STRAPI_TOKEN}`,
          },
        }
      );

      if (response.data?.data?.id) {
        const cardId = response.data.data.id;
        // console.log(`Successfully created card ID: ${cardId} for topic ${matchingTopic.title}`);
        createdCards.push({
          id: cardId,
          question: card.question_text.substring(0, 30) + '...',
          topic: matchingTopic.title,
        });
        cardsCreated++;
      } else {
        console.error(
          'Card creation returned unexpected response:',
          response.data
        );
        cardsSkipped++;
      }
    } catch (cardError) {
      const errorResponse = cardError.response;
      const errorMessage =
        errorResponse?.data?.error?.message || cardError.message;
      const errorDetails = errorResponse?.data?.error?.details;
      console.error(
        `Error creating card "${card.question_text.substring(
          0,
          30
        )}..." for topic "${matchingTopic.title}": ${errorMessage}`
      );
      if (errorDetails) {
        console.error('Error Details:', JSON.stringify(errorDetails, null, 2));
      }
      cardsSkipped++;
    }
  }

  console.log('\n--- Card Seeding Complete ---');
  console.log(`Created ${cardsCreated} cards`);
  console.log(`Skipped ${cardsSkipped} cards due to missing topics or errors.`);
}

// Execute the seed function
seedCards()
  .then(() => console.log('Card seeding completed successfully!'))
  .catch((err) => console.error('Error in seed process:', err));
