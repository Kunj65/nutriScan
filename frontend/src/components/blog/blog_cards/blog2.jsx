import Navbar from "../../NavMenu";
import Footer from "../../FooterMain";
import TextToSpeech from "../../TextToSpeech"; // Adjust path as needed
import { useEffect } from "react";

const Blog2 = () => {
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  
  const blogContent = `
    Daily Wisdom: Lessons from the Bhagavad Gita
    
    The Bhagavad Gita, one of the most profound texts of Indian philosophy, offers timeless wisdom that extends beyond religion or culture. It addresses the eternal struggles of life—duty, morality, discipline, and self-realization. In this article, we'll explore some of the Gita's lessons and how we can apply them in our daily lives for greater clarity, balance, and peace.

    1. Duty Over Desire (Karma Yoga)

    One of the central teachings of the Gita is the importance of doing our duty (karma) without being attached to the results. In daily life, this means focusing on effort rather than obsessing over outcomes. Whether at work, in relationships, or in personal growth, consistency in action is what leads to long-term fulfillment.

    2. Balance and Self-Control

    The Gita emphasizes moderation in all aspects of life. Balance in food, sleep, work, and rest is essential to maintain physical and mental well-being. In our fast-paced world, applying this lesson helps us avoid burnout and stay grounded in our routines.

    3. Mind Over Emotions

    Krishna advises Arjuna to rise above fear, anger, and attachment. Similarly, we can train our minds to respond calmly to challenges rather than react impulsively. Practicing mindfulness and meditation are modern-day tools aligned with this ancient wisdom.

    4. Selfless Service

    Serving others without expecting rewards brings inner satisfaction and builds meaningful connections. Small acts of kindness—helping a colleague, volunteering, or supporting family—embody this teaching and make our lives richer.

    5. The Path of Self-Realization

    Ultimately, the Gita teaches that true peace comes from knowing ourselves. By understanding our inner nature and connecting with our higher purpose, we rise above temporary struggles and live a life of meaning and fulfillment.

    Conclusion

    The Bhagavad Gita is more than an ancient scripture—it's a guide to living consciously. By applying its lessons of discipline, balance, service, and mindfulness, we can navigate the modern world with wisdom and strength. Start small by adopting one principle today, and let it transform the way you live, think, and act.
  `;
  
  return (
    <>
    <Navbar/>

    <div className="max-w-[75rem] mx-auto p-6  font-poppins">
      {/* === Hero Section === */}
      <div className="rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src="https://img.freepik.com/premium-photo/hindu-religion-holy-scriptures-like-ramayana-mahabharata-geeta-books-with-aum-symbol_466689-47261.jpg?w=360"
          alt="Bhagavad Gita Wisdom"
          className="w-full h-80 object-cover"
        />
      </div>

      {/* === Meta Information === */}
      <div className="text-sm text-gray-500 mb-4">Published on June 10, 2024</div>

      {/* === Title === */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Daily Wisdom: Lessons from the Bhagavad Gita
      </h1>

      {/* === Text-to-Speech Component === */}
      <TextToSpeech text={blogContent} title="Daily Wisdom: Lessons from the Bhagavad Gita" />

      {/* === Intro === */}
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        The <span className="font-semibold">Bhagavad Gita</span>, one of the
        most profound texts of Indian philosophy, offers timeless wisdom that
        extends beyond religion or culture. It addresses the eternal struggles
        of life—duty, morality, discipline, and self-realization. In this
        article, we'll explore some of the Gita's lessons and how we can apply
        them in our daily lives for greater clarity, balance, and peace.
      </p>

      {/* === Lesson 1 === */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        1. Duty Over Desire (Karma Yoga)
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        One of the central teachings of the Gita is the importance of doing our
        duty (karma) without being attached to the results. In daily life, this
        means focusing on effort rather than obsessing over outcomes. Whether at
        work, in relationships, or in personal growth, consistency in action is
        what leads to long-term fulfillment.
      </p>

      {/* === Lesson 2 === */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        2. Balance and Self-Control
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        The Gita emphasizes moderation in all aspects of life. Balance in food,
        sleep, work, and rest is essential to maintain physical and mental
        well-being. In our fast-paced world, applying this lesson helps us avoid
        burnout and stay grounded in our routines.
      </p>

      {/* === Lesson 3 === */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        3. Mind Over Emotions
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Krishna advises Arjuna to rise above fear, anger, and attachment.
        Similarly, we can train our minds to respond calmly to challenges rather
        than react impulsively. Practicing mindfulness and meditation are
        modern-day tools aligned with this ancient wisdom.
      </p>

      {/* === Lesson 4 === */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        4. Selfless Service
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Serving others without expecting rewards brings inner satisfaction and
        builds meaningful connections. Small acts of kindness—helping a
        colleague, volunteering, or supporting family—embody this teaching and
        make our lives richer.
      </p>

      {/* === Lesson 5 === */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        5. The Path of Self-Realization
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Ultimately, the Gita teaches that true peace comes from knowing
        ourselves. By understanding our inner nature and connecting with our
        higher purpose, we rise above temporary struggles and live a life of
        meaning and fulfillment.
      </p>

      {/* === Conclusion === */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Conclusion</h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        The Bhagavad Gita is more than an ancient scripture—it's a guide to
        living consciously. By applying its lessons of discipline, balance,
        service, and mindfulness, we can navigate the modern world with wisdom
        and strength. Start small by adopting one principle today, and let it
        transform the way you live, think, and act.
      </p>

      {/* === Back Button === */}
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

export default Blog2;