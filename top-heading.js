const access_key="a44de784b0204e87ba653bb103ad5d62"
const url=`
https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${access_key}`
let title= document.getElementById("title");
let content= document.getElementById("title-content");
let output= document.getElementById("output")
let promise = new Promise((resolve,reject)=>{
    let fetchRequest=fetch(url)
    let response =fetchRequest.then((data)=>{
        return data.json()
    }).then((data)=>{
        // console.log(data.status)
        if(data.status === 'ok'){
            resolve(data)
        }
        else{
            reject(data.message)
        }
    }) 
})
promise.then((data)=>{
    // console.log(data.articles)
    // console.log(data.articles[0])
    // console.log(data.articles[0].title)
    // console.log(data.articles[0].content)
    let display="";
    data.articles.forEach((article,index)=>{
        display+=
        `
        <div class="accordion collapse show" id="newsAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                ${data.articles[index].title}
                </button>
              </h2>
              <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <p>${data.articles[index].content}</p>
                </div>
              </div>
            </div>
        </div>
         `;
    });
    output.innerHTML=display;
}).catch((err)=>{
    console.log(err)
})
