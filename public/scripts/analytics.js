function addTrackingToNav() {
  const links = [
    {
      els: Array.from(
        document.querySelectorAll('.sidebar a[href="/changelog/"]')
      ),
      fathomEventId: "1IM3F81U",
    },
    {
      els: Array.from(
        document.querySelectorAll('.sidebar a[href="/license/"]')
      ),
      fathomEventId: "FLLTLBBH",
    },
    {
      els: Array.from(
        document.querySelectorAll('.header a[href="https://github.com/olets/zsh-test-runner"]')
      ),
      fathomEventId: "UDQTYUYT",
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
      window.fathom.trackGoal(fathomEventId, 0);
    });
  }
}

if (window?.fathom?.trackGoal) {
  addTrackingToNav();
  trackLinks();
}
