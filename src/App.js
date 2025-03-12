import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell
} from 'recharts';

const FirstGensImplementationSimulator = () => {
  // Tab state for navigation
  const [activeTab, setActiveTab] = useState('simulator');
  const [activeCaseStudy, setActiveCaseStudy] = useState('coursera');
  
  // Base parameters with default values
  const [hourlyRate, setHourlyRate] = useState(50);
  const [implementationHours, setImplementationHours] = useState(215);
  const [circleSubscription, setCircleSubscription] = useState(1866);
  const [contingencyRate, setContingencyRate] = useState(0.15);
  const [customDevCost, setCustomDevCost] = useState(43300);
  const [traditionalCostPerStudent, setTraditionalCostPerStudent] = useState(500);
  
  // Preset scenarios
  const [activePreset, setActivePreset] = useState("recommended");
  const presets = {
    recommended: {
      name: "Recommended Approach",
      description: "The optimal balance of quality and cost-effectiveness based on SFIA framework analysis",
      hourlyRate: 50,
      implementationHours: 215,
      circleSubscription: 1866,
      contingencyRate: 0.15
    },
    minimumViable: {
      name: "Minimum Viable Solution",
      description: "A streamlined approach focused on core features with reduced scope and contingency",
      hourlyRate: 40,
      implementationHours: 180,
      circleSubscription: 1866,
      contingencyRate: 0.1
    },
    phased: {
      name: "Phased Implementation",
      description: "Alaya's suggested approach with reduced initial investment focused on core MVP features",
      hourlyRate: 55,
      implementationHours: 80,
      circleSubscription: 2800,
      contingencyRate: 0.15
    },
    enhancedImplementation: {
      name: "Enhanced Implementation",
      description: "An extended implementation with additional features and higher quality assurance",
      hourlyRate: 60,
      implementationHours: 250,
      circleSubscription: 1866,
      contingencyRate: 0.2
    },
    marketRate: {
      name: "Standard Market Rate",
      description: "Implementation at standard commercial market rates without special considerations",
      hourlyRate: 70,
      implementationHours: 215,
      circleSubscription: 1866,
      contingencyRate: 0.15
    },
    enterpriseCircle: {
      name: "Enterprise Circle.so Plan",
      description: "Using Circle.so's standard enterprise pricing without non-profit discount",
      hourlyRate: 50,
      implementationHours: 215,
      circleSubscription: 4680,
      contingencyRate: 0.15
    }
  };
  
  // Historical case studies of digital scale economics
  const caseStudies = {
    coursera: {
      name: "Coursera",
      category: "Education",
      foundedYear: 2012,
      description: "Coursera demonstrated extraordinary scale economics in education, achieving 1,783 times greater student-to-staff efficiency than traditional universities. With just 779 staff serving 82 million students by 2021, Coursera achieved 105,000 students per employee compared to traditional universities' 59 students per employee.",
      traditionalComparison: "Traditional Universities",
      traditionalStaffRatio: 59,
      digitalStaffRatio: 105263,
      efficiencyMultiplier: 1783,
      impact: "This transformational efficiency enabled Coursera to deliver university-quality education at a fraction of traditional costs, democratising access to learning globally."
    },
    craigslist: {
      name: "Craigslist",
      category: "Classifieds",
      foundedYear: 1995,
      description: "Craigslist revolutionised the classifieds industry through digital scale. At its peak, it generated approximately £761 million in annual revenue with just 50 employees - achieving 100 times the revenue per employee compared to traditional newspaper classifieds which required thousands of staff.",
      traditionalComparison: "Newspaper Classifieds",
      traditionalStaffRatio: 200000,
      digitalStaffRatio: 20000000,
      efficiencyMultiplier: 100,
      impact: "This efficiency demolished the newspaper classifieds industry, demonstrating how digital platforms can deliver greater service with dramatically fewer resources."
    },
    whatsapp: {
      name: "WhatsApp",
      category: "Communications",
      foundedYear: 2009,
      description: "WhatsApp achieved perhaps the most dramatic example of digital scale efficiency in communications. Prior to its Facebook acquisition, the platform served 450 million users with just 55 employees - an astonishing 8.18 million users per staff member, compared to traditional telecoms' 14,000 users per employee.",
      traditionalComparison: "Telecom SMS Services",
      traditionalStaffRatio: 14000,
      digitalStaffRatio: 8181818,
      efficiencyMultiplier: 584,
      impact: "This 584-fold efficiency advantage enabled WhatsApp to deliver messaging services at essentially zero marginal cost, fundamentally changing global communications economics."
    },
    netflix: {
      name: "Netflix",
      category: "Entertainment",
      foundedYear: 1997,
      description: "Netflix transformed video entertainment through digital scale economics. With 11,300 employees serving 214 million subscribers in 2021, Netflix achieved nearly 19,000 subscribers per employee - 15.6 times more efficient than traditional cable television providers.",
      traditionalComparison: "Cable TV Providers",
      traditionalStaffRatio: 1212,
      digitalStaffRatio: 18938,
      efficiencyMultiplier: 15.6,
      impact: "This structural advantage enabled Netflix to deliver dramatically more content at lower prices while maintaining superior profitability and global reach."
    }
  };
  
  // Comprehensive platform comparison data
  const platformComparison = [
    {
      name: "Circle.so",
      category: "Community Platform",
      threeYearTCO: 34186,
      implementationWeeks: 5,
      costPer500k: 0.07,
      featureScore: 9,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: true,
      eventNotifications: true,
      liveEvents: true,
      personalizedContent: true,
      analytics: true,
      sso: true,
      scalability: "High",
      notes: "Circle.so is purpose-built for community engagement with all features Alaya requires already included."
    },
    {
      name: "Mighty Networks",
      category: "Community Platform",
      threeYearTCO: 29700,
      implementationWeeks: 5,
      costPer500k: 0.06,
      featureScore: 3,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: true,
      sso: true,
      scalability: "High",
      notes: "Mighty Networks has strong personal branding but lacks mentorship directory and live event capabilities."
    },
    {
      name: "Tribe",
      category: "Community Platform",
      threeYearTCO: 30620,
      implementationWeeks: 6,
      costPer500k: 0.06,
      featureScore: 2,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: true,
      sso: false,
      scalability: "Medium",
      notes: "Tribe primarily serves B2B customer communities, lacking education-specific features."
    },
    {
      name: "Heartbeat",
      category: "Community Platform",
      threeYearTCO: 31332,
      implementationWeeks: 6,
      costPer500k: 0.06,
      featureScore: 1,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: false,
      mentorDirectory: false,
      eventNotifications: false,
      liveEvents: false,
      personalizedContent: false,
      analytics: true,
      sso: false,
      scalability: "Medium",
      notes: "Heartbeat focuses on simple content sharing without sophisticated relationship mapping."
    },
    {
      name: "Hivebrite",
      category: "Community Platform",
      threeYearTCO: 41716,
      implementationWeeks: 5,
      costPer500k: 0.08,
      featureScore: 7,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: true,
      eventNotifications: true,
      liveEvents: true,
      personalizedContent: false,
      analytics: true,
      sso: true,
      scalability: "High",
      notes: "Hivebrite offers strong mentoring capabilities but at a higher cost."
    },
    {
      name: "OpenSocial",
      category: "Open Source",
      threeYearTCO: 54600,
      implementationWeeks: 8,
      costPer500k: 0.11,
      featureScore: 3,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: false,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: true,
      sso: true,
      scalability: "Medium",
      notes: "OpenSocial requires significant technical expertise and customisation."
    },
    {
      name: "Discourse",
      category: "Forum Platform",
      threeYearTCO: 63336,
      implementationWeeks: 11,
      costPer500k: 0.13,
      featureScore: 2,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: false,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: true,
      sso: true,
      scalability: "High",
      notes: "Discourse focuses on forum discussions rather than mentorship functions."
    },
    {
      name: "Mastodon",
      category: "Social Network",
      threeYearTCO: 71250,
      implementationWeeks: 13,
      costPer500k: 0.14,
      featureScore: 3,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: false,
      sso: false,
      scalability: "Medium",
      notes: "Mastodon's decentralised architecture is optimised for social media, not educational communities."
    },
    {
      name: "Lemmy",
      category: "Social Network",
      threeYearTCO: 75000,
      implementationWeeks: 15,
      costPer500k: 0.15,
      featureScore: 2,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: false,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: false,
      sso: false,
      scalability: "Medium",
      notes: "Lemmy's discussion-focused design lacks educational community features."
    },
    {
      name: "Moodle",
      category: "LMS",
      threeYearTCO: 85222,
      implementationWeeks: 22,
      costPer500k: 0.17,
      featureScore: 7,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: true,
      analytics: true,
      sso: true,
      scalability: "High",
      notes: "Moodle is designed for structured course delivery, not community building or mentorship."
    },
    {
      name: "Canvas",
      category: "LMS",
      threeYearTCO: 56694,
      implementationWeeks: 9,
      costPer500k: 0.11,
      featureScore: 8,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: true,
      personalizedContent: true,
      analytics: true,
      sso: true,
      scalability: "High",
      notes: "Canvas excels at course delivery but lacks the mentor directory critical to FirstGens' mission."
    },
    {
      name: "Odoo",
      category: "ERP/CRM",
      threeYearTCO: 116400,
      implementationWeeks: 38,
      costPer500k: 0.23,
      featureScore: 6,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: true,
      sso: true,
      scalability: "Very High",
      notes: "Odoo would require extensive customisation to serve as an educational platform with high complexity."
    },
    {
      name: "Thinkific",
      category: "Course Platform",
      threeYearTCO: 27080,
      implementationWeeks: 4,
      costPer500k: 0.05,
      featureScore: 5,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: false,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: true,
      sso: true,
      scalability: "Medium",
      notes: "Thinkific focuses on course delivery rather than community building or mentorship."
    },
    {
      name: "Skool",
      category: "Community Platform",
      threeYearTCO: 31500,
      implementationWeeks: 5,
      costPer500k: 0.06,
      featureScore: 4,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: false,
      mentorDirectory: false,
      eventNotifications: true,
      liveEvents: false,
      personalizedContent: false,
      analytics: true,
      sso: true,
      scalability: "Medium",
      notes: "Skool is a newer platform with good design but lacks mobile apps and mentorship capabilities."
    },
    {
      name: "Custom Development",
      category: "Bespoke Solution",
      threeYearTCO: 184800,
      implementationWeeks: 60,
      costPer500k: 0.37,
      featureScore: 9,
      totalFeatures: 9,
      fullBranding: true,
      mobileApps: true,
      mentorDirectory: true,
      eventNotifications: true,
      liveEvents: true,
      personalizedContent: true,
      analytics: true,
      sso: true,
      scalability: "Very High",
      notes: "Custom development provides complete control but at substantially higher cost and timeframe."
    }
  ];
  
  // Phased implementation approach details
  const phasedImplementation = [
    {
      phase: "Phase 1: Core MVP",
      timeframe: "March-June 2025",
      description: "Focus on implementing the Circle Enterprise tier with customisations to meet essential requirements",
      features: [
        "Fully branded community portal with responsive design for mobile browsers",
        "Basic mentor directory with filtering functionality",
        "Event management and notification system",
        "Integration with Microsoft Teams for live events",
        "Initial analytics dashboard"
      ],
      cost: 7200,
      breakdown: [
        "Circle Enterprise (nonprofit rate): £2,800/year",
        "Custom development (80 hours): £4,400"
      ]
    },
    {
      phase: "Phase 2: Enhanced Features",
      timeframe: "July-September 2025",
      description: "Once the core platform is established and gaining traction",
      features: [
        "Progressive Web App implementation (installable on devices without app store)",
        "Enhanced AI-driven content personalisation",
        "Advanced analytics and reporting",
        "Expanded directory capabilities"
      ],
      cost: 4200
    },
    {
      phase: "Phase 3: Native Mobile Experience",
      timeframe: "October-December 2025",
      description: "Only if user adoption metrics justify the investment",
      features: [
        "Native iOS and Android apps using Circle's Plus Branded App tier",
        "Enhanced offline functionality",
        "In-app purchases for premium content (potential revenue stream)"
      ],
      cost: 8600
    }
  ];
  
  // Glossary terms
  const glossaryTerms = [
    { term: "TCO (Total Cost of Ownership)", definition: "The complete three-year cost including implementation, subscriptions, hosting, and ongoing support/staffing." },
    { term: "LMS (Learning Management System)", definition: "Software applications for the administration, documentation, tracking, reporting, automation, and delivery of educational courses or training programmes." },
    { term: "ERP (Enterprise Resource Planning)", definition: "Business management software that allows an organisation to use integrated applications to manage the business and automate many back-office functions." },
    { term: "SaaS (Software as a Service)", definition: "A software licensing and delivery model in which software is licensed on a subscription basis and centrally hosted." },
    { term: "API (Application Programming Interface)", definition: "A set of protocols and tools that allows different software applications to communicate with each other." },
    { term: "SSO (Single Sign-On)", definition: "An authentication scheme that allows a user to log in with a single set of credentials to access multiple applications." },
    { term: "Open Source", definition: "Software with source code that is freely available for modification and redistribution." },
    { term: "White-labelling", definition: "The ability to remove the platform's branding and replace it with your own organisation's branding." },
    { term: "Implementation Hours", definition: "The estimated time required to set up, configure, and customise the platform for FirstGens' specific needs." },
    { term: "Scalability", definition: "The capability of a system to handle a growing amount of work, or its potential to accommodate growth." },
    { term: "Cost-sharing Across Users", definition: "The economic principle where fixed implementation costs are divided among all users, creating dramatically lower per-user costs as adoption increases." },
    { term: "SFIA (Skills Framework for the Information Age)", definition: "A globally recognised framework for IT skills classification and appropriate compensation determination." },
    { term: "MVP (Minimum Viable Product)", definition: "A version of a product with just enough features to be usable by early customers who can then provide feedback for future development." },
    { term: "PWA (Progressive Web App)", definition: "A type of application software delivered through the web, built using common web technologies including HTML, CSS and JavaScript that work on any platform that uses a standards-compliant browser." }
  ];
  
  // SFIA rate calculation parameters
  const [baseSFIARate, setBaseSFIARate] = useState(70);
  const [socialDiscount, setSocialDiscount] = useState(0.1);
  const [nonProfitDiscount, setNonProfitDiscount] = useState(0.15);
  const [geographicDiscount, setGeographicDiscount] = useState(0.1);
  const [awsPremium, setAwsPremium] = useState(0.1);
  const [budgetDiscount, setBudgetDiscount] = useState(0.05);
  
  // Calculated values
  const [implementationCost, setImplementationCost] = useState(0);
  const [contingencyCost, setContingencyCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [perStudentData, setPerStudentData] = useState([]);
  const [comparativeData, setComparativeData] = useState([]);
  const [rateBreakdownData, setRateBreakdownData] = useState([]);
  const [traditionalComparison, setTraditionalComparison] = useState([]);
  
  // Apply preset scenario
  const applyPreset = (presetKey) => {
    setActivePreset(presetKey);
    const preset = presets[presetKey];
    setHourlyRate(preset.hourlyRate);
    setImplementationHours(preset.implementationHours);
    setCircleSubscription(preset.circleSubscription);
    setContingencyRate(preset.contingencyRate);
  };
  
  // Calculate costs whenever inputs change
  useEffect(() => {
    const implCost = hourlyRate * implementationHours;
    const contingency = Math.round((implCost + circleSubscription) * contingencyRate);
    const total = implCost + circleSubscription + contingency;
    
    setImplementationCost(implCost);
    setContingencyCost(contingency);
    setTotalCost(total);
    
    // Generate per-student cost data for various scales
    const studentScales = [1000, 5000, 10000, 50000, 100000, 500000];
    const scaleData = studentScales.map(scale => ({
      scale: scale.toLocaleString(),
      scaleValue: scale, // Raw value for sorting
      circleRate: total / scale,
      customDevRate: customDevCost / scale,
      traditionalRate: traditionalCostPerStudent,
    }));
    
    setPerStudentData(scaleData);
    
    // Create traditional comparison data
    const traditionalData = studentScales.map(scale => ({
      scale: scale.toLocaleString(),
      scaleValue: scale,
      circleCost: total,
      traditionalCost: traditionalCostPerStudent * scale,
      saving: (traditionalCostPerStudent * scale) - total,
      savingPercent: (((traditionalCostPerStudent * scale) - total) / (traditionalCostPerStudent * scale) * 100).toFixed(1)
    }));
    
    setTraditionalComparison(traditionalData);
    
    // Update comparative data
    setComparativeData([
      { name: 'Circle.so Implementation', cost: total },
      { name: 'Custom Development', cost: customDevCost },
      { name: 'Traditional Support (1,000 students)', cost: traditionalCostPerStudent * 1000 }
    ]);
    
    // Calculate actual SFIA rate based on parameters
    calculateSFIARateBreakdown();
  }, [
    hourlyRate, implementationHours, circleSubscription, 
    contingencyRate, customDevCost, traditionalCostPerStudent,
    baseSFIARate, socialDiscount, nonProfitDiscount,
    geographicDiscount, awsPremium, budgetDiscount
  ]);
  
  // Calculate SFIA rate breakdown
  const calculateSFIARateBreakdown = () => {
    const afterSocialDiscount = baseSFIARate * (1 - socialDiscount);
    const afterNonProfitDiscount = afterSocialDiscount * (1 - nonProfitDiscount);
    const afterGeographicDiscount = afterNonProfitDiscount * (1 - geographicDiscount);
    const afterAwsPremium = afterGeographicDiscount * (1 + awsPremium);
    const afterBudgetDiscount = afterAwsPremium * (1 - budgetDiscount);
    const finalRate = Math.round(afterBudgetDiscount);
    
    setRateBreakdownData([
      { name: 'Base SFIA Level 3 Rate', rate: baseSFIARate },
      { name: 'After Social Enterprise Discount', rate: afterSocialDiscount.toFixed(2) },
      { name: 'After Non-Profit Discount', rate: afterNonProfitDiscount.toFixed(2) },
      { name: 'After Geographic Adjustment', rate: afterGeographicDiscount.toFixed(2) },
      { name: 'After AWS Specialisation', rate: afterAwsPremium.toFixed(2) },
      { name: 'After Budget Consideration', rate: afterBudgetDiscount.toFixed(2) },
      { name: 'Final Rounded Rate', rate: finalRate }
    ]);
  };
  
  const formatCurrency = (value) => {
    if (value >= 1) {
      return `£${value.toFixed(2)}`;
    } else {
      return `${(value * 100).toFixed(1)}p`;
    }
  };

  const formatLargeNumber = (value) => {
    return `£${value.toLocaleString()}`;
  };
  
  // Custom tooltip function to explain results on charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isPerStudentData = payload[0].name === "circleRate";
      
      if (isPerStudentData) {
        return (
          <div className="bg-white p-4 border border-gray-200 rounded shadow-md text-left max-w-xs">
            <p className="font-medium text-gray-900">Student population: {label}</p>
            <p className="text-sm text-gray-700 mt-1">With a total platform cost of {formatLargeNumber(totalCost)}, spread across {label} students:</p>
            <p className="text-sm font-medium text-blue-600 mt-2">Cost per student using Circle.so: {formatCurrency(payload[0].value)}</p>
            <p className="text-sm font-medium text-green-600 mt-1">Cost per student with custom development: {formatCurrency(payload[1].value)}</p>
            <p className="text-sm font-medium text-red-600 mt-1">Cost per student with traditional methods: {formatCurrency(payload[2].value)}</p>
            <p className="text-xs text-gray-500 mt-3">As the number of students using the platform increases, the cost per student decreases significantly. This is what we call "cost-sharing across users".</p>
          </div>
        );
      } else {
        return (
          <div className="bg-white p-4 border border-gray-200 rounded shadow-md text-left max-w-xs">
            <p className="font-medium text-gray-900">{payload[0].name}</p>
            <p className="text-sm font-medium text-gray-700">{formatLargeNumber(payload[0].value)}</p>
            <p className="text-xs text-gray-500 mt-2">
              {payload[0].name === 'Circle.so Implementation' 
                ? 'The total first-year investment for the Circle.so implementation.' 
                : payload[0].name === 'Custom Development'
                  ? 'The estimated cost for building a similar platform from scratch with custom development.'
                  : 'The cost of providing similar support through traditional in-person methods for 1,000 students.'}
            </p>
          </div>
        );
      }
    }
    return null;
  };
  
  // Platform comparison tooltip
  const PlatformComparisonTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const platform = platformComparison.find(p => p.name === label);
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md text-left max-w-xs">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-700 mt-1">Category: {platform?.category}</p>
          <p className="text-sm font-medium text-blue-600 mt-2">3-Year TCO: {formatLargeNumber(payload[0].value)}</p>
          <p className="text-sm font-medium mt-1">Implementation Timeframe: {platform?.implementationWeeks} weeks</p>
          <p className="text-sm font-medium mt-1">Features Met: {platform?.featureScore}/{platform?.totalFeatures}</p>
          <p className="text-xs text-gray-600 mt-2">{platform?.notes}</p>
          <p className="text-xs text-gray-500 mt-3">TCO (Total Cost of Ownership) includes implementation, subscription, and support costs over three years.</p>
        </div>
      );
    }
    return null;
  };
  
  // Case study tooltip
  const CaseStudyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md text-left max-w-xs">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm font-medium text-blue-600 mt-2">{payload[0].name}: {payload[0].value.toLocaleString()} {payload[0].name.includes('Ratio') ? 'users per employee' : 'x efficiency'}</p>
          {payload.length > 1 && (
            <p className="text-sm font-medium text-red-600 mt-1">{payload[1].name}: {payload[1].value.toLocaleString()} users per employee</p>
          )}
          <p className="text-xs text-gray-500 mt-3">This case study demonstrates how digital platforms can achieve dramatically higher efficiency than traditional approaches through cost-sharing across users.</p>
        </div>
      );
    }
    return null;
  };
  
  // Tooltip component for parameter explanations
  const ParameterTooltip = ({ children, title, description }) => {
    return (
      <div className="relative group">
        {children}
        <div className="cursor-help inline-block ml-1">
          <span className="text-sm text-blue-500 border border-blue-300 rounded-full h-5 w-5 inline-flex items-center justify-center">?</span>
          <div className="opacity-0 bg-blue-900 text-white text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 transition-opacity duration-300 left-0 mt-2 min-w-max max-w-xs">
            <p className="font-bold">{title}</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  };

  // Feature comparison radar chart data preparation
  const prepareRadarData = () => {
    return [
      { feature: "Full Branding", Circle: 100, MightyNetworks: 100, Skool: 100, Moodle: 100, Canvas: 100, Odoo: 100 },
      { feature: "Mobile Apps", Circle: 100, MightyNetworks: 100, Skool: 0, Moodle: 100, Canvas: 100, Odoo: 100 },
      { feature: "Mentor Directory", Circle: 100, MightyNetworks: 0, Skool: 0, Moodle: 0, Canvas: 0, Odoo: 0 },
      { feature: "Event Notifications", Circle: 100, MightyNetworks: 100, Skool: 100, Moodle: 100, Canvas: 100, Odoo: 100 },
      { feature: "Live Events", Circle: 100, MightyNetworks: 0, Skool: 0, Moodle: 0, Canvas: 100, Odoo: 0 },
      { feature: "Personalised Content", Circle: 100, MightyNetworks: 0, Skool: 0, Moodle: 100, Canvas: 100, Odoo: 0 },
      { feature: "Analytics", Circle: 100, MightyNetworks: 100, Skool: 100, Moodle: 100, Canvas: 100, Odoo: 100 },
      { feature: "SSO", Circle: 100, MightyNetworks: 100, Skool: 100, Moodle: 100, Canvas: 100, Odoo: 100 },
      { feature: "Scalability", Circle: 80, MightyNetworks: 80, Skool: 60, Moodle: 80, Canvas: 80, Odoo: 100 }
    ];
  };
  
  // Case study comparison data
  const prepareCaseStudyComparisonData = (caseStudy) => {
    const study = caseStudies[caseStudy];
    
    return [
      {
        name: study.name,
        digitalRatio: study.digitalStaffRatio,
        traditionalRatio: study.traditionalStaffRatio,
        multiplier: study.efficiencyMultiplier
      }
    ];
  };
  
  const getEfficiencyBarData = () => {
    return Object.values(caseStudies).map(study => ({
      name: study.name,
      efficiencyMultiplier: study.efficiencyMultiplier
    })).sort((a, b) => b.efficiencyMultiplier - a.efficiencyMultiplier);
  };
  
  // Circle.so Rating Breakdown Data
  const ratingBreakdownData = [
    { category: "Feature Completeness", score: 10, maxScore: 10, explanation: "Meets all 9 required features with native implementations." },
    { category: "Implementation Timeline", score: 9, maxScore: 10, explanation: "5-week timeline aligns perfectly with June launch target." },
    { category: "Cost Efficiency", score: 8, maxScore: 10, explanation: "Moderate TCO (£34,186) with excellent per-student economics (£0.07)." },
    { category: "Platform Independence", score: 6, maxScore: 10, explanation: "Relies on third-party infrastructure with some data sovereignty concerns." },
    { category: "Extensibility", score: 7, maxScore: 10, explanation: "Good API access but limited code-level customisation compared to owned solutions." },
    { category: "Scalability", score: 8, maxScore: 10, explanation: "Proven scalability with large communities but not unlimited like custom solutions." },
    { category: "User Experience", score: 8, maxScore: 10, explanation: "Highly configurable but not completely redesignable at the code level." },
    { category: "Data Security", score: 7, maxScore: 10, explanation: "Good security practices but shared infrastructure introduces some risk." }
  ];
  
  // Calculate overall rating
  const calculateOverallRating = () => {
    const totalScore = ratingBreakdownData.reduce((sum, item) => sum + item.score, 0);
    const maxPossibleScore = ratingBreakdownData.reduce((sum, item) => sum + item.maxScore, 0);
    return ((totalScore / maxPossibleScore) * 10).toFixed(2);
  };
  
  // Custom development cost breakdown data
  const customDevCostBreakdown = [
    { resource: "Backend Development", hours: 960, rate: 85, total: 81600 },
    { resource: "Frontend Development", hours: 720, rate: 75, total: 54000 },
    { resource: "Quality Assurance", hours: 480, rate: 65, total: 31200 },
    { resource: "Project Management", hours: 240, rate: 90, total: 21600 },
    { resource: "Infrastructure Setup", hours: 120, rate: 80, total: 9600 },
    { resource: "Documentation", hours: 120, rate: 60, total: 7200 }
  ];
  
  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">FirstGens Implementation Simulator</h2>
      <p className="text-center mb-6 text-gray-600">Explore how different implementation choices affect costs and find the most cost-effective approach for your budget</p>
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center whitespace-nowrap">
          <li className="mr-2">
            <button 
              className={`inline-block p-2 sm:p-4 rounded-t-lg ${activeTab === 'simulator' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
              onClick={() => setActiveTab('simulator')}
            >
              Cost Simulator
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block p-2 sm:p-4 rounded-t-lg ${activeTab === 'digital-scale' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
              onClick={() => setActiveTab('digital-scale')}
            >
              Digital Scale Evidence
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block p-2 sm:p-4 rounded-t-lg ${activeTab === 'platform-comparison' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
              onClick={() => setActiveTab('platform-comparison')}
            >
              Platform Comparison
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block p-2 sm:p-4 rounded-t-lg ${activeTab === 'phased-approach' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
              onClick={() => setActiveTab('phased-approach')}
            >
              Phased Approach
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block p-2 sm:p-4 rounded-t-lg ${activeTab === 'feature-matrix' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
              onClick={() => setActiveTab('feature-matrix')}
            >
              Feature Matrix
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block p-2 sm:p-4 rounded-t-lg ${activeTab === 'rating-breakdown' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
              onClick={() => setActiveTab('rating-breakdown')}
            >
              Rating Analysis
            </button>
          </li>
          <li>
            <button 
              className={`inline-block p-2 sm:p-4 rounded-t-lg ${activeTab === 'glossary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
              onClick={() => setActiveTab('glossary')}
            >
              Glossary
            </button>
          </li>
        </ul>
      </div>
      
      {/* Cost Simulator Tab */}
      {activeTab === 'simulator' && (
        <>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Implementation Scenarios</h3>
            <p className="text-sm mb-4">Select an implementation scenario to see how it affects costs:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.keys(presets).map(key => (
                <button
                  key={key}
                  className={`p-3 rounded-lg text-left ${activePreset === key ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
                  onClick={() => applyPreset(key)}
                >
                  <div className="font-medium">{presets[key].name}</div>
                  <div className={`text-xs mt-1 ${activePreset === key ? 'text-blue-100' : 'text-gray-500'}`}>{presets[key].description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Cost Parameters</h3>
              
              <div className="mb-4">
                <ParameterTooltip 
                  title="Professional Services Rate" 
                  description="This is the hourly rate charged for implementation services. The default £50/hour rate reflects the carefully calculated rate for a SFIA Level 3 practitioner with adjustments for nonprofit status. Increasing this rate would represent using more senior consultants or market-standard rates."
                >
                  <label className="block text-sm font-medium mb-1">Professional Services Rate (£/hour)</label>
                </ParameterTooltip>
                <input 
                  type="range" 
                  min="40" 
                  max="80" 
                  value={hourlyRate} 
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span className="text-sm">£40/hr</span>
                  <span className="text-sm font-medium">Current: £{hourlyRate}/hr</span>
                  <span className="text-sm">£80/hr</span>
                </div>
              </div>
              
              <div className="mb-4">
                <ParameterTooltip 
                  title="Implementation Hours" 
                  description="This represents the total effort required to implement the platform. The default 215 hours covers all implementation components from setup to training. Decreasing this would reduce feature completeness, while increasing it would add more customisation and features."
                >
                  <label className="block text-sm font-medium mb-1">Implementation Hours</label>
                </ParameterTooltip>
                <input 
                  type="range" 
                  min="80" 
                  max="300" 
                  value={implementationHours} 
                  onChange={(e) => setImplementationHours(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span className="text-sm">80 hrs</span>
                  <span className="text-sm font-medium">Current: {implementationHours} hrs</span>
                  <span className="text-sm">300 hrs</span>
                </div>
              </div>
              
              <div className="mb-4">
                <ParameterTooltip 
                  title="Circle.so Annual Subscription" 
                  description="This is the yearly cost for the Circle.so platform subscription. The default £1,866 reflects the nonprofit Enterprise tier pricing. Increasing this would represent standard enterprise pricing or additional paid features from Circle.so."
                >
                  <label className="block text-sm font-medium mb-1">Circle.so Annual Subscription (£)</label>
                </ParameterTooltip>
                <input 
                  type="range" 
                  min="1000" 
                  max="5000" 
                  step="100"
                  value={circleSubscription} 
                  onChange={(e) => setCircleSubscription(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span className="text-sm">£1,000</span>
                  <span className="text-sm font-medium">Current: £{circleSubscription}</span>
                  <span className="text-sm">£5,000</span>
                </div>
              </div>
              
              <div className="mb-4">
                <ParameterTooltip 
                  title="Contingency Reserve Percentage" 
                  description="This is additional funding set aside to handle unexpected challenges or scope adjustments. Industry standard is 15-20% for technology projects. Increasing this provides more financial safety but raises the total budget."
                >
                  <label className="block text-sm font-medium mb-1">Contingency Reserve (%)</label>
                </ParameterTooltip>
                <input 
                  type="range" 
                  min="0" 
                  max="0.3" 
                  step="0.01"
                  value={contingencyRate} 
                  onChange={(e) => setContingencyRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span className="text-sm">0%</span>
                  <span className="text-sm font-medium">Current: {(contingencyRate * 100).toFixed(0)}%</span>
                  <span className="text-sm">30%</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Cost Summary</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">Implementation Cost:</div>
                  <div className="text-sm font-medium text-right">{formatLargeNumber(implementationCost)}</div>
                  
                  <div className="text-sm">Circle.so Subscription:</div>
                  <div className="text-sm font-medium text-right">{formatLargeNumber(circleSubscription)}</div>
                  
                  <div className="text-sm">Contingency Reserve:</div>
                  <div className="text-sm font-medium text-right">{formatLargeNumber(contingencyCost)}</div>
                  
                  <div className="text-sm font-medium pt-2 border-t">Total First-Year Investment:</div>
                  <div className="text-lg font-bold text-right pt-2 border-t">{formatLargeNumber(totalCost)}</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">SFIA Rate Analysis</h3>
              <p className="text-sm mb-4">The <strong>Skills Framework for the Information Age (SFIA)</strong> is a global standard for classifying IT skills and determining fair compensation. This shows how we calculated the hourly rate:</p>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={rateBreakdownData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, Math.max(baseSFIARate * 1.1, 80)]} />
                    <YAxis dataKey="name" type="category" width={175} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`£${value}`, 'Hourly Rate']} />
                    <Bar dataKey="rate" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-sm text-gray-700">
                <p>Starting with the standard SFIA Level 3 rate (£70/hour), we apply adjustments to arrive at a fair rate for FirstGens' specific situation:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Social Enterprise Discount (-10%)</strong>: Reflects Andrea's commitment to supporting social impact organisations</li>
                  <li><strong>Non-Profit Status (-15%)</strong>: Additional discount for educational non-profit organisations</li>
                  <li><strong>Geographic Adjustment (-10%)</strong>: Accounts for lower regional rates compared to London</li>
                  <li><strong>AWS Specialisation (+10%)</strong>: Premium for certified cloud engineering expertise</li>
                  <li><strong>Budget Consideration (-5%)</strong>: Additional discount to accommodate FirstGens' budget constraints</li>
                </ul>
                <p className="mt-2">The resulting £50/hour rate represents a 28.6% reduction from standard market rates, providing exceptional value while ensuring appropriate expertise.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Implementation Cost Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparativeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis label={{ value: 'First-Year Investment (£)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="cost" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart compares the total cost of implementing the FirstGens platform using different approaches. The Circle.so implementation provides substantial cost savings compared to custom development, while delivering the same core functionality.</p>
                <p className="mt-2">The comparison with traditional support methods (for just 1,000 students) demonstrates the dramatic cost advantage of a digital platform approach.</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Per-Student Cost Analysis</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={perStudentData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scale" angle={-45} textAnchor="end" height={70} label={{ value: 'Number of Students', position: 'insideBottom', offset: -60 }} />
                    <YAxis 
                      scale="log" 
                      domain={[0.01, 1000]} 
                      tickCount={6}
                      tickFormatter={(value) => value < 1 ? `${(value * 100).toFixed(0)}p` : `£${value.toFixed(0)}`} 
                      label={{ value: 'Cost Per Student (£)', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="circleRate" name="circleRate" stroke="#4F46E5" strokeWidth={2} />
                    <Line type="monotone" dataKey="customDevRate" name="customDevRate" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="traditionalRate" name="traditionalRate" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart shows how the cost per student decreases as more students use the platform. The special scale used here (called a logarithmic scale) helps visualise large differences in values by using a scale where each step represents a multiplication rather than addition.</p>
                <p className="mt-2">While traditional support methods maintain a constant cost per student (around £500) regardless of scale, the FirstGens platform becomes increasingly cost-effective as more students join. At 500,000 students, the cost drops to just a few pence per student.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Cost-Sharing Across Users: The Power of Digital Scale</h3>
            <p className="text-sm mb-4">Unlike traditional educational support methods where each additional student increases costs proportionally, digital platforms like FirstGens share the fixed implementation costs across all users. This creates substantial savings that increase with scale:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border p-2 text-left">Student Population</th>
                    <th className="border p-2 text-right">Circle.so Platform Cost</th>
                    <th className="border p-2 text-right">Traditional Support Cost</th>
                    <th className="border p-2 text-right">Cost Savings</th>
                    <th className="border p-2 text-right">Savings Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {traditionalComparison.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border p-2 font-medium">{item.scale} students</td>
                      <td className="border p-2 text-right">{formatLargeNumber(item.circleCost)}</td>
                      <td className="border p-2 text-right">{formatLargeNumber(item.traditionalCost)}</td>
                      <td className="border p-2 text-right text-green-600 font-medium">{formatLargeNumber(item.saving)}</td>
                      <td className="border p-2 text-right">{item.savingPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-sm text-gray-600">
              <p>This table demonstrates what we call "cost-sharing across users" or "economies of scale" - a powerful economic advantage of digital platforms. Unlike personnel-based approaches where costs increase linearly with each new student, the FirstGens platform spreads costs across the entire user base, creating extraordinary efficiency at scale.</p>
              <p className="mt-2">At just 1,000 students, the platform already delivers substantial savings compared to traditional methods. As adoption grows to the target of 500,000 students, the savings become transformative - enabling nationwide impact that would be financially impossible through conventional approaches.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Cost-Sharing Creates Exceptional Value</p>
                  <p className="text-sm mt-1">The Circle.so implementation spreads fixed costs across all users, with per-student costs dropping from £{(totalCost/1000).toFixed(2)} at 1,000 students to just £{(totalCost/500000).toFixed(2)} at 500,000 students. This means the platform becomes dramatically more cost-effective as it grows, unlike traditional approaches where costs scale linearly with student numbers.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Substantial Cost Advantage</p>
                  <p className="text-sm mt-1">Compared to custom development (£{customDevCost.toLocaleString()}), the Circle.so approach (£{totalCost.toLocaleString()}) delivers {((customDevCost - totalCost) / customDevCost * 100).toFixed(1)}% cost savings while meeting all core requirements. This represents both exceptional value and financial responsibility to FirstGens' stakeholders.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Fair Rate Determination</p>
                  <p className="text-sm mt-1">The hourly rate of £{hourlyRate} represents a {((baseSFIARate - hourlyRate) / baseSFIARate * 100).toFixed(1)}% reduction from standard market rates for equivalent SFIA Level 3 practitioners (£{baseSFIARate}), demonstrating significant accommodation of FirstGens' budget constraints while ensuring appropriate expertise.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">4</div>
                <div>
                  <p className="font-medium">Transformational Economics</p>
                  <p className="text-sm mt-1">The platform enables nationwide scale that would be financially impossible through traditional methods. At 500,000 students, the Circle.so implementation costs just £{(totalCost/500000).toFixed(2)} per student versus £{traditionalCostPerStudent.toFixed(2)} for traditional approaches - a saving of over £{(traditionalCostPerStudent - (totalCost/500000)).toFixed(2)} per student or nearly £{((traditionalCostPerStudent*500000) - totalCost).toLocaleString()} in total.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Platform Comparison Tab */}
      {activeTab === 'platform-comparison' && (
        <>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Comprehensive Platform Comparison</h3>
            <p className="text-sm mb-4">This analysis examines all available platforms that could potentially meet FirstGens' requirements. We've included community platforms, learning management systems (LMSs), ERP solutions like Odoo, and course platforms like Skool to ensure a complete assessment.</p>
          </div>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-2 text-left">Platform</th>
                  <th className="border p-2 text-center">3-Year TCO*</th>
                  <th className="border p-2 text-center">Cost at 500K Students</th>
                  <th className="border p-2 text-center">Implementation Time</th>
                  <th className="border p-2 text-center">Education Features</th>
                  <th className="border p-2 text-center">Category</th>
                </tr>
              </thead>
              <tbody>
                {platformComparison
                  .sort((a, b) => a.threeYearTCO - b.threeYearTCO)
                  .map((platform, index) => (
                    <tr key={platform.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className={`border p-2 font-medium ${platform.name === 'Circle.so' ? 'text-blue-700' : ''}`}>
                        {platform.name === 'Circle.so' ? '★ ' + platform.name : platform.name}
                      </td>
                      <td className="border p-2 text-center">£{platform.threeYearTCO.toLocaleString()}</td>
                      <td className="border p-2 text-center">£{platform.costPer500k} per student</td>
                      <td className="border p-2 text-center">{platform.implementationWeeks} weeks</td>
                      <td className="border p-2 text-center">{platform.featureScore}/{platform.totalFeatures}</td>
                      <td className="border p-2 text-center">{platform.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">* TCO = Total Cost of Ownership (includes implementation, subscriptions, hosting, and ongoing support costs over three years)</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">3-Year Total Cost of Ownership</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={platformComparison.slice().sort((a, b) => a.threeYearTCO - b.threeYearTCO).slice(0, 10)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis label={{ value: '3-Year TCO (£)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<PlatformComparisonTooltip />} />
                    <Bar dataKey="threeYearTCO" fill="#4F46E5">
                      {platformComparison.slice().sort((a, b) => a.threeYearTCO - b.threeYearTCO).slice(0, 10).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.name === "Circle.so" ? "#4F46E5" : "#9CA3AF"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart compares the three-year Total Cost of Ownership (TCO) for all platforms. While some alternatives like Thinkific offer slightly lower TCO, they lack critical features such as mentor directory and mobile apps that are essential to FirstGens' mission.</p>
                <p className="mt-2">Circle.so offers a balanced approach with moderate TCO (£34,186) while delivering all required features. Custom development offers similar functionality but at significantly higher cost (£184,800).</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Feature Score Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={platformComparison.sort((a, b) => b.featureScore - a.featureScore).slice(0, 10)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis domain={[0, 9]} label={{ value: 'Features Met (out of 9)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<PlatformComparisonTooltip />} />
                    <Bar dataKey="featureScore" fill="#EC4899">
                      {platformComparison.sort((a, b) => b.featureScore - a.featureScore).slice(0, 10).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.name === "Circle.so" || entry.name === "Custom Development" ? "#EC4899" : "#9CA3AF"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart shows how many of Alaya's nine core requirements each platform satisfies. Only Circle.so and custom development meet all requirements, with Canvas (8/9) coming close but lacking the critical mentor directory functionality.</p>
                <p className="mt-2">Learning Management Systems (LMS) like Moodle and Canvas score well but lack mentorship functionality that is particularly important for FirstGens' mission. Most platforms would require significant custom development to implement this feature.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Platform Category Analysis</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Learning Management Systems (LMS)</h4>
              <p className="text-sm text-gray-700">While LMSs like Moodle and Canvas excel at structured course delivery with strong analytics and personalisation capabilities, they fundamentally lack the community and mentorship focus central to FirstGens' mission. These platforms are designed for traditional educational contexts with predefined curriculum rather than facilitating mentor-mentee relationships and community engagement. Implementing mentor directory functionality would require significant custom development, increasing both cost and timeframe.</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Enterprise Resource Planning (ERP) Solutions</h4>
              <p className="text-sm text-gray-700">Odoo provides exceptional business process management capabilities but would require extensive customisation to serve as an educational community platform. With the highest implementation complexity and longest timeframe of all options (38 weeks), Odoo represents a 'build from scratch' approach within an ERP framework. While technically possible, this approach combines high costs with long development timelines without delivering any inherent advantages in the educational community space.</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Community Platforms</h4>
              <p className="text-sm text-gray-700">Purpose-built community platforms like Circle.so, Mighty Networks, and Skool offer the most natural fit for FirstGens' requirements. Among these, Circle.so uniquely satisfies all nine core requirements including the critical mentor directory functionality. While Mighty Networks offers a slight cost advantage (£29,700 vs £34,186), it lacks both mentorship features and live event capabilities that would require third-party integration, ultimately increasing both complexity and cost.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-2">Custom Development</h4>
              <p className="text-sm text-gray-700">While custom development would provide complete control and feature alignment, the significant upfront investment (£184,800) and extended timeframe (60 weeks) make this approach impractical for FirstGens' immediate needs and budget constraints. Custom development represents a future evolution path rather than a viable initial strategy.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Optimal Platform Recommendation</h3>
            <p className="text-gray-700 mb-4">Based on comprehensive analysis across all available platforms, Circle.so emerges as the optimal solution for FirstGens' specific requirements. It uniquely satisfies all nine core requirements while providing reasonable implementation costs (£34,186 three-year TCO) and rapid time-to-market (5 weeks). The platform's built-in mentorship capabilities - absent in nearly all alternatives - are particularly crucial for FirstGens' mission.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-blue-700 mb-2">Complete Feature Alignment</h4>
                <p className="text-sm text-gray-600">Circle.so is one of only two solutions that satisfies all requirements, with the other (custom development) being significantly more expensive and time-consuming.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-blue-700 mb-2">Rapid Implementation</h4>
                <p className="text-sm text-gray-600">With a 5-week implementation timeframe, Circle.so enables FirstGens to meet its June 2025 launch target while delivering full functionality.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-blue-700 mb-2">Balanced Economics</h4>
                <p className="text-sm text-gray-600">Circle.so offers a reasonable TCO (£34,186) while delivering all required features. The per-student cost at scale (£0.07) enables nationwide impact.</p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Phased Approach Tab */}
      {activeTab === 'phased-approach' && (
        <>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Phased Implementation Strategy</h3>
            <p className="text-sm mb-4">Based on Alaya's feedback, we can implement a phased approach that reduces initial costs while still delivering on core requirements. This strategy provides greater financial flexibility while ensuring the platform meets FirstGens' immediate needs.</p>
          </div>
          
          <div className="mb-8">
            {phasedImplementation.map((phase, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden ${index === 0 ? 'border-blue-300 shadow-md' : ''}`}>
                <div className={`py-3 px-4 border-b ${index === 0 ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="font-medium text-lg">{phase.phase}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{phase.timeframe}</span>
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">£{phase.cost.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-3">{phase.description}</p>
                  
                  <h4 className="font-medium mb-2 text-gray-700">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {phase.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600">{feature}</li>
                    ))}
                  </ul>
                  
                  {phase.breakdown && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Cost Breakdown:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {phase.breakdown.map((item, i) => (
                          <li key={i} className="text-sm text-gray-500">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Cost Comparison</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Phase 1 (MVP)", cost: 7200 },
                      { name: "Full Implementation", cost: 14508 },
                      { name: "Phased Approach (Total)", cost: 20000 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Cost (£)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [formatLargeNumber(value), 'Cost']} />
                    <Bar dataKey="cost" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart compares the costs of different implementation approaches. The phased approach reduces initial investment to £7,200 for the MVP launch (Phase 1), compared to £14,508 for full immediate implementation.</p>
                <p className="mt-2">While the total cost of the phased approach is higher (£20,000), it spreads the investment over time and allows decisions on later phases to be based on actual usage data from the initial launch.</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Strategic Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Lower Initial Financial Commitment</p>
                    <p className="text-sm mt-1">The phased approach reduces the immediate investment to £7,200 for the MVP launch, aligning better with potential budget constraints while still meeting core student needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Risk Mitigation</p>
                    <p className="text-sm mt-1">Incremental development and testing allows FirstGens to validate the platform with real users before committing to additional features, reducing implementation risk.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Data-Informed Decision Making</p>
                    <p className="text-sm mt-1">Usage data from Phase 1 will inform subsequent phases, ensuring investments are targeted to features that deliver the greatest impact for students.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">4</div>
                  <div>
                    <p className="font-medium">Alignment with Funding Cycles</p>
                    <p className="text-sm mt-1">The phased approach gives time to secure additional funding for later phases based on demonstrated success, potentially tapping into grant cycles or new funding sources.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">5</div>
                  <div>
                    <p className="font-medium">Long-Term Ownership Path</p>
                    <p className="text-sm mt-1">The architecture will preserve FirstGens' ability to migrate away from Circle.so in the future if desired, maintaining long-term technological independence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Phased vs. Full Implementation Trade-offs</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border p-2 text-left">Aspect</th>
                    <th className="border p-2 text-center">Phased Approach</th>
                    <th className="border p-2 text-center">Full Implementation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border p-2 font-medium">Initial Investment</td>
                    <td className="border p-2 text-center text-green-600">Lower (£7,200)</td>
                    <td className="border p-2 text-center">Higher (£14,508)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Total Cost</td>
                    <td className="border p-2 text-center">Higher (£20,000)</td>
                    <td className="border p-2 text-center text-green-600">Lower (£14,508)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border p-2 font-medium">Feature Completeness at Launch</td>
                    <td className="border p-2 text-center">Core Features Only</td>
                    <td className="border p-2 text-center text-green-600">Complete</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Launch Timeline</td>
                    <td className="border p-2 text-center text-green-600">Same (June 2025)</td>
                    <td className="border p-2 text-center text-green-600">Same (June 2025)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border p-2 font-medium">Financial Flexibility</td>
                    <td className="border p-2 text-center text-green-600">Higher</td>
                    <td className="border p-2 text-center">Lower</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Data-Informed Refinement</td>
                    <td className="border p-2 text-center text-green-600">Higher</td>
                    <td className="border p-2 text-center">Lower</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-sm text-gray-600">
              <p>The phased approach offers lower initial investment and greater financial flexibility, but at a higher total cost if all phases are implemented. The full implementation provides complete feature set from the start at a lower total cost.</p>
              <p className="mt-2">Both approaches meet the critical June 2025 launch timeline, but the phased approach allows for more data-informed refinement based on actual usage patterns.</p>
            </div>
          </div>
        </>
      )}
      
      {/* Digital Scale Evidence Tab */}
      {activeTab === 'digital-scale' && (
        <>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">The Power of Digital Scale: Historical Evidence</h3>
            <p className="text-sm mb-4">Digital platforms fundamentally transform service economics through dramatically higher efficiency at scale. These real-world examples demonstrate the transformational impact of digital scale economics across different sectors:</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
              <div className="flex flex-wrap items-center border-b border-gray-200">
                {Object.keys(caseStudies).map(key => (
                  <button
                    key={key}
                    className={`py-3 px-4 text-sm font-medium ${activeCaseStudy === key ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveCaseStudy(key)}
                  >
                    {caseStudies[key].name}
                  </button>
                ))}
              </div>
              
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                    <h4 className="text-lg font-semibold mb-1">{caseStudies[activeCaseStudy].name} <span className="text-sm font-normal text-gray-500">({caseStudies[activeCaseStudy].category}, founded {caseStudies[activeCaseStudy].foundedYear})</span></h4>
                    <p className="text-sm text-gray-700 mb-3">{caseStudies[activeCaseStudy].description}</p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Impact: {caseStudies[activeCaseStudy].impact}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={prepareCaseStudyComparisonData(activeCaseStudy)}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis scale="log" domain={[1, Math.max(caseStudies[activeCaseStudy].digitalStaffRatio * 2, 10000000)]} />
                          <Tooltip content={<CaseStudyTooltip />} />
                          <Legend />
                          <Bar dataKey="digitalRatio" name="Digital Ratio" fill="#4F46E5" />
                          <Bar dataKey="traditionalRatio" name="Traditional Ratio" fill="#EF4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">Note: Logarithmic scale used to show the dramatic difference between traditional and digital approaches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Implications for FirstGens' Implementation</h3>
            <p className="text-gray-700 mb-4">The historical evidence of digital scale economics confirms the transformational potential of the Circle.so implementation for FirstGens:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border p-2 text-left">Population Size</th>
                    <th className="border p-2 text-center">Traditional Mentorship Cost</th>
                    <th className="border p-2 text-center">FirstGens Digital Cost</th>
                    <th className="border p-2 text-center">Per-Student Savings</th>
                    <th className="border p-2 text-center">Total Annual Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border p-2">1,000 students</td>
                    <td className="border p-2 text-center">£500.00/student</td>
                    <td className="border p-2 text-center">£14.51/student</td>
                    <td className="border p-2 text-center">£485.49/student</td>
                    <td className="border p-2 text-center">£485,490</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2">10,000 students</td>
                    <td className="border p-2 text-center">£500.00/student</td>
                    <td className="border p-2 text-center">£1.45/student</td>
                    <td className="border p-2 text-center">£498.55/student</td>
                    <td className="border p-2 text-center">£4,985,500</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border p-2">100,000 students</td>
                    <td className="border p-2 text-center">£500.00/student</td>
                    <td className="border p-2 text-center">£0.15/student</td>
                    <td className="border p-2 text-center">£499.85/student</td>
                    <td className="border p-2 text-center">£49,985,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">500,000 students</td>
                    <td className="border p-2 text-center font-medium">£500.00/student</td>
                    <td className="border p-2 text-center font-medium">£0.03/student</td>
                    <td className="border p-2 text-center font-medium">£499.97/student</td>
                    <td className="border p-2 text-center font-medium">£249,985,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm mt-4 text-gray-700">
              Just as Coursera transformed educational economics through 1,783x greater efficiency than traditional universities, the FirstGens digital platform enables nationwide impact at a fraction of traditional costs. This mathematical advantage is not theoretical but proven repeatedly across multiple sectors and backed by extensive real-world evidence.
            </p>
          </div>
        </>
      )}
      
      {/* Feature Matrix Tab */}
      {activeTab === 'feature-matrix' && (
        <>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Feature Matrix Comparison</h3>
            <p className="text-sm mb-4">This detailed matrix shows exactly which features are supported by each platform we evaluated.</p>
          </div>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-2 text-left">Feature</th>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <th key={platform.name} className="border p-2 text-center">{platform.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border p-2 font-medium">Full Branding</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`fullBranding-${platform.name}`} className="border p-2 text-center">
                      {platform.fullBranding ? '✓' : '✗'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Mobile Apps</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`mobileApps-${platform.name}`} className="border p-2 text-center">
                      {platform.mobileApps ? '✓' : '✗'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="border p-2 font-medium">Mentor Directory</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`mentorDirectory-${platform.name}`} className="border p-2 text-center">
                      {platform.mentorDirectory ? '✓' : '✗'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Event Notifications</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`eventNotifications-${platform.name}`} className="border p-2 text-center">
                      {platform.eventNotifications ? '✓' : '✗'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="border p-2 font-medium">Live Events</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`liveEvents-${platform.name}`} className="border p-2 text-center">
                      {platform.liveEvents ? '✓' : '✗'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Personalised Content</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`personalizedContent-${platform.name}`} className="border p-2 text-center">
                      {platform.personalizedContent ? '✓' : '✗'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="border p-2 font-medium">Analytics</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`analytics-${platform.name}`} className="border p-2 text-center">
                      {platform.analytics ? '✓' : '✗'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">SSO Integration</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`sso-${platform.name}`} className="border p-2 text-center">
                      {platform.sso ? '✓' : '✗'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="border p-2 font-medium">Scalability</td>
                  {platformComparison.filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name)).map((platform) => (
                    <td key={`scalability-${platform.name}`} className="border p-2 text-center">
                      {platform.scalability}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Feature Coverage Radar Chart</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={prepareRadarData()}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="feature" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Circle" dataKey="Circle" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
                    <Radar name="MightyNetworks" dataKey="MightyNetworks" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                    <Radar name="Canvas" dataKey="Canvas" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.4} />
                    <Radar name="Odoo" dataKey="Odoo" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This radar chart visualizes feature coverage across key platforms. Circle.so offers the most complete feature set, particularly excelling in mentor directory and live events capabilities that are critical for FirstGens' objectives.</p>
                <p className="mt-2">While Canvas offers strong educational features, it lacks the mentor directory functionality. Odoo provides excellent extensibility but would require substantial custom development to meet educational community needs.</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Implementation Time Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={platformComparison
                      .filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name))
                      .sort((a, b) => a.implementationWeeks - b.implementationWeeks)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis label={{ value: 'Implementation Time (weeks)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<PlatformComparisonTooltip />} />
                    <Bar dataKey="implementationWeeks" fill="#EC4899">
                      {platformComparison
                        .filter(p => ['Circle.so', 'Mighty Networks', 'Skool', 'Moodle', 'Canvas', 'Odoo', 'Custom Development'].includes(p.name))
                        .sort((a, b) => a.implementationWeeks - b.implementationWeeks)
                        .map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.name === "Circle.so" ? "#EC4899" : "#9CA3AF"} 
                          />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Implementation time varies significantly across platforms. Circle.so and similar community platforms offer rapid implementation (5 weeks), while custom development (60 weeks) and ERP-based solutions like Odoo (38 weeks) require substantially longer timeframes.</p>
                <p className="mt-2">Given FirstGens' target launch of June 2025, platforms requiring more than 12 weeks would be challenging to implement in time, making Circle.so's 5-week timeline particularly attractive.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Critical Feature Analysis</h3>
            <p className="text-gray-700 mb-4">Among all requirements, the mentor directory functionality stands out as particularly critical for FirstGens' mission and uniquely challenging to implement. This analysis examines this feature across platforms:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border p-2 text-left">Platform</th>
                    <th className="border p-2 text-center">Native Directory?</th>
                    <th className="border p-2 text-left">Implementation Approach</th>
                    <th className="border p-2 text-center">Additional Cost</th>
                    <th className="border p-2 text-center">Development Effort</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border p-2 font-medium text-blue-700">Circle.so</td>
                    <td className="border p-2 text-center text-green-600">✓</td>
                    <td className="border p-2">Built-in member directory with custom profile fields and advanced filtering</td>
                    <td className="border p-2 text-center">None</td>
                    <td className="border p-2 text-center">Minimal - Configuration only</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Mighty Networks</td>
                    <td className="border p-2 text-center text-red-600">✗</td>
                    <td className="border p-2">Would require custom development or external integration</td>
                    <td className="border p-2 text-center">£3,600 - £7,200</td>
                    <td className="border p-2 text-center">Substantial - 60-120 hours</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border p-2 font-medium">Skool</td>
                    <td className="border p-2 text-center text-red-600">✗</td>
                    <td className="border p-2">Limited member directory without required filtering capabilities</td>
                    <td className="border p-2 text-center">£4,800 - £9,600</td>
                    <td className="border p-2 text-center">Major - 80-160 hours</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Canvas/Moodle</td>
                    <td className="border p-2 text-center text-red-600">✗</td>
                    <td className="border p-2">Would require custom module development; not aligned with LMS architecture</td>
                    <td className="border p-2 text-center">£6,000 - £12,000</td>
                    <td className="border p-2 text-center">Major - 100-200 hours</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border p-2 font-medium">Odoo</td>
                    <td className="border p-2 text-center text-red-600">✗</td>
                    <td className="border p-2">Would require custom module development using Odoo's framework</td>
                    <td className="border p-2 text-center">£7,200 - £14,400</td>
                    <td className="border p-2 text-center">Major - 120-240 hours</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Custom Development</td>
                    <td className="border p-2 text-center text-green-600">✓</td>
                    <td className="border p-2">Purpose-built directory functionality to exact specifications</td>
                    <td className="border p-2 text-center">Included in base cost</td>
                    <td className="border p-2 text-center">Included in development</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm mt-4 text-gray-700">
              The mentor directory functionality is particularly critical as it directly enables FirstGens' core mission of connecting first-generation students with suitable mentors. Circle.so's native implementation of this feature represents a significant advantage, eliminating substantial development costs and risks that would be incurred with other platforms.
            </p>
          </div>
        </>
        )}
        
        {/* Rating Breakdown Tab */}
        {activeTab === 'rating-breakdown' && (
          <>
            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Circle.so Platform Rating Analysis</h3>
              <p className="text-sm mb-4">This comprehensive analysis evaluates Circle.so across 8 key dimensions to provide a systematic assessment of its suitability for FirstGens' specific needs:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-semibold">Overall Rating:</h3>
                  <div className="ml-auto bg-blue-100 text-blue-800 font-bold text-xl rounded-full h-12 w-12 flex items-center justify-center">{calculateOverallRating()}</div>
                </div>
                
                <div className="space-y-4">
                  {ratingBreakdownData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-gray-500">{item.score}/{item.maxScore}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2.5 mb-1">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Custom Development Cost Breakdown</h3>
                <p className="text-sm text-gray-600 mb-4">For comparison, here's what a custom-built solution would cost:</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border-collapse">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border p-2 text-left">Resource</th>
                        <th className="border p-2 text-center">Hours</th>
                        <th className="border p-2 text-center">Rate (£/hr)</th>
                        <th className="border p-2 text-center">Total Cost (£)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customDevCostBreakdown.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border p-2 font-medium">{item.resource}</td>
                          <td className="border p-2 text-center">{item.hours}</td>
                          <td className="border p-2 text-center">£{item.rate}</td>
                          <td className="border p-2 text-center">£{item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100">
                        <td className="border p-2 font-medium">Total</td>
                        <td className="border p-2 text-center">{customDevCostBreakdown.reduce((sum, item) => sum + item.hours, 0)}</td>
                        <td className="border p-2 text-center"></td>
                        <td className="border p-2 text-center font-bold">£{customDevCostBreakdown.reduce((sum, item) => sum + item.total, 0).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Key Observations:</h4>
                  <p className="text-sm text-gray-600">Custom development would require approximately {customDevCostBreakdown.reduce((sum, item) => sum + item.hours, 0)} development hours across multiple specialisations (compared to 215 hours for Circle.so implementation). While offering complete customisation, this approach incurs about 5.4x the cost and extends the timeline by approximately 12x (60 weeks vs. 5 weeks).</p>
                  <p className="text-sm text-gray-600 mt-2">This substantial difference underscores the economic advantage of leveraging Circle.so's pre-built functionality rather than building from scratch.</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Strategic Advantages Assessment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-lg text-green-700 mb-2">Circle.so Advantages</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm"><strong>Complete Feature Alignment</strong>: Naturally offers all 9 required features without custom development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm"><strong>Rapid Implementation</strong>: 5-week timeline aligns perfectly with June 2025 launch target</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm"><strong>Predictable Costs</strong>: Fixed subscription model eliminates development surprises</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm"><strong>Validated Functionality</strong>: Platform already tested with similar community use cases</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm"><strong>No Technical Debt</strong>: Ongoing platform improvements come at no additional cost</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm"><strong>Phased Scalability</strong>: Can start small and grow as adoption increases</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-lg text-red-700 mb-2">Circle.so Limitations</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span className="text-sm"><strong>Limited Code-Level Customisation</strong>: Some advanced customisations may be constrained</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span className="text-sm"><strong>Third-Party Dependency</strong>: Reliance on Circle.so as a platform partner</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span className="text-sm"><strong>Ongoing Subscription Costs</strong>: Annual costs continue even at large scale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span className="text-sm"><strong>Shared Infrastructure</strong>: Data resides on Circle.so servers rather than exclusively FirstGens-controlled infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span className="text-sm"><strong>Platform Evolution Risk</strong>: Future Circle.so product decisions could affect FirstGens' features</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <p>Circle.so offers exceptional alignment with FirstGens' immediate and medium-term needs, particularly in terms of feature completeness, rapid implementation, and cost-effectiveness. While it does create some platform dependency, the migration strategy outlined in our implementation plan ensures FirstGens maintains control over its data and can transition to other solutions if needed in the future.</p>
                <p className="mt-2">Given FirstGens' growth stage, budget constraints, and target timeline, the advantages of Circle.so significantly outweigh its limitations. The proposed phased approach further mitigates risks by allowing experimental validation before larger financial commitments.</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Rating Conclusions</h3>
              <p className="text-gray-700 mb-4">Based on our systematic assessment, Circle.so receives an overall rating of <strong>{calculateOverallRating()}/10</strong>, making it the recommended platform for FirstGens' needs.</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Superior Feature Alignment</p>
                    <p className="text-sm mt-1">Circle.so's native mentor directory functionality and community-centric design provide exceptional alignment with FirstGens' mission and objectives without requiring extensive custom development.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Rapid Time-to-Value</p>
                    <p className="text-sm mt-1">The 5-week implementation timeline enables FirstGens to launch by June 2025, providing crucial momentum and market presence that would be impossible with longer development approaches.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Balanced Cost Structure</p>
                    <p className="text-sm mt-1">With reasonable implementation costs (£14,508) and strong per-student economics at scale (£0.07 per student at 500,000 users), Circle.so represents a financially responsible approach that enables nationwide impact.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">4</div>
                  <div>
                    <p className="font-medium">Future Flexibility</p>
                    <p className="text-sm mt-1">The implementation architecture preserves FirstGens' ability to migrate to other platforms or custom development in the future as needs evolve, maintaining technological independence while leveraging Circle.so's immediate advantages.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Glossary Tab */}
        {activeTab === 'glossary' && (
          <>
            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Technical Terms Glossary</h3>
              <p className="text-sm mb-4">This glossary explains key technical terms used throughout the analysis to ensure clarity for all stakeholders:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {glossaryTerms.map((term, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-blue-700 mb-1">{term.term}</h4>
                  <p className="text-sm text-gray-600">{term.definition}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default FirstGensImplementationSimulator;
