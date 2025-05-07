"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoPricetagOutline, IoRocketOutline } from "react-icons/io5";
import { PiPlus } from "react-icons/pi";
import { CustomButton } from "./CustomButton";

export const Dialog = () => {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <>
      <Button className="bg-black text-white flex gap-2 hover:bg-gray-950 cursor-pointer" onClick={() => setOpenModal(true)}>
        <PiPlus size={16} />
        Create new link
      </Button>
      <Modal show={openModal} size="md" onClose={ onCloseModal } popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-500 dark:text-white">Create new link</h3>
            <div>
              <div className="block">
                <Label htmlFor="url">Destination URL:</Label>
              </div>
              <TextInput
                id="url"
                type="url"
                placeholder="https://"
                value={email}
                required
              />
            </div>
            <div>
              <div className="block">
                <Label htmlFor="shortlink">Short link:</Label>
              </div>
              <TextInput id="shortlink" type="text" required placeholder="MyOwnLink" />
            </div>

            <div id="textarea">
              <div className="block">
                <Label htmlFor="description">Description: (Optional)</Label>
              </div>
              <Textarea
                id="description"
                required={ false }
                rows={ 4 }
              />
            </div>

            <div className="flex items-center text-sm justify-center font-semibold gap-2 px-4 py-3 rounded border border-gray-200">
              <IoPricetagOutline size={ 15 } />
              You don't have any tag created.
            </div>

            <div className="w-full flex justify-end flex-wrap gap-3">
              <CustomButton 
                children={ "Cancel" }
                color="light"
                onClick={ onCloseModal }
                className="border-none font-medium" />
              
              <CustomButton color={ "default" } 
                className="bg-neutral-700 hover:bg-neutral-800 h-8">
                <IoRocketOutline size={ 14 } />
                Create
              </CustomButton>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
