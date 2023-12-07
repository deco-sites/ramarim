import { signal } from "@preact/signals";
import Modal from "$store/components/ui/Modal.tsx";

const openModal = signal(false);

export default function MeasurementChart() {
    const value = openModal.value;

    const openModalHandler = () => openModal.value = true;
    const closeModalHandler = () => openModal.value = false;

    return (
        <>  
            <button onClick={openModalHandler}>
                Ver tabela de medidas
            </button>
            <div class={!openModal.value ? "hidden" : ""}>
                <Modal
                    loading="lazy"
                    open={value}
                    onClose={closeModalHandler}
                >
                    <div
                    class="absolute top-0 bg-base-100 container"
                    >
                        <img src="https://ramarim.vtexassets.com/arquivos/Tabela%20de%20Medidas%20-%20Marketplace_Ramarim.png" />
                    </div>
                </Modal>
            </div>
        </>
    )
}