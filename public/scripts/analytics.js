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

if (window?.fathom?.trackEvent) {
  addTrackingToNav();
  trackLinks();
}
