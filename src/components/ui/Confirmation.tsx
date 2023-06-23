import { useState } from "react";

type ConfirmationProps = {
    onConfirm: () => void;
}

export const Confirmation = ({ onConfirm }: ConfirmationProps) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);


    const handleConfirm = () => {
        onConfirm();
        setIsVisible(false);
    }

    const handleCancel = () => {
        setIsVisible(false);
    }
    
    return (
        isVisible && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <p className="mb-4">¿Estás seguro de que deseas confirmar?</p>
                <div>
                  <button className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConfirm}>
                    Confirmar
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
        )
    )
}
