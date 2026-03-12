// Quiz Data and Logic
const quizData = {
    totalSteps: 9, // Entrance(0) + Q1-Q5(1-5) + Email(6) + Result(7) + Result Page(8)
};

// State
let currentStep = 0;
let answers = {};
const app = document.getElementById('content');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');

// Diagnoses Database (Based on Step 2)
const diagnoses = {
    "engordo_facil": {
        title: "Stuck Metabolism",
        level: "MODERATE",
        description: "Your body is burning fewer calories than it should.",
        reasons: ["Highly restrictive diets in the past", "Lack of physical activity", "Hormonal imbalances", "Insulin resistance"],
        solution: "My Glowfit was specially designed to solve this with metabolism-boosting recipes and specific protocols.",
        gauge: 65,
        icon: "🐢"
    },
    "dieta_falha": {
        title: "Weight Loss Resistance",
        level: "HIGH",
        description: "Even with effort, your body is not responding.",
        reasons: ["The diet is not personalized for you", "There are hormonal imbalances", "The calorie deficit is too aggressive", "Essential nutrients are missing"],
        solution: "My Glowfit creates a plan that respects your body and produces real results.",
        gauge: 85,
        icon: "🛑"
    },
    "yo_yo": {
        title: "Yo-Yo Effect",
        level: "CRITICAL",
        description: "The cycle of losing and gaining weight is the most harmful to your metabolism.",
        reasons: ["Diets are unsustainable", "Constant hunger and deprivation", "Lack of food education", "No lasting habits"],
        solution: "My Glowfit teaches you to maintain your weight with delicious recipes and sustainable habits.",
        gauge: 95,
        icon: "🎢"
    },
    "fome_constante": {
        title: "Unbalanced Satiety Hormones",
        level: "HIGH",
        description: "Your body is not communicating correctly when you are full.",
        reasons: ["Lack of protein in meals", "Processed foods", "Lack of sleep", "Stress and anxiety"],
        solution: "My Glowfit has protein-rich recipes and anti-anxiety protocols that will solve this.",
        gauge: 80,
        icon: "🍽️"
    },
    "desisti": {
        title: "Lack of Motivation and Belief",
        level: "CRITICAL",
        description: "This is completely normal. Many people have tried and failed before.",
        reasons: ["It's not a restrictive diet", "It has recipes you'll actually love", "Shows fast results", "Has a supportive community"],
        solution: "But My Glowfit is different. We're going to prove to you that this time is different.",
        gauge: 90,
        icon: "😔"
    },
    "gordura_localizada": {
        title: "Resistant Localized Fat",
        level: "MODERATE",
        description: "Localized fat is harder to lose.",
        reasons: ["Genetically predisposed in certain areas", "Requires specific exercises", "Needs specific nutrients", "Hormones influence distribution"],
        solution: "My Glowfit has specialized protocols for each type of localized fat.",
        gauge: 60,
        icon: "🎯"
    },
    "wellness": {
        title: "General Wellness",
        level: "MODERATE",
        description: "Your body needs a metabolic reset to feel its best.",
        reasons: ["Modern lifestyle habits", "Stress and lack of proper rest", "Unbalanced nutrition"],
        solution: "My Glowfit will help you implement sustainable, healthy habits for life.",
        gauge: 50,
        icon: "✨"
    }
};

// Initialize
function init() {
    renderStep(0);
}

// Render Function
function renderStep(stepIndex) {
    // Update Progress Bar
    const percent = Math.min(100, (stepIndex / 7) * 100);
    progressBar.style.width = `${percent}%`;

    if (stepIndex === 0) {
        progressContainer.style.display = 'none';
    } else if (stepIndex < 7) {
        progressContainer.style.display = 'block';
    } else {
        progressContainer.style.display = 'none';
    }

    app.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'section-container fade-in';

    switch (stepIndex) {
        case 0: // Entrance
            container.innerHTML = `
                <div class="text-center" style="margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.25rem; color: var(--primary); margin-bottom: 1rem;">Real Transformations with My Glowfit</h2>
                    <div style="margin: 30px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <img src="./ANTES E DEPOIS.png" alt="Before and After Transformation" style="width: 100%; height: auto; display: block;">
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">See what's possible when you follow the My Glowfit plan. Join thousands of people who have already transformed their bodies and lives!</p>
                </div>
                <h1 class="section-title">Start Your Transformation Journey</h1>
                <p class="section-subtitle">Answer 5 quick questions and receive a personalized diagnosis of your metabolism and action plan.</p>
                <button class="btn btn-primary" onclick="nextStep()" style="background-color: #2D9B6B;">Start Your Quiz Now</button>
            `;
            break;

        case 1: // Age
            container.innerHTML = `
                <h2 class="section-title">What is your age?</h2>
                <div class="options-grid">
                    ${createOptionButton('18-25 years old', '🎂', 1, 'age')}
                    ${createOptionButton('26-35 years old', '🎂', 1, 'age')}
                    ${createOptionButton('36-45 years old', '🎂', 1, 'age')}
                    ${createOptionButton('46-55 years old', '🎂', 1, 'age')}
                    ${createOptionButton('56+ years old', '🎂', 1, 'age')}
                </div>
            `;
            break;

        case 2: // Problem
            container.innerHTML = `
                <h2 class="section-title">Which of these phrases sounds most like you today?</h2>
                <div class="options-grid">
                    ${createProblemCard('I gain weight easily, even eating little', 'Slow or stuck metabolism', 'engordo_facil', '🐢')}
                    ${createProblemCard("I'm dieting, but I can't lose weight", 'Weight loss resistance', 'dieta_falha', '🛑')}
                    ${createProblemCard('I lose weight and then gain it all back', 'Yo-yo effect', 'yo_yo', '🎢')}
                    ${createProblemCard('I have a lot of cravings at odd hours', 'Unbalanced hormones', 'fome_constante', '🍽️')}
                    ${createProblemCard("I've already given up on trying to lose weight", 'Lack of motivation', 'desisti', '😔')}
                    ${createProblemCard('I have difficulty losing localized fat', 'Belly, thighs, arms', 'gordura_localizada', '🎯')}
                </div>
            `;
            break;

        case 3: // Attempts
            container.innerHTML = `
                <h2 class="section-title">Have you tried to lose weight before? What worked?</h2>
                <div class="options-grid">
                    ${createOptionButton('Never tried seriously', '🤔', 3, 'attempts')}
                    ${createOptionButton('Tried, but without success', '📉', 3, 'attempts')}
                    ${createOptionButton('Had success, but then gained weight', '🔄', 3, 'attempts')}
                    ${createOptionButton('Always trying, but inconsistent', '⏳', 3, 'attempts')}
                    ${createOptionButton('Afraid to start because I always fail', '😨', 3, 'attempts')}
                </div>
            `;
            break;

        case 4: // Goal
            container.innerHTML = `
                <h2 class="section-title">How many kilograms would you like to lose?</h2>
                <div class="options-grid">
                    ${createOptionButton('Less than 5kg', '秤', 4, 'goal')}
                    ${createOptionButton('5-10kg', '秤', 4, 'goal')}
                    ${createOptionButton('10-20kg', '秤', 4, 'goal')}
                    ${createOptionButton('20-30kg', '秤', 4, 'goal')}
                    ${createOptionButton('More than 30kg', '秤', 4, 'goal')}
                    ${createOptionButton("I don't have a weight goal, I just want to feel better", '❤️', 4, 'goal')}
                </div>
            `;
            break;

        case 5: // Activity
            container.innerHTML = `
                <h2 class="section-title">How often do you exercise?</h2>
                <div class="options-grid">
                    ${createOptionButton('Never/Sedentary', '🛋️', 5, 'activity')}
                    ${createOptionButton('1-2 times per week', '🚶', 5, 'activity')}
                    ${createOptionButton('3-4 times per week', '🏃', 5, 'activity')}
                    ${createOptionButton('5+ times per week', '🏋️', 5, 'activity')}
                    ${createOptionButton("I don't know/I don't have a routine", '🤷', 5, 'activity')}
                </div>
            `;
            break;

        case 6: // Email
            container.innerHTML = `
                <h2 class="section-title">To send you your personalized diagnosis...</h2>
                <p class="section-subtitle">What is your best email address?</p>
                <div class="input-group">
                    <input type="email" id="email-input" class="form-input" placeholder="example@email.com" required>
                    <div id="email-error" class="error-msg">Please enter a valid email address.</div>
                </div>
                <button class="btn btn-primary" onclick="submitEmail()" style="background-color: #2D9B6B;">See My Diagnosis</button>
                <p class="text-center" style="font-size: 0.8rem; color: #9CA3AF; margin-top: 1rem;">
                    🔒 Your data is 100% secure and we do not spam.
                </p>
            `;
            break;

        case 7: // Calculating...
            renderCalculating();
            return;

        case 8: // Result
            renderResult();
            return;
    }

    app.appendChild(container);
}


// --- Helper Components ---

function createOptionButton(text, icon, currentStepIdx, key) {
    // Escape single quotes to prevent breaking the onclick handler
    const safeText = text.replace(/'/g, "\\'");
    return `
    <div class="option-card" onclick="selectOption('${key}', '${safeText}', ${currentStepIdx})">
        <div class="option-icon">${icon}</div>
        <div class="option-text">
            <div class="option-title">${text}</div>
        </div>
    </div>
    `;
}

function createProblemCard(text, subtitle, value, icon) {
    return `
    <div class="option-card" onclick="selectProblem('${value}')">
        <div class="option-icon">${icon}</div>
        <div class="option-text">
            <div class="option-title">${text}</div>
            <div class="option-subtitle">${subtitle}</div>
        </div>
    </div>
    `;
}

// --- Interaction Logic ---

function nextStep() {
    currentStep++;
    renderStep(currentStep);
}

function selectOption(key, value, stepIdx) {
    answers[key] = value;

    // Safety net: Set default activity factor if "I don't know" is selected, in case calculations are added later
    if (key === 'activity' && value.includes("I don't know")) {
        answers['activity_factor'] = 1.2;
    }

    // Safety net: Set default target weight flag if "I don't have a weight goal" is selected
    if (key === 'goal' && value.includes("I don't have a weight goal")) {
        answers['bypass_weight_calc'] = true;
    }

    nextStep();
}

function selectProblem(value) {
    answers['problem_key'] = value;
    answers['problem_text'] = diagnoses[value].title;
    nextStep();
}

function submitEmail() {
    const emailInput = document.getElementById('email-input');
    const emailError = document.getElementById('email-error');
    const email = emailInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailInput.style.borderColor = 'var(--error)';
        emailError.style.display = 'block';
        return;
    }

    answers['email'] = email;
    console.log("Sending to Mailchimp:", answers);
    nextStep();
}

function renderCalculating() {
    app.innerHTML = `
        <div class="section-container fade-in" style="text-align: center; padding-top: 2rem;">
            <h2 class="section-title">Analyzing your profile...</h2>
            <div style="margin: 2rem auto; width: 50px; height: 50px; border: 4px solid #E5E7EB; border-top: 4px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p class="section-subtitle" id="calc-text">Comparing with thousands of cases...</p>
        </div>
        <style>
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
    `;

    setTimeout(() => {
        document.getElementById('calc-text').textContent = "Identifying your metabolic type...";
    }, 1500);

    setTimeout(() => {
        document.getElementById('calc-text').textContent = "Generating your personalized plan...";
    }, 3000);

    setTimeout(() => {
        nextStep();
    }, 4500);
}

function renderResult() {
    // Global Redirection Rule Fallback
    const problemKey = (answers['problem_key'] && diagnoses[answers['problem_key']]) ? answers['problem_key'] : 'wellness';
    const diagnosis = diagnoses[problemKey];

    const container = document.createElement('div');
    container.className = 'section-container fade-in';

    container.innerHTML = `
        <h1 class="section-title" style="color: var(--primary-dark);">Congratulations! We Discovered Your Personalized Diagnosis!</h1>
        
        <div class="result-card">
            <div class="text-center">
                <div class="diagnosis-badge">${diagnosis.title}</div>
            </div>
            
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">Severity Level: <span style="color: ${diagnosis.level === 'CRITICAL' ? '#EF4444' : '#F59E0B'}">${diagnosis.level}</span></h3>
            
            <div class="result-explanation">
                ${diagnosis.description}
                <br><br>
                <strong>This happens because:</strong>
                <ul>
                    ${diagnosis.reasons.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
            
            <div class="gauge-wrapper">
                <p style="margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem; color: var(--text-secondary);">Metabolic Analysis</p>
                <div class="gauge">
                    <div class="gauge-fill" style="width: 0%"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #9CA3AF; margin-top: 0.25rem;">
                    <span>Healthy</span>
                    <span>Critical</span>
                </div>
            </div>
            
            <div class="result-explanation">
                <strong>The Solution:</strong><br>
                ${diagnosis.solution}
            </div>
            
            <div class="testimonial">
                "I had the same problem as you. After I started My Glowfit, I lost 12kg in 3 months and never gained it back!" - <strong>Mary, 34 years old.</strong>
            </div>
        </div>
        
        <div style="text-align: center; margin-bottom: 2rem;">
            <p style="margin-bottom: 1rem; font-size: 0.9rem;">Now that you know your diagnosis, the next step is to receive your personalized plan.</p>
            
            <a href="app_sales.html?diagnosis=${problemKey}" class="btn btn-primary" style="padding: 1.25rem 2rem; font-size: 1.25rem; width: 100%; background-color: #2D9B6B;">
                Unlock Your Full Plan
            </a>
            
            <button class="btn btn-secondary" onclick="window.location.href='app_sales.html?diagnosis=${problemKey}'" style="margin-top: 1rem; border: none; font-size: 0.9rem; cursor: pointer;">See only basic pricing</button>
        </div>
    `;

    app.appendChild(container);

    setTimeout(() => {
        const fill = container.querySelector('.gauge-fill');
        if (fill) fill.style.width = `${diagnosis.gauge}%`;
    }, 300);
}

init();
