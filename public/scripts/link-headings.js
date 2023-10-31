function linkHeadings() {
  const content = document.querySelector(".content-panel .content");

  if (!content) {
    return;
  }
  
  const headings = Array.from(content.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"));

  for (const heading of headings) {
    const innerHtml = heading.innerHTML;
    heading.innerHTML = `<a class="heading-link" href="#${heading.id}">${innerHtml}</a>`;
  }
}

linkHeadings();
