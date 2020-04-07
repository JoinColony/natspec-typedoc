const tags = ['title', 'author', 'notice', 'dev', 'param', 'return'];
const natSpecOnlyTags = ['title', 'author', 'notice', 'dev'];

const tagList = tags.map((tag) => `@${tag}`).join('|');
const natSpecOnlyTagList = natSpecOnlyTags.map((tag) => `@${tag}`).join('|');

const tagRegxp = new RegExp(`(${tagList})((?!(${tagList})).)*`, 'g');

const parseNatSpecString = (spec: string): string => {
  const matches = spec.match(tagRegxp);
  const natSpecOnlyRegex = new RegExp(`(${natSpecOnlyTagList})\\s`);
  if (matches && matches.length) {
    return tags
      .reduce((sortedMatches: string[], tag: string) => {
        const filteredMatches = matches.filter((match) =>
          match.startsWith(`@${tag}`),
        );
        return [...sortedMatches, ...filteredMatches];
      }, [])
      .map((match) => match.replace(natSpecOnlyRegex, ''))
      .join('\n');
  }
  return '';
};

export default parseNatSpecString;
