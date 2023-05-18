export const SONAR_REGEX = {
  BUGS: /\[\d+ Bug[s]?\]/g,
  VULNERABILITIES: /\[\d+ Vulnerabilit(?:ies|y)\]/g,
  SECURITY_HOTSPOTS: /\[\d+ Security Hotspot[s]?\]/g,
  CODE_SMELL: /\[\d+ Code Smell[s]?\]/g,
  DUPLICATIONS: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  COVERAGE: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  RATING: /!\[([A-Z])\]/g,
};
///dasdasdas