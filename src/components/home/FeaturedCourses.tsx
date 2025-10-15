'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useGetAllCoursesQuery } from '../../Redux/api/coursesApi';
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from 'next/navigation';
import { Star, Clock, Users } from 'lucide-react';

// Interface based on your actual API response
interface Course {
  id: string;
  title: string;
  courseImageURL: string;
  description: string;
  price: string;
  instructorId: string;
  instructorName: string; // Added this field
  courseDuration: string;
  status: 'coming_soon' | 'live' | 'expired';
  availableSeat: number;
  courseRatings: number;
  usersLearn: number;
  createdAt: string;
  updatedAt: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced'; // Added this field
  totalSeat: number; // Added this field
}

// Extended interface for UI
interface UICourse extends Course {
  category: 'Web Development' | 'Mobile Development' | 'AI & Machine Learning';
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  programName: string;
  batchStatus: 'Coming Soon' | 'Ongoing' | 'Starting Soon' | 'Expired';
  instructor: { name: string };
  totalSeats: number;
  icon: string;
  bgGradient: string;
}

// Helper functions
const determineCategory = (course: Course): 'Web Development' | 'Mobile Development' | 'AI & Machine Learning' => {
  const title = course.title.toLowerCase();
  const description = course.description.toLowerCase();
  
  if (title.includes('flutter') || description.includes('flutter') || 
      title.includes('mobile') || description.includes('mobile') ||
      title.includes('dart') || title.includes('app')) {
    return 'Mobile Development';
  }
  
  if (title.includes('full stack') || title.includes('web') || 
      description.includes('web') || description.includes('frontend') ||
      description.includes('backend') || title.includes('javascript')) {
    return 'Web Development';
  }
  
  if (title.includes('ai') || title.includes('machine learning') || title.includes('ml') ||
      description.includes('ai') || description.includes('machine learning')) {
    return 'AI & Machine Learning';
  }
  
  return 'Web Development';
};

const calculateOriginalPrice = (discountedPrice: number): number => {
  const multiplier = 1 + (Math.random() * 0.5) + 0.3;
  return Math.round(discountedPrice * multiplier);
};

const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

const mapStatusToBatchStatus = (status: string): 'Coming Soon' | 'Ongoing' | 'Starting Soon' | 'Expired' => {
  switch (status) {
    case 'coming_soon': return 'Coming Soon';
    case 'live': return 'Ongoing';
    case 'expired': return 'Expired';
    default: return 'Starting Soon';
  }
};

const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'Web Development': return '💻';
    case 'Mobile Development': return '📱';
    case 'AI & Machine Learning': return '🤖';
    default: return '📚';
  }
};

const getCategoryGradient = (category: string): string => {
  switch (category) {
    case 'Web Development': return 'from-blue-500 to-purple-600';
    case 'Mobile Development': return 'from-green-500 to-teal-600';
    case 'AI & Machine Learning': return 'from-purple-500 to-indigo-600';
    default: return 'from-blue-500 to-cyan-600';
  }
};

export default function FeaturedCourses() {
  const { data: coursesData, isLoading, error } = useGetAllCoursesQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  console.log("Featured courses data:", coursesData);

  // Transform the API data for featured courses - ONLY SHOW 2 COURSES
  const featuredCourses: UICourse[] = [];
  
  if (coursesData && Array.isArray(coursesData)) {
    // Take only first 2 courses for featured section
    const coursesToShow = coursesData.slice(0, 2).map((course: Course): UICourse => {
      const category = determineCategory(course);
      const discountedPrice = parseFloat(course.price);
      const originalPrice = calculateOriginalPrice(discountedPrice);
      const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);
      
      // Use the actual data from API
      const totalSeats = course.totalSeat || (course.availableSeat + course.usersLearn);
      
      return {
        ...course,
        category,
        originalPrice,
        discountedPrice,
        discountPercentage,
        programName: course.title,
        batchStatus: mapStatusToBatchStatus(course.status),
        instructor: { name: course.instructorName }, // Use instructorName from API
        totalSeats, // Use totalSeat from API
        icon: getCategoryIcon(category),
        bgGradient: getCategoryGradient(category)
      };
    });
    
    featuredCourses.push(...coursesToShow);
  }

  // Handle enrollment
  const handleEnrollClick = (course: UICourse) => {
    if (!user) {
      router.push('/login?redirect=/courses');
      return;
    }

    const enrollmentData = {
      course: {
        id: course.id,
        title: course.title,
        price: course.discountedPrice,
        originalPrice: course.originalPrice,
        discountPercentage: course.discountPercentage,
        instructor: course.instructor.name,
        duration: course.courseDuration,
        image: course.courseImageURL,
        category: course.category,
        level: course.level // Use the level from API
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileURL: user.profileURL,
        phone: user.phone
      }
    };

    router.push(`/payment-page?data=${encodeURIComponent(JSON.stringify(enrollmentData))}`);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  // Loading state - show 2 skeleton cards
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-xl font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Featured Courses
            </h2>
            <h3 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Pick A Course To Get Started
            </h3>
            <div className="w-28 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
          
          {/* Skeleton Loading for 2 courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="w-full aspect-[4/3] bg-gray-300 rounded-2xl mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-300 rounded-xl mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            <p>Error loading featured courses. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // If no courses available
  if (featuredCourses.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-xl font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Featured Courses
            </h2>
            <h3 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Pick A Course To Get Started
            </h3>
            <div className="w-28 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
          
          {/* No Courses Message */}
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Featured Courses Available
              </h3>
              <p className="text-gray-600 mb-6">
                Check back later for new featured courses.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Featured Courses
          </h2>
          <h3 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-4">
            Pick A Course To Get Started
          </h3>
          <div className="w-28 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </motion.div>

        {/* Courses Grid - Only 2 courses */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100"
            >
              {/* Course Image */}
              <div className="w-full overflow-hidden rounded-2xl">
                <div className="relative w-full aspect-[4/3] group">
                  <Image
                    src={course.courseImageURL || '/api/placeholder/400/300'}
                    alt={course.title}
                    fill
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`bg-gradient-to-r ${course.bgGradient} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {course.category}
                    </span>
                  </div>
                  {/* Level Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-lg text-sm font-bold text-white ${
                      course.level === 'Beginner' 
                        ? 'bg-green-500' 
                        : course.level === 'Intermediate'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  {/* Discount Badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                      {course.discountPercentage}% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{course.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{course.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.discountPercentage}% OFF
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {course.programName}
                </p>
              </div>

              {/* Course Details */}
              <div className="p-6 space-y-4">
                {/* Rating and Duration */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">
                      {course.courseRatings} Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{course.courseDuration}</span>
                  </div>
                </div>

                {/* Batch Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Batch</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    course.status === 'live' 
                      ? 'bg-green-100 text-green-800'
                      : course.status === 'coming_soon'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {course.batchStatus}
                  </span>
                </div>

                {/* Instructor */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Instructor</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 bg-gradient-to-r ${course.bgGradient} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                      {course.instructor.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {course.instructor.name}
                    </span>
                  </div>
                </div>

                {/* Available Seats */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 font-medium">
                      Available Seats
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {course.availableSeat}/{course.totalSeats}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-2 rounded-full ${
                        course.availableSeat < 5 ? 'bg-red-500' : 
                        course.availableSeat < 10 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(course.availableSeat / course.totalSeats) * 100}%`
                      }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>

                {/* Enrollment Progress */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{course.usersLearn} students enrolled</span>
                </div>

                {/* Enroll Button */}
                <motion.button
                  onClick={() => handleEnrollClick(course)}
                  className={`w-full bg-gradient-to-r ${course.bgGradient} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105 mt-4`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={course.status !== 'live'}
                >
                  {course.status === 'live' ? 'Enroll Now' : 
                   course.status === 'coming_soon' ? 'Coming Soon' : 'Expired'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Courses Button - Only show if there are more than 2 courses available */}
        {coursesData && Array.isArray(coursesData) && coursesData.length > 2 && (
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/view-courses">
              <button className="border-2 border-blue-600 text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                View All Courses
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}