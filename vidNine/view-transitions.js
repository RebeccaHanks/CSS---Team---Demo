const listView = document.querySelector('.list-view');
const detailView = document.querySelector('.detail-view');
const detailIcon = document.querySelector('#detail-icon');
const detailTitle = document.querySelector('#detail-title');
const detailDescription = document.querySelector('#detail-description');
const backButton = document.querySelector('#back-button');
const supportMessage = document.querySelector('#support-message');
const instantDemoButton = document.querySelector('#instant-demo-button');
const slowMotionToggle = document.querySelector('#slow-motion');

if (document.startViewTransition) {
  supportMessage.textContent = 'View Transitions API supported in this browser.';
} else {
  supportMessage.textContent = 'View Transitions API not supported. The demo still works, but without animation.';
}

function updateDetailContent(cardEl) {
  const icon = cardEl.querySelector('.project-icon').textContent;

  detailIcon.textContent = icon;
  detailTitle.textContent = cardEl.dataset.title;
  detailDescription.textContent = cardEl.dataset.description;
}

function showDetailWithoutTransition(cardEl) {
  updateDetailContent(cardEl);

  listView.hidden = true;
  detailView.hidden = false;

  detailView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showDetail(cardEl) {
  const update = () => {
    updateDetailContent(cardEl);

    listView.hidden = true;
    detailView.hidden = false;

    cardEl.classList.remove('is-selected');
  };

  cardEl.classList.add('is-selected');

  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

function showList() {
  const update = () => {
    detailView.hidden = true;
    listView.hidden = false;
  };

  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => {
    showDetail(card);
  });
});

backButton.addEventListener('click', showList);

instantDemoButton.addEventListener('click', () => {
  const firstCard = document.querySelector('.project-card');
  showDetailWithoutTransition(firstCard);
});

slowMotionToggle.addEventListener('change', () => {
  document.body.classList.toggle('slow-motion', slowMotionToggle.checked);
});