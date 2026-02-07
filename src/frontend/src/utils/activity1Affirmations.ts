import { selectValidReferenceByHash } from './referenceSelection';
import { ReferenceEntry } from '../content/references';

interface LeadershipWordInputs {
  word: string;
  why: string;
  roleModel: string;
  resilienceExample: string;
  actionStep: string;
}

export interface AffirmationResult {
  message: string;
  reference: ReferenceEntry;
}

/**
 * Generates a deterministic affirmation message based on the user's leadership word inputs.
 * Returns both the affirmation message and a valid academic reference.
 */
export function generateAffirmation(inputs: LeadershipWordInputs): AffirmationResult {
  const { word, why, roleModel, resilienceExample, actionStep } = inputs;

  // Normalize the word for matching
  const normalizedWord = word.toLowerCase().trim();

  // Define affirmation templates with suggested reference keys based on leadership word themes
  const affirmationTemplates: Record<string, { messages: string[]; referenceKeys: string[] }> = {
    honest: {
      messages: [
        `Your commitment to honesty reflects the ethical leadership that transforms academic institutions. Research shows that integrity-based leadership creates environments where students and faculty thrive. By choosing "${word}" as your leadership value, you're contributing to a culture of trust and transparency.`,
        `Honesty as a leadership quality demonstrates the moral courage needed in higher education. Your reflection on ${roleModel} shows how authentic leadership builds resilience through transparent communication. Continue to embody this value in your action: ${actionStep}.`,
      ],
      referenceKeys: ['anastasiou2025', 'northouse2022', 'ghamrawi2024'],
    },
    brave: {
      messages: [
        `Bravery in leadership is essential for navigating the challenges of higher education. Your choice of "${word}" aligns with research on resilient leadership development, where courage enables students to transform adversity into growth. Your commitment to ${actionStep} exemplifies this heroic quality.`,
        `Your focus on bravery reflects the protective factors that help students overcome academic pressures. Studies show that courageous leadership fosters environments where individuals can face challenges with confidence. Keep drawing inspiration from ${roleModel} as you develop this strength.`,
      ],
      referenceKeys: ['jansen2024', 'wang2025', 'erickson2017'],
    },
    creative: {
      messages: [
        `Creativity as a leadership value demonstrates the innovative thinking needed to address complex challenges in higher education. Your reflection shows how creative problem-solving builds resilience and adaptive capacity. Your action step—${actionStep}—embodies this creative approach.`,
        `By choosing "${word}," you're recognizing the power of creative leadership to transform disruption into opportunity. Research on leadership identity development emphasizes creativity as a core strength for emerging leaders. Continue to cultivate this quality through your commitment to ${actionStep}.`,
      ],
      referenceKeys: ['elliott1996', 'killingback2025', 'sunderman2024'],
    },
    patient: {
      messages: [
        `Patience is a foundational quality for compassionate leadership in higher education. Your choice of "${word}" reflects the relational wisdom that helps students navigate challenges with grace. Your example of ${roleModel} shows how patience builds resilience over time.`,
        `Your commitment to patience demonstrates the developmental nature of resilience. Research shows that patient leadership creates space for growth and belonging, especially during times of disruption. Your action—${actionStep}—is a meaningful step toward embodying this value.`,
      ],
      referenceKeys: ['waddington2025', 'killingback2025', 'erickson2017', 'wang2025'],
    },
    resilient: {
      messages: [
        `Resilience is at the heart of effective leadership in higher education. By choosing "${word}," you're recognizing that resilience is not static but developmental, combining wisdom, identity reconstruction, and belonging. Your reflection on ${resilienceExample} shows deep understanding of this concept.`,
        `Your focus on resilience aligns with research showing that adaptive capacity transforms psychosocial disruption into opportunities for growth. Continue to develop this strength through your commitment to ${actionStep}.`,
      ],
      referenceKeys: ['erickson2017', 'wang2025', 'jansen2024'],
    },
    fair: {
      messages: [
        `Fairness as a leadership quality reflects the ethical foundation needed to create inclusive academic environments. Your choice of "${word}" demonstrates commitment to justice and equity, which are essential for preventing destructive leadership behaviors. Your action step—${actionStep}—embodies this principle.`,
        `By valuing fairness, you're contributing to the moral climate of higher education. Research shows that equitable leadership practices foster resilience and belonging among students. Keep drawing inspiration from ${roleModel} as you develop this critical leadership quality.`,
      ],
      referenceKeys: ['bienkowska2025', 'ghamrawi2024', 'ramamoorthi2023'],
    },
    innovation: {
      messages: [
        `Innovation in leadership demonstrates the creative thinking needed to address evolving challenges in higher education. Your choice of "${word}" reflects the adaptive capacity that transforms disruption into development. Your commitment to ${actionStep} shows how innovation can be practiced daily.`,
        `Your focus on innovation aligns with research on leadership identity development, where creative problem-solving is a core strength for emerging leaders. Continue to cultivate this quality through your reflection on ${resilienceExample}.`,
      ],
      referenceKeys: ['elliott1996', 'sunderman2024', 'jansen2024'],
    },
    compassion: {
      messages: [
        `Compassion is a transformative leadership quality in higher education. Your choice of "${word}" reflects the relational pedagogy that fosters resilience and belonging. Your example of ${roleModel} shows how compassionate leadership creates supportive environments.`,
        `By valuing compassion, you're recognizing the power of empathy to transform academic culture. Research shows that compassionate leadership helps students navigate challenges and build adaptive capacity. Your action—${actionStep}—is a meaningful expression of this value.`,
      ],
      referenceKeys: ['waddington2025', 'killingback2025', 'wang2025'],
    },
    integrity: {
      messages: [
        `Integrity is the cornerstone of ethical leadership in higher education. Your choice of "${word}" demonstrates commitment to the moral principles that prevent destructive leadership behaviors. Your reflection on ${resilienceExample} shows how integrity builds resilience.`,
        `Your focus on integrity aligns with research on leadership theory and practice, where ethical behavior creates trust and stability. Continue to embody this value through your commitment to ${actionStep}, inspired by ${roleModel}.`,
      ],
      referenceKeys: ['anastasiou2025', 'ghamrawi2024', 'northouse2022'],
    },
  };

  // Default affirmation for words not in the template map
  const defaultTemplate = {
    messages: [
      `Your choice of "${word}" as a leadership value reflects deep personal insight. Research on leadership identity development shows that values clarification is essential for building resilience and adaptive capacity. Your reflection on ${roleModel} demonstrates how this quality manifests in real relationships.`,
      `By choosing "${word}," you're identifying a core strength that can guide your leadership journey. Studies show that self-awareness and values-based leadership foster resilience in higher education environments. Your commitment to ${actionStep} is a meaningful step toward embodying this quality.`,
      `Your leadership word "${word}" represents the kind of ethical, compassionate leadership needed in higher education today. Research emphasizes that emerging leaders who cultivate self-awareness and relational wisdom contribute to positive institutional culture. Continue to develop this strength through your action: ${actionStep}.`,
    ],
    referenceKeys: ['sunderman2024', 'ramamoorthi2023', 'jansen2024', 'wang2025', 'waddington2025', 'killingback2025'],
  };

  // Select template based on the word
  const template = affirmationTemplates[normalizedWord] || defaultTemplate;

  // Use a simple hash of the word to deterministically select a message
  const hash = normalizedWord.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedMessage = template.messages[hash % template.messages.length];

  // Select a valid reference based on the input and candidate keys
  const combinedInput = `${word}${why}${roleModel}${resilienceExample}${actionStep}`;
  const reference = selectValidReferenceByHash(combinedInput, template.referenceKeys);

  return {
    message: selectedMessage,
    reference,
  };
}
