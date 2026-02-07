/**
 * Single source of truth for all academic references used throughout the application.
 * This list is displayed on the References page and used by Activity 1 and Activity 2 citations.
 */

export interface ReferenceEntry {
  key: string;
  text: string;
}

/**
 * Complete reference list in the exact order and formatting provided by the user.
 * Each entry has a stable key for programmatic access while maintaining display order.
 */
export const REFERENCES: ReferenceEntry[] = [
  {
    key: 'anastasiou2025',
    text: 'Anastasiou, S. (2025). [Review of Counteracting toxic leadership in education: Transforming schools through emotional intelligence and ethical leadership]. Administrative Sciences, 15(8), 312. https://doi.org/10.3390/admsci15080312',
  },
  {
    key: 'bienkowska2025',
    text: 'Bieńkowska, A., & Tworek, K. (2025). Fake leadership influence on organizational destruction in higher education institutions (HEIs). PLOS ONE, 20(4), e0321194. https://doi.org/10.1371/journal.pone.0321194',
  },
  {
    key: 'erickson2015',
    text: 'Erickson, A., Shaw, B., Murray, J., & Branch, S. (2015). Destructive leadership. Organizational Dynamics, 44(4), 266–272. https://doi.org/10.1016/j.orgdyn.2015.09.003',
  },
  {
    key: 'erickson2017',
    text: 'Erickson, L. L. (2017). Cross-Cultural Investigation on Resiliency and Protective Factors in U.S. and Guatemala (Order No. 10635141). Available from ProQuest One Academic. (1961607035). https://tcsedsystem.idm.oclc.org/login?url=https://www.proquest.com/dissertations-theses/cross-cultural-investigation-on-resiliency/docview/1961607035/se-2',
  },
  {
    key: 'elliott1996',
    text: 'Elliott, E. W., & Kiel, L. D. (1996). Chaos theory in the social sciences : foundations and applications. University of Michigan Press. https://doi.org/10.3998/mpub.14623',
  },
  {
    key: 'fazio2008',
    text: 'Fazio, R. J., Rashid, T., & Hayward, H. (2008). Growth through loss and adversity: A choice worth making. In S. J. Lopez (Ed.), Positive psychology: Exploring the best in people, volume 3 (pp. 1–27). Westport, CT: Praeger.',
  },
  {
    key: 'fernweh',
    text: 'Fernweh Motive. (n.d.). Vestrahorn Island. https://fernwehmotive.de/en/vestrahorn-island/',
  },
  {
    key: 'ghamrawi2024',
    text: 'Ghamrawi, N., Abu-Shawish, R. K., Shal, T., & Ghamrawi, N. A. R. (2024). Destructive leadership behaviors: The case of academic middle leaders in higher education. International Journal of Educational Research. https://doi.org/10.1016/j.ijer.2024.102382',
  },
  {
    key: 'jansen2024',
    text: 'Jansen, A. L., & Wieland, A. (2024). Developing resilient leaders: A training for students. Journal of Leadership Education. https://doi.org/10.1108/JOLE-06-2024-0073',
  },
  {
    key: 'killingback2025',
    text: 'Killingback, C., Tomlinson, A., & Stern, J. (2025). Compassionate pedagogy in higher education: A scoping review. Journal of University Teaching & Learning Practice, 22(1), 1–32. https://doi.org/10.53761/7yvrw787',
  },
  {
    key: 'mcgrath2022',
    text: 'McGrath, B., Erickson, L. L., & Mayes, F. (2022). Dislocation and social change. Routledge. https://doi.org/10.4324/9780367198459-REPRW107-1',
  },
  {
    key: 'morris2021',
    text: 'Morris, L. (2021, November 8). When Leadership Fails [PowerPoint slide]. SlideShare. TCSPP_WLF_ Victims, Villains, Strategies & Self [1838].pdf.',
  },
  {
    key: 'niemiec2014',
    text: 'Niemiec, R. M., & Wedding, D. (2014). Positive psychology at the movies: Using films to build character strengths and well-being. Hogrefe Publishing.',
  },
  {
    key: 'northouse2022',
    text: 'Northouse, P. G. (2022). Leadership: Theory and practice (9th ed.). SAGE.',
  },
  {
    key: 'ramamoorthi2023',
    text: 'Ramamoorthi, B., Jäppinen, A.-K., & Taajamo, M. (2023). Manifestations of leadership identity development among multicultural higher education students. European Journal of Training and Development, 47(10), 147–162. https://doi.org/10.1108/EJTD-02-2023-0027',
  },
  {
    key: 'sunderman2024',
    text: 'Sunderman, H. M., & Orsini, J. (2024). Leader(ship) identity development and meaning making: A scoping review. Journal of Leadership Studies, 18(3), 23–47. https://doi.org/10.1002/jls.21905',
  },
  {
    key: 'waddington2025',
    text: 'Waddington, K., & Bonaparte, B. (2025). Compassion in higher education: Fashion or future for relational pedagogies? Higher Education Research and Development, 44(3), 785–792. https://doi.org/10.1080/07294360.2024.2406505',
  },
  {
    key: 'wang2025',
    text: 'Wang, F., Huang, P., Xi, Y., & King, B.K. (2025). Fostering resilience among university students: The role of teaching and learning environments. (2025). Higher Education. https://doi.org/10.1007/s10734-025-01484-2',
  },
];

/**
 * Helper function to get a reference by its stable key
 */
export function getReferenceByKey(key: string): ReferenceEntry | undefined {
  return REFERENCES.find((ref) => ref.key === key);
}

/**
 * Helper function to get multiple references by their keys
 */
export function getReferencesByKeys(keys: string[]): ReferenceEntry[] {
  return keys.map((key) => getReferenceByKey(key)).filter((ref): ref is ReferenceEntry => ref !== undefined);
}

/**
 * Get the ordered list of reference texts for display (maintains exact order from user)
 */
export function getOrderedReferenceTexts(): string[] {
  return REFERENCES.map((ref) => ref.text);
}
