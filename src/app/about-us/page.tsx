// app/about/page.tsx
"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const AboutPage = () => {
   const [isLoading, setIsLoading] = useState(true);
   const teamMembers = [
    {
      name: "Himanshu Kumar",
      role: "Founder",
      qualification: "B. Tech (PTU)",
      image: "/images/Pictures-2.png"
    },
    {
      name: "Hermant Kumar",
      role: "Co-Founder",
      qualification: "B-tech (PTU)",
      image: "/images/Hermant-kumar.webp"
    }
  ];
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const values = [
    {
      title: "Quality",
      description: "Providing high-quality training and education that prepares individuals for the workforce and help them succeed in their careers.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Accessibility",
      description: "Making education the training accessible to all individuals, regardless of their background or financial situation.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Impact",
      description: "Making a positive impact on the communities and industries it serves by connecting graduates with employment opportunities.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "Using cutting-edge technology and pedagogy for training and education.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Student-centricity",
      description: "Putting the needs and goals of the students first and providing them with personalised support and guidance.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Sustainability",
      description: "Creating a sustainable business model that benefits students, employers, and the company itself.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Collaboration",
      description: "Building partnerships with employers, educational institutions, and other organisations to provide students with a comprehensive education and a smooth transition to the workforce.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <header className="text-center mb-16">
            <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
              ABOUT VEREDA DIGITAL LEARNING
            </h1>
            <p className="text-xl md:text-xl text-blue-600 font-semibold">
              Good Qualification Services And Better Skills
            </p>
          </header>

          {/* Main Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Empowering Learners Through <span className='text-blue-600'>Modern Tech Education</span> 
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-prose">
                We provide digital academic studies and live classes that empower learners through
                rigorous, specialized training. Our mission is to revolutionize tech education in India —
                focusing on outcomes and skills over degrees and certificates.
              </p>

              {/* Image Collage */}
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/images/aboutus.jpg"
                  width={400}
                  height={400}
                  alt="About us 1"
                  className="rounded-2xl shadow-md object-cover w-full h-60"
                />
                <Image
                  src="/images/aboutus2.jpg"
                  width={400}
                  height={400}
                  alt="About us 2"
                  className="rounded-2xl shadow-md object-cover w-full h-60"
                />
              </div>

              {/* Experience Badge */}
              <div className="bg-blue-50 rounded-xl shadow-sm p-6 inline-block text-center">
                <div className="text-4xl font-bold text-blue-600">30+</div>
                <div className="text-gray-700 font-medium">Years of Experience</div>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-8">
              {[
                {
                  title: "Skilled Instructors",
                  desc: "Our instructors are equipped with tools and skills to help you master what you love.",
                  color: "blue",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  )
                },
                {
                  title: "Get Certificate",
                  desc: "Complete all courses in the program and earn a professional certificate — plus access to career support resources.",
                  color: "green",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )
                },
                {
                  title: "Online Classes",
                  desc: "All our programs are online-based — study from anywhere at your own comfort and pace.",
                  color: "purple",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  )
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-start space-x-4"
                >
                  <div className={`bg-${feature.color}-100 p-3 rounded-full`}>
                    <svg
                      className={`w-6 h-6 text-${feature.color}-600`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}

  

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
  {/* Enhanced Header Section */}
  <header className="text-center mb-20 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
    <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-6">
      About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Vereda</span>
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Empowering learners through <span className="font-semibold text-blue-600">skill-based education</span> and real-world career connections.
    </p>
    
    {/* Animated decoration */}
    <div className="flex justify-center mt-8 space-x-2">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: `${dot * 0.2}s` }}
        ></div>
      ))}
    </div>
  </header>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
    
    {/* Enhanced Mission Section */}
    <div className="space-y-12">
      <div className="relative">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight relative z-10">
          Our Mission
          <span className="block w-20 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-3"></span>
        </h2>
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-xl opacity-60 -z-10"></div>
      </div>

      {/* Enhanced Mission Card */}
      <div className='text-gray-800 rounded-xl overflow-hidden shadow-2xl p-5'>
        <p>Focus on providing high-quality training and education to help individuals to develope the skill
           they need to succeed in the workforce. Connecting graduate with employment opportunities and
            helping to bridge the gap between education and employment.</p>
           <p>Connecting graduates with employment opportunities and helping to bridge the gap between
           education and employement.</p>
      </div>

      {/* Enhanced Image Section */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="/images/aboutus3.jpg"
            alt="Our Mission at Vereda"
            width={600}
            height={400}
            className="w-full h-80 lg:h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-6 left-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-white font-semibold text-lg">Building Future Leaders</p>
            <p className="text-blue-200 text-sm">Since 2015</p>
          </div>
        </div>
      </div>
    </div>

    {/* Enhanced Values Section */}
    <div className="space-y-12">
      <div className="relative">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight relative z-10">
          Our Values
          <span className="block w-20 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-3"></span>
        </h2>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full blur-xl opacity-60 -z-10"></div>
      </div>

      {/* Enhanced Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {values.map((value, index) => (
          <div
            key={index}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div
                  className={`flex-shrink-0 p-3 rounded-xl transform group-hover:scale-110 transition-transform duration-300 ${
                    [
                      'bg-blue-50 text-blue-600 border border-blue-100',
                      'bg-green-50 text-green-600 border border-green-100',
                      'bg-purple-50 text-purple-600 border border-purple-100',
                      'bg-yellow-50 text-yellow-600 border border-yellow-100',
                      'bg-pink-50 text-pink-600 border border-pink-100',
                      'bg-indigo-50 text-indigo-600 border border-indigo-100',
                      'bg-orange-50 text-orange-600 border border-orange-100',
                    ][index % 7]
                  }`}
                >
                  {value.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                    {value.description}
                  </p>
                </div>
              </div>
              
              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500 rounded-b-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    </div>

     

       {/* Management Team Section */}
              <div className="text-center">
                <div className="inline-block mb-4">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Meet Our Leaders
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Management <span className="text-blue-600">Team</span>
                </h3>
                
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                  Driven by visionary leadership and technical expertise to deliver exceptional results
                </p>
      
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {teamMembers.map((member, index) => (
                    <div 
                      key={index}
                      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-100"
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl"></div>
                      
                      {/* Image container with enhanced styling */}
                      <div className="relative mb-6">
                        <div className="w-42 h-42 mx-auto relative">
                          {/* Gradient border */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 transform group-hover:scale-105 transition-transform duration-300">
                            <div className="w-full h-full bg-white rounded-full p-1">
                              <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden">
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* Role badge */}
                          {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-normal shadow-lg">
                              {member.role}
                            </span>
                          </div> */}
                        </div>
                      </div>
      
                      {/* Content */}
                      <div className="pt-4">
                        <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {member.name}
                        </h4>
                        
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          </svg>
                          <span>{member.role}</span>
                          <span className="font-medium">{member.qualification}</span>
                        </div>
      
                        
                      </div>
                    </div>
                  ))}
                </div>
              </div>

      {/* Partner Companies */}
      <section className="py-16  text-white">
        {/* Mentor Associates Section */}
                <div className="text-center mb-20">
                  <div className="mb-4" data-aos="fade-up">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                      OUR MENTOR ASSOCIATES
                    </span>
                    <h2 
                      id="mentor-success-heading"
                      className="text-3xl md:text-3xl font-bold text-gray-900 mt-4 mb-4 leading-tight"
                    >
                      Join Our Premier <span className="text-blue-600">Mentor Community</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      Learn from industry experts at leading companies worldwide
                    </p>
                  </div>
        
                  {/* Mentor Logos Grid */}
                  <div 
                    className="flex justify-center items-center mt-12"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100">
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-3xl animate-pulse">
                          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <Image
                        src="/images/mentor-community-companies.png"
                        alt="Our partner companies including Dainik Bhaskar and other industry leaders"
                        width={800}
                        height={400}
                        className={`relative object-contain transition-opacity duration-300 ${
                          isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={handleImageLoad}
                        priority
                      />
                    </div>
                  </div>
                </div>
      </section>

      
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Value Item Component
const ValueItem = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
    <h4 className="font-semibold text-lg text-indigo-600 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Team Member Component
const TeamMember = ({ name, role, qualification }: { name: string; role: string; qualification: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow duration-300">
    <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span className="text-2xl text-indigo-600 font-bold">
        {name.split(' ').map(n => n[0]).join('')}
      </span>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
    <p className="text-indigo-600 font-medium mb-1">{role}</p>
    <p className="text-gray-500 text-sm">{qualification}</p>
  </div>
);

export default AboutPage;