
const Copyright = () => {
    return (
        <div>
            <div class="lg:container flex flex-col justify-center gap-10 mx-4 my-5 md:gap-24 md:flex-row md:mx-auto">
                <div class="flex items-center justify-center">
                    <img class="object-cover" src="https://ramarim.vteximg.com.br/arquivos/grupoRamarim.png" alt="Descrição da imagem" />
                </div>
                <div>
                    <p class="text-center text-xs md:text-sm md:text-start md:m-0">O Grupo Ramarim é uma das maiores empresas calçadistas do Brasil. Fundado em 1962, é formado pelas marcas Ramarim e Comfortflex. </p>
                    <p class="text-center mt-2 text-xs md:text-sm md:text-start md:m-0">Somos referência em pesquisa, moda, tecnologia do conforto e inovação, tudo pensado para levar as últimas tendências para o dia a dia das nossas consumidoras no Brasil e no mundo.</p>
                </div>
            </div>
            <div class="bg-gray-200 md:my-5">
                <div class="lg:container py-8 my-5 md:py-4">
                    <div class="flex flex-col items-center md:max-w-6xl md:flex-row md:gap-6 md:justify-between">
                        <p class="text-center mt-4 md:mt-0 text-gray-600 text-xs">© Ramarim 2021 - Rua General Nascimento Vargas, 154 - Sapiranga / RS.</p>
                        <div class="flex flex-col items-center gap-3 mt-5 max-w-xs md:items-end md:flex-row md:mt-0">
                            <div class="flex items-center gap-3 text-xs text-gray-600">
                                <p>Created by</p>
                                <img src="/" alt="wave" />
                            </div>
                            <div class="flex items-center gap-3 text-xs text-gray-600">
                                <p>Powered by</p>
                                <img src="/" alt="wave" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Copyright;