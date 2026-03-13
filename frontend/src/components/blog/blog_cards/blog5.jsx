import Navbar from "../../NavMenu";
import Footer from "../../FooterMain";
import TextToSpeech from "../../TextToSpeech"; // Adjust path as needed
import { useEffect } from "react";

const Blog5 = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const blogContent = `
      Habit Tracking 101: Tools for Growth

      Tracking habits transforms vague intentions into measurable progress. Whether you want to build fitness routines, improve sleep, or learn a new skill, the right tools make all the difference.

      1. Why Track Habits?

      Tracking builds accountability. It shows where you succeed and where adjustments are needed, making growth visible.

      2. Digital Habit Apps

      Apps like Habitica, Loop, and AI-powered trackers provide reminders, analytics, and gamified experiences for motivation.

      3. Wearable Technology

      Smartwatches and fitness bands collect real-time data, ensuring your progress is tracked effortlessly.

      4. Journaling + AI Insights

      Journaling combined with AI-powered insights helps uncover deeper behavioral patterns and optimizes routines.

      Conclusion

      Habit tracking is more than checking boxes—it's a roadmap to self-improvement. AI tools amplify this process by offering guidance, accountability, and motivation every step of the way.
    `;

  return (
    <>
    <Navbar/>
    <div className="max-w-[75rem] mx-auto p-6  font-poppins">
      <div className="rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*dAWoG36b8A-atIts2CtV1w.png"
          alt="Habit Tracking"
          className="w-full h-80 object-cover"
        />
      </div>

      <div className="text-sm text-gray-500 mb-4">Published on June 10, 2024</div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Habit Tracking 101: Tools for Growth
      </h1>

      {/* === Text-to-Speech Component === */}
      <TextToSpeech text={blogContent} title="Habit Tracking 101: Tools for Growth" />

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Tracking habits transforms vague intentions into measurable progress.
        Whether you want to build fitness routines, improve sleep, or learn a
        new skill, the right tools make all the difference.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Why Track Habits?</h2>
      <p className="text-gray-700 mb-6">
        Tracking builds accountability. It shows where you succeed and where
        adjustments are needed, making growth visible.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Digital Habit Apps</h2>
      <p className="text-gray-700 mb-6">
        Apps like Habitica, Loop, and AI-powered trackers provide reminders,
        analytics, and gamified experiences for motivation.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Wearable Technology</h2>
      <p className="text-gray-700 mb-6">
        Smartwatches and fitness bands collect real-time data, ensuring your
        progress is tracked effortlessly.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Journaling + AI Insights</h2>
      <p className="text-gray-700 mb-6">
        Journaling combined with AI-powered insights helps uncover deeper
        behavioral patterns and optimizes routines.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Conclusion</h2>
      <p className="text-gray-700 mb-8">
        Habit tracking is more than checking boxes—it's a roadmap to
        self-improvement. AI tools amplify this process by offering guidance,
        accountability, and motivation every step of the way.
      </p>

      <div className="mt-10">
        <a
          href="/blog"
          className="inline-flex items-center px-6 py-3 text-white bg-[#06D6A0] rounded-lg shadow hover:bg-gray-800 transition-colors"
        >
          ← Back to Blogs
        </a>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default Blog5;