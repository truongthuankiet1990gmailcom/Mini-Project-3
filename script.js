const api = "https://j-son-server-dusky.vercel.app/category";
let searchvaluebutton = "";

fetch(api)
    .then((response) => response.json())
    .then((data) => {
        const newArray = data.map((item) => {
            return `
            <button class="category" id = "category">${item}</button>`;
        });
        const uniqueitem = [...new Set(newArray)];
        const htmls = uniqueitem.join("");
        const danhmuc = document.querySelector("#DanhMuc");
        danhmuc.innerHTML = htmls;
        const SearchButton = document.getElementById("searchbutton");
        const danhsach = document.querySelector("#DanhSach");
        SearchButton.addEventListener("click", () => {
            const searchvalue = document.getElementById("search").value;
            if (searchvalue !== "") {
                const searcharray = data.filter((item) => item.category === searchvalue);
                const htmls1 = searcharray.map((item) => {
                    return `
                    <div class="search-item">
                    <div class = "image"> <img src = "${item.images[0]}"></img>
                        ${item.description}

                    </div>`;
                }).join("");
                danhsach.innerHTML = htmls1;
            }
        });
        //CHỖ NÀY NÈ A
        const search = document.querySelectorAll(".category"); 

        for (let i = 0; i < search.length; i++) {
            search[i].addEventListener("click", () => {
                searchvaluebutton = search[i].innerHTML;
                test(searchvaluebutton);
            });
        }
        // CHỖ NÀY NÈ A
})
    .catch((error) => {
        console.log("Lỗi:", error);
    });

const test = (button) => {
    const api1 = "https://j-son-server-dusky.vercel.app/products";
        let searchvalue = searchvaluebutton;
        let params = {
            sort: "",
            order: "",
            page: "1",
            limit: "10",
            q : "",
            category: "",
        };
        let currentpage = 1;
        const itemperpage = 10;
        let choice = "mac-dinh";
        const danhsach = document.querySelector("#DanhSach");
        const SearchButton = document.getElementById("searchbutton");
        const filter = document.getElementById("filter");
        function returnlink() {
            params.q = searchvalue;
            link = (api1 + "?_sort=" + params.sort + "&_order=" + params.order + "&_page=" + params.page + "&_limit=" + params.limit + 
            "&q=" + params.q);
            const Page = document.getElementById("Page");
            Page.innerText = currentpage;
            return `${link}`;
        }
        function updateProductList(data) {
            const htmls = data.map((item) => {
                return `
                <div class="search-item">
                    <div class="inner-item">
                        <img class="inner-image" src="${item.images[0]}">
                        <p>${item.description}</p>
                        <div class = "percent">${item.discountPercentage}%</div>
                    </div>
                    
                </div>`;
            }).join("");
            danhsach.innerHTML = htmls;
        }
        const prev = document.getElementById("pagination_prev");
        const next = document.getElementById("pagination_next");
        prev.addEventListener("click", () => {
            if (currentpage > 1) {
                currentpage -= 1;
                params.page = currentpage;
                fetchProducts(returnlink());
            }
        });
        next.addEventListener("click", () => {
            currentpage += 1;
            params.page = currentpage;
            fetchProducts(returnlink());
        });
    
        function fetchProducts(link) {
            fetch(link)
                .then((response) => response.json())
                .then((data) => {
                    updateProductList(data);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        }
    
        fetch(api1)
            .then((response) => response.json())
            .then((data) => {
                let searcharray = data;
                updateProductList(data);
                fetchProducts(returnlink());
                SearchButton.addEventListener("click", () => {
                    searchvalue = document.getElementById("search").value;
                    params.page = 1; 
                    fetchProducts(getFilterLink());
                });
    
                filter.addEventListener("change", () => {
                    choice = filter.value;
                    params.page = 1; 
                    fetchProducts(getFilterLink());
                });
    
                function getFilterLink() {
                    if (choice === "thap-cao") {
                        params.sort = "price";
                        params.order = "asc";
                    } else if (choice === "cao-thap") {
                        params.sort = "price";
                        params.order = "desc";
                    } else if (choice === "giam-nhieu") {
                        params.sort = "discountPercentage";
                        params.order = "asc";
                    }
    
                    if (searchvalue !== "") {
                        params.q = searchvalue;
                    }
                    params.page = 1;
                    return returnlink();
                }
            })
            .catch((error) => {
                console.log("Lỗi:", error);
            });
}
    document.addEventListener("DOMContentLoaded", test);
