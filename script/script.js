const form = document.querySelector('#contact_form');

const getContact = () => JSON.parse(localStorage.getItem('contact') ?? '[]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target[0].value;
  const email = event.target[1].value;
  const contact = {
    id: Date.now(),
    name,
    email,
    image: `https://dummyjson.com/icon/${name}/128`,
  };
  const existingContact = getContact();
  if (existingContact.some((contact) => contact.name == name)) return alert('contact already exists');
  existingContact.unshift(contact);
  localStorage.setItem('contact', JSON.stringify(existingContact));
  showContact();
});

const contactList = document.querySelector('#contact_list');
const showContact = () => {
  const existingContact = getContact();
  contactList.innerHTML = existingContact
    .map((contact) => {
      return `
          <div class="contact__detail">
            <div class="contact__detail-contact">
            <img src="${contact.image}" alt="Emily" />
            <div class="contact__detail-person">
              <p>${contact.name}</p>
              <p>${contact.email}</p>
            </div>
            </div>
              <button onclick="deleteContact(${contact.id})" class="contact__button">x</button>
          </div>
    `;
    })
    .join('');
};

const deleteContact = (id) => {
  const existingContact = getContact();
  const newContact = existingContact.filter((contact) => contact.id !== id);
  localStorage.setItem('contact', JSON.stringify(newContact));
  showContact();
};

showContact();
