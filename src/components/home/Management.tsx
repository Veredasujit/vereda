import Image from "next/image";

export default function Management() {
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

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/30">
      <div className="container mx-auto px-4">
        {/* Featured Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              FEATURED
            </span>
          </div>
          
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-6">
            Our Featured <span className="text-blue-600">Program</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Recognized by leading media platforms for our innovative approach and excellence
          </p>

          {/* Media Logos */}
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 py-8">
            <div className="group relative">
              <div className="absolute inset-0  rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src="/images/Dainik_Bhaskar_Logo.png"
                alt="Dainik Bhaskar"
                width={140}
                height={70}
                className="relative object-contain  "
              />
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0  rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src="/images/livehindustan.svg"
                alt="Live Hindustan"
                width={140}
                height={70}
                className="relative object-contain "
              />
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
      </div>
    </section>
  );
}