const anchorElement = document.getElementById('external-link');
anchorElement.setAttribute('href', 'https://jkwwoodworks.com');

const anchorElement2 = document.querySelector('#external-link');
anchorElement2.setAttribute('href', 'https://webbcraftinggallery.com');

anchorElement2.textContent = "Webb Crafting Gallery Link";

const newAnchorElement = document.createElement('a');
newAnchorElement.href = 'https://jkwwoodworks.com/';
newAnchorElement.text = 'JKW Wood Works';
const firstParagraph = document.querySelector('p');
firstParagraph.append(newAnchorElement);

const firstH1Element = document.querySelector('h1');
firstH1Element.remove();

firstParagraph.parentElement.append(firstParagraph);