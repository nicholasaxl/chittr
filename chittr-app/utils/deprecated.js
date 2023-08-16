function extractLinks(input) {
    const urlRegex = /(?:https?:\/\/|www\.)\S+(?=[\)])?/gi;
  
    const regexList = [];
    const nonRegexList = [];
    let match;
    let lastIndex = 0;
    while ((match = urlRegex.exec(input)) !== null) {
      // Add non-regex elements to the nonRegexList
      nonRegexList.push(input.slice(lastIndex, match.index));
  
      // Add regex elements to the regexList
      regexList.push(match[0]);
  
      // Update lastIndex for the next iteration
      lastIndex = match.index + match[0].length;
    }
  
    nonRegexList.push(input.slice(lastIndex));
  
    return { regexList: regexList, nonRegexList: nonRegexList };
  }
  
  function makeLinksClickable(input) {
    let { regexList, nonRegexList } = extractLinks(input);
  
    let jsxOutputList = [];
  
    for (let i = 0; i < regexList.length; i++) {
      jsxOutputList.push(<div key={`nonRegex-${i}`}>{nonRegexList[i]}</div>);
      jsxOutputList.push(
        <a
          className="font-bold underline text-white"
          key={`regex-${i}`}
          href={regexList[i]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {regexList[i]}
        </a>
      );
    }
    jsxOutputList.push(
      <div key={`nonRegex-${nonRegexList.length}`}>
        {nonRegexList[nonRegexList.length - 1]}
      </div>
    );
  
    let jsxOutput = jsxOutputList.map((item) => {
      return item;
    });
  
    return jsxOutput;
  }