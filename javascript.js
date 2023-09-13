
/* Başlangıç Ayrıca alttaki ilk kod sayfanın tamamiyle yüklenmesini beklemesi için yapıldı*/
document.addEventListener("DOMContentLoaded", () => {
    
    // Liste eleman ekler localstorage kullanarak
    let list = document.querySelector("#list")
    let todoList = localStorage.getItem("todolist")
    
    const toasts = document.querySelectorAll("#liveToast")
    const btnadd = document.querySelector("#liveToastBtn")
    
    if(todoList) {
        list.innerHTML = JSON.parse(todoList);
    }
    
    // Burası yeni eleman eklememizi sağlayan fonksiyon
    function newElement() {   
        const li = document.createElement("li");
        let task = document.querySelector("#task").value.trim()
        
        // toast kullanarak içi boş uyarıs gönderilir
        if(!task) {
            $(toasts[1]).toast('show')
            return;
        }
        
        /* Girilen Metnin Başındaki Ve Sonunda ki Boşlukları temizler*/
        document.querySelector("#task").value='';
        
        
        li.textContent = task;
        
        // Yapılan bir liste elemanın üzerini çizmemizi sağlar
        li.addEventListener("click" , () => {    
            if (li.classList.contains("checked"))
                li.classList.remove("checked");
            else
                li.classList.add("checked");
            localStorage.setItem("todolist",JSON.stringify(list.innerHTML));
        });
        
        // Silme butonunu oluşturur 
        const delspan = document.createElement("span");
        delspan.innerHTML = "&times;";
        delspan.classList.add("close");
        delspan.addEventListener("click",() => {
            removeElement(li);
        });
        
        // Bu butonu liste elemanına entegre ederiz
        li.appendChild(delspan);
        list.appendChild(li);
        
        // Listeye eklendi bildirimini toast metodu ile gösterir
        $(toasts[0]).toast('show')
        
        // todo listi localstorage de günveller  .stringify kullanarak stringe çevirir
        localStorage.setItem("todolist", JSON.stringify(list.innerHTML));
    };
    
    
    document.querySelector('#task').addEventListener("keypress", (event) => {
        if(event.key === "Enter") newElement();
    });

   
    document.querySelectorAll("#list li").forEach((item) => { 
        item.addEventListener("click" , () => {
            if(item.classList.contains("checked"))
                item.classList.remove("checked");
            else
                item.classList.add("checked");
            localStorage.setItem("todolist",JSON.stringify(list.innerHTML));
        })
    })


    document.querySelectorAll("#list span").forEach((item) => { 
        let li = item.parentNode;
        item.addEventListener("click",() => {
            removeElement(li);
        })
    })
        

    btnadd.addEventListener("click", newElement);

    
    function removeElement(li) {
        li.remove();
        localStorage.setItem("todolist", JSON.stringify(list.innerHTML));
    }
});

