
import Navbar from "../../NavMenu";
import Footer from "../../FooterMain";
import TextToSpeech from "../../TextToSpeech";
import { useEffect } from "react";

const Blog4 = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    
  
    const blogContent = `
      Mindfulness Made Easy: Small Habits, Big Impact

      Mindfulness doesn't require hours of meditation. It can be cultivated through small daily practices that bring awareness to the present moment. These habits can drastically improve mental clarity, emotional health, and overall well-being.

      1. Mindful Breathing

      Taking 2–3 minutes of deep, conscious breathing throughout the day can calm the nervous system and reduce stress.

      2. Digital Detox Moments

      Stepping away from screens, even briefly, refreshes the mind and helps you reconnect with your surroundings.

      3. Gratitude Journaling

      Writing down 2–3 things you're grateful for daily shifts focus from stress to appreciation, improving positivity.

      4. AI-Guided Meditation

      AI meditation apps personalize sessions based on your emotional state, ensuring mindfulness fits smoothly into your day.

      Conclusion

      Small mindful actions compound into big life changes. With modern AI support, mindfulness has never been easier to adopt into everyday life.
    `;
    
  return (
    <>
    <Navbar/>
    <div className="max-w-[75rem] mx-auto p-6  font-poppins">
      <div className="rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src="https://img.freepik.com/free-photo/woman-meditating-with-singing-bowl-incense_23-2148847559.jpg?w=360"
          alt="Mindfulness Made Easy"
          className="w-full h-80 object-cover"
        />
      </div>

      <div className="text-sm text-gray-500 mb-4">Published on June 10, 2024</div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Mindfulness Made Easy: Small Habits, Big Impact
      </h1>

            {/* === Text-to-Speech Component === */}
      <TextToSpeech text={blogContent} title="Mindfulness Made Easy: Small Habits, Big Impact" />

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Mindfulness doesn’t require hours of meditation. It can be cultivated
        through small daily practices that bring awareness to the present
        moment. These habits can drastically improve mental clarity, emotional
        health, and overall well-being.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Mindful Breathing</h2>
      <p className="text-gray-700 mb-6">
        Taking 2–3 minutes of deep, conscious breathing throughout the day can
        calm the nervous system and reduce stress.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Digital Detox Moments</h2>
      <p className="text-gray-700 mb-6">
        Stepping away from screens, even briefly, refreshes the mind and helps
        you reconnect with your surroundings.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Gratitude Journaling</h2>
      <p className="text-gray-700 mb-6">
        Writing down 2–3 things you’re grateful for daily shifts focus from
        stress to appreciation, improving positivity.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. AI-Guided Meditation</h2>
      <p className="text-gray-700 mb-6">
        AI meditation apps personalize sessions based on your emotional state,
        ensuring mindfulness fits smoothly into your day.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Conclusion</h2>
      <p className="text-gray-700 mb-8">
        Small mindful actions compound into big life changes. With modern AI
        support, mindfulness has never been easier to adopt into everyday life.
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

export default Blog4;
