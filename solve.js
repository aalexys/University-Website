window.addEventListener("load", solve);

function solve() {

    const DOMSelectors = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        age: document.getElementById('age'),
        courseName: document.getElementById('course-name'),
        coverLetter: document.getElementById('task'),
        inProgress: document.getElementById('in-progress'),
        message: document.querySelector('.message')
      }
      const submitBtn = document.getElementById('form-btn')
      
    let currentInfo = {};

      submitBtn.addEventListener('click', submitInfoHandler);

    function submitInfoHandler(event) {
        if (event) {
            event.preventDefault();
        }

        let allFieldsAreNonEmpty = Object.values(DOMSelectors)
         .every((input) => input.value !== '');

        if (!allFieldsAreNonEmpty) {
            return;
        }

        const {firstName, lastName, age, courseName, coverLetter } = DOMSelectors;

        const li = createElement('li', '', DOMSelectors.inProgress, '', ['list']);
        const article = createElement('article', '', li, '', ['article'])
        createElement('h3', `Name: ${firstName.value} ${lastName.value}`, article)
        createElement('h3', `Age: ${age.value}`, article);
        createElement('h3', `Course Name: ${courseName.value}`, article);
        createElement('h3', `Your Letter: ${coverLetter.value}`, article);
        const editBtn = createElement('button', 'Edit', li, '', ['edit-btn']);
        const checkBtn = createElement('button', 'Check', li, '', ['check-btn'])

        for (const key in DOMSelectors) {
            currentInfo[key] = DOMSelectors[key].value
        }

        
        checkBtn.addEventListener('click', () => {
          createElement('p', 'Thank you for the completed form.', DOMSelectors.message)
          
          DOMSelectors.inProgress.textContent = '';
        })
        
        editBtn.addEventListener('click', editInfoHandler);
        
        document.querySelector('form').reset()
        DOMSelectors.submitBtn.setAttribute('disabled', true);
    }

    function editInfoHandler() {
      let parent = this.parentNode;

      for (const key in currentInfo) {
        DOMSelectors[key].value = currentInfo[key];
      }

      parent.textContent = ''
    }
    
    function createElement(type, content, parentNode, id, classes, attributes) {
        const htmlElement = document.createElement(type)
      
        if (content && type !== 'input') {
          htmlElement.textContent = content
        }
      
        if (content && type === 'input') {
          htmlElement.value = content
        }
      
        if (id) {
          htmlElement.id = id
        }
      
        if (classes) {
          htmlElement.classList.add(...classes)
        }
      
        if (parentNode) {
          parentNode.appendChild(htmlElement)
        }
      
        if (attributes) {
          for (const key in attributes) {
            htmlElement.setAttribute(key, attributes[key])
          }
        }
      
        return htmlElement
      }
}