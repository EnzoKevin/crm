import API from '../index';
import type { Contact } from '../../types/index';

export const GetContacts = async () => {
  try {
    const response = await API.get('contacts');
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.error('Erro identificado ao buscar contatos: ', err);
  }
};

export const SaveContact = async (contact: Contact) => {
  if (
    contact.name.trim() === '' ||
    contact.email.trim() === '' ||
    contact.phone.trim() === '' ||
    contact.company.trim() === ''
  ) {
    console.error(
      'Erro identificado ao salvar contato: Campos obrigatórios não preenchidos'
    );
    return;
  }
  try {
    const response = await API.post('contacts', contact);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (err) {
    console.error('Erro identificado ao salvar contato: ', err);
  }
};

export const UpdateContact = async (contact: Contact) => {
  if (
    contact.name.trim() === '' ||
    contact.email.trim() === '' ||
    contact.phone.trim() === '' ||
    contact.company.trim() === ''
  ) {
    console.error(
      'Erro identificado ao atualizar contato: Campos obrigatórios não preenchidos'
    );
    return;
  }
  try {
    const response = await API.put(`contacts/${contact.id}`, contact);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.error('Erro identificado ao atualizar contato: ', err);
  }
};

export const DeleteContact = async (contactId: string) => {
  try {
    const response = await API.delete(`contacts/${contactId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.error('Erro identificado ao deletar contato: ', err);
  }
};
