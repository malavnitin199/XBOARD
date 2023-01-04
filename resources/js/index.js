let baseurl=`https://api.rss2json.com/v1/api.json?rss_url=`;
 
async function fetchData(index)
{
  let response=await fetch(`${baseurl}${magazines[index]}`);
  let json=await response.json();
  return json;
}
async function populateNews()
{

  let accordions=document.getElementsByClassName('accordion-body');
  let accbtn=document.getElementsByClassName('accordion-button');
  for(let i=0;i<accordions.length;i++)
  {
      let accdata= await fetchData(i);
      accbtn[i].innerHTML=`<p class="accordion-title">${accdata.feed.title}</p>`;
      let accordion=accordions[i];
      accordion.innerHTML=`<div id="accordion${i+1}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
      </div>
      <button class="carousel-control-next" type="button" data-bs-target="#accordion${i+1}" data-bs-slide="next">
        <i class="fa-sharp fa-solid fa-angle-right"></i>
        <span class="visually-hidden">Next</span>
      </button>
      </div>`;
      let carouinner = document.querySelector(`#accordion${i+1}> .carousel-inner`);
      console.log(carouinner);
      for(let j = 0; j < accdata.items.length; j++)
      {
          let pubDate=new Date(accdata.items[j].pubDate).toLocaleDateString('en-IN');
          let act=j==0?'active':'';
          carouinner.innerHTML += `<div class="carousel-item ${act}">
                                    <a href="${accdata.items[j].link}">
                                      <div class="card border-0 px-4">
                                        <img src="${accdata.items[j].enclosure.link}" class="card-img-top img-fluid px-4" alt="...">
                                        <div class="card-body">
                                          <h5 class="card-title mb-2">${accdata.items[j].title}</h5>
                                          <h6 class="card-subtitle mb-2 text-muted">${accdata.items[j].author} . ${pubDate}</h6>
                                          <p class="card-text">${accdata.items[j].description}</p>
                                        </div>
                                      </div>
                                    </a>
                                  </div>`;
       }
  }
}