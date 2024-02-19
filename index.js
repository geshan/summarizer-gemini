const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'gemini-try-414805', location: 'us-central1'});
const model = 'gemini-pro';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model,
  generation_config: {
    "max_output_tokens": 2048,
    "temperature": 0.5,
    "top_p": 0.2,
    "top_k": 5
},
  safety_settings: [
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_LOW_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_LOW_AND_ABOVE"
    }
],
});

async function generateContent() {
  const req = {
    contents: [{role: 'user', parts: [{text: "As an expert writer with more than a decade of experience please summarize the following in under 125 words characters focusing on the job, not the company. You are allowed to rephrase given the summary means the same as the original text:\n\nAbout the role\n\nTyro are are now looking to welcome a Graduate Software Engineer to be a member of our Engineering team! You will work closely on either our payments or banking products. We employ Agile methods, and you’ll work in a collaborative team. As a key member of the development team, you will work closely with designers, product managers, and other stakeholders to define and execute on our vision and values. Whilst based in Sydney, you will report to the Delivery Lead.\nWhat youll do\nBe a part of the collaborative and iterative software development cycle from inception to delivery\nWork in a paired-programming environment with smart engineers\nSee Agile and Lean practices/principles applied in the real world\nBe a part of a welcoming, light-hearted and highly collaborative team\nObtain exposure to emerging technology patterns and frameworks, including: - Cloud service design and infrastructure (Amazon AWS) - RESTful JSON application interfaces and integration\nGain exposure to DevOps infrastructure and practices as we take code all the way through to production\nGain real-world knowledge and understanding of working in the fintech space\nLearn how to integrate with third-party systems, either with established protocols, or helping to develop new ones\nWhat youll bring\nPursuing a degree in Software Engineering, Computer Science or related field\nPassionate about writing great quality software with eagerness to learn\nAbility to communicate well and work in a collaborative environment\nAbility to think critically and solve problems\nProven working experience in Java/Kotlin or other object oriented languages\nPassion for creating quality software and up to date on new technologies\nTo apply for this opportunity, please include a cover letter with some information about your Payments domain knowledge and/or experience (if any) and why Tyro speaks to you.\n\nWed also love to see a link to your portfolio.\n\nWhy work for us\nWe want to work in the company of supportive and inclusive people. To that end, we value and respect employees of all backgrounds, cultures, gender identities, sexual orientation, physical ability, age, and all other characteristics that create a varied and representative team of humans. All applicants will be considered fairly, so if you feel in your bones that youre right for this role, please apply!\n\nCulture and Perks\nWe offer competitive graduate salary and some amazing employee benefits such as learning & development opportunities for professional and personal development, 16 weeks paid primary carers leave, 12 weeks paid secondary carers leave, annual team based volunteer day, long service leave program, novated leasing, and a Short Term Incentive Program to name a few.\n\nYou will work autonomously, and will be trusted to make your own decisions and prioritise effectively. You will report to a manager, and support will always be there if you need it, but we dont micro-manage.\n\nThis role is full time and we offer a flexible hybrid working arrangement. Youll be provided with a laptop and all the tools and support you need to succeed.\n\nWere not just like every other bank. Tyro has always been a tech company at heart, fostering a diverse and inclusive environment, and a passion for continuous learning has always been one of the most important parts of our companys culture.\n\nWho we are\nLaunching in 2003, Tyro has grown to become Australias largest EFTPOS provider of all ADIs outside the big four banks. With over 500 staff, $20.1 billion in transactions in FY20, were much more than an EFTPOS provider – Tyro is an Australian bank and operates under the supervision of the Australian Prudential Regulation Authority (APRA). With 10 industry firsts to market, Tyro is a leader in credit, debit and EFTPOS card acquiring, Medicare and private health fund claiming and rebating services to Australian businesses. Find out how you can be a part of the Tyro journey today.\n\nApplication procedures\nWe love a reference portfolio - even if thats just a hobby project. If you have contributed to open source projects, charitable organisations or progressed personal projects, please send us a link to your project github/gitlab/bitbucket page, website or app.\n\nPrivacy and Submitting your Application\nBy proceeding to submit your application, you acknowledge that you have read and understood Tyros Privacy Policy (www.tyro.com/privacy-policy/) and Privacy Statement & Consent for Job Applicants (www.tyro.com/privacy-statement-job-applicants/) and consent to Tyro collecting, using, holding and disclosing your personal information in accordance with these policies.\n﻿ Join Tyro's Engineering team as a Graduate Software Engineer in Sydney. Collaborate on payments or banking products using Agile methods. Define and execute the team's vision, working closely with designers and stakeholders. Participate in the software development cycle, pair-program with skilled engineers, and learn Agile and Lean practices. Gain exposure to emerging technologies, cloud services, and DevOps practices. Integrate with third-party systems and contribute to developing new protocols.\n\nRequirements: Pursuing a degree in Software Engineering or related field, passion for creating quality software, eagerness to learn, excellent communication and collaboration skills, critical thinking and problem-solving abilities, experience in Java/Kotlin or object-oriented languages.\n\nTyro offers competitive graduate salary, comprehensive benefits, flexible hybrid work arrangement, and a supportive, inclusive culture that values diversity and continuous learning. Submit your cover letter highlighting your Payments domain knowledge and why Tyro resonates with you, along with a link to your portfolio, if applicable."}]}],
  };

  const resp = await generativeModel.generateContent(req);
  const content = resp.response?.candidates[0]?.content.parts[0].text;

  console.log('final response: ', content);
};

generateContent();
