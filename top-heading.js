const access_key = "a44de784b0204e87ba653bb103ad5d62";
const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${access_key}`;
let title = document.getElementById("title");
let content = document.getElementById("title-content");
let output = document.getElementById("output");
let promise = new Promise((resolve, reject) => {
  let fetchRequest = fetch(url);
  let response = fetchRequest
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      // console.log(data.status)
      if (data.status === "ok") {
        resolve(data);
      } else {
        reject(data.message);
      }
    });
});
promise
  .then((data) => {
    // console.log(data.articles)
    // console.log(data.articles[0])
    // console.log(data.articles[0].title)
    // console.log(data.articles[0].content)
    let display = "";
    data.articles.forEach((article, index) => {
      display += `
        <div class="accordion accordion-flush" id="newsAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
                ${data.articles[index].title}
                </button>
              </h2>
              <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#newsAccordion">
              <div class="accordion-item">
                <div class="accordion-body">
                  <p>${data.articles[index].content}</p>
                </div>
              </div>
            </div>
        </div>
         `;
    });
    output.innerHTML = display;
  })
  .catch((err) => {
    console.log(err);
  });
