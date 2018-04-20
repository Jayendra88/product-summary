import random from 'lodash/random'

const DEFAULT_PRODUCT = {
  listPrice: 1,
  sellingPrice: 0,
  installments: 0,
  installmentPrice: 0,
  name: 'ProductName',
  url: 'https://google.com',
  referenceCode: 'ReferenceCode',
  skuName: 'SkuName',
  brandName: 'BrandName',
}

export function createProduct(customProps) {
  const randomNumber = random(1, 12)
  const imageUrl = require(`../resources/images/imagem-prod-summary${randomNumber}.png`)
  return Object.assign({ imageUrl }, DEFAULT_PRODUCT, customProps)
}