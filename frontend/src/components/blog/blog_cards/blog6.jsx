import Navbar from "../../NavMenu";
import Footer from "../../FooterMain";
import TextToSpeech from "../../TextToSpeech"; // Adjust path as needed
import { useEffect } from "react";

const Blog6 = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const blogContent = `
      Sattvic Living: Aligning Habits with Harmony

      Rooted in ancient Indian philosophy, the sattvic lifestyle emphasizes purity, balance, and harmony. By adopting sattvic habits, you nurture both body and mind, leading to peace, clarity, and vitality.

      1. Sattvic Diet

      Fresh fruits, vegetables, whole grains, and nuts nourish the body while keeping the mind calm and alert.

      2. Daily Discipline

      Waking up early, practicing yoga, and meditating align you with natural rhythms, fostering inner peace.

      3. Positive Thinking

      Sattvic living emphasizes purity of thought—kindness, compassion, and gratitude as daily practices.

      4. AI as a Modern Aid

      AI tools can help track meditation, suggest healthy recipes, and ensure your lifestyle remains consistent, bridging tradition with technology.

      Conclusion

      Living sattvically is not about rigid rules—it's about aligning habits with harmony and balance. With the help of AI, this ancient lifestyle can be adapted seamlessly into modern living.
    `;

  return (

    <>
    <Navbar/>

    <div className="max-w-[75rem] mx-auto p-6  font-poppins">
      <div className="rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src="https://m.media-amazon.com/images/I/71Nt08I6yML.UF1000,1000_QL80.jpg"
          alt="Sattvic Living"
          className="w-full h-80 object-cover"
        />
      </div>

      <div className="text-sm text-gray-500 mb-4">Published on June 10, 2024</div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Sattvic Living: Aligning Habits with Harmony
      </h1>

      {/* === Text-to-Speech Component === */}
      <TextToSpeech text={blogContent} title="Sattvic Living: Aligning Habits with Harmony" />

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Rooted in ancient Indian philosophy, the sattvic lifestyle emphasizes
        purity, balance, and harmony. By adopting sattvic habits, you nurture
        both body and mind, leading to peace, clarity, and vitality.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Sattvic Diet</h2>
      <p className="text-gray-700 mb-6">
        Fresh fruits, vegetables, whole grains, and nuts nourish the body while
        keeping the mind calm and alert.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Daily Discipline</h2>
      <p className="text-gray-700 mb-6">
        Waking up early, practicing yoga, and meditating align you with natural
        rhythms, fostering inner peace.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Positive Thinking</h2>
      <p className="text-gray-700 mb-6">
        Sattvic living emphasizes purity of thought—kindness, compassion, and
        gratitude as daily practices.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. AI as a Modern Aid</h2>
      <p className="text-gray-700 mb-6">
        AI tools can help track meditation, suggest healthy recipes, and ensure
        your lifestyle remains consistent, bridging tradition with technology.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Conclusion</h2>
      <p className="text-gray-700 mb-8">
        Living sattvically is not about rigid rules—it's about aligning habits
        with harmony and balance. With the help of AI, this ancient lifestyle
        can be adapted seamlessly into modern living.
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

export default Blog6;