import { Item } from './item';

const generateId = function (prefix: string) {
  return prefix + Math.floor(Math.random() * 100000);
};

export const generateItemId = function () {
  return generateId('item_');
};

export const generateCommentId = function () {
  return generateId('comment_');
};

export const ITEMS : Item[] = JSON.parse(global.localStorage.getItem('testingApp')) || [];
