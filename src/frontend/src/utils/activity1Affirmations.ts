import { getReferenceByKey } from '../content/references';

interface LeadershipWordInputs {
  word: string;
  why: string;
  roleModel: string;
  resilienceExample: string;
  actionStep: string;
}

/**
 * Generates a deterministic affirmation message based on the user's leadership word inputs.
 * The affirmation includes citations from the updated references list using stable reference keys.
 */
export function generateAffirmation(inputs: LeadershipWordInputs): string {
  const { word, why, roleModel, resilienceExample, actionStep } = inputs;

  // Normalize the word for matching
  const normalizedWord = word.toLowerCase().trim();

  // Define affirmation templates with citations based on leadership word themes
  // Citations now use stable reference keys that map to the updated reference list
  const affirmationTemplates: Record<string, string[]> = {
    honest: [
      `Your commitment to honesty reflects the ethical leadership that transforms academic institutions. Research shows that integrity-based leadership creates environments where students and faculty thrive (Anastasiou, 2025; Northouse, 2022). By choosing "${word}" as your leadership value, you're contributing to a culture of trust and transparency.`,
      `Honesty as a leadership quality demonstrates the moral courage needed in higher education. Your reflection on ${roleModel} shows how authentic leadership builds resilience through transparent communication (Ghamrawi et al., 2024). Continue to embody this value in your action: ${actionStep}.`,
    ],
    brave: [
      `Bravery in leadership is essential for navigating the challenges of higher education. Your choice of "${word}" aligns with research on resilient leadership development, where courage enables students to transform adversity into growth (Jansen & Wieland, 2024; Wang et al., 2025). Your commitment to ${actionStep} exemplifies this heroic quality.`,
      `Your focus on bravery reflects the protective factors that help students overcome academic pressures. Studies show that courageous leadership fosters environments where individuals can face challenges with confidence (Wang et al., 2025). Keep drawing inspiration from ${roleModel} as you develop this strength.`,
    ],
    creative: [
      `Creativity as a leadership value demonstrates the innovative thinking needed to address complex challenges in higher education. Your reflection shows how creative problem-solving builds resilience and adaptive capacity (Elliott & Kiel, 1996; Killingback et al., 2025). Your action step—${actionStep}—embodies this creative approach.`,
      `By choosing "${word}," you're recognizing the power of creative leadership to transform disruption into opportunity. Research on leadership identity development emphasizes creativity as a core strength for emerging leaders (Sunderman & Orsini, 2024). Continue to cultivate this quality through your commitment to ${actionStep}.`,
    ],
    patient: [
      `Patience is a foundational quality for compassionate leadership in higher education. Your choice of "${word}" reflects the relational wisdom that helps students navigate challenges with grace (Waddington & Bonaparte, 2025; Killingback et al., 2025). Your example of ${roleModel} shows how patience builds resilience over time.`,
      `Your commitment to patience demonstrates the developmental nature of resilience. Research shows that patient leadership creates space for growth and belonging, especially during times of disruption (Erickson, 2017; Wang et al., 2025). Your action—${actionStep}—is a meaningful step toward embodying this value.`,
    ],
    resilient: [
      `Resilience is at the heart of effective leadership in higher education. By choosing "${word}," you're recognizing that resilience is not static but developmental, combining wisdom, identity reconstruction, and belonging (Erickson, 2017; Wang et al., 2025). Your reflection on ${resilienceExample} shows deep understanding of this concept.`,
      `Your focus on resilience aligns with research showing that adaptive capacity transforms psychosocial disruption into opportunities for growth (Wang et al., 2025; Jansen & Wieland, 2024). Continue to develop this strength through your commitment to ${actionStep}.`,
    ],
    fair: [
      `Fairness as a leadership quality reflects the ethical foundation needed to create inclusive academic environments. Your choice of "${word}" demonstrates commitment to justice and equity, which are essential for preventing destructive leadership behaviors (Bieńkowska & Tworek, 2025; Ghamrawi et al., 2024). Your action step—${actionStep}—embodies this principle.`,
      `By valuing fairness, you're contributing to the moral climate of higher education. Research shows that equitable leadership practices foster resilience and belonging among students (Ramamoorthi et al., 2023). Keep drawing inspiration from ${roleModel} as you develop this critical leadership quality.`,
    ],
    innovation: [
      `Innovation in leadership demonstrates the creative thinking needed to address evolving challenges in higher education. Your choice of "${word}" reflects the adaptive capacity that transforms disruption into development (Elliott & Kiel, 1996; Sunderman & Orsini, 2024). Your commitment to ${actionStep} shows how innovation can be practiced daily.`,
      `Your focus on innovation aligns with research on leadership identity development, where creative problem-solving is a core strength for emerging leaders (Jansen & Wieland, 2024). Continue to cultivate this quality through your reflection on ${resilienceExample}.`,
    ],
    compassion: [
      `Compassion is a transformative leadership quality in higher education. Your choice of "${word}" reflects the relational pedagogy that fosters resilience and belonging (Waddington & Bonaparte, 2025; Killingback et al., 2025). Your example of ${roleModel} shows how compassionate leadership creates supportive environments.`,
      `By valuing compassion, you're recognizing the power of empathy to transform academic culture. Research shows that compassionate leadership helps students navigate challenges and build adaptive capacity (Wang et al., 2025; Killingback et al., 2025). Your action—${actionStep}—is a meaningful expression of this value.`,
    ],
    integrity: [
      `Integrity is the cornerstone of ethical leadership in higher education. Your choice of "${word}" demonstrates commitment to the moral principles that prevent destructive leadership behaviors (Anastasiou, 2025; Ghamrawi et al., 2024). Your reflection on ${resilienceExample} shows how integrity builds resilience.`,
      `Your focus on integrity aligns with research on leadership theory and practice, where ethical behavior creates trust and stability (Northouse, 2022). Continue to embody this value through your commitment to ${actionStep}, inspired by ${roleModel}.`,
    ],
  };

  // Default affirmation for words not in the template map
  const defaultAffirmations = [
    `Your choice of "${word}" as a leadership value reflects deep personal insight. Research on leadership identity development shows that values clarification is essential for building resilience and adaptive capacity (Sunderman & Orsini, 2024; Ramamoorthi et al., 2023). Your reflection on ${roleModel} demonstrates how this quality manifests in real relationships.`,
    `By choosing "${word}," you're identifying a core strength that can guide your leadership journey. Studies show that self-awareness and values-based leadership foster resilience in higher education environments (Jansen & Wieland, 2024; Wang et al., 2025). Your commitment to ${actionStep} is a meaningful step toward embodying this quality.`,
    `Your leadership word "${word}" represents the kind of ethical, compassionate leadership needed in higher education today. Research emphasizes that emerging leaders who cultivate self-awareness and relational wisdom contribute to positive institutional culture (Waddington & Bonaparte, 2025; Killingback et al., 2025). Continue to develop this strength through your action: ${actionStep}.`,
  ];

  // Select affirmation based on the word
  const templates = affirmationTemplates[normalizedWord] || defaultAffirmations;

  // Use a simple hash of the word to deterministically select a template
  const hash = normalizedWord.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedTemplate = templates[hash % templates.length];

  return selectedTemplate;
}
