function extractInfo(text) {
    const headingPattern = /^Heading:.*\s*$/m;
    const subsectionPattern = /^Subsection \d+:.*$/gm;
    const contentPattern = /^Content:.*$/gm;
    // const linkPattern = /^Link to learn more:.*$/gm;
  
    const heading = text.match(headingPattern)[0].split(": ")[1].trim();
    const subsections = text
      .match(subsectionPattern)
      .map((s) => s.split(": ")[1].trim());
    const contents = text
      .match(contentPattern)
      .map((c) => c.split(": ")[1].trim());
    // const links = text.match(linkPattern).map((l) => l.split(": ")[1].trim());
  
    const main = {
      heading: heading,
      content: contents.shift(),
    };
    const sections = [];
    for (let i = 0; i < subsections.length; i++) {
      sections.push({
        subsection: subsections[i],
        content: contents[i],
      });
    }
  
    return {
      main: main,
      sections: sections,
    };
  }
  
  export { extractInfo };