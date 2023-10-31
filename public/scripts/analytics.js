function addTrackingToNav() {
  const links = [
    {
      els: Array.from(
        document.querySelectorAll('.sidebar a[href="https://github.com/olets/zsh-test-runner/blob/main/CONTRIBUTING.md"]')
      ),
      fathomEventId: "Click Sidebar Contributing",
    },
    {
      els: Array.from(
        document.querySelectorAll('.sidebar a[href="https://github.com/olets/zsh-test-runner/blob/main/CHANGELOG.md"]')
      ),
      fathomEventId: "Click Sidebar Changelog",
    },
    {
      els: Array.from(
        document.querySelectorAll('.sidebar a[href="https://github.com/olets/zsh-test-runner/blob/main/LICENSE"]')
      ),
      fathomEventId: "Click Sidebar License",
    },
    {
      els: Array.from(
        document.querySelectorAll('.header a[href="https://github.com/olets/zsh-test-runner"]')
      ),
      fathomEventId: "Click Sidebar Repo",
    },
  ];

  for (const link of links) {
    link.els.forEach((el) =>
      el.setAttribute("data-fathom-event-id", link.fathomEventId)
    );
  }
}

function trackLinks() {
  const links = document.getElementsByTagName("a");

  for (const link of links) {
    const fathomEventId = link.getAttribute("data-fathom-event-id");

    if (!fathomEventId) {
      continue;
    }

    link.addEventListener("click", () => {
      window.fathom.trackEvent(fathomEventId);
    });
  }
}

function trackSearch() {
  const searchDialogs = Array.from(document.querySelectorAll("dialog[aria-label='Search']"));

  const hits = document.getElementsByClassName("pagefind-ui__result-link");

  function trackHits(hits) {
    for (const hit of hits) {
      
      hit.addEventListener("click", ({ target }) => {
        const title = target.innerText || '';
        const query = target.closest('.pagefind-ui__form').querySelector('.pagefind-ui__search-input').value;

        window.fathom.trackEvent("Search hit clicked", {
          query: query,
          title: title,
        });
      });
    }
  }
  
  function trackSearchDialogs(searchDialogs) {
    for (const searchDialog of searchDialogs) {
      searchDialog.addEventListener('open', () => {
        window.fathom.trackEvent("Search dialog opened");
      })
      
      searchDialog.addEventListener('close', () => {
        const query = searchDialog.querySelector('.pagefind-ui__search-input').value;

        window.fathom.trackEvent("Search dialog closed", { query: query });
      })
    }
  }
  
  const searchObserver = new MutationObserver((mutationList) => {
    const addedNodes = mutationList.flatMap((mutationRecord) => {
      return Array.from(mutationRecord.addedNodes)
    })
    
    const hits = addedNodes.filter((addedNode) => {
      return addedNode.classList?.contains('pagefind-ui__result-link')
    })

    const searchDialogs = addedNodes.filter((addedNode) => {
      return addedNode.tagName === "DIALOG" && addedNode.getAttribute("aria-label") === "Search";
    })

    trackHits(hits);

    trackSearchDialogs(searchDialogs);
  });
  
  searchObserver.observe(document, {
    childList: true,
    subtree: true,
  });
  
  trackHits(hits);
  trackSearchDialogs(searchDialogs);
}

function addOpenEventToDialogs() {
  const dialogs = document.getElementsByTagName("dialog");

  const openEvent = new CustomEvent("open");

  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach(({ attributeName, target }) => {
      if (attributeName === "open" && target.open) {
        target.dispatchEvent(openEvent);
      }
    });
  });

  for (dialog of dialogs) {
    observer.observe(dialog, { attributes: true });
  }
}

// if (window?.fathom?.trackEvent) {
  addOpenEventToDialogs();
  addTrackingToNav();
  trackLinks();
  trackSearch();
// }
