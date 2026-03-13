import Navbar from "../../NavMenu";
import Footer from "../../FooterMain";
import TextToSpeech from "../../TextToSpeech"; // Adjust path as needed
import { useEffect } from "react";

const Blog3 = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const blogContent = `
      The Power of Morning Rituals: Start Your Day Right

      How you begin your morning often sets the tone for the entire day. A strong morning ritual helps improve focus, energy, and productivity. Combined with AI-powered tools, building these rituals has become easier and more effective than ever.

      1. Wake Up With Purpose

      Instead of hitting snooze, begin your day with intention. AI alarm apps track your sleep cycle and wake you during light sleep, helping you feel refreshed.

      2. Mindful Movement

      Stretching, yoga, or light exercise awakens the body. Fitness trackers with AI suggest personalized routines based on your energy levels.

      3. Fuel Your Mind

      Journaling or meditation helps calm the mind. AI meditation apps adapt sessions to your mood and stress levels, guiding you gently into focus.

      4. Healthy Nutrition

      A nutritious breakfast powers the day. AI-based diet planners recommend meals based on your health goals and preferences.

      Conclusion

      A consistent morning routine doesn't just make mornings better—it improves your entire day. By integrating mindful habits with AI tools, you can create a ritual that keeps you energized, focused, and balanced.
    `;

  return (
    <>
    <Navbar/>
    <div className="max-w-[75rem] mx-auto p-6  font-poppins">
      {/* === Hero Section === */}
      <div className="rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src="https://i.pinimg.com/736x/9b/a8/c2/9ba8c288df198a054fe1b5dec4505380.jpg"
          alt="Morning Rituals"
          className="w-full h-80 object-cover"
        />
      </div>

      {/* === Meta Info === */}
      <div className="text-sm text-gray-500 mb-4">Published on June 10, 2024</div>

      {/* === Title === */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        The Power of Morning Rituals: Start Your Day Right
      </h1>

      {/* === Text-to-Speech Component === */}
      <TextToSpeech text={blogContent} title="The Power of Morning Rituals: Start Your Day Right" />

      {/* === Intro === */}
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        How you begin your morning often sets the tone for the entire day. A
        strong morning ritual helps improve focus, energy, and productivity.
        Combined with AI-powered tools, building these rituals has become easier
        and more effective than ever.
      </p>

      {/* === Sections === */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Wake Up With Purpose</h2>
      <p className="text-gray-700 mb-6">
        Instead of hitting snooze, begin your day with intention. AI alarm apps
        track your sleep cycle and wake you during light sleep, helping you feel
        refreshed.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Mindful Movement</h2>
      <p className="text-gray-700 mb-6">
        Stretching, yoga, or light exercise awakens the body. Fitness trackers
        with AI suggest personalized routines based on your energy levels.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Fuel Your Mind</h2>
      <p className="text-gray-700 mb-6">
        Journaling or meditation helps calm the mind. AI meditation apps adapt
        sessions to your mood and stress levels, guiding you gently into focus.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Healthy Nutrition</h2>
      <p className="text-gray-700 mb-6">
        A nutritious breakfast powers the day. AI-based diet planners recommend
        meals based on your health goals and preferences.
      </p>

      {/* === Conclusion === */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Conclusion</h2>
      <p className="text-gray-700 mb-8">
        A consistent morning routine doesn't just make mornings better—it
        improves your entire day. By integrating mindful habits with AI tools,
        you can create a ritual that keeps you energized, focused, and
        balanced.
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

export default Blog3;