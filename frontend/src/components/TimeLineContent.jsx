import React from "react";
// import Image from "next/image"; 
import { Timeline } from "./ui/timeline";
import { Cover } from './ui/cover';

const data = [
  {
    title: "Input Your Goals",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-medium mb-8">
            Everything starts with a vision for a healthier life. Whether your goal is mindful eating, consistent hydration, improved sleep, or daily activity, NutriScan helps you define routines tailored to your lifestyle. Our platform captures your dietary preferences, time schedules, and health priorities as the foundation of your personalized wellness roadmap.        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://files.realpython.com/media/Interfaces-in-Python_Watermarked.f9ce5bda238c.jpg"
            alt="Input goals interface"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-flat-our-mission-concept_23-2149065168.jpg?t=st=1737316110~exp=1737319710~hmac=21129016cdb046a6057c974ba2649a935ac47b2533261684b292c8d1a9bc009d&w=740"
            alt="Personalized goals"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Analyze Your Behavior",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-medium mb-8">
          NutriScan goes beyond basic tracking. Our integrated AI continuously monitors your food intake, activity logs, and habit patterns. By identifying inconsistencies, triggers, and motivational dips, it delivers personalized insights to help you bridge the gap between intention and action.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://img.freepik.com/free-vector/business-analytics-concept-illustration_114360-3268.jpg?semt=ais_hybrid"
            alt="Behavior analysis"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://i.pinimg.com/736x/d6/84/df/d684dfce7e3fb35dc0f120a54dda2348.jpg"
            alt="Pattern detection"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Personalized Predictions",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-medium mb-8">
          From healthy meal timing to productivity-enhancing morning routines, NutriScan generates data-backed suggestions specific to your goals. Whether you need reminders for balanced meals, hydration, or a mindful break, the system adapts in real-time to support lasting lifestyle improvements.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://i.pinimg.com/736x/f5/58/57/f5585730123539427d59de2f83013fee.jpg"
            alt="AI predictions"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://img.freepik.com/free-vector/digital-guide-abstract-illustration_335657-5067.jpg?t=st=1737316440~exp=1737320040~hmac=3b791065bd552642f9d92282212386404e827a4bd8df742c0474e855a35b6552&w=740"
            alt="Tailored suggestions"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Build Consistency",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-medium mb-8">
            With habit streak tracking, intuitive progress dashboards, and AI-generated motivational prompts, NutriScan empowers you to stay consistent. Visual cues and milestone achievements keep you accountable and inspired as you build lasting habits, one day at a time.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://img.freepik.com/free-vector/timeline-concept-illustration_114360-5230.jpg?t=st=1737316538~exp=1737320138~hmac=c0af49549e0a6af327f8972284f348d504859472f039991d0bca1e928b6d3e15&w=740"
            alt="Consistency tracker"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://i.pinimg.com/736x/5f/ab/40/5fab40b00047e900575532cb0a1a305e.jpg"
            alt="Habit streaks"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Reflect and Refine",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-medium mb-8">
            True transformation happens through reflection. NutriScan allows you to review your progress, learn from setbacks, and evolve your habits. With every interaction, our AI refines its recommendations—helping you make smarter, more sustainable changes over time.        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://img.freepik.com/free-vector/augmented-reality-background-isometric-style_23-2147802730.jpg?semt=ais_hybrid"
            alt="Reflection process"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://img.freepik.com/premium-photo/business-man-pointing-development-arrow-graph-business-development-success_117255-1501.jpg?w=740"
            alt="Growth refinement"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
];

const TimeLineContent = () => {
  return (
    <div>
      <div >
        <h1 className="text-4xl md:text-4xl py-28 lg:text-6xl font-semibold font-poppins max-w-7xl mx-auto text-center mt-6 relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Build better habits, <br /> <Cover>Faster </Cover> and smarter.
        </h1>
      </div>
      <div className="w-full">
        <Timeline data={data} />
      </div>
    </div>
  );
};

export default TimeLineContent;
