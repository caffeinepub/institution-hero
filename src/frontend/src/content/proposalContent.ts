import { getOrderedReferenceTexts } from './references';

export const proposalContent = {
  title: 'Institution Hero',
  subtitle: 'Heroes and Villains in Higher Education: Resilience and The Role of Next Generation Student Leaders',
  author: 'Michael Viernes',
  organization: 'Foundation for International Education',

  bio: `Crossing borders and building bridges, Michael is a Ph.D. International Psychology student. By earning a B.A. in Psychology and M.A. in Forensic Psychology from The Chicago School, he strengthened his intellectual foundation and presented his work at American Psychological Association conferences. Study-abroad experiences in Berlin, Zurich, and Johannesburg continue to inspire him to expand his mentor's work in resilience, culture, and ethical leadership.`,

  abstractShort: `Academic institutions often reflect stories of "Heroes" and "Villains" in leadership, whether it be student or faculty, the stories reveal how integrity, compassion, and discouraging behaviors shape the climate of higher education. A psychological examination of these contrasting patterns shows that resilience functions as an interwoven process supporting both personal and institutional well-being. Drawing on research on wisdom and knowledge, we highlight how cognitive strengths, identity reconstruction, and social belonging contribute to academic resilience and help prevent dislocation during times of disruption. The session illustrates how ethical and wise leadership modeled through cinematic mentors such as Yoda and Morpheus creates environments where students regain purpose and coherence amid uncertainty. We then focus on next-generation student leaders, demonstrating how they can cultivate resilience as relational wisdom grounded in creativity, curiosity, judgment, and reflective practice. Practical strategies will be offered to help emerging and current leaders foster psychosocial inclusion and strengthen compassionate, ethically responsible cultures within higher education.`,

  abstract: `Every academic institution has its stories of Heroes and Villains in academic leadership that unfold quietly in classrooms, offices, and leadership meetings. The Hero and Villain narrative reveals how resilience, compassion, and integrity shape or sabotage the moral climate of higher education. Exploring the paradox of academic leadership through a psychological lens and building on the virtue of wisdom and knowledge, we will place resilience not merely as endurance but as an attuned process. A dynamic balance between cognitive strengths, identity reconstruction, and social belonging forms the foundation of strong academic resilience. In academic realms, wisdom manifests creative ethical leadership, helping to change psychosocial disruption into opportunities for thriving social capital, development, meaning making, and evolution. Psychosocial inclusion, resilience, and adaptive capacity are foundational elements of identity and mental health. When the fundamentals of leadership collapse, dislocation often comes next; fortunately, protective forces, including social support, mentorship, and moral reflection realign responsibilities, creating equilibrium and redefining the culture of responsibility (McGrath, Erickson, & Mayes, 2022). Much like cinematic mentors who exemplify wisdom, Yoda or Morpheus, heroic academic leaders must foster places where students rediscover purpose and coherence amid institutional uncertainty. Practical intelligence reflects the protective power of wisdom, integrating self, others, and community to rebuild cohesion where exclusion once fractured it. Next-generation student leaders must embody these virtues: cultivating resilience as relational wisdom, guided by creativity, curiosity, judgment, and love of learning, to reweave disrupted academic and psychosocial identities into stronger, more compassionate systems of belonging.`,

  learningOutcomes: [
    'Make a distinction between constructive (heroic) and destructive (villainous) leadership behaviors in higher education, applying ethical and psychological frameworks of resilience and moral integrity, e.g., psychosocial inclusion, identity coherence, and adaptive capacity, reducing dislocation during periods of disruption (McGrath et al., 2022).',
    'Elucidate how wisdom, compassion, and adaptive capacity transform psychosocial disruption into opportunities for belonging and growth.',
    'Demonstrate how next-generation student leaders can cultivate relational resilience and leadership identity through creative, reflective, and inclusive practice.',
  ],

  takeaways: [
    {
      title: 'Leadership as Moral Narrative',
      description:
        'Leadership functions as a moral narrative, in which leadership behaviors can be experienced as constructive or less constructive, shaping the ethical and emotional climate of academic institutions.',
    },
    {
      title: 'Resilience is Developmental',
      description:
        'Resilience is developmental, not static. Resilience combines wisdom, identity reconstruction, and belonging, transforming disruption into development and social cohesion (Erickson, 2017).',
    },
    {
      title: 'Wisdom Through Reflection',
      description:
        'Wisdom tends to deepen when individuals are encouraged to reflect on issues that hold personal meaning. Ethical creative leadership, rooted in curiosity, discernment, and love of learning, acts as a safeguard against moral erosion and dislocation (Niemiec & Wedding).',
    },
    {
      title: 'Next-Generation Leadership is Relational',
      description:
        'Emerging student leaders must cultivate resilience through mentorship, reflective practice, and moral responsibility to rebuild systems of belonging.',
    },
    {
      title: 'Heroic Leadership is Teachable',
      description:
        'Where self-awareness, empathy, and community engagement are balanced, leaders create the "ordinary magic" that converts adversity into ethical growth (Erickson, 2017).',
    },
  ],

  activities: {
    activity1: {
      title: 'Your Leadership Word',
      goal: 'Help students quickly identify leadership values and see how diverse strengths contribute to a positive academic culture.',
      prompt: 'What ONE word describes the kind of leader you admire?',
      examples: 'ethical, visionary, authentic, resilient, empathetic, principled, transformational, courageous, accountable, inclusive, decisive, adaptable, humble, inspiring, grounded',
      reflectionPrompts: [
        'Why did you choose that word?',
        'Who in your life (teacher, coach, peer) reflects that word?',
        'How does that word show resilience?',
        'What is one small action YOU can take this week that matches your leadership word?',
      ],
      description:
        'This reflective activity draws on leadership identity development and resilience frameworks, emphasizing values clarification, relational learning, and adaptive capacity (Jansen & Wieland, 2024; Northouse, 2022; Sunderman & Orsini, 2024; Waddington & Bonaparte, 2025; Killingback et al., 2025).',
    },
    activity2: {
      title: 'Resilient Leadership for Campus Solutions',
      goal: 'Teach students how heroic leadership and resilience apply to real academic challenges.',
      commonChallenges: [
        'Group projects where no one communicates',
        'Professors who give unclear directions',
        'Campus offices that do not respond',
        'Clubs that lack organization',
        'Students feeling isolated',
      ],
      brainstormPrompts: [
        'What would the villain response to this problem look like?',
        'What would the heroic response look like?',
        'Which protective factor (support, mentorship, collaboration) helps solve it?',
      ],
      microSolutionExamples: [
        'Create a group chat',
        'Ask for clarification respectfully',
        'Check in on an isolated peer',
        'Organize a 10-minute planning meeting',
      ],
      description:
        'Activity 2 was designed to engage students in applying principles of resilience, ethical leadership, and systems thinking to common academic challenges. Drawing on resilience theory (Erickson, 2017), research on compassionate pedagogy (Killingback et al., 2025), and systems perspectives informed by chaos theory (Elliott & Kiel, 1996), the activity encourages students to identify protective factors and develop small, values-driven leadership actions that promote inclusion and stability.',
    },
  },

  // References now sourced from the single source of truth
  references: getOrderedReferenceTexts(),
};
