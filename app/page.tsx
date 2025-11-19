"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MalnutritionTreatmentCenter() {
  const [activeTab, setActiveTab] = useState("feeding");
  
  // Feed Planner State
  const [feedPlannerOpen, setFeedPlannerOpen] = useState(false);
  const [feedType, setFeedType] = useState("F100");
  const [childWeight, setChildWeight] = useState("");
  const [feedResults, setFeedResults] = useState<{
    minFeed: number;
    maxFeed: number;
    minDaily: number;
    maxDaily: number;
  } | null>(null);
  
  // Z-Score Calculator State
  const [zScoreOpen, setZScoreOpen] = useState(false);
  const [zScoreInput, setZScoreInput] = useState({
    gender: "",
    height: "",
    weight: ""
  });
  const [zScoreResult, setZScoreResult] = useState<string | null>(null);
  
  // Micronutrient Planner State
  const [micronutrientOpen, setMicronutrientOpen] = useState(false);
  const [micronutrientWeight, setMicronutrientWeight] = useState("");
  const [micronutrientResults, setMicronutrientResults] = useState<{
    folicAcidDay1: string;
    folicAcidDay2: string;
    zinc: string;
    ifa: string;
    magnesiumDay1: string;
    magnesiumDay2: string;
    potassium: string;
  } | null>(null);
  
  // Weight Gain Calculator State
  const [weightGainOpen, setWeightGainOpen] = useState(false);
  const [weightGainInput, setWeightGainInput] = useState({
    dischargeWeight: "",
    minimumWeight: "",
    numberOfDays: ""
  });
  const [weightGainResult, setWeightGainResult] = useState<string | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    subject: "",
    name: "",
    email: "",
    queryType: "",
    message: "",
    organization: "",
    contactNo: ""
  });
  const [captchaCode, setCaptchaCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // Generate random CAPTCHA code
  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  // Refresh CAPTCHA - wrapped in useCallback to fix the useEffect dependency warning
  const handleRefreshCaptcha = useCallback(() => {
    setCaptchaCode(generateCaptcha());
    setCaptcha("");
  }, []);

  // Generate CAPTCHA on component mount
  useEffect(() => {
    handleRefreshCaptcha();
  }, [handleRefreshCaptcha]);

  // Calculate Feed Planner Results
  const calculateFeedPlanner = () => {
    if (!childWeight) return;
    
    const weight = parseFloat(childWeight);
    const minFeed = Math.round(weight * 25);
    const maxFeed = Math.round(weight * 36.5);
    const minDaily = Math.round(weight * 150);
    const maxDaily = Math.round(weight * 220);
    
    setFeedResults({
      minFeed,
      maxFeed,
      minDaily,
      maxDaily
    });
  };

  // Calculate Z-Score
  const calculateZScore = () => {
    if (!zScoreInput.gender || !zScoreInput.height || !zScoreInput.weight) return;
    
    // Simplified calculation for demonstration
    const height = parseFloat(zScoreInput.height);
    const weight = parseFloat(zScoreInput.weight);
    const bmi = weight / ((height / 100) ** 2);
    
    let zScore = 0;
    if (zScoreInput.gender === "male") {
      zScore = (bmi - 15.5) / 1.5;
    } else {
      zScore = (bmi - 15) / 1.5;
    }
    
    setZScoreResult(zScore.toFixed(2));
  };

  // Calculate Micronutrient Plan
  const calculateMicronutrient = () => {
    if (!micronutrientWeight) return;
    
    const weight = parseFloat(micronutrientWeight);
    
    setMicronutrientResults({
      folicAcidDay1: "5",
      folicAcidDay2: "1",
      zinc: "1",
      ifa: (weight * 0.5).toFixed(1),
      magnesiumDay1: (weight * 0.3).toFixed(1),
      magnesiumDay2: (weight * 0.2).toFixed(1),
      potassium: (weight * 0.3).toFixed(1)
    });
  };

  // Calculate Weight Gain
  const calculateWeightGain = () => {
    if (!weightGainInput.dischargeWeight || !weightGainInput.minimumWeight || !weightGainInput.numberOfDays) return;
    
    const dischargeWeight = parseFloat(weightGainInput.dischargeWeight);
    const minimumWeight = parseFloat(weightGainInput.minimumWeight);
    const numberOfDays = parseFloat(weightGainInput.numberOfDays);
    
    const weightGain = ((dischargeWeight - minimumWeight) / minimumWeight / numberOfDays) * 1000;
    
    setWeightGainResult(weightGain.toFixed(3));
  };

  // Handle contact form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate CAPTCHA
    if (captcha.trim() !== captchaCode) {
      setSubmitMessage("Invalid CAPTCHA. Please try again.");
      handleRefreshCaptcha();
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      // Here you would normally send the form data to your backend
      // For demonstration, we'll just simulate a successful submission
      setTimeout(() => {
        setSubmitMessage("Thank you for your message! We'll get back to you soon.");
        setContactForm({
          subject: "",
          name: "",
          email: "",
          queryType: "",
          message: "",
          organization: "",
          contactNo: ""
        });
        handleRefreshCaptcha();
        setIsSubmitting(false);
      }, 1000);
    } catch {
      // Removed unused error parameter
      setSubmitMessage("An error occurred. Please try again later.");
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ACC1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* ====== HERO SECTION ====== */}
      <section id="home" className="relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-teal-600 via-cyan-600 to-blue-700"></div>
        <div className="absolute inset-0">
          <Image
            src="/b1.jpg"
            alt="Malnutrition Treatment Center background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="bg-white/30 rounded-full w-2 h-2 mr-2"></span>
                <span className="text-sm font-medium">National Health Mission Initiative</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Malnutrition Treatment Center
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg">
                A Statewide Initiative dedicated to managing and improving the health of children suffering from Severe Acute Malnutrition (SAM) in Jharkhand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#about"
                  className="bg-white text-teal-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
                >
                  Learn More
                </Link>
                <Link
                  href="#statistics"
                  className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-teal-700 transition transform hover:scale-105"
                >
                  View Statistics
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-linear-to-r from-teal-400 to-cyan-400 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white rounded-3xl p-2 shadow-2xl">
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    <Image
                      src="/b4.jpg"
                      alt="Child health care at MTC"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== STATISTICS SECTION ====== */}
      <section id="statistics" className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Child Nutrition Statistics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Understanding the current state of child nutrition in Jharkhand</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex flex-wrap justify-center mb-8">
              <button
                className={`px-6 py-3 m-2 rounded-full font-medium transition-all ${
                  activeTab === "feeding" 
                    ? "bg-linear-to-r from-teal-500 to-cyan-600 text-white shadow-lg transform scale-105" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("feeding")}
              >
                Infant & Young Child Feeding
              </button>
              <button
                className={`px-6 py-3 m-2 rounded-full font-medium transition-all ${
                  activeTab === "undernutrition" 
                    ? "bg-linear-to-r from-teal-500 to-cyan-600 text-white shadow-lg transform scale-105" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("undernutrition")}
              >
                Undernutrition Prevalence
              </button>
            </div>
            
            {activeTab === "feeding" && (
              <div>
                <p className="text-center text-gray-600 mb-8">Source: NFHS 5 (2019-21)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Breastfed within 1 hour of birth", value: "22%", color: "teal" },
                    { label: "Exclusive breastfed", value: "76%", color: "cyan" },
                    { label: "Timely introduction of complementary feeding", value: "39%", color: "blue" },
                    { label: "Children receiving adequate diet", value: "11%", color: "indigo" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700 font-medium">{stat.label}</span>
                        <span className={`text-3xl font-bold bg-linear-to-br from-${stat.color}-500 to-${stat.color}-600 bg-clip-text text-transparent`}>
                          {stat.value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full bg-linear-to-br from-${stat.color}-500 to-${stat.color}-600 transition-all duration-1000 ease-out`}
                          style={{width: stat.value}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "undernutrition" && (
              <div>
                <p className="text-center text-gray-600 mb-8">Source: NFHS 5 (2019-21)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Wasting (weight-for-length/height)", value: "22%", color: "orange" },
                    { label: "Severe wasting (weight-for-length/height)", value: "9%", color: "red" },
                    { label: "Stunting (length/height-for-age)", value: "40%", color: "yellow" },
                    { label: "Underweight (weight-for-age)", value: "39%", color: "amber" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700 font-medium">{stat.label}</span>
                        <span className={`text-3xl font-bold text-${stat.color}-600`}>
                          {stat.value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full bg-${stat.color}-500 transition-all duration-1000 ease-out`}
                          style={{width: stat.value}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== TOOLS SECTION ====== */}
      <section id="resources" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tools & Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Interactive tools to support child nutrition management</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Feed Planner */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Feed Planner</h3>
              <p className="text-gray-600 mb-4">
                Calculate feeding volumes for children with SAM
              </p>
              <button 
                className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg hover:shadow-lg transition"
                onClick={() => setFeedPlannerOpen(true)}
              >
                Open Tool
              </button>
            </div>
            
            {/* Z-Score Calculator */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Z-Score Calculator</h3>
              <p className="text-gray-600 mb-4">
                Calculate Z-Score for nutritional assessment
              </p>
              <button 
                className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg hover:shadow-lg transition"
                onClick={() => setZScoreOpen(true)}
              >
                Open Tool
              </button>
            </div>
            
            {/* Micronutrient Planner */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Micronutrient Planner</h3>
              <p className="text-gray-600 mb-4">
                Calculate micronutrient dosage for SAM children
              </p>
              <button 
                className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg hover:shadow-lg transition"
                onClick={() => setMicronutrientOpen(true)}
              >
                Open Tool
              </button>
            </div>
            
            {/* Weight Gain Calculator */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Weight Gain</h3>
              <p className="text-gray-600 mb-4">
                Calculate weight gain in gm/kg/day
              </p>
              <button 
                className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg hover:shadow-lg transition"
                onClick={() => setWeightGainOpen(true)}
              >
                Open Tool
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BACKGROUND INFO ====== */}
      <section id="about" className="py-16 bg-linear-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Background</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Malnutrition is a serious public health problem in Jharkhand. As per MoHFW CNNS 2016-17, 
                6.7% of children under the age of 5 years are <strong>Severe Acute Malnourished (SAM)</strong>. 
                SAM is an important preventable and treatable cause of morbidity and mortality in children below five years.
              </p>
              <p className="text-gray-700 leading-relaxed">
                To address the huge case load of children with SAM, National Health Mission (NHM), Department of Health and Family Welfare, 
                Government of Jharkhand has established a network of <strong>Malnutrition Treatment Centres (MTCs)</strong> at Community Health Centres (CHCs) 
                and District Hospitals to manage SAM cases. Government of India has sanctioned <strong>103 MTCs</strong> for the State of Jharkhand, 
                out of which <strong>96 MTCs are currently functional</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MISSION DIRECTOR MESSAGE ====== */}
      <section id="message-director" className="py-16 bg-linear-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Message from Mission Director</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Government of Jharkhand is committed to improve the nutrition status of all children and put extra focus on treatment of most vulnerable children with Severe Acute Malnutrition (SAM) through a wide network of 96 Malnutrition Treatment Centers (MTC).
                </p>
                <p>
                  I am happy to share the revised online Malnutrition Treatment Center Management Information System (MTC-MIS) which is an extremely helpful management tool that will go a long way towards monitoring and alleviating the malnutrition in children.
                </p>
                <p>
                  The latest revised version not only allows Real Time Data entry and management but also simultaneously enables MTC Staff to register children, update and keep a track of their daily weight as well as intake of micronutrients and antibiotics with discharge summary thereby providing a holistic and comprehensive track of all important indicators and quality of care and coverage.
                </p>
                <p>
                  I am confident and certain that the present dashboard of MTC in this website would enhance the technical and management expertise for treatment of Children with Severe Acute Malnutrition. I thank UNICEF, State Center of Excellence – SAM at RIMS in supporting this important initiative.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-800 font-medium">Dr. [Name]</p>
                <p className="text-gray-600">Mission Director, National Health Mission, Jharkhand</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DISTRICTS SECTION ====== */}
      <section className="py-16 bg-linear-to-br from-teal-600 to-cyan-600">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Districts with Functional MTCs</h2>
            <p className="text-white/80 max-w-2xl mx-auto">96 functional centers across 24 districts</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka",
              "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh",
              "Jamtara", "Khunti", "Kodarma", "Latehar", "Lohardaga",
              "Pakur", "Palamu", "Pashchimi Singhbhum", "Purbi Singhbhum",
              "Ramgarh", "Ranchi", "Sahibganj", "Saraikela-Kharsawan", "Simdega"
            ].map((district) => (
              <div
                key={district}
                className="bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl py-3 px-4 text-center hover:bg-white/30 transition-all transform hover:scale-105"
              >
                {district}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== GALLERY ====== */}
      <section id="gallery" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Visual journey of our MTC centers and impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-64">
                  <Image
                    src={`/b${item}.jpg`}
                    alt={`MTC Image ${item}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-br  from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section id="contact-us" className="py-16 bg-linear-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600">We&apos;re here to help and answer any questions you may have</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">MTC Help Desk Jharkhand</h3>
                  <p className="text-gray-600 mb-4">
                    Queries related to website/dashboard, please reach us at:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-linear-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <p className="text-gray-600">mtchelpdeskjhk@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-linear-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Mobile</p>
                        <p className="text-gray-600">7419808558</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Submit Your Query/Messages</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">Subject *</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">Your Name *</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">Your Email *</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">Query Type *</label>
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={contactForm.queryType}
                        onChange={(e) => setContactForm({...contactForm, queryType: e.target.value})}
                        required
                      >
                        <option value="">Select</option>
                        <option value="general">General Query</option>
                        <option value="technical">Technical Issue</option>
                        <option value="feedback">Feedback</option>
                        <option value="complaint">Complaint</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">Message</label>
                      <textarea 
                        rows={4} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">Organization *</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={contactForm.organization}
                        onChange={(e) => setContactForm({...contactForm, organization: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">Contact No *</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={contactForm.contactNo}
                        onChange={(e) => setContactForm({...contactForm, contactNo: e.target.value})}
                        required
                      />
                    </div>
                    
                    {/* Custom CAPTCHA */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-gray-700 mb-2 font-medium">Captcha Image</label>
                      <div className="flex items-center gap-3">
                        <div className="bg-white px-4 py-2 rounded border border-gray-300 select-none">
                          <span className="text-xl font-mono font-bold text-gray-800 tracking-wider">
                            {captchaCode}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRefreshCaptcha}
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          title="Refresh CAPTCHA"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                        </button>
                        <input
                          type="text"
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          value={captcha}
                          onChange={(e) => setCaptcha(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {submitMessage && (
                      <div className={`p-3 rounded-lg text-sm ${
                        submitMessage.includes("Thank you") 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {submitMessage}
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feed Planner Modal */}
      {feedPlannerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Feed Planner</h3>
              <button 
                onClick={() => setFeedPlannerOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Feed Type</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={feedType}
                onChange={(e) => setFeedType(e.target.value)}
              >
                <option value="F100">F100</option>
                <option value="F75">F75</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Child Weight (kg)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={childWeight}
                onChange={(e) => setChildWeight(e.target.value)}
                placeholder="Enter weight"
              />
            </div>
            
            <button 
              className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg hover:shadow-lg transition font-medium mb-4"
              onClick={calculateFeedPlanner}
            >
              Calculate
            </button>
            
            {feedResults && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Results:</h4>
                <p className="text-gray-600">Min Feed: {feedResults.minFeed} ml</p>
                <p className="text-gray-600">Max Feed: {feedResults.maxFeed} ml</p>
                <p className="text-gray-600">Min Daily: {feedResults.minDaily} ml</p>
                <p className="text-gray-600">Max Daily: {feedResults.maxDaily} ml</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Z-Score Calculator Modal */}
      {zScoreOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Z-Score Calculator</h3>
              <button 
                onClick={() => setZScoreOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Gender</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={zScoreInput.gender}
                onChange={(e) => setZScoreInput({...zScoreInput, gender: e.target.value})}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Height (cm)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={zScoreInput.height}
                onChange={(e) => setZScoreInput({...zScoreInput, height: e.target.value})}
                placeholder="Enter height"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Weight (kg)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={zScoreInput.weight}
                onChange={(e) => setZScoreInput({...zScoreInput, weight: e.target.value})}
                placeholder="Enter weight"
              />
            </div>
            
            <button 
              className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg hover:shadow-lg transition font-medium mb-4"
              onClick={calculateZScore}
            >
              Calculate
            </button>
            
            {zScoreResult && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Result:</h4>
                <p className="text-gray-600">Z-Score: {zScoreResult}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Micronutrient Planner Modal */}
      {micronutrientOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Micronutrient Planner</h3>
              <button 
                onClick={() => setMicronutrientOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Child Weight (kg)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={micronutrientWeight}
                onChange={(e) => setMicronutrientWeight(e.target.value)}
                placeholder="Enter weight"
              />
            </div>
            
            <button 
              className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg hover:shadow-lg transition font-medium mb-4"
              onClick={calculateMicronutrient}
            >
              Calculate
            </button>
            
            {micronutrientResults && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Results:</h4>
                <p className="text-gray-600">Folic Acid (Day 1): {micronutrientResults.folicAcidDay1} mg</p>
                <p className="text-gray-600">Folic Acid (Day 2): {micronutrientResults.folicAcidDay2} mg</p>
                <p className="text-gray-600">Zinc: {micronutrientResults.zinc} mg</p>
                <p className="text-gray-600">IFA: {micronutrientResults.ifa} mg</p>
                <p className="text-gray-600">Magnesium (Day 1): {micronutrientResults.magnesiumDay1} mg</p>
                <p className="text-gray-600">Magnesium (Day 2): {micronutrientResults.magnesiumDay2} mg</p>
                <p className="text-gray-600">Potassium: {micronutrientResults.potassium} mg</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Weight Gain Calculator Modal */}
      {weightGainOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Weight Gain Calculator</h3>
              <button 
                onClick={() => setWeightGainOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Discharge Weight (kg)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={weightGainInput.dischargeWeight}
                onChange={(e) => setWeightGainInput({...weightGainInput, dischargeWeight: e.target.value})}
                placeholder="Enter discharge weight"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Minimum Weight (kg)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={weightGainInput.minimumWeight}
                onChange={(e) => setWeightGainInput({...weightGainInput, minimumWeight: e.target.value})}
                placeholder="Enter minimum weight"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Number of Days</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={weightGainInput.numberOfDays}
                onChange={(e) => setWeightGainInput({...weightGainInput, numberOfDays: e.target.value})}
                placeholder="Enter number of days"
              />
            </div>
            
            <button 
              className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-lg hover:shadow-lg transition font-medium mb-4"
              onClick={calculateWeightGain}
            >
              Calculate
            </button>
            
            {weightGainResult && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Result:</h4>
                <p className="text-gray-600">Weight Gain: {weightGainResult} gm/kg/day</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}