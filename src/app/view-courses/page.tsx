'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, Filter, X, Star, Clock, Users, BookOpen, Zap, Smartphone, Brain } from 'lucide-react';
import { useGetAllCoursesQuery } from '../../Redux/api/coursesApi'; // Update the import path

// Interface based on your actual API response
interface Course {
  id: string;
  title: string;
  courseImageURL: string;
  description: string;
  price: string; // Note: price comes as string from API
  instructorId: string;
  courseDuration: string;
  status: 'coming_soon' | 'live' | 'expired';
  availableSeat: number;
  courseRatings: number;
  usersLearn: number;
  createdAt: string;
  updatedAt: string;
}

// Extended interface for UI
interface UICourse extends Course {
  // Derived fields for UI
  category: 'Flutter' | 'AI & Machine Learning';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  programName: string;
  batchStatus: 'Coming Soon' | 'Ongoing' | 'Starting Soon' | 'Expired';
  instructor: { name: string };
  totalSeats: number;
  icon: string;
  bgGradient: string;
  popularity: 'High' | 'Medium' | 'Low';
}

// Helper functions - defined outside the component
const determineCategory = (course: Course): 'Flutter' | 'AI & Machine Learning' => {
  const title = course.title.toLowerCase();
  const description = course.description.toLowerCase();
  
  if (title.includes('flutter') || description.includes('flutter') || 
      title.includes('mobile') || description.includes('mobile') ||
      title.includes('dart')) {
    return 'Flutter';
  }
  
  if (title.includes('ai') || title.includes('machine learning') || title.includes('ml') ||
      description.includes('ai') || description.includes('machine learning') || 
      description.includes('neural') || description.includes('tensorflow') ||
      description.includes('pytorch')) {
    return 'AI & Machine Learning';
  }
  
  // Default based on common patterns in your data
  return 'Flutter';
};

const determineLevel = (course: Course): 'Beginner' | 'Intermediate' | 'Advanced' => {
  const title = course.title.toLowerCase();
  const description = course.description.toLowerCase();
  
  if (title.includes('advanced') || description.includes('advanced') ||
      description.includes('deep dive') || description.includes('mastery')) {
    return 'Advanced';
  }
  
  if (title.includes('intermediate') || description.includes('intermediate') ||
      title.includes('pro') || description.includes('proficient')) {
    return 'Intermediate';
  }
  
  return 'Beginner';
};

const getCourseTags = (course: Course): string[] => {
  const tags: string[] = [];
  const content = (course.title + ' ' + course.description).toLowerCase();
  
  // JavaScript related tags
  if (content.includes('javascript') || content.includes('js')) {
    tags.push('JavaScript');
    if (content.includes('closure')) tags.push('Closures');
    if (content.includes('async') || content.includes('await')) tags.push('Async/Await');
    if (content.includes('es6') || content.includes('esnext')) tags.push('ES6+');
  }
  
  // Flutter related tags
  if (content.includes('flutter') || content.includes('dart')) {
    tags.push('Flutter', 'Dart');
    if (content.includes('widget')) tags.push('Widgets');
    if (content.includes('ui')) tags.push('UI/UX');
  }
  
  // AI/ML related tags
  if (content.includes('ai') || content.includes('machine learning')) {
    tags.push('AI/ML');
    if (content.includes('neural')) tags.push('Neural Networks');
    if (content.includes('tensorflow')) tags.push('TensorFlow');
    if (content.includes('pytorch')) tags.push('PyTorch');
  }
  
  // Add level-based tags
  const level = determineLevel(course);
  tags.push(level);
  
  return tags.length > 0 ? tags : ['Programming', 'Development'];
};

const calculateOriginalPrice = (discountedPrice: number): number => {
  // Add 30-50% to create an "original price"
  const multiplier = 1 + (Math.random() * 0.5) + 0.3; // 30-80% markup
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

const getInstructorName = (instructorId: string): string => {
  // You'll need to implement this based on your instructor data
  // For now, return a placeholder
  const instructorNames = [
    'Himanshu Kumar', 
    'Alex Johnson', 
    'Dr. Sarah Chen', 
    'Emily Davis',
    'Raj Patel'
  ];
  return instructorNames[Math.floor(Math.random() * instructorNames.length)];
};

const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'Flutter': return '📱';
    case 'AI & Machine Learning': return '🤖';
    default: return '📚';
  }
};

const getCategoryGradient = (category: string): string => {
  switch (category) {
    case 'Flutter': return 'from-green-500 to-teal-600';
    case 'AI & Machine Learning': return 'from-purple-500 to-indigo-600';
    default: return 'from-blue-500 to-cyan-600';
  }
};

const calculatePopularity = (course: Course): 'High' | 'Medium' | 'Low' => {
  if (course.usersLearn > 100 || course.courseRatings > 4.5) return 'High';
  if (course.usersLearn > 50 || course.courseRatings > 4.0) return 'Medium';
  return 'Low';
};

export default function ViewCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Flutter' | 'AI & Machine Learning'>('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'coming_soon' | 'live' | 'expired'>('All');

  // Use the RTK Query hook to fetch courses
  const { data: coursesData, isLoading, error } = useGetAllCoursesQuery();

  console.log("my course data are ", coursesData);

  // Transform the API data to match the component's needs
  const courses: UICourse[] = useMemo(() => {
    if (!coursesData || !Array.isArray(coursesData)) {
      console.log("No courses data or invalid format");
      return [];
    }
    
    console.log("Processing courses:", coursesData);

    return coursesData.map((course: Course) => {
      // Determine category based on title or description
      const category = determineCategory(course);
      
      // Determine level based on course content
      const level = determineLevel(course);
      
      // Get tags based on course content
      const tags = getCourseTags(course);
      
      // Calculate pricing (you might want to adjust this logic)
      const discountedPrice = parseFloat(course.price);
      const originalPrice = calculateOriginalPrice(discountedPrice);
      const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);
      
      // Calculate total seats (available + enrolled)
      const totalSeats = course.availableSeat + course.usersLearn;
      
      return {
        ...course,
        category,
        level,
        tags,
        originalPrice,
        discountedPrice,
        discountPercentage,
        programName: course.title,
        batchStatus: mapStatusToBatchStatus(course.status),
        instructor: { name: getInstructorName(course.instructorId) },
        totalSeats,
        icon: getCategoryIcon(category),
        bgGradient: getCategoryGradient(category),
        popularity: calculatePopularity(course)
      };
    });
  }, [coursesData]);

  const categories = ['All', 'Flutter', 'AI & Machine Learning'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const statuses = ['All', 'coming_soon', 'live', 'expired'] as const;

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];

    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      const matchesStatus = selectedStatus === 'All' || course.status === selectedStatus;
      const matchesPrice = course.discountedPrice >= priceRange[0] && course.discountedPrice <= priceRange[1];

      return matchesSearch && matchesCategory && matchesLevel && matchesStatus && matchesPrice;
    });

    // Sort courses
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.courseRatings - a.courseRatings);
        break;
      case 'duration':
        filtered.sort((a, b) => {
          const aDuration = parseInt(a.courseDuration) || 0;
          const bDuration = parseInt(b.courseDuration) || 0;
          return aDuration - bDuration;
        });
        break;
      case 'seats':
        filtered.sort((a, b) => a.availableSeat - b.availableSeat);
        break;
      default:
        // Popular (default)
        filtered.sort((a, b) => {
          const popularityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return popularityOrder[b.popularity] - popularityOrder[a.popularity];
        });
    }

    return filtered;
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedStatus, priceRange, sortBy]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedStatus('All');
    setPriceRange([0, 50000]);
    setSortBy('popular');
  };

  const activeFilterCount = [
    searchTerm,
    selectedCategory !== 'All',
    selectedLevel !== 'All',
    selectedStatus !== 'All',
    priceRange[0] > 0 || priceRange[1] < 50000
  ].filter(Boolean).length;

  const getCategoryIconComponent = (category: string) => {
    switch (category) {
      case 'Flutter':
        return <Smartphone className="w-5 h-5" />;
      case 'AI & Machine Learning':
        return <Brain className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'coming_soon':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplayText = (status: string) => {
    switch (status) {
      case 'live': return 'Ongoing';
      case 'coming_soon': return 'Coming Soon';
      case 'expired': return 'Expired';
      default: return status;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading courses...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            <p>Error loading courses. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Specialized Programs
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Flutter & AI Courses
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Master mobile development with Flutter and dive into Artificial Intelligence with our expert-led programs
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 to-purple-600 rounded-full mx-auto"></div>
        </motion.div>

        {/* Quick Category Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.category === 'Flutter').length}
                </h4>
                <p className="text-gray-600">Flutter Courses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.category === 'AI & Machine Learning').length}
                </h4>
                <p className="text-gray-600">AI & ML Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">
                  {courses.reduce((acc, course) => acc + course.usersLearn, 0)}
                </h4>
                <p className="text-gray-600">Students Enrolled</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-4 z-10 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Input */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Flutter or AI courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Toggle and Sort */}
            <div className="flex gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Shortest Duration</option>
                <option value="seats">Fewest Seats Left</option>
              </select>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technology
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Batch Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Batch Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'live' ? 'Ongoing' : 
                         status === 'coming_soon' ? 'Coming Soon' : 
                         status === 'expired' ? 'Expired' : 'All'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
            {activeFilterCount > 0 && ' (filtered)'}
          </p>
          
          {/* Quick Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.filter(cat => cat !== 'All').map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? category === 'Flutter'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-purple-100 text-purple-800 border border-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryIconComponent(category)}
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-200"
                whileHover={{ y: -5 }}
              >
                {/* Course Image with Badges */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.courseImageURL || '/api/placeholder/400/200'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`bg-gradient-to-r ${course.bgGradient} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {course.level}
                    </span>
                    <span className={`${getStatusColor(course.status)} px-3 py-1 rounded-full text-sm font-semibold`}>
                      {getStatusDisplayText(course.status)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                      {course.discountPercentage}% OFF
                    </span>
                  </div>
                  
                  {/* Category Ribbon */}
                  <div className={`absolute bottom-4 left-4 ${
                    course.category === 'Flutter' 
                      ? 'bg-green-500' 
                      : 'bg-purple-500'
                  } text-white px-3 py-1 rounded-r-lg text-sm font-semibold`}>
                    {course.category}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Category and Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getCategoryIconComponent(course.category)}
                      <span className={`text-sm font-semibold ${
                        course.category === 'Flutter' ? 'text-green-600' : 'text-purple-600'
                      }`}>
                        {course.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {course.courseRatings}
                      </span>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 bg-gradient-to-r ${
                      course.category === 'Flutter' 
                        ? 'from-green-500 to-teal-600' 
                        : 'from-purple-500 to-indigo-600'
                    } rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                      {course.instructor.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {course.instructor.name}
                    </span>
                  </div>

                  {/* Course Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.courseDuration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.availableSeat} seats left • {course.usersLearn} enrolled</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {course.tags && course.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {course.tags.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{course.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Seats Filled</span>
                      <span className="font-semibold text-gray-800">
                        {Math.round(((course.totalSeats - course.availableSeat) / course.totalSeats) * 100)}%
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
                          width: `${((course.totalSeats - course.availableSeat) / course.totalSeats) * 100}%`
                        }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Pricing and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{course.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <motion.button
                      className={`font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300 ${
                        course.category === 'Flutter'
                          ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white'
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // No Results State
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {courses.length === 0 ? 'No courses available' : 'No courses found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {courses.length === 0 
                  ? 'Check back later for new Flutter and AI courses.' 
                  : 'Try adjusting your search criteria or filters to find more courses.'}
              </p>
              {courses.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-green-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-green-700 hover:to-purple-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredCourses.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="border-2 border-blue-600 text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
              Load More Courses
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}