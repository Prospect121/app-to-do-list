import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IDataEntity } from '../../interfaces/data-entity';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractDataService<T extends IDataEntity> {
  constructor(
    private readonly _storage: Storage,
    private readonly _itemsKey: string
  ) {}

  private async _getStoredItems(): Promise<T[]> {
    const items = (await this._storage.get(this._itemsKey)) || [];
    if (!Array.isArray(items)) {
      throw new Error('Datos almacenados no válidos.');
    }
    return items;
  }

  private async _getNextId(): Promise<number> {
    const lastIdKey = `last_id_${this._itemsKey}`;
    const lastId = (await this._storage.get(lastIdKey)) || 0;
    const newId = lastId + 1;
    await this._storage.set(lastIdKey, newId);
    return newId;
  }

  async add(item: T): Promise<void> {
    const items = (await this._getStoredItems()) || [];
    item.id = await this._getNextId();
    items.push(item);
    await this._storage.set(this._itemsKey, items);
  }

  async update(id: number, updatedItem: T): Promise<void> {
    try {
      const items = await this._getStoredItems();
      const index = items.findIndex(item => item.id === id);

      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems[index] = updatedItem;
        await this._storage.set(this._itemsKey, updatedItems);
      } else {
        console.warn(`Registro con ID ${id} no encontrado.`);
      }
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const items = await this._getStoredItems();
      const updatedItems = items.filter(item => item.id !== id);

      if (updatedItems.length !== items.length) {
        await this._storage.set(this._itemsKey, updatedItems);
      } else {
        console.warn(`Registro con ID ${id} no encontrado para eliminar.`);
      }
    } catch (error) {
      console.error('Error al eliminar el Registro:', error);
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return await this._getStoredItems();
    } catch (error) {
      console.error('Error al obtener todos los registros:', error);
      return [];
    }
  }

  async getById(id: number): Promise<T | null> {
    try {
      const items = await this._getStoredItems();
      return items.find(item => item.id === id) || null;
    } catch (error) {
      console.error(`Error al obtener el registro con ID ${id}:`, error);
      return null;
    }
  }

  async filterItem(searchStr: string): Promise<T[]> {
    try {
      const items = await this._getStoredItems();
      return items.filter((item: T) =>
        Object.values(item).some(
          value =>
            value != null &&
            value
              .toString()
              .toLowerCase()
              .includes(searchStr?.toString().toLowerCase())
        )
      );
    } catch (error) {
      console.error('Error al filtrar los registros:', error);
      return [];
    }
  }

  async filterByFields(filters: {
    [key in keyof T]?: (string | boolean)[];
  }): Promise<T[]> {
    try {
      const items = await this._getStoredItems();

      return items.filter((item: T) => {
        return Object.entries(filters).every(([field, values]) => {
          const fieldValue = item[field as keyof T];

          if (typeof fieldValue === 'boolean') {
            return values.includes(fieldValue);
          }

          return values.some(
            (value: string | number) =>
              fieldValue != null &&
              fieldValue
                .toString()
                .toLowerCase()
                .includes(value.toString().toLowerCase())
          );
        });
      });
    } catch (error) {
      console.error('Error al filtrar los registros:', error);
      return [];
    }
  }
}
