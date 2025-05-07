//seed-ssytems.js
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

// Systems data with updated percentages
const systemsData = [
  {
    name: "Cardiovascular System",
    slug: "cardiovascular-system",
    percentage: 11,
    order: 1
  },
  {
    name: "Pulmonary System",
    slug: "pulmonary-system",
    percentage: 9,
    order: 2
  },
  {
    name: "Gastrointestinal System/Nutrition",
    slug: "gastrointestinal-system-nutrition",
    percentage: 8,
    order: 3
  },
  {
    name: "Musculoskeletal System",
    slug: "musculoskeletal-system",
    percentage: 8,
    order: 4
  },
  {
    name: "Neurologic System",
    slug: "neurologic-system",
    percentage: 7,
    order: 5
  },
  {
    name: "Psychiatry/Behavioral Science",
    slug: "psychiatry-behavioral-science",
    percentage: 7,
    order: 6
  },
  {
    name: "Infectious Diseases",
    slug: "infectious-diseases",
    percentage: 7,
    order: 7
  },
  {
    name: "Reproductive System",
    slug: "reproductive-system",
    percentage: 7,
    order: 8
  },
  {
    name: "Endocrine System",
    slug: "endocrine-system",
    percentage: 6,
    order: 9
  },
  {
    name: "Eyes, Ears, Nose, and Throat",
    slug: "eyes-ears-nose-throat",
    percentage: 6,
    order: 10
  },
  {
    name: "Professional Practice",
    slug: "professional-practice",
    percentage: 6,
    order: 11
  },
  {
    name: "Hematologic System",
    slug: "hematologic-system",
    percentage: 5,
    order: 12
  },
  {
    name: "Renal System",
    slug: "renal-system",
    percentage: 5,
    order: 13
  },
  {
    name: "Dermatologic System",
    slug: "dermatologic-system",
    percentage: 4,
    order: 14
  },
  {
    name: "Genitourinary System",
    slug: "genitourinary-system",
    percentage: 4,
    order: 15
  }
];

// Topics data (will be linked to systems when created)
const topicsData = [
  // 1. Cardiovascular System Topics
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
  {
    title: "Valvular Heart Disease",
    slug: "valvular-heart-disease",
    introduction: "Valvular heart disease encompasses disorders of the heart valves that affect blood flow through the heart. It can involve stenosis (narrowing) or regurgitation (leakage) of one or more valves, leading to pressure or volume overload on the cardiac chambers.",
    diagnosis_overview: "Diagnosis relies on clinical assessment, auscultation of characteristic murmurs, echocardiography, and in some cases, cardiac catheterization or advanced imaging. Severity assessment is crucial for determining management strategies.",
    management: "Management depends on the valve affected, the type and severity of the lesion, and patient symptoms. Options include medical therapy, transcatheter interventions, and surgical valve repair or replacement.",
    highyieldPoints: "- Understand the pathophysiology and hemodynamic effects of different valvular lesions\n- Know the characteristic murmurs and clinical findings of common valvular disorders\n- Be familiar with the indications for intervention in different valve diseases",
    systemIndex: 0, // Reference to Cardiovascular System
    types: [
      {
        name: "Aortic Stenosis",
        abbreviation: "AS",
        anchor_id: "aortic-stenosis",
        description: "Aortic stenosis is the narrowing of the aortic valve opening, causing obstruction to blood flow from the left ventricle to the aorta.",
        symptoms: [
          { text: "Exertional dyspnea" },
          { text: "Angina" },
          { text: "Syncope or presyncope" },
          { text: "Heart failure symptoms in advanced disease" }
        ],
        diagnosticFindings: [
          { text: "Harsh, crescendo-decrescendo systolic murmur at right upper sternal border" },
          { text: "Delayed carotid upstroke (pulsus parvus et tardus)" },
          { text: "Reduced valve area and increased gradient on echocardiography" },
          { text: "Left ventricular hypertrophy" }
        ],
        causes: [
          { text: "Age-related calcific degeneration (most common in adults)" },
          { text: "Congenital bicuspid aortic valve" },
          { text: "Rheumatic heart disease" },
          { text: "Radiation therapy" }
        ]
      },
      {
        name: "Mitral Regurgitation",
        abbreviation: "MR",
        anchor_id: "mitral-regurgitation",
        description: "Mitral regurgitation is the backflow of blood from the left ventricle to the left atrium during systole due to improper closure of the mitral valve.",
        symptoms: [
          { text: "Dyspnea on exertion" },
          { text: "Fatigue" },
          { text: "Palpitations (atrial fibrillation)" },
          { text: "Heart failure symptoms in advanced disease" }
        ],
        diagnosticFindings: [
          { text: "Holosystolic murmur at apex radiating to axilla" },
          { text: "Hyperdynamic precordium" },
          { text: "Left atrial enlargement" },
          { text: "Regurgitant jet on color Doppler echocardiography" }
        ],
        causes: [
          { text: "Primary (degenerative): Myxomatous degeneration, mitral valve prolapse" },
          { text: "Secondary (functional): Left ventricular dilation, papillary muscle dysfunction" },
          { text: "Rheumatic heart disease" },
          { text: "Infective endocarditis" },
          { text: "Congenital anomalies" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Transcatheter Valve Interventions",
        slug: "transcatheter-valve-interventions",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Transcatheter valve interventions have revolutionized the management of valvular heart disease, offering less invasive alternatives to conventional surgery for selected patients."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Transcatheter Aortic Valve Replacement (TAVR)" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "TAVR involves the implantation of a prosthetic valve within the diseased native aortic valve via catheter-based delivery. It has become the preferred treatment for severe aortic stenosis in high-risk and intermediate-risk patients, with expanding indications to include lower-risk populations. The procedure can be performed via transfemoral, transapical, or alternative access routes."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Transcatheter Mitral Valve Interventions" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Transcatheter mitral valve interventions include mitral valve repair (e.g., MitraClip for edge-to-edge repair) and transcatheter mitral valve replacement. These procedures are primarily used for high-risk patients with severe mitral regurgitation who are not candidates for conventional surgery. Patient selection requires comprehensive assessment by a multidisciplinary heart team."
              }
            ]
          }
        ]
      },
      {
        title: "Management of Prosthetic Valve Complications",
        slug: "management-of-prosthetic-valve-complications",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Patients with prosthetic heart valves are at risk for various complications that require specific management approaches."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Prosthetic Valve Thrombosis" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Prosthetic valve thrombosis is a potentially life-threatening complication, more common with mechanical valves and suboptimal anticoagulation. Diagnosis is made with echocardiography, fluoroscopy, or CT. Management depends on valve position, thrombus size, and patient condition, including optimization of anticoagulation, thrombolytic therapy, or emergency surgery."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Prosthetic Valve Endocarditis" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Prosthetic valve endocarditis (PVE) is classified as early (<1 year after implantation) or late (>1 year). It carries higher mortality than native valve endocarditis. Diagnosis relies on modified Duke criteria, with transesophageal echocardiography being more sensitive than transthoracic. Treatment includes prolonged antimicrobial therapy and often surgical intervention, especially for complicated cases."
              }
            ]
          }
        ]
      }
    ]
  },
  // 2. Pulmonary System Topics
  {
    title: "Asthma",
    slug: "asthma",
    introduction: "Asthma is a chronic inflammatory disorder of the airways characterized by variable and recurring symptoms, airflow obstruction, bronchial hyperresponsiveness, and underlying inflammation. It affects people of all ages and is one of the most common chronic diseases worldwide.",
    diagnosis_overview: "Diagnosis is based on the presence of characteristic symptom patterns and evidence of variable airflow limitation. Pulmonary function tests, especially spirometry with bronchodilator reversibility, are essential for confirming the diagnosis.",
    management: "Management includes education, environmental control, pharmacotherapy, and regular monitoring. The stepwise approach to therapy aims to achieve symptom control and minimize future risk of exacerbations and medication side effects.",
    highyieldPoints: "- Know the stepwise approach to asthma management\n- Understand the difference between controller and reliever medications\n- Be familiar with the approach to acute asthma exacerbations",
    systemIndex: 1, // Reference to Pulmonary System
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
    systemIndex: 1, // Reference to Pulmonary System
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
  {
    title: "Pulmonary Embolism",
    slug: "pulmonary-embolism",
    introduction: "Pulmonary embolism (PE) is a potentially life-threatening condition resulting from obstruction of one or more pulmonary arteries, most commonly due to blood clots that originate in the deep veins of the legs or pelvis (deep vein thrombosis).",
    diagnosis_overview: "Diagnosis requires a high index of suspicion based on risk factors and clinical presentation. Diagnostic approaches include D-dimer testing, imaging (CT pulmonary angiography, ventilation-perfusion scanning), and in some cases, echocardiography or pulmonary angiography.",
    management: "Management depends on risk stratification and includes anticoagulation, thrombolysis for high-risk patients, inferior vena cava filters in select cases, and supportive care. Prevention strategies are essential for high-risk individuals.",
    highyieldPoints: "- Know the risk factors for venous thromboembolism\n- Understand the approach to risk stratification in suspected PE\n- Be familiar with the indications for thrombolytic therapy versus anticoagulation alone",
    systemIndex: 1, // Reference to Pulmonary System
    types: [
      {
        name: "Acute Pulmonary Embolism",
        abbreviation: "APE",
        anchor_id: "acute-pe",
        description: "Acute pulmonary embolism refers to the sudden obstruction of pulmonary arterial blood flow, typically by a thrombus originating from deep vein thrombosis.",
        symptoms: [
          { text: "Dyspnea (most common symptom)" },
          { text: "Pleuritic chest pain" },
          { text: "Hemoptysis" },
          { text: "Syncope or presyncope" },
          { text: "Signs of deep vein thrombosis (leg swelling, pain)" }
        ],
        diagnosticFindings: [
          { text: "Elevated D-dimer (sensitive but not specific)" },
          { text: "Filling defects in pulmonary arteries on CT pulmonary angiography" },
          { text: "Ventilation-perfusion mismatch on V/Q scan" },
          { text: "Right ventricular strain on echocardiography in severe cases" },
          { text: "Hypoxemia and respiratory alkalosis on blood gas analysis" }
        ],
        causes: [
          { text: "Deep vein thrombosis" },
          { text: "Hypercoagulable states (e.g., malignancy, pregnancy, oral contraceptives)" },
          { text: "Immobilization" },
          { text: "Recent surgery or trauma" },
          { text: "Inherited thrombophilias" }
        ]
      },
      {
        name: "Chronic Thromboembolic Pulmonary Hypertension",
        abbreviation: "CTEPH",
        anchor_id: "cteph",
        description: "Chronic thromboembolic pulmonary hypertension develops when pulmonary emboli do not resolve and lead to persistent pulmonary artery obstruction and pulmonary hypertension.",
        symptoms: [
          { text: "Progressive dyspnea on exertion" },
          { text: "Fatigue" },
          { text: "Chest discomfort" },
          { text: "Syncope with exertion" },
          { text: "Signs of right heart failure in advanced disease" }
        ],
        diagnosticFindings: [
          { text: "Elevated pulmonary artery pressures on right heart catheterization" },
          { text: "Organized thromboembolic material in pulmonary arteries on CT or conventional pulmonary angiography" },
          { text: "Right ventricular hypertrophy and dilation on imaging" },
          { text: "Segmental perfusion defects on V/Q scan" }
        ],
        causes: [
          { text: "History of acute pulmonary embolism (often recurrent)" },
          { text: "Hypercoagulable states" },
          { text: "Splenectomy" },
          { text: "Ventriculoatrial shunt" },
          { text: "Inflammatory disorders" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Risk Stratification in Pulmonary Embolism",
        slug: "risk-stratification-in-pulmonary-embolism",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Risk stratification in pulmonary embolism is essential for determining appropriate treatment strategies and identifying patients who may benefit from more aggressive interventions."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Clinical Severity Assessment" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Patients are classified as high-risk (massive PE) if they present with shock or hypotension. Intermediate-risk (submassive PE) patients have normal blood pressure but evidence of right ventricular dysfunction or myocardial injury. Low-risk patients have normal blood pressure and no evidence of right ventricular dysfunction or myocardial injury."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Risk Assessment Tools" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Several validated tools assist in risk assessment, including the Pulmonary Embolism Severity Index (PESI) and simplified PESI (sPESI), which estimate 30-day mortality based on clinical parameters. The BOVA score and European Society of Cardiology model help identify intermediate-risk patients who may deteriorate and require closer monitoring."
              }
            ]
          }
        ]
      },
      {
        title: "Anticoagulation in Venous Thromboembolism",
        slug: "anticoagulation-in-venous-thromboembolism",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Anticoagulation is the cornerstone of treatment for venous thromboembolism (VTE), including pulmonary embolism and deep vein thrombosis."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Initial Anticoagulation" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Options for initial anticoagulation include low molecular weight heparin (LMWH), unfractionated heparin, fondaparinux, or direct oral anticoagulants (DOACs). In hemodynamically unstable patients, unfractionated heparin is preferred due to its shorter half-life and reversibility."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Long-term Anticoagulation" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Long-term anticoagulation options include vitamin K antagonists (e.g., warfarin) with target INR 2-3, DOACs (apixaban, dabigatran, edoxaban, rivaroxaban), or LMWH (particularly in cancer-associated thrombosis). The duration of therapy depends on whether the VTE was provoked or unprovoked, risk of recurrence, and bleeding risk."
              }
            ]
          }
        ]
      }
    ]
  },
  // 3. Gastrointestinal System/Nutrition Topics
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
  {
    title: "Liver Cirrhosis",
    slug: "liver-cirrhosis",
    introduction: "Liver cirrhosis is a late-stage liver disease characterized by fibrosis and nodular regeneration resulting from chronic liver injury. It represents the final common pathway for many chronic liver diseases and can lead to portal hypertension and liver failure.",
    diagnosis_overview: "Diagnosis is based on clinical features, laboratory tests, imaging studies, and in some cases, liver biopsy. Non-invasive assessment of fibrosis using elastography has gained prominence in recent years.",
    management: "Management focuses on treating the underlying cause, preventing progression, managing complications, and considering liver transplantation for appropriate candidates with decompensated cirrhosis.",
    highyieldPoints: "- Know the major causes of cirrhosis and their specific management\n- Understand the complications of portal hypertension and their treatment\n- Be familiar with the indications for liver transplantation and contraindications",
    systemIndex: 2, // Reference to Gastrointestinal System
    types: [
      {
        name: "Compensated Cirrhosis",
        abbreviation: "CC",
        anchor_id: "compensated-cirrhosis",
        description: "Compensated cirrhosis refers to the stage where the liver is still able to perform its essential functions despite structural damage. Patients may be asymptomatic or have mild, non-specific symptoms.",
        symptoms: [
          { text: "Fatigue" },
          { text: "Weight loss" },
          { text: "Anorexia" },
          { text: "Right upper quadrant discomfort" },
          { text: "Spider angiomata" },
          { text: "Palmar erythema" }
        ],
        diagnosticFindings: [
          { text: "Mildly elevated liver enzymes" },
          { text: "Thrombocytopenia" },
          { text: "Nodular liver surface on imaging" },
          { text: "Increased liver stiffness on elastography" },
          { text: "Esophageal varices on endoscopy in some patients" }
        ],
        causes: [
          { text: "Chronic hepatitis B or C" },
          { text: "Alcoholic liver disease" },
          { text: "Non-alcoholic steatohepatitis (NASH)" },
          { text: "Autoimmune hepatitis" },
          { text: "Hereditary hemochromatosis" },
          { text: "Primary biliary cholangitis" },
          { text: "Primary sclerosing cholangitis" }
        ]
      },
      {
        name: "Decompensated Cirrhosis",
        abbreviation: "DC",
        anchor_id: "decompensated-cirrhosis",
        description: "Decompensated cirrhosis occurs when the liver can no longer compensate for the extensive damage, leading to clinically evident complications of portal hypertension and liver dysfunction.",
        symptoms: [
          { text: "Jaundice" },
          { text: "Ascites" },
          { text: "Hepatic encephalopathy" },
          { text: "Variceal bleeding" },
          { text: "Coagulopathy" },
          { text: "Muscle wasting" },
          { text: "Edema" }
        ],
        diagnosticFindings: [
          { text: "Elevated bilirubin" },
          { text: "Hypoalbuminemia" },
          { text: "Prolonged prothrombin time" },
          { text: "Low sodium levels" },
          { text: "Renal dysfunction" },
          { text: "Features of portal hypertension on imaging" }
        ],
        causes: [
          { text: "Progression of compensated cirrhosis" },
          { text: "Acute insults (e.g., alcoholic hepatitis, drug-induced liver injury)" },
          { text: "Infections (spontaneous bacterial peritonitis)" },
          { text: "Gastrointestinal bleeding" },
          { text: "Hepatocellular carcinoma" }
        ]
      }
    ],
    subtopics: [
      {
        title: "Management of Portal Hypertension",
        slug: "management-of-portal-hypertension",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Portal hypertension is a major consequence of cirrhosis and the driving force behind many of its complications, including varices, ascites, and hepatic encephalopathy."
              }
            ]
          },
          {
            type: "heading",
            level: 3,
            children: [{ type: "text", text: "Variceal Bleeding Prevention and Management" }]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Primary prevention involves non-selective beta-blockers (propranolol, nadolol, carvedilol) or endoscopic variceal ligation for high-risk varices. Acute variceal bleeding is managed with hemodynamic stabilization, antibiotics, vasoactive drugs (octreotide, terlipressin), and endoscopic therapy. Secondary prevention combines beta-blockers with endoscopic ligation to prevent recurrence. Transjugular intrahepatic portosystemic shunt (TIPS) is considered for refractory or recurrent bleeding."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Ascites Management" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Management of ascites follows a stepwise approach, starting with sodium restriction and diuretics (spironolactone, furosemide). Refractory ascites may require large-volume paracentesis with albumin, TIPS, or evaluation for liver transplantation. Spontaneous bacterial peritonitis is a serious complication requiring prompt antibiotic treatment and prophylaxis in high-risk patients."
            }
          ]
        }
      ]
    },
    {
      title: "Hepatic Encephalopathy",
      slug: "hepatic-encephalopathy",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Hepatic encephalopathy (HE) is a neuropsychiatric complication of liver disease characterized by a spectrum of abnormalities ranging from subtle cognitive deficits to coma."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Pathophysiology and Precipitants" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The pathophysiology involves the accumulation of neurotoxins, particularly ammonia, that are normally metabolized by the liver. Common precipitants include gastrointestinal bleeding, infection, electrolyte disturbances, constipation, medications (especially sedatives), and non-compliance with previous therapy."
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
              text: "Management includes identifying and treating precipitating factors, reducing ammonia production and absorption with non-absorbable disaccharides (lactulose) and antibiotics (rifaximin), and supporting the patient through the episode. Recurrent HE may require long-term therapy with lactulose and rifaximin, and consideration of liver transplantation in appropriate candidates."
            }
          ]
        }
      ]
    }
  ]
},
// 4. Musculoskeletal System Topics
{
  title: "Osteoarthritis",
  slug: "osteoarthritis",
  introduction: "Osteoarthritis (OA) is the most common form of arthritis, characterized by progressive damage to articular cartilage and subchondral bone, leading to joint pain, stiffness, and functional impairment. It affects millions of people worldwide and is a leading cause of disability in older adults.",
  diagnosis_overview: "Diagnosis is primarily clinical, based on history, physical examination, and typical radiographic findings. Laboratory tests are generally normal but may help exclude other forms of arthritis. The severity of radiographic changes often does not correlate with symptom severity.",
  management: "Management is multimodal, including non-pharmacological approaches (exercise, weight loss), pharmacological therapy for symptom relief, and surgical interventions for advanced disease. The goal is to reduce pain, improve function, and enhance quality of life.",
  highyieldPoints: "- Know the risk factors and pathophysiology of osteoarthritis\n- Understand the approach to non-pharmacological and pharmacological management\n- Be familiar with the indications for surgical intervention",
  systemIndex: 3, // Reference to Musculoskeletal System
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
  systemIndex: 3, // Reference to Musculoskeletal System
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
},
{
  title: "Low Back Pain",
  slug: "low-back-pain",
  introduction: "Low back pain is one of the most common musculoskeletal complaints, affecting up to 80% of people at some point in their lives. It is a leading cause of disability worldwide. Most cases are non-specific and self-limiting, but proper assessment is essential to identify serious underlying conditions.",
  diagnosis_overview: "Diagnosis involves a thorough history and physical examination to identify red flags that may indicate serious pathology requiring urgent attention. Imaging is not routinely recommended for acute low back pain without red flags, as findings often do not correlate with symptoms.",
  management: "Management of acute non-specific low back pain focuses on education, reassurance, activity modification, and pain control. Chronic low back pain requires a multidisciplinary approach targeting both physical and psychosocial factors.",
  highyieldPoints: "- Know the red flags that suggest serious underlying pathology in low back pain\n- Understand the appropriate use of imaging and other diagnostic tests\n- Be familiar with evidence-based approaches to both acute and chronic low back pain",
  systemIndex: 3, // Reference to Musculoskeletal System
  types: [
    {
      name: "Acute Mechanical Low Back Pain",
      abbreviation: "AMLBP",
      anchor_id: "acute-mechanical-lbp",
      description: "Acute mechanical low back pain refers to symptoms lasting less than 4-6 weeks, typically related to muscle strain, ligament sprain, or minor dysfunction of spinal joints.",
      symptoms: [
        { text: "Pain localized to the lower back" },
        { text: "Pain that may radiate to the buttocks but not below the knee" },
        { text: "Pain exacerbated by certain movements or positions" },
        { text: "Muscle spasm and limited range of motion" },
        { text: "No neurological deficits" }
      ],
      diagnosticFindings: [
        { text: "Normal neurological examination" },
        { text: "No red flags on history or physical examination" },
        { text: "Imaging typically not indicated unless red flags present" }
      ],
      causes: [
        { text: "Muscle strain or ligament sprain" },
        { text: "Facet joint dysfunction" },
        { text: "Poor posture or body mechanics" },
        { text: "Deconditioning" }
      ]
    },
    {
      name: "Chronic Low Back Pain",
      abbreviation: "CLBP",
      anchor_id: "chronic-lbp",
      description: "Chronic low back pain is defined as pain persisting for 12 weeks or longer, often with a complex interplay of physical, psychological, and social factors.",
      symptoms: [
        { text: "Persistent or recurrent back pain" },
        { text: "Pain may be localized or diffuse" },
        { text: "Varying intensity and character" },
        { text: "Often associated with functional limitations" },
        { text: "May have psychosocial factors (depression, anxiety, fear-avoidance behaviors)" }
      ],
      diagnosticFindings: [
        { text: "May have normal or abnormal physical examination" },
        { text: "Imaging findings may not correlate with symptoms" },
        { text: "Psychosocial assessment often reveals contributing factors" }
      ],
      causes: [
        { text: "Degenerative disc disease" },
        { text: "Facet joint arthropathy" },
        { text: "Myofascial pain syndrome" },
        { text: "Multifactorial with central sensitization" },
        { text: "Previously unresolved acute back pain" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Radicular Low Back Pain",
      slug: "radicular-low-back-pain",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Radicular low back pain, often called sciatica, results from irritation or compression of a spinal nerve root, causing pain that radiates along the course of the affected nerve."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Features" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Typical features include pain radiating below the knee along a dermatomal distribution, often accompanied by paresthesias, numbness, or weakness in the affected dermatome or myotome. The straight leg raise test is often positive, reproducing the radicular pain when the affected leg is raised between 30-70 degrees. The most commonly affected nerve roots are L4-L5 and L5-S1."
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
              text: "Initial management is similar to non-specific low back pain, with education, activity modification, and pain control. Most cases resolve within 4-6 weeks. For persistent symptoms, options include epidural steroid injections and, in selected cases with corresponding imaging findings, surgical intervention. Absolute indications for surgery include cauda equina syndrome and progressive neurological deficit."
            }
          ]
        }
      ]
    },
    {
      title: "Multidisciplinary Approach to Chronic Low Back Pain",
      slug: "multidisciplinary-approach-to-chronic-low-back-pain",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Chronic low back pain often requires a multidisciplinary approach addressing both physical and psychosocial aspects of the condition."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Physical Interventions" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Exercise therapy is a cornerstone of treatment, focusing on strengthening core muscles, improving flexibility, and enhancing overall fitness. Physical therapy may include manual therapy, specific exercises, and education on proper body mechanics. Complementary approaches such as yoga, tai chi, and aquatic therapy may benefit some patients."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Psychological and Behavioral Interventions" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cognitive-behavioral therapy (CBT) addresses maladaptive thoughts and behaviors related to pain. Pain neuroscience education helps patients understand the neurophysiology of pain and reduces fear-avoidance behaviors. Mindfulness-based stress reduction improves pain acceptance and reduces associated distress. A biopsychosocial approach recognizes and addresses the interplay between biological, psychological, and social factors contributing to chronic pain."
            }
          ]
        }
      ]
    }
  ]
},
// 5. Neurologic System Topics
{
  title: "Stroke",
  slug: "stroke",
  introduction: "Stroke is a medical emergency characterized by a sudden loss of neurological function due to a disturbance in cerebral blood flow. It is a leading cause of disability and mortality worldwide. Strokes are broadly classified into ischemic (87%) and hemorrhagic (13%) types.",
  diagnosis_overview: "Diagnosis involves rapid clinical assessment using tools like the NIH Stroke Scale, neuroimaging (CT or MRI), and vascular imaging. Time is of the essence in stroke management, as earlier treatment leads to better outcomes.",
  management: "Management of ischemic stroke includes consideration of reperfusion therapies (IV thrombolysis, mechanical thrombectomy), antiplatelet therapy, and prevention of complications. Hemorrhagic stroke management focuses on controlling blood pressure, reversing anticoagulation if applicable, and in some cases, surgical intervention.",
  highyieldPoints: "- Know the time windows for thrombolysis and thrombectomy in acute ischemic stroke\n- Understand the different subtypes of ischemic stroke and their management\n- Be familiar with the approach to hemorrhagic stroke management",
  systemIndex: 4, // Reference to Neurologic System
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
  systemIndex: 4, // Reference to Neurologic System
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
{
  title: "Dementia",
  slug: "dementia",
  introduction: "Dementia is a syndrome characterized by progressive cognitive decline severe enough to interfere with daily functioning. It affects memory, thinking, orientation, comprehension, calculation, learning capacity, language, and judgment. While most common in older adults, dementia is not a normal part of aging.",
  diagnosis_overview: "Diagnosis involves a comprehensive assessment including detailed history, cognitive testing, physical and neurological examination, laboratory tests, and neuroimaging. Early and accurate diagnosis allows for appropriate treatment, support, and planning.",
  management: "Management is multifaceted, including pharmacological approaches for specific dementia types and symptoms, non-pharmacological interventions, caregiver support and education, and advance care planning. The focus is on maintaining function, quality of life, and dignity.",
  highyieldPoints: "- Know the different types of dementia and their distinguishing features\n- Understand the appropriate use of cognitive enhancers and management of behavioral symptoms\n- Be familiar with important safety considerations and support systems for patients and caregivers",
  systemIndex: 4, // Reference to Neurologic System
  types: [
    {
      name: "Alzheimer's Disease",
      abbreviation: "AD",
      anchor_id: "alzheimers-disease",
      description: "Alzheimer's disease is the most common cause of dementia, characterized by progressive loss of neurons and synapses due to accumulation of amyloid plaques and neurofibrillary tangles.",
      symptoms: [
        { text: "Early and prominent episodic memory impairment" },
        { text: "Progressive involvement of other cognitive domains" },
        { text: "Visuospatial deficits" },
        { text: "Language dysfunction" },
        { text: "Executive function impairment" },
        { text: "Behavioral and psychological symptoms in later stages" }
      ],
      diagnosticFindings: [
        { text: "Progressive cognitive decline on neuropsychological testing" },
        { text: "Temporal and parietal lobe atrophy on MRI" },
        { text: "Decreased glucose metabolism on FDG-PET" },
        { text: "Positive amyloid PET scan" },
        { text: "CSF biomarkers: decreased Aβ42, increased total tau and phospho-tau" }
      ],
      causes: [
        { text: "Age (primary risk factor)" },
        { text: "Genetic factors (APOE ε4 allele, rare mutations in APP, PSEN1, PSEN2)" },
        { text: "Vascular risk factors" },
        { text: "Low cognitive reserve" },
        { text: "Head trauma" }
      ]
    },
    {
      name: "Vascular Dementia",
      abbreviation: "VaD",
      anchor_id: "vascular-dementia",
      description: "Vascular dementia results from cerebrovascular disease causing significant ischemic or hemorrhagic brain injury. It can occur alone or coexist with other dementia types (mixed dementia).",
      symptoms: [
        { text: "Stepwise progression (in some cases)" },
        { text: "Executive dysfunction often more prominent than memory loss" },
        { text: "Focal neurological signs" },
        { text: "Gait disturbances and falls" },
        { text: "Urinary incontinence" },
        { text: "Mood disturbances" }
      ],
      diagnosticFindings: [
        { text: "Evidence of cerebrovascular disease on neuroimaging" },
        { text: "Strategic infarcts, multiple lacunar infarcts, or extensive white matter disease" },
        { text: "Temporal relationship between vascular events and cognitive decline" },
        { text: "Vascular risk factors" }
      ],
      causes: [
        { text: "Hypertension" },
        { text: "Diabetes mellitus" },
        { text: "Smoking" },
        { text: "Atrial fibrillation and other cardiac diseases" },
        { text: "Hyperlipidemia" },
        { text: "Cerebral amyloid angiopathy" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Pharmacological Management of Dementia",
      slug: "pharmacological-management-of-dementia",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Pharmacological management of dementia includes medications targeting cognitive symptoms and those addressing behavioral and psychological symptoms."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Cognitive Enhancers" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cholinesterase inhibitors (donepezil, rivastigmine, galantamine) are first-line treatments for mild to moderate Alzheimer's disease and some other dementia types. They modestly improve cognitive function and may delay functional decline. NMDA receptor antagonists (memantine) are used for moderate to severe Alzheimer's disease, either as monotherapy or in combination with cholinesterase inhibitors. Disease-modifying therapies targeting amyloid (aducanumab, lecanemab) have shown promise in slowing cognitive decline in early Alzheimer's disease but have limitations and potential side effects."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management of Behavioral and Psychological Symptoms" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Non-pharmacological approaches are first-line for behavioral and psychological symptoms of dementia (BPSD). When medication is necessary, choice depends on specific symptoms. Antidepressants, particularly SSRIs, are preferred for depression, anxiety, and some agitation. Antipsychotics may be considered for severe agitation, aggression, or psychosis, but carry significant risks including increased mortality in elderly patients with dementia. Use should be limited, with regular reassessment and attempts to discontinue. Benzodiazepines are generally avoided due to cognitive side effects and risk of falls, but may be used short-term for severe anxiety or agitation."
            }
          ]
        }
      ]
    },
    {
      title: "Non-Alzheimer's Dementias",
      slug: "non-alzheimers-dementias",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Several important forms of dementia have distinct clinical, pathological, and management features from Alzheimer's disease."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Lewy Body Dementia" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Lewy body dementia (LBD) includes dementia with Lewy bodies and Parkinson's disease dementia. It is characterized by alpha-synuclein aggregates (Lewy bodies) in the brain. Core features include fluctuating cognition, visual hallucinations, parkinsonism, and REM sleep behavior disorder. Patients are often extremely sensitive to antipsychotics, which should be avoided or used with great caution. Cholinesterase inhibitors can be particularly effective for cognitive and some neuropsychiatric symptoms."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Frontotemporal Dementia" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Frontotemporal dementia (FTD) is a heterogeneous group of disorders characterized by progressive degeneration of the frontal and temporal lobes. Clinical variants include behavioral variant FTD (prominent personality and behavior changes), semantic variant primary progressive aphasia (loss of word meaning), and nonfluent/agrammatic variant primary progressive aphasia (effortful speech, agrammatism). FTD has a stronger genetic component than other dementias and often presents at a younger age. Cholinesterase inhibitors and memantine are generally not effective. Management focuses on behavioral symptoms and supportive care."
            }
          ]
        }
      ]
    }
  ]
},
// 6. Psychiatry/Behavioral Science Topics
{
  title: "Major Depressive Disorder",
  slug: "major-depressive-disorder",
  introduction: "Major Depressive Disorder (MDD) is a common psychiatric condition characterized by persistent low mood, anhedonia, and a range of cognitive, behavioral, and physical symptoms that significantly impact functioning. It affects approximately 7% of adults annually and is a leading cause of disability worldwide.",
  diagnosis_overview: "Diagnosis requires at least five symptoms, including depressed mood or anhedonia, present for at least two weeks, causing significant distress or functional impairment, and not attributable to another medical condition or substance. Thorough evaluation includes assessment for suicide risk, psychotic features, bipolar disorder, and comorbid conditions.",
  management: "Management typically involves psychotherapy (particularly cognitive-behavioral therapy and interpersonal therapy), pharmacotherapy (antidepressants), or a combination of both. For severe or treatment-resistant cases, additional options include electroconvulsive therapy, transcranial magnetic stimulation, and newer approaches like ketamine.",
  highyieldPoints: "- Know the diagnostic criteria for major depressive disorder and how to assess suicide risk\n- Understand the different classes of antidepressants, their side effects, and appropriate selection\n- Be familiar with evidence-based psychotherapies and when to consider somatic treatments",
  systemIndex: 5, // Reference to Psychiatry/Behavioral Science
  types: [
    {
      name: "Major Depressive Disorder, Single Episode",
      abbreviation: "MDD-SE",
      anchor_id: "mdd-single-episode",
      description: "Major depressive disorder with only one documented episode of depression meeting full criteria.",
      symptoms: [
        { text: "Depressed mood most of the day, nearly every day" },
        { text: "Markedly diminished interest or pleasure in activities" },
        { text: "Significant weight loss or gain, or appetite changes" },
        { text: "Insomnia or hypersomnia" },
        { text: "Psychomotor agitation or retardation" },
        { text: "Fatigue or loss of energy" },
        { text: "Feelings of worthlessness or excessive guilt" },
        { text: "Diminished concentration or indecisiveness" },
        { text: "Recurrent thoughts of death or suicide" }
      ],
      diagnosticFindings: [
        { text: "Five or more symptoms present during the same 2-week period" },
        { text: "At least one symptom is depressed mood or loss of interest/pleasure" },
        { text: "Symptoms cause significant distress or functional impairment" },
        { text: "No history of manic, hypomanic, or mixed episodes" },
        { text: "Not attributable to physiological effects of a substance or medical condition" }
      ],
      causes: [
        { text: "Genetic factors" },
        { text: "Neurobiological factors (neurotransmitter dysregulation)" },
        { text: "Psychosocial stressors" },
        { text: "Medical conditions" },
        { text: "Medications" }
      ]
    },
    {
      name: "Major Depressive Disorder, Recurrent",
      abbreviation: "MDD-R",
      anchor_id: "mdd-recurrent",
      description: "Major depressive disorder with two or more episodes separated by at least two months during which criteria are not met for a major depressive episode.",
      symptoms: [
        { text: "Same symptoms as single episode MDD" },
        { text: "History of prior episodes" },
        { text: "May have pattern of seasonal occurrence (seasonal affective disorder)" },
        { text: "May have incomplete interepisode recovery" },
        { text: "May have increasing severity or frequency over time" }
      ],
      diagnosticFindings: [
        { text: "Same as single episode MDD" },
        { text: "Documentation of at least two separate episodes" },
        { text: "May have specific patterns (e.g., seasonal, postpartum onset)" },
        { text: "May have melancholic, atypical, or psychotic features" }
      ],
      causes: [
        { text: "Stronger genetic contribution than single episode" },
        { text: "Neurobiological factors" },
        { text: "Psychosocial stressors" },
        { text: "Previous episodes (strongest predictor of future episodes)" },
        { text: "Comorbid anxiety disorders or substance use" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Antidepressant Therapy",
      slug: "antidepressant-therapy",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Antidepressant medications are a cornerstone of treatment for moderate to severe major depressive disorder. Understanding their mechanisms, efficacy, side effects, and appropriate selection is essential for optimal management."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Classes of Antidepressants" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Selective serotonin reuptake inhibitors (SSRIs) are generally first-line due to their favorable side effect profile and safety. They include fluoxetine, sertraline, escitalopram, paroxetine, and citalopram. Serotonin-norepinephrine reuptake inhibitors (SNRIs) include venlafaxine, duloxetine, and desvenlafaxine, and may be particularly useful when pain symptoms are present. Atypical antidepressants include bupropion (useful in depression with fatigue or ADHD), mirtazapine (beneficial for insomnia and appetite loss), and vortioxetine (may have cognitive benefits). Tricyclic antidepressants and monoamine oxidase inhibitors are older classes with more side effects and drug interactions, typically reserved for treatment-resistant cases."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Principles of Treatment" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Antidepressant selection should consider symptom profile, comorbidities, previous response, potential side effects, and drug interactions. Full therapeutic effect typically takes 4-6 weeks, though some improvement may be seen earlier. Adequate trial duration (6-8 weeks at therapeutic dose) is necessary before considering a medication ineffective. Response monitoring should include standardized measures like the PHQ-9. If partial response, dose optimization or augmentation strategies may be considered. For non-response, switching to another antidepressant (within or between classes) is recommended. Continuation therapy (6-12 months after remission) reduces relapse risk. Maintenance therapy should be considered for recurrent depression, especially after multiple episodes."
            }
          ]
        }
      ]
    },
    {
      title: "Treatment-Resistant Depression",
      slug: "treatment-resistant-depression",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Treatment-resistant depression (TRD) generally refers to depression that has not responded adequately to at least two different antidepressant trials of adequate dose and duration. It affects approximately one-third of patients with major depressive disorder."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Assessment and Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Comprehensive reassessment should include verification of diagnosis (consider bipolar disorder, psychotic depression, or comorbid conditions), evaluation of treatment adherence, optimization of current therapy, and consideration of unaddressed psychosocial factors. Measurement-based care using standardized scales improves outcomes. Sequential treatment algorithms like the STAR*D approach provide evidence-based strategies for managing TRD systematically."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Advanced Treatment Options" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Pharmacological approaches include augmentation with atypical antipsychotics (aripiprazole, brexpiprazole, quetiapine), lithium, thyroid hormone, or combining antidepressants with different mechanisms. Neuromodulation treatments include electroconvulsive therapy (most effective treatment for TRD, especially with psychotic features), repetitive transcranial magnetic stimulation (rTMS), and vagus nerve stimulation. Novel approaches include ketamine and esketamine, which provide rapid but temporary antidepressant effects through glutamatergic mechanisms, and psychedelic-assisted therapy, which is currently under investigation. Intensive psychotherapeutic approaches, particularly cognitive-behavioral therapy adapted for TRD, can be valuable alone or in combination with other treatments."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Anxiety Disorders",
  slug: "anxiety-disorders",
  introduction: "Anxiety disorders are a group of related conditions characterized by excessive fear, anxiety, and related behavioral disturbances that cause significant distress or functional impairment. They are among the most common mental health disorders, affecting approximately 20% of adults in any given year.",
  diagnosis_overview: "Diagnosis requires careful assessment of the nature, onset, duration, and context of anxiety symptoms, as well as their impact on functioning. Differential diagnosis includes medical conditions, substance effects, and other psychiatric disorders. Specific anxiety disorders are distinguished by the focus of fear or anxiety.",
  management: "Management typically involves psychotherapy (particularly cognitive-behavioral therapy), pharmacotherapy, or a combination. Lifestyle modifications and stress management techniques are important adjuncts. Treatment should be tailored to the specific anxiety disorder, symptom severity, patient preferences, and comorbidities.",
  highyieldPoints: "- Know the diagnostic features of different anxiety disorders and their typical presentations\n- Understand the first-line pharmacological and psychotherapeutic approaches for each disorder\n- Be familiar with the relationship between anxiety disorders and common comorbidities",
  systemIndex: 5, // Reference to Psychiatry/Behavioral Science
  types: [
    {
      name: "Generalized Anxiety Disorder",
      abbreviation: "GAD",
      anchor_id: "generalized-anxiety-disorder",
      description: "Generalized anxiety disorder is characterized by persistent, excessive worry about a variety of topics, events, or activities that is difficult to control and accompanied by physiological symptoms.",
      symptoms: [
        { text: "Excessive anxiety and worry occurring more days than not for at least 6 months" },
        { text: "Difficulty controlling the worry" },
        { text: "Restlessness or feeling keyed up or on edge" },
        { text: "Fatigue" },
        { text: "Difficulty concentrating or mind going blank" },
        { text: "Irritability" },
        { text: "Muscle tension" },
        { text: "Sleep disturbance" }
      ],
      diagnosticFindings: [
        { text: "Three or more of the physical or cognitive symptoms" },
        { text: "Significant distress or functional impairment" },
        { text: "Not attributable to substances or medical conditions" },
        { text: "Not better explained by another mental disorder" }
      ],
      causes: [
        { text: "Genetic factors" },
        { text: "Neurobiological factors (hyperactive amygdala, abnormal neurotransmitter function)" },
        { text: "Environmental stressors" },
        { text: "Temperamental factors (behavioral inhibition, negative affectivity)" },
        { text: "Cognitive factors (intolerance of uncertainty, cognitive biases)" }
      ]
    },
    {
      name: "Panic Disorder",
      abbreviation: "PD",
      anchor_id: "panic-disorder",
      description: "Panic disorder is characterized by recurrent, unexpected panic attacks followed by persistent concern about future attacks or their consequences, or maladaptive behavior related to the attacks.",
      symptoms: [
        { text: "Recurrent unexpected panic attacks (sudden surge of intense fear reaching a peak within minutes)" },
        { text: "Physical symptoms during attacks: palpitations, sweating, trembling, shortness of breath, choking sensations, chest pain, nausea, dizziness, chills or heat sensations, paresthesias, derealization or depersonalization" },
        { text: "Psychological symptoms during attacks: fear of losing control, going crazy, or dying" },
        { text: "Persistent worry about having more attacks or their implications" },
        { text: "Significant change in behavior related to the attacks (e.g., avoidance)" }
      ],
      diagnosticFindings: [
        { text: "At least two unexpected panic attacks" },
        { text: "At least one month of worry about attacks or behavioral change" },
        { text: "Not attributable to substances or medical conditions" },
        { text: "Not better explained by another mental disorder" }
      ],
      causes: [
        { text: "Genetic factors" },
        { text: "Neurobiological factors (abnormal fear circuitry, respiratory dysregulation)" },
        { text: "Psychological factors (catastrophic misinterpretation of bodily sensations)" },
        { text: "Environmental factors (stressful life events)" },
        { text: "Temperamental factors (anxiety sensitivity)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Social Anxiety Disorder",
      slug: "social-anxiety-disorder",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Social anxiety disorder (SAD), previously known as social phobia, is characterized by marked fear or anxiety about one or more social situations in which the individual is exposed to possible scrutiny by others."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Features" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Core features include fear of negative evaluation, embarrassment, or humiliation in social situations. Common feared scenarios include public speaking, meeting new people, eating or writing in public, or using public restrooms. Physical symptoms may include blushing, sweating, trembling, racing heart, and gastrointestinal distress. Avoidance behavior is common and can lead to significant functional impairment. SAD typically has onset in adolescence and is often chronic if untreated."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Treatment Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cognitive-behavioral therapy (CBT) is first-line treatment, particularly with exposure therapy components targeting feared social situations. Group therapy can be especially effective as it provides built-in exposure opportunities. Pharmacotherapy options include SSRIs and SNRIs as first-line agents. Beta-blockers may be helpful for performance anxiety. Benzodiazepines have limited role due to dependence risk. Combination therapy (medication plus CBT) may be more effective than either alone for severe cases."
            }
          ]
        }
      ]
    },
    {
      title: "Cognitive-Behavioral Therapy for Anxiety Disorders",
      slug: "cognitive-behavioral-therapy-for-anxiety-disorders",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cognitive-behavioral therapy (CBT) is the most evidence-based psychotherapeutic approach for anxiety disorders, with demonstrated efficacy across different anxiety conditions."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Core Components" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Psychoeducation helps patients understand the nature of anxiety, its physiological basis, and the role of avoidance in maintaining anxiety. Cognitive restructuring targets identification and modification of maladaptive thought patterns that contribute to anxiety, such as catastrophizing, overestimating threat, and underestimating coping abilities. Exposure therapy involves systematic, graduated confrontation with feared stimuli or situations, allowing habituation and new learning to occur. For panic disorder, interoceptive exposure specifically targets fear of bodily sensations. Relaxation training and anxiety management techniques include diaphragmatic breathing, progressive muscle relaxation, and mindfulness practices."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Disorder-Specific Adaptations" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "For generalized anxiety disorder, additional components include worry time scheduling, problem-solving training, and intolerance of uncertainty work. For panic disorder, panic control treatment focuses on correcting catastrophic misinterpretations of bodily sensations and safety behaviors. For social anxiety disorder, attention training and video feedback can address self-focused attention and distorted self-image. For specific phobias, one-session treatment combining intensive exposure with cognitive techniques can be highly effective. For OCD, exposure and response prevention specifically targets rituals and avoidance behaviors related to obsessions."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Bipolar Disorders",
  slug: "bipolar-disorders",
  introduction: "Bipolar disorders are a spectrum of chronic mood disorders characterized by episodes of abnormally elevated mood (mania or hypomania) and, in most cases, episodes of depression. They are distinguished by the type and severity of mood episodes experienced and affect approximately 2-4% of the population.",
  diagnosis_overview: "Diagnosis requires careful assessment of current and past mood episodes, with particular attention to periods of abnormally elevated, expansive, or irritable mood and increased energy/activity. Differential diagnosis includes unipolar depression, psychotic disorders, substance-induced mood disorders, and personality disorders.",
  management: "Management typically involves mood stabilizers, atypical antipsychotics, and/or antidepressants (with caution), along with psychotherapy. Long-term maintenance treatment is usually necessary due to the chronic and recurrent nature of these disorders. Psychoeducation and lifestyle regularity are critical components of successful management.",
  highyieldPoints: "- Know the diagnostic criteria for manic, hypomanic, and major depressive episodes\n- Understand the role of different medication classes in acute and maintenance treatment of bipolar disorders\n- Be familiar with the risks of antidepressant monotherapy and strategies to minimize mood switch",
  systemIndex: 5, // Reference to Psychiatry/Behavioral Science
  types: [
    {
      name: "Bipolar I Disorder",
      abbreviation: "BP-I",
      anchor_id: "bipolar-i-disorder",
      description: "Bipolar I disorder is characterized by the occurrence of at least one manic episode, which may be preceded or followed by hypomanic or major depressive episodes.",
      symptoms: [
        { text: "Manic episodes: abnormally elevated, expansive, or irritable mood and increased energy/activity for at least 1 week, causing marked impairment" },
        { text: "During mania: inflated self-esteem/grandiosity, decreased need for sleep, pressured speech, flight of ideas, distractibility, increased goal-directed activity, and excessive involvement in risky activities" },
        { text: "May include psychotic features during severe manic episodes" },
        { text: "Major depressive episodes are common but not required for diagnosis" },
        { text: "Significant distress or functional impairment, especially during manic episodes" }
      ],
      diagnosticFindings: [
        { text: "At least one lifetime manic episode meeting duration criteria (≥7 days or hospitalization)" },
        { text: "Symptoms not better explained by schizoaffective disorder, schizophrenia, or other psychotic disorders" },
        { text: "Not attributable to physiological effects of a substance or medical condition" }
      ],
      causes: [
        { text: "Strong genetic component (heritability 70-80%)" },
        { text: "Neurobiological factors (neurotransmitter dysregulation, circadian rhythm abnormalities)" },
        { text: "Environmental triggers (stress, sleep disruption)" },
        { text: "Developmental factors" }
      ]
    },
    {
      name: "Bipolar II Disorder",
      abbreviation: "BP-II",
      anchor_id: "bipolar-ii-disorder",
      description: "Bipolar II disorder is characterized by the occurrence of at least one hypomanic episode and at least one major depressive episode, without any full manic episodes.",
      symptoms: [
        { text: "Hypomanic episodes: abnormally elevated, expansive, or irritable mood and increased energy/activity for at least 4 days, not causing marked impairment" },
        { text: "During hypomania: similar symptoms to mania but less severe and without psychotic features" },
        { text: "Major depressive episodes: typically more frequent and longer-lasting than hypomanic episodes" },
        { text: "Often more time spent in depression than in hypomania" },
        { text: "Functional impairment primarily due to depressive episodes" }
      ],
      diagnosticFindings: [
        { text: "At least one lifetime hypomanic episode and one major depressive episode" },
        { text: "No lifetime manic episodes" },
        { text: "Not better explained by other psychotic disorders" },
        { text: "Not attributable to substances or medical conditions" }
      ],
      causes: [
        { text: "Genetic factors (similar to Bipolar I but possibly different genetic loading)" },
        { text: "Neurobiological factors" },
        { text: "Environmental triggers" },
        { text: "May have higher rates of comorbid anxiety and personality disorders than Bipolar I" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Pharmacotherapy of Bipolar Disorder",
      slug: "pharmacotherapy-of-bipolar-disorder",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Pharmacotherapy is the cornerstone of treatment for bipolar disorders, with different approaches needed for acute mood episodes and long-term maintenance treatment."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Mood Stabilizers" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Lithium is a first-line agent with strong evidence for anti-manic, antidepressant, and suicide prevention properties. It requires regular monitoring of levels and renal/thyroid function. Anticonvulsants with mood-stabilizing properties include valproate (effective for acute mania, mixed episodes, and rapid cycling), lamotrigine (more effective for depression prevention than mania), and carbamazepine (FDA-approved for acute mania). Second-generation antipsychotics with FDA approval for bipolar disorder include olanzapine, risperidone, quetiapine, aripiprazole, asenapine, cariprazine, lurasidone, and ziprasidone. They are effective for acute mania and, in some cases, bipolar depression and maintenance treatment."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Treating Different Phases" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "For acute mania, first-line options include lithium, valproate, or a second-generation antipsychotic, either as monotherapy or in combination for severe episodes. For acute bipolar depression, evidence supports quetiapine, lurasidone, cariprazine, olanzapine-fluoxetine combination, and lamotrigine. Antidepressant monotherapy should be avoided due to risk of mood switch. For maintenance treatment, continuing the effective acute treatment is recommended. Lithium has the strongest evidence for long-term prophylaxis. Combination therapy is often necessary for breakthrough episodes or subsyndromal symptoms. Medication choices should consider predominant polarity, comorbidities, side effect profiles, and patient preferences."
            }
          ]
        }
      ]
    },
    {
      title: "Cyclothymic Disorder and Bipolar Spectrum",
      slug: "cyclothymic-disorder-and-bipolar-spectrum",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Beyond the classical presentations of Bipolar I and II disorders, the bipolar spectrum includes conditions with attenuated or subthreshold symptoms that still cause significant impairment."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Cyclothymic Disorder" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cyclothymic disorder is characterized by numerous periods of hypomanic symptoms and periods of depressive symptoms that do not meet full criteria for hypomania or major depression, respectively. Symptoms must persist for at least two years (one year in children/adolescents) with no more than two months symptom-free. It may be a precursor to Bipolar I or II disorder in some cases. Treatment often involves mood stabilizers at lower doses than used for Bipolar I/II, along with psychosocial interventions focusing on mood monitoring and stability."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Other Specified Bipolar and Related Disorders" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "This category includes conditions with bipolar features that don't meet full criteria for other bipolar disorders. Examples include short-duration hypomania (2-3 days) with lifetime major depression, hypomania without prior major depression, and short-duration cyclothymia. These conditions may represent prodromal states of full bipolar disorder or stable subthreshold presentations. Management approaches are similar to those for established bipolar disorders but should be tailored to symptom severity and impact. Regular assessment for progression to full bipolar disorder is important, especially during high-risk periods (adolescence, postpartum) or after antidepressant exposure."
            }
          ]
        }
      ]
    }
  ]
},
// 7. Infectious Diseases Topics
{
  title: "Pneumonia",
  slug: "pneumonia",
  introduction: "Pneumonia is an infection of the lung parenchyma characterized by inflammation of the alveoli and bronchioles. It can be caused by various microorganisms, including bacteria, viruses, fungi, and parasites. Pneumonia is a significant cause of morbidity and mortality worldwide, particularly in young children and older adults.",
  diagnosis_overview: "Diagnosis is based on clinical presentation, physical examination, laboratory studies, and imaging. Chest radiography is the standard imaging technique, while microbiological studies help identify the causative organism. Classification by setting of acquisition (community-acquired vs. healthcare-associated) guides empiric therapy.",
  management: "Management includes appropriate antimicrobial therapy based on likely pathogens, supportive care, and monitoring for complications. The severity of illness determines the need for hospitalization and the intensity of care. Prevention strategies include vaccination and infection control measures.",
  highyieldPoints: "- Know the common causative organisms for different types of pneumonia\n- Understand the criteria for hospital admission and intensive care unit transfer\n- Be familiar with appropriate empiric antibiotic regimens based on setting and risk factors",
  systemIndex: 6, // Reference to Infectious Diseases
  types: [
    {
      name: "Community-Acquired Pneumonia",
      abbreviation: "CAP",
      anchor_id: "community-acquired-pneumonia",
      description: "Community-acquired pneumonia refers to pneumonia that develops in a person who has not been recently hospitalized or in a healthcare facility.",
      symptoms: [
        { text: "Cough with or without sputum production" },
        { text: "Fever, chills, rigors" },
        { text: "Dyspnea" },
        { text: "Pleuritic chest pain" },
        { text: "Fatigue and malaise" },
        { text: "Altered mental status, especially in elderly patients" }
      ],
      diagnosticFindings: [
        { text: "Focal or diffuse infiltrates on chest radiography" },
        { text: "Leukocytosis or leukopenia" },
        { text: "Hypoxemia" },
        { text: "Focal consolidation on lung auscultation (crackles, bronchial breath sounds)" }
      ],
      causes: [
        { text: "Bacteria: Streptococcus pneumoniae, Haemophilus influenzae, Moraxella catarrhalis, atypical pathogens (Mycoplasma pneumoniae, Chlamydia pneumoniae, Legionella)" },
        { text: "Viruses: influenza, respiratory syncytial virus, SARS-CoV-2" },
        { text: "Aspiration of oropharyngeal contents" },
        { text: "Less commonly: fungi, parasites" }
      ]
    },
    {
      name: "Hospital-Acquired Pneumonia",
      abbreviation: "HAP",
      anchor_id: "hospital-acquired-pneumonia",
      description: "Hospital-acquired pneumonia develops 48 hours or more after hospital admission and was not incubating at the time of admission.",
      symptoms: [
        { text: "Similar to CAP, but may be more severe" },
        { text: "May have more subtle presentation in elderly or immunocompromised patients" },
        { text: "Often develops in the context of other acute illnesses" },
        { text: "May present primarily as worsening respiratory status or new-onset fever" }
      ],
      diagnosticFindings: [
        { text: "New or progressive infiltrates on chest radiography" },
        { text: "Changes in respiratory parameters in ventilated patients" },
        { text: "Leukocytosis or leukopenia" },
        { text: "Positive cultures from respiratory specimens or blood" }
      ],
      causes: [
        { text: "Gram-negative bacilli: Pseudomonas aeruginosa, Klebsiella pneumoniae, Escherichia coli, Acinetobacter species" },
        { text: "Gram-positive cocci: Staphylococcus aureus (including MRSA)" },
        { text: "Polymicrobial infections" },
        { text: "Less commonly: fungi (Aspergillus, Candida species)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Ventilator-Associated Pneumonia",
      slug: "ventilator-associated-pneumonia",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Ventilator-associated pneumonia (VAP) is a type of hospital-acquired pneumonia that develops in patients who have been mechanically ventilated for at least 48 hours. It is a common complication of mechanical ventilation and is associated with increased morbidity, mortality, and healthcare costs."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Diagnosis and Pathogens" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Diagnosis is challenging and based on new or progressive infiltrates on chest imaging, signs of infection (fever, leukocytosis), and microbiological evidence from respiratory specimens. Early-onset VAP (within 4 days of intubation) is typically caused by antibiotic-sensitive bacteria similar to CAP. Late-onset VAP (after 4 days) is more likely to involve multidrug-resistant organisms, including Pseudomonas aeruginosa, Acinetobacter baumannii, MRSA, and extended-spectrum β-lactamase-producing Enterobacteriaceae."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management and Prevention" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Empiric antibiotic therapy should be broad-spectrum, covering likely pathogens based on local resistance patterns, and should be narrowed once culture results are available. Prevention strategies include the ventilator bundle: elevation of the head of the bed, daily sedation interruption and assessment for extubation readiness, deep venous thrombosis prophylaxis, peptic ulcer disease prophylaxis, and oral care with chlorhexidine. Subglottic secretion drainage and endotracheal tubes with specialized cuffs may reduce VAP incidence."
            }
          ]
        }
      ]
    },
    {
      title: "Severity Assessment and Site-of-Care Decisions",
      slug: "severity-assessment-and-site-of-care-decisions",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Accurate assessment of pneumonia severity is essential for making appropriate decisions regarding site of care (outpatient, general ward, or intensive care unit), which in turn influences diagnostic testing, empiric therapy, and resource utilization."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Severity Assessment Tools" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The Pneumonia Severity Index (PSI) is a comprehensive scoring system that stratifies patients into five risk classes based on demographics, comorbidities, physical examination findings, and laboratory/radiographic results. It has excellent negative predictive value for identifying low-risk patients (classes I-II) who can be safely treated as outpatients. The CURB-65 score (Confusion, Urea >7 mmol/L, Respiratory rate ≥30/min, Blood pressure [systolic <90 mmHg or diastolic ≤60 mmHg], Age ≥65 years) is simpler to use at the bedside. Scores of 0-1 suggest outpatient treatment, 2 suggests short hospitalization or supervised outpatient treatment, and ≥3 indicates need for hospitalization with consideration of ICU care."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "ICU Admission Criteria" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Major criteria for ICU admission include need for mechanical ventilation or vasopressor support due to septic shock. Minor criteria include respiratory rate ≥30/min, PaO2/FiO2 ratio ≤250, multilobar infiltrates, confusion/disorientation, uremia (BUN ≥20 mg/dL), leukopenia (WBC count <4,000 cells/mm3), thrombocytopenia (platelet count <100,000/mm3), hypothermia (core temperature <36°C), and hypotension requiring aggressive fluid resuscitation. The presence of one major criterion or three or more minor criteria suggests need for ICU care. Clinical judgment should always complement objective scoring systems, particularly for patients with social factors affecting outpatient management or rapid clinical deterioration."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Urinary Tract Infections",
  slug: "urinary-tract-infections",
  introduction: "Urinary tract infections (UTIs) are among the most common bacterial infections, affecting approximately 150 million people worldwide each year. They occur when bacteria, typically from the gut, enter and multiply in the urinary tract, which includes the kidneys, ureters, bladder, and urethra.",
  diagnosis_overview: "Diagnosis is based on clinical presentation, urinalysis, and urine culture. The presence of pyuria (white blood cells in the urine) and bacteriuria, along with symptoms, supports the diagnosis. Classification by anatomical location (lower vs. upper UTI) and complexity (uncomplicated vs. complicated) guides management.",
  management: "Management includes appropriate antibiotic therapy based on local resistance patterns, symptom relief, and addressing underlying risk factors. Duration of therapy varies by UTI type and patient characteristics. Prevention strategies are important, especially for those with recurrent infections.",
  highyieldPoints: "- Know the common causative organisms for UTIs and local resistance patterns\n- Understand the differences between uncomplicated and complicated UTIs and their management\n- Be familiar with appropriate preventive measures for recurrent UTIs",
  systemIndex: 6, // Reference to Infectious Diseases
  types: [
    {
      name: "Uncomplicated UTI",
      abbreviation: "uUTI",
      anchor_id: "uncomplicated-uti",
      description: "Uncomplicated UTIs occur in individuals who have a normal, unobstructed genitourinary tract, no recent instrumentation, and no systemic illness.",
      symptoms: [
        { text: "Dysuria (painful urination)" },
        { text: "Urinary frequency" },
        { text: "Urinary urgency" },
        { text: "Suprapubic discomfort" },
        { text: "Hematuria (blood in urine)" }
      ],
      diagnosticFindings: [
        { text: "Pyuria (>10 WBCs/mm³ in uncentrifuged urine or >5-10 WBCs/hpf in centrifuged sediment)" },
        { text: "Bacteriuria (≥10³ CFU/mL in symptomatic women, ≥10⁵ CFU/mL in asymptomatic women)" },
        { text: "Positive leukocyte esterase and nitrite on dipstick testing" }
      ],
      causes: [
        { text: "Escherichia coli (80-90% of uncomplicated UTIs)" },
        { text: "Staphylococcus saprophyticus" },
        { text: "Klebsiella pneumoniae" },
        { text: "Proteus mirabilis" },
        { text: "Enterococcus species" }
      ]
    },
    {
      name: "Complicated UTI",
      abbreviation: "cUTI",
      anchor_id: "complicated-uti",
      description: "Complicated UTIs occur in the presence of a functional or anatomical abnormality of the urinary tract, or in hosts with increased susceptibility to infection or antibiotic resistance.",
      symptoms: [
        { text: "Similar to uncomplicated UTI but may be more severe" },
        { text: "May have flank pain or tenderness (if upper tract involvement)" },
        { text: "Systemic symptoms: fever, chills, malaise" },
        { text: "Altered mental status, especially in elderly patients" },
        { text: "Sometimes minimal or atypical symptoms, particularly in elderly or immunocompromised patients" }
      ],
      diagnosticFindings: [
        { text: "Pyuria and bacteriuria" },
        { text: "Often polymicrobial infections" },
        { text: "Higher rates of antimicrobial resistance" },
        { text: "May have evidence of obstruction, stones, or structural abnormalities on imaging" }
      ],
      causes: [
        { text: "Escherichia coli (though less predominant than in uncomplicated UTI)" },
        { text: "Enterococcus species" },
        { text: "Pseudomonas aeruginosa" },
        { text: "Klebsiella pneumoniae" },
        { text: "Proteus species" },
        { text: "Staphylococcus aureus" },
        { text: "Candida species (especially in catheterized patients)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Pyelonephritis",
      slug: "pyelonephritis",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Pyelonephritis is an infection of the renal parenchyma and collecting system, typically resulting from ascending infection from the lower urinary tract. It can be acute or chronic and may be uncomplicated or complicated depending on host and urological factors."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Presentation and Diagnosis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Classic symptoms include fever, chills, flank pain, and costovertebral angle tenderness, often accompanied by lower urinary tract symptoms (dysuria, frequency, urgency). Nausea, vomiting, and generalized malaise are common. Elderly patients may present atypically with altered mental status, dehydration, or worsening of underlying conditions without localizing urinary symptoms. Diagnosis is primarily clinical, supported by urinalysis showing pyuria, bacteriuria, and often white blood cell casts. Urine culture is essential for pathogen identification and susceptibility testing. Blood cultures should be obtained in hospitalized patients, as bacteremia is present in 15-20% of cases."
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
              text: "Outpatient management is appropriate for uncomplicated pyelonephritis in reliable patients without severe symptoms, sepsis, or inability to maintain oral hydration. Empiric antibiotic options include fluoroquinolones (where resistance rates remain low), trimethoprim-sulfamethoxazole (if local E. coli resistance is <20%), or a single dose of parenteral antibiotic (ceftriaxone, aminoglycoside) followed by oral therapy. Hospitalization is indicated for complicated cases, signs of sepsis, inability to tolerate oral intake, pregnancy, or when compliance is a concern. Inpatient treatment typically includes intravenous antibiotics such as ceftriaxone, fluoroquinolones, or piperacillin-tazobactam, depending on local resistance patterns and severity. Duration of therapy is typically 7-14 days, with longer courses for complicated cases."
            }
          ]
        }
      ]
    },
    {
      title: "Catheter-Associated Urinary Tract Infections",
      slug: "catheter-associated-urinary-tract-infections",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Catheter-associated urinary tract infections (CAUTIs) are among the most common healthcare-associated infections, occurring in patients with indwelling urinary catheters."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Pathogenesis and Risk Factors" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Catheterization disrupts normal host defenses, allowing bacteria to enter the bladder along the catheter surface or through the catheter lumen. Biofilm formation on the catheter surface protects bacteria from antibiotics and host defenses. The risk of bacteriuria increases by approximately 3-7% per day of catheterization, with nearly all patients developing bacteriuria after 30 days. Risk factors include prolonged catheterization, female gender, older age, diabetes mellitus, poor catheter care, and breaks in the closed drainage system."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Diagnosis, Management, and Prevention" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Diagnosis requires symptoms or signs attributable to the urinary tract in a catheterized patient with no other identified source, along with bacteriuria (≥10³ CFU/mL of one or more bacterial species). Asymptomatic bacteriuria should not be treated except in certain circumstances (pregnancy, before urologic procedures). Management includes catheter removal or replacement if possible, collection of urine culture, and appropriate antibiotic therapy based on local resistance patterns and culture results. Prevention strategies are critical and include: using catheters only when necessary with prompt removal when no longer needed, maintaining a closed drainage system, ensuring proper insertion technique with sterile equipment, and considering alternatives to indwelling catheters (intermittent catheterization, external catheters)."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Sexually Transmitted Infections",
  slug: "sexually-transmitted-infections",
  introduction: "Sexually transmitted infections (STIs) are infections that are predominantly transmitted through sexual contact. They represent a significant global health burden, with more than 1 million STIs acquired daily worldwide. Many STIs can be asymptomatic, leading to delayed diagnosis and increased risk of transmission and complications.",
  diagnosis_overview: "Diagnosis involves clinical evaluation, laboratory testing, and in some cases, imaging studies. Screening recommendations vary by pathogen, risk factors, and population demographics. Syndromic approaches may be used in resource-limited settings, but pathogen-specific diagnosis is preferred when available.",
  management: "Management includes appropriate antimicrobial therapy, counseling about risk reduction and partner notification, and follow-up testing where indicated. Public health measures are essential for controlling the spread of STIs and preventing long-term sequelae.",
  highyieldPoints: "- Know the common presentations, diagnostic approaches, and treatment regimens for major STIs\n- Understand appropriate screening recommendations for different populations\n- Be familiar with strategies for partner management and prevention",
  systemIndex: 6, // Reference to Infectious Diseases
  types: [
    {
      name: "Bacterial STIs",
      abbreviation: "BSTI",
      anchor_id: "bacterial-stis",
      description: "Bacterial STIs include infections caused by bacterial pathogens that are primarily transmitted through sexual contact.",
      symptoms: [
        { text: "Urethritis: dysuria, urethral discharge, urinary frequency (chlamydia, gonorrhea)" },
        { text: "Cervicitis: mucopurulent discharge, postcoital bleeding, dyspareunia (chlamydia, gonorrhea)" },
        { text: "Genital ulcers: painless (syphilis) or painful (chancroid) lesions" },
        { text: "Pelvic inflammatory disease: lower abdominal pain, cervical motion tenderness, adnexal tenderness" },
        { text: "Proctitis: anorectal pain, discharge, tenesmus" }
      ],
      diagnosticFindings: [
        { text: "Nucleic acid amplification tests (NAATs) for chlamydia and gonorrhea" },
        { text: "Dark-field microscopy, serology, and PCR for syphilis" },
        { text: "Gram stain showing gram-negative intracellular diplococci (gonorrhea)" },
        { text: "Culture for antibiotic susceptibility testing (particularly for gonorrhea)" }
      ],
      causes: [
        { text: "Neisseria gonorrhoeae" },
        { text: "Chlamydia trachomatis" },
        { text: "Treponema pallidum (syphilis)" },
        { text: "Haemophilus ducreyi (chancroid)" },
        { text: "Klebsiella granulomatis (granuloma inguinale)" },
        { text: "Mycoplasma genitalium" }
      ]
    },
    {
      name: "Viral STIs",
      abbreviation: "VSTI",
      anchor_id: "viral-stis",
      description: "Viral STIs include infections caused by viral pathogens that are transmitted through sexual contact. These infections are typically chronic or recurrent and often require lifelong management.",
      symptoms: [
        { text: "Genital herpes: painful vesicular lesions, ulcers, or fissures; systemic symptoms during primary infection" },
        { text: "Genital warts: soft, flesh-colored, exophytic growths in the anogenital region" },
        { text: "Hepatitis B: often asymptomatic; may present with jaundice, fatigue, abdominal pain" },
        { text: "HIV: acute retroviral syndrome (fever, lymphadenopathy, rash), or often asymptomatic until advanced immunosuppression" }
      ],
      diagnosticFindings: [
        { text: "HSV: PCR of lesion swab, type-specific serologic testing" },
        { text: "HPV: typically clinical diagnosis; HPV DNA testing for high-risk types in cervical screening" },
        { text: "Hepatitis B: serologic markers (HBsAg, anti-HBc, anti-HBs)" },
        { text: "HIV: antibody/antigen testing, confirmatory viral load testing" }
      ],
      causes: [
        { text: "Herpes simplex virus types 1 and 2" },
        { text: "Human papillomavirus (multiple types)" },
        { text: "Hepatitis B virus" },
        { text: "Human immunodeficiency virus" },
        { text: "Hepatitis C virus (less efficiently transmitted sexually)" },
        { text: "Cytomegalovirus (in specific populations)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Pelvic Inflammatory Disease",
      slug: "pelvic-inflammatory-disease",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Pelvic inflammatory disease (PID) is an infection of the upper female genital tract, including the endometrium, fallopian tubes, ovaries, and pelvic peritoneum. It is typically caused by ascending infection from the lower genital tract, most commonly due to sexually transmitted organisms."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Presentation and Diagnosis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Presentation ranges from subtle or mild symptoms to severe illness. Common symptoms include lower abdominal pain, abnormal vaginal discharge, intermenstrual or postcoital bleeding, and dyspareunia. Fever, although classic, is present in less than 50% of cases. Minimum diagnostic criteria include pelvic or lower abdominal pain and one or more of the following: cervical motion tenderness, uterine tenderness, or adnexal tenderness. Additional criteria supporting the diagnosis include elevated temperature, abnormal cervical or vaginal discharge, elevated erythrocyte sedimentation rate or C-reactive protein, and laboratory documentation of cervical infection with gonorrhea or chlamydia."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management and Complications" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Treatment should be initiated promptly in women with suspected PID to prevent long-term sequelae. Empiric treatment should cover N. gonorrhoeae, C. trachomatis, and anaerobes. Outpatient regimens include ceftriaxone plus doxycycline with or without metronidazole. Hospitalization should be considered for severe illness, pregnancy, inability to tolerate oral medications, or lack of response to oral therapy. Inpatient regimens include parenteral cefoxitin or cefotetan plus doxycycline, or clindamycin plus gentamicin. Complications include tubal factor infertility, ectopic pregnancy, chronic pelvic pain, and tubo-ovarian abscess. Partner treatment is essential to prevent reinfection."
            }
          ]
        }
      ]
    },
    {
      title: "STI Prevention and Screening",
      slug: "sti-prevention-and-screening",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Prevention and early detection through screening are critical components of STI control and management, reducing both transmission and long-term complications."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Prevention Strategies" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Primary prevention includes abstinence, mutual monogamy with an uninfected partner, and consistent and correct use of barriers (male and female condoms, dental dams). Pre-exposure prophylaxis (PrEP) with antiretroviral medications is effective for HIV prevention in high-risk individuals. Vaccination is available for HPV and hepatitis B. Comprehensive sexual education and risk-reduction counseling are important public health measures. Secondary prevention includes regular screening of at-risk individuals, prompt treatment of infected persons, and partner notification and treatment (expedited partner therapy where legal)."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Screening Recommendations" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "For chlamydia and gonorrhea, annual screening is recommended for sexually active women under 25 years and older women with risk factors (new or multiple partners, sex partner with an STI, inconsistent condom use, previous STI, sex work). Men who have sex with men (MSM) should be screened at sites of exposure (urethra, rectum, pharynx) annually or more frequently with higher risk. For syphilis, screening is recommended for pregnant women, MSM, persons with HIV, and individuals with high-risk behaviors. HIV screening is recommended at least once for all persons aged 13-64 years, with annual screening for those at ongoing risk. Hepatitis B screening is indicated for pregnant women, persons born in regions with ≥2% HBsAg prevalence, HIV-positive persons, and individuals with high-risk behaviors. Hepatitis C screening is recommended at least once for all adults aged 18-79 years, with periodic testing for those at ongoing risk."
            }
          ]
        }
      ]
    }
  ]
},
// 8. Reproductive System Topics
{
  title: "Contraception",
  slug: "contraception",
  introduction: "Contraception encompasses methods and devices used to prevent pregnancy. A wide range of options with varying effectiveness, duration of action, side effects, and non-contraceptive benefits are available. Selection of an appropriate method depends on multiple factors, including patient preference, medical eligibility, effectiveness, and access.",
  diagnosis_overview: "Assessment for contraception involves a thorough medical history to identify contraindications to specific methods, evaluation of pregnancy risk and reproductive goals, consideration of STI risk, and discussion of personal preferences and concerns.",
  management: "Management includes method selection based on patient preference and medical eligibility, counseling about correct use and potential side effects, addressing barriers to adherence, and providing follow-up care as appropriate for the chosen method.",
  highyieldPoints: "- Know the effectiveness, mechanism of action, and contraindications of different contraceptive methods\n- Understand the non-contraceptive benefits and potential side effects of hormonal contraceptives\n- Be familiar with emergency contraception options and appropriate counseling",
  systemIndex: 7, // Reference to Reproductive System
  types: [
    {
      name: "Hormonal Contraception",
      abbreviation: "HC",
      anchor_id: "hormonal-contraception",
      description: "Hormonal contraception includes methods that use synthetic estrogen and/or progestin to prevent pregnancy primarily by suppressing ovulation, thickening cervical mucus, and altering the endometrium.",
      symptoms: [
        { text: "Side effects may include breakthrough bleeding, nausea, headache, breast tenderness" },
        { text: "May experience mood changes or decreased libido" },
        { text: "Most women have lighter, less painful menses on hormonal methods" },
        { text: "Some women experience weight changes, though evidence for causality is limited" },
        { text: "Serious adverse events (venous thromboembolism, stroke) are rare and primarily associated with estrogen-containing methods" }
      ],
      diagnosticFindings: [
        { text: "Not applicable for initial selection; medical history and blood pressure measurement are key for safety assessment" },
        { text: "No routine laboratory testing required before initiation for most healthy women" },
        { text: "Selected testing may be appropriate based on specific risk factors" }
      ],
      causes: [
        { text: "Combined hormonal methods contain estrogen and progestin: pills, patch, vaginal ring" },
        { text: "Progestin-only methods: pills, injection (DMPA), implant, hormonal IUD" },
        { text: "Different formulations vary in dosage, specific hormones, and delivery systems" }
      ]
    },
    {
      name: "Long-Acting Reversible Contraception",
      abbreviation: "LARC",
      anchor_id: "larc",
      description: "Long-acting reversible contraception includes highly effective methods that require minimal user intervention and provide contraception for an extended period, including intrauterine devices and subdermal implants.",
      symptoms: [
        { text: "Hormonal IUD: Lighter or absent menstrual bleeding, initial spotting, rare hormonal side effects" },
        { text: "Copper IUD: May increase menstrual bleeding and cramping, especially initially" },
        { text: "Implant: Unpredictable bleeding patterns, potential for amenorrhea, rare hormonal side effects" },
        { text: "All LARC methods: Brief discomfort with insertion and removal" }
      ],
      diagnosticFindings: [
        { text: "No routine laboratory testing required before initiation" },
        { text: "Pregnancy should be excluded before insertion" },
        { text: "STI screening may be appropriate based on risk factors" }
      ],
      causes: [
        { text: "Hormonal IUDs (levonorgestrel-releasing): Available in different sizes and hormone dosages, effective for 3-8 years depending on type" },
        { text: "Copper IUD: Non-hormonal, effective for up to 10-12 years" },
        { text: "Contraceptive implant (etonogestrel): Subdermal rod, effective for up to 5 years" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Emergency Contraception",
      slug: "emergency-contraception",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Emergency contraception (EC) refers to methods used to prevent pregnancy after unprotected sexual intercourse or contraceptive failure. It is not intended for regular use as an ongoing contraceptive method."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Available Methods" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Copper intrauterine device (IUD) is the most effective form of emergency contraception, with a failure rate of less than 0.1%. It can be inserted up to 5 days after unprotected intercourse and provides ongoing contraception for up to 10-12 years. Ulipristal acetate (UPA) is a selective progesterone receptor modulator that can be taken up to 5 days after unprotected intercourse with maintained efficacy throughout this period. Levonorgestrel (LNG) emergency contraceptive pills are available over-the-counter and are most effective when taken within 72 hours of unprotected intercourse, though they can be used up to 5 days with decreasing efficacy. Combined hormonal contraceptive pills can be used in specific doses (Yuzpe method) when other options are unavailable, though they are less effective and have more side effects."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Considerations and Counseling" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Efficacy varies by method and timing, with the copper IUD being most effective, followed by UPA, then LNG. Body weight may impact effectiveness of hormonal EC methods, with potential decreased efficacy in women weighing >70-75 kg. All EC methods work primarily by preventing ovulation and do not disrupt an established pregnancy. Side effects of hormonal methods may include nausea, vomiting, headache, fatigue, and irregular bleeding. Ongoing contraception should be initiated or resumed after EC use, with specific timing depending on the EC method used. Counseling should include discussion of all EC options, appropriate timing, potential drug interactions (especially with UPA and hormonal contraceptives), and follow-up for regular contraception and STI testing if indicated."
            }
          ]
        }
      ]
    },
    {
      title: "Contraception in Special Populations",
      slug: "contraception-in-special-populations",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Certain populations require special considerations when selecting contraceptive methods due to age, medical conditions, or specific circumstances."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Adolescents" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Confidentiality is a key concern and should be discussed, along with applicable legal considerations. LARC methods are particularly appropriate due to their high effectiveness and low user dependence. All contraceptive methods are medically appropriate for adolescents, though progestin-only methods may be preferred in those with contraindications to estrogen. Dual protection with condoms should be emphasized for STI prevention. Comprehensive counseling addressing myths, concerns about side effects, and practical aspects of method use is essential."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Women with Medical Conditions" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The US Medical Eligibility Criteria for Contraceptive Use (US MEC) provides evidence-based guidance for contraceptive use in women with specific medical conditions. For women with hypertension, non-hormonal methods or progestin-only options are generally preferred over combined hormonal contraceptives. For those with migraines with aura, combined hormonal contraceptives are contraindicated due to increased stroke risk. Women with diabetes should avoid combined hormonal methods if they have vascular complications. For those with history of venous thromboembolism, estrogen-containing methods are contraindicated, while progestin-only and non-hormonal methods are generally safe. Women with systemic lupus erythematosus may use most methods if they do not have positive antiphospholipid antibodies, which would contraindicate estrogen-containing methods."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Menopause",
  slug: "menopause",
  introduction: "Menopause is the permanent cessation of menstruation resulting from loss of ovarian follicular activity. It is a natural biological process that marks the end of a woman's reproductive years and typically occurs between ages 45 and 55. The menopausal transition (perimenopause) may last several years and is characterized by hormonal fluctuations and various symptoms.",
  diagnosis_overview: "Diagnosis is primarily clinical, based on age, menstrual history, and symptoms. Laboratory testing is not routinely required but may be helpful in certain clinical scenarios. The diagnosis is typically confirmed retrospectively after 12 consecutive months of amenorrhea without another obvious cause.",
  management: "Management focuses on symptom relief, prevention of long-term health consequences, and overall health optimization. Options include lifestyle modifications, hormone therapy, non-hormonal pharmacological treatments, and complementary therapies, tailored to individual symptoms, preferences, and risk factors.",
  highyieldPoints: "- Know the physiological changes and common symptoms associated with the menopausal transition\n- Understand the benefits, risks, and contraindications of hormone therapy\n- Be familiar with non-hormonal approaches to symptom management and health maintenance",
  systemIndex: 7, // Reference to Reproductive System
  types: [
    {
      name: "Natural Menopause",
      abbreviation: "NM",
      anchor_id: "natural-menopause",
      description: "Natural menopause occurs gradually as a result of normal age-related decline in ovarian function, typically between ages 45 and 55.",
      symptoms: [
        { text: "Vasomotor symptoms (hot flashes, night sweats)" },
        { text: "Genitourinary symptoms (vaginal dryness, dyspareunia, urinary frequency/urgency)" },
        { text: "Sleep disturbances" },
        { text: "Mood changes (irritability, anxiety, depressive symptoms)" },
        { text: "Cognitive changes (memory issues, difficulty concentrating)" },
        { text: "Physical symptoms (joint pain, headaches, palpitations)" }
      ],
      diagnosticFindings: [
        { text: "Irregular menstrual cycles during perimenopause" },
        { text: "12 consecutive months of amenorrhea" },
        { text: "Elevated FSH and LH levels" },
        { text: "Low estradiol levels" },
        { text: "No laboratory testing required for diagnosis in typical cases" }
      ],
      causes: [
        { text: "Age-related decline in ovarian follicle number and function" },
        { text: "Decreased production of estrogen and progesterone" },
        { text: "Genetic factors influencing age of onset" },
        { text: "Environmental and lifestyle factors (smoking can accelerate onset)" }
      ]
    },
    {
      name: "Premature or Early Menopause",
      abbreviation: "PEM",
      anchor_id: "premature-early-menopause",
      description: "Premature menopause (primary ovarian insufficiency) occurs before age 40, while early menopause occurs between ages 40 and 45. Both may be spontaneous or induced by medical interventions.",
      symptoms: [
        { text: "Similar to natural menopause but may be more abrupt and severe" },
        { text: "Infertility" },
        { text: "Psychological impact of early reproductive aging" },
        { text: "Greater long-term health risks (cardiovascular disease, osteoporosis, cognitive decline)" }
      ],
      diagnosticFindings: [
        { text: "Amenorrhea or oligomenorrhea" },
        { text: "Elevated FSH levels (>25 IU/L) on two occasions at least 4 weeks apart" },
        { text: "Low estradiol levels" },
        { text: "May have normal or abnormal karyotype depending on etiology" },
        { text: "Anti-Müllerian hormone levels typically very low or undetectable" }
      ],
      causes: [
        { text: "Idiopathic (most common cause of spontaneous premature menopause)" },
        { text: "Autoimmune disorders" },
        { text: "Genetic factors (Turner syndrome, FMR1 premutations)" },
        { text: "Iatrogenic (surgery, chemotherapy, radiation)" },
        { text: "Infections (mumps oophoritis)" },
        { text: "Metabolic disorders (galactosemia)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Hormone Therapy for Menopause",
      slug: "hormone-therapy-for-menopause",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Hormone therapy (HT) remains the most effective treatment for vasomotor symptoms and genitourinary syndrome of menopause. The decision to use HT should be individualized based on symptom severity, health risks, personal preferences, and treatment goals."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Types and Formulations" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Systemic estrogen therapy (with progesterone for women with an intact uterus) effectively treats vasomotor symptoms and prevents bone loss. Available formulations include oral tablets, transdermal patches, gels, sprays, and vaginal rings with systemic absorption. Local estrogen therapy (vaginal creams, tablets, rings) treats genitourinary symptoms with minimal systemic absorption. Combined estrogen-progestogen therapy is necessary for women with an intact uterus to prevent endometrial hyperplasia and cancer. Options include continuous or cyclic regimens. Tissue-selective estrogen complex combines estrogen with a selective estrogen receptor modulator, providing endometrial protection without a progestogen. Tibolone (not available in the US) has estrogenic, progestogenic, and androgenic properties."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Benefits, Risks, and Contraindications" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Benefits include effective relief of vasomotor symptoms, prevention of bone loss and fractures, improvement in genitourinary symptoms, and potentially improved sleep, mood, and quality of life. When initiated within 10 years of menopause or before age 60, HT may reduce cardiovascular disease and all-cause mortality. Risks depend on type, dose, duration, route of administration, timing of initiation, and individual risk factors. Key concerns include venous thromboembolism (primarily with oral formulations), stroke (slight increased risk), breast cancer (increased with combined therapy after 3-5 years), and gallbladder disease. Absolute contraindications include unexplained vaginal bleeding, active liver disease, active or recent thromboembolic disease or stroke, known or suspected estrogen-dependent cancer, and pregnancy."
            }
          ]
        }
      ]
    },
    {
      title: "Non-Hormonal Management of Menopausal Symptoms",
      slug: "non-hormonal-management-of-menopausal-symptoms",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Non-hormonal approaches to managing menopausal symptoms are important for women with contraindications to hormone therapy, those who prefer to avoid hormones, or as adjuncts to hormone therapy."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Pharmacological Options" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "For vasomotor symptoms, selective serotonin reuptake inhibitors (SSRIs) and serotonin-norepinephrine reuptake inhibitors (SNRIs) have moderate efficacy. Paroxetine is FDA-approved for hot flashes; venlafaxine, desvenlafaxine, escitalopram, and citalopram also show benefit. Gabapentin and pregabalin can reduce hot flashes and may be particularly helpful for women with concurrent neuropathic pain or sleep disturbance. Clonidine has modest efficacy but more side effects. Oxybutynin has shown benefit in some studies. For genitourinary symptoms, vaginal moisturizers and lubricants provide symptomatic relief without hormonal effects. Ospemifene, a selective estrogen receptor modulator, is approved for moderate to severe dyspareunia due to vulvovaginal atrophy."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Lifestyle and Complementary Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cognitive behavioral therapy has demonstrated efficacy for vasomotor symptoms and sleep disturbances. Clinical hypnosis has shown promise in randomized trials. Mindfulness-based stress reduction may improve sleep, anxiety, and quality of life. Paced respiration and other relaxation techniques may help manage hot flashes. Weight loss in overweight women may reduce hot flash frequency. Regular physical activity can improve sleep, mood, and overall quality of life, though evidence for direct effects on hot flashes is mixed. Evidence for most herbal remedies and supplements (black cohosh, phytoestrogens, evening primrose oil) is limited and inconsistent. Acupuncture shows mixed results in controlled trials."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Abnormal Uterine Bleeding",
  slug: "abnormal-uterine-bleeding",
  introduction: "Abnormal uterine bleeding (AUB) refers to menstrual bleeding of abnormal frequency, duration, regularity, or volume. It affects up to 30% of women of reproductive age and significantly impacts quality of life. The PALM-COEIN classification system categorizes causes as structural (polyp, adenomyosis, leiomyoma, malignancy) or non-structural (coagulopathy, ovulatory dysfunction, endometrial, iatrogenic, not otherwise classified).",
  diagnosis_overview: "Diagnosis begins with a thorough history, physical examination, and selected laboratory tests to distinguish between structural and non-structural causes. Imaging studies, particularly transvaginal ultrasound, and endometrial sampling may be indicated based on age, risk factors, and clinical presentation.",
  management: "Management depends on the underlying cause, severity of bleeding, impact on quality of life, and fertility desires. Options include medical therapy (hormonal and non-hormonal), surgical interventions, and treatment of underlying conditions.",
  highyieldPoints: "- Know the PALM-COEIN classification system for abnormal uterine bleeding\n- Understand the appropriate diagnostic evaluation based on age and clinical presentation\n- Be familiar with medical and surgical management options and their indications",
  systemIndex: 7, // Reference to Reproductive System
  types: [
    {
      name: "Heavy Menstrual Bleeding",
      abbreviation: "HMB",
      anchor_id: "heavy-menstrual-bleeding",
      description: "Heavy menstrual bleeding (formerly menorrhagia) refers to excessive menstrual blood loss that interferes with a woman's physical, social, emotional, and/or material quality of life.",
      symptoms: [
        { text: "Excessive menstrual blood loss (>80 mL per cycle, though clinical assessment is more practical)" },
        { text: "Bleeding lasting more than 7 days" },
        { text: "Passage of large clots" },
        { text: "Need for frequent pad/tampon changes (soaking through protection every 1-2 hours)" },
        { text: "Symptoms of anemia (fatigue, shortness of breath, dizziness)" }
      ],
      diagnosticFindings: [
        { text: "Iron deficiency anemia in severe or chronic cases" },
        { text: "Normal or abnormal pelvic examination depending on cause" },
        { text: "Ultrasound findings may include fibroids, polyps, or adenomyosis" },
        { text: "Endometrial biopsy may show hyperplasia, malignancy, or normal findings" },
        { text: "Coagulation studies may reveal underlying bleeding disorders in some cases" }
      ],
      causes: [
        { text: "Structural: uterine fibroids, polyps, adenomyosis" },
        { text: "Ovulatory dysfunction (anovulation, oligoovulation)" },
        { text: "Coagulopathies (von Willebrand disease, platelet function disorders)" },
        { text: "Endometrial disorders (primary endometrial dysfunction)" },
        { text: "Iatrogenic (anticoagulants, copper IUD, hormone therapy)" }
      ]
    },
    {
      name: "Irregular Menstrual Bleeding",
      abbreviation: "IMB",
      anchor_id: "irregular-menstrual-bleeding",
      description: "Irregular menstrual bleeding encompasses a spectrum of abnormalities in the regularity, frequency, and pattern of menstruation, including intermenstrual bleeding.",
      symptoms: [
        { text: "Unpredictable timing of menstrual periods" },
        { text: "Variable duration and flow of menstruation" },
        { text: "Bleeding or spotting between periods" },
        { text: "Postcoital bleeding in some cases" },
        { text: "Associated symptoms may provide clues to etiology (pain with endometriosis or adenomyosis)" }
      ],
      diagnosticFindings: [
        { text: "Laboratory tests may reveal hormonal imbalances, thyroid dysfunction, or hyperprolactinemia" },
        { text: "Pregnancy testing is essential to rule out pregnancy-related bleeding" },
        { text: "Ultrasound may show structural abnormalities or polycystic ovaries" },
        { text: "Cervical evaluation may identify polyps, ectropion, or malignancy" },
        { text: "Endometrial assessment may be indicated depending on age and risk factors" }
      ],
      causes: [
        { text: "Ovulatory dysfunction (PCOS, hypothalamic dysfunction, perimenopause)" },
        { text: "Structural abnormalities (submucous fibroids, polyps, adenomyosis)" },
        { text: "Endometrial causes (infection, inflammation)" },
        { text: "Iatrogenic (hormonal contraceptives, anticoagulants)" },
        { text: "Cervical causes (polyps, ectropion, malignancy)" },
        { text: "Systemic conditions (thyroid disorders, hyperprolactinemia)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Medical Management of Abnormal Uterine Bleeding",
      slug: "medical-management-of-abnormal-uterine-bleeding",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Medical management is typically first-line therapy for abnormal uterine bleeding, particularly for non-structural causes or when fertility preservation is desired."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Hormonal Therapies" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Levonorgestrel-releasing intrauterine systems (LNG-IUS) provide highly effective reduction in menstrual blood loss (70-95%) while offering contraception. They are effective for both structural (small fibroids, adenomyosis) and non-structural causes. Combined hormonal contraceptives (pills, patch, ring) reduce bleeding by 40-50% and regulate cycles, particularly beneficial for ovulatory dysfunction. Progestin-only methods include oral progestins (cyclical or continuous), depot medroxyprogesterone acetate, and the etonogestrel implant. GnRH agonists induce reversible hypogonadotropic hypogonadism, effectively treating heavy bleeding. However, they are typically used short-term due to bone loss and menopausal symptoms, though add-back therapy can extend use."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Non-hormonal Therapies" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Tranexamic acid, an antifibrinolytic agent, reduces menstrual blood loss by approximately 40-50% when taken during menses. It is particularly useful for women with contraindications to hormonal treatments or those desiring pregnancy. Nonsteroidal anti-inflammatory drugs (NSAIDs) reduce bleeding by 20-40% through inhibition of prostaglandin synthesis. They also provide analgesia for dysmenorrhea. Iron supplementation is important to treat or prevent iron deficiency anemia associated with heavy bleeding. For specific etiologies, targeted treatments may include management of thyroid disorders, correction of coagulation abnormalities, or adjustments to medications that may contribute to bleeding."
            }
          ]
        }
      ]
    },
    {
      title: "Surgical Management of Abnormal Uterine Bleeding",
      slug: "surgical-management-of-abnormal-uterine-bleeding",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Surgical interventions for abnormal uterine bleeding are considered when medical management is ineffective, contraindicated, not tolerated, or when structural abnormalities require treatment."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Minimally Invasive Procedures" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Endometrial ablation destroys or removes the endometrial lining, reducing or eliminating menstrual flow. Techniques include radiofrequency ablation, thermal balloon, hydrothermal, cryoablation, and microwave. It is suitable for women who have completed childbearing, with success rates of 80-90%. Hysteroscopic procedures allow direct visualization and targeted treatment of intrauterine pathology. These include polypectomy, myomectomy for submucous fibroids, and resection of endometrial hyperplasia. Uterine artery embolization is an interventional radiological procedure that reduces blood flow to fibroids, causing them to shrink. It is an option for women with fibroids who wish to avoid hysterectomy."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Definitive Surgical Management" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Hysterectomy provides definitive treatment for abnormal uterine bleeding with 100% effectiveness. It may be performed abdominally, vaginally, or laparoscopically, with minimally invasive approaches preferred when feasible. Indications include failure of less invasive treatments, certain structural abnormalities, malignancy, or patient preference. Myomectomy removes fibroids while preserving the uterus and fertility. It can be performed hysteroscopically, laparoscopically, or via laparotomy depending on fibroid location, size, and number. Recurrence of fibroids and bleeding is possible. Patients should be counseled about all available options, including risks, benefits, and expectations for each procedure. Preoperative optimization, including treatment of anemia and consideration of GnRH agonists to reduce bleeding and fibroid size, may improve surgical outcomes."
            }
          ]
        }
      ]
    }
  ]
},
// 9. Endocrine System Topics
{
  title: "Diabetes Mellitus",
  slug: "diabetes-mellitus",
  introduction: "Diabetes mellitus is a group of metabolic disorders characterized by chronic hyperglycemia resulting from defects in insulin secretion, insulin action, or both. It affects over 460 million people worldwide and is a leading cause of blindness, kidney failure, heart attacks, stroke, and lower limb amputation.",
  diagnosis_overview: "Diagnosis is based on fasting plasma glucose, 2-hour plasma glucose during an oral glucose tolerance test, HbA1c, or random plasma glucose in the presence of symptoms. Classification into type 1, type 2, gestational, or other specific types guides management approaches.",
  management: "Management involves a multifaceted approach including lifestyle modifications, pharmacotherapy, and management of complications and comorbidities. Treatment goals should be individualized based on age, comorbidities, disease duration, and patient preferences.",
  highyieldPoints: "- Know the diagnostic criteria for diabetes and prediabetes\n- Understand the pharmacologic options for managing type 2 diabetes and their mechanisms of action\n- Be familiar with the approach to screening for and managing diabetes complications",
  systemIndex: 8, // Reference to Endocrine System
  types: [
    {
      name: "Type 1 Diabetes",
      abbreviation: "T1DM",
      anchor_id: "type-1-diabetes",
      description: "Type 1 diabetes results from autoimmune destruction of pancreatic beta cells, leading to absolute insulin deficiency. It typically develops in childhood or adolescence but can occur at any age.",
      symptoms: [
        { text: "Polyuria (excessive urination)" },
        { text: "Polydipsia (excessive thirst)" },
        { text: "Polyphagia (excessive hunger)" },
        { text: "Unexplained weight loss" },
        { text: "Fatigue" },
        { text: "Diabetic ketoacidosis at presentation in many cases" }
      ],
      diagnosticFindings: [
        { text: "Hyperglycemia (fasting plasma glucose ≥126 mg/dL, 2-h plasma glucose ≥200 mg/dL during OGTT, or HbA1c ≥6.5%)" },
        { text: "Presence of autoantibodies (anti-GAD, anti-islet cell, anti-insulin, anti-IA2, anti-ZnT8)" },
        { text: "Low or undetectable C-peptide levels" },
        { text: "Absence of insulin resistance markers" }
      ],
      causes: [
        { text: "Autoimmune destruction of pancreatic beta cells" },
        { text: "Genetic predisposition (HLA associations)" },
        { text: "Environmental triggers (possibly viral infections, dietary factors)" },
        { text: "Idiopathic (rare cases without evidence of autoimmunity)" }
      ]
    },
    {
      name: "Type 2 Diabetes",
      abbreviation: "T2DM",
      anchor_id: "type-2-diabetes",
      description: "Type 2 diabetes is characterized by insulin resistance and progressive beta cell dysfunction, leading to relative insulin deficiency. It accounts for 90-95% of all diabetes cases.",
      symptoms: [
        { text: "Often asymptomatic or insidious onset" },
        { text: "Polyuria and polydipsia (less dramatic than in T1DM)" },
        { text: "Recurrent infections (urinary tract, skin)" },
        { text: "Blurred vision" },
        { text: "Fatigue" },
        { text: "May present with complications due to delayed diagnosis" }
      ],
      diagnosticFindings: [
        { text: "Hyperglycemia (same criteria as T1DM)" },
        { text: "Evidence of insulin resistance (elevated fasting insulin or C-peptide)" },
        { text: "Metabolic syndrome features (hypertension, dyslipidemia, central obesity)" },
        { text: "Absence of autoantibodies" },
        { text: "Acanthosis nigricans in some patients" }
      ],
      causes: [
        { text: "Strong genetic predisposition" },
        { text: "Obesity (especially central adiposity)" },
        { text: "Sedentary lifestyle" },
        { text: "Aging" },
        { text: "History of gestational diabetes" },
        { text: "Beta cell failure over time" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Diabetes Complications and Screening",
      slug: "diabetes-complications-and-screening",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Diabetes complications significantly impact morbidity, mortality, and quality of life. Regular screening and early intervention are essential to prevent or delay progression."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Microvascular Complications" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Diabetic retinopathy is the leading cause of blindness in working-age adults. Screening should begin at diagnosis for T2DM and 5 years after diagnosis for T1DM, with referral to ophthalmology for comprehensive dilated eye examination. Follow-up examinations should occur annually or more frequently if abnormalities are detected. Diabetic kidney disease affects approximately 20-40% of people with diabetes. Screening includes annual assessment of urinary albumin-to-creatinine ratio and estimated glomerular filtration rate (eGFR). Treatment includes optimization of glycemic and blood pressure control, particularly with ACE inhibitors or ARBs. Diabetic neuropathy, both peripheral and autonomic, should be screened for annually using simple clinical tests (monofilament, tuning fork, etc.) beginning at diagnosis for T2DM and 5 years after diagnosis for T1DM."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Macrovascular Complications" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cardiovascular disease is the leading cause of morbidity and mortality in diabetes. Risk assessment should include traditional risk factors and diabetes-specific factors. Primary prevention includes lifestyle modification, glycemic control, blood pressure management, lipid management (typically with statins), and consideration of antiplatelet therapy for higher-risk patients. Cerebrovascular disease risk is increased 2-4 fold in diabetes. Prevention strategies are similar to those for cardiovascular disease. Peripheral arterial disease should be screened for with history, pulse examination, and ankle-brachial index when indicated. Foot examination should be performed at least annually to assess risk for ulceration and amputation."
            }
          ]
        }
      ]
    },
    {
      title: "Pharmacotherapy of Type 2 Diabetes",
      slug: "pharmacotherapy-of-type-2-diabetes",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Pharmacologic management of type 2 diabetes has evolved significantly with the development of newer agents targeting different pathophysiological aspects of the disease."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "First-line and Traditional Agents" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Metformin remains the preferred initial pharmacologic agent for most patients with type 2 diabetes. It works primarily by reducing hepatic glucose production and improving insulin sensitivity. Benefits include weight neutrality or modest weight loss, rare hypoglycemia when used as monotherapy, and potential cardiovascular benefits. Sulfonylureas stimulate insulin secretion by binding to the ATP-sensitive potassium channels on pancreatic beta cells. They are effective and inexpensive but associated with weight gain and hypoglycemia. Thiazolidinediones (pioglitazone, rosiglitazone) improve insulin sensitivity by activating PPAR-γ receptors. They have durable glycemic effects but are associated with weight gain, fluid retention, heart failure risk, and bone fractures."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Newer Agents" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Glucagon-like peptide-1 receptor agonists (GLP-1 RAs) mimic incretin hormones, increasing insulin secretion, decreasing glucagon secretion, slowing gastric emptying, and increasing satiety. They are associated with weight loss and have demonstrated cardiovascular benefits in high-risk patients. Sodium-glucose cotransporter-2 inhibitors (SGLT2i) prevent glucose reabsorption in the proximal tubule, increasing urinary glucose excretion. They provide modest weight loss, blood pressure reduction, and have shown cardiovascular and renal benefits independent of glycemic control. Dipeptidyl peptidase-4 inhibitors (DPP-4i) prevent degradation of endogenous incretins, modestly improving glycemic control without weight gain or hypoglycemia. They are generally well-tolerated but have neutral cardiovascular effects."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Thyroid Disorders",
  slug: "thyroid-disorders",
  introduction: "Thyroid disorders are among the most common endocrine conditions, affecting the thyroid gland's ability to produce hormones that regulate metabolism, energy production, and numerous physiological processes. They range from functional abnormalities to structural diseases and can significantly impact quality of life when untreated.",
  diagnosis_overview: "Diagnosis is based on clinical assessment, thyroid function tests (primarily TSH, free T4, and sometimes free T3), and imaging studies when indicated. Antibody testing helps identify autoimmune thyroid disorders, while fine-needle aspiration biopsy is used to evaluate thyroid nodules.",
  management: "Management depends on the specific thyroid disorder and may include medication (thyroid hormone replacement, antithyroid drugs), radioactive iodine therapy, or surgery. Regular monitoring is essential to ensure optimal treatment and prevent complications.",
  highyieldPoints: "- Know the clinical presentation and diagnostic approach to hyper- and hypothyroidism\n- Understand the pharmacologic management of thyroid disorders and potential adverse effects\n- Be familiar with the evaluation and management of thyroid nodules",
  systemIndex: 8, // Reference to Endocrine System
  types: [
    {
      name: "Hypothyroidism",
      abbreviation: "HypoT",
      anchor_id: "hypothyroidism",
      description: "Hypothyroidism is characterized by insufficient production of thyroid hormones, resulting in a hypometabolic state affecting multiple organ systems.",
      symptoms: [
        { text: "Fatigue and weakness" },
        { text: "Cold intolerance" },
        { text: "Weight gain despite decreased appetite" },
        { text: "Dry skin, brittle hair and nails" },
        { text: "Constipation" },
        { text: "Bradycardia" },
        { text: "Menstrual irregularities" },
        { text: "Depression, cognitive slowing" },
        { text: "Myalgias and arthralgias" }
      ],
      diagnosticFindings: [
        { text: "Elevated TSH (primary hypothyroidism)" },
        { text: "Low free T4" },
        { text: "Positive anti-thyroid peroxidase (anti-TPO) antibodies in autoimmune cases" },
        { text: "Elevated lipid levels, mild anemia, hyponatremia" },
        { text: "Nonpitting edema (myxedema) in severe cases" }
      ],
      causes: [
        { text: "Chronic autoimmune thyroiditis (Hashimoto's thyroiditis) - most common cause" },
        { text: "Iatrogenic (post-thyroidectomy, radioactive iodine therapy, neck radiation)" },
        { text: "Medications (amiodarone, lithium, iodine, tyrosine kinase inhibitors)" },
        { text: "Central hypothyroidism (pituitary or hypothalamic disorders)" },
        { text: "Iodine deficiency (uncommon in developed countries)" },
        { text: "Congenital (thyroid dysgenesis, dyshormonogenesis)" }
      ]
    },
    {
      name: "Hyperthyroidism",
      abbreviation: "HyperT",
      anchor_id: "hyperthyroidism",
      description: "Hyperthyroidism results from excessive production of thyroid hormones, causing a hypermetabolic state with multisystem effects.",
      symptoms: [
        { text: "Weight loss despite increased appetite" },
        { text: "Heat intolerance, increased sweating" },
        { text: "Palpitations, tachycardia" },
        { text: "Tremor, hyperreflexia" },
        { text: "Anxiety, irritability, insomnia" },
        { text: "Frequent bowel movements" },
        { text: "Menstrual irregularities" },
        { text: "Muscle weakness, especially proximal" },
        { text: "Eye symptoms in Graves' disease (proptosis, lid lag, ophthalmopathy)" }
      ],
      diagnosticFindings: [
        { text: "Suppressed TSH" },
        { text: "Elevated free T4 and/or free T3" },
        { text: "Positive TSH receptor antibodies (TRAb) in Graves' disease" },
        { text: "Increased radioiodine uptake in Graves' disease and toxic nodules" },
        { text: "Decreased uptake in thyroiditis" }
      ],
      causes: [
        { text: "Graves' disease (autoimmune)" },
        { text: "Toxic multinodular goiter" },
        { text: "Toxic adenoma" },
        { text: "Thyroiditis (subacute, silent, postpartum)" },
        { text: "Iatrogenic (excessive thyroid hormone replacement)" },
        { text: "Medication-induced (amiodarone, iodine load)" },
        { text: "TSH-secreting pituitary adenoma (rare)" },
        { text: "hCG-mediated (gestational trophoblastic disease, hyperemesis gravidarum)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Thyroid Nodules and Cancer",
      slug: "thyroid-nodules-and-cancer",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Thyroid nodules are discrete lesions within the thyroid gland that are radiologically distinct from the surrounding thyroid parenchyma. They are common, with prevalence increasing with age, and the main clinical concern is to rule out malignancy."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Evaluation of Thyroid Nodules" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Initial evaluation includes a focused history and physical examination, with attention to risk factors for malignancy (radiation exposure, family history, rapid growth, hoarseness, dysphagia, lymphadenopathy). Laboratory assessment should include TSH, as hyperfunctioning nodules are rarely malignant. Thyroid ultrasound is the imaging study of choice, characterizing nodule size, composition, margins, echogenicity, and presence of microcalcifications. Suspicious sonographic features include hypoechogenicity, irregular margins, taller-than-wide shape, and microcalcifications. Fine-needle aspiration (FNA) biopsy is recommended based on size and sonographic characteristics, with interpretation using the Bethesda System for Reporting Thyroid Cytopathology."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management of Thyroid Cancer" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Papillary thyroid cancer (PTC) is the most common type (80-85%), with excellent prognosis (>98% 10-year survival for localized disease). Treatment includes surgery (lobectomy or total thyroidectomy depending on risk factors), with consideration of radioactive iodine ablation for higher-risk patients. Follicular thyroid cancer (10-15%) is characterized by capsular or vascular invasion and typically requires total thyroidectomy. Medullary thyroid cancer (5%) arises from parafollicular C cells, produces calcitonin, and may be sporadic or associated with multiple endocrine neoplasia syndromes. Treatment is primarily surgical with extensive lymph node dissection. Anaplastic thyroid cancer (<1%) is highly aggressive with poor prognosis, often requiring multimodality therapy. Long-term management of differentiated thyroid cancer includes TSH suppression therapy, surveillance with serum thyroglobulin, and periodic imaging."
            }
          ]
        }
      ]
    },
    {
      title: "Thyroid Disease in Pregnancy",
      slug: "thyroid-disease-in-pregnancy",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Thyroid disorders are the second most common endocrine condition in pregnancy after diabetes. Normal pregnancy induces significant changes in thyroid physiology and function, complicating the diagnosis and management of thyroid disorders."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Physiological Changes and Diagnosis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Pregnancy-related changes include increased thyroid-binding globulin, stimulation of the TSH receptor by hCG, increased iodine clearance, and placental deiodinase activity. These changes affect thyroid function tests, necessitating trimester-specific reference ranges. Typically, TSH decreases in the first trimester (sometimes below the non-pregnant reference range) due to hCG cross-reactivity with TSH receptors, then gradually rises in the second and third trimesters. Free T4 and free T3 measurements may be affected by changes in binding proteins, making interpretation challenging. Total T4 and T3 increase due to higher thyroid-binding globulin but are rarely used clinically."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management of Thyroid Disorders in Pregnancy" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Hypothyroidism affects 2-3% of pregnancies and is associated with adverse maternal and fetal outcomes if untreated. Levothyroxine is the treatment of choice, with dose requirements often increasing by 30-50% during pregnancy. TSH should be maintained at the lower end of the trimester-specific reference range (<2.5 mIU/L for first trimester). Monitoring should occur every 4-6 weeks during the first half of pregnancy, then at least once in the second half. Hyperthyroidism complicates 0.1-0.4% of pregnancies, with Graves' disease being the most common cause. Propylthiouracil is preferred in the first trimester due to lower risk of embryopathy, with consideration of switching to methimazole thereafter. The goal is to maintain maternal free T4 at the upper end of the reference range using the lowest effective dose of antithyroid medication. Gestational transient thyrotoxicosis due to hCG is self-limiting and typically requires only supportive care. Postpartum thyroiditis affects 5-10% of women in the first year after delivery, with a typical triphasic pattern (thyrotoxicosis, hypothyroidism, return to euthyroidism), though not all phases occur in all women."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Adrenal Disorders",
  slug: "adrenal-disorders",
  introduction: "Adrenal disorders encompass a spectrum of conditions affecting the adrenal cortex, which produces mineralocorticoids, glucocorticoids, and androgens, or the adrenal medulla, which produces catecholamines. These disorders can result from hormone excess or deficiency, and may be primary (originating in the adrenal gland) or secondary (resulting from pituitary or hypothalamic dysfunction).",
  diagnosis_overview: "Diagnosis involves clinical assessment, hormone measurements (baseline and dynamic testing), and imaging studies. The pattern of hormone abnormalities helps differentiate between primary and secondary disorders, while imaging localizes and characterizes adrenal lesions.",
  management: "Management depends on the specific disorder and may include medication to replace deficient hormones or block excess hormone production, surgery to remove tumors, or observation for non-functioning adrenal masses. Regular monitoring is essential to assess treatment efficacy and detect complications.",
  highyieldPoints: "- Know the clinical features and diagnostic approach to Cushing's syndrome, Conn's syndrome, and adrenal insufficiency\n- Understand the appropriate workup for an incidentally discovered adrenal mass\n- Be familiar with the management of adrenal crisis, a life-threatening emergency",
  systemIndex: 8, // Reference to Endocrine System
  types: [
    {
      name: "Adrenal Insufficiency",
      abbreviation: "AI",
      anchor_id: "adrenal-insufficiency",
      description: "Adrenal insufficiency results from inadequate production of adrenal cortical hormones, primarily cortisol with or without aldosterone deficiency. It can be primary (adrenal disease) or secondary (pituitary or hypothalamic disease).",
      symptoms: [
        { text: "Fatigue, weakness" },
        { text: "Weight loss, anorexia" },
        { text: "Hyperpigmentation (in primary AI due to elevated ACTH)" },
        { text: "Postural hypotension, salt craving (with mineralocorticoid deficiency)" },
        { text: "Abdominal pain, nausea, vomiting" },
        { text: "Mood changes, depression" },
        { text: "Hypoglycemia" }
      ],
      diagnosticFindings: [
        { text: "Primary AI: Low cortisol, elevated ACTH, possible electrolyte abnormalities (hyponatremia, hyperkalemia)" },
        { text: "Secondary AI: Low cortisol, low or inappropriately normal ACTH, typically normal electrolytes" },
        { text: "Subnormal response to ACTH stimulation test" },
        { text: "Adrenal calcifications, atrophy, or masses on imaging in some cases of primary AI" },
        { text: "Pituitary abnormalities on MRI in some cases of secondary AI" }
      ],
      causes: [
        { text: "Primary: Autoimmune adrenalitis (Addison's disease), tuberculosis, fungal infections, metastatic cancer, adrenal hemorrhage, medications (ketoconazole, etomidate)" },
        { text: "Secondary: Glucocorticoid withdrawal, pituitary tumors or surgery, pituitary infarction (Sheehan's syndrome), cranial irradiation, isolated ACTH deficiency" },
        { text: "Tertiary: Chronic glucocorticoid therapy with suppression of hypothalamic-pituitary-adrenal axis" }
      ]
    },
    {
      name: "Cushing's Syndrome",
      abbreviation: "CS",
      anchor_id: "cushings-syndrome",
      description: "Cushing's syndrome results from chronic exposure to excess glucocorticoids, either from endogenous overproduction or exogenous administration. It has significant metabolic, cardiovascular, and psychological effects.",
      symptoms: [
        { text: "Central obesity, facial plethora (moon facies)" },
        { text: "Striae, easy bruising, thin skin" },
        { text: "Proximal muscle weakness" },
        { text: "Hypertension" },
        { text: "Glucose intolerance or diabetes" },
        { text: "Menstrual irregularities, decreased libido" },
        { text: "Psychiatric disturbances (depression, anxiety, psychosis)" },
        { text: "Osteoporosis, pathologic fractures" }
      ],
      diagnosticFindings: [
        { text: "Initial screening: elevated 24-hour urinary free cortisol, abnormal dexamethasone suppression test, or elevated late-night salivary cortisol" },
        { text: "ACTH levels to differentiate ACTH-dependent (elevated or normal) from ACTH-independent (suppressed) causes" },
        { text: "High-dose dexamethasone suppression test, CRH stimulation, and inferior petrosal sinus sampling to distinguish pituitary from ectopic ACTH" },
        { text: "Imaging of pituitary, adrenal, or suspected ectopic source based on biochemical evaluation" }
      ],
      causes: [
        { text: "ACTH-dependent: Pituitary adenoma (Cushing's disease, 70%), ectopic ACTH-producing tumors (small cell lung cancer, carcinoid, etc.)" },
        { text: "ACTH-independent: Adrenal adenoma, adrenal carcinoma, bilateral adrenal hyperplasia" },
        { text: "Exogenous (iatrogenic): Prolonged glucocorticoid therapy" },
        { text: "Pseudo-Cushing's: Alcohol dependence, depression, obesity, poorly controlled diabetes" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Primary Hyperaldosteronism",
      slug: "primary-hyperaldosteronism",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Primary hyperaldosteronism (PA), also known as Conn's syndrome, is characterized by autonomous aldosterone production independent of the renin-angiotensin system. It is the most common cause of secondary hypertension, accounting for 5-10% of all hypertensive patients and up to 20% of those with resistant hypertension."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Presentation and Diagnosis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Most patients present with hypertension, which is often resistant to conventional therapy. Hypokalemia may be present but is increasingly recognized to be absent in many cases. Other manifestations include metabolic alkalosis, muscle weakness, tetany, paresthesias, and polyuria/polydipsia. Screening is recommended for patients with resistant hypertension, hypertension with spontaneous or diuretic-induced hypokalemia, hypertension with adrenal incidentaloma, or hypertension in first-degree relatives with PA. The primary screening test is the aldosterone-to-renin ratio (ARR), measured under standardized conditions after controlling for interfering medications when possible. Confirmatory testing (salt loading, captopril challenge, or fludrocortisone suppression) is required for positive screening results. Subtype differentiation between aldosterone-producing adenoma and bilateral adrenal hyperplasia is determined through adrenal imaging (CT or MRI) and, in some cases, adrenal vein sampling."
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
              text: "For unilateral disease (typically aldosterone-producing adenoma), laparoscopic adrenalectomy is the treatment of choice, resulting in normalization of hypokalemia in virtually all patients and significant improvement or cure of hypertension in the majority. Factors predicting better response to surgery include younger age, shorter duration of hypertension, fewer antihypertensive medications, and normal renal function. For bilateral disease (idiopathic hyperaldosteronism) or patients who cannot undergo surgery, medical therapy with mineralocorticoid receptor antagonists (spironolactone or eplerenone) is recommended. Spironolactone is more potent but has more antiandrogenic side effects (gynecomastia, decreased libido), while eplerenone is more selective but less potent and more expensive. Other antihypertensives, particularly calcium channel blockers and angiotensin-converting enzyme inhibitors/angiotensin receptor blockers, are often needed for adequate blood pressure control."
            }
          ]
        }
      ]
    },
    {
      title: "Pheochromocytoma and Paraganglioma",
      slug: "pheochromocytoma-paraganglioma",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Pheochromocytomas and paragangliomas (PPGLs) are rare neuroendocrine tumors that arise from chromaffin cells of the adrenal medulla (pheochromocytoma) or extra-adrenal sympathetic and parasympathetic ganglia (paraganglioma). These tumors secrete catecholamines, causing episodic or sustained hypertension and other symptoms."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Presentation and Diagnosis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The classic triad of symptoms includes headache, sweating, and tachycardia, often occurring in paroxysms or attacks. Other manifestations include palpitations, anxiety, tremor, pallor, nausea, abdominal or chest pain, and weight loss. Hypertension may be paroxysmal, sustained, or, rarely, absent. The \"5 Ps\" mnemonic (pressure [hypertension], pain [headache], perspiration, palpitations, pallor) captures common features. Diagnostic testing relies on biochemical confirmation of excess catecholamine production, typically measuring fractionated metanephrines (metanephrine and normetanephrine) in plasma or 24-hour urine. These metabolites have higher sensitivity than measuring catecholamines directly. Imaging localization follows biochemical confirmation, using CT or MRI initially, with functional imaging (123I-MIBG, 18F-FDG PET, 68Ga-DOTATATE PET) for metastatic disease, multiple tumors, or recurrence. Genetic testing is recommended for all patients with PPGLs, as 30-40% have germline mutations in susceptibility genes (RET, VHL, NF1, SDHx, MAX, TMEM127)."
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
              text: "Surgical resection is the definitive treatment, preferably using minimally invasive techniques when appropriate. Preoperative medical preparation is crucial to prevent perioperative cardiovascular complications. Alpha-adrenergic blockade (phenoxybenzamine or doxazosin) should be initiated first, typically 1-2 weeks before surgery, followed by beta-blockade if needed for tachycardia or arrhythmias. Beta-blockers should never be started before adequate alpha-blockade due to risk of hypertensive crisis from unopposed alpha-adrenergic stimulation. Volume expansion and a liberal salt diet help prevent postoperative hypotension. Intraoperative monitoring and management by an experienced anesthesiology team is essential. For malignant or metastatic disease, options include surgery for resectable disease, 131I-MIBG therapy, chemotherapy (cyclophosphamide, vincristine, dacarbazine), targeted therapies based on genetic mutations, and peptide receptor radionuclide therapy for somatostatin receptor-positive tumors. Lifelong follow-up is recommended for all patients due to risk of recurrence or metachronous tumors, particularly in those with genetic syndromes."
            }
          ]
        }
      ]
    }
  ]
},
// 10. Eyes, Ears, Nose, and Throat Topics
{
  title: "Otitis Media",
  slug: "otitis-media",
  introduction: "Otitis media refers to inflammation of the middle ear, typically caused by viral or bacterial infection. It is one of the most common childhood illnesses and a leading reason for antibiotic prescriptions and surgery in children, though it can occur at any age.",
  diagnosis_overview: "Diagnosis is primarily clinical, based on history, otoscopic examination, and pneumatic otoscopy. Tympanometry can provide objective assessment of middle ear effusion, while audiometry may be indicated for persistent or recurrent cases to evaluate hearing loss.",
  management: "Management approaches include watchful waiting, antibiotic therapy, pain management, and in selected cases, surgical intervention. Treatment decisions should consider the type of otitis media, age of the patient, symptom severity, and risk factors for complications.",
  highyieldPoints: "- Know the diagnostic criteria and differential features of acute otitis media versus otitis media with effusion\n- Understand the approach to antibiotic selection and appropriate use of watchful waiting\n- Be familiar with indications for surgical intervention and specialist referral",
  systemIndex: 9, // Reference to Eyes, Ears, Nose, and Throat
  types: [
    {
      name: "Acute Otitis Media",
      abbreviation: "AOM",
      anchor_id: "acute-otitis-media",
      description: "Acute otitis media is characterized by rapid onset of signs and symptoms of middle ear inflammation and effusion. It is typically associated with pain and systemic symptoms.",
      symptoms: [
        { text: "Otalgia (ear pain), often severe" },
        { text: "Otorrhea (ear drainage) if tympanic membrane perforation occurs" },
        { text: "Hearing loss" },
        { text: "Fever" },
        { text: "Irritability, particularly in young children" },
        { text: "Pulling or tugging at the ear" },
        { text: "Sleep disturbance" },
        { text: "Decreased appetite" }
      ],
      diagnosticFindings: [
        { text: "Bulging, erythematous tympanic membrane" },
        { text: "Limited or absent mobility on pneumatic otoscopy" },
        { text: "Purulent middle ear effusion visible through tympanic membrane" },
        { text: "Tympanic membrane perforation with otorrhea in some cases" }
      ],
      causes: [
        { text: "Bacterial: Streptococcus pneumoniae, Haemophilus influenzae, Moraxella catarrhalis" },
        { text: "Viral: respiratory syncytial virus, rhinovirus, adenovirus, influenza virus" },
        { text: "Often preceded by upper respiratory infection" },
        { text: "Risk factors: young age, daycare attendance, absence of breastfeeding, exposure to tobacco smoke, craniofacial abnormalities" }
      ]
    },
    {
      name: "Otitis Media with Effusion",
      abbreviation: "OME",
      anchor_id: "otitis-media-with-effusion",
      description: "Otitis media with effusion is characterized by the presence of fluid in the middle ear without signs or symptoms of acute infection. It often follows acute otitis media but can occur primarily without preceding infection.",
      symptoms: [
        { text: "Often asymptomatic" },
        { text: "Hearing loss, typically mild to moderate conductive" },
        { text: "Sensation of ear fullness or pressure" },
        { text: "Popping, clicking, or crackling sounds during swallowing or yawning" },
        { text: "Balance problems in some cases" },
        { text: "No pain or fever" }
      ],
      diagnosticFindings: [
        { text: "Dull, retracted, or neutral position of tympanic membrane without erythema" },
        { text: "Visible air-fluid level or bubbles behind tympanic membrane" },
        { text: "Decreased mobility on pneumatic otoscopy" },
        { text: "Type B (flat) tympanogram indicating presence of middle ear fluid" },
        { text: "Conductive hearing loss on audiometry" }
      ],
      causes: [
        { text: "Residual middle ear effusion after acute otitis media (most common)" },
        { text: "Eustachian tube dysfunction" },
        { text: "Adenoid hypertrophy causing eustachian tube obstruction" },
        { text: "Barotrauma" },
        { text: "Allergic rhinitis" },
        { text: "Craniofacial abnormalities (cleft palate, Down syndrome)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Antibiotic Therapy for Acute Otitis Media",
      slug: "antibiotic-therapy-for-acute-otitis-media",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Antibiotic therapy for acute otitis media (AOM) should be used judiciously, considering both the benefits of accelerated symptom resolution and prevention of complications against the risks of adverse effects, antimicrobial resistance, and unnecessary treatment."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Observation versus Immediate Antibiotics" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Observation without antibiotics (watchful waiting) with appropriate pain management may be considered for selected children with non-severe AOM. Criteria for observation include: age ≥6 months with unilateral AOM without otorrhea, age ≥24 months with bilateral AOM without severe symptoms, reliable follow-up, and ability to begin antibiotics if symptoms worsen or fail to improve within 48-72 hours. Immediate antibiotic therapy is recommended for: children <6 months of age, children 6-24 months with bilateral AOM, children with severe symptoms (moderate to severe otalgia, otalgia for ≥48 hours, temperature ≥39°C), presence of otorrhea, recurrent AOM, presence of underlying medical conditions, or uncertain follow-up."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Antibiotic Selection and Duration" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "First-line therapy remains amoxicillin (80-90 mg/kg/day in children; 500-1000 mg TID in adults) for most patients without penicillin allergy. High-dose is recommended due to increasing prevalence of resistant S. pneumoniae. Amoxicillin-clavulanate is indicated for: severe illness, concurrent conjunctivitis, history of recurrent AOM unresponsive to amoxicillin, antibiotic use in the past 30 days, or high prevalence of beta-lactamase-producing H. influenzae and M. catarrhalis in the community. Alternative agents for penicillin-allergic patients include cefdinir, cefuroxime, ceftriaxone (severe cases), and for non-type I hypersensitivity, clindamycin. Treatment duration is typically 10 days for children <2 years, children with severe symptoms, or those with underlying conditions. A 5-7 day course may be sufficient for children ≥2 years with mild to moderate disease."
            }
          ]
        }
      ]
    },
    {
      title: "Complications and Recurrent Otitis Media",
      slug: "complications-and-recurrent-otitis-media",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "While most cases of otitis media resolve without sequelae, complications can occur, particularly with delayed treatment, antibiotic resistance, or underlying anatomical or immunological factors. Recurrent otitis media presents its own challenges for management."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Potential Complications" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Tympanic membrane perforation may occur during acute infection, usually healing spontaneously. Persistent perforation requires surgical repair (tympanoplasty). Conductive hearing loss commonly accompanies otitis media with effusion, potentially affecting language development and learning in children if persistent. Mastoiditis, infection of the mastoid air cells, presents with postauricular pain, erythema, swelling, and protrusion of the auricle. It requires aggressive antibiotic therapy and possibly surgical drainage. Intracranial complications, though rare, include meningitis, brain abscess, lateral sinus thrombosis, and epidural abscess. These present with headache, altered mental status, neurological deficits, and systemic toxicity, requiring urgent imaging, parenteral antibiotics, and potentially neurosurgical intervention."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Recurrent Otitis Media" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Recurrent acute otitis media, defined as ≥3 episodes in 6 months or ≥4 episodes in 12 months with at least one in the past 6 months, warrants additional evaluation and management. Prevention strategies include: identification and management of risk factors (daycare attendance, smoke exposure, pacifier use beyond 6 months), pneumococcal and influenza vaccination, and exclusive breastfeeding for at least 6 months when possible. Prophylactic antibiotics (usually amoxicillin or sulfamethoxazole-trimethoprim) may be considered for select cases during high-risk periods, though benefit must be weighed against risks of resistance and side effects. Surgical interventions, primarily tympanostomy tube placement, are indicated for recurrent AOM (≥3 episodes in 6 months or ≥4 in 12 months) despite prophylaxis, or for persistent OME with bilateral hearing loss for ≥3 months. Adenoidectomy may be considered in addition to tympanostomy tubes for recurrent or persistent otitis media, particularly when adenoid hypertrophy contributes to eustachian tube dysfunction."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Glaucoma",
  slug: "glaucoma",
  introduction: "Glaucoma is a group of eye conditions characterized by progressive optic neuropathy, typically associated with elevated intraocular pressure (IOP). It is a leading cause of irreversible blindness worldwide, affecting over 70 million people. The disease is often asymptomatic until significant visual field loss has occurred, making screening and early detection critical.",
  diagnosis_overview: "Diagnosis involves comprehensive eye examination, including measurement of intraocular pressure, evaluation of the optic nerve, assessment of the anterior chamber angle, and visual field testing. While elevated IOP is a significant risk factor, glaucoma can occur with normal pressure (normal-tension glaucoma).",
  management: "Management focuses on lowering intraocular pressure to prevent further optic nerve damage and visual field loss. Approaches include topical medications, laser procedures, and surgical interventions. Regular monitoring is essential to assess treatment efficacy and disease progression.",
  highyieldPoints: "- Know the different types of glaucoma and their clinical features\n- Understand the approach to medical management, including mechanisms of action of the various classes of IOP-lowering medications\n- Be familiar with indications for laser and surgical interventions and their potential complications",
  systemIndex: 9, // Reference to Eyes, Ears, Nose, and Throat
  types: [
    {
      name: "Primary Open-Angle Glaucoma",
      abbreviation: "POAG",
      anchor_id: "primary-open-angle-glaucoma",
      description: "Primary open-angle glaucoma is the most common form of glaucoma, characterized by an open, normal-appearing anterior chamber angle and progressive optic neuropathy, typically associated with elevated intraocular pressure.",
      symptoms: [
        { text: "Often asymptomatic until advanced stages" },
        { text: "Gradual peripheral visual field loss, typically beginning with paracentral scotomas" },
        { text: "Preserved central vision until late in disease" },
        { text: "Eventually may notice tunnel vision" },
        { text: "No pain, redness, or other acute symptoms" }
      ],
      diagnosticFindings: [
        { text: "Elevated intraocular pressure (>21 mmHg), though can occur with normal pressures" },
        { text: "Open anterior chamber angle on gonioscopy" },
        { text: "Characteristic optic nerve changes: increased cup-to-disc ratio, neural rim thinning, disc hemorrhages" },
        { text: "Visual field defects correlating with optic nerve damage" },
        { text: "Retinal nerve fiber layer thinning on optical coherence tomography (OCT)" }
      ],
      causes: [
        { text: "Multifactorial etiology" },
        { text: "Genetic factors (family history increases risk 4-10 fold)" },
        { text: "Increased resistance to aqueous outflow through trabecular meshwork" },
        { text: "Risk factors: age, race (higher in African Americans), family history, high myopia, thin central cornea, diabetes, hypertension" }
      ]
    },
    {
      name: "Acute Angle-Closure Glaucoma",
      abbreviation: "AACG",
      anchor_id: "acute-angle-closure-glaucoma",
      description: "Acute angle-closure glaucoma is an ophthalmic emergency characterized by sudden obstruction of aqueous outflow due to closure of the anterior chamber angle, resulting in rapidly elevated intraocular pressure and potential permanent vision loss if not promptly treated.",
      symptoms: [
        { text: "Sudden onset of severe eye pain" },
        { text: "Headache, often on the same side as the affected eye" },
        { text: "Blurred vision" },
        { text: "Halos around lights" },
        { text: "Nausea and vomiting" },
        { text: "Red eye" },
        { text: "Fixed, mid-dilated pupil" }
      ],
      diagnosticFindings: [
        { text: "Markedly elevated intraocular pressure (often >40-50 mmHg)" },
        { text: "Closed anterior chamber angle on gonioscopy" },
        { text: "Shallow anterior chamber" },
        { text: "Corneal edema" },
        { text: "Conjunctival injection" },
        { text: "Iris bombé (forward bowing of the peripheral iris)" }
      ],
      causes: [
        { text: "Anatomically narrow anterior chamber angle" },
        { text: "Pupillary block (most common mechanism)" },
        { text: "Precipitating factors: pupillary dilation (dark environment, emotional stress), medications with anticholinergic or sympathomimetic effects" },
        { text: "Risk factors: hyperopia, Asian ethnicity, female gender, older age, family history" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Medical Management of Glaucoma",
      slug: "medical-management-of-glaucoma",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Medical therapy, primarily in the form of topical eye drops, is typically the first-line treatment for most types of glaucoma. The goal is to lower intraocular pressure (IOP) to a target level that is expected to prevent further optic nerve damage and visual field loss."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Classes of IOP-Lowering Medications" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Prostaglandin analogs (latanoprost, travoprost, bimatoprost, tafluprost) are often first-line agents due to once-daily dosing, potent IOP-lowering effect (25-35%), and minimal systemic side effects. They work by increasing uveoscleral outflow. Side effects include conjunctival hyperemia, iris and periocular skin pigmentation, and eyelash growth. Beta-blockers (timolol, betaxolol, carteolol) reduce aqueous humor production and lower IOP by 20-25%. They are typically used twice daily. Systemic absorption can cause bradycardia, bronchospasm, and depression, making them contraindicated in patients with asthma, COPD, heart block, or severe heart failure. Alpha-2 agonists (brimonidine, apraclonidine) decrease aqueous production and increase uveoscleral outflow, reducing IOP by 15-25%. They are used two to three times daily. Side effects include conjunctival hyperemia, allergic conjunctivitis, and systemic effects like fatigue and dry mouth. Carbonic anhydrase inhibitors, both topical (dorzolamide, brinzolamide) and oral (acetazolamide), decrease aqueous humor production. Topical forms lower IOP by 15-20% and are used two to three times daily. Oral forms are more potent but have more systemic side effects, including paresthesias, fatigue, and metabolic acidosis. Cholinergic agents (pilocarpine) increase aqueous outflow through the trabecular meshwork by contracting the ciliary muscle. They lower IOP by 15-25% but require dosing up to four times daily and cause pupillary constriction, which can impair night vision and induce myopia."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Principles of Medical Therapy" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Treatment is typically initiated with a single agent, usually a prostaglandin analog due to efficacy, once-daily dosing, and favorable side effect profile. If the target IOP is not achieved, additional agents with different mechanisms of action may be added sequentially. Fixed-combination preparations can improve compliance by reducing the number of drops needed. Between-drop intervals of at least 5 minutes are recommended to minimize washout effects when multiple drops are used. Patient education regarding proper administration technique is crucial for optimizing drug delivery and minimizing systemic absorption. Regular monitoring of IOP, optic nerve, and visual fields is essential to assess treatment efficacy and disease progression."
            }
          ]
        }
      ]
    },
    {
      title: "Surgical and Laser Interventions for Glaucoma",
      slug: "surgical-and-laser-interventions-for-glaucoma",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Surgical and laser interventions for glaucoma are considered when medical therapy is insufficient to control intraocular pressure (IOP), when compliance with medications is poor, when medications are not tolerated, or for specific types of glaucoma where surgery is the primary treatment."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Laser Procedures" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Laser trabeculoplasty (selective laser trabeculoplasty, SLT; or argon laser trabeculoplasty, ALT) applies laser energy to the trabecular meshwork, improving aqueous outflow in open-angle glaucoma. It lowers IOP by 20-30% in 60-80% of patients, with effects typically lasting 1-5 years. It can be used as initial therapy or as an adjunct to medications. SLT has the advantage of being repeatable. Laser peripheral iridotomy (LPI) creates a small hole in the peripheral iris to allow aqueous flow from the posterior to anterior chamber, bypassing pupillary block. It is the definitive treatment for angle-closure glaucoma and is performed prophylactically in the fellow eye of patients with acute angle closure. It is also used preventatively in patients with anatomically narrow angles at risk for closure. Laser cyclophotocoagulation partially destroys the ciliary body to reduce aqueous production. It is typically reserved for refractory glaucoma or patients who are poor candidates for other surgeries due to risk of inflammation and vision loss."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Incisional Surgery and Minimally Invasive Procedures" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Trabeculectomy creates a guarded filtration channel between the anterior chamber and subconjunctival space, allowing aqueous to bypass the trabecular meshwork. It remains the gold standard filtering surgery, capable of lowering IOP to single digits when needed. Antifibrotic agents (mitomycin C, 5-fluorouracil) are often used to prevent scarring and failure. Complications include hypotony, bleb leak or infection, cataract formation, and endophthalmitis. Glaucoma drainage devices (tube shunts) divert aqueous humor from the anterior chamber to an external reservoir, where it is absorbed. Examples include Ahmed, Baerveldt, and Molteno implants. They are often used for refractory glaucoma or when trabeculectomy has failed. Minimally invasive glaucoma surgeries (MIGS) encompass various procedures that enhance physiologic outflow pathways with less tissue disruption and fewer complications than traditional filtering surgery. Examples include trabecular microbypass stents, ab interno trabeculotomy, and subconjunctival filtration devices. These procedures are often combined with cataract surgery and generally result in modest IOP lowering but with a better safety profile than trabeculectomy."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Sinusitis",
  slug: "sinusitis",
  introduction: "Sinusitis, or rhinosinusitis, is inflammation of the paranasal sinuses, typically involving the adjacent nasal cavity. It affects approximately 12% of adults in the United States and accounts for significant healthcare expenditures and antibiotic prescriptions. The condition ranges from acute (lasting less than 4 weeks) to chronic (lasting 12 weeks or longer).",
  diagnosis_overview: "Diagnosis is primarily clinical, based on symptoms, duration, and physical examination findings. Imaging studies and nasal endoscopy are not routinely indicated for uncomplicated acute rhinosinusitis but may be useful for evaluating chronic or recurrent cases, suspected complications, or treatment failures.",
  management: "Management depends on the type of sinusitis, severity of symptoms, and underlying causes. It often includes a combination of symptomatic relief, antibiotics for bacterial cases, and addressing contributing factors. Chronic rhinosinusitis typically requires a more comprehensive approach, potentially including long-term medications and surgical intervention.",
  highyieldPoints: "- Know the clinical criteria for diagnosing acute bacterial rhinosinusitis versus viral rhinosinusitis\n- Understand the appropriate use of antibiotics and supportive treatments\n- Be familiar with the management approach to chronic rhinosinusitis and when to refer for surgical evaluation",
  systemIndex: 9, // Reference to Eyes, Ears, Nose, and Throat
  types: [
    {
      name: "Acute Rhinosinusitis",
      abbreviation: "ARS",
      anchor_id: "acute-rhinosinusitis",
      description: "Acute rhinosinusitis is inflammation of the paranasal sinuses and nasal cavity lasting less than 4 weeks. It is predominantly viral in etiology (90-98% of cases), with bacterial superinfection occurring in a small percentage of cases.",
      symptoms: [
        { text: "Nasal congestion or obstruction" },
        { text: "Facial pain or pressure, often worse when bending forward" },
        { text: "Nasal discharge (anterior or posterior), initially clear, may become purulent" },
        { text: "Decreased or absent sense of smell (hyposmia or anosmia)" },
        { text: "Fever (more common in bacterial cases)" },
        { text: "Headache" },
        { text: "Tooth pain in maxillary sinusitis" },
        { text: "Ear pressure or fullness" }
      ],
      diagnosticFindings: [
        { text: "Mucosal erythema and edema on nasal examination" },
        { text: "Purulent nasal discharge, particularly in the middle meatus" },
        { text: "Sinus tenderness on palpation (unreliable finding)" },
        { text: "CT imaging (if performed) shows mucosal thickening, air-fluid levels, or opacification" }
      ],
      causes: [
        { text: "Viral upper respiratory infections (rhinovirus, influenza, coronavirus, etc.)" },
        { text: "Bacterial infection (often secondary to viral infection): Streptococcus pneumoniae, Haemophilus influenzae, Moraxella catarrhalis" },
        { text: "Allergic inflammation" },
        { text: "Anatomic factors (septal deviation, nasal polyps, foreign bodies)" },
        { text: "Dental infections (particularly for maxillary sinusitis)" }
      ]
    },
    {
      name: "Chronic Rhinosinusitis",
      abbreviation: "CRS",
      anchor_id: "chronic-rhinosinusitis",
      description: "Chronic rhinosinusitis is inflammation of the paranasal sinuses and nasal cavity persisting for 12 weeks or longer, characterized by persistent symptoms and objective evidence of inflammation despite treatment attempts.",
      symptoms: [
        { text: "Nasal congestion or obstruction" },
        { text: "Facial pressure or fullness (less severe than in acute cases)" },
        { text: "Mucopurulent drainage (anterior or posterior)" },
        { text: "Decreased sense of smell" },
        { text: "Fatigue" },
        { text: "Chronic cough (often worse at night)" },
        { text: "Halitosis" },
        { text: "Symptoms of underlying conditions (allergic rhinitis, asthma)" }
      ],
      diagnosticFindings: [
        { text: "Nasal endoscopy: mucosal edema, polyps, or purulent discharge" },
        { text: "CT imaging: mucosal thickening >3-4 mm, opacification, or obstruction of the osteomeatal complex" },
        { text: "Sinus cultures may show polymicrobial growth or biofilms" },
        { text: "Allergy testing may reveal sensitization to relevant allergens" }
      ],
      causes: [
        { text: "Persistent inflammation following acute rhinosinusitis" },
        { text: "Allergic rhinitis" },
        { text: "Non-allergic rhinitis" },
        { text: "Anatomic abnormalities (septal deviation, concha bullosa)" },
        { text: "Aspirin-exacerbated respiratory disease" },
        { text: "Immune deficiencies" },
        { text: "Cystic fibrosis" },
        { text: "Primary ciliary dyskinesia" },
        { text: "Biofilm formation" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Management of Acute Rhinosinusitis",
      slug: "management-of-acute-rhinosinusitis",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Management of acute rhinosinusitis begins with distinguishing between viral and bacterial etiologies, as this guides treatment decisions, particularly regarding antibiotic use."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Diagnostic Criteria for Acute Bacterial Rhinosinusitis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Acute bacterial rhinosinusitis (ABRS) should be diagnosed when symptoms persist beyond 10 days without improvement, symptoms are severe (fever ≥39°C and purulent nasal discharge or facial pain lasting for 3-4 consecutive days) at the onset of illness, or symptoms worsen after initial improvement (\"double-worsening\"). Without these features, symptoms are more likely due to viral rhinosinusitis and typically improve within 7-10 days."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Treatment Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "For viral rhinosinusitis, supportive care is the mainstay of treatment. This includes saline nasal irrigation, which helps remove infectious debris and inflammatory mediators while improving mucociliary clearance. Intranasal corticosteroids reduce inflammation and may be beneficial, particularly for patients with underlying allergic rhinitis. Analgesics (acetaminophen, NSAIDs) help manage pain and fever. Decongestants (oral or topical) may provide symptomatic relief but should be used short-term due to risk of rebound congestion with prolonged use. For acute bacterial rhinosinusitis, antibiotic therapy may be appropriate. Initial empiric options include amoxicillin-clavulanate (preferred first-line), which covers common pathogens including beta-lactamase producers. Alternatives for penicillin-allergic patients include doxycycline, or in non-type I allergies, cephalosporins like cefuroxime or cefpodoxime. Macrolides and trimethoprim-sulfamethoxazole are generally not recommended due to high resistance rates. Duration of therapy is typically 5-10 days, depending on severity and response. Observation without antibiotics (watchful waiting) with symptomatic treatment may be appropriate for uncomplicated ABRS with mild symptoms, particularly when follow-up is assured."
            }
          ]
        }
      ]
    },
    {
      title: "Chronic Rhinosinusitis with Nasal Polyps",
      slug: "chronic-rhinosinusitis-with-nasal-polyps",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Chronic rhinosinusitis with nasal polyps (CRSwNP) is a distinct subtype of chronic rhinosinusitis characterized by the presence of benign inflammatory outgrowths of sinonasal mucosa. It represents a more severe, difficult-to-treat variant of CRS with distinct inflammatory patterns and treatment considerations."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Features and Pathophysiology" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Nasal polyps appear as pale, grape-like structures arising most commonly from the middle meatus and ethmoid sinuses. They are edematous, with loose connective tissue, minimal vasculature, and abundant inflammatory cells. Patients typically present with substantial nasal obstruction, hyposmia or anosmia, and rhinorrhea. Facial pain is often less prominent than in CRS without polyps. CRSwNP is frequently associated with comorbid conditions including asthma, aspirin-exacerbated respiratory disease (AERD), and allergic fungal rhinosinusitis. The pathophysiology typically involves type 2 inflammation with eosinophilic infiltration and elevated levels of IL-4, IL-5, and IL-13, though non-eosinophilic, non-type 2 inflammation can also occur, particularly in Asian populations."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management Approach" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Medical therapy is the foundation of management, with intranasal corticosteroids at high doses being first-line treatment. These can be delivered as sprays, drops (more effective for polyps), or through direct irrigation after surgery. Systemic corticosteroids (oral prednisone burst, typically 10-14 days) are highly effective for reducing polyp size and symptoms but limited by significant side effects with long-term use. Biological therapies targeting type 2 inflammation have revolutionized treatment for severe, refractory cases. FDA-approved options include anti-IL-4/13 (dupilumab) and anti-IgE (omalizumab), with anti-IL-5 agents (mepolizumab) showing promise. These are typically reserved for patients who have failed conventional therapy. Surgical intervention (endoscopic sinus surgery) is indicated when medical therapy fails to control symptoms or complications develop. Surgery improves medication delivery and provides symptomatic relief, but without ongoing medical therapy, polyp recurrence rates are high (40-60% within 18 months). A combined approach with surgery followed by maintenance medical therapy, potentially including biologics in severe cases, offers the best outcomes for most patients with CRSwNP."
            }
          ]
        }
      ]
    }
  ]
},
// 11. Professional Practice Topics
{
  title: "Healthcare Ethics",
  slug: "healthcare-ethics",
  introduction: "Healthcare ethics encompasses the moral principles and values that guide decision-making in medical practice. It provides a framework for addressing complex situations where competing interests, obligations, or values create dilemmas for healthcare providers, patients, and other stakeholders. Ethical practice is fundamental to maintaining the integrity of the healthcare profession and public trust.",
  diagnosis_overview: "Identifying ethical issues requires recognition of situations involving potential conflicts between core principles, professional obligations, patient rights, or regulatory requirements. Systematic ethical analysis frameworks help in clarifying the ethical dimensions of a case and evaluating possible courses of action.",
  management: "Addressing ethical dilemmas often involves stakeholder discussion, consultation with ethics committees when available, and careful documentation of the decision-making process. Preventive strategies include clear communication, informed consent processes, and institutional policies that anticipate common ethical challenges.",
  highyieldPoints: "- Know the four core principles of bioethics and how they apply in clinical scenarios\n- Understand key concepts related to informed consent, capacity, and surrogate decision-making\n- Be familiar with approaches to resolving common ethical dilemmas in healthcare",
  systemIndex: 10, // Reference to Professional Practice
  types: [
    {
      name: "Ethical Principles in Healthcare",
      abbreviation: "EPH",
      anchor_id: "ethical-principles",
      description: "Ethical principles provide the foundation for analyzing and resolving ethical dilemmas in healthcare. The four widely recognized core principles are autonomy, beneficence, non-maleficence, and justice.",
      symptoms: [
        { text: "Ethical distress when principles conflict (e.g., respecting autonomy vs. preventing harm)" },
        { text: "Uncertainty about the right course of action in complex cases" },
        { text: "Tension between different stakeholders' perspectives" },
        { text: "Concerns about legal or professional implications of decisions" }
      ],
      diagnosticFindings: [
        { text: "Recognition of situations where multiple valid ethical perspectives exist" },
        { text: "Identification of competing obligations to different parties" },
        { text: "Awareness of personal values or biases affecting professional judgment" },
        { text: "Gaps in institutional policies addressing specific ethical challenges" }
      ],
      causes: [
        { text: "Respect for autonomy: honoring patients' right to make informed decisions about their care" },
        { text: "Beneficence: obligation to act for the benefit of patients and promote their welfare" },
        { text: "Non-maleficence: duty to avoid causing harm (\"first, do no harm\")" },
        { text: "Justice: fair distribution of benefits and burdens, including healthcare resources" },
        { text: "Additional principles: fidelity, confidentiality, veracity, and respect for dignity" }
      ]
    },
    {
      name: "Ethical Dilemmas in Clinical Practice",
      abbreviation: "EDCP",
      anchor_id: "ethical-dilemmas",
      description: "Ethical dilemmas arise in clinical practice when there are compelling reasons supporting multiple, mutually exclusive courses of action, or when every available option involves some ethical compromise.",
      symptoms: [
        { text: "End-of-life decisions: conflicts about withdrawing/withholding life-sustaining treatment" },
        { text: "Capacity and consent issues: uncertainty about patients' decision-making ability" },
        { text: "Confidentiality conflicts: when protecting privacy may conflict with preventing harm" },
        { text: "Resource allocation challenges: distributing limited healthcare resources fairly" },
        { text: "Professional boundary questions: appropriate provider-patient relationships" }
      ],
      diagnosticFindings: [
        { text: "Stakeholder disagreement about treatment goals or plans" },
        { text: "Conflicts between institutional policies and individual patient needs" },
        { text: "Tensions between legal requirements and ethical obligations" },
        { text: "Situations where any action or inaction has significant ethical implications" }
      ],
      causes: [
        { text: "Value pluralism: different cultural, religious, or personal values affecting perspectives" },
        { text: "Technological advances creating new capabilities without established ethical guidelines" },
        { text: "Systemic constraints: limitations in healthcare delivery systems affecting individual care" },
        { text: "Professional role conflicts: dual obligations to patients and other parties (families, institutions, society)" },
        { text: "Medical uncertainty: incomplete information about diagnosis, prognosis, or treatment effectiveness" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Informed Consent and Capacity Assessment",
      slug: "informed-consent-and-capacity",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Informed consent is a process of communication between a healthcare provider and patient that results in the patient's authorization or agreement to undergo a specific medical intervention. It is grounded in the ethical principle of respect for autonomy and the legal right to self-determination."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Elements of Valid Informed Consent" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Disclosure of information is the provider's responsibility to convey relevant information, including the nature of the condition, proposed intervention, potential risks and benefits, reasonable alternatives, and consequences of declining treatment. Understanding requires that the patient comprehend the information provided, which may necessitate adapting communication to the patient's level of health literacy, providing materials in the patient's primary language, and using teach-back methods to verify comprehension. Voluntariness ensures the patient's decision is made freely, without coercion, manipulation, or undue influence from healthcare providers, family members, or institutional pressures. Decision-making capacity is the patient's ability to understand relevant information, appreciate the situation and its consequences, reason about treatment options, and communicate a choice."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Capacity Assessment and Surrogate Decision-Making" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Capacity is decision-specific, time-specific, and exists on a spectrum rather than being an all-or-nothing characteristic. Assessment should focus on the patient's decision-making process rather than the outcome of the decision. Red flags for impaired capacity include frequent reversals of choice, inability to explain the decision rationally, and decisions highly incongruent with the patient's previously expressed values. When patients lack capacity, surrogate decision-makers step in, following this hierarchy: healthcare agent designated in an advance directive, court-appointed guardian, spouse, adult children, parents, adult siblings, and other relatives or close friends. Standards for surrogate decision-making include substituted judgment (what the patient would choose if capable, based on previous statements or known values) and best interest standard (what a reasonable person would choose in this situation, when the patient's wishes are unknown). Special considerations apply for vulnerable populations, including children (using assent alongside parental permission), individuals with cognitive impairments (maximizing participation in decisions while providing appropriate safeguards), and patients in emergency situations (where implied consent may be necessary)."
            }
          ]
        }
      ]
    },
    {
      title: "End-of-Life Ethics",
      slug: "end-of-life-ethics",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "End-of-life ethics addresses the complex moral considerations surrounding care for patients with terminal illness or life-limiting conditions. These issues involve balancing respect for patient autonomy with professional obligations to provide appropriate care, while navigating emotional, cultural, and sometimes legal challenges."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Advance Care Planning and Directives" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Advance care planning is an ongoing process of reflecting on and communicating preferences for future healthcare, particularly for situations when the patient cannot make decisions. It should ideally begin before crisis situations arise and be revisited periodically as health status or preferences change. Advance directives are legal documents that formalize these preferences, including living wills (specifying treatments desired or declined in specific scenarios) and durable powers of attorney for healthcare (designating a surrogate decision-maker). POLST (Physician Orders for Life-Sustaining Treatment) or similar forms translate these preferences into actionable medical orders for emergency situations. Effective implementation requires that directives be accessible when needed, regularly updated, and honored by healthcare providers and systems."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Ethical Considerations in Life-Sustaining Treatments" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Withholding vs. withdrawing treatment are ethically equivalent, though withdrawing often feels more difficult psychologically. There is no ethical obligation to provide interventions considered medically futile, though defining futility can be challenging and value-laden. Artificial nutrition and hydration are medical interventions that can be declined or withdrawn like other treatments, despite the symbolic significance often attached to food and water. Palliative sedation may be appropriate for intractable symptoms at the end of life, using the principle of double effect (the harm of hastened death may be foreseen but not intended when the primary goal is symptom relief). Medical aid in dying (physician-assisted suicide) remains controversial and is legal only in specific jurisdictions, with varying requirements for patient eligibility and safeguards. Palliative care focuses on relieving suffering and improving quality of life for patients with serious illness, regardless of prognosis or other concurrent therapies. It should be integrated early in the disease course rather than only at the end of life. Effective communication is essential in navigating these challenges, including discussing prognosis honestly, exploring goals of care, acknowledging uncertainty, and addressing emotional responses of patients and families."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Medical Error and Patient Safety",
  slug: "medical-error-patient-safety",
  introduction: "Medical errors and patient safety concerns represent significant challenges in healthcare delivery, with errors being a leading cause of morbidity and mortality. A systematic approach to preventing, identifying, and addressing medical errors is essential for providing high-quality, safe patient care and maintaining public trust in the healthcare system.",
  diagnosis_overview: "Recognizing medical errors involves awareness of common error types, contributing factors, and near-miss events. Effective error identification requires a blame-free culture that encourages reporting and analysis of adverse events and close calls to identify systemic vulnerabilities.",
  management: "Managing medical errors includes disclosure to patients, appropriate documentation, reporting through institutional and regulatory channels, and implementing corrective measures. A systems-based approach focuses on improving processes rather than punishing individuals, recognizing that most errors result from multiple system failures rather than individual negligence.",
  highyieldPoints: "- Know the classification of medical errors and common contributing factors\n- Understand the principles of error disclosure to patients and families\n- Be familiar with system-based approaches to error prevention and quality improvement",
  systemIndex: 10, // Reference to Professional Practice
  types: [
    {
      name: "Types of Medical Errors",
      abbreviation: "TME",
      anchor_id: "types-medical-errors",
      description: "Medical errors can be classified in various ways, including by type, severity, preventability, and setting. Understanding these classifications helps in developing targeted prevention strategies.",
      symptoms: [
        { text: "Adverse events: harm to patients resulting from medical care rather than underlying disease" },
        { text: "Near misses (close calls): errors that could have caused harm but did not reach the patient" },
        { text: "Never events: serious, preventable adverse events that should never occur (wrong-site surgery, retained foreign objects)" },
        { text: "Sentinel events: unexpected occurrences involving death or serious physical or psychological injury" }
      ],
      diagnosticFindings: [
        { text: "Diagnostic errors: missed, delayed, or incorrect diagnoses" },
        { text: "Treatment errors: medication errors, surgical mistakes, improper techniques" },
        { text: "Preventive errors: inadequate monitoring or follow-up, failure to provide prophylactic treatment" },
        { text: "Communication errors: between providers, between providers and patients, or in documentation" },
        { text: "System failures: equipment malfunctions, process breakdowns, inadequate policies" }
      ],
      causes: [
        { text: "Human factors: cognitive biases, fatigue, distractions, inadequate knowledge or skills" },
        { text: "System factors: poor design, inadequate resources, complex processes, lack of standardization" },
        { text: "Organizational factors: inadequate staffing, poor safety culture, production pressure" },
        { text: "Technical factors: equipment failures, software issues, technology complexity" },
        { text: "Patient factors: complexity of condition, language barriers, incomplete information" }
      ]
    },
    {
      name: "Patient Safety Systems",
      abbreviation: "PSS",
      anchor_id: "patient-safety-systems",
      description: "Patient safety systems are organizational structures and processes designed to prevent harm to patients, learn from errors, and foster a culture of safety within healthcare institutions.",
      symptoms: [
        { text: "Safety culture problems: blame-focused responses, underreporting of errors, resistance to change" },
        { text: "Communication breakdowns: during handoffs, between care teams, across departments" },
        { text: "Process variations: inconsistent protocols, workarounds, lack of standardization" },
        { text: "Resource inadequacies: insufficient staffing, equipment, training, or time" },
        { text: "Hierarchy issues: reluctance to speak up, dismissal of concerns from lower-ranking staff" }
      ],
      diagnosticFindings: [
        { text: "Safety culture assessments revealing areas for improvement" },
        { text: "Incident reports showing patterns or clusters of similar events" },
        { text: "Patient complaints highlighting recurrent problems" },
        { text: "Quality metrics indicating suboptimal performance" },
        { text: "Root cause analyses identifying system vulnerabilities" }
      ],
      causes: [
        { text: "Safety reporting systems: mechanisms for staff to report errors and near misses" },
        { text: "Just culture: balanced approach to accountability that distinguishes between human error, at-risk behavior, and reckless conduct" },
        { text: "High reliability principles: preoccupation with failure, reluctance to simplify, sensitivity to operations, commitment to resilience, deference to expertise" },
        { text: "Quality improvement methodologies: PDSA cycles, Lean, Six Sigma" },
        { text: "Teamwork and communication tools: structured handoffs, briefings/debriefings, simulation training" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Error Disclosure and Communication",
      slug: "error-disclosure-communication",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Communicating with patients and families about medical errors is an essential ethical obligation and an important component of patient-centered care. Effective disclosure can maintain trust, promote healing for all parties, and reduce the likelihood of litigation."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Principles of Error Disclosure" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Transparency is fundamental, requiring prompt, honest communication about what happened, including known facts and areas of uncertainty. Patients have the right to know about events affecting their health, regardless of whether harm occurred. Empathy should be expressed genuinely, acknowledging the impact on the patient and family without becoming defensive. Accountability involves accepting responsibility for errors without inappropriately assigning blame to individuals or systems. Apology, when appropriate, should be sincere and specific, clearly expressing regret for the error and its consequences. Remediation plans should address both the patient's immediate needs and system improvements to prevent recurrence."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Practical Approaches to Disclosure" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Preparing for disclosure includes gathering known facts, consulting with risk management when appropriate, and coordinating the disclosure team (typically including attending physician and other relevant providers). The setting should be private, comfortable, and free from interruptions, with sufficient time allocated. Key participants should include the patient, family members or support persons as desired by the patient, and healthcare providers directly involved in the event when possible. The disclosure process involves explaining what happened in clear, non-technical language, acknowledging uncertainty when present, expressing regret, answering questions honestly, outlining next steps in the patient's care, and describing what will be done to prevent similar events. Follow-up after initial disclosure is crucial, including ongoing communication about the patient's condition, providing new information as it becomes available, addressing unresolved questions or concerns, and updating on improvement initiatives. Documentation in the medical record should include factual details about the event, the disclosure conversation (who was present, information shared, questions raised), and follow-up plans. Institutional support for disclosure includes clear policies and procedures, training for providers, resources for emotional support (for both patients and providers), and integration with quality improvement processes."
            }
          ]
        }
      ]
    },
    {
      title: "Strategies for Error Prevention",
      slug: "strategies-error-prevention",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Preventing medical errors requires a multifaceted approach that addresses human factors, system design, and organizational culture. These strategies recognize that safety emerges from the interaction of individuals within complex systems rather than from individual vigilance alone."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "System-Based Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Standardization reduces unnecessary variation through evidence-based protocols, checklists, and algorithms for common procedures and high-risk situations. Examples include surgical time-outs, central line insertion bundles, and medication reconciliation processes. Simplification involves redesigning complex processes to reduce steps, handoffs, and dependencies, making errors less likely. Forcing functions and constraints are physical or digital barriers that prevent dangerous actions, such as incompatible connectors for different medical gases or computer alerts for drug interactions. Redundancies and double-checks create multiple opportunities to catch errors before they reach patients, particularly for high-risk processes like medication administration or critical test result reporting. Improved information access ensures that providers have complete, accurate, and timely information for decision-making, through electronic health records, point-of-care references, and decision support tools."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Human Factors and Cognitive Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cognitive debiasing strategies help counter common thinking traps, including metacognition (thinking about one's thinking), considering alternatives, and soliciting external perspectives. Situational awareness involves maintaining a comprehensive understanding of the current state, including patient condition, team capabilities, and system resources. Effective teamwork and communication tools include structured handoffs (SBAR, I-PASS), closed-loop communication, and psychological safety that encourages speaking up about concerns. Fatigue management recognizes the impact of sleep deprivation on performance, implementing work hour limitations, strategic napping, and fatigue risk management systems. Simulation and deliberate practice allow providers to develop skills and test processes in a safe environment before encountering high-stakes situations with actual patients. Learning systems create continuous improvement through root cause analysis of adverse events, proactive risk assessments, morbidity and mortality conferences, and widespread sharing of lessons learned."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Evidence-Based Medicine",
  slug: "evidence-based-medicine",
  introduction: "Evidence-based medicine (EBM) is the conscientious, explicit, and judicious use of current best evidence in making decisions about the care of individual patients. It integrates clinical expertise, patient values and preferences, and the best available research evidence to guide healthcare decisions. EBM is a cornerstone of modern medical practice, helping clinicians provide high-quality, effective care.",
  diagnosis_overview: "Applying EBM begins with formulating a clear clinical question, searching for relevant evidence, critically appraising that evidence for validity and applicability, and determining how to integrate the findings into clinical practice. This process helps clinicians make more informed diagnostic and treatment decisions.",
  management: "Implementing EBM involves translating evidence into practice while considering contextual factors such as patient preferences, resource constraints, and clinical setting. Regular updating of knowledge is essential as new evidence emerges, and clinicians must develop skills to critically evaluate research findings throughout their careers.",
  highyieldPoints: "- Know the basic steps of evidence-based practice and how to formulate answerable clinical questions\n- Understand the hierarchy of evidence and the strengths and limitations of different study designs\n- Be familiar with key concepts in critical appraisal, including bias, confounding, and measures of effect",
  systemIndex: 10, // Reference to Professional Practice
  types: [
    {
      name: "Clinical Research Study Designs",
      abbreviation: "CRSD",
      anchor_id: "clinical-research-designs",
      description: "Different clinical research study designs provide varying levels of evidence depending on their methodology, control of bias, and applicability to clinical questions. Understanding the strengths and limitations of each design is essential for appropriate evidence interpretation.",
      symptoms: [
        { text: "Uncertainty about the reliability of research findings" },
        { text: "Conflicting results between different studies on the same topic" },
        { text: "Difficulty determining whether research findings apply to specific patient populations" },
        { text: "Challenges in distinguishing between correlation and causation" }
      ],
      diagnosticFindings: [
        { text: "Randomized controlled trials (RCTs): experimental studies where participants are randomly assigned to intervention or control groups" },
        { text: "Cohort studies: observational studies following groups exposed or not exposed to a factor over time" },
        { text: "Case-control studies: observational studies comparing those with an outcome to those without" },
        { text: "Cross-sectional studies: observational studies examining relationships at a single point in time" },
        { text: "Case series and case reports: descriptions of clinical experiences with patients" },
        { text: "Systematic reviews and meta-analyses: comprehensive syntheses of multiple primary studies" }
      ],
      causes: [
        { text: "Need to establish causality between interventions and outcomes" },
        { text: "Ethical constraints limiting experimental designs for certain questions" },
        { text: "Practical limitations in conducting large-scale, long-term studies" },
        { text: "Requirements for different types of evidence depending on the clinical question" },
        { text: "Evolution of research methodology to address limitations of earlier approaches" }
      ]
    },
    {
      name: "Critical Appraisal of Research",
      abbreviation: "CAR",
      anchor_id: "critical-appraisal",
      description: "Critical appraisal is the systematic evaluation of research to assess its validity, results, and relevance to clinical practice. It involves examining methodology, statistical analysis, and potential biases to determine how much confidence to place in the findings.",
      symptoms: [
        { text: "Difficulty distinguishing high-quality from low-quality research" },
        { text: "Uncertainty about how to interpret statistical results" },
        { text: "Challenges in recognizing potential sources of bias" },
        { text: "Questions about the applicability of study findings to specific patients" }
      ],
      diagnosticFindings: [
        { text: "Internal validity: extent to which the study minimizes bias and confounding" },
        { text: "External validity: generalizability of findings to other populations and settings" },
        { text: "Statistical significance vs. clinical significance of results" },
        { text: "Precision of effect estimates (confidence intervals)" },
        { text: "Appropriate sample size and statistical power" },
        { text: "Completeness of follow-up and handling of missing data" }
      ],
      causes: [
        { text: "Selection bias: systematic differences between comparison groups" },
        { text: "Performance bias: systematic differences in care provided apart from the intervention" },
        { text: "Detection bias: systematic differences in outcome assessment" },
        { text: "Attrition bias: systematic differences in withdrawals from the study" },
        { text: "Reporting bias: selective revelation of findings" },
        { text: "Confounding: presence of variables associated with both exposure and outcome" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Applying Evidence in Clinical Practice",
      slug: "applying-evidence-clinical-practice",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Translating evidence into practice requires a structured approach that begins with a well-formulated clinical question and culminates in the application of findings to individual patient care, with consideration of context, preferences, and clinical expertise."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Formulating Clinical Questions" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The PICO framework helps structure searchable, answerable clinical questions: Patient/Problem (relevant characteristics of the patient or condition), Intervention (main action being considered), Comparison (alternative to the intervention), and Outcome (effect of interest). For example, \"In adult patients with type 2 diabetes (P), how does metformin (I) compared to sulfonylureas (C) affect hemoglobin A1c levels and hypoglycemia risk (O)?\" Questions typically fall into categories: therapy (effects of interventions), diagnosis (accuracy of diagnostic tests), prognosis (likely outcomes of conditions), etiology (causes or risk factors for disease), or prevention (reducing disease occurrence)."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Finding and Evaluating Evidence" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Evidence sources range from primary research in journals to pre-appraised resources like systematic reviews and clinical practice guidelines. A hierarchical search strategy starts with synthesized sources (clinical decision support tools, guidelines), then pre-appraised sources (systematic reviews), and finally primary research when needed. Efficient searching requires selecting appropriate databases (PubMed, Cochrane Library, etc.), using controlled vocabulary (MeSH terms) and filters, and balancing sensitivity and specificity. Evidence should be evaluated for quality using critical appraisal skills, considering study design, methodological quality, and potential biases. The level of evidence framework helps prioritize higher-quality designs, with well-conducted systematic reviews and randomized controlled trials at the top, followed by observational studies."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Decision Making" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Evidence must be integrated with clinical expertise and patient preferences. Clinical expertise includes recognizing the patient's clinical state, assessing risks and benefits, identifying unique circumstances, and applying technical skills. Patient preferences involve their values, concerns, expectations, and circumstances, and should be elicited through shared decision-making. Contextual factors affecting application include resource availability, healthcare system constraints, cultural considerations, local practice patterns, and medicolegal environment. Decision aids can help communicate evidence to patients in an understandable format, presenting options, outcomes, probabilities, and uncertainties. The final decision should reflect the best available evidence, tailored to the specific patient context and aligned with their informed preferences."
            }
          ]
        }
      ]
    },
    {
      title: "Understanding Clinical Practice Guidelines",
      slug: "understanding-clinical-practice-guidelines",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Clinical practice guidelines are systematically developed statements to assist practitioner and patient decisions about appropriate healthcare for specific clinical circumstances. They translate complex research evidence into recommendations for clinical practice."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Development and Evaluation" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The guideline development process typically involves systematic evidence review by a multidisciplinary panel, consideration of benefits and harms, and formulation of recommendations with explicit links to supporting evidence. High-quality guidelines use transparent methodology, manage conflicts of interest, and undergo external review. The GRADE approach (Grading of Recommendations Assessment, Development and Evaluation) is widely used to rate quality of evidence (high, moderate, low, very low) and strength of recommendations (strong or conditional/weak). Strong recommendations indicate high certainty that desirable effects outweigh undesirable effects, while conditional recommendations suggest more balanced tradeoffs or lower certainty. Tools for evaluating guideline quality include AGREE II (Appraisal of Guidelines for Research and Evaluation), which assesses domains such as scope and purpose, stakeholder involvement, rigor of development, clarity of presentation, applicability, and editorial independence."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Implementation and Limitations" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Guidelines should be adapted to local contexts, considering resource availability, patient populations, and healthcare system characteristics. Implementation strategies include education, clinical decision support tools, audit and feedback, and organizational changes. Barriers to implementation occur at multiple levels: provider (knowledge, attitudes, skills), patient (preferences, compliance), organizational (resources, workflows), and system (regulatory, financial incentives). Limitations of guidelines include potential conflicts of interest among developers, delays in updating as new evidence emerges, inadequate representation of patient perspectives, and limited applicability to patients with multiple comorbidities. Guidelines should inform but not replace clinical judgment. They are recommendations, not mandates, and appropriate deviations based on individual circumstances may be warranted. When guidelines differ, clinicians should consider recency, methodological quality, applicability to their patient population, and transparency about evidence quality and recommendation strength."
            }
          ]
        }
      ]
    }
  ]
},
// 12. Hematologic System Topics
{
  title: "Anemia",
  slug: "anemia",
  introduction: "Anemia is a condition characterized by a reduced number of red blood cells or decreased hemoglobin concentration, resulting in diminished oxygen-carrying capacity of the blood. It affects approximately 1.6 billion people worldwide and is associated with reduced quality of life, increased morbidity, and, in severe cases, mortality.",
  diagnosis_overview: "Diagnosis begins with a complete blood count showing decreased hemoglobin levels, followed by a systematic approach to determine the underlying cause. Classification based on red cell morphology (microcytic, normocytic, macrocytic) and pathophysiology (decreased production, increased destruction, blood loss) guides the diagnostic workup.",
  management: "Management focuses on treating the underlying cause while supporting oxygen delivery through transfusions when necessary. The approach varies widely depending on etiology, severity, chronicity, and patient factors. Regular monitoring of response to therapy is essential for optimizing outcomes.",
  highyieldPoints: "- Know the morphological classification of anemias and the differential diagnosis for each category\n- Understand the approach to diagnosis, including key laboratory tests and their interpretation\n- Be familiar with management strategies for common types of anemia, including iron deficiency, megaloblastic, and hemolytic anemias",
  systemIndex: 11, // Reference to Hematologic System
  types: [
    {
      name: "Microcytic Anemia",
      abbreviation: "MCA",
      anchor_id: "microcytic-anemia",
      description: "Microcytic anemia is characterized by small red blood cells (mean corpuscular volume [MCV] <80 fL) and typically results from defects in hemoglobin synthesis, most commonly due to iron deficiency.",
      symptoms: [
        { text: "Fatigue and weakness" },
        { text: "Shortness of breath, particularly with exertion" },
        { text: "Pale skin, conjunctiva, and nail beds" },
        { text: "Tachycardia" },
        { text: "Specific symptoms related to the underlying cause (e.g., heavy menstrual bleeding, gastrointestinal symptoms)" },
        { text: "Pica (craving for non-nutritive substances) in iron deficiency" },
        { text: "Koilonychia (spoon-shaped nails) in severe iron deficiency" }
      ],
      diagnosticFindings: [
        { text: "Decreased hemoglobin and hematocrit" },
        { text: "Low MCV (<80 fL)" },
        { text: "Variable red cell distribution width (RDW), often elevated in iron deficiency" },
        { text: "Iron studies: low serum iron, low ferritin, high total iron binding capacity in iron deficiency" },
        { text: "Normal or elevated ferritin in anemia of chronic disease" },
        { text: "Hemoglobin electrophoresis abnormalities in thalassemias" },
        { text: "Basophilic stippling in lead poisoning" }
      ],
      causes: [
        { text: "Iron deficiency anemia: decreased iron intake, chronic blood loss, malabsorption" },
        { text: "Thalassemias: genetic defects in hemoglobin chain synthesis" },
        { text: "Anemia of chronic disease (can be microcytic or normocytic)" },
        { text: "Sideroblastic anemia: impaired heme synthesis, can be congenital or acquired" },
        { text: "Lead poisoning: interferes with heme synthesis" }
      ]
    },
    {
      name: "Macrocytic Anemia",
      abbreviation: "MaCA",
      anchor_id: "macrocytic-anemia",
      description: "Macrocytic anemia is characterized by enlarged red blood cells (mean corpuscular volume [MCV] >100 fL) and may be megaloblastic or non-megaloblastic, depending on whether DNA synthesis is impaired.",
      symptoms: [
        { text: "General symptoms of anemia (fatigue, weakness, shortness of breath)" },
        { text: "Neurological symptoms in B12 deficiency (paresthesias, ataxia, dementia)" },
        { text: "Glossitis (smooth, red tongue)" },
        { text: "Jaundice (in hemolytic forms or severe megaloblastic anemia)" },
        { text: "Alcohol-related symptoms in alcoholic liver disease" }
      ],
      diagnosticFindings: [
        { text: "Elevated MCV (>100 fL)" },
        { text: "Megaloblastic changes in bone marrow (in B12/folate deficiency)" },
        { text: "Decreased vitamin B12 or folate levels in respective deficiencies" },
        { text: "Elevated methylmalonic acid and homocysteine in B12 deficiency" },
        { text: "Elevated homocysteine only in folate deficiency" },
        { text: "Liver function test abnormalities in alcoholic liver disease" },
        { text: "Pancytopenia in severe cases of megaloblastic anemia" },
        { text: "Hypersegmented neutrophils in megaloblastic anemia" }
      ],
      causes: [
        { text: "Megaloblastic: vitamin B12 deficiency (pernicious anemia, malabsorption, dietary deficiency), folate deficiency" },
        { text: "Non-megaloblastic: alcoholic liver disease, myelodysplastic syndrome, hypothyroidism" },
        { text: "Medication-induced: anticonvulsants, methotrexate, antiretrovirals" },
        { text: "Hemolytic anemias with reticulocytosis" },
        { text: "Chronic liver disease" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Iron Deficiency Anemia",
      slug: "iron-deficiency-anemia",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Iron deficiency anemia (IDA) is the most common type of anemia worldwide, affecting approximately 2 billion people. It results from inadequate iron stores to support normal red blood cell production, leading to microcytic, hypochromic anemia."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Etiology and Evaluation" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Common causes vary by age and sex. In premenopausal women, menstrual blood loss and pregnancy/lactation are predominant. In men and postmenopausal women, gastrointestinal blood loss (peptic ulcer disease, gastritis, malignancy, inflammatory bowel disease, angiodysplasia) should be suspected. Other causes include malabsorption (celiac disease, gastrectomy, Helicobacter pylori infection), dietary insufficiency (rare in developed countries except in infants, children, and the elderly), and increased requirements during growth periods. The diagnostic approach includes a thorough history focusing on symptoms, dietary habits, medication use, and potential sources of blood loss. Physical examination should assess for pallor, koilonychia, glossitis, and evidence of underlying conditions. Laboratory evaluation starts with complete blood count showing low hemoglobin and MCV. Iron studies typically reveal low serum iron, elevated total iron-binding capacity, decreased transferrin saturation (<16%), and low ferritin (<30 ng/mL). Ferritin is an acute phase reactant, so levels may be normal or elevated in iron deficiency with concomitant inflammation. In such cases, additional tests like soluble transferrin receptor or bone marrow iron staining may be helpful. Further investigation for the underlying cause is essential, particularly in men and postmenopausal women, who should undergo gastrointestinal evaluation (endoscopy, colonoscopy) to rule out malignancy or other sources of blood loss."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management and Monitoring" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Treatment principles include addressing the underlying cause (e.g., managing menorrhagia, treating H. pylori infection, surgical intervention for malignancy) and replenishing iron stores. Oral iron supplementation is first-line therapy, with ferrous sulfate, ferrous gluconate, or ferrous fumarate providing 150-200 mg of elemental iron daily in divided doses. Administration between meals enhances absorption, though may increase gastrointestinal side effects (nausea, constipation, abdominal discomfort). Taking with vitamin C (ascorbic acid) can enhance absorption. Alternate-day dosing may improve absorption and reduce side effects. Intravenous iron is indicated for patients with malabsorption, intolerance to oral preparations, ongoing blood loss exceeding oral replacement capacity, or need for rapid repletion. Modern formulations (iron sucrose, ferric gluconate, ferric carboxymaltose, iron dextran) have improved safety profiles compared to older formulations. Red blood cell transfusion is reserved for severe anemia with hemodynamic instability or end-organ damage. Response monitoring includes reticulocyte count increase within 1-2 weeks, hemoglobin rise of approximately 1-2 g/dL every 2-3 weeks, and normalization of hemoglobin in 6-8 weeks. Iron therapy should continue for 3-6 months after hemoglobin normalization to replenish stores. Failure to respond suggests non-adherence, ongoing blood loss, incorrect diagnosis, or concomitant conditions (anemia of inflammation, malabsorption)."
            }
          ]
        }
      ]
    },
    {
      title: "Hemolytic Anemia",
      slug: "hemolytic-anemia",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Hemolytic anemia results from premature destruction of red blood cells, leading to a shortened red cell lifespan and compensatory increase in erythropoiesis. It can be congenital or acquired, intravascular or extravascular, and acute or chronic."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Classification and Diagnosis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Hemolytic anemias are classified by the mechanism and location of hemolysis. Intracellular defects include membrane disorders (hereditary spherocytosis, elliptocytosis), enzyme deficiencies (G6PD, pyruvate kinase), and hemoglobinopathies (sickle cell disease, thalassemias). Extracellular causes include immune-mediated (autoimmune, drug-induced, alloimmune), microangiopathic (TTP, HUS, DIC), infection-related, mechanical (prosthetic heart valves), and chemical or physical agents. Clinical presentation varies with the type and severity but often includes jaundice, pallor, fatigue, and sometimes splenomegaly. Acute hemolysis may present with sudden anemia, jaundice, and hemoglobinuria. Laboratory evaluation reveals decreased hemoglobin, elevated reticulocyte count (usually >2%), indirect hyperbilirubinemia, elevated lactate dehydrogenase (LDH), decreased haptoglobin, and sometimes hemoglobinuria or hemosiderinuria. The blood smear may show specific morphologic abnormalities depending on the cause (spherocytes, schistocytes, bite cells, etc.). Additional tests are guided by the suspected etiology and may include direct antiglobulin test (Coombs test), hemoglobin electrophoresis, enzyme assays, flow cytometry, or genetic testing."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Treatment depends on the specific cause, severity, and acuity of hemolysis. The primary goal is to address the underlying cause: removing offending drugs, treating infections, managing autoimmune conditions, or providing specific therapies for inherited disorders. Supportive care includes folate supplementation to support increased erythropoiesis, transfusions for severe or symptomatic anemia (with caution in autoimmune hemolytic anemia due to difficulty in cross-matching), and management of complications like cholelithiasis or iron overload. For autoimmune hemolytic anemia, corticosteroids are first-line therapy, with splenectomy, rituximab, or immunosuppressants for refractory cases. Warm autoimmune hemolytic anemia typically responds to prednisone, while cold agglutinin disease may require avoiding cold exposure and sometimes rituximab. For congenital hemolytic anemias, management is often disease-specific: splenectomy may benefit hereditary spherocytosis; avoiding triggers is crucial in G6PD deficiency; hydroxyurea, transfusions, and potentially stem cell transplantation are options for sickle cell disease. Monitoring includes regular assessment of hemoglobin, reticulocyte count, markers of hemolysis (LDH, haptoglobin, bilirubin), and surveillance for complications specific to the underlying disorder and its treatment."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Thrombocytopenia",
  slug: "thrombocytopenia",
  introduction: "Thrombocytopenia is defined as a platelet count below 150,000/μL and is a common hematologic finding. The severity of thrombocytopenia correlates with bleeding risk, though this relationship is modified by platelet function, vascular integrity, and coagulation status. Causes range from decreased production to increased destruction or sequestration of platelets.",
  diagnosis_overview: "Diagnosis involves confirming true thrombocytopenia (excluding pseudothrombocytopenia due to platelet clumping), evaluating the peripheral blood smear, and determining the underlying cause through targeted laboratory testing based on clinical context. The pattern of onset, associated symptoms, medication history, and presence of other cytopenias provide important diagnostic clues.",
  management: "Management addresses the underlying cause while mitigating bleeding risk. Approaches vary from observation for mild, stable thrombocytopenia to urgent intervention for severe thrombocytopenia with active bleeding. Platelet transfusions are reserved for specific indications due to risks of alloimmunization and transfusion reactions.",
  highyieldPoints: "- Know the major categories of thrombocytopenia (decreased production, increased destruction, sequestration) and common causes in each\n- Understand the relationship between platelet count and bleeding risk, and indications for platelet transfusion\n- Be familiar with the diagnostic approach and management of immune thrombocytopenia (ITP)",
  systemIndex: 11, // Reference to Hematologic System
  types: [
    {
      name: "Immune Thrombocytopenia",
      abbreviation: "ITP",
      anchor_id: "immune-thrombocytopenia",
      description: "Immune thrombocytopenia (ITP) is an acquired autoimmune disorder characterized by isolated thrombocytopenia due to immune-mediated platelet destruction and impaired platelet production. It is a diagnosis of exclusion when thrombocytopenia occurs in the absence of other causes.",
      symptoms: [
        { text: "Often asymptomatic, especially with mild thrombocytopenia" },
        { text: "Mucocutaneous bleeding (petechiae, purpura, ecchymoses)" },
        { text: "Gingival bleeding, epistaxis" },
        { text: "Menorrhagia in women" },
        { text: "Rarely, internal bleeding including intracranial hemorrhage" }
      ],
      diagnosticFindings: [
        { text: "Isolated thrombocytopenia (platelet count often <30,000/μL in symptomatic cases)" },
        { text: "Normal white blood cell count and hemoglobin" },
        { text: "Normal peripheral blood smear except for reduced platelets, possibly large platelets" },
        { text: "Increased megakaryocytes in bone marrow (if performed)" },
        { text: "Exclusion of other causes of thrombocytopenia" },
        { text: "Anti-platelet antibodies (not routinely tested due to poor sensitivity/specificity)" }
      ],
      causes: [
        { text: "Primary (idiopathic) - no identifiable underlying cause" },
        { text: "Secondary to autoimmune disorders (SLE, antiphospholipid syndrome)" },
        { text: "Secondary to infections (HIV, HCV, H. pylori)" },
        { text: "Secondary to lymphoproliferative disorders" },
        { text: "Drug-induced immune thrombocytopenia" },
        { text: "Vaccine-associated in rare cases" }
      ]
    },
    {
      name: "Non-immune Thrombocytopenia",
      abbreviation: "NITP",
      anchor_id: "non-immune-thrombocytopenia",
      description: "Non-immune thrombocytopenia encompasses a diverse group of disorders characterized by low platelet counts due to mechanisms other than immune-mediated destruction, including decreased production, increased consumption/destruction by non-immune mechanisms, or sequestration.",
      symptoms: [
        { text: "Variable bleeding manifestations depending on severity and cause" },
        { text: "Often symptoms of underlying disorder (liver disease, infection, malignancy)" },
        { text: "May have other cytopenias (in bone marrow disorders, hypersplenism)" },
        { text: "Features of microangiopathy in TTP/HUS (fever, neurologic abnormalities, renal dysfunction)" }
      ],
      diagnosticFindings: [
        { text: "Thrombocytopenia, which may be isolated or associated with other cytopenias" },
        { text: "Specific peripheral smear findings: schistocytes in microangiopathies, blasts in leukemia" },
        { text: "Abnormal coagulation studies in disseminated intravascular coagulation (DIC)" },
        { text: "Bone marrow findings specific to underlying cause (hypocellularity, fibrosis, infiltration)" },
        { text: "Evidence of underlying disorders (hepatosplenomegaly, infection, malignancy)" }
      ],
      causes: [
        { text: "Decreased production: bone marrow failure syndromes, infiltrative disorders, nutritional deficiencies, medications, radiation" },
        { text: "Increased destruction (non-immune): DIC, thrombotic microangiopathies (TTP, HUS), HELLP syndrome, mechanical (heart valves, ECMO)" },
        { text: "Sequestration: hypersplenism due to portal hypertension, lymphoproliferative disorders" },
        { text: "Dilutional: massive transfusion, fluid resuscitation" },
        { text: "Pseudothrombocytopenia: EDTA-induced platelet clumping" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Management of Immune Thrombocytopenia",
      slug: "management-of-immune-thrombocytopenia",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Management of immune thrombocytopenia (ITP) is guided by the severity of thrombocytopenia, presence of bleeding, patient characteristics, and phase of disease (newly diagnosed, persistent, or chronic). The goal is to achieve a safe platelet count while minimizing treatment toxicity."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Initial Treatment Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Observation without specific therapy is appropriate for patients with platelet counts >30,000/μL and no significant bleeding, particularly in childhood ITP where spontaneous remission is common. First-line therapy for adults with newly diagnosed ITP requiring treatment includes corticosteroids (prednisone 1 mg/kg/day for 1-2 weeks followed by gradual taper, or dexamethasone 40 mg daily for 4 days), which produce initial responses in 70-80% of patients but sustained responses in only 20-30%. Intravenous immunoglobulin (IVIG, 1 g/kg for 1-2 days) provides rapid but temporary increases in platelet counts and is used for severe thrombocytopenia with bleeding, pre-procedural count improvement, or in patients with contraindications to corticosteroids. Anti-D immune globulin (50-75 μg/kg) is an alternative for Rh-positive, non-splenectomized patients, but carries a risk of hemolysis. Secondary ITP management includes treating the underlying condition (H. pylori eradication, antiviral therapy for hepatitis C, discontinuation of implicated medications)."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management of Persistent and Chronic ITP" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Second-line options for patients who fail or relapse after initial therapy include thrombopoietin receptor agonists (TPO-RAs) such as eltrombopag, romiplostim, and avatrombopag, which stimulate platelet production with response rates of 60-80%. Rituximab (anti-CD20 monoclonal antibody) depletes B cells and produces responses in 60% of patients initially, with 20-30% maintaining long-term remission. Splenectomy, traditionally considered the definitive second-line treatment, provides durable responses in about 60% of patients but is being used less frequently due to effective medical alternatives and irreversibility. Other immunosuppressants (azathioprine, mycophenolate mofetil, cyclophosphamide) may be considered in refractory cases. Fostamatinib, a spleen tyrosine kinase inhibitor, is approved for chronic ITP with responses in about 40% of patients. Emergency management of severe bleeding includes platelet transfusions (though typically short-lived due to ongoing destruction), high-dose corticosteroids, IVIG, and consideration of aminocaproic acid or tranexamic acid as adjuncts. Special considerations include anticoagulation when needed (maintaining platelet counts >50,000/μL), careful perioperative management (target >50,000/μL for minor procedures, >80,000/μL for major surgery), and pregnancy management (observation if platelets >30,000/μL and no bleeding, with IVIG and/or corticosteroids as preferred treatments when needed)."
            }
          ]
        }
      ]
    },
    {
      title: "Thrombotic Microangiopathies",
      slug: "thrombotic-microangiopathies",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Thrombotic microangiopathies (TMAs) are a group of disorders characterized by microvascular thrombosis, thrombocytopenia, and microangiopathic hemolytic anemia (MAHA). They represent medical emergencies requiring prompt recognition and treatment to prevent significant morbidity and mortality."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Pathophysiology and Classification" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The common pathophysiologic feature of TMAs is endothelial injury leading to platelet activation, formation of platelet-rich microthrombi, and mechanical destruction of erythrocytes as they traverse partially occluded microvessels. Thrombotic thrombocytopenic purpura (TTP) results from severe deficiency of ADAMTS13, a metalloprotease that cleaves ultra-large von Willebrand factor (vWF) multimers. In acquired TTP, autoantibodies inhibit ADAMTS13, while congenital TTP involves genetic mutations in the ADAMTS13 gene. Hemolytic uremic syndrome (HUS) is characterized by predominant renal involvement. Typical HUS is triggered by Shiga toxin-producing E. coli (STEC) or other bacteria, which damage endothelial cells leading to platelet activation and thrombus formation. Atypical HUS (aHUS) results from dysregulation of the alternative complement pathway due to genetic mutations or autoantibodies. Other TMAs include drug-induced (quinine, calcineurin inhibitors, gemcitabine), pregnancy-associated (preeclampsia/HELLP syndrome), malignancy-associated, and autoimmune disease-associated forms."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Diagnosis and Management" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Diagnostic approach includes identifying MAHA (schistocytes on peripheral smear, elevated LDH, decreased haptoglobin, negative direct Coombs test) and thrombocytopenia, with further evaluation to determine the specific TMA syndrome. ADAMTS13 activity <10% confirms TTP but should not delay treatment initiation in suspected cases. Stool studies for STEC and complement testing help distinguish between HUS types. In TTP, plasma exchange therapy is the cornerstone of treatment, removing autoantibodies and replacing ADAMTS13. Addition of rituximab reduces relapse rates in acquired TTP. Caplacizumab, an anti-vWF nanobody, accelerates platelet count recovery and reduces thrombotic complications. For STEC-HUS, supportive care is primary, with careful fluid and electrolyte management, dialysis if needed, and avoidance of antibiotics that may increase toxin release. In aHUS, complement inhibition with eculizumab or ravulizumab is the standard of care, dramatically improving outcomes. Plasma exchange has limited efficacy but may be used initially while awaiting diagnostic confirmation. For other TMAs, management focuses on addressing the underlying cause (discontinuing implicated drugs, treating malignancy, delivering the baby in pregnancy-associated TMA) alongside supportive care. Platelet transfusions are generally contraindicated in TTP as they may fuel microvascular thrombosis, but may be necessary for severe bleeding or before invasive procedures. Long-term follow-up is essential, particularly in TTP and aHUS, where relapse risk necessitates monitoring of ADAMTS13 activity or complement markers, respectively."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Coagulation Disorders",
  slug: "coagulation-disorders",
  introduction: "Coagulation disorders comprise a diverse group of conditions characterized by abnormal hemostasis, leading to either increased bleeding or thrombotic tendencies. These disorders may be inherited or acquired and can result from abnormalities in platelets, coagulation factors, or the fibrinolytic system.",
  diagnosis_overview: "Diagnosis involves evaluation of bleeding history, physical examination, and laboratory testing of the hemostatic system. Initial tests include prothrombin time (PT), activated partial thromboplastin time (aPTT), platelet count, and fibrinogen level. More specialized tests are guided by the clinical picture and initial results.",
  management: "Management strategies are directed at the specific underlying disorder and may include factor replacement therapy, antifibrinolytics, anticoagulation, or treatment of conditions causing acquired coagulation disorders. Both preventive approaches and acute intervention during bleeding episodes are important components of care.",
  highyieldPoints: "- Know the common inherited and acquired bleeding disorders and their laboratory patterns\n- Understand the approach to evaluating a patient with abnormal bleeding or coagulation tests\n- Be familiar with management strategies for hemophilia, von Willebrand disease, and DIC",
  systemIndex: 11, // Reference to Hematologic System
  types: [
    {
      name: "Inherited Bleeding Disorders",
      abbreviation: "IBD",
      anchor_id: "inherited-bleeding-disorders",
      description: "Inherited bleeding disorders are genetic conditions that result in impaired hemostasis, ranging from mild bleeding tendencies to severe, life-threatening hemorrhage. They typically manifest from birth or early childhood but may be diagnosed later in life.",
      symptoms: [
        { text: "Easy bruising" },
        { text: "Prolonged bleeding from minor cuts or dental procedures" },
        { text: "Epistaxis (nosebleeds)" },
        { text: "Menorrhagia (heavy menstrual bleeding)" },
        { text: "Hemarthrosis (bleeding into joints) in severe hemophilia" },
        { text: "Intramuscular hematomas" },
        { text: "Intracranial hemorrhage in severe cases" },
        { text: "Delayed bleeding after trauma or surgery" }
      ],
      diagnosticFindings: [
        { text: "Hemophilia A: Prolonged aPTT, decreased factor VIII activity" },
        { text: "Hemophilia B: Prolonged aPTT, decreased factor IX activity" },
        { text: "Von Willebrand disease: Variable aPTT, decreased vWF antigen and activity, decreased factor VIII" },
        { text: "Rare factor deficiencies: Specific factor assay abnormalities with variable PT/aPTT patterns" },
        { text: "Platelet function disorders: Normal platelet count with abnormal platelet function tests" },
        { text: "Family history in many but not all cases (new mutations can occur)" }
      ],
      causes: [
        { text: "Hemophilia A: X-linked recessive mutations in F8 gene encoding factor VIII" },
        { text: "Hemophilia B: X-linked recessive mutations in F9 gene encoding factor IX" },
        { text: "Von Willebrand disease: Autosomal mutations in VWF gene with variable inheritance patterns" },
        { text: "Other factor deficiencies: Various genetic mutations, mostly autosomal recessive" },
        { text: "Platelet function disorders: Various genetic mutations affecting platelet receptors, granules, or signaling" }
      ]
    },
    {
      name: "Acquired Coagulation Disorders",
      abbreviation: "ACD",
      anchor_id: "acquired-coagulation-disorders",
      description: "Acquired coagulation disorders develop during life as a result of various pathological conditions, medications, or environmental factors. They can affect previously normal hemostasis and may involve single or multiple components of the coagulation system.",
      symptoms: [
        { text: "New onset of bleeding tendency" },
        { text: "Spontaneous bruising or petechiae" },
        { text: "Mucosal bleeding (gingival, gastrointestinal, genitourinary)" },
        { text: "Excessive surgical or traumatic bleeding" },
        { text: "Symptoms of underlying disorders (liver disease, malignancy, sepsis)" }
      ],
      diagnosticFindings: [
        { text: "Vitamin K deficiency or warfarin effect: Prolonged PT, normal or mildly prolonged aPTT" },
        { text: "Liver disease: Prolonged PT and sometimes aPTT, decreased fibrinogen, thrombocytopenia" },
        { text: "DIC: Prolonged PT and aPTT, decreased fibrinogen, elevated D-dimer, thrombocytopenia" },
        { text: "Massive transfusion: Dilutional coagulopathy, thrombocytopenia, hypofibrinogenemia" },
        { text: "Acquired hemophilia: Isolated prolonged aPTT, factor VIII inhibitor" },
        { text: "Anticoagulant effects: Pattern depends on specific agent (heparin, DOACs, etc.)" }
      ],
      causes: [
        { text: "Medications: Anticoagulants, fibrinolytics, certain antibiotics, chemotherapy" },
        { text: "Vitamin K deficiency: Malnutrition, malabsorption, prolonged antibiotics" },
        { text: "Liver disease: Cirrhosis, acute liver failure" },
        { text: "Disseminated intravascular coagulation (DIC): Sepsis, trauma, malignancy, obstetric complications" },
        { text: "Massive transfusion: Dilution of coagulation factors and platelets" },
        { text: "Autoimmune: Acquired inhibitors against specific factors (commonly factor VIII)" },
        { text: "Uremia: Platelet dysfunction in renal failure" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Hemophilia Management",
      slug: "hemophilia-management",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Hemophilia management has evolved significantly with advances in factor replacement therapies, extended half-life products, and novel non-factor therapies. A comprehensive approach addresses both treatment and prevention of bleeding episodes while minimizing complications."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Replacement Therapy and Prophylaxis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Factor replacement therapy remains the cornerstone of hemophilia treatment. For hemophilia A, options include plasma-derived or recombinant factor VIII concentrates. For hemophilia B, plasma-derived or recombinant factor IX concentrates are used. Extended half-life (EHL) products have revolutionized treatment, allowing less frequent infusions while maintaining protection. These include Fc fusion proteins, PEGylated products, and albumin fusion proteins, extending half-life 1.5-2 times for FVIII and 3-5 times for FIX. Dosing is based on severity of bleeding or type of procedure, with mild bleeding typically requiring 30-50% factor levels and major surgery or life-threatening hemorrhage requiring 80-100% levels. Prophylaxis, the regular infusion of factor concentrates to prevent bleeding, is the standard of care for severe hemophilia. Standard prophylaxis typically involves 2-3 infusions weekly for hemophilia A and 1-2 weekly for hemophilia B, adjusted to maintain trough levels above 1-3%. Primary prophylaxis (started before joint damage) provides better outcomes than secondary prophylaxis (started after joint damage has occurred). Personalized prophylaxis regimens consider individual pharmacokinetics, bleeding phenotype, physical activity, and joint status."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Novel Therapies and Comprehensive Care" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Emicizumab, a bispecific antibody mimicking factor VIII function, has transformed hemophilia A management. Administered subcutaneously every 1-4 weeks, it provides effective prophylaxis even in patients with inhibitors. Non-factor therapies include fitusiran (siRNA targeting antithrombin), anti-TFPI agents, and others in clinical development. These therapies rebalance hemostasis by reducing natural anticoagulants rather than replacing deficient factors. Inhibitor development, occurring in 25-30% of severe hemophilia A and 3-5% of hemophilia B patients, presents a significant challenge. Management includes immune tolerance induction (regular high-dose factor exposure to eradicate the inhibitor) and bypassing agents (activated prothrombin complex concentrates or recombinant factor VIIa) for bleeding episodes. Comprehensive care through specialized hemophilia treatment centers involves a multidisciplinary team addressing all aspects of hemophilia management: hematologic care, physical therapy to maintain joint health, genetic counseling, psychosocial support, and education about home treatment. Regular monitoring includes clinical bleeding assessment, joint evaluation, inhibitor screening, and hepatitis/HIV surveillance in older patients who received plasma-derived products before viral inactivation methods. Gene therapy, showing promising results in clinical trials, may provide a functional cure for some patients by enabling endogenous production of the deficient clotting factor after a single treatment."
            }
          ]
        }
      ]
    },
    {
      title: "Disseminated Intravascular Coagulation",
      slug: "disseminated-intravascular-coagulation",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Disseminated intravascular coagulation (DIC) is a complex, acquired syndrome characterized by systemic activation of coagulation, resulting in widespread microvascular thrombosis, consumption of coagulation factors and platelets, and, paradoxically, bleeding. It always occurs secondary to an underlying condition."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Pathophysiology and Diagnosis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "DIC begins with excess thrombin generation, typically triggered by tissue factor exposure from damaged cells or inflammatory cytokines. This leads to intravascular fibrin deposition and microvascular thrombosis, with consequent organ dysfunction and microangiopathic hemolytic anemia. Simultaneously, consumption of platelets and coagulation factors, along with secondary fibrinolysis, results in bleeding risk. Common precipitating conditions include sepsis (especially gram-negative bacteria), trauma with tissue injury, malignancy (particularly acute promyelocytic leukemia), obstetric complications (amniotic fluid embolism, placental abruption), severe tissue injury (burns, crush injuries), and severe toxic or immunologic reactions. Clinical presentation varies from an acute, overwhelming process with severe bleeding to a chronic, compensated state with predominant thrombotic manifestations. Laboratory findings reflect both consumption and activation of the coagulation system: thrombocytopenia, prolonged PT and aPTT, decreased fibrinogen (though may be normal due to acute phase reaction), elevated D-dimer, and presence of schistocytes on peripheral blood smear. Scoring systems like the International Society on Thrombosis and Haemostasis (ISTH) DIC score help standardize diagnosis by evaluating platelet count, coagulation tests, fibrinogen, and D-dimer."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management Approach" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The cornerstone of DIC management is treating the underlying condition: antibiotics for sepsis, delivery for obstetric complications, chemotherapy for malignancy, etc. Supportive care focuses on maintaining organ perfusion, oxygen delivery, and hemodynamic stability. Transfusion therapy should be guided by clinical bleeding and laboratory parameters. Platelet transfusions are indicated for significant bleeding with thrombocytopenia or to prevent bleeding during invasive procedures (target >50,000/μL). Fresh frozen plasma provides multiple coagulation factors and is used for active bleeding or before invasive procedures when PT/aPTT is >1.5 times normal. Cryoprecipitate or fibrinogen concentrate is given when fibrinogen is <100-150 mg/dL with bleeding. For predominant thrombosis without significant bleeding, prophylactic dose anticoagulation with unfractionated or low molecular weight heparin may be considered. Antifibrinolytic agents (tranexamic acid, aminocaproic acid) are generally contraindicated due to risk of exacerbating thrombosis, except in specific settings like acute promyelocytic leukemia with severe hyperfibrinolysis. Novel approaches under investigation include recombinant thrombomodulin, antithrombin concentrates, and activated protein C, though evidence for routine use remains insufficient. The prognosis depends largely on the underlying condition, with mortality ranging from 20-50% in severe cases."
            }
          ]
        }
      ]
    }
  ]
},
// 13. Renal System Topics
{
  title: "Acute Kidney Injury",
  slug: "acute-kidney-injury",
  introduction: "Acute kidney injury (AKI) is a sudden decrease in kidney function resulting in the retention of nitrogenous and other waste products, and dysregulation of extracellular volume and electrolytes. It represents a spectrum of disease from mild, subclinical injury to severe kidney failure requiring renal replacement therapy.",
  diagnosis_overview: "Diagnosis is based on changes in serum creatinine, urine output, or both. The KDIGO (Kidney Disease: Improving Global Outcomes) criteria define AKI as any of the following: increase in serum creatinine by ≥0.3 mg/dL within 48 hours; increase in serum creatinine to ≥1.5 times baseline within 7 days; or urine volume <0.5 mL/kg/hr for 6 hours.",
  management: "Management focuses on identifying and treating the underlying cause, optimizing hemodynamics, avoiding further kidney injury, managing complications, and providing renal support when necessary. Early recognition and intervention are crucial for preventing progression and improving outcomes.",
  highyieldPoints: "- Know the common causes of AKI in each category (prerenal, intrinsic, postrenal) and their diagnostic features\n- Understand the approach to evaluation, including history, physical examination, laboratory testing, and imaging\n- Be familiar with indications for renal replacement therapy and strategies to prevent AKI",
  systemIndex: 12, // Reference to Renal System
  types: [
    {
      name: "Prerenal Acute Kidney Injury",
      abbreviation: "PRAKI",
      anchor_id: "prerenal-aki",
      description: "Prerenal AKI results from decreased renal perfusion, leading to reduced glomerular filtration rate (GFR) without intrinsic kidney damage. It is rapidly reversible with restoration of renal blood flow if detected and treated promptly.",
      symptoms: [
        { text: "Often asymptomatic or symptoms related to the underlying cause" },
        { text: "Signs of volume depletion: thirst, orthostatic hypotension, tachycardia" },
        { text: "Decreased urine output (oliguria)" },
        { text: "In cardiogenic causes: dyspnea, edema, elevated jugular venous pressure" },
        { text: "In liver failure: ascites, edema, jaundice" }
      ],
      diagnosticFindings: [
        { text: "Elevated blood urea nitrogen (BUN) to creatinine ratio (>20:1)" },
        { text: "Urine sodium <20 mEq/L" },
        { text: "Fractional excretion of sodium (FENa) <1% (if not on diuretics)" },
        { text: "Fractional excretion of urea (FEUrea) <35%" },
        { text: "Concentrated urine (specific gravity >1.020, osmolality >500 mOsm/kg)" },
        { text: "Benign urinary sediment" },
        { text: "Rapid improvement with fluid resuscitation in volume-responsive cases" }
      ],
      causes: [
        { text: "Hypovolemia: hemorrhage, gastrointestinal losses, excessive diuresis, burns, pancreatitis" },
        { text: "Decreased cardiac output: heart failure, myocardial infarction, arrhythmias, tamponade, pulmonary embolism" },
        { text: "Altered renal hemodynamics: NSAIDs, ACE inhibitors/ARBs, contrast agents, sepsis, hepatorenal syndrome, abdominal compartment syndrome" },
        { text: "Large vessel disease: renal artery stenosis, thrombosis, or embolism" }
      ]
    },
    {
      name: "Intrinsic Acute Kidney Injury",
      abbreviation: "IAKI",
      anchor_id: "intrinsic-aki",
      description: "Intrinsic AKI results from direct damage to the kidney parenchyma, affecting the glomeruli, tubules, interstitium, or vasculature. It typically takes longer to resolve than prerenal AKI and may result in permanent kidney damage.",
      symptoms: [
        { text: "Variable, depending on underlying cause and severity" },
        { text: "Oliguria or anuria in severe cases" },
        { text: "Edema due to fluid retention" },
        { text: "Symptoms of uremia in advanced cases: nausea, vomiting, altered mental status" },
        { text: "Features of specific causes: rash in vasculitis, joint pain in autoimmune conditions" }
      ],
      diagnosticFindings: [
        { text: "Urine sodium typically >40 mEq/L" },
        { text: "FENa >2% (except in some forms of acute tubular necrosis or glomerulonephritis)" },
        { text: "Urine sediment varies by cause: muddy brown casts in ATN, red cell casts in glomerulonephritis, eosinophils in AIN" },
        { text: "Proteinuria, often moderate in tubular injury, may be heavy in glomerular diseases" },
        { text: "Evidence of systemic disease in some cases (serologic markers, imaging findings)" }
      ],
      causes: [
        { text: "Acute tubular necrosis (ATN): ischemic (prolonged prerenal state), nephrotoxic (medications, contrast, pigments)" },
        { text: "Acute interstitial nephritis (AIN): drug-induced, infection-related, autoimmune" },
        { text: "Glomerular: rapidly progressive glomerulonephritis, vasculitis, thrombotic microangiopathies" },
        { text: "Vascular: atheroembolic disease, renal vein thrombosis, malignant hypertension" },
        { text: "Tubular obstruction: myeloma cast nephropathy, uric acid nephropathy, tumor lysis syndrome" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Evaluation and Management of AKI",
      slug: "evaluation-management-aki",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "A systematic approach to evaluating and managing acute kidney injury is essential for identifying the underlying cause, preventing further kidney damage, and optimizing outcomes."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Diagnostic Approach" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "History should focus on identifying potential causes: volume status changes, medication exposures (particularly NSAIDs, ACE inhibitors/ARBs, antibiotics, chemotherapy), recent procedures (especially with contrast), symptoms of systemic illness, and risk factors for urinary tract obstruction. Physical examination should assess volume status (orthostatic vitals, jugular venous pressure, edema, skin turgor), signs of systemic diseases that can cause AKI, and evidence of urinary tract obstruction (bladder distention, prostate enlargement). Initial laboratory testing includes: complete blood count, comprehensive metabolic panel, urinalysis with microscopy, urine electrolytes (sodium, creatinine), and urine protein quantification. Urine microscopy is particularly valuable: muddy brown casts in ATN, red cell casts in glomerulonephritis, white cell casts in pyelonephritis, eosinophils in AIN, and crystals in certain toxicities. Imaging studies may include renal ultrasound (essential to rule out obstruction), which also assesses kidney size and echogenicity. Additional tests based on clinical suspicion may include: serologic studies for glomerular diseases, complement levels, ANCA, anti-GBM antibodies, immunoglobulins, protein electrophoresis, CT scanning, and in selected cases, kidney biopsy."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Management Principles" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Treatment of the underlying cause is the most important intervention: fluid resuscitation for prerenal AKI, relief of obstruction for postrenal AKI, discontinuation of nephrotoxic agents, and specific therapies for glomerular or systemic diseases. Optimization of hemodynamics includes ensuring adequate renal perfusion with fluids in hypovolemia or vasopressors in distributive shock, while avoiding volume overload which can worsen outcomes. Medication management involves dose adjustment for reduced kidney function, avoiding nephrotoxins, and careful monitoring of drugs eliminated by the kidneys. Nutritional support should maintain adequate protein intake (0.8-1.0 g/kg/day) while avoiding excessive nitrogen load, with adjustments based on catabolic state and renal replacement therapy. Electrolyte and acid-base monitoring and management are essential, particularly for hyperkalemia, metabolic acidosis, hyperphosphatemia, and hypocalcemia. Indications for renal replacement therapy (RRT) include: severe volume overload unresponsive to diuretics, refractory hyperkalemia (K+ >6.5 mEq/L), severe metabolic acidosis (pH <7.1), uremic symptoms (encephalopathy, pericarditis, bleeding), and certain poisonings or overdoses. The optimal timing, modality, and dose of RRT remain areas of ongoing research and clinical judgment."
            }
          ]
        }
      ]
    },
    {
      title: "Contrast-Induced Acute Kidney Injury",
      slug: "contrast-induced-aki",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Contrast-induced acute kidney injury (CI-AKI), previously known as contrast-induced nephropathy, is a form of AKI occurring after intravascular administration of iodinated contrast media. It is typically defined as an increase in serum creatinine of ≥0.3 mg/dL or ≥50% from baseline within 48-72 hours after contrast exposure, in the absence of alternative explanations."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Risk Factors and Pathophysiology" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Patient-related risk factors include pre-existing chronic kidney disease (especially with eGFR <30 mL/min/1.73m²), diabetes mellitus, advanced age, hypovolemia, heart failure, and concurrent use of nephrotoxic medications. Procedure-related factors include high contrast volume, high osmolality contrast agents, multiple contrast studies within a short period, and intra-arterial versus intravenous administration. The pathophysiology involves direct tubular toxicity from contrast media, resulting in tubular epithelial cell apoptosis and oxidative stress. Renal vasoconstriction leads to medullary hypoxia, while tubular obstruction can occur from precipitation of contrast media, cellular debris, or uric acid. The risk is magnified in patients with reduced renal reserve or when other concurrent insults to the kidney are present."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Prevention and Management" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Prevention is the cornerstone of management, as there is no specific treatment once CI-AKI develops. Risk assessment should be performed prior to contrast administration, identifying high-risk patients for targeted preventive strategies. Intravenous hydration remains the most effective preventive measure. Isotonic saline (0.9% NaCl) at 1-1.5 mL/kg/hr for 6-12 hours before and after contrast administration is widely recommended. In urgent situations where prolonged pre-hydration is not feasible, shorter protocols may be used. Volume expansion with sodium bicarbonate (1.26%) has theoretical benefits but has not consistently shown superiority to saline in large trials. Minimizing contrast volume is crucial ('minimum necessary dose'). Low or iso-osmolar contrast agents are preferred over high-osmolar agents, especially in high-risk patients. N-acetylcysteine, once widely used, has shown inconsistent benefits in clinical trials and is no longer routinely recommended by major guidelines. Temporary discontinuation of potentially nephrotoxic medications (NSAIDs, aminoglycosides) and medications affecting renal autoregulation (ACE inhibitors, ARBs) should be considered 24-48 hours before contrast exposure. Alternative imaging strategies without iodinated contrast should be considered when appropriate. For patients receiving contrast despite high risk, close monitoring of kidney function is essential, with serum creatinine at 24-48 hours after exposure, along with vigilant attention to volume status and electrolytes."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Chronic Kidney Disease",
  slug: "chronic-kidney-disease",
  introduction: "Chronic kidney disease (CKD) is defined as abnormalities of kidney structure or function, present for at least 3 months, with implications for health. It affects approximately 10-15% of the global population and is associated with increased morbidity, mortality, and healthcare costs. CKD is classified based on cause, glomerular filtration rate (GFR), and level of albuminuria.",
  diagnosis_overview: "Diagnosis is based on decreased GFR (<60 mL/min/1.73 m²) and/or markers of kidney damage (albuminuria, urine sediment abnormalities, electrolyte disorders, structural abnormalities on imaging, or history of kidney transplantation) persisting for more than 3 months. Early detection is crucial for implementing measures to slow progression and manage complications.",
  management: "Management focuses on identifying and treating the underlying cause, implementing interventions to slow progression, managing complications, and preparing for renal replacement therapy when appropriate. A multidisciplinary approach addressing cardiovascular risk, bone-mineral disorders, anemia, and other comorbidities is essential for optimal outcomes.",
  highyieldPoints: "- Know the classification of CKD by GFR and albuminuria categories, and common etiologies\n- Understand the evidence-based interventions to slow CKD progression\n- Be familiar with the approach to managing complications of CKD and indications for renal replacement therapy",
  systemIndex: 12, // Reference to Renal System
  types: [
    {
      name: "Early Stage CKD",
      abbreviation: "ESCKD",
      anchor_id: "early-stage-ckd",
      description: "Early stage CKD encompasses stages 1-3a (GFR ≥45 mL/min/1.73 m²). Stage 1 (GFR ≥90) and stage 2 (GFR 60-89) require evidence of kidney damage to establish the diagnosis, while stage 3a (GFR 45-59) is defined by GFR alone.",
      symptoms: [
        { text: "Often asymptomatic" },
        { text: "May have symptoms related to the underlying cause (e.g., edema in glomerular disease)" },
        { text: "Hypertension (common but nonspecific)" },
        { text: "Nocturia due to impaired concentrating ability" },
        { text: "Fatigue (may be subtle)" }
      ],
      diagnosticFindings: [
        { text: "Mild to moderate reduction in eGFR (typically still ≥45 mL/min/1.73 m²)" },
        { text: "Albuminuria (may be present, ranges from normal to severely increased)" },
        { text: "Specific findings related to underlying kidney disease" },
        { text: "Generally normal electrolytes and hemoglobin" },
        { text: "May have early changes in vitamin D and parathyroid hormone" },
        { text: "Imaging may show structural abnormalities depending on etiology" }
      ],
      causes: [
        { text: "Diabetes mellitus (most common cause in many populations)" },
        { text: "Hypertension" },
        { text: "Glomerular diseases (IgA nephropathy, FSGS, membranous nephropathy)" },
        { text: "Polycystic kidney disease and other hereditary nephropathies" },
        { text: "Autoimmune diseases (lupus nephritis, ANCA vasculitis)" },
        { text: "Recurrent urinary tract infections or obstruction" },
        { text: "Medications and toxins" }
      ]
    },
    {
      name: "Advanced Stage CKD",
      abbreviation: "ASCKD",
      anchor_id: "advanced-stage-ckd",
      description: "Advanced stage CKD encompasses stages 3b-5 (GFR <45 mL/min/1.73 m²), with stage 5 (GFR <15) representing kidney failure, previously known as end-stage renal disease. This range is associated with progressively increasing complications and symptoms.",
      symptoms: [
        { text: "Fatigue and weakness" },
        { text: "Anorexia and nausea" },
        { text: "Pruritus (itching)" },
        { text: "Sleep disturbances" },
        { text: "Decreased mental acuity" },
        { text: "Muscle cramps and restless legs" },
        { text: "Signs of volume overload (edema, dyspnea)" },
        { text: "Uremic symptoms in stage 5 (metallic taste, uremic frost, pericarditis, encephalopathy)" }
      ],
      diagnosticFindings: [
        { text: "Moderate to severe reduction in eGFR (<45 mL/min/1.73 m²)" },
        { text: "Electrolyte abnormalities (hyperkalemia, hyperphosphatemia, hypocalcemia)" },
        { text: "Metabolic acidosis" },
        { text: "Anemia (typically normocytic, normochromic)" },
        { text: "Secondary hyperparathyroidism and abnormal bone-mineral markers" },
        { text: "Hypoalbuminemia in nephrotic syndrome or malnutrition" },
        { text: "Small kidneys on imaging (except in diabetic nephropathy, polycystic kidney disease)" }
      ],
      causes: [
        { text: "Progression of early stage CKD causes" },
        { text: "Diabetic nephropathy (leading cause of kidney failure in many regions)" },
        { text: "Hypertensive nephrosclerosis" },
        { text: "Glomerular diseases" },
        { text: "Tubulo-interstitial diseases" },
        { text: "Polycystic kidney disease" },
        { text: "Recurrent acute kidney injury" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Slowing CKD Progression",
      slug: "slowing-ckd-progression",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Prevention of CKD progression is a key aspect of management, aiming to delay or avoid kidney failure and its associated complications. Several evidence-based interventions can slow the rate of GFR decline and reduce the risk of progression to kidney failure."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Blood Pressure Control and RAAS Blockade" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Blood pressure management is a cornerstone of CKD care, with target BP generally <130/80 mmHg for most patients with CKD, particularly those with albuminuria. Renin-angiotensin-aldosterone system (RAAS) inhibitors are first-line agents for most patients with CKD, especially those with albuminuria >300 mg/g. Angiotensin-converting enzyme inhibitors (ACEIs) and angiotensin II receptor blockers (ARBs) reduce intraglomerular pressure and proteinuria beyond their blood pressure-lowering effects. These agents have shown particular benefit in diabetic kidney disease and proteinuric non-diabetic CKD. Combination of ACEIs and ARBs is generally not recommended due to increased risk of hyperkalemia and acute kidney injury without substantial benefit. Mineralocorticoid receptor antagonists (spironolactone, eplerenone, finerenone) may provide additional benefit in albuminuric CKD but require careful monitoring of potassium levels, particularly in advanced CKD."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Glycemic Control and Novel Agents" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "For patients with diabetes, optimal glycemic control helps prevent or slow nephropathy progression. Target HbA1c is typically around 7%, though individualization based on risk of hypoglycemia and comorbidities is important. Sodium-glucose cotransporter-2 (SGLT2) inhibitors have emerged as a breakthrough in CKD management. They reduce the risk of CKD progression, major adverse cardiovascular events, and hospitalization for heart failure. Benefits extend to non-diabetic CKD patients with albuminuria. Glucagon-like peptide-1 (GLP-1) receptor agonists also show renoprotective effects, primarily in patients with type 2 diabetes. Other interventions with demonstrated benefit include dietary modifications, particularly sodium restriction (<2g/day) to enhance RAAS blockade effectiveness and improve volume control. Protein restriction (0.8g/kg/day for non-dialysis CKD, avoiding high protein intake) may slow progression in some patients, though evidence is less robust. Weight loss in obesity can reduce albuminuria and improve kidney function. Smoking cessation is strongly recommended as smoking accelerates CKD progression and increases cardiovascular risk. Regular physical activity improves overall health and may have metabolic benefits affecting kidney function. Treatment of metabolic acidosis with oral bicarbonate supplementation when serum bicarbonate is <22 mEq/L slows GFR decline. Avoidance of nephrotoxins (NSAIDs, aminoglycosides, iodinated contrast when possible) and appropriate drug dosing for kidney function are essential preventive measures."
            }
          ]
        }
      ]
    },
    {
      title: "Management of CKD Complications",
      slug: "management-ckd-complications",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "As kidney function declines, particularly below GFR of 60 mL/min/1.73m², various complications emerge that require systematic monitoring and management to reduce morbidity and mortality."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Cardiovascular Disease and Anemia" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Cardiovascular disease is the leading cause of death in CKD. Management includes aggressive modification of traditional risk factors (hypertension, dyslipidemia, diabetes, smoking) and CKD-specific factors. Statin therapy is recommended for most adults with CKD, with intensity guided by cardiovascular risk. Aspirin may be beneficial in those with established cardiovascular disease or high risk. Heart failure management requires careful volume control and consideration of medication adjustments for kidney function. Anemia in CKD results primarily from erythropoietin deficiency and is associated with reduced quality of life and increased mortality. Evaluation should exclude other causes (iron deficiency, bleeding, hemolysis, nutritional deficiencies). Iron status should be optimized first, with intravenous iron often preferred in advanced CKD. Erythropoiesis-stimulating agents (ESAs) may be considered when hemoglobin is persistently <10 g/dL despite iron repletion, with target hemoglobin generally 10-11.5 g/dL. Higher targets have been associated with increased cardiovascular events. Blood transfusions are reserved for symptomatic anemia unresponsive to other measures or acute blood loss."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Mineral Bone Disorder and Other Complications" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "CKD-mineral bone disorder (CKD-MBD) encompasses abnormalities of calcium, phosphorus, parathyroid hormone (PTH), vitamin D metabolism, and bone abnormalities. Management includes dietary phosphate restriction, phosphate binders (calcium-based in hypocalcemia, non-calcium-based in hypercalcemia or vascular calcification), vitamin D analogues for secondary hyperparathyroidism (calcitriol, paricalcitol), and calcimimetics (cinacalcet, etelcalcetide) for refractory hyperparathyroidism. Metabolic acidosis should be treated with oral alkali supplementation (sodium bicarbonate) to maintain serum bicarbonate ≥22 mEq/L, which may slow CKD progression and improve bone health. Hyperkalemia management includes dietary potassium restriction, loop diuretics in volume-overloaded patients, and potassium binders (patiromer, sodium zirconium cyclosilicate) for persistent or severe hyperkalemia. Malnutrition-inflammation complex is common in advanced CKD and requires nutritional assessment and targeted interventions. Psychological support should address the significant psychological burden of CKD, including depression, anxiety, and reduced quality of life. Advance care planning becomes increasingly important as CKD progresses, involving discussions about prognosis, treatment preferences, and renal replacement therapy options versus conservative management."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Glomerular Diseases",
  slug: "glomerular-diseases",
  introduction: "Glomerular diseases comprise a diverse group of disorders that primarily affect the glomeruli, the filtering units of the kidney. They are characterized by structural and functional abnormalities of the glomerular filtration barrier, leading to proteinuria, hematuria, and often progressive kidney dysfunction. These disorders may be primary, originating in the kidney, or secondary to systemic diseases.",
  diagnosis_overview: "Diagnosis involves clinical evaluation, urinalysis, quantification of proteinuria, serological studies, and often kidney biopsy for definitive diagnosis and classification. The presentation pattern, including nephritic versus nephrotic features, helps narrow the differential diagnosis.",
  management: "Management approaches include disease-specific therapies (often immunosuppressive agents for immune-mediated glomerular diseases), supportive care to reduce proteinuria and slow progression, and treatment of complications. The treatment strategy balances disease control against therapy-related risks.",
  highyieldPoints: "- Know the clinical presentations of nephritic and nephrotic syndromes and their differential diagnoses\n- Understand the diagnostic approach to glomerular diseases, including the role of kidney biopsy\n- Be familiar with treatment strategies for common glomerular diseases, including immunosuppressive regimens",
  systemIndex: 12, // Reference to Renal System
  types: [
    {
      name: "Nephrotic Syndrome",
      abbreviation: "NS",
      anchor_id: "nephrotic-syndrome",
      description: "Nephrotic syndrome is a clinical presentation characterized by heavy proteinuria (>3.5g/24h), hypoalbuminemia, edema, and hyperlipidemia. It results from increased glomerular permeability to proteins due to various underlying glomerular diseases.",
      symptoms: [
        { text: "Peripheral edema, often presenting first in dependent areas" },
        { text: "Anasarca (generalized edema) in severe cases" },
        { text: "Pleural effusions, ascites" },
        { text: "Foamy urine due to proteinuria" },
        { text: "Fatigue, malaise" },
        { text: "Symptoms of underlying cause (e.g., rash in lupus)" }
      ],
      diagnosticFindings: [
        { text: "Heavy proteinuria (>3.5g/24h or urine protein-to-creatinine ratio >3.5g/g)" },
        { text: "Hypoalbuminemia (<3.0g/dL)" },
        { text: "Hyperlipidemia (elevated cholesterol and triglycerides)" },
        { text: "Oval fat bodies in urine (lipiduria)" },
        { text: "Variable kidney function (normal to reduced)" },
        { text: "Hypercoagulable state with risk of thromboembolism" }
      ],
      causes: [
        { text: "Primary glomerular diseases: minimal change disease, focal segmental glomerulosclerosis, membranous nephropathy, membranoproliferative glomerulonephritis" },
        { text: "Secondary causes: diabetes mellitus, lupus nephritis, amyloidosis, HIV infection" },
        { text: "Medications: NSAIDs, gold, penicillamine, bisphosphonates" },
        { text: "Infections: hepatitis B and C, malaria, syphilis" },
        { text: "Malignancies: solid tumors, lymphoma, leukemia" },
        { text: "Genetic disorders: Alport syndrome, congenital nephrotic syndrome" }
      ]
    },
    {
      name: "Nephritic Syndrome",
      abbreviation: "NiS",
      anchor_id: "nephritic-syndrome",
      description: "Nephritic syndrome is characterized by glomerular inflammation leading to hematuria, proteinuria (typically sub-nephrotic), and often acute kidney injury. It results from various immune-mediated or inflammatory processes affecting the glomeruli.",
      symptoms: [
        { text: "Hematuria (often gross or tea-colored urine)" },
        { text: "Mild to moderate edema" },
        { text: "Hypertension" },
        { text: "Oliguria" },
        { text: "Fatigue, malaise" },
        { text: "Symptoms of underlying cause (e.g., upper respiratory infection preceding post-streptococcal glomerulonephritis)" }
      ],
      diagnosticFindings: [
        { text: "Hematuria (dysmorphic RBCs, RBC casts on microscopy)" },
        { text: "Proteinuria (typically <3.5g/24h)" },
        { text: "Reduced GFR (variable severity)" },
        { text: "Hypertension (due to volume expansion and/or activation of renin-angiotensin system)" },
        { text: "Serologic abnormalities specific to underlying cause (e.g., low complement in lupus, ANCA in vasculitis)" }
      ],
      causes: [
        { text: "Post-infectious glomerulonephritis (streptococcal, other bacterial, viral)" },
        { text: "IgA nephropathy (Berger's disease)" },
        { text: "Rapidly progressive glomerulonephritis (RPGN): ANCA-associated, anti-GBM disease, immune complex-mediated" },
        { text: "Lupus nephritis" },
        { text: "Membranoproliferative glomerulonephritis" },
        { text: "Henoch-Schönlein purpura/IgA vasculitis" },
        { text: "Cryoglobulinemic glomerulonephritis" }
      ]
    }
  ],
  subtopics: [
    {
      title: "IgA Nephropathy",
      slug: "iga-nephropathy",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "IgA nephropathy (IgAN), also known as Berger's disease, is the most common primary glomerular disease worldwide. It is characterized by predominant IgA deposits in the glomerular mesangium and has a variable clinical course, from benign to progressive kidney failure."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Pathogenesis and Clinical Presentation" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The pathogenesis involves production of galactose-deficient IgA1 (Gd-IgA1), formation of auto-antibodies against these abnormal IgA molecules, immune complex formation, deposition in the mesangium, and subsequent inflammation. Genetic factors influence susceptibility, with higher prevalence in Asian populations. The classic presentation is recurrent episodes of macroscopic hematuria concurrent with or shortly after upper respiratory infections (synpharyngitic hematuria), particularly in young adults. Many patients are diagnosed incidentally when microscopic hematuria is detected on routine urinalysis. Proteinuria is common and varies from mild to severe, occasionally reaching nephrotic range. Hypertension and reduced kidney function may develop, especially with progressive disease. The clinical spectrum ranges from isolated microscopic hematuria with excellent prognosis to rapidly progressive glomerulonephritis with crescents."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Diagnosis and Management" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Diagnosis is confirmed by kidney biopsy showing mesangial IgA deposits on immunofluorescence, often with C3 and variable mesangial hypercellularity, endocapillary proliferation, or crescent formation on light microscopy. Secondary causes of IgA deposition should be excluded, including Henoch-Schönlein purpura, cirrhosis, celiac disease, and certain infections. Risk assessment for progression is based on clinical and histological factors, including proteinuria >1g/day, hypertension, reduced GFR at presentation, and the MEST-C histologic classification (mesangial hypercellularity, endocapillary proliferation, segmental glomerulosclerosis, tubular atrophy/interstitial fibrosis, and crescents). Supportive care is the foundation of management, with RAAS inhibitors (ACE inhibitors or ARBs) to reduce proteinuria and control blood pressure, targeting proteinuria <1g/day when possible. Immunosuppressive therapy is considered for high-risk patients despite optimal supportive care. Systemic corticosteroids may benefit patients with preserved kidney function (eGFR >30 mL/min/1.73m²) and persistent proteinuria >1g/day despite RAAS blockade. Newer approaches include targeted-release budesonide (designed for local delivery to the ileum to modify mucosal immunity) and combination immunosuppression in severe or rapidly progressive disease. Tonsillectomy may be beneficial in patients with recurrent tonsillitis-associated hematuria, particularly in some Asian populations. Novel therapies targeting disease pathogenesis (complement inhibition, anti-cytokine approaches) are under investigation. Approximately 20-40% of patients will progress to kidney failure over 20-25 years, with risk varying based on the previously mentioned prognostic factors."
            }
          ]
        }
      ]
    },
    {
      title: "Membranous Nephropathy",
      slug: "membranous-nephropathy",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Membranous nephropathy (MN) is a major cause of nephrotic syndrome in adults. It is characterized by uniform thickening of the glomerular basement membrane due to subepithelial immune complex deposits, leading to proteinuria that is often severe."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Etiology and Pathogenesis" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Membranous nephropathy is classified as primary (idiopathic) or secondary. Primary MN is now recognized as an autoimmune disease with autoantibodies against podocyte antigens, predominantly the phospholipase A2 receptor (PLA2R) in about 70-80% of cases and thrombospondin type-1 domain-containing 7A (THSD7A) in a smaller subset. Secondary MN can be associated with: infections (hepatitis B and C, syphilis, malaria), autoimmune diseases (systemic lupus erythematosus, rheumatoid arthritis), malignancies (solid tumors, particularly lung and gastrointestinal), medications (NSAIDs, gold, penicillamine), and other conditions. The pathogenesis involves autoantibody binding to podocyte antigens, in situ immune complex formation, complement activation, and subsequent damage to the glomerular filtration barrier, resulting in proteinuria."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Clinical Approach and Treatment" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Clinical presentation is typically nephrotic syndrome with edema, hypoalbuminemia, and hyperlipidemia. Some patients may have subnephrotic proteinuria initially. Hematuria can occur but is usually microscopic and mild. Kidney function is normal at presentation in most patients, though acute kidney injury may occur in the setting of severe hypovolemia or renal vein thrombosis. Diagnosis is established by kidney biopsy showing characteristic findings: uniform thickening of the glomerular basement membrane on light microscopy, granular capillary wall deposits of IgG and C3 on immunofluorescence, and subepithelial electron-dense deposits on electron microscopy. Anti-PLA2R antibodies in serum are highly specific for primary MN and helpful for diagnosis and monitoring. Work-up should include screening for secondary causes, particularly in older patients or those with atypical features. The natural history is variable: approximately one-third of patients undergo spontaneous remission, one-third have persistent proteinuria but stable kidney function, and one-third progress to kidney failure. Management includes supportive therapy for all patients: RAAS inhibitors to reduce proteinuria, statins for hyperlipidemia, anticoagulation in high-risk patients (albumin <2.5 g/dL with additional risk factors), and salt restriction for edema. Immunosuppressive therapy is reserved for patients at high risk of progression: persistent severe proteinuria (>8 g/day) for >6 months, declining kidney function, or life-threatening complications of nephrotic syndrome. First-line immunosuppressive regimens include: the Ponticelli protocol (alternating monthly cycles of corticosteroids and cyclophosphamide for 6 months), calcineurin inhibitors (cyclosporine or tacrolimus), or rituximab (anti-CD20 monoclonal antibody). Rituximab has gained favor due to its favorable efficacy-to-toxicity ratio and ability to specifically target the underlying B-cell-mediated process. Response to therapy can be monitored with proteinuria and anti-PLA2R antibody levels in those with positive serology at baseline."
            }
          ]
        }
      ]
    }
  ]
},
// 14. Dermatologic System Topics
{
  title: "Dermatitis",
  slug: "dermatitis",
  introduction: "Dermatitis refers to a group of inflammatory skin conditions characterized by erythema, pruritus, and specific patterns of skin lesions. These disorders result from various causes, including genetic predisposition, environmental triggers, and immune dysregulation. Dermatitis conditions significantly impact quality of life and are among the most common reasons for dermatology consultation.",
  diagnosis_overview: "Diagnosis relies primarily on clinical features, including the morphology and distribution of lesions, associated symptoms, and course of illness. Skin biopsy may be helpful in atypical cases but is often not necessary. Patch testing can identify specific allergens in suspected allergic contact dermatitis.",
  management: "Management approaches include avoidance of triggers, restoration of skin barrier function, control of inflammation, and treatment of secondary infections. Patient education regarding the chronic, relapsing nature of many dermatitis conditions and proper skin care techniques is essential for successful outcomes.",
  highyieldPoints: "- Know the clinical features and distribution patterns of common dermatitis conditions\n- Understand the role of barrier dysfunction and immune dysregulation in pathogenesis\n- Be familiar with step-care approaches to management, including appropriate use of topical and systemic agents",
  systemIndex: 13, // Reference to Dermatologic System
  types: [
    {
      name: "Atopic Dermatitis",
      abbreviation: "AD",
      anchor_id: "atopic-dermatitis",
      description: "Atopic dermatitis is a chronic, relapsing inflammatory skin condition characterized by intense pruritus and eczematous lesions. It typically begins in early childhood and is associated with personal or family history of atopy (allergic rhinitis, asthma, food allergies).",
      symptoms: [
        { text: "Intense pruritus (the hallmark symptom)" },
        { text: "Sleep disturbance due to itching" },
        { text: "Skin pain or burning" },
        { text: "Psychological distress" },
        { text: "Symptoms of concurrent atopic conditions (asthma, allergic rhinitis)" }
      ],
      diagnosticFindings: [
        { text: "Acute lesions: erythematous papules and vesicles, exudation, crusting" },
        { text: "Chronic lesions: lichenification, scaling, excoriations" },
        { text: "Age-dependent distribution: infants (face, extensor surfaces), children/adults (flexural areas, neck, hands)" },
        { text: "Elevated IgE levels in many patients" },
        { text: "Peripheral eosinophilia in some cases" },
        { text: "Histopathology shows spongiosis, acanthosis, and perivascular lymphocytic infiltrate" }
      ],
      causes: [
        { text: "Genetic factors (including filaggrin gene mutations)" },
        { text: "Impaired skin barrier function" },
        { text: "Immune dysregulation (Th2 and Th22 predominant response)" },
        { text: "Environmental triggers (allergens, irritants, climate)" },
        { text: "Microbial dysbiosis (increased Staphylococcus aureus colonization)" },
        { text: "Stress and emotional factors" }
      ]
    },
    {
      name: "Contact Dermatitis",
      abbreviation: "CD",
      anchor_id: "contact-dermatitis",
      description: "Contact dermatitis results from direct skin exposure to irritants or allergens, leading to inflammation. It includes irritant contact dermatitis (ICD), which is non-immunologic, and allergic contact dermatitis (ACD), a delayed hypersensitivity reaction.",
      symptoms: [
        { text: "Pruritus (more prominent in ACD than ICD)" },
        { text: "Burning or stinging sensation (particularly in ICD)" },
        { text: "Discomfort or pain at the site of exposure" },
        { text: "Distribution limited to areas of direct contact with the offending agent" }
      ],
      diagnosticFindings: [
        { text: "Well-demarcated erythema, edema, vesicles in acute stages" },
        { text: "Scaling, lichenification in chronic cases" },
        { text: "Distribution pattern corresponding to exposure (e.g., linear streaks from plant exposure, geometric patterns from jewelry)" },
        { text: "Positive patch test results in allergic contact dermatitis" },
        { text: "Histopathology similar to other forms of eczematous dermatitis" }
      ],
      causes: [
        { text: "Irritant contact dermatitis: soaps, detergents, solvents, acids/alkalis, prolonged water exposure" },
        { text: "Allergic contact dermatitis: metals (nickel, cobalt), fragrances, preservatives, rubber compounds, plants (poison ivy/oak), medications (topical antibiotics, anesthetics)" },
        { text: "Occupational exposures (healthcare workers, hairdressers, construction workers)" },
        { text: "Personal care products (cosmetics, hair dyes)" },
        { text: "Clothing and accessories (leather, dyes, elastic)" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Management of Atopic Dermatitis",
      slug: "management-of-atopic-dermatitis",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Management of atopic dermatitis requires a comprehensive approach addressing skin barrier dysfunction, inflammation, infection, and triggering factors. Treatment should be tailored to disease severity, patient age, and affected body regions."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Basic Skin Care and Trigger Avoidance" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Skin hydration is essential, with liberal use of moisturizers applied immediately after bathing to trap moisture. Emollients and occlusives (containing ceramides, petrolatum, or dimethicone) help restore the skin barrier. Moisturizers should be fragrance-free and low in potential allergens. Bathing practices should be modified: use lukewarm (not hot) water; limit duration to 5-10 minutes; use gentle, fragrance-free cleansers only on soiled areas; and pat skin dry rather than rubbing. Trigger identification and avoidance strategies include minimizing exposure to irritants (soaps, detergents, wool clothing), using fragrance-free products, avoiding rapid temperature changes, managing stress, and addressing potentially relevant dietary triggers in selected cases. Specific allergen avoidance may be recommended based on testing results, though aeroallergen avoidance has limited evidence. Environmental modifications include maintaining moderate humidity, using dust mite covers for bedding, and avoiding pet exposure in sensitized individuals."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Pharmacologic Management" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Topical anti-inflammatory therapy is the mainstay of treatment. Topical corticosteroids (TCS) are first-line, with potency selected based on severity, body location, and patient age. Low to mid-potency TCS are used for the face, neck, intertriginous areas, and in children, while higher potency agents may be appropriate for thick, lichenified lesions or treatment-resistant areas in adults. Appropriate use includes twice daily application only to affected areas during flares, with tapering and eventual use of the lowest effective potency to maintain control. Topical calcineurin inhibitors (tacrolimus, pimecrolimus) are steroid-sparing agents particularly useful for sensitive skin areas or when concerned about TCS side effects. They may cause transient burning on application. Topical phosphodiesterase-4 inhibitors (crisaborole) provide another non-steroidal option for mild to moderate disease. Systemic therapy is considered for moderate to severe disease inadequately controlled with topical treatments. Traditional immunosuppressants include cyclosporine (rapid acting, suitable for short-term control), methotrexate, azathioprine, and mycophenolate mofetil (all requiring monitoring for potential toxicities). Dupilumab, a monoclonal antibody targeting IL-4/IL-13 signaling, is approved for moderate-to-severe atopic dermatitis and shows significant efficacy with a favorable safety profile. JAK inhibitors (abrocitinib, upadacitinib, baricitinib) are newer options for refractory disease. Antimicrobial therapy is indicated for clinically infected eczema (honey-colored crusts, pustules, significant worsening of symptoms), typically with anti-staphylococcal antibiotics. Routine use of antibiotics for colonization is not recommended. Antihistamines have limited evidence for efficacy but may help with sleep when sedating agents are used at bedtime. Non-sedating antihistamines generally do not relieve itch associated with atopic dermatitis."
            }
          ]
        }
      ]
    },
    {
      title: "Seborrheic Dermatitis",
      slug: "seborrheic-dermatitis",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Seborrheic dermatitis is a common chronic inflammatory disorder affecting sebaceous gland-rich areas of the skin, particularly the scalp, face, and upper trunk. It presents with erythematous patches and yellowish, greasy scales and has a relapsing-remitting course."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Pathophysiology and Clinical Features" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The pathogenesis involves complex interactions between Malassezia yeasts (normal skin flora that may trigger an inflammatory response in susceptible individuals), sebaceous gland activity, and host immune factors. Predisposing factors include neurologic conditions (Parkinson's disease), immunosuppression (HIV/AIDS, organ transplantation), nutritional deficiencies, and genetic predisposition. Stress, fatigue, and seasonal changes (worse in winter) often trigger flares. Seborrheic dermatitis presents in three main age groups: infants (cradle cap), adolescents, and adults (peak in 30s-60s), with a male predominance. Distribution typically involves sebaceous-rich areas: scalp (dandruff to more severe scaling), hairline, eyebrows, glabella, nasolabial folds, beard area, retroauricular regions, external ear canal, central chest, and occasionally intertriginous areas. Clinical features include well-demarcated erythematous patches or thin plaques with yellowish, greasy scales; minimal induration; and variable pruritus (often less intense than in atopic or contact dermatitis). Blepharitis (inflammation of eyelid margins) frequently coexists. In infants, cradle cap presents as thick, adherent, yellowish scales on the scalp without significant inflammation, typically resolving spontaneously within the first year of life."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Diagnosis and Management" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Diagnosis is typically clinical, based on characteristic distribution and appearance. Differential diagnosis includes psoriasis, atopic dermatitis, tinea, rosacea, lupus erythematosus, and dermatophyte infections. Biopsy is rarely necessary but shows spongiosis, parakeratosis, and perivascular and perifollicular inflammatory infiltrate. Treatment focuses on controlling inflammation and reducing Malassezia load, with the understanding that the condition is chronic and typically requires maintenance therapy. For mild scalp involvement (dandruff), antifungal shampoos containing ketoconazole, selenium sulfide, zinc pyrithione, or ciclopirox are first-line, used 2-3 times weekly initially, then less frequently for maintenance. For moderate to severe scalp disease, topical corticosteroid solutions or foams (e.g., fluocinolone, clobetasol) can be added for short-term control of inflammation. Facial and body involvement is typically treated with topical antifungals (ketoconazole, ciclopirox creams) and/or low-potency topical corticosteroids for short courses. Topical calcineurin inhibitors (tacrolimus, pimecrolimus) are effective steroid-sparing agents for facial disease. For severe or recalcitrant cases, oral antifungals (fluconazole, itraconazole) may be considered for short courses, typically 1-4 weeks. Infants with cradle cap can be treated with gentle shampooing after applying mineral oil to soften scales, followed by a weak antifungal shampoo if necessary. Patient education should emphasize the chronic nature of the condition, the importance of maintenance therapy, and the role of trigger avoidance. For associated conditions, concurrent treatment of blepharitis (lid hygiene and possibly topical antibiotics) may be necessary, and evaluation for HIV should be considered in severe or refractory cases, especially with atypical presentations."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Psoriasis",
  slug: "psoriasis",
  introduction: "Psoriasis is a chronic, immune-mediated inflammatory disease affecting the skin, nails, and frequently the joints. It is characterized by well-demarcated, erythematous plaques with silvery scale and has a relapsing and remitting course. Beyond skin manifestations, psoriasis is increasingly recognized as a systemic inflammatory condition associated with multiple comorbidities.",
  diagnosis_overview: "Diagnosis is typically clinical, based on characteristic skin lesions, distribution patterns, and associated features such as nail changes. Skin biopsy may be helpful in atypical presentations. Severity assessment incorporates body surface area affected, location, impact on quality of life, and response to previous treatments.",
  management: "Management is tailored to disease severity, affected areas, impact on quality of life, and presence of comorbidities. Options range from topical therapies for limited disease to systemic agents and biologics for moderate-to-severe or recalcitrant cases. A holistic approach addressing physical and psychological aspects is essential.",
  highyieldPoints: "- Know the different clinical variants of psoriasis and their distinguishing features\n- Understand the role of the IL-23/Th17 pathway and other immune mechanisms in pathogenesis\n- Be familiar with the approach to therapy based on disease severity and the mechanisms of action of biologic therapies",
  systemIndex: 13, // Reference to Dermatologic System
  types: [
    {
      name: "Plaque Psoriasis",
      abbreviation: "PP",
      anchor_id: "plaque-psoriasis",
      description: "Plaque psoriasis (psoriasis vulgaris) is the most common form, characterized by well-demarcated, erythematous plaques with adherent silvery scale. It tends to affect extensor surfaces and exhibits the Koebner phenomenon (development of lesions at sites of trauma).",
      symptoms: [
        { text: "Pruritus (in approximately 60-70% of patients)" },
        { text: "Burning or soreness of affected skin" },
        { text: "Pain with cracking or fissuring" },
        { text: "Psychological distress" },
        { text: "Joint pain and stiffness in those with psoriatic arthritis" }
      ],
      diagnosticFindings: [
        { text: "Well-circumscribed, erythematous plaques with silvery-white scale" },
        { text: "Predilection for elbows, knees, scalp, lumbosacral area, and intergluteal cleft" },
        { text: "Auspitz sign (pinpoint bleeding when scale is removed)" },
        { text: "Nail changes: pitting, onycholysis, oil spots, subungual hyperkeratosis" },
        { text: "Histopathology: acanthosis, parakeratosis, elongated rete ridges, thinned suprapapillary plates, dilated capillaries, neutrophilic microabscesses" }
      ],
      causes: [
        { text: "Genetic predisposition (multiple susceptibility loci, including HLA-Cw6)" },
        { text: "Immune dysregulation (IL-23/Th17 pathway, TNF-α, IL-22)" },
        { text: "Environmental triggers: stress, trauma, infections (particularly streptococcal)" },
        { text: "Medications: beta-blockers, lithium, antimalarials, interferons, rapid taper of systemic corticosteroids" },
        { text: "Lifestyle factors: obesity, smoking, excessive alcohol consumption" }
      ]
    },
    {
      name: "Non-Plaque Psoriasis Variants",
      abbreviation: "NPPV",
      anchor_id: "non-plaque-variants",
      description: "Besides plaque psoriasis, several distinct clinical variants exist, each with characteristic presentations and sometimes different treatment approaches. These variants may occur alone or in combination with plaque psoriasis.",
      symptoms: [
        { text: "Guttate psoriasis: sudden onset of small, drop-like lesions, often after streptococcal infection" },
        { text: "Pustular psoriasis: sterile pustules on erythematous base, may be localized or generalized" },
        { text: "Erythrodermic psoriasis: widespread erythema affecting >90% of body surface, often with systemic symptoms" },
        { text: "Inverse psoriasis: smooth, erythematous plaques in intertriginous areas, minimal scale" },
        { text: "Nail psoriasis: isolated nail involvement with pitting, onycholysis, subungual hyperkeratosis" }
      ],
      diagnosticFindings: [
        { text: "Guttate: 2-10mm erythematous papules with fine scale, widespread distribution on trunk and proximal extremities" },
        { text: "Pustular: clinical and laboratory evidence of neutrophilic sterile pustules, may have systemic inflammation" },
        { text: "Erythrodermic: diffuse erythema, scaling, temperature dysregulation, high-output cardiac failure in severe cases" },
        { text: "Inverse: well-demarcated, erythematous plaques in skin folds, often without typical scale" },
        { text: "Histopathologic findings vary by subtype but share features of epidermal hyperplasia and inflammation" }
      ],
      causes: [
        { text: "Guttate: often triggered by streptococcal pharyngitis or tonsillitis" },
        { text: "Pustular: may be provoked by medication withdrawal, hypocalcemia, pregnancy, infections" },
        { text: "Erythrodermic: often results from withdrawal of systemic corticosteroids, widespread use of irritating topicals, or untreated unstable psoriasis" },
        { text: "Shared genetic and immunologic factors with plaque psoriasis, with variations in inflammatory patterns" },
        { text: "Environmental triggers similar to plaque psoriasis but with different clinical manifestations" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Systemic and Biologic Therapies for Psoriasis",
      slug: "systemic-biologic-therapies-psoriasis",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Moderate-to-severe psoriasis often requires systemic therapy to achieve adequate disease control. The development of targeted biologic agents has revolutionized treatment, providing more effective and potentially safer options than traditional systemic medications."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Traditional Systemic Agents" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Methotrexate, an antimetabolite that inhibits DNA synthesis and has anti-inflammatory properties, remains a commonly used first-line systemic agent. Typical dosing is 7.5-25 mg weekly, with efficacy for both skin and joint disease. Monitoring includes baseline and periodic liver function tests, complete blood count, and renal function, with liver biopsy consideration based on cumulative dose and risk factors. Contraindications include pregnancy, liver disease, and significant kidney dysfunction. Acitretin, an oral retinoid, is effective for pustular and erythrodermic variants. Dosing ranges from 10-50 mg daily, with lower doses often used for maintenance. It is strictly contraindicated in pregnancy (category X) and requires contraception for 3 years after discontinuation. Side effects include mucocutaneous dryness, hyperlipidemia, and teratogenicity. Cyclosporine provides rapid improvement but is generally used for short-term control (3-6 months) due to nephrotoxicity and hypertension risks. Usual dosing is 2.5-5 mg/kg/day. Careful monitoring of blood pressure and renal function is required. Apremilast, a phosphodiesterase-4 inhibitor, offers a safer profile than traditional systemics but with more modest efficacy. Common side effects include diarrhea (typically transient), nausea, headache, and weight loss. No laboratory monitoring is required."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Biologic Therapies" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "TNF-α inhibitors (adalimumab, etanercept, infliximab, certolizumab) were the first biologics widely used for psoriasis and remain effective for both skin and joint disease. Screening before initiation includes tuberculosis testing, hepatitis B and C serologies, and assessment for heart failure and demyelinating disorders. IL-17 inhibitors (secukinumab, ixekizumab, brodalumab) target a key cytokine in psoriasis pathogenesis and provide rapid and high-level skin clearance. They may exacerbate inflammatory bowel disease and carry a small risk of neutropenia. Candida infections are more common due to IL-17's role in mucocutaneous immunity. IL-23 inhibitors (guselkumab, risankizumab, tildrakizumab) target the p19 subunit of IL-23, a master regulator of pathogenic T cells in psoriasis. They offer high efficacy, infrequent dosing (typically every 8-12 weeks after induction), and excellent safety profiles. IL-12/23 inhibitor (ustekinumab) targets the shared p40 subunit of both cytokines, with established long-term safety and efficacy for skin and joint disease. The choice among biologics considers multiple factors: presence of psoriatic arthritis (TNF-α, IL-17A, and IL-12/23 inhibitors have proven joint efficacy), comorbidities (avoiding TNF-α inhibitors in demyelinating disease or heart failure; IL-17 inhibitors in IBD), pregnancy planning (certolizumab has minimal placental transfer), patient preference for dosing frequency, and insurance coverage. Biologic therapy is typically continued long-term in responders, as discontinuation usually leads to relapse within months. Combination with low-dose methotrexate may prevent antibody formation against biologics, particularly TNF-α inhibitors."
            }
          ]
        }
      ]
    },
    {
      title: "Psoriasis Comorbidities and Comprehensive Care",
      slug: "psoriasis-comorbidities-care",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Psoriasis is increasingly recognized as a systemic inflammatory disorder associated with multiple comorbidities that significantly impact health outcomes and treatment decisions. Comprehensive care requires attention to these associated conditions and their management."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Associated Comorbidities" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Psoriatic arthritis (PsA) affects approximately 30% of psoriasis patients, typically developing after skin disease but occasionally preceding it. Screening should occur regularly using validated tools like the PEST or PASE questionnaires. PsA patterns include: asymmetric oligoarthritis, distal interphalangeal predominant, arthritis mutilans, symmetric polyarthritis (resembling rheumatoid arthritis), and axial disease. Early detection and treatment can prevent joint destruction and disability. Cardiovascular disease risk is significantly increased in psoriasis, independent of traditional risk factors and correlating with disease severity. This includes increased rates of myocardial infarction, stroke, and cardiovascular mortality. Contributing factors include shared inflammatory pathways, higher prevalence of traditional risk factors, and potentially adverse effects of some psoriasis treatments. Metabolic syndrome components (obesity, hypertension, dyslipidemia, insulin resistance) occur more frequently in psoriasis patients. Obesity both predisposes to psoriasis and exacerbates existing disease, creating a vicious cycle. Weight loss interventions can improve psoriasis severity and treatment response. Psychiatric comorbidities, particularly depression and anxiety, affect up to 30% of patients, stemming from both psychosocial impact and shared inflammatory pathways. Other associated conditions include inflammatory bowel disease (especially Crohn's disease), non-alcoholic fatty liver disease, uveitis, and increased risk of certain malignancies (particularly lymphoma and non-melanoma skin cancer)."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Comprehensive Management Approach" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Screening for comorbidities should be incorporated into routine care, including: regular assessment for joint symptoms, cardiovascular risk factor evaluation, metabolic syndrome screening, depression and anxiety screening, and age-appropriate cancer screening. Lifestyle modifications are fundamental, with particularly strong evidence for the benefits of weight loss in obese patients. Smoking cessation, reduced alcohol consumption, regular physical activity, and stress management techniques should be encouraged. Multidisciplinary care coordination between dermatology, rheumatology, cardiology, primary care, and mental health services optimizes outcomes. Treatment selection should consider comorbidities: TNF-α, IL-17A, and IL-12/23 inhibitors for concurrent psoriatic arthritis; avoiding cyclosporine in hypertension or kidney disease; caution with acitretin in dyslipidemia; potential benefit of TNF-α or IL-17 inhibitors for metabolic syndrome. Patient education regarding the systemic nature of psoriasis, importance of comorbidity management, and psychosocial support resources is essential. Quality of life assessment should be part of routine evaluation, as physical severity does not always correlate with psychological impact. Emerging evidence suggests that effective control of psoriatic inflammation, particularly with biologic therapies, may reduce the risk of comorbidities, especially cardiovascular events. This highlights the importance of treating psoriasis not just as a skin disease but as a systemic inflammatory condition."
            }
          ]
        }
      ]
    }
  ]
},
{
  title: "Skin Cancer",
  slug: "skin-cancer",
  introduction: "Skin cancer is the most common malignancy in humans, with increasing incidence worldwide. It encompasses a spectrum of neoplasms derived from different cell types within the skin, primarily categorized as non-melanoma skin cancer (basal cell carcinoma, squamous cell carcinoma) and melanoma. Early detection is crucial for favorable outcomes, particularly for aggressive forms like melanoma.",
  diagnosis_overview: "Diagnosis begins with visual examination, often aided by dermoscopy to enhance diagnostic accuracy. Suspicious lesions require histopathological confirmation through biopsy. For melanoma, staging workup depends on tumor thickness and other high-risk features, potentially including sentinel lymph node biopsy and imaging studies.",
  management: "Management strategies vary by cancer type, stage, location, and patient factors. Options include surgical excision (the mainstay of treatment), topical therapies for certain superficial lesions, radiation therapy, targeted systemic treatments for advanced disease, and appropriate follow-up for recurrence surveillance and new lesion detection.",
  highyieldPoints: "- Know the clinical features and risk factors for basal cell carcinoma, squamous cell carcinoma, and melanoma\n- Understand the ABCDE criteria for melanoma recognition and the importance of total body skin examination\n- Be familiar with appropriate biopsy techniques, surgical margins, and indications for adjuvant therapy",
  systemIndex: 13, // Reference to Dermatologic System
  types: [
    {
      name: "Non-Melanoma Skin Cancer",
      abbreviation: "NMSC",
      anchor_id: "non-melanoma-skin-cancer",
      description: "Non-melanoma skin cancer includes basal cell carcinoma (BCC) and squamous cell carcinoma (SCC), the two most common types of skin cancer. They typically develop on sun-exposed areas and, while rarely metastatic (particularly BCC), can cause significant local tissue destruction if neglected.",
      symptoms: [
        { text: "BCC: Pearly, translucent papule or nodule, often with telangiectasias" },
        { text: "BCC: Central depression or ulceration (\"rodent ulcer\")" },
        { text: "SCC: Firm, scaly or hyperkeratotic papule or plaque" },
        { text: "SCC: May develop ulceration, crusting, or bleeding" },
        { text: "Both: Persistent, non-healing lesion that may bleed with minor trauma" },
        { text: "Both: Usually asymptomatic, occasionally tender or painful" }
      ],
      diagnosticFindings: [
        { text: "BCC histology: Nests of basaloid cells with peripheral palisading and retraction artifact" },
        { text: "SCC histology: Atypical keratinocytes invading the dermis, varying degrees of differentiation" },
        { text: "SCC in situ (Bowen's disease): Full-thickness epidermal atypia without dermal invasion" },
        { text: "Actinic keratosis: Precursor to SCC with partial-thickness epidermal dysplasia" },
        { text: "Dermoscopic features specific to each type" }
      ],
      causes: [
        { text: "Cumulative ultraviolet radiation exposure (primary risk factor)" },
        { text: "Fair skin, light eyes, and hair (Fitzpatrick skin types I-II)" },
        { text: "Immunosuppression (transplant recipients, HIV, chronic immunosuppressive therapy)" },
        { text: "Prior radiation therapy" },
        { text: "Chronic scars or wounds (particularly for SCC)" },
        { text: "Human papillomavirus infection (for some SCCs)" },
        { text: "Genetic syndromes (basal cell nevus syndrome, xeroderma pigmentosum)" },
        { text: "Arsenic exposure" }
      ]
    },
    {
      name: "Melanoma",
      abbreviation: "MM",
      anchor_id: "melanoma",
      description: "Melanoma is a malignant neoplasm derived from melanocytes, characterized by its potential for metastasis and higher mortality than non-melanoma skin cancers. Though less common than BCC and SCC, its incidence is rising, particularly among young adults.",
      symptoms: [
        { text: "Changing pigmented lesion (size, shape, color, or elevation)" },
        { text: "New pigmented lesion, especially in adults over 40" },
        { text: "Asymmetry, irregular borders, color variegation, diameter >6mm, evolution (ABCDE criteria)" },
        { text: "May be amelanotic (non-pigmented) in some cases" },
        { text: "Ulceration, bleeding, or nodularity in advanced lesions" },
        { text: "Metastatic disease: lymphadenopathy, unexplained weight loss, fatigue, organ-specific symptoms" }
      ],
      diagnosticFindings: [
        { text: "Histopathologic confirmation is essential, showing malignant melanocytes" },
        { text: "Breslow thickness: measured from granular layer to deepest tumor cell, critical for prognosis" },
        { text: "Ulceration: absence of intact epidermis, indicates worse prognosis" },
        { text: "Mitotic rate: number of mitoses per mm², higher rates indicate more aggressive behavior" },
        { text: "Subtypes: superficial spreading, nodular, lentigo maligna, acral lentiginous, each with characteristic features" },
        { text: "Dermoscopy shows atypical network, blue-white structures, irregular vessels, and other specific features" }
      ],
      causes: [
        { text: "Intermittent intense UV exposure and sunburns, especially in childhood" },
        { text: "Fair skin, light eyes, and hair; inability to tan" },
        { text: "Multiple (>50) nevi or atypical/dysplastic nevi" },
        { text: "Family history of melanoma" },
        { text: "Personal history of melanoma or non-melanoma skin cancer" },
        { text: "Genetic predisposition (CDKN2A, CDK4, MITF mutations)" },
        { text: "Immunosuppression" },
        { text: "Prior radiation therapy" }
      ]
    }
  ],
  subtopics: [
    {
      title: "Skin Cancer Prevention and Screening",
      slug: "skin-cancer-prevention-screening",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Prevention of skin cancer focuses on reducing ultraviolet (UV) radiation exposure and early detection through regular skin examinations. A comprehensive approach includes both primary prevention strategies to reduce incidence and secondary prevention through screening to detect cases at earlier, more treatable stages."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Primary Prevention" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Sun protection measures should be employed consistently, including broad-spectrum sunscreen (SPF 30 or higher, water-resistant) applied 15-30 minutes before exposure and reapplied every 2 hours or after swimming/sweating. Physical protection with sun-protective clothing, wide-brimmed hats, and sunglasses with UV protection is often more effective than sunscreen alone. Sun avoidance during peak hours (10 AM to 4 PM) significantly reduces UV exposure. Seeking shade whenever possible, particularly for outdoor activities, provides substantial protection. Artificial UV exposure from tanning beds and sun lamps should be avoided entirely, as they significantly increase skin cancer risk, especially when used before age 35. Public education campaigns to raise awareness about skin cancer risks and prevention strategies have shown effectiveness, particularly those targeting children and adolescents. Behavioral interventions that focus on habit formation around sun protection are more effective than knowledge-based approaches alone. Policy measures, including regulations on indoor tanning, sun safety policies in schools and workplaces, and shade provision in public spaces, create supportive environments for skin cancer prevention."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Screening and Early Detection" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Skin self-examination should be performed monthly, using mirrors to check all body surfaces. Patients should be taught the ABCDE criteria for melanoma (Asymmetry, Border irregularity, Color variegation, Diameter >6mm, Evolution) and the \"ugly duckling\" sign (lesions that look different from other moles). Photography, including with smartphone apps, can help track changes over time. Professional skin examinations are recommended annually for average-risk individuals and more frequently for high-risk patients. Risk assessment tools can identify individuals who would benefit from more intensive surveillance, considering factors like family history, personal history of skin cancer, skin type, number of nevi, and immunosuppression. Total body skin examination by trained healthcare providers has greater sensitivity than patient self-examination. Special populations requiring enhanced surveillance include: organ transplant recipients (10-100 times increased risk of SCC), patients with genetic syndromes (xeroderma pigmentosum, basal cell nevus syndrome), those with numerous (>50) nevi or atypical mole syndrome, and individuals with a personal or family history of melanoma. Technologies to improve early detection include dermoscopy (dramatically improves diagnostic accuracy with proper training), reflectance confocal microscopy, optical coherence tomography, and automated image analysis systems. The routine use of these tools varies by setting and availability."
            }
          ]
        }
      ]
    },
    {
      title: "Melanoma Management and Staging",
      slug: "melanoma-management-staging",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Melanoma management is guided by stage, which determines the extent of surgery, need for sentinel lymph node biopsy, and role of adjuvant or systemic therapy. An evidence-based approach tailored to the individual patient's disease characteristics is essential for optimal outcomes."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Diagnosis and Staging" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Initial biopsy should be excisional when possible, removing the entire lesion with a narrow margin (1-3 mm). Punch, shave, or incisional biopsies may be appropriate for large lesions or certain anatomic sites, though they may limit assessment of Breslow thickness. Essential pathologic features include: Breslow thickness (mm), ulceration status, mitotic rate, microsatellitosis, lymphovascular invasion, neurotropism, and tumor-infiltrating lymphocytes. Staging follows the American Joint Committee on Cancer (AJCC) 8th edition TNM system: Stage 0 (melanoma in situ); Stage I-II (localized disease, subdivided by thickness and ulceration); Stage III (regional nodal or in-transit metastases); Stage IV (distant metastases). For Stage IB-IIA melanomas (>0.8 mm thick or 0.8-1.0 mm with ulceration), sentinel lymph node biopsy (SLNB) provides important prognostic information and guides management decisions. For Stages IIB-IIC (thick melanomas), SLNB is strongly recommended. Baseline imaging (CT chest/abdomen/pelvis, PET/CT, or MRI brain) is typically not indicated for Stage I-II disease but should be considered for Stage III and is required for Stage IV disease."
            }
          ]
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Treatment Approaches" }]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Wide local excision is the standard treatment for primary melanoma, with margins based on Breslow thickness: 0.5-1.0 cm for melanoma in situ; 1 cm for melanomas ≤1 mm thick; 1-2 cm for melanomas 1.01-2 mm thick; 2 cm for melanomas >2 mm thick. Mohs surgery or staged excision may be considered for melanomas in anatomically sensitive areas. Management of regional lymph nodes depends on SLNB results. For negative SLNB, observation is appropriate. For positive SLNB, options include completion lymph node dissection (less commonly performed now) or close observation with ultrasound surveillance. For clinically evident nodal disease, therapeutic lymph node dissection is standard. Adjuvant therapy for Stage III and high-risk Stage II melanoma has evolved significantly with: Immune checkpoint inhibitors (anti-PD-1 antibodies pembrolizumab and nivolumab, and anti-CTLA-4 antibody ipilimumab) showing improved relapse-free and overall survival; Targeted therapy with BRAF/MEK inhibitors (dabrafenib/trametinib) for patients with BRAF V600 mutations, also showing survival benefit. For advanced/metastatic disease (Stage IV), options include: Immunotherapy as first-line treatment for most patients (anti-PD-1 monotherapy or combined with anti-CTLA-4); Targeted therapy for BRAF-mutant melanoma (BRAF/MEK inhibitor combinations); Surgical metastasectomy for oligometastatic disease; Radiation therapy for symptomatic metastases or adjuvantly after lymph node dissection in high-risk cases. Follow-up recommendations include clinical examination every 3-6 months for 2 years, then every 6-12 months for 3 more years, and annually thereafter, with frequency adjusted based on risk. Imaging surveillance should be considered for patients with Stage IIB or higher disease. Patient education about sun protection, skin self-examination, and signs of recurrence is crucial."
            }
          ]
        }
      ]
    }
  ]
},
// Additional topics for remaining systems...
// ...

// Final system...
];

async function seedDatabase() {
  console.log('Starting database seeding process...');
  const createdSystems = [];
  const createdTopics = [];
  const createdSubtopics = [];

  try {

    
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

    console.log('\n--- Seeding Complete ---');
    console.log(`Created ${createdSystems.length} systems`);
    console.log(`Created ${createdTopics.length} topics`);
    console.log(`Created ${createdSubtopics.length} subtopics`);
    
  } catch (error) {
    console.error('Fatal error during seeding:', error);
  }}
  // Execute the seed function
  seedDatabase()
    .then(() => console.log('Database seeding completed!'))
    .catch(err => console.error('Error in seed process:', err));