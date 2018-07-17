$(function(){
    var listItems = [];

    $.getJSON( "ListJSONTest.json", function(data){
        //products = data;
        listItems = data.List;
        $(document).on('click', 'a', function(){
            var attr = $(this).data('name');
            createHTML(listItems.sort(sortByProperty(attr)));
        });
        $(document).on('click', '.logo', function(){
            $('#products').show();
            $('.shopping-cart').hide();
            createHTML(listItems.sort(sortByProperty('displayOrder')));
        });
        createHTML(listItems);

    } );

    function createHTML(data){
        var rawTemplate = document.getElementById('list-container').innerHTML;
        var compiledTemplate = Handlebars.compile(rawTemplate);
        var ourGeneratedTemplate = compiledTemplate(data);

        var container = document.getElementById('products');
        container.innerHTML = ourGeneratedTemplate;
    }
    var shoppingCart = [];
    
    $(document).on('click','.product-cart', function() {
        var singleProduct = {};
        singleProduct.id = $(this).data("id");
        singleProduct.name = $(this).data("name");
        singleProduct.img = $(this).data("image");
        shoppingCart.push(singleProduct);
        alert("Item successfully added in cart!");
        document.getElementById('totalItems').innerHTML = shoppingCart.length;
        
    });

    
    $(document).on('click', '.btn-cart', function(){
        if(shoppingCart.length === 0){
            alert('No Items in Shopping Cart');
        }
        else if(shoppingCart.length !== 0){
            displayCart();
        }
    });
    
    function displayCart(){
        $('#products').hide();
        $('.shopping-cart').show();
        document.getElementById('item-list').innerHTML = '';
        for(product in shoppingCart){
            var li = document.createElement('li');
            var img = document.createElement('img');
            img.src = shoppingCart[product].img;
            var h3 = document.createElement('h3');
            h3.innerHTML = shoppingCart[product].name;
            var a = document.createElement('a');
            a.innerHTML = 'Delete';
            a.className = 'remove-item';
            a.id = shoppingCart[product].id;
            var span =  document.createElement('span');
            span.title = "remove Item";
            span.appendChild(a);
            li.appendChild(img);
            li.appendChild(h3);
            li.appendChild(span);
            document.getElementById('item-list').appendChild(li);
        }
    }

    $(document).on('click', '.remove-item', function(e){
        const id = e.target.id;
        for(var i=0; i<shoppingCart.length; i++){
            if(id == shoppingCart[i].id){
                shoppingCart.splice(i, 1);
            }
        }
        document.getElementById('totalItems').innerHTML = shoppingCart.length;
        if(shoppingCart.length == 0){
            $('#products').show();
            $('.shopping-cart').hide();
        }
        else if (shoppingCart.length > 0){
            displayCart();
        }
    });

    var sortByProperty = function (property) {
        
            return function (x, y) {
        
                return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        
            };
        
        };
        
    
});