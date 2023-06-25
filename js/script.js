const cards = document.querySelectorAll('.card');
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    // клик по карточке добавляет класс flip
    clickedCard.classList.add('flip');
    // если первая карточка пустая, то присваивается первое значение
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    // потом значение для второй карточки
    cardTwo = clickedCard;
    disableDeck = true;
    // совпадения карточек определяется путем картинки
    let cardOneImg = cardOne.querySelector('.back-view img').src,
      cardTwoImg = cardTwo.querySelector('.back-view img').src;
    matchCards(cardOneImg, cardTwoImg);
  }
}
function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    // если найдены все пары, то перетасовка карточек
    if (matched == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    // обнуление карточек при совпадении
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    cardOne = cardTwo = '';
    return (disableDeck = false);
  }
  // если пара карточек не совпадает
  setTimeout(() => {
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake');
  }, 400);
  setTimeout(() => {
    cardOne.classList.remove('shake', 'flip');
    cardTwo.classList.remove('shake', 'flip');
    cardOne = cardTwo = '';
    disableDeck = false;
  }, 1200);
}
// функция перетасовки карточек
function shuffleCard() {
  // обнуление значений
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = '';

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove('flip');
    let imgTag = card.querySelector('.back-view img');
    imgTag.src = `img/img-${arr[i]}.png`;
    card.addEventListener('click', flipCard);
  });
}
shuffleCard();

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});
