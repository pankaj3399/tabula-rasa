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

// Systems data
const systemsData = [
  {
    name: "Cardiovascular System",
    slug: "cardiovascular-system",
    percentage: 15,
    order: 1
  },
  {
    name: "Respiratory System",
    slug: "respiratory-system",
    percentage: 12,
    order: 2
  },
  {
    name: "Gastrointestinal System",
    slug: "gastrointestinal-system",
    percentage: 10,
    order: 3
  },
  {
    name: "Nervous System",
    slug: "nervous-system",
    percentage: 10,
    order: 4
  },
  {
    name: "Musculoskeletal System",
    slug: "musculoskeletal-system",
    percentage: 8,
    order: 5
  }
];

// Topics data (will be linked to systems when created)
const topicsData = [
  // Cardiovascular System Topics
  {
    title: "Heart Failure",
    slug: "heart-failure",
    introduction: "Heart failure is a clinical syndrome characterized by the heart's inability to pump sufficient blood to meet the body's metabolic demands. It can result from any structural or functional cardiac disorder that impairs the ability of the heart to fill with or eject blood.",
    diagnosis_overview: "Diagnosis of heart failure is based on clinical presentation, physical examination, laboratory tests, and imaging studies. Common findings include dyspnea, fatigue, and fluid retention.",
    management: "Management includes lifestyle modifications, pharmacological therapy, and in some cases, device therapy or cardiac transplantation. Key medications include ACE inhibitors, beta-blockers, diuretics, and aldosterone antagonists.",
    highyieldPoints: "- Know the difference between HFrEF vs HFpEF\n- Be able to recognize signs and symptoms of acute decompensated heart failure\n- Understand first-line therapies for different types of heart failure",
    systemIndex: 0, // Reference to Cardiovascular System
    types: [
      {
        name: "Heart Failure with Reduced Ejection Fraction",
        abbreviation: "HFrEF",
        anchor_id: "hfref",
        description: "Heart failure with an ejection fraction ≤40%, previously known as systolic heart failure.",
        symptoms: [
          { text: "Dyspnea on exertion" },
          { text: "Orthopnea" },
          { text: "Paroxysmal nocturnal dyspnea" },
          { text: "Fatigue" }
        ],
        diagnosticFindings: [
          { text: "Reduced ejection fraction (≤40%) on echocardiography" },
          { text: "Elevated BNP or NT-proBNP levels" },
          { text: "S3 heart sound (ventricular gallop)" }
        ],
        causes: [
          { text: "Coronary artery disease" },
          { text: "Previous myocardial infarction" },
          { text: "Dilated cardiomyopathy" },
          { text: "Hypertension" }
        ]
      },
      {
        name: "Heart Failure with Preserved Ejection Fraction",
        abbreviation: "HFpEF",
        anchor_id: "hfpef",
        description: "Heart failure with an ejection fraction ≥50%, previously known as diastolic heart failure.",
        symptoms: [
          { text: "Dyspnea on exertion" },
          { text: "Exercise intolerance" },
          { text: "Peripheral edema" }
        ],
        diagnosticFindings: [
          { text: "Normal or preserved ejection fraction (≥50%) on echocardiography" },
          { text: "Evidence of diastolic dysfunction" },
          { text: "Elevated BNP or NT-proBNP levels" },
          { text: "S4 heart sound (atrial gallop)" }
        ],
        causes: [
          { text: "Hypertension" },
          { text: "Aging" },
          { text: "Diabetes mellitus" },
          { text: "Obesity" },
          { text: "Hypertrophic cardiomyopathy" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Acute Decompensated Heart Failure",
        slug: "acute-decompensated-heart-failure",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Acute decompensated heart failure (ADHF) refers to the sudden worsening of heart failure symptoms, typically requiring hospitalization. It can occur in patients with existing heart failure or as a new-onset condition."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Clinical Presentation" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Patients typically present with dyspnea at rest or with minimal exertion, orthopnea, paroxysmal nocturnal dyspnea, and peripheral edema. They may also exhibit signs of pulmonary congestion, such as crackles and wheezing, and systemic congestion, including jugular venous distention and hepatomegaly."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Initial management focuses on relieving symptoms and stabilizing the patient. This typically includes oxygen therapy, diuretics, vasodilators, and in some cases, inotropic agents. Once stabilized, the treatment plan should address the underlying cause of decompensation and optimize chronic heart failure therapy."
              }
            ]
          }
        ]
      },
      {
        title: "Pharmacological Management of Heart Failure",
        slug: "pharmacological-management-of-heart-failure",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Pharmacological management of heart failure is guided by the type of heart failure, ejection fraction, and the presence of comorbidities."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Medications for HFrEF" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "First-line therapies include ACE inhibitors or ARBs, beta-blockers, and mineralocorticoid receptor antagonists. Additional therapies may include diuretics, SGLT2 inhibitors, hydralazine/isosorbide dinitrate, ivabradine, and digoxin."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Medications for HFpEF" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Management of HFpEF is primarily focused on symptom relief and treatment of underlying conditions. Diuretics are used for volume overload. SGLT2 inhibitors have shown benefit in recent trials. Blood pressure control is essential, often with ACE inhibitors, ARBs, or other antihypertensive agents."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Coronary Artery Disease",
    slug: "coronary-artery-disease",
    introduction: "Coronary artery disease (CAD) is characterized by atherosclerotic plaque accumulation in the coronary arteries, leading to reduced blood flow to the myocardium. It is the most common type of heart disease and a leading cause of mortality worldwide.",
    diagnosis_overview: "Diagnosis involves clinical evaluation, stress testing, coronary CT angiography, and invasive coronary angiography. Risk factor assessment is also crucial for comprehensive management.",
    management: "Management strategies include lifestyle modifications, medical therapy for symptom relief and secondary prevention, and revascularization when appropriate. Key medications include antiplatelet agents, statins, beta-blockers, and ACE inhibitors.",
    highyieldPoints: "- Know the difference between stable angina and acute coronary syndromes\n- Understand the appropriate use of diagnostic tests in various clinical scenarios\n- Be familiar with the indications for medical therapy versus revascularization",
    systemIndex: 0, // Reference to Cardiovascular System
    types: [
      {
        name: "Stable Angina",
        abbreviation: "SA",
        anchor_id: "stable-angina",
        description: "Stable angina is characterized by predictable chest pain triggered by physical exertion or emotional stress, relieved by rest or nitroglycerin.",
        symptoms: [
          { text: "Chest pain or discomfort with exertion" },
          { text: "Pain may radiate to the left arm, neck, jaw, or back" },
          { text: "Relief with rest or nitroglycerin" },
          { text: "Consistent pattern over time" }
        ],
        diagnosticFindings: [
          { text: "Abnormal stress test results" },
          { text: "Coronary artery stenosis on angiography" },
          { text: "Reversible perfusion defects on nuclear imaging" }
        ],
        causes: [
          { text: "Atherosclerosis" },
          { text: "Coronary artery spasm" },
          { text: "Microvascular dysfunction" }
        ]
      },
      {
        name: "Acute Coronary Syndrome",
        abbreviation: "ACS",
        anchor_id: "acs",
        description: "Acute coronary syndrome encompasses unstable angina, non-ST-elevation myocardial infarction (NSTEMI), and ST-elevation myocardial infarction (STEMI).",
        symptoms: [
          { text: "Severe chest pain at rest or with minimal exertion" },
          { text: "Pain not relieved by rest or nitroglycerin" },
          { text: "Associated symptoms: dyspnea, diaphoresis, nausea, lightheadedness" }
        ],
        diagnosticFindings: [
          { text: "Elevated cardiac biomarkers (troponin, CK-MB)" },
          { text: "ECG changes (ST elevation, ST depression, T-wave inversion)" },
          { text: "Coronary artery occlusion or significant stenosis on angiography" }
        ],
        causes: [
          { text: "Plaque rupture with thrombus formation" },
          { text: "Plaque erosion" },
          { text: "Coronary artery dissection" },
          { text: "Severe coronary artery spasm" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Acute Myocardial Infarction",
        slug: "acute-myocardial-infarction",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Acute myocardial infarction (MI) occurs when blood flow to a part of the heart is blocked, causing heart muscle damage or death. It requires prompt diagnosis and treatment to minimize myocardial damage."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "STEMI vs. NSTEMI" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "ST-elevation myocardial infarction (STEMI) is characterized by ST-segment elevation on ECG, indicating complete coronary artery occlusion. Non-ST-elevation myocardial infarction (NSTEMI) presents with cardiac biomarker elevation without ST-segment elevation, typically due to partial or temporary occlusion."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "STEMI management focuses on immediate reperfusion, preferably with primary percutaneous coronary intervention (PCI) if available within 90 minutes, or fibrinolytic therapy if PCI is not readily available. NSTEMI management includes antiplatelet therapy, anticoagulation, and risk stratification to determine the timing of coronary angiography."
              }
            ]
          }
        ]
      },
      {
        title: "Chronic Coronary Syndrome Management",
        slug: "chronic-coronary-syndrome-management",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Chronic coronary syndrome, previously known as stable coronary artery disease, requires comprehensive management to reduce symptoms and prevent adverse cardiovascular events."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Medical Therapy" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "First-line medications include antiplatelet agents (aspirin), statins, beta-blockers, and ACE inhibitors or ARBs. Antianginal medications such as nitrates, calcium channel blockers, and ranolazine may be added for symptom relief."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Revascularization" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Revascularization via PCI or coronary artery bypass grafting (CABG) is considered for patients with refractory symptoms despite optimal medical therapy, high-risk coronary anatomy, or evidence of significant ischemia on non-invasive testing."
              }
            ]
          }
        ]
      }
    ]
  },
  // Respiratory System Topics
  {
    title: "Asthma",
    slug: "asthma",
    introduction: "Asthma is a chronic inflammatory disorder of the airways characterized by variable and recurring symptoms, airflow obstruction, bronchial hyperresponsiveness, and underlying inflammation. It affects people of all ages and is one of the most common chronic diseases worldwide.",
    diagnosis_overview: "Diagnosis is based on the presence of characteristic symptom patterns and evidence of variable airflow limitation. Pulmonary function tests, especially spirometry with bronchodilator reversibility, are essential for confirming the diagnosis.",
    management: "Management includes education, environmental control, pharmacotherapy, and regular monitoring. The stepwise approach to therapy aims to achieve symptom control and minimize future risk of exacerbations and medication side effects.",
    highyieldPoints: "- Know the stepwise approach to asthma management\n- Understand the difference between controller and reliever medications\n- Be familiar with the approach to acute asthma exacerbations",
    systemIndex: 1, // Reference to Respiratory System
    types: [
      {
        name: "Allergic Asthma",
        abbreviation: "AA",
        anchor_id: "allergic-asthma",
        description: "Allergic asthma is triggered by exposure to allergens such as pollen, pet dander, or dust mites. It often coexists with other allergic conditions like allergic rhinitis or atopic dermatitis.",
        symptoms: [
          { text: "Wheezing" },
          { text: "Coughing, especially at night" },
          { text: "Shortness of breath" },
          { text: "Chest tightness" },
          { text: "Worsening symptoms during allergy seasons" }
        ],
        diagnosticFindings: [
          { text: "Elevated IgE levels" },
          { text: "Positive skin prick tests or specific IgE to relevant allergens" },
          { text: "Eosinophilia in blood or sputum" },
          { text: "Bronchial hyperresponsiveness on methacholine challenge" }
        ],
        causes: [
          { text: "Genetic predisposition" },
          { text: "Exposure to environmental allergens" },
          { text: "Respiratory infections in early life" }
        ]
      },
      {
        name: "Non-allergic Asthma",
        abbreviation: "NA",
        anchor_id: "non-allergic-asthma",
        description: "Non-allergic asthma is not associated with allergies and may be triggered by factors such as exercise, cold air, respiratory infections, stress, or irritants.",
        symptoms: [
          { text: "Wheezing" },
          { text: "Coughing" },
          { text: "Shortness of breath" },
          { text: "Chest tightness" },
          { text: "Symptoms triggered by non-allergic factors" }
        ],
        diagnosticFindings: [
          { text: "Normal IgE levels" },
          { text: "Negative allergy tests" },
          { text: "Variable or fixed airflow obstruction on spirometry" },
          { text: "Bronchial hyperresponsiveness on methacholine challenge" }
        ],
        causes: [
          { text: "Respiratory tract infections" },
          { text: "Occupational exposures" },
          { text: "Exercise" },
          { text: "Stress" },
          { text: "Medications (NSAIDs, beta-blockers)" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Asthma Exacerbations",
        slug: "asthma-exacerbations",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Asthma exacerbations, or asthma attacks, are acute or subacute episodes of progressively worsening shortness of breath, coughing, wheezing, and chest tightness. They represent a change from the patient's usual status that requires a change in treatment."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Assessment of Severity" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Severity is assessed based on symptoms, signs, and objective measurements of lung function. Mild exacerbations may be managed at home with increased use of rescue medications, while moderate to severe exacerbations often require emergency department visits or hospitalization."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Initial treatment includes repeated administrations of rapid-acting inhaled bronchodilators, early introduction of systemic corticosteroids, and controlled oxygen therapy if hypoxemic. Monitoring response to treatment is essential, and discharge planning should include an action plan and follow-up arrangements."
              }
            ]
          }
        ]
      },
      {
        title: "Stepwise Approach to Asthma Management",
        slug: "stepwise-approach-to-asthma-management",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "The stepwise approach to asthma management involves adjusting therapy based on the level of asthma control and risk factors."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Controller Medications" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Controller medications include inhaled corticosteroids (ICS), which are the cornerstone of asthma management, long-acting beta-agonists (LABA) in combination with ICS, leukotriene receptor antagonists, and for severe asthma, biologics targeting specific inflammatory pathways."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Reliever Medications" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Reliever medications, also known as rescue medications, are used for quick relief of bronchoconstriction and include short-acting beta-agonists (SABA) and, in some cases, as-needed low-dose ICS-formoterol combinations."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Chronic Obstructive Pulmonary Disease",
    slug: "chronic-obstructive-pulmonary-disease",
    introduction: "Chronic Obstructive Pulmonary Disease (COPD) is a common, preventable, and treatable disease characterized by persistent respiratory symptoms and airflow limitation due to airway and/or alveolar abnormalities usually caused by significant exposure to noxious particles or gases.",
    diagnosis_overview: "Diagnosis requires spirometry, which demonstrates a post-bronchodilator FEV1/FVC < 0.7, confirming the presence of persistent airflow limitation. Clinical evaluation, exposure history, and exclusion of other causes of airflow limitation are also important.",
    management: "Management focuses on reducing symptoms, improving quality of life, and preventing exacerbations. It includes smoking cessation, pharmacotherapy, pulmonary rehabilitation, and in advanced cases, oxygen therapy or surgical interventions.",
    highyieldPoints: "- Know the GOLD criteria for COPD classification\n- Understand the pharmacological options based on symptom burden and exacerbation history\n- Be familiar with the management of COPD exacerbations",
    systemIndex: 1, // Reference to Respiratory System
    types: [
      {
        name: "Emphysema",
        abbreviation: "EM",
        anchor_id: "emphysema",
        description: "Emphysema is characterized by abnormal permanent enlargement of the airspaces distal to the terminal bronchioles, accompanied by destruction of their walls without obvious fibrosis.",
        symptoms: [
          { text: "Dyspnea, especially on exertion" },
          { text: "Reduced exercise capacity" },
          { text: "Barrel chest appearance" },
          { text: "Weight loss and cachexia in advanced disease" }
        ],
        diagnosticFindings: [
          { text: "Decreased diffusion capacity (DLCO)" },
          { text: "Hyperinflation on chest X-ray or CT scan" },
          { text: "Bullae or blebs on CT scan" },
          { text: "Reduced FEV1 and FEV1/FVC ratio on spirometry" }
        ],
        causes: [
          { text: "Cigarette smoking" },
          { text: "Alpha-1 antitrypsin deficiency" },
          { text: "Occupational exposures" },
          { text: "Air pollution" }
        ]
      },
      {
        name: "Chronic Bronchitis",
        abbreviation: "CB",
        anchor_id: "chronic-bronchitis",
        description: "Chronic bronchitis is defined clinically as a productive cough for 3 months in each of 2 consecutive years, with other causes of chronic cough excluded.",
        symptoms: [
          { text: "Chronic productive cough" },
          { text: "Dyspnea" },
          { text: "Wheezing" },
          { text: "Frequent respiratory infections" }
        ],
        diagnosticFindings: [
          { text: "Thickened bronchial walls on CT scan" },
          { text: "Mucus hypersecretion" },
          { text: "Reduced FEV1 and FEV1/FVC ratio on spirometry" }
        ],
        causes: [
          { text: "Cigarette smoking" },
          { text: "Occupational exposures" },
          { text: "Air pollution" },
          { text: "Recurrent respiratory infections" }
        ]
      }
    ],
    subtopics: [
      {
        title: "COPD Exacerbations",
        slug: "copd-exacerbations",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "COPD exacerbations are acute events characterized by worsening of respiratory symptoms beyond normal day-to-day variations, leading to a change in medication. They significantly impact disease progression, quality of life, and mortality."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Causes and Triggers" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Exacerbations are often triggered by respiratory infections (viral or bacterial), air pollution, or discontinuation of maintenance therapy. Approximately one-third of exacerbations have no identifiable cause."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Treatment includes bronchodilators (short-acting beta-agonists and anticholinergics), systemic corticosteroids, and antibiotics when indicated. Oxygen therapy and ventilatory support may be necessary in severe cases. Prevention of future exacerbations through optimized maintenance therapy is crucial."
              }
            ]
          }
        ]
      },
      {
        title: "Pharmacological Management of COPD",
        slug: "pharmacological-management-of-copd",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Pharmacological therapy in COPD aims to reduce symptoms, improve exercise tolerance and health status, and reduce the frequency and severity of exacerbations."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Bronchodilators" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Bronchodilators include beta-2 agonists and anticholinergics (muscarinic antagonists), available in short-acting and long-acting formulations. They are central to symptom management and are prescribed on an as-needed basis or regularly, depending on disease severity."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Anti-inflammatory Therapy" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Inhaled corticosteroids (ICS) are primarily used in combination with long-acting bronchodilators for patients with a history of exacerbations despite optimal bronchodilator therapy, especially those with eosinophilic features. Phosphodiesterase-4 inhibitors and macrolides may be considered in specific patient populations."
              }
            ]
          }
        ]
      }
    ]
  },
  // Gastrointestinal System Topics
  {
    title: "Inflammatory Bowel Disease",
    slug: "inflammatory-bowel-disease",
    introduction: "Inflammatory Bowel Disease (IBD) refers to two chronic inflammatory disorders of the gastrointestinal tract: Crohn's disease (CD) and ulcerative colitis (UC). These conditions are characterized by periods of remission and relapse and can significantly impact quality of life.",
    diagnosis_overview: "Diagnosis involves a combination of clinical evaluation, laboratory tests, endoscopy with biopsy, and imaging studies. Differentiation between CD and UC is based on the pattern and location of inflammation, histological features, and clinical presentation.",
    management: "Management aims to induce and maintain remission, prevent complications, and improve quality of life. It includes anti-inflammatory medications, immunomodulators, biologics, nutritional support, and in some cases, surgical interventions.",
    highyieldPoints: "- Know the differences between Crohn's disease and ulcerative colitis\n- Understand the role of various medications in inducing and maintaining remission\n- Be familiar with the extra-intestinal manifestations of IBD",
    systemIndex: 2, // Reference to Gastrointestinal System
    types: [
      {
        name: "Crohn's Disease",
        abbreviation: "CD",
        anchor_id: "crohns-disease",
        description: "Crohn's disease is characterized by transmural inflammation that can affect any part of the gastrointestinal tract from mouth to anus, with skip lesions and a propensity for fistula and stricture formation.",
        symptoms: [
          { text: "Abdominal pain, typically in the right lower quadrant" },
          { text: "Diarrhea, which may be bloody" },
          { text: "Weight loss" },
          { text: "Fatigue" },
          { text: "Perianal disease (fistulas, abscesses)" }
        ],
        diagnosticFindings: [
          { text: "Skip lesions on endoscopy" },
          { text: "Cobblestone appearance of the mucosa" },
          { text: "Transmural inflammation on histology" },
          { text: "Granulomas (in about 30% of cases)" },
          { text: "Fistulas or strictures on imaging" }
        ],
        causes: [
          { text: "Genetic predisposition" },
          { text: "Environmental factors" },
          { text: "Dysregulated immune response to gut microbiota" },
          { text: "Smoking (increases risk)" }
        ]
      },
      {
        name: "Ulcerative Colitis",
        abbreviation: "UC",
        anchor_id: "ulcerative-colitis",
        description: "Ulcerative colitis is characterized by continuous inflammation limited to the mucosal layer of the colon, typically starting in the rectum and extending proximally in a continuous pattern.",
        symptoms: [
          { text: "Bloody diarrhea" },
          { text: "Rectal urgency and tenesmus" },
          { text: "Lower abdominal pain and cramping" },
          { text: "Fatigue" },
          { text: "Weight loss in severe cases" }
        ],
        diagnosticFindings: [
          { text: "Continuous inflammation starting from the rectum" },
          { text: "Friable mucosa with ulcerations" },
          { text: "Mucosal inflammation limited to the colon" },
          { text: "Crypt abscesses and distortion on histology" },
          { text: "Absence of granulomas" }
        ],
        causes: [
          { text: "Genetic predisposition" },
          { text: "Environmental factors" },
          { text: "Dysregulated immune response to gut microbiota" },
          { text: "Smoking (protective effect, but cessation may worsen symptoms)" },
          { text: "Smoking (protective effect, but cessation still recommended)" }
        ]
      }
    ],
    subtopics: [
      {
        title: "IBD Extraintestinal Manifestations",
        slug: "ibd-extraintestinal-manifestations",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Inflammatory bowel disease can affect multiple organ systems beyond the gastrointestinal tract. Extraintestinal manifestations (EIMs) occur in up to 40% of IBD patients and can significantly impact quality of life and disease management."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Common Manifestations" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Musculoskeletal manifestations include peripheral arthritis, axial arthropathies (ankylosing spondylitis), and osteoporosis. Dermatologic manifestations include erythema nodosum, pyoderma gangrenosum, and Sweet's syndrome. Ocular manifestations include episcleritis, uveitis, and scleritis. Hepatobiliary manifestations include primary sclerosing cholangitis, which is more common in UC."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Management of EIMs often requires a multidisciplinary approach. Some EIMs parallel intestinal disease activity and improve with treatment of the underlying IBD, while others follow an independent course and require specific therapy."
              }
            ]
          }
        ]
      },
      {
        title: "Biologics in IBD Treatment",
        slug: "biologics-in-ibd-treatment",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Biologic therapies have revolutionized the management of IBD, especially for patients with moderate to severe disease or those who have failed conventional therapy."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Anti-TNF Agents" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Anti-TNF agents like infliximab, adalimumab, golimumab, and certolizumab pegol are effective for both induction and maintenance of remission in both CD and UC. They are particularly useful for fistulizing and perianal CD."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Other Biologics" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Other biologics include anti-integrin agents (vedolizumab), which selectively target gut inflammation, and anti-IL-12/23 agents (ustekinumab), which have shown efficacy in both CD and UC. Newer agents include anti-IL-23 agents (risankizumab, guselkumab) and JAK inhibitors (tofacitinib, upadacitinib)."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Peptic Ulcer Disease",
    slug: "peptic-ulcer-disease",
    introduction: "Peptic ulcer disease (PUD) is characterized by breaks in the mucosal lining of the stomach or duodenum, extending through the muscularis mucosa. The two main causes are Helicobacter pylori infection and use of nonsteroidal anti-inflammatory drugs (NSAIDs).",
    diagnosis_overview: "Diagnosis involves clinical evaluation, testing for H. pylori infection, and endoscopy to visualize and biopsy the ulcer. Endoscopy also allows for risk stratification of bleeding ulcers and therapeutic intervention if needed.",
    management: "Management includes eradication of H. pylori if present, discontinuation of NSAIDs if possible, acid suppression therapy, and treatment of complications such as bleeding or perforation. Prevention strategies are important for high-risk patients.",
    highyieldPoints: "- Know the common causes of peptic ulcer disease\n- Understand the appropriate testing and treatment for H. pylori infection\n- Be familiar with the approach to upper GI bleeding in the setting of PUD",
    systemIndex: 2, // Reference to Gastrointestinal System
    types: [
      {
        name: "Gastric Ulcer",
        abbreviation: "GU",
        anchor_id: "gastric-ulcer",
        description: "Gastric ulcers occur in the stomach and are often associated with H. pylori infection, NSAID use, or malignancy.",
        symptoms: [
          { text: "Epigastric pain, often worse with eating" },
          { text: "Nausea and vomiting" },
          { text: "Early satiety" },
          { text: "Weight loss" }
        ],
        diagnosticFindings: [
          { text: "Ulceration visualized on upper endoscopy" },
          { text: "Positive test for H. pylori" },
          { text: "Normal or decreased acid production" },
          { text: "Multiple biopsies required to rule out malignancy" }
        ],
        causes: [
          { text: "H. pylori infection" },
          { text: "NSAID use" },
          { text: "Stress (severe illness, burns, trauma)" },
          { text: "Zollinger-Ellison syndrome (rare)" },
          { text: "Malignancy" }
        ]
      },
      {
        name: "Duodenal Ulcer",
        abbreviation: "DU",
        anchor_id: "duodenal-ulcer",
        description: "Duodenal ulcers occur in the duodenum, most commonly in the bulb, and are strongly associated with H. pylori infection and NSAID use.",
        symptoms: [
          { text: "Epigastric pain, often relieved by eating" },
          { text: "Pain that awakens the patient at night" },
          { text: "Nausea and vomiting" },
          { text: "Weight maintenance or gain" }
        ],
        diagnosticFindings: [
          { text: "Ulceration visualized on upper endoscopy" },
          { text: "Positive test for H. pylori" },
          { text: "Increased acid production" },
          { text: "Rarely associated with malignancy" }
        ],
        causes: [
          { text: "H. pylori infection" },
          { text: "NSAID use" },
          { text: "Stress (severe illness, burns, trauma)" },
          { text: "Zollinger-Ellison syndrome (rare)" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Helicobacter pylori Infection",
        slug: "helicobacter-pylori-infection",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Helicobacter pylori is a gram-negative, spiral-shaped bacterium that colonizes the gastric mucosa. It is a major cause of peptic ulcer disease, chronic gastritis, and gastric malignancies."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Diagnosis" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Diagnostic tests include noninvasive methods such as urea breath test, stool antigen test, and serology, and invasive methods such as rapid urease test, histology, and culture of endoscopic biopsies. The choice of test depends on the clinical context, availability, and whether the patient has been on recent antibiotics or proton pump inhibitors."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Treatment" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Treatment involves combination therapy with antibiotics and acid suppression. Common regimens include triple therapy (PPI, clarithromycin, and amoxicillin or metronidazole), quadruple therapy (PPI, bismuth, tetracycline, and metronidazole), or sequential therapy. Treatment success should be confirmed with follow-up testing, especially in high-risk patients."
              }
            ]
          }
        ]
      },
      {
        title: "Complications of Peptic Ulcer Disease",
        slug: "complications-of-peptic-ulcer-disease",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Peptic ulcer disease can lead to several complications, some of which can be life-threatening and require immediate intervention."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Upper GI Bleeding" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Upper GI bleeding is manifested by hematemesis, melena, or hematochezia in severe cases. Management includes hemodynamic stabilization, reversal of anticoagulation if appropriate, proton pump inhibitor therapy, and endoscopic intervention for high-risk lesions (active bleeding, visible vessel, or adherent clot)."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Perforation and Penetration" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Perforation presents with sudden, severe abdominal pain and signs of peritonitis. It is a surgical emergency requiring prompt recognition and intervention. Penetration occurs when the ulcer extends into adjacent structures such as the pancreas, causing persistent pain that may radiate to the back."
              }
            ]
          }
        ]
      }
    ]
  },
  // Nervous System Topics
  {
    title: "Stroke",
    slug: "stroke",
    introduction: "Stroke is a medical emergency characterized by a sudden loss of neurological function due to a disturbance in cerebral blood flow. It is a leading cause of disability and mortality worldwide. Strokes are broadly classified into ischemic (87%) and hemorrhagic (13%) types.",
    diagnosis_overview: "Diagnosis involves rapid clinical assessment using tools like the NIH Stroke Scale, neuroimaging (CT or MRI), and vascular imaging. Time is of the essence in stroke management, as earlier treatment leads to better outcomes.",
    management: "Management of ischemic stroke includes consideration of reperfusion therapies (IV thrombolysis, mechanical thrombectomy), antiplatelet therapy, and prevention of complications. Hemorrhagic stroke management focuses on controlling blood pressure, reversing anticoagulation if applicable, and in some cases, surgical intervention.",
    highyieldPoints: "- Know the time windows for thrombolysis and thrombectomy in acute ischemic stroke\n- Understand the different subtypes of ischemic stroke and their management\n- Be familiar with the approach to hemorrhagic stroke management",
    systemIndex: 3, // Reference to Nervous System
    types: [
      {
        name: "Ischemic Stroke",
        abbreviation: "IS",
        anchor_id: "ischemic-stroke",
        description: "Ischemic stroke results from an obstruction within a blood vessel supplying the brain, leading to a sudden loss of neurological function.",
        symptoms: [
          { text: "Sudden onset of focal neurological deficits" },
          { text: "Weakness or numbness of the face, arm, or leg, typically on one side" },
          { text: "Trouble speaking or understanding speech" },
          { text: "Vision impairment" },
          { text: "Difficulty walking, dizziness, loss of balance or coordination" }
        ],
        diagnosticFindings: [
          { text: "Hypodensity on non-contrast CT or hyperintensity on diffusion-weighted MRI" },
          { text: "Occlusion or stenosis on vascular imaging" },
          { text: "Normal blood on initial CT (distinguishing it from hemorrhagic stroke)" }
        ],
        causes: [
          { text: "Thrombotic (large artery atherosclerosis, small vessel disease)" },
          { text: "Embolic (cardiac source, artery-to-artery, cryptogenic)" },
          { text: "Hypoperfusion (systemic hypotension, cardiac arrest)" },
          { text: "Venous thrombosis (cerebral venous sinus thrombosis)" }
        ]
      },
      {
        name: "Hemorrhagic Stroke",
        abbreviation: "HS",
        anchor_id: "hemorrhagic-stroke",
        description: "Hemorrhagic stroke occurs when a weakened blood vessel ruptures, leading to bleeding into or around the brain tissue.",
        symptoms: [
          { text: "Sudden onset of severe headache" },
          { text: "Nausea and vomiting" },
          { text: "Decreased consciousness or coma" },
          { text: "Focal neurological deficits similar to ischemic stroke" },
          { text: "Seizures" }
        ],
        diagnosticFindings: [
          { text: "Hyperdensity on non-contrast CT representing blood" },
          { text: "Mass effect and midline shift in larger bleeds" },
          { text: "Intraventricular extension in some cases" },
          { text: "Underlying vascular abnormalities on angiography in secondary causes" }
        ],
        causes: [
          { text: "Intracerebral hemorrhage (hypertension, cerebral amyloid angiopathy, coagulopathy, tumor)" },
          { text: "Subarachnoid hemorrhage (ruptured aneurysm, arteriovenous malformation)" },
          { text: "Subdural hematoma (trauma, anticoagulation)" },
          { text: "Epidural hematoma (trauma)" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Acute Ischemic Stroke Management",
        slug: "acute-ischemic-stroke-management",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Acute ischemic stroke management focuses on rapid assessment, early reperfusion therapy when indicated, and prevention of complications and recurrence."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Reperfusion Therapy" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Intravenous thrombolysis with recombinant tissue plasminogen activator (rtPA) is recommended within 4.5 hours of symptom onset in eligible patients. Mechanical thrombectomy is indicated for patients with large vessel occlusion within 24 hours of symptom onset, with the best outcomes seen when performed early."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Supportive Care" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Supportive care includes airway management, maintaining adequate oxygenation, careful blood pressure management, glycemic control, and prevention of complications such as aspiration pneumonia, deep vein thrombosis, and pressure ulcers. Early rehabilitation is crucial for optimizing recovery."
              }
            ]
          }
        ]
      },
      {
        title: "Secondary Stroke Prevention",
        slug: "secondary-stroke-prevention",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Secondary stroke prevention is critical in reducing the risk of recurrent stroke, which is highest in the first few weeks after the initial event."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Antiplatelet and Anticoagulant Therapy" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Antiplatelet therapy is the mainstay of secondary prevention for non-cardioembolic ischemic stroke. Options include aspirin, clopidogrel, and the combination of aspirin and extended-release dipyridamole. Anticoagulation with a direct oral anticoagulant or warfarin is indicated for stroke due to atrial fibrillation or other cardioembolic sources."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Risk Factor Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Risk factor management includes hypertension control, statin therapy for atherosclerotic disease, diabetes management, smoking cessation, and lifestyle modifications such as regular physical activity, a Mediterranean-style diet, and weight management. Carotid revascularization is considered for symptomatic high-grade carotid stenosis."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Seizure Disorders",
    slug: "seizure-disorders",
    introduction: "Seizure disorders encompass a spectrum of conditions characterized by recurrent, unprovoked seizures. Epilepsy, defined as a tendency to have recurrent unprovoked seizures, affects approximately 1% of the population. Seizures can manifest in various ways, depending on the location and spread of abnormal electrical activity in the brain.",
    diagnosis_overview: "Diagnosis is based on clinical history, eyewitness accounts, physical examination, and electroencephalography (EEG). Neuroimaging (MRI) is important to identify structural causes. Classification of seizures aids in determining appropriate treatment and prognosis.",
    management: "Management primarily involves antiseizure medications, with the choice of drug depending on the seizure type, patient characteristics, and potential side effects. For drug-resistant epilepsy, additional options include epilepsy surgery, neurostimulation, and dietary therapies.",
    highyieldPoints: "- Know the classification of seizures and epilepsy syndromes\n- Understand the approach to choosing antiseizure medications based on seizure type\n- Be familiar with the management of status epilepticus",
    systemIndex: 3, // Reference to Nervous System
    types: [
      {
        name: "Focal Seizures",
        abbreviation: "FS",
        anchor_id: "focal-seizures",
        description: "Focal seizures, previously known as partial seizures, originate in one hemisphere of the brain and can be further classified based on awareness and motor or non-motor symptoms.",
        symptoms: [
          { text: "Focal aware seizures: preserved awareness, motor or non-motor symptoms" },
          { text: "Focal impaired awareness seizures: altered awareness, automatisms" },
          { text: "Focal to bilateral tonic-clonic seizures: start focally, then spread to both hemispheres" }
        ],
        diagnosticFindings: [
          { text: "Focal abnormalities on EEG (spikes, sharp waves, or slow waves)" },
          { text: "Structural abnormalities on MRI in some cases" },
          { text: "Specific patterns during seizure on video-EEG monitoring" }
        ],
        causes: [
          { text: "Mesial temporal sclerosis" },
          { text: "Brain tumors" },
          { text: "Cortical dysplasia" },
          { text: "Stroke or traumatic brain injury" },
          { text: "Infectious or inflammatory lesions" }
        ]
      },
      {
        name: "Generalized Seizures",
        abbreviation: "GS",
        anchor_id: "generalized-seizures",
        description: "Generalized seizures involve both hemispheres of the brain from the onset and include several subtypes with distinct clinical presentations.",
        symptoms: [
          { text: "Tonic-clonic seizures: stiffening followed by rhythmic jerking, postictal confusion" },
          { text: "Absence seizures: brief lapses in awareness, may have subtle motor features" },
          { text: "Myoclonic seizures: brief, shock-like jerks of muscles" },
          { text: "Atonic seizures: sudden loss of muscle tone" },
          { text: "Tonic seizures: sustained muscle contraction" },
          { text: "Clonic seizures: rhythmic jerking movements" }
        ],
        diagnosticFindings: [
          { text: "Generalized spike-wave discharges or polyspike and wave on EEG" },
          { text: "Normal MRI in genetic generalized epilepsies" },
          { text: "May have abnormal MRI in symptomatic generalized epilepsies" }
        ],
        causes: [
          { text: "Genetic (primary generalized epilepsy)" },
          { text: "Developmental and epileptic encephalopathies" },
          { text: "Metabolic disorders" },
          { text: "Diffuse brain injury or malformation" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Status Epilepticus",
        slug: "status-epilepticus",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Status epilepticus (SE) is a neurological emergency characterized by seizures that are prolonged or occur in succession without recovery between them. It can result in neuronal injury, systemic complications, and if untreated, death."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Classification" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "SE is classified based on motor symptoms and level of consciousness. Convulsive status epilepticus (CSE) involves ongoing tonic-clonic seizures and is the most life-threatening form. Non-convulsive status epilepticus (NCSE) presents with altered mental status without prominent motor features and requires EEG for diagnosis."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Management follows a time-sensitive algorithmic approach. Initial treatment includes benzodiazepines (lorazepam, midazolam, or diazepam). If seizures persist, second-line therapy with fosphenytoin, valproate, or levetiracetam is initiated. Refractory SE requires anesthetic doses of midazolam, propofol, or pentobarbital, with continuous EEG monitoring."
              }
            ]
          }
        ]
      },
      {
        title: "Antiseizure Medications",
        slug: "antiseizure-medications",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Antiseizure medications (ASMs) are the mainstay of epilepsy treatment. The goal is seizure freedom with minimal side effects, typically starting with monotherapy and adding or switching medications if needed."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Broad-Spectrum ASMs" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Broad-spectrum ASMs are effective for both focal and generalized seizures and include valproate, lamotrigine, levetiracetam, topiramate, and zonisamide. The choice depends on factors such as age, gender, comorbidities, and potential drug interactions."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Narrow-Spectrum ASMs" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Narrow-spectrum ASMs are primarily effective for focal seizures and include carbamazepine, phenytoin, oxcarbazepine, and lacosamide. Some may worsen certain generalized seizure types. Special considerations include teratogenicity, drug interactions (especially with enzyme-inducing ASMs), and specific adverse effects profile."
              }
            ]
          }
        ]
      }
    ]
  },
  // Musculoskeletal System Topics
  {
    title: "Osteoarthritis",
    slug: "osteoarthritis",
    introduction: "Osteoarthritis (OA) is the most common form of arthritis, characterized by progressive damage to articular cartilage and subchondral bone, leading to joint pain, stiffness, and functional impairment. It affects millions of people worldwide and is a leading cause of disability in older adults.",
    diagnosis_overview: "Diagnosis is primarily clinical, based on history, physical examination, and typical radiographic findings. Laboratory tests are generally normal but may help exclude other forms of arthritis. The severity of radiographic changes often does not correlate with symptom severity.",
    management: "Management is multimodal, including non-pharmacological approaches (exercise, weight loss), pharmacological therapy for symptom relief, and surgical interventions for advanced disease. The goal is to reduce pain, improve function, and enhance quality of life.",
    highyieldPoints: "- Know the risk factors and pathophysiology of osteoarthritis\n- Understand the approach to non-pharmacological and pharmacological management\n- Be familiar with the indications for surgical intervention",
    systemIndex: 4, // Reference to Musculoskeletal System
    types: [
      {
        name: "Primary Osteoarthritis",
        abbreviation: "POA",
        anchor_id: "primary-osteoarthritis",
        description: "Primary osteoarthritis occurs without a known underlying cause and is often related to aging and cumulative joint stress.",
        symptoms: [
          { text: "Joint pain that worsens with activity and improves with rest" },
          { text: "Morning stiffness that resolves within 30 minutes" },
          { text: "Reduced range of motion" },
          { text: "Joint crepitus" },
          { text: "Variable degrees of joint swelling" }
        ],
        diagnosticFindings: [
          { text: "Radiographic findings: joint space narrowing, subchondral sclerosis, osteophytes, subchondral cysts" },
          { text: "Normal inflammatory markers (ESR, CRP)" },
          { text: "Normal synovial fluid analysis (except in inflammatory phase)" }
        ],
        causes: [
          { text: "Age-related changes in cartilage" },
          { text: "Genetic predisposition" },
          { text: "Obesity" },
          { text: "Female gender" },
          { text: "Joint malalignment" }
        ]
      },
      {
        name: "Secondary Osteoarthritis",
        abbreviation: "SOA",
        anchor_id: "secondary-osteoarthritis",
        description: "Secondary osteoarthritis develops as a result of a specific underlying condition or event that damages the joint.",
        symptoms: [
          { text: "Similar to primary OA but may present at a younger age" },
          { text: "May have atypical distribution based on underlying cause" },
          { text: "Can be more rapidly progressive" }
        ],
        diagnosticFindings: [
          { text: "Radiographic findings similar to primary OA" },
          { text: "May have additional findings related to underlying condition" },
          { text: "Normal inflammatory markers unless underlying inflammatory condition present" }
        ],
        causes: [
          { text: "Previous joint trauma or injury" },
          { text: "Congenital or developmental joint abnormalities" },
          { text: "Metabolic disorders (e.g., hemochromatosis, ochronosis)" },
          { text: "Inflammatory arthritis (e.g., rheumatoid arthritis, gout)" },
          { text: "Avascular necrosis" },
          { text: "Joint infection" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Non-pharmacological Management of Osteoarthritis",
        slug: "non-pharmacological-management-of-osteoarthritis",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Non-pharmacological approaches are the foundation of osteoarthritis management and should be initiated for all patients regardless of disease severity."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Exercise and Physical Therapy" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Regular exercise is one of the most effective interventions for OA, improving pain, function, and quality of life. Land-based exercises include strengthening, aerobic, and flexibility exercises. Aquatic exercises are particularly beneficial for those with significant pain or mobility limitations. Physical therapy can provide tailored exercise programs and manual therapy."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Weight Management and Other Interventions" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Weight loss is strongly recommended for overweight or obese patients with OA, particularly of weight-bearing joints. A 10% weight loss can lead to significant symptom improvement. Other interventions include assistive devices (canes, walkers, braces), appropriate footwear, thermal modalities (heat or cold), and psychosocial support to address the impact of chronic pain."
              }
            ]
          }
        ]
      },
      {
        title: "Pharmacological and Surgical Management of Osteoarthritis",
        slug: "pharmacological-and-surgical-management-of-osteoarthritis",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Pharmacological and surgical interventions for osteoarthritis are considered when non-pharmacological approaches provide insufficient relief or when disease progression significantly impacts quality of life."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Pharmacological Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Acetaminophen provides modest pain relief with a favorable safety profile. Nonsteroidal anti-inflammatory drugs (NSAIDs) are more effective for pain but carry risks of gastrointestinal, cardiovascular, and renal adverse effects. Topical NSAIDs are recommended for hand and knee OA, with efficacy and fewer systemic side effects. Intra-articular corticosteroid injections provide short-term relief for inflammatory flares. Intra-articular hyaluronic acid injections may provide longer-term relief for some patients, though evidence is mixed. Duloxetine may help with chronic pain associated with OA."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Surgical Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Surgical options include arthroscopic procedures, osteotomy to realign the joint, and joint replacement (arthroplasty). Total joint replacement is highly effective for end-stage OA, providing significant pain relief and functional improvement. The timing of surgery depends on pain severity, functional limitation, radiographic changes, and patient preferences and goals."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Rheumatoid Arthritis",
    slug: "rheumatoid-arthritis",
    introduction: "Rheumatoid arthritis (RA) is a chronic, systemic autoimmune inflammatory disease that primarily affects synovial joints, leading to inflammation, pain, stiffness, and eventual joint destruction if untreated. It affects approximately 1% of the population and is more common in women.",
    diagnosis_overview: "Diagnosis is based on clinical presentation, laboratory findings (rheumatoid factor, anti-citrullinated protein antibodies), and imaging studies. Early diagnosis and treatment are crucial to prevent joint damage and disability.",
    management: "Management has evolved significantly with the treat-to-target approach, aiming for remission or low disease activity. It includes conventional synthetic disease-modifying antirheumatic drugs (DMARDs), biologic DMARDs, targeted synthetic DMARDs, and supportive measures.",
    highyieldPoints: "- Know the clinical and laboratory features of rheumatoid arthritis\n- Understand the approach to DMARD therapy and the treat-to-target strategy\n- Be familiar with the extra-articular manifestations of RA",
    systemIndex: 4, // Reference to Musculoskeletal System
    types: [
      {
        name: "Seropositive Rheumatoid Arthritis",
        abbreviation: "SRA",
        anchor_id: "seropositive-ra",
        description: "Seropositive RA is characterized by the presence of rheumatoid factor (RF) and/or anti-citrullinated protein antibodies (ACPA) in the blood, which are autoantibodies associated with the disease.",
        symptoms: [
          { text: "Symmetric polyarthritis, often starting in small joints" },
          { text: "Morning stiffness lasting more than one hour" },
          { text: "Joint swelling, tenderness, and warmth" },
          { text: "Rheumatoid nodules" },
          { text: "Fatigue and systemic symptoms" }
        ],
        diagnosticFindings: [
          { text: "Positive RF and/or ACPA (anti-CCP antibodies)" },
          { text: "Elevated inflammatory markers (ESR, CRP)" },
          { text: "Radiographic changes: erosions, joint space narrowing" },
          { text: "Synovitis on ultrasound or MRI" }
        ],
        causes: [
          { text: "Genetic predisposition (HLA-DR4)" },
          { text: "Environmental triggers (smoking)" },
          { text: "Autoimmune dysregulation" }
        ]
      },
      {
        name: "Seronegative Rheumatoid Arthritis",
        abbreviation: "SNRA",
        anchor_id: "seronegative-ra",
        description: "Seronegative RA presents with clinical features of RA but without detectable RF or ACPA in the blood.",
        symptoms: [
          { text: "Similar to seropositive RA, with symmetric polyarthritis" },
          { text: "May have less severe disease and better prognosis" },
          { text: "Less likely to have extra-articular manifestations" }
        ],
        diagnosticFindings: [
          { text: "Negative RF and ACPA" },
          { text: "Elevated inflammatory markers (ESR, CRP)" },
          { text: "Radiographic changes may be less severe or delayed" },
          { text: "Synovitis on ultrasound or MRI" }
        ],
        causes: [
          { text: "Genetic factors different from seropositive RA" },
          { text: "Environmental triggers" },
          { text: "May represent a heterogeneous group of inflammatory arthritides" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Extra-articular Manifestations of Rheumatoid Arthritis",
        slug: "extra-articular-manifestations-of-rheumatoid-arthritis",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Rheumatoid arthritis is a systemic disease that can affect multiple organ systems beyond the joints. Extra-articular manifestations (EAMs) can significantly impact morbidity and mortality."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Common Manifestations" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Rheumatoid nodules are subcutaneous nodules typically found over extensor surfaces. Pulmonary involvement includes interstitial lung disease, pleural effusions, and nodules. Cardiovascular manifestations include accelerated atherosclerosis, pericarditis, and valvular disease. Ocular manifestations include scleritis, episcleritis, and keratoconjunctivitis sicca. Hematologic abnormalities include anemia of chronic disease and Felty's syndrome."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Risk Factors and Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "EAMs are more common in seropositive RA, especially with high antibody titers, and in those with severe, active disease. Management involves controlling the underlying RA with appropriate DMARD therapy and treating specific organ involvement as needed. Screening for and addressing cardiovascular risk factors is particularly important."
              }
            ]
          }
        ]
      },
      {
        title: "Disease-Modifying Antirheumatic Drugs",
        slug: "disease-modifying-antirheumatic-drugs",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Disease-modifying antirheumatic drugs (DMARDs) are the cornerstone of RA treatment, aimed at reducing inflammation, preventing joint damage, and improving long-term outcomes."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Conventional Synthetic DMARDs" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Methotrexate is the anchor drug in RA treatment, with efficacy, favorable long-term safety profile, and cost-effectiveness. Other csDMARDs include leflunomide, sulfasalazine, and hydroxychloroquine. Combinations of csDMARDs may be used for increased efficacy."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Biologic and Targeted Synthetic DMARDs" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Biologic DMARDs include TNF inhibitors (etanercept, adalimumab, infliximab, golimumab, certolizumab pegol), IL-6 receptor antagonists (tocilizumab, sarilumab), T-cell costimulation modulator (abatacept), and B-cell depleting therapy (rituximab). Targeted synthetic DMARDs include JAK inhibitors (tofacitinib, baricitinib, upadacitinib). The choice of therapy depends on patient characteristics, comorbidities, and previous treatment responses."
              }
            ]
          }
        ]
      }
    ]
  }
];

// Card data
const cardsData = [
  // Cardiovascular System Cards
  {
    question_text: "What is the primary difference between systolic and diastolic heart failure?",
    scenario: "A 68-year-old woman presents with exertional dyspnea, orthopnea, and lower extremity edema. Her echocardiogram shows preserved left ventricular ejection fraction (60%).",
    card_type: "clinical-vignette",
    options: {
      a: "Systolic failure has reduced ejection fraction; diastolic has preserved ejection fraction",
      b: "Systolic failure primarily affects younger patients; diastolic affects older patients",
      c: "Systolic failure responds to diuretics; diastolic failure does not",
      d: "Systolic failure shows ventricular dilation; diastolic shows normal ventricular size"
    },
    correct_answer: "a",
    explanation: "Heart failure is classified as heart failure with reduced ejection fraction (HFrEF, previously called systolic heart failure) when EF is ≤40%, and heart failure with preserved ejection fraction (HFpEF, previously called diastolic heart failure) when EF is ≥50%. Both types can present with similar symptoms of fluid overload, but the underlying pathophysiology differs. In HFrEF, there is impaired contractility, while in HFpEF, there is impaired relaxation and filling of the ventricle.",
    topicIndex: 0 // Reference to Heart Failure topic
  },
  {
    question_text: "Which of the following is a characteristic ECG finding in acute ST-elevation myocardial infarction (STEMI)?",
    scenario: "A 55-year-old man with a history of hypertension and smoking presents to the emergency department with crushing chest pain radiating to the left arm and jaw for the past hour.",
    card_type: "clinical-vignette",
    options: {
      a: "ST-segment depression in contiguous leads",
      b: "ST-segment elevation of ≥1 mm in two or more contiguous leads",
      c: "T-wave inversion only",
      d: "Left bundle branch block that was present on previous ECGs"
    },
    correct_answer: "b",
    explanation: "The diagnostic criteria for STEMI include ST-segment elevation of ≥1 mm in two or more contiguous leads (except in V2-V3 where it should be ≥2 mm in men and ≥1.5 mm in women). ST depression represents subendocardial ischemia and is seen in NSTEMI. T-wave inversion may be seen in both STEMI and NSTEMI. A new left bundle branch block can suggest STEMI, but a pre-existing one does not.",
    topicIndex: 1 // Reference to Coronary Artery Disease topic
  },

  // Respiratory System Cards
  {
    question_text: "Which of the following medications is most appropriate for a step-up in therapy for a patient with moderate persistent asthma who remains symptomatic on low-dose inhaled corticosteroids?",
    scenario: "A 25-year-old woman with asthma has been using low-dose fluticasone inhaler daily for 3 months. She continues to have symptoms 3-4 times per week and uses her albuterol inhaler about twice weekly. Her FEV1 is 75% predicted.",
    card_type: "clinical-vignette",
    options: {
      a: "Add a long-acting beta-agonist (LABA)",
      b: "Add a leukotriene receptor antagonist (LTRA)",
      c: "Switch to a short-acting muscarinic antagonist (SAMA)",
      d: "Increase to high-dose inhaled corticosteroid (ICS)"
    },
    correct_answer: "a",
    explanation: "For a patient with moderate persistent asthma who remains symptomatic on low-dose ICS, the recommended step-up therapy is to add a long-acting beta-agonist (LABA). This combination provides better symptom control than increasing the ICS dose. Adding a leukotriene receptor antagonist is an alternative but less effective than adding a LABA. Short-acting muscarinic antagonists are used as rescue medications, not as controller therapy. Increasing to high-dose ICS is usually reserved for patients with severe asthma or those who have failed combination therapy.",
    topicIndex: 2 // Reference to Asthma topic
  },
  {
    question_text: "Which of the following is most consistent with COPD rather than asthma?",
    scenario: "A 62-year-old man with a 40 pack-year smoking history presents with progressive dyspnea on exertion, chronic cough, and occasional sputum production. Pulmonary function tests show post-bronchodilator FEV1/FVC of 0.65.",
    card_type: "clinical-vignette",
    options: {
      a: "Complete reversibility of airflow obstruction with bronchodilators",
      b: "Onset of symptoms in childhood",
      c: "Persistent airflow limitation (post-bronchodilator FEV1/FVC < 0.7)",
      d: "Normal diffusion capacity (DLCO)"
    },
    correct_answer: "c",
    explanation: "COPD is characterized by persistent airflow limitation, defined as a post-bronchodilator FEV1/FVC < 0.7, which is not fully reversible. Asthma typically shows significant reversibility with bronchodilators. COPD usually begins in middle or older age, particularly in smokers, while asthma often begins in childhood. DLCO is often reduced in COPD, especially in emphysema, due to loss of alveolar-capillary surface area, whereas it is usually normal in asthma.",
    topicIndex: 3 // Reference to COPD topic
  },

  // Gastrointestinal System Cards
  {
    question_text: "Which of the following findings best differentiates Crohn's disease from ulcerative colitis?",
    scenario: "A 24-year-old man presents with a 3-month history of abdominal pain, diarrhea, and a 10-pound weight loss. Colonoscopy is performed to evaluate for inflammatory bowel disease.",
    card_type: "clinical-vignette",
    options: {
      a: "Continuous inflammation from the rectum proximally",
      b: "Skip lesions throughout the gastrointestinal tract",
      c: "Bloody diarrhea",
      d: "Response to 5-aminosalicylates"
    },
    correct_answer: "b",
    explanation: "Skip lesions, or areas of inflammation interspersed with normal mucosa, are characteristic of Crohn's disease. In contrast, ulcerative colitis typically presents with continuous inflammation starting from the rectum and extending proximally. Bloody diarrhea is more common in ulcerative colitis but can occur in Crohn's disease as well. 5-aminosalicylates are more effective in ulcerative colitis but may be used in mild Crohn's disease affecting the colon.",
    topicIndex: 4 // Reference to IBD topic
  },
  {
    question_text: "What is the most appropriate initial test for a patient with suspected H. pylori infection who has not been on recent antibiotic or PPI therapy?",
    scenario: "A 45-year-old woman presents with epigastric pain that improves with food. She has no alarm symptoms and has not taken antibiotics or PPIs in the past month.",
    card_type: "clinical-vignette",
    options: {
      a: "Serologic testing for H. pylori antibodies",
      b: "Urea breath test",
      c: "Stool antigen test",
      d: "Upper endoscopy with biopsy for rapid urease test"
    },
    correct_answer: "b",
    explanation: "The urea breath test and stool antigen test are the preferred non-invasive tests for H. pylori diagnosis in patients who have not recently been on antibiotics or proton pump inhibitors (PPIs). Both have high sensitivity and specificity. The urea breath test is slightly more accurate but also more expensive. Serologic testing can remain positive after eradication and is not recommended for initial diagnosis. Upper endoscopy with biopsy is invasive and reserved for patients with alarm symptoms or those who require endoscopy for other reasons.",
    topicIndex: 5 // Reference to Peptic Ulcer Disease topic
  },

  // Nervous System Cards
  {
    question_text: "What is the recommended time window for intravenous thrombolysis with recombinant tissue plasminogen activator (rtPA) in acute ischemic stroke?",
    scenario: "A 72-year-old man presents to the emergency department with sudden onset of right-sided weakness and slurred speech that began 3 hours ago. CT scan of the head shows no hemorrhage or early ischemic changes.",
    card_type: "clinical-vignette",
    options: {
      a: "Within 3 hours of symptom onset for all patients",
      b: "Within 4.5 hours of symptom onset for selected patients",
      c: "Within 6 hours of symptom onset for all patients",
      d: "Within 24 hours of symptom onset for selected patients"
    },
    correct_answer: "b",
    explanation: "Intravenous rtPA is recommended within 3 hours of symptom onset for all eligible patients with acute ischemic stroke. The time window can be extended to 4.5 hours for selected patients who meet specific criteria (age ≤80 years, no history of both diabetes and prior stroke, NIHSS score ≤25, not taking oral anticoagulants, and no evidence of ischemic injury involving more than one-third of the MCA territory on imaging). The 6-hour window applies to mechanical thrombectomy for large vessel occlusion, and selected patients may be eligible for thrombectomy up to 24 hours based on perfusion imaging.",
    topicIndex: 6 // Reference to Stroke topic
  },
  {
    question_text: "Which of the following anti-seizure medications is most appropriate as first-line therapy for focal seizures in a woman of childbearing age?",
    scenario: "A 25-year-old woman presents with two unprovoked focal seizures in the past month. MRI shows a small area of cortical dysplasia in the left temporal lobe. She is planning to become pregnant in the next year.",
    card_type: "clinical-vignette",
    options: {
      a: "Valproic acid",
      b: "Carbamazepine",
      c: "Lamotrigine",
      d: "Phenytoin"
    },
    correct_answer: "c",
    explanation: "Lamotrigine is considered one of the safer anti-seizure medications during pregnancy and is often preferred for women of childbearing age. It has a low risk of teratogenicity compared to valproic acid, which is contraindicated during pregnancy due to its high risk of neural tube defects and other malformations. Carbamazepine and phenytoin are also associated with teratogenic effects, though to a lesser extent than valproic acid. Additionally, lamotrigine is effective for focal seizures and generally well-tolerated.",
    topicIndex: 7 // Reference to Seizure Disorders topic
  },

  // Musculoskeletal System Cards
  {
    question_text: "Which of the following is the most appropriate initial pharmacological therapy for a patient with symptomatic knee osteoarthritis?",
    scenario: "A 65-year-old man with a BMI of 28 kg/m² presents with a 6-month history of bilateral knee pain that worsens with activity and improves with rest. X-rays show joint space narrowing and osteophytes.",
    card_type: "clinical-vignette",
    options: {
      a: "Acetaminophen",
      b: "Oral NSAID",
      c: "Topical NSAID",
      d: "Intra-articular corticosteroid injection"
    },
    correct_answer: "c",
    explanation: "Topical NSAIDs are recommended as first-line pharmacological therapy for knee osteoarthritis due to their favorable efficacy and safety profile. They provide pain relief comparable to oral NSAIDs but with fewer systemic side effects. Acetaminophen has limited efficacy in osteoarthritis. Oral NSAIDs are effective but carry risks of gastrointestinal, cardiovascular, and renal adverse effects, especially in older adults. Intra-articular corticosteroid injections are typically reserved for acute flares or when other therapies have failed.",
    topicIndex: 8 // Reference to Osteoarthritis topic
  },
  {
    question_text: "Which of the following laboratory findings is most specific for rheumatoid arthritis?",
    scenario: "A 40-year-old woman presents with a 3-month history of symmetric polyarthritis involving the hands, wrists, and feet, along with morning stiffness lasting 2 hours.",
    card_type: "clinical-vignette",
    options: {
      a: "Elevated C-reactive protein (CRP)",
      b: "Positive anti-nuclear antibody (ANA)",
      c: "Positive rheumatoid factor (RF)",
      d: "Positive anti-citrullinated protein antibody (ACPA)"
    },
    correct_answer: "d",
    explanation: "Anti-citrullinated protein antibodies (ACPA), also known as anti-CCP antibodies, are highly specific (>95%) for rheumatoid arthritis, though not as sensitive (50-70%). They can be detected early in the disease course and are associated with more severe, erosive disease. Rheumatoid factor has lower specificity (80-85%) and can be positive in other conditions such as infections, other autoimmune diseases, and in some healthy individuals, especially the elderly. Elevated CRP indicates inflammation but is non-specific. Positive ANA is more associated with systemic lupus erythematosus and other connective tissue diseases.",
    topicIndex: 9 // Reference to Rheumatoid Arthritis topic
  }
];
async function clearDatabase() {
    console.log('Clearing existing data...');
    try {
      // Delete cards first (they depend on topics)
      await axios.delete(
        `${STRAPI_URL}/api/cards`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        }
      );
      console.log('Cards deleted');
      
      // Delete subtopics next (they depend on topics)
      await axios.delete(
        `${STRAPI_URL}/api/subtopics`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        }
      );
      console.log('Subtopics deleted');
      
      // Delete topics next (they depend on systems)
      await axios.delete(
        `${STRAPI_URL}/api/topics`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        }
      );
      console.log('Topics deleted');
      
      // Delete systems last
      await axios.delete(
        `${STRAPI_URL}/api/systems`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        }
      );
      console.log('Systems deleted');
      
      console.log('Database cleared successfully');
    } catch (error) {
      console.error('Error clearing database:', error.response?.data?.error || error.message);
    }
  }
  
  async function handleEntity(entityType, entityData, parentIdField = null, parentId = null) {
    try {
      // Check if entity exists (by slug)
      const slug = entityData.slug;
      let findUrl = `${STRAPI_URL}/api/${entityType}?filters[slug][$eq]=${slug}`;
      
      const findResponse = await axios.get(findUrl, {
        headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
      });
      
      // If entity exists, delete it first
      if (findResponse.data.data && findResponse.data.data.length > 0) {
        const existingId = findResponse.data.data[0].id;
        console.log(`Found existing ${entityType} with ID ${existingId}, deleting...`);
        
        await axios.delete(`${STRAPI_URL}/api/${entityType}/${existingId}`, {
          headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
        });
        console.log(`Deleted ${entityType} with ID ${existingId}`);
      }
      
      // Prepare data for creation
      let createData = { ...entityData };
      
      // Add parent reference if needed
      if (parentIdField && parentId) {
        createData[parentIdField] = parentId;
      }
      
      // Create the entity
      const createResponse = await axios.post(
        `${STRAPI_URL}/api/${entityType}`,
        { data: createData },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        }
      );
      
      const newId = createResponse.data.data.id;
      console.log(`Created ${entityType}: ${entityData.name || entityData.title} (ID: ${newId})`);
      
      return {
        id: newId,
        name: entityData.name || entityData.title,
        slug: entityData.slug
      };
    } catch (error) {
      console.error(`Error handling ${entityType}:`, error.response?.data?.error || error.message);
      return null;
    }
  }
  function generateCardSlug(card) {
    if (!card.slug) {
      // Extract the first 50 characters of the question and create a slug
      const questionText = card.question_text.length > 50 
        ? card.question_text.substring(0, 50) 
        : card.question_text;
      
      return slugify(questionText, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
    }
    return card.slug;
  }
  async function seedDatabase() {
    console.log('Starting database seeding process...');
    const createdSystems = [];
    const createdTopics = [];
    const createdSubtopics = [];
    const createdCards = [];
  
    try {
      // Optional: Clear existing data first
      await clearDatabase();
      
      // 1. Create Systems
      console.log('\n--- Creating Systems ---');
      for (const system of systemsData) {
        try {
          const response = await axios.post(
            `${STRAPI_URL}/api/systems`,
            { data: system },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STRAPI_TOKEN}`
              }
            }
          );
          
          const systemId = response.data.data.id;
          console.log(`Created system: ${system.name} (ID: ${systemId})`);
          
          createdSystems.push({
            id: systemId,
            name: system.name,
            originalIndex: systemsData.indexOf(system)
          });
        } catch (error) {
          console.error(`Error creating system ${system.name}:`, error.response?.data?.error || error.message);
        }
      }
  
      // 2. Create Topics with Types included
      console.log('\n--- Creating Topics ---');
      for (const topic of topicsData) {
        try {
          const systemReference = createdSystems.find(s => s.originalIndex === topic.systemIndex);
          
          if (!systemReference) {
            console.error(`System reference not found for topic ${topic.title}`);
            continue;
          }
          
          // Format the types with proper nested component structure
          const formattedTypes = (topic.types || []).map(typeData => {
            return {
              name: typeData.name,
              abbreviation: typeData.abbreviation,
              anchor_id: typeData.anchor_id,
              description: typeData.description,
              symptoms: typeData.symptoms.map(item => ({ text: item.text })),
              diagnosticFindings: typeData.diagnosticFindings.map(item => ({ text: item.text })),
              causes: typeData.causes.map(item => ({ text: item.text }))
            };
          });
          
          // Create a topic with types included in the initial creation
          const topicToCreate = { 
            title: topic.title,
            slug: topic.slug,
            introduction: topic.introduction,
            diagnosis_overview: topic.diagnosis_overview,
            management: topic.management,
            highyieldPoints: topic.highyieldPoints,
            system: systemReference.id,
            types: formattedTypes
          };
          
          const response = await axios.post(
            `${STRAPI_URL}/api/topics`,
            { data: topicToCreate },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STRAPI_TOKEN}`
              }
            }
          );
          
          const topicId = response.data.data.id;
          console.log(`Created topic: ${topic.title} (ID: ${topicId}) with ${formattedTypes.length} types`);
          
          createdTopics.push({
            id: topicId,
            title: topic.title,
            originalIndex: topicsData.indexOf(topic)
          });
          
          // 3. Create Subtopics for this topic
          if (topic.subtopics && topic.subtopics.length > 0) {
            for (const subtopic of topic.subtopics) {
              try {
                // Generate a unique slug with a timestamp to avoid conflicts
                const uniqueSlug = `${subtopic.slug}-${Date.now()}`;
                
                const subtopicData = {
                  title: subtopic.title,
                  slug: uniqueSlug,
                  content: subtopic.content,
                  topic: topicId
                };
                
                const subtopicResponse = await axios.post(
                  `${STRAPI_URL}/api/subtopics`,
                  { data: subtopicData },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${STRAPI_TOKEN}`
                    }
                  }
                );
                
                const subtopicId = subtopicResponse.data.data.id;
                console.log(`Created subtopic: ${subtopic.title} (ID: ${subtopicId})`);
                
                createdSubtopics.push({
                  id: subtopicId,
                  title: subtopic.title
                });
              } catch (subtopicError) {
                console.error(`Error creating subtopic ${subtopic.title}:`, subtopicError.response?.data?.error || subtopicError.message);
              }
            }
          }
        } catch (topicError) {
          console.error(`Error creating topic ${topic.title}:`, topicError.response?.data?.error || topicError.message);
        }
      }
  
      // 4. Create Cards
      console.log('\n--- Creating Cards ---');
      for (const card of cardsData) {
        try {
          const topicReference = createdTopics.find(t => t.originalIndex === card.topicIndex);
          
          if (!topicReference) {
            console.error(`Topic reference not found for card "${card.question_text.substring(0, 30)}..."`);
            continue;
          }
          
          // Generate a unique slug with timestamp to avoid conflicts
          const uniqueSlug = `${generateCardSlug(card)}-${Date.now()}`;
          
          // Create a clean card object with a unique slug
          const cardData = { ...card };
          delete cardData.topicIndex;
          cardData.topic = topicReference.id;
          cardData.slug = uniqueSlug;
          
          const response = await axios.post(
            `${STRAPI_URL}/api/cards`,
            { data: cardData },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STRAPI_TOKEN}`
              }
            }
          );
          
          const cardId = response.data.data.id;
          console.log(`Created card: ${card.question_text.substring(0, 30)}... (ID: ${cardId})`);
          
          createdCards.push({
            id: cardId,
            question: card.question_text.substring(0, 30) + '...'
          });
        } catch (cardError) {
          console.error(`Error creating card "${card.question_text.substring(0, 30)}...":`, cardError.response?.data?.error || cardError.message);
        }
      }
  
      console.log('\n--- Seeding Complete ---');
      console.log(`Created ${createdSystems.length} systems`);
      console.log(`Created ${createdTopics.length} topics`);
      console.log(`Created ${createdSubtopics.length} subtopics`);
      console.log(`Created ${createdCards.length} cards`);
      
    } catch (error) {
      console.error('Fatal error during seeding:', error);
    }
  }
  // Execute the seed function
  seedDatabase()
    .then(() => console.log('Database seeding completed!'))
    .catch(err => console.error('Error in seed process:', err));