'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  imageURL: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  programName: string;
  batchStatus: string;
  instructor: string;
  availableSeats: number;
  totalSeats: number;
  icon: string;
  bgGradient: string;
}

export default function FeaturedCourses() {
  const courses: Course[] = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      imageURL: 'https://vereda.co.in/build/assets/fullstack-2.dcf98972.webp',
      category: 'Web Development',
      originalPrice: 35000,
      discountedPrice: 29000,
      discountPercentage: 17,
      programName: 'Full Stack Web Development Program',
      batchStatus: 'Coming Soon',
      instructor: 'Kingsley Orji',
      availableSeats: 7,
      totalSeats: 10,
      icon: '💻',
      bgGradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Flutter App Development',
      imageURL: 'https://vereda.co.in/build/assets/Flutter-App-development.1a92db99.webp',
      category: 'Mobile Development',
      originalPrice: 45000,
      discountedPrice: 10000,
      discountPercentage: 77,
      programName: 'Flutter Development Program',
      batchStatus: 'Coming Soon',
      instructor: 'Himanshu Kumar',
      availableSeats: 9,
      totalSeats: 10,
      icon: '📱',
      bgGradient: 'from-green-500 to-teal-600'
    }
  ];

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

        {/* Courses Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100"
            >
              {/* Course Image */}
              <div className="w-full h-88 overflow-hidden">
                <img
                  src={course.imageURL}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
              <div className="p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Batch</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.batchStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Instructor</span>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                      {course.instructor
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {course.instructor}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 font-medium">
                      Available Seats
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {course.availableSeats}/{course.totalSeats}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(course.availableSeats / course.totalSeats) * 100}%`
                      }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>

                <motion.button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:scale-105 mt-6"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                <Link href="/view-courses"> Enroll Now</Link> 
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Courses Button */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="border-2 border-blue-600 text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
         <Link href="/view-courses">View All Courses</Link>   
          </button>
        </motion.div>
      </div>
    </section>
  );
}
