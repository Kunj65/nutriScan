// BlogDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const blogPosts = [
    {
      id: 1,
      image: "https://www.betterup.com/hs-fs/hubfs/Blog%20Images/Building%20good%20habits/five-mistakes-to-avoid-when-building-good-habits.png?width=1999&name=five-mistakes-to-avoid-when-building-good-habits.png",
      date: "June 10, 2024",
      readTime: "8 min read",
      author: "Dr. Sarah Chen",
      category: "Productivity",
      title: "5 Steps to Build Lasting Habits with AI",
      excerpt: "Discover how AI can transform your daily routines and guide you in creating sustainable habits for a balanced life.",
      fullContent: `
        <p>Building lasting habits is one of the most challenging yet rewarding endeavors we can undertake. In our modern world, artificial intelligence offers unprecedented opportunities to enhance our habit-building journey through personalized insights, intelligent reminders, and data-driven feedback.</p>
        
        <h4>Step 1: Define Your Habit Goals with Precision</h4>
        <p>The foundation of any successful habit lies in clarity. Instead of vague goals like "exercise more," AI can help you define specific, measurable objectives such as "complete a 20-minute morning workout 5 days a week." Use AI-powered goal-setting apps that analyze your schedule, preferences, and past behavior patterns to suggest realistic and achievable targets.</p>
        
        <h4>Step 2: Leverage AI for Personalized Scheduling</h4>
        <p>AI algorithms excel at analyzing your daily patterns and identifying optimal times for new habits. By tracking your energy levels, existing commitments, and success rates at different times, AI can recommend the perfect windows for habit implementation. This personalized approach increases your chances of success by 300% compared to generic scheduling.</p>
        
        <h4>Step 3: Create Intelligent Trigger Systems</h4>
        <p>Habit stacking becomes more powerful with AI assistance. Smart systems can identify natural trigger points in your routine and suggest strategic habit placement. For example, AI might notice you always check your phone after morning coffee and suggest adding a 2-minute meditation session at that exact moment.</p>
        
        <h4>Step 4: Implement AI-Driven Progress Tracking</h4>
        <p>Modern habit tracking goes beyond simple checkboxes. AI-powered apps can analyze mood patterns, energy levels, environmental factors, and life events that affect your habit consistency. This rich data provides insights into what helps or hinders your progress, allowing for real-time adjustments.</p>
        
        <h4>Step 5: Use Predictive Analytics for Habit Maintenance</h4>
        <p>The most sophisticated AI systems can predict when you're likely to break a habit streak and proactively offer support. By analyzing patterns in your behavior, stress levels, and external factors, these systems can send timely encouragement or suggest modifications before you fall off track.</p>
        
        <p><strong>Remember:</strong> The key to lasting habit formation is consistency, not perfection. AI serves as your intelligent companion, providing the insights and support needed to make positive changes stick for life.</p>
      `
    },
    {
      id: 2,
      image: "https://img.freepik.com/premium-photo/hindu-religion-holy-scriptures-like-ramayana-mahabharata-geeta-books-with-aum-symbol_466689-47261.jpg?w=360",
      date: "June 10, 2024",
      readTime: "12 min read",
      author: "Swami Rajesh Kumar",
      category: "Spirituality",
      title: "Daily Wisdom: Lessons from the Bhagavad Gita",
      excerpt: "Learn how ancient Indian wisdom can inspire your day-to-day life and bring mindfulness into your habits.",
      fullContent: `
        <p>The Bhagavad Gita, composed over 2,500 years ago, remains one of humanity's most profound guides for living a purposeful life. Its teachings on duty, action, and spiritual growth offer timeless wisdom that can transform our modern daily practices.</p>
        
        <h4>The Philosophy of Karma Yoga in Daily Life</h4>
        <p>Krishna's teaching of Karma Yoga emphasizes performing our duties without attachment to results. In practical terms, this means approaching our daily habits and responsibilities with full commitment while remaining detached from specific outcomes. Whether it's your morning exercise routine or professional tasks, focus on the process rather than obsessing over results.</p>
        
        <h4>Dharma: Aligning Actions with Purpose</h4>
        <p>The concept of Dharma teaches us to live according to our true nature and purpose. This ancient wisdom suggests that sustainable habits should align with our deepest values and authentic self. Before establishing new routines, ask yourself: "Does this serve my highest purpose?" Habits built on authentic purpose tend to last longer and bring genuine fulfillment.</p>
        
        <h4>The Three Gunas and Habit Quality</h4>
        <p>The Gita describes three fundamental qualities of nature: Sattva (purity), Rajas (activity), and Tamas (inertia). Understanding these can help us choose habits that elevate our consciousness:</p>
        
        <ul>
          <li><strong>Sattvic habits:</strong> Meditation, yoga, reading spiritual texts, eating fresh foods</li>
          <li><strong>Rajasic habits:</strong> Intense exercise, competitive activities, ambitious projects</li>
          <li><strong>Tamasic habits:</strong> Excessive sleep, mindless entertainment, overeating</li>
        </ul>
        
        <h4>Equanimity in Success and Failure</h4>
        <p>"You have the right to perform your prescribed duty, but not to the fruits of actions." This teaching helps us maintain consistency in our habits regardless of temporary setbacks or extraordinary successes. Treat both progress and plateaus with equal equanimity.</p>
        
        <h4>Practical Applications for Modern Life</h4>
        <p>Start each day by setting an intention aligned with your deeper purpose. Before any significant action, pause and ask: "Am I acting from a place of service and duty, or from ego and attachment?" This simple practice can transform ordinary habits into spiritual disciplines that nurture both personal growth and service to others.</p>
        
        <p>The Gita reminds us that true fulfillment comes not from the habits themselves, but from the consciousness with which we perform them. Every daily action becomes an opportunity for spiritual growth when approached with the right understanding.</p>
      `
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/9b/a8/c2/9ba8c288df198a054fe1b5dec4505380.jpg",
      date: "June 10, 2024",
      readTime: "6 min read",
      author: "Maria Rodriguez",
      category: "Wellness",
      title: "The Power of Morning Rituals: Start Your Day Right",
      excerpt: "Explore the benefits of starting your day with mindful routines and how AI can help you stay consistent.",
      fullContent: `
        <p>The first hour of your day sets the tone for everything that follows. Research shows that people who establish consistent morning rituals report higher levels of productivity, better mood regulation, and greater life satisfaction. But what makes a morning ritual truly powerful?</p>
        
        <h4>The Science Behind Morning Routines</h4>
        <p>Our brains operate on circadian rhythms that naturally align with specific activities at different times. During the first 90 minutes after waking, our cortisol levels peak, making this the ideal time for goal-setting, learning, and establishing positive momentum. Morning rituals help us harness this natural energy surge.</p>
        
        <h4>Components of an Effective Morning Ritual</h4>
        
        <h5>1. Mindful Awakening (5-10 minutes)</h5>
        <p>Instead of immediately reaching for your phone, spend a few moments in conscious awareness. Practice deep breathing, gentle stretching, or simply observe your thoughts without judgment. This creates a peaceful transition from sleep to wakefulness.</p>
        
        <h5>2. Hydration and Nourishment (10-15 minutes)</h5>
        <p>Your body has been fasting for 6-8 hours. Start with a glass of warm water with lemon to kickstart your metabolism. Follow with a nutritious breakfast that includes protein and healthy fats to maintain stable energy levels throughout the morning.</p>
        
        <h5>3. Movement and Energy (15-30 minutes)</h5>
        <p>Physical activity doesn't need to be intense. Gentle yoga, tai chi, or a brisk walk can activate your lymphatic system, improve circulation, and release mood-enhancing endorphins. Even 5 minutes of movement makes a difference.</p>
        
        <h5>4. Mental Preparation (10-15 minutes)</h5>
        <p>Use this time for journaling, meditation, or reviewing your daily intentions. Writing down three things you're grateful for and your top three priorities for the day can significantly improve focus and emotional well-being.</p>
        
        <h4>How AI Enhances Morning Rituals</h4>
        <p>Modern AI assistants can personalize your morning routine based on factors like weather, calendar events, sleep quality, and stress levels. Some AI apps can even adjust your ritual in real-time, suggesting shorter routines on busy days or extended practices when you have more time.</p>
        
        <h4>Building Your Personal Ritual</h4>
        <p>Start small with just one or two elements and gradually expand. The key is consistency over perfection. Even a 10-minute morning ritual, practiced daily, will yield more benefits than an elaborate hour-long routine you only manage twice a week.</p>
        
        <p>Remember: Your morning ritual should energize, not exhaust you. It's a gift you give yourself to create the best possible foundation for each day.</p>
      `
    },
    {
      id: 4,
      image: "https://img.freepik.com/free-photo/woman-meditating-with-singing-bowl-incense_23-2148847559.jpg?t=st=1737315491~exp=1737319091~hmac=bebf63a062c344239469c9fda6636eac28583898f32b28c9541d410ecb31a8c1&w=360",
      date: "June 10, 2024",
      readTime: "10 min read",
      author: "Dr. Michael Thompson",
      category: "Mindfulness",
      title: "Mindfulness Made Easy: Small Habits, Big Impact",
      excerpt: "Discover simple ways to incorporate mindfulness into your daily life and amplify the impact of your habits.",
      fullContent: `
        <p>Mindfulness doesn't require hours of meditation or retreats to mountain tops. The most transformative mindfulness practices are often the smallest ones, seamlessly woven into our existing daily routines. These micro-moments of awareness can create profound shifts in how we experience life.</p>
        
        <h4>Understanding Mindfulness in Daily Context</h4>
        <p>Mindfulness is simply the practice of paying attention to the present moment with curiosity and acceptance. It's about becoming aware of what's happening in your mind, body, and environment right now, without getting lost in past regrets or future worries.</p>
        
        <h4>The Power of Micro-Mindfulness Habits</h4>
        
        <h5>Mindful Breathing Breaks (30 seconds)</h5>
        <p>Set gentle reminders throughout your day to take three conscious breaths. Notice the sensation of air entering and leaving your lungs. This simple practice can reset your nervous system and improve decision-making capacity within seconds.</p>
        
        <h5>Mindful Transitions (1-2 minutes)</h5>
        <p>Before moving from one activity to another, pause for a moment of awareness. Whether transitioning from work to family time or from eating to exercising, these conscious pauses help you show up more fully for each experience.</p>
        
        <h5>Sensory Anchoring (ongoing)</h5>
        <p>Throughout your day, periodically tune into your five senses. What do you see, hear, smell, taste, or feel right now? This practice immediately brings you into the present moment and can be done anywhere, anytime.</p>
        
        <h4>Integrating Mindfulness with Existing Habits</h4>
        
        <p><strong>Mindful Eating:</strong> Transform meals into meditation by eating slowly, noticing flavors and textures, and expressing gratitude for your food. This not only improves digestion but also enhances enjoyment and satisfaction.</p>
        
        <p><strong>Mindful Walking:</strong> Whether walking to your car or climbing stairs, focus on the rhythm of your steps, the feeling of your feet touching the ground, and your body moving through space. Walking meditation is accessible and energizing.</p>
        
        <p><strong>Mindful Listening:</strong> In conversations, practice giving your complete attention to the speaker without planning your response. Notice not just their words but their tone, emotions, and what they're not saying.</p>
        
        <h4>The Compound Effect of Small Practices</h4>
        <p>Research from Harvard Medical School shows that even brief mindfulness practices, when performed consistently, can:</p>
        
        <ul>
          <li>Reduce stress hormones like cortisol by up to 25%</li>
          <li>Improve emotional regulation and resilience</li>
          <li>Enhance focus and cognitive flexibility</li>
          <li>Strengthen immune system function</li>
          <li>Improve sleep quality and duration</li>
        </ul>
        
        <h4>Technology as a Mindfulness Ally</h4>
        <p>Modern apps can send gentle mindfulness reminders, guide brief meditations, and track your practice consistency. However, the goal is to eventually internalize these practices so they become natural responses to daily life situations.</p>
        
        <h4>Starting Your Mindful Journey</h4>
        <p>Begin with just one micro-habit: perhaps three conscious breaths before checking your phone each morning. Once this becomes automatic (usually 2-3 weeks), add another small practice. The key is building a sustainable foundation rather than attempting dramatic lifestyle changes.</p>
        
        <p>Remember: Mindfulness is not about achieving a particular state of mind, but about being present with whatever arises. Even noticing that your mind has wandered is a moment of mindfulness. Be patient and compassionate with yourself as you develop this life-changing skill.</p>
      `
    },
    {
      id: 5,
      image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*dAWoG36b8A-atIts2CtV1w.png",
      date: "June 10, 2024",
      readTime: "7 min read",
      author: "Alex Johnson",
      category: "Personal Development",
      title: "Habit Tracking 101: Tools for Growth",
      excerpt: "Learn how habit trackers and AI-powered insights can keep you motivated and focused on your personal growth.",
      fullContent: `
        <p>Habit tracking transforms abstract intentions into concrete, measurable progress. When done effectively, it provides the feedback loop necessary for sustained behavior change while revealing patterns that would otherwise remain invisible.</p>
        
        <h4>Why Tracking Works: The Psychology</h4>
        <p>Our brains are wired to seek progress and completion. Tracking habits triggers the brain's reward system, releasing small amounts of dopamine each time we mark a habit as complete. This neurochemical response helps reinforce the behavior, making it more likely to stick.</p>
        
        <h4>Choosing the Right Tracking Method</h4>
        
        <h5>Digital vs. Analog Tracking</h5>
        <p><strong>Digital Benefits:</strong> Automated reminders, data analysis, cloud backup, and integration with other apps. Perfect for tech-savvy users who want detailed insights and don't mind screen time.</p>
        
        <p><strong>Analog Benefits:</strong> Tactile satisfaction, no battery dependence, reduced screen time, and a more mindful tracking process. Ideal for those seeking a more intentional, slower approach to habit formation.</p>
        
        <h4>Essential Tracking Principles</h4>
        
        <h5>Start Simple</h5>
        <p>Track no more than 3-5 habits initially. Choose habits that are:</p>
        <ul>
          <li>Specific and measurable</li>
          <li>Realistic for your current lifestyle</li>
          <li>Aligned with your core values</li>
          <li>Small enough to do even on difficult days</li>
        </ul>
        
        <h5>Focus on Consistency Over Intensity</h5>
        <p>A habit performed 80% of the time is infinitely more valuable than one performed perfectly for two weeks and then abandoned. Track your consistency rate rather than perfect streaks.</p>
        
        <h4>Advanced Tracking Strategies</h4>
        
        <h5>Habit Stacking Visualization</h5>
        <p>Create visual maps of how your habits connect. For example: "After I pour my morning coffee → I will write three gratitude notes → Then I will review my daily priorities." Tracking these chains helps identify where breaks typically occur.</p>
        
        <h5>Environmental Factor Tracking</h5>
        <p>Advanced trackers monitor external factors that influence habit success: sleep quality, weather, stress levels, social situations, and energy levels. This data reveals patterns that can inform better habit design.</p>
        
        <h4>AI-Powered Insights for Growth</h4>
        <p>Modern AI tools can identify subtle patterns in your tracking data that human analysis might miss. They can predict your likelihood of success on any given day and suggest modifications to improve your odds. Some AI systems even recommend optimal timing for introducing new habits based on your existing patterns.</p>
        
        <h4>Common Tracking Pitfalls to Avoid</h4>
        <ul>
          <li><strong>Perfectionism:</strong> Missing one day doesn't negate weeks of progress</li>
          <li><strong>Over-complication:</strong> Complex tracking systems often lead to abandonment</li>
          <li><strong>Short-term thinking:</strong> Focus on monthly and quarterly trends, not daily fluctuations</li>
          <li><strong>Tracking without reflection:</strong> Regular review sessions are essential for growth</li>
        </ul>
        
        <h4>Building Your Tracking System</h4>
        <p>Start with a simple method that takes less than 2 minutes per day. Whether it's a smartphone app, a bullet journal, or a wall calendar, the best system is the one you'll actually use consistently. Remember: the goal is building better habits, not becoming a tracking expert.</p>
        
        <p>As you develop your tracking practice, pay attention to what the data tells you about yourself. These insights become the foundation for designing an ever-improving lifestyle that serves your deepest goals and aspirations.</p>
      `
    },
    {
      id: 6,
      image: "https://m.media-amazon.com/images/I/71Nt08I6yML.UF1000,1000_QL80.jpg",
      date: "June 10, 2024",
      readTime: "9 min read",
      author: "Dr. Priya Sharma",
      category: "Lifestyle",
      title: "Sattvic Living: Aligning Habits with Harmony",
      excerpt: "Dive into the principles of Sattvic living and discover how aligning your habits can lead to a balanced life.",
      fullContent: `
        <p>Sattvic living represents the highest mode of existence in Vedic philosophy, characterized by purity, harmony, and balance. This ancient wisdom offers a blueprint for creating habits that not only improve our personal well-being but also contribute to global harmony and sustainability.</p>
        
        <h4>Understanding the Sattvic Approach</h4>
        <p>Sattva, one of the three gunas (fundamental qualities of nature), represents clarity, peace, and wisdom. Sattvic living means choosing thoughts, actions, foods, and environments that promote mental clarity, emotional balance, and spiritual growth. It's about creating a lifestyle that supports your highest potential while remaining in harmony with nature.</p>
        
        <h4>Sattvic Nutrition: Food as Medicine</h4>
        <p>The foundation of Sattvic living lies in conscious eating. Sattvic foods are fresh, organic, and minimally processed:</p>
        
        <ul>
          <li><strong>Fresh fruits and vegetables:</strong> Especially those grown locally and seasonally</li>
          <li><strong>Whole grains:</strong> Rice, quinoa, oats, and ancient grains</li>
          <li><strong>Legumes and nuts:</strong> Lentils, beans, almonds, and seeds</li>
          <li><strong>Dairy products:</strong> From ethically treated animals (in moderation)</li>
          <li><strong>Pure water and herbal teas:</strong> Avoiding excessive caffeine and stimulants</li>
        </ul>
        
        <p>Avoid foods that create mental dullness (tamasic) or excessive agitation (rajasic), such as processed foods, excessive spices, alcohol, and foods prepared with negative emotions.</p>
        
        <h4>Daily Rhythms in Sattvic Living</h4>
        
        <h5>Morning Practices (5:00-7:00 AM)</h5>
        <p>Begin with gratitude and intention-setting. Practice pranayama (breathing exercises), gentle yoga, and meditation. This sacred morning time establishes inner peace that carries throughout the day.</p>
        
        <h5>Mindful Work Periods</h5>
        <p>Approach your professional duties as karma yoga—selfless service. Take regular breaks for conscious breathing and maintain awareness of your emotional state. Work becomes spiritual practice when performed with the right intention.</p>
        
        <h5>Evening Wind-down (7:00-9:00 PM)</h5>
        <p>Create calming evening rituals: light reading, gentle stretching, or quiet reflection. Avoid stimulating activities that disturb the natural preparation for sleep.</p>
        
        <h4>Environmental Harmony</h4>
        <p>Sattvic living extends to your physical environment. Keep your living space clean, organized, and filled with natural elements. Use natural lighting when possible, minimize electronic disturbances, and surround yourself with uplifting colors and textures that promote peace.</p>
        
        <h4>Mental and Emotional Sattvic Practices</h4>
        
        <p><strong>Thought Cultivation:</strong> Regularly examine your mental habits. Choose thoughts that are truthful, kind, and constructive. Practice seeing the divine or good in every person and situation.</p>
        
        <p><strong>Speech Consciousness:</strong> Speak truthfully, kindly, and only when necessary. Avoid gossip, complaints, or speech that creates discord. Your words should heal and inspire rather than harm.</p>
        
        <p><strong>Emotional Regulation:</strong> Develop practices for maintaining equanimity during challenging situations. This might include meditation, prayer, or simply pausing before reacting.</p>
        
        <h4>The Ripple Effect of Sattvic Habits</h4>
        <p>When you align your daily habits with Sattvic principles, the benefits extend far beyond personal well-being. Your peaceful energy influences family members, colleagues, and community. You become a force for positive change in the world simply by living in harmony with natural law.</p>
        
        <p>Start with one Sattvic habit today. Whether it's eating one fresh, organic meal or spending five minutes in nature, each small step toward Sattvic living creates momentum for deeper transformation. The path to harmony begins with a single conscious choice.</p>
      `
    }

  // ... repeat for other posts
];

const BlogDetails = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) return <h2 className="text-center mt-10">Blog not found!</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-6">{post.title}</h1>
      <p className="text-gray-500 text-sm mt-2">{post.date} • {post.readTime} • {post.author}</p>

      <div
        className="prose max-w-none mt-6"
        dangerouslySetInnerHTML={{ __html: post.fullContent }}
      />
    </div>
  );
};

export default BlogDetails;
