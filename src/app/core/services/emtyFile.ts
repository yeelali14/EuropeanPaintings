export const SONAR_REGEX = {
  BUGS: /\[\d+ Bugs?\]/g,
  VULNERABILITIES: /\[\d+ Vulnerabilit(?:ies|y)\]/g,
  SECURITY_HOTSPOTS: /\[\d+ Security Hotspots?\]/g,
  CODE_SMELL: /\[\d+ Code Smells?\]/g,
  DUPLICATIONS: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  COVERAGE: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  RATING: /!\[([A-Z])\]/g,
};