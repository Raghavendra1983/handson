import { makeAutoObservable } from 'mobx';
import { resolvePath } from 'react-router-dom';
import { productType } from '../types/productTypes';
import axiosInstance from '../../utils/axios';
import RootStore from '.';


export class productStore {
    rootStore: RootStore;
    products: productType[];
    constructor(rootStore: RootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
        this.products = [];
    }
    private loadProducts = async () => {
        const res = await axiosInstance.get('660/products');
        this.setProducts(await res.data);
    }

    private setProducts(val: productType[]) {
        this.products = val;

    }
    getProducts = async () => {

        await this.loadProducts();
        return this.products;

    }
}