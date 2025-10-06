'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, Filter, X, Star, Clock, Users, BookOpen, Zap, Smartphone, Brain } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  imageURL: string;
  category: 'Flutter' | 'AI & Machine Learning';
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  programName: string;
  batchStatus: 'Coming Soon' | 'Ongoing' | 'Starting Soon';
  instructor: string;
  availableSeats: number;
  totalSeats: number;
  icon: string;
  bgGradient: string;
  rating: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  popularity: 'High' | 'Medium' | 'Low';
}

export default function ViewCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Flutter' | 'AI & Machine Learning'>('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const courses: Course[] = [
    {
      id: 1,
      title: 'Flutter Mobile Development Pro',
      imageURL: 'https://vereda.co.in/build/assets/Flutter-App-development.1a92db99.webp',
      category: 'Flutter',
      originalPrice: 45000,
      discountedPrice: 10000,
      discountPercentage: 77,
      programName: 'Flutter Development Master Program',
      batchStatus: 'Coming Soon',
      instructor: 'Himanshu Kumar',
      availableSeats: 9,
      totalSeats: 10,
      icon: '📱',
      bgGradient: 'from-green-500 to-teal-600',
      rating: 4.6,
      duration: '10 weeks',
      level: 'Beginner',
      tags: ['Dart', 'Flutter', 'Firebase', 'UI/UX', 'REST API', 'State Management'],
      popularity: 'High'
    },
    {
      id: 2,
      title: 'Advanced Flutter with Firebase',
      imageURL: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500',
      category: 'Flutter',
      originalPrice: 35000,
      discountedPrice: 25000,
      discountPercentage: 28,
      programName: 'Advanced Flutter Development',
      batchStatus: 'Ongoing',
      instructor: 'Alex Johnson',
      availableSeats: 3,
      totalSeats: 12,
      icon: '🔥',
      bgGradient: 'from-orange-500 to-red-600',
      rating: 4.8,
      duration: '8 weeks',
      level: 'Intermediate',
      tags: ['Firebase', 'Cloud Firestore', 'Authentication', 'Cloud Functions'],
      popularity: 'High'
    },
    {
      id: 3,
      title: 'AI & Machine Learning Fundamentals',
      imageURL: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500',
      category: 'AI & Machine Learning',
      originalPrice: 50000,
      discountedPrice: 35000,
      discountPercentage: 30,
      programName: 'AI Machine Learning Professional Program',
      batchStatus: 'Ongoing',
      instructor: 'Dr. Sarah Chen',
      availableSeats: 5,
      totalSeats: 15,
      icon: '🤖',
      bgGradient: 'from-purple-500 to-indigo-600',
      rating: 4.9,
      duration: '16 weeks',
      level: 'Intermediate',
      tags: ['Python', 'TensorFlow', 'Neural Networks', 'Data Analysis'],
      popularity: 'High'
    },
    {
      id: 4,
      title: 'Deep Learning Specialization',
      imageURL: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500',
      category: 'AI & Machine Learning',
      originalPrice: 60000,
      discountedPrice: 42000,
      discountPercentage: 30,
      programName: 'Deep Learning Advanced Program',
      batchStatus: 'Starting Soon',
      instructor: 'Dr. Michael Rodriguez',
      availableSeats: 8,
      totalSeats: 15,
      icon: '🧠',
      bgGradient: 'from-blue-500 to-cyan-600',
      rating: 4.7,
      duration: '14 weeks',
      level: 'Advanced',
      tags: ['PyTorch', 'CNN', 'RNN', 'Computer Vision', 'NLP'],
      popularity: 'Medium'
    },
    {
      id: 5,
      title: 'Flutter UI/UX Masterclass',
      imageURL: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500',
      category: 'Flutter',
      originalPrice: 28000,
      discountedPrice: 19000,
      discountPercentage: 32,
      programName: 'Flutter UI/UX Design Program',
      batchStatus: 'Starting Soon',
      instructor: 'Emily Davis',
      availableSeats: 12,
      totalSeats: 20,
      icon: '🎨',
      bgGradient: 'from-pink-500 to-rose-600',
      rating: 4.5,
      duration: '6 weeks',
      level: 'Beginner',
      tags: ['UI Design', 'Animations', 'Custom Widgets', 'Material Design'],
      popularity: 'Medium'
    },
    {
      id: 6,
      title: 'AI for Mobile Apps',
      imageURL: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500',
      category: 'AI & Machine Learning',
      originalPrice: 40000,
      discountedPrice: 28000,
      discountPercentage: 30,
      programName: 'AI Integration in Mobile Applications',
      batchStatus: 'Coming Soon',
      instructor: 'Raj Patel',
      availableSeats: 15,
      totalSeats: 20,
      icon: '📲',
      bgGradient: 'from-yellow-500 to-orange-600',
      rating: 4.4,
      duration: '12 weeks',
      level: 'Intermediate',
      tags: ['ML Kit', 'TensorFlow Lite', 'Mobile AI', 'On-device ML'],
      popularity: 'Medium'
    }
  ];

  const categories = ['All', 'Flutter', 'AI & Machine Learning'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const statuses = ['All', 'Coming Soon', 'Ongoing', 'Starting Soon'];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      const matchesStatus = selectedStatus === 'All' || course.batchStatus === selectedStatus;
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
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case 'seats':
        filtered.sort((a, b) => a.availableSeats - b.availableSeats);
        break;
      default:
        // Popular (default)
        filtered.sort((a, b) => {
          const popularityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return popularityOrder[b.popularity] - popularityOrder[a.popularity];
        });
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedLevel, selectedStatus, priceRange, sortBy]);

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

  const getCategoryIcon = (category: string) => {
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
      case 'Ongoing':
        return 'bg-green-100 text-green-800';
      case 'Starting Soon':
        return 'bg-blue-100 text-blue-800';
      case 'Coming Soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
                  {courses.reduce((acc, course) => acc + (course.totalSeats - course.availableSeats), 0)}
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
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status}
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
                {getCategoryIcon(category)}
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
                    src={course.imageURL}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`bg-gradient-to-r ${course.bgGradient} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {course.level}
                    </span>
                    <span className={`${getStatusColor(course.batchStatus)} px-3 py-1 rounded-full text-sm font-semibold`}>
                      {course.batchStatus}
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
                      {getCategoryIcon(course.category)}
                      <span className={`text-sm font-semibold ${
                        course.category === 'Flutter' ? 'text-green-600' : 'text-purple-600'
                      }`}>
                        {course.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  {/* Title and Instructor */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.programName}
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 bg-gradient-to-r ${
                      course.category === 'Flutter' 
                        ? 'from-green-500 to-teal-600' 
                        : 'from-purple-500 to-indigo-600'
                    } rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                      {course.instructor
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {course.instructor}
                    </span>
                  </div>

                  {/* Course Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.availableSeats}/{course.totalSeats} seats</span>
                    </div>
                  </div>

                  {/* Tags */}
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

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Seats Filled</span>
                      <span className="font-semibold text-gray-800">
                        {Math.round(((course.totalSeats - course.availableSeats) / course.totalSeats) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-2 rounded-full ${
                          course.availableSeats < 5 ? 'bg-red-500' : 
                          course.availableSeats < 10 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${((course.totalSeats - course.availableSeats) / course.totalSeats) * 100}%`
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
                No courses found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more Flutter or AI courses.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-green-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-green-700 hover:to-purple-700 transition-colors"
              >
                Clear All Filters
              </button>
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