module.exports = (repo) => {
  if(repo.name !== 'linenv') return []; // todo: add all repos we want this rule
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  // Thursday is represented by 4 in JavaScript's Date object
  if (day === 4 && hour >= 17) {
      return ['ariel-linearb', 'orielz'];
  } else if (hour >= 15 && hour < 17) {
      return ["ariel-linearb", "orielz", "EladKohavi", "Fadikhayo1995", "negevyoav", "stas-linearb", "omarcovitch"];
  } else if (hour >= 17) {
      return ['ariel-linearb', 'orielz'];
  } else {
      return [];
  }
}
