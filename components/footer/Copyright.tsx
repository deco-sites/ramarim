interface Props {
    text: {
        institucionalText?: string,
        copyrightText?: string,
    }
}

export default function Copyright(props: Props) {
    const { institucionalText, copyrightText } = props.text;
    return (
        <div>
            <div class="lg:container flex flex-col justify-center gap-10 mx-4 my-5 md:gap-24 md:flex-row md:mx-auto">
                <div class="flex items-center justify-center">
                    <img src="https://ramarim.vteximg.com.br/arquivos/grupoRamarim.png" alt="Descrição da imagem" />
                </div>
                <div>
                    <p class="text-center text-xs md:text-sm md:text-start md:m-0">{institucionalText}</p>
                </div>
            </div>
            <div class="bg-gray-200 md:my-5">
                <div class="lg:container py-8 my-5 md:py-4">
                    <div class="flex flex-col items-center md:max-w-6xl md:flex-row md:gap-6 md:justify-between">
                        <p class="text-center mt-4 md:mt-0 text-gray-600 text-xs">{copyrightText}</p>
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