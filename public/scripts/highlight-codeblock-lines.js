function highlightCodeblockLines() {
  const highlighters = Array.from(document.querySelectorAll("[data-next-codeblock-highlight-lines]"))
    .filter((el) => el.querySelector("pre.astro-code > code"));

  for (const highlighter of highlighters) {
    const highlightedLines = highlighter.getAttribute("data-next-codeblock-highlight-lines").split(",");

    const codeblock = highlighter.querySelector("pre.astro-code > code");

    const lines = Array.from(codeblock.querySelectorAll(".line"));

    for (const highlightedLine of highlightedLines) {
      lines[highlightedLine - 1].classList.add("highlighted-line");
    }
  }
}

highlightCodeblockLines();
