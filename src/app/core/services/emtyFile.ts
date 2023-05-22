export const SONAR_REGEX = {
  VULNERABILITIES: /\[\d+ Vulnerabilit(?:ies|y)\]/g,
  CODE_SMELL: /\[\d+ Code Smell[s]?\]/g,
  DUPLICATIONS: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  COVERAGE: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  RATING: /!\[([A-Z])\]/g,
};