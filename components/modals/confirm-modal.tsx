import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useConfirmModal } from '@/hooks/use-confirm-modal';

export const ConfirmModal = () => {
  const { isOpen, onClose, onConfirm, storeInfo } = useConfirmModal();

  return (
    <Modal
      title={`Delete this "${storeInfo?.name}" store?`}
      description={`Do you really want to delete the store: "${storeInfo?.name}" (ID: ${storeInfo?.id})?\n\n\n This action deletes all the products and categories in this store. This action cannot be undone.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Continue</Button>
        </div>
      </div>
    </Modal>
  );
};
