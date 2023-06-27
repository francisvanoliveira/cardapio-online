$(document).ready(function () {
    cardapio.eventos.init();
})

var cardapio = {};

cardapio.eventos = {
    init: () => {
        cardapio.metodos.obterItensCardapio();
    }
}

cardapio.metodos = {
    //obter a lista de intens do cardapio
    obterItensCardapio: (categoria = 'burgers', vermais = false) => {
        var filtro = MENU[categoria];
        console.log(filtro);

        if(!vermais){
            $("#intensCardapio").html('') //para limpar a tla quando crregar um novo intem
            $("#btnVerMais").removeClass('hidden');
        }

        $.each(filtro, (i, e) => {
            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
                                            .replace(/\${nome}/g, e.name)
                                            .replace(/\${preco}/g, e.price.toFixed(2).replace('.', ','))

            //botao ver mais cliclado 12 itensa
            if(vermais && i >= 8 && i < 12){
                $("#intensCardapio").append(temp)
            }

            //paginação inicial 8 itens
            if(!vermais && i < 8){
                $("#intensCardapio").append(temp)
            }
            
        })

        //remove o ativo
        $(".container-menu a").removeClass('active');

        //seta o menu para ativo
        $("#menu-" + categoria).addClass('active');
    },

    //clique do botao ver mais
    verMais: () => {
        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(ativo, true);

        $("#btnVerMais").addClass('hidden');
    }
}

cardapio.templates = {

    item:`
        <div class="col-3 mb-5">
            <div class="card card-item">
                <div class="img-produto">
                    <img src="\${img}">
                </div>
                <p class="title-produto text-center mt-4"><b>\${nome}</b></p>
                <p class="price-produto text-center"><b>R$ \${preco}</b></p>
                <div class="add-carrinho">
                    <span class="btn-menos"><i class="fas fa-minus"></i></span>
                    <span class="add-numero-itens">0</span>
                    <span class="btn-mais"><i class="fas fa-plus"></i></span>
                    <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                </div>
            </div>
        </div>
    `
}