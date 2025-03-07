import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import PartnerForm from './PartnerForm';

const PartnersList = ({ partners, onUpdatePartners }) => {
  const [editingPartner, setEditingPartner] = useState(null);
  const [addingPartner, setAddingPartner] = useState(false);

  // Handle editing a partner
  const handleEditPartner = (partner, index) => {
    setEditingPartner({ ...partner, index });
    setAddingPartner(false);
  };

  // Handle updating a partner
  const handleUpdatePartner = (updatedPartner) => {
    const updatedParticipants = [...partners];
    updatedParticipants[editingPartner.index] = {
      name: updatedPartner.name,
      address: updatedPartner.address,
      phone: updatedPartner.phone,
      specialties: updatedPartner.specialties
    };

    onUpdatePartners(updatedParticipants);
    setEditingPartner(null);
  };

  // Handle deleting a partner
  const handleDeletePartner = (index) => {
    if (confirm('Are you sure you want to delete this partner? This action cannot be undone.')) {
      const updatedParticipants = [...partners];
      updatedParticipants.splice(index, 1);
      onUpdatePartners(updatedParticipants);
    }
  };

  // Handle adding a new partner
  const handleAddPartner = () => {
    setAddingPartner(true);
    setEditingPartner(null);
  };

  // Handle saving a new partner
  const handleSaveNewPartner = (newPartner) => {
    const updatedParticipants = [...partners, newPartner];
    onUpdatePartners(updatedParticipants);
    setAddingPartner(false);
  };

  // Handle cancelling an edit/add operation
  const handleCancel = () => {
    setEditingPartner(null);
    setAddingPartner(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Partner Wreckers
        </h3>
        <button
          onClick={handleAddPartner}
          className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Add Partner
        </button>
      </div>

      {/* Partner List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {partners.map((partner, index) => (
          <div 
            key={index}
            className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
          >
            {editingPartner && editingPartner.index === index ? (
              <PartnerForm 
                partner={editingPartner}
                onSave={handleUpdatePartner}
                onCancel={handleCancel}
                buttonText="Update"
              />
            ) : (
              <div>
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {partner.name}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPartner(partner, index)}
                      className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeletePartner(index)}
                      className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {partner.address}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {partner.phone}
                </p>
                {partner.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {partner.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {partners.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No partners available for this location. Add your first partner to get started.
          </div>
        )}

        {/* Add Partner Form */}
        {addingPartner && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Add New Partner</h4>
            <PartnerForm 
              partner={{ name: '', address: '', phone: '', specialties: [] }}
              onSave={handleSaveNewPartner}
              onCancel={handleCancel}
              buttonText="Add Partner"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnersList;
