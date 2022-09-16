// import mongoose from "mongoose";
import request from 'supertest';
import url from 'url';
import { expect } from 'chai';
import { app } from '../../server';

export {
  expect, app, url, request,
};

// export const UserModel = mongoose.model < User > "User";
// export const ProductModel = base < Product > "product";
// export const OrderModel = mongoose.model < Order > "Order";
// export const CartModel = mongoose.model < Cart > "Cart";
