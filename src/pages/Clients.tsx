import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  MapPin, 
  Mail, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Briefcase,
  Layers,
  Sparkles,
  ClipboardList
} from 'lucide-react';

export default function Clients() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Detect viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    yourName: '',
    designation: '',
    workEmail: '',
    phoneNumber: '',
    city: 'Hyderabad',
    headcount: '20 to 100',
    selectedRoles: [] as string[],
    monthlyVolume: '',
    attritionRate: '',
    biggestChallenge: '',
    vendorsFailed: '',
    howFoundUs: 'LinkedIn'
  });

  // Validation / Error states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const personalDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
    'live.com', 'aol.com', 'icloud.com', 'mail.com', 'protonmail.com'
  ];

  const validateField = (name: string, value: any) => {
    let error = '';
    
    if (name === 'workEmail') {
      if (!value) {
        error = 'Work Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Please enter a valid work email address.';
      } else {
        const domain = value.split('@')[1]?.toLowerCase();
        if (personalDomains.includes(domain)) {
          error = 'Please use your company email address.';
        }
      }
    } else if (name === 'phoneNumber') {
      if (!value) {
        error = 'Phone number is required.';
      } else if (!/^\+?[0-9\s-]{10,12}$/.test(value)) {
        error = 'Please enter a valid phone number.';
      }
    } else if (['companyName', 'yourName', 'designation', 'monthlyVolume', 'biggestChallenge', 'vendorsFailed'].includes(name)) {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        error = 'This field is required.';
      }
    } else if (name === 'selectedRoles') {
      if (!value || value.length === 0) {
        error = 'Please select at least one role.';
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, (formData as any)[name]);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const toggleRole = (role: string) => {
    const updated = formData.selectedRoles.includes(role)
      ? formData.selectedRoles.filter(r => r !== role)
      : [...formData.selectedRoles, role];
    handleInputChange('selectedRoles', updated);
  };

  const isFormValid = () => {
    const fieldsToValidate = [
      'companyName', 'yourName', 'designation', 'workEmail', 
      'phoneNumber', 'monthlyVolume', 'biggestChallenge', 'vendorsFailed'
    ];
    let valid = true;
    
    fieldsToValidate.forEach(field => {
      const err = validateField(field, (formData as any)[field]);
      if (err) valid = false;
    });

    const rolesErr = validateField('selectedRoles', formData.selectedRoles);
    if (rolesErr) valid = false;

    return valid;
  };

  // Mobile steps state
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 4;

  const handleNextStep = () => {
    // Validate fields in current step before moving forward
    let stepFields: string[] = [];
    if (activeStep === 1) stepFields = ['companyName', 'yourName', 'designation'];
    if (activeStep === 2) stepFields = ['workEmail', 'phoneNumber'];
    if (activeStep === 3) stepFields = ['selectedRoles', 'monthlyVolume'];
    
    let stepValid = true;
    stepFields.forEach(field => {
      setTouched(prev => ({ ...prev, [field]: true }));
      const err = validateField(field, (formData as any)[field]);
      if (err) stepValid = false;
    });

    if (stepValid) {
      setActiveStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate('/clients/submitted');
    } else {
      // Mark all fields touched
      const allFields = Object.keys(formData);
      const touchedObj = allFields.reduce((acc, f) => ({ ...acc, [f]: true }), {});
      setTouched(touchedObj);
      
      // On mobile, find the first step with an error and jump to it
      if (isMobile) {
        if (formData.companyName === '' || formData.yourName === '' || formData.designation === '') {
          setActiveStep(1);
        } else if (errors.workEmail || errors.phoneNumber || !formData.workEmail || !formData.phoneNumber) {
          setActiveStep(2);
        } else if (formData.selectedRoles.length === 0 || formData.monthlyVolume === '') {
          setActiveStep(3);
        } else {
          setActiveStep(4);
        }
      }
    }
  };

  const categories = [
    {
      title: "Telecalling and Telesales",
      roles: ["Tele-sales Executive", "Retention Caller", "Collections Agent", "Lead Qualifier", "Customer Acquisition Agent"],
      volume: "5 to 50 seats per quarter",
      color: "bg-indigo-50/50 text-indigo-500"
    },
    {
      title: "Inside Sales",
      roles: ["Sales Development Rep", "Business Development Executive", "Account Manager (entry level)", "Field Sales Coordinator"],
      volume: "3 to 30 seats per quarter",
      color: "bg-blue-50/50 text-[#2563eb]"
    },
    {
      title: "BPO and Customer Support",
      roles: ["Customer Support Associate", "Process Associate", "Voice and Non-Voice Agent", "Quality Associate"],
      volume: "10 to 100 seats per quarter",
      color: "bg-emerald-50/50 text-emerald-500"
    },
    {
      title: "Front Office and Admin",
      roles: ["Receptionist", "Front Desk Executive", "Guest Relations Executive", "Admin Associate", "Office Coordinator"],
      volume: "1 to 10 seats per quarter",
      color: "bg-amber-50/50 text-amber-500"
    },
    {
      title: "Hotel and Hospitality",
      roles: ["Front Desk Associate", "F&B Service Associate", "Housekeeping Supervisor", "Guest Service Agent", "Reservations Executive"],
      volume: "2 to 20 seats per quarter",
      color: "bg-rose-50/50 text-rose-500"
    },
    {
      title: "Entry Level IT Support",
      roles: ["L1 Support Associate", "IT Helpdesk Executive", "Technical Support Agent", "NOC Associate"],
      volume: "2 to 15 seats per quarter",
      color: "bg-blue-50/50 text-blue-500"
    }
  ];

  return (
    <div className="pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* SECTION 1: PAGE HERO */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-24 text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold text-[#2563eb] tracking-[0.2em] uppercase block mb-3">
          FOR HIRING TEAMS
        </span>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          We only work with companies that pay fair salaries and have real onboarding.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-slate-500 mb-8 leading-relaxed font-medium"
        >
          Jovese is selective on the client side for a deliberate reason. High attrition is often a sourcing failure. But sometimes it is an employer problem: below-market salaries, zero training, or a floor culture that kills morale in Week 2. We do not place candidates into broken environments. If your brief shows us those red flags, we will tell you directly before we start.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => {
              document.getElementById('audit-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all text-base"
          >
            Start Your Audit
          </button>
        </motion.div>
      </section>

      {/* SECTION 2: THE SCOPE */}
      <section className="py-16 border-t border-slate-100">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase block mb-3">
            WHAT WE COVER
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-slate-900">
            Six categories. One standard.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-950 font-display text-base mb-4 flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${cat.color}`}>
                    0{i+1}
                  </span>
                  {cat.title}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-500 font-semibold mb-6">
                  {cat.roles.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-slate-300">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-[11px] font-bold text-slate-400">
                <span>Typical quarterly volume:</span>
                <span className="text-slate-950">{cat.volume}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-slate-400 font-medium mt-8">
          Do not see your role above? Describe it in the audit form. If we can screen for it using our audio model, we will tell you.
        </p>
      </section>

      {/* SECTION 3: WHAT WE REQUIRE FROM YOU */}
      <section className="py-20 bg-slate-900 text-white rounded-[3.5rem] p-8 sm:p-16 mb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase block mb-3">
              THE STANDARD
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
              This is a two-way evaluation.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
              We review every audit form and reject a portion of applicants. Not to be difficult. Because certain employer conditions predict early attrition regardless of how well we screen. We do not want to place qualified candidates into situations where they will leave in 3 weeks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            
            {/* requirement 1 */}
            <div className="space-y-3">
              <div className="text-4xl font-black text-slate-700 font-display">01</div>
              <h4 className="font-bold text-white text-base">Market-rate compensation.</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                We benchmark your CTC against current market data for the role, city, and experience level. Salaries below the 40th percentile disqualify an application. If your offer is below market, fix that first. Qualified candidates have options.
              </p>
            </div>

            {/* requirement 2 */}
            <div className="space-y-3">
              <div className="text-4xl font-black text-slate-700 font-display">02</div>
              <h4 className="font-bold text-white text-base">A documented onboarding process.</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                It does not need to be elaborate. It needs to exist. At minimum: a defined first-week schedule, a clear reporting structure, and a training module for the role. Candidates placed into zero-structure environments exit in Week 2 regardless of their quality.
              </p>
            </div>

            {/* requirement 3 */}
            <div className="space-y-3">
              <div className="text-4xl font-black text-slate-700 font-display">03</div>
              <h4 className="font-bold text-white text-base">A single responsive point of contact.</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                Deployment coordination requires someone who can reply to joining-related questions within 4 hours. Not a shared inbox. One person with authority to confirm.
              </p>
            </div>

            {/* requirement 4 */}
            <div className="space-y-3">
              <div className="text-4xl font-black text-slate-700 font-display">04</div>
              <h4 className="font-bold text-white text-base">Commitment to the 30-day model.</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                This is not negotiable. The guarantee only works when both sides respect the structure. You cannot raise a billing dispute in the first 30 days.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: AUDIT FORM */}
      <section id="audit-form-section" className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-6 sm:p-14 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-white max-w-4xl mx-auto scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none" />
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase block mb-3">
            START YOUR AUDIT
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mb-2">
            Tell us where you are bleeding.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-md mx-auto">
            We will tell you if we can fix it. Fill in the parameters accurately to request a partnership review.
          </p>
        </div>

        {/* Progress bar on mobile */}
        {isMobile && (
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Step {activeStep} of {totalSteps}</span>
              <span>{Math.round((activeStep/totalSteps)*100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#2563eb] h-full transition-all duration-300" 
                style={{ width: `${(activeStep/totalSteps)*100}%` }}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: Company & Professional Info */}
          {(!isMobile || activeStep === 1) && (
            <div className="space-y-6">
              {isMobile && <h3 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wide">Company & Personal Info</h3>}
              
              {/* Field 1 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Company Name</label>
                <input 
                  type="text"
                  required
                  value={formData.companyName}
                  onBlur={() => handleBlur('companyName')}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Ex: Jovese Systems"
                  className={`w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                    touched.companyName && errors.companyName ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-[#2563eb] focus:border-[#2563eb]'
                  }`}
                />
                {touched.companyName && errors.companyName && (
                  <span className="text-[10px] sm:text-xs text-red-500 font-medium block mt-1">{errors.companyName}</span>
                )}
              </div>

              {/* Grid 2x1 */}
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Field 2 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Your Full Name</label>
                  <input 
                    type="text"
                    required
                    value={formData.yourName}
                    onBlur={() => handleBlur('yourName')}
                    onChange={(e) => handleInputChange('yourName', e.target.value)}
                    placeholder="Ex: Karan Sharma"
                    className={`w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                      touched.yourName && errors.yourName ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-[#2563eb] focus:border-[#2563eb]'
                    }`}
                  />
                  {touched.yourName && errors.yourName && (
                    <span className="text-[10px] sm:text-xs text-red-500 font-medium block mt-1">{errors.yourName}</span>
                  )}
                </div>

                {/* Field 3 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Your Designation</label>
                  <input 
                    type="text"
                    required
                    value={formData.designation}
                    onBlur={() => handleBlur('designation')}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    placeholder="Ex: VP of Human Resources"
                    className={`w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                      touched.designation && errors.designation ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-[#2563eb] focus:border-[#2563eb]'
                    }`}
                  />
                  {touched.designation && errors.designation && (
                    <span className="text-[10px] sm:text-xs text-red-500 font-medium block mt-1">{errors.designation}</span>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* STEP 2: Contact Options info */}
          {(!isMobile || activeStep === 2) && (
            <div className="space-y-6">
              {isMobile && <h3 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wide">Work Contact Details</h3>}

              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Field 4 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Work Email</label>
                  <input 
                    type="email"
                    required
                    value={formData.workEmail}
                    onBlur={() => handleBlur('workEmail')}
                    onChange={(e) => handleInputChange('workEmail', e.target.value)}
                    placeholder="Ex: karan@jovese.com"
                    className={`w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                      touched.workEmail && errors.workEmail ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-[#2563eb] focus:border-[#2563eb]'
                    }`}
                  />
                  {touched.workEmail && errors.workEmail && (
                    <span className="text-[10px] sm:text-xs text-red-500 font-semibold block mt-1">{errors.workEmail}</span>
                  )}
                </div>

                {/* Field 5 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Phone Number</label>
                  <input 
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onBlur={() => handleBlur('phoneNumber')}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Ex: 9876543210"
                    className={`w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                      touched.phoneNumber && errors.phoneNumber ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-[#2563eb] focus:border-[#2563eb]'
                    }`}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <span className="text-[10px] sm:text-xs text-red-500 font-semibold block mt-1">{errors.phoneNumber}</span>
                  )}
                </div>

              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Field 6 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">City of Primary Operations</label>
                  <select 
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb] text-slate-800"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Field 7 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Total Company Headcount</label>
                  <select 
                    value={formData.headcount}
                    onChange={(e) => handleInputChange('headcount', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb] text-slate-800"
                  >
                    <option value="Under 20">Under 20</option>
                    <option value="20 to 100">20 to 100</option>
                    <option value="100 to 500">100 to 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: Requirement variables */}
          {(!isMobile || activeStep === 3) && (
            <div className="space-y-6">
              {isMobile && <h3 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wide">Hiring Requirements</h3>}

              {/* Field 8 - Multi-select */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block mb-1">Roles you are currently hiring for</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Telecalling and Telesales",
                    "Inside Sales",
                    "BPO and Customer Support",
                    "Front Office and Admin",
                    "Hotel and Hospitality",
                    "Entry Level IT Support"
                  ].map((role) => {
                    const isChecked = formData.selectedRoles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => toggleRole(role)}
                        className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                          isChecked 
                            ? 'bg-[#2563eb]/10 border-[#2563eb] text-slate-900 ring-1 ring-[#2563eb]' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50'
                        }`}
                      >
                        <span>{role}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />}
                      </button>
                    );
                  })}
                </div>
                {touched.selectedRoles && errors.selectedRoles && (
                  <span className="text-[10px] sm:text-xs text-red-500 font-semibold block mt-1">{errors.selectedRoles}</span>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Field 9 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Combined monthly hiring volume for these roles
                  </label>
                  <input 
                    type="number"
                    inputMode="numeric"
                    required
                    value={formData.monthlyVolume}
                    onBlur={() => handleBlur('monthlyVolume')}
                    onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
                    placeholder="e.g. 15"
                    className={`w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                      touched.monthlyVolume && errors.monthlyVolume ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-[#2563eb] focus:border-[#2563eb]'
                    }`}
                  />
                  {touched.monthlyVolume && errors.monthlyVolume && (
                    <span className="text-[10px] sm:text-xs text-red-500 font-semibold block mt-1">{errors.monthlyVolume}</span>
                  )}
                </div>

                {/* Field 10 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Your current 30-day attrition rate if known
                  </label>
                  <input 
                    type="text"
                    value={formData.attritionRate}
                    onChange={(e) => handleInputChange('attritionRate', e.target.value)}
                    placeholder="e.g. 40% (Not sure is acceptable)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb]"
                  />
                </div>

              </div>
            </div>
          )}

          {/* STEP 4: Core textareas & source */}
          {(!isMobile || activeStep === 4) && (
            <div className="space-y-6">
              {isMobile && <h3 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wide">Operational Challenges</h3>}

              {/* Field 11 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 block">
                    Your single biggest challenge with frontline hiring
                  </label>
                  <span className="text-[10px] font-bold text-slate-400">
                    {formData.biggestChallenge.length}/300
                  </span>
                </div>
                <textarea 
                  required
                  maxLength={300}
                  rows={3}
                  value={formData.biggestChallenge}
                  onBlur={() => handleBlur('biggestChallenge')}
                  onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
                  placeholder="What is your headcount bottleneck?"
                  className={`w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 resize-none ${
                    touched.biggestChallenge && errors.biggestChallenge ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-[#2563eb] focus:border-[#2563eb]'
                  }`}
                />
                {touched.biggestChallenge && errors.biggestChallenge && (
                  <span className="text-[10px] sm:text-xs text-red-500 font-semibold block mt-1">{errors.biggestChallenge}</span>
                )}
              </div>

              {/* Field 12 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 block">
                    Primary reason existing vendors or processes have failed
                  </label>
                  <span className="text-[10px] font-bold text-slate-400">
                    {formData.vendorsFailed.length}/300
                  </span>
                </div>
                <textarea 
                  required
                  maxLength={300}
                  rows={3}
                  value={formData.vendorsFailed}
                  onBlur={() => handleBlur('vendorsFailed')}
                  onChange={(e) => handleInputChange('vendorsFailed', e.target.value)}
                  placeholder="Why did current sourcing procedures break down?"
                  className={`w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 resize-none ${
                    touched.vendorsFailed && errors.vendorsFailed ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-[#2563eb] focus:border-[#2563eb]'
                  }`}
                />
                {touched.vendorsFailed && errors.vendorsFailed && (
                  <span className="text-[10px] sm:text-xs text-red-500 font-semibold block mt-1">{errors.vendorsFailed}</span>
                )}
              </div>

              {/* Field 13 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">How did you find Jovese</label>
                <select 
                  value={formData.howFoundUs}
                  onChange={(e) => handleInputChange('howFoundUs', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb] text-slate-800"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Referral from another company">Referral from another company</option>
                  <option value="Direct approach from Jovese team">Direct approach from Jovese team</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>
          )}

          {/* Form Action Controls */}
          <div className="pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
            {isMobile ? (
              <>
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {activeStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_14px_rgba(255,90,54,0.3)]"
                  >
                    Submit Audit
                  </button>
                )}
              </>
            ) : (
              <button
                type="submit"
                className="w-full relative overflow-hidden py-4 bg-slate-900 border border-slate-800 text-white font-bold text-sm sm:text-base rounded-2xl transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-0.5 group"
              >
                <span className="relative z-10">Submit Audit and Request Partnership Review</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            )}
          </div>

          {/* Verification Disclaimer */}
          <div className="pt-4 text-center">
            <p className="text-[10px] text-slate-400 font-semibold mb-2">
              We do not use your details for marketing sequences. You will receive one message from our team if your application is selected for review. That is it.
            </p>
            <p className="text-[10px] text-slate-400 font-semibold">
              Applications submitted before Friday 6pm are reviewed the following Monday. You will hear from us within 48 hours of the Monday review if there is a fit.
            </p>
          </div>

        </form>

      </section>

    </div>
  );
}
