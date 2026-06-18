import React, { useState } from 'react';
import VoiceProfileModule from './components/VoiceProfileModule';
import AdsCarousel from './components/ads-carousel';

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState(null);

    return (
        <div className="bg-white text-dark vw-100 min-vh-100 overflow-hidden">

            {/* Top Blue Header Section */}
            <div className="rounded-bottom px-4 pt-4 pb-4" style={{ backgroundColor: '#5C85D6' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    
            <div className="d-flex justify-content-start text-start gap-3 flex item-center gap-2">

            {/* Location Icon */}
            <svg className="text-white ml-10" style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>

            <div className="text-white">
                <p className="small mb-0 opacity-75">Your Location</p>  
                <div className="d-inline-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                    <span className="fw-bold fs-5 mb-0 text-nowrap">Gamuda Ai Academy</span>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="d-block flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                        </svg>
                </div>
            </div>

                {/* Profile Picture */}
                <div className="rounded-circle overflow-hidden border border-2 bg-light flex-shrink-0 d-flex ml-160" style={{ width: '48px', height: '48px', borderColor: 'rgba(255, 255, 255, 0.2) !important' }}>
                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>
            </div>
        </div>

        {/* Search Bar Section */}
        <div className="bg-white rounded px-4 py-2 shadow-sm w-230 ml-10 mr-10" style={{ minHeight: '56px' }}>
            
        {/* Search Icon */}
        <svg className="flex-shrink-0" style={{ width: '24px', height: '24px', color: '#5C85D6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    
        {/* Input Field */}
        <input 
            type="text" 
            className="form-control border-0 shadow-none bg-transparent fs-5 px-3 flex-grow-1" 
            placeholder="Search..." 
            style={{ outline: 'none', boxShadow: 'none' }}
        />
    
        {/* Right Icons Container */}
        <div className="d-flex flex-nowrap align-items-center gap-3 flex-shrink-0">
            <svg style={{ width: '24px', height: '24px', color: '#5C85D6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
            <svg style={{ width: '24px', height: '24px', color: '#5C85D6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
        </div>
    </div>
</div>  

            {/* Top Navigation Bar with Hamburger */}
            { /* <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center position-relative" style={{ zIndex: 1050 }}>
                <div className="fw-bold fs-4 text-primary">
                    KERJA <span className="fw-bold small text-primary">making every service simple</span>
                </div>
                
                {/* Hamburger Toggle Button */}
               {/*  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="btn btn-light text-secondary border-0 p-2 ms-3"
                >
                    <span className="fs-5">{isMenuOpen ? '✕' : '☰'}</span>
                </button>
            </header> */}

           {/* Categories Section */}
            <div className="px-4 mt-4">
                
                {/* Categories Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder fs-4 mb-0" style={{ color: '#4E80E6', letterSpacing: '-0.02em' }}>
                        Search by categories
                    </h2>
                    <button className="btn btn-link text-decoration-none d-flex align-items-center gap-1 fw-bold p-0" style={{ color: '#4E80E6', fontSize: '15px' }}>
                        View all 
                        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" strokeWidth="2"></circle>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 8l4 4-4 4"></path>
                        </svg>
                    </button>
                </div>

                {/* Categories Grid */}
                <div className="row g-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="col-4">
                            <div 
                                className="p-3 d-flex flex-column align-items-start border-0" 
                                style={{ 
                                    backgroundColor: '#EAF2F9', 
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    minHeight: '110px'
                                }}
                            >
                                {/* Exclamation Icon */}
                                <svg className="mb-3" width="24" height="24" fill="none" stroke="#7A848F" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 16h.01"></path>
                                </svg>
                                
                                {/* Stacked Text */}
                                <span className="fw-bolder" style={{ fontSize: '14px', lineHeight: '1.2', color: '#2C3E50' }}>
                                    Home<br />Maintenance
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area Container */}
            <main className="p-4 bg-white">
                {!activeModule ? (
                    <div className="text-center mt-2 text-secondary d-none">
                        <p className="fs-4 mb-0">Welcome back!</p>
                        <p className="small mt-2">Open the top-right menu to run an app module.</p>
                    </div>
                ) : null}

                {/* Ads carousel */}
                <AdsCarousel />
                
                {/* Opens the Voice Profile Function inside an isolated module window panel */}
                {activeModule === 'voiceProfile' && (
                    <div className="position-relative bg-white mt-4">
                        <div className="d-flex justify-content-end mb-2 mx-auto" style={{ maxWidth: '42rem' }}>
                            <button 
                                onClick={() => setActiveModule(null)} 
                                className="btn btn-outline-danger btn-sm fw-bold"
                            >
                                ✕ Close Module Window
                            </button>
                        </div>
                        <VoiceProfileModule />
                    </div>
                )}
            </main>

           {/* RECOMMENDED SECTION */}
<div className="px-4 mt-2 pb-5 mb-5">
    <h2 className="fw-bolder fs-4 mb-3" style={{ color: '#4E80E6', letterSpacing: '-0.02em' }}>
        Recommended for you
    </h2>

    {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="card border-0 shadow-sm mb-3 rounded-4 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
            
            {/* Replaced .row with an explicit flex container to prevent collapsing */}
            <div className="d-flex flex-row align-items-stretch">
                
                {/* Left Side (Image) - Locked to ~35% width */}
                <div className="flex-shrink-0" style={{ width: '35%', minHeight: '135px' }}>
                    <img 
                        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=300&auto=format&fit=crop" 
                        className="w-100 h-100" 
                        style={{ objectFit: 'cover' }} 
                        alt="Home Cleaning" 
                    />
                </div>
                
                {/* Right Side (Text) - Fills the remaining 65% of the space */}
                <div className="p-3 d-flex flex-column justify-content-center flex-grow-1 overflow-hidden" style={{ width: '65%' }}>
                    
                    <div className="d-flex align-items-baseline gap-1 mb-1 w-100">
                        {/* Added w-100 to the title to ensure text-truncate has physical space to exist */}
                        <h5 className="fw-bolder mb-0 text-dark fs-5 text-truncate w-100">Home Cleaning</h5>
                        <span className="text-secondary small flex-shrink-0">(2Pax)</span>
                    </div>
                    
                    <p className="text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Ad &bull; 2.2km (5min above)</p>
                    <p className="fw-bold text-dark mb-3">Rm25-50</p>
                    
                    <div className="d-flex align-items-center mt-auto">
                        <img src="https://i.pravatar.cc/150?img=11" className="rounded-circle me-2 flex-shrink-0" width="36" height="36" style={{ objectFit: 'cover' }} alt="Kunafa" />
                        <div className="overflow-hidden">
                            <div className="d-flex align-items-center gap-1">
                                <span className="fw-bolder text-dark text-truncate" style={{ fontSize: '0.95rem' }}>Kunafa</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#00C2FF" className="flex-shrink-0">
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            </div>
                            <div className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}>
                                <span className="text-warning me-1 fs-6">★</span>
                                <span>4.3 (277 reviews)</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    ))}
</div>

            {/* FOOTER */}
            <div className="fixed-bottom bg-white shadow border-top pt-2 pb-3" style={{ zIndex: 1050 }}>
                <div className="d-flex justify-content-around align-items-center px-2">
                    
                    <div className="text-center d-flex flex-column align-items-center" style={{ cursor: 'pointer', color: '#7A848F' }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span className="mt-1 fw-bold" style={{ fontSize: '11px' }}>Home</span>
                    </div>

                    <div className="text-center d-flex flex-column align-items-center" style={{ cursor: 'pointer', color: '#7A848F' }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="mt-1 fw-bold" style={{ fontSize: '11px' }}>Activity</span>
                    </div>

                    <div className="text-center d-flex flex-column align-items-center position-relative" style={{ cursor: 'pointer', color: '#7A848F' }}>
                        <div className="position-relative">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger border border-white border-2" style={{ padding: '3px 5px', fontSize: '9px', transform: 'translate(-30%, -30%)' }}>
                                1
                            </span>
                        </div>
                        <span className="mt-1 fw-bold" style={{ fontSize: '11px' }}>Messages</span>
                    </div>

                    <div className="text-center d-flex flex-column align-items-center" style={{ cursor: 'pointer', color: '#4E80E6' }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span className="mt-1 fw-bold" style={{ fontSize: '11px' }}>Profile</span>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default App;