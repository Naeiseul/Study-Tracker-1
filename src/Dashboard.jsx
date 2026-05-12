import { useState, useEffect } from 'react';
import './Dashboard.css';

const CURRICULA = [
  { id: 'nsc', label: 'NSC', desc: 'National Senior Certificate' },
  { id: 'cambridge', label: 'Cambridge', desc: 'International Examinations' },
  { id: 'university', label: 'University', desc: 'Higher Education' },
];

const SUB_LEVELS = {
  nsc: [
    { id: 'dbe', label: 'DBE', desc: 'Department of Basic Education' },
    { id: 'ieb', label: 'IEB', desc: 'Independent Examinations Board' },
  ],
  cambridge: [
    { id: 'igcse', label: 'IGCSE', desc: 'International General Certificate' },
    { id: 'as', label: 'AS Level', desc: 'Advanced Subsidiary' },
    { id: 'al', label: 'A Level', desc: 'Advanced Level' },
  ],
  university: [],
};

const SUBJECTS = {
  dbe: [
    { id: 'math', name: 'Mathematics' },
    { id: 'math-lit', name: 'Mathematical Literacy' },
    { id: 'english-hl', name: 'English Home Language' },
    { id: 'english-fal', name: 'English First Additional' },
    { id: 'afrikaans-hl', name: 'Afrikaans Home Language' },
    { id: 'afrikaans-fal', name: 'Afrikaans First Additional' },
    { id: 'isizulu-hl', name: 'IsiZulu Home Language' },
    { id: 'isizulu-fal', name: 'IsiZulu First Additional' },
    { id: 'life-sci', name: 'Life Sciences' },
    { id: 'phys-sci', name: 'Physical Sciences' },
    { id: 'accounting', name: 'Accounting' },
    { id: 'business', name: 'Business Studies' },
    { id: 'economics', name: 'Economics' },
    { id: 'geography', name: 'Geography' },
    { id: 'history', name: 'History' },
    { id: 'life-orient', name: 'Life Orientation' },
    { id: 'visual-art', name: 'Visual Arts' },
    { id: 'dramatic-art', name: 'Dramatic Arts' },
    { id: 'music', name: 'Music' },
    { id: 'cat', name: 'Computer Applications Tech' },
    { id: 'it', name: 'Information Technology' },
    { id: 'tourism', name: 'Tourism' },
    { id: 'consumer', name: 'Consumer Studies' },
    { id: 'agri-sci', name: 'Agricultural Sciences' },
  ],
  ieb: [
    { id: 'ieb-math', name: 'Mathematics' },
    { id: 'ieb-math-lit', name: 'Mathematical Literacy' },
    { id: 'ieb-english-hl', name: 'English Home Language' },
    { id: 'ieb-english-fal', name: 'English First Additional' },
    { id: 'ieb-afrikaans-hl', name: 'Afrikaans Home Language' },
    { id: 'ieb-afrikaans-fal', name: 'Afrikaans First Additional' },
    { id: 'ieb-isizulu-hl', name: 'IsiZulu Home Language' },
    { id: 'ieb-isizulu-fal', name: 'IsiZulu First Additional' },
    { id: 'ieb-life-sci', name: 'Life Sciences' },
    { id: 'ieb-phys-sci', name: 'Physical Sciences' },
    { id: 'ieb-accounting', name: 'Accounting' },
    { id: 'ieb-business', name: 'Business Studies' },
    { id: 'ieb-economics', name: 'Economics' },
    { id: 'ieb-geography', name: 'Geography' },
    { id: 'ieb-history', name: 'History' },
    { id: 'ieb-life-orient', name: 'Life Orientation' },
    { id: 'ieb-visual-art', name: 'Visual Arts' },
    { id: 'ieb-dramatic-art', name: 'Dramatic Arts' },
    { id: 'ieb-music', name: 'Music' },
    { id: 'ieb-cat', name: 'Computer Applications Tech' },
    { id: 'ieb-it', name: 'Information Technology' },
    { id: 'ieb-tourism', name: 'Tourism' },
    { id: 'ieb-consumer', name: 'Consumer Studies' },
    { id: 'ieb-agri-sci', name: 'Agricultural Sciences' },
  ],
  igcse: [
    { id: 'ig-math', name: 'Mathematics (0580)' },
    { id: 'ig-add-math', name: 'Additional Mathematics (0606)' },
    { id: 'ig-english', name: 'English Language (0500)' },
    { id: 'ig-english-lit', name: 'English Literature (0475)' },
    { id: 'ig-physics', name: 'Physics (0625)' },
    { id: 'ig-chemistry', name: 'Chemistry (0620)' },
    { id: 'ig-biology', name: 'Biology (0610)' },
    { id: 'ig-business', name: 'Business Studies (0450)' },
    { id: 'ig-economics', name: 'Economics (0455)' },
    { id: 'ig-accounting', name: 'Accounting (0452)' },
    { id: 'ig-geography', name: 'Geography (0460)' },
    { id: 'ig-history', name: 'History (0470)' },
    { id: 'ig-cs', name: 'Computer Science (0478)' },
    { id: 'ig-art', name: 'Art & Design (0400)' },
  ],
  as: [
    { id: 'as-math', name: 'Mathematics (9709)' },
    { id: 'as-further-math', name: 'Further Mathematics (9231)' },
    { id: 'as-physics', name: 'Physics (9702)' },
    { id: 'as-chemistry', name: 'Chemistry (9701)' },
    { id: 'as-biology', name: 'Biology (9700)' },
    { id: 'as-economics', name: 'Economics (9708)' },
    { id: 'as-business', name: 'Business (9609)' },
    { id: 'as-accounting', name: 'Accounting (9706)' },
    { id: 'as-english', name: 'English Language (9093)' },
    { id: 'as-cs', name: 'Computer Science (9618)' },
    { id: 'as-psychology', name: 'Psychology (9990)' },
    { id: 'as-law', name: 'Law (9084)' },
  ],
  al: [
    { id: 'al-math', name: 'Mathematics (9709)' },
    { id: 'al-further-math', name: 'Further Mathematics (9231)' },
    { id: 'al-physics', name: 'Physics (9702)' },
    { id: 'al-chemistry', name: 'Chemistry (9701)' },
    { id: 'al-biology', name: 'Biology (9700)' },
    { id: 'al-economics', name: 'Economics (9708)' },
    { id: 'al-business', name: 'Business (9609)' },
    { id: 'al-accounting', name: 'Accounting (9706)' },
    { id: 'al-english', name: 'English Language (9093)' },
    { id: 'al-cs', name: 'Computer Science (9618)' },
    { id: 'al-psychology', name: 'Psychology (9990)' },
    { id: 'al-law', name: 'Law (9084)' },
  ],
};

const PAYSTACK_KEY = 'pk_test_0a8ab8e2374fa0747fd065ffc6a01c36b93dc418';

function SubscribeFlow({ onComplete, onLogout, userEmail }) {
  const [step, setStep] = useState(1);
  const [curriculum, setCurriculum] = useState('');
  const [subLevel, setSubLevel] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [plan, setPlan] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('st-theme');
    if (saved) return saved === 'dark';
    return true;
  });

  useEffect(() => {
    localStorage.setItem('st-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = darkMode ? 'dark' : 'light';
  const levels = SUB_LEVELS[curriculum] || [];
  const subjects = SUBJECTS[subLevel] || [];
  const singlePrice = 'R120';
  const allPrice = 'R500';

  function handleCurriculum(id) {
    setCurriculum(id);
    setSubLevel('');
    setSelectedSubjects([]);
    setPlan('');
    if (id === 'university') {
      setStep(3);
    } else {
      setStep(2);
    }
  }

  function handleLevel(id) {
    setSubLevel(id);
    setSelectedSubjects([]);
    setPlan('');
    setStep(3);
  }

  function toggleSubject(id) {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  }

  function goToPricing() {
    if (selectedSubjects.length === 0) return;
    setStep(4);
  }

  function getAmount() {
    if (plan === 'all') return 500 * 100;
    return selectedSubjects.length * 120 * 100;
  }

  function handleSubscribe() {
    const amount = getAmount();
    const ref = 'ST_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: userEmail,
      amount,
      currency: 'ZAR',
      ref,
      callback(response) {
        const enrollment = {
          curriculum,
          subLevel: subLevel || null,
          subjects: selectedSubjects,
          plan,
          enrolledAt: new Date().toISOString(),
          paymentRef: response.reference,
        };
        localStorage.setItem('st-enrollment', JSON.stringify(enrollment));
        onComplete(enrollment);
      },
      onClose() {},
    });
    handler.openIframe();
  }

  function goBack() {
    if (step === 4) { setStep(3); setPlan(''); }
    else if (step === 3) {
      if (curriculum === 'university') { setStep(1); setCurriculum(''); }
      else { setStep(2); setSubLevel(''); setSelectedSubjects([]); }
    }
    else if (step === 2) { setStep(1); setCurriculum(''); }
  }

  return (
    <div className={`dash ${theme}`}>
      <video className="dash-bg-video" src="/assets/dash-bg.mp4" autoPlay loop muted playsInline onContextMenu={(e) => e.preventDefault()} />
      <header className="dash-header">
        <div className="dash-brand">Study Tracker</div>
        <div className="dash-header-right">
          <button className="dash-theme-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="dash-logout" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <div className="dash-body dash-subscribe">
        {step > 1 && (
          <button className="sub-back" onClick={goBack}>← Back</button>
        )}

        <div className="sub-progress">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`sub-progress-dot${step >= s ? ' active' : ''}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="sub-step">
            <h1 className="sub-title">Choose your curriculum</h1>
            <p className="sub-desc">What are you studying?</p>
            <div className="sub-options">
              {CURRICULA.map(c => (
                <button key={c.id} className="sub-option-card" onClick={() => handleCurriculum(c.id)}>
                  <div className="sub-option-label">{c.label}</div>
                  <div className="sub-option-desc">{c.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="sub-step">
            <h1 className="sub-title">Pick your level</h1>
            <p className="sub-desc">{CURRICULA.find(c => c.id === curriculum)?.label}</p>
            <div className="sub-options">
              {levels.map(l => (
                <button key={l.id} className="sub-option-card" onClick={() => handleLevel(l.id)}>
                  <div className="sub-option-label">{l.label}</div>
                  <div className="sub-option-desc">{l.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="sub-step">
            <h1 className="sub-title">Select your subjects</h1>
            <p className="sub-desc">
              {selectedSubjects.length} selected
            </p>
            <div className="sub-subject-grid">
              {subjects.map(s => (
                <button
                  key={s.id}
                  className={`sub-subject-btn${selectedSubjects.includes(s.id) ? ' active' : ''}`}
                  onClick={() => toggleSubject(s.id)}
                >
                  <span className="sub-subject-name">{s.name}</span>
                  {selectedSubjects.includes(s.id) && <span className="sub-subject-check">✓</span>}
                </button>
              ))}
            </div>
            {selectedSubjects.length > 0 && (
              <button className="sub-continue" onClick={goToPricing}>
                Continue with {selectedSubjects.length} subject{selectedSubjects.length > 1 ? 's' : ''}
              </button>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="sub-step">
            <h1 className="sub-title">Choose your plan</h1>
            <p className="sub-desc">
              {selectedSubjects.length} subject{selectedSubjects.length > 1 ? 's' : ''} selected
            </p>
            <div className="sub-pricing">
              <button
                className={`sub-price-card${plan === 'single' ? ' active' : ''}`}
                onClick={() => setPlan('single')}
              >
                <div className="sub-price-name">Per Subject</div>
                <div className="sub-price-amount">{singlePrice}</div>
                <div className="sub-price-detail">per subject</div>
                <div className="sub-price-total">
                  Total: R{selectedSubjects.length * 120}
                </div>
              </button>
              {curriculum === 'nsc' && (
                <button
                  className={`sub-price-card featured${plan === 'all' ? ' active' : ''}`}
                  onClick={() => setPlan('all')}
                >
                  <div className="sub-price-tag">Best value</div>
                  <div className="sub-price-name">All Subjects</div>
                  <div className="sub-price-amount">{allPrice}</div>
                  <div className="sub-price-detail">unlimited subjects</div>
                  <div className="sub-price-save">
                    Save R{Math.max(0, selectedSubjects.length * 120 - 500)}
                  </div>
                </button>
              )}
            </div>
            {plan && (
              <button className="sub-pay" onClick={handleSubscribe}>
                Subscribe — {plan === 'all' ? allPrice : `R${selectedSubjects.length * 120}`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard({ onLogout, userEmail }) {
  const [enrollment, setEnrollment] = useState(() => {
    const saved = localStorage.getItem('st-enrollment');
    return saved ? JSON.parse(saved) : null;
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('st-theme');
    if (saved) return saved === 'dark';
    return true;
  });

  useEffect(() => {
    localStorage.setItem('st-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  function handleEnroll(data) {
    setEnrollment(data);
  }

  function handleReset() {
    localStorage.removeItem('st-enrollment');
    setEnrollment(null);
  }

  if (!enrollment) {
    return <SubscribeFlow onComplete={handleEnroll} onLogout={onLogout} userEmail={userEmail} />;
  }

  const theme = darkMode ? 'dark' : 'light';
  const allSubjects = SUBJECTS[enrollment.subLevel] || [];
  const mySubjects = enrollment.plan === 'all'
    ? allSubjects
    : allSubjects.filter(s => enrollment.subjects.includes(s.id));

  return (
    <div className={`dash ${theme}`}>
      <video className="dash-bg-video" src="/assets/dash-bg.mp4" autoPlay loop muted playsInline onContextMenu={(e) => e.preventDefault()} />
      <header className="dash-header">
        <div className="dash-brand">Study Tracker</div>
        <div className="dash-header-right">
          <button className="dash-theme-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="dash-logout" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <div className="dash-body">
        <div className="dash-welcome">
          <h1 className="dash-title">Your Subjects</h1>
          <p className="dash-sub">
            <button className="dash-change" onClick={handleReset}>Change plan</button>
          </p>
        </div>

        <div className="dash-subject-grid">
          {mySubjects.map(s => (
            <button key={s.id} className="dash-subject-card" onClick={() => {}}>
              <span className="dash-subject-name">{s.name}</span>
              <span className="dash-subject-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
