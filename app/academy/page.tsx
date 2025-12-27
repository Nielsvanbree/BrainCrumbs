"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { courses } from '@/lib/course-data';
import CourseCard from '@/components/courses/CourseCard';
import { useFeatureFlags } from '@/lib/feature-flags';

export default function AcademyPage() {
  const { flags } = useFeatureFlags();
  const router = useRouter();

  useEffect(() => {
    if (!flags.showAcademy) {
      router.push('/');
    }
  }, [flags.showAcademy, router]);

  if (!flags.showAcademy) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-[var(--font-orbitron)] font-bold mb-6 text-white">
            Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-bc-blue to-bc-purple">Academy</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Structured learning paths to master the concepts shaping tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}