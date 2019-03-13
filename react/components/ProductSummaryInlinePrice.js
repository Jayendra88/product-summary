import React from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'

import AttachmentList from './AttachmentList'
import ImageLoader from './ImageLoader'
import ProductImage from './ProductImage'
import ProductSummaryBuyButton from './ProductSummaryBuyButton'
import ProductQuantityStepper from './ProductQuantityStepper'
import ProductSummaryPrice from './ProductSummaryPrice'
import ProductSummaryName from './ProductSummaryName'

import productSummary from '../productSummary.css'

const ProductSummaryInline = ({
  product,
  showBorders,
  handleMouseEnter,
  handleMouseLeave,
  handleItemsStateUpdate,
  actionOnClick,
  imageProps,
  nameProps,
  priceProps,
  buyButtonProps,
  showQuantitySelector,
}) => {
  const containerClasses = classNames(
    productSummary.container,
    productSummary.containerInline,
    'overflow-hidden br3 h-100 w-100'
  )

  const summaryClasses = classNames(
    `${productSummary.element} pointer ph2 pt3 pb4 flex flex-column`,
    {
      'bb b--muted-4 mh2 mh3-ns mt2': showBorders,
    }
  )

  const nameClasses = {
    containerClass: 'flex items-start justify-left tl w-90 t-mini pb2',
    brandNameClass: 't-body c-on-base',
  }

  const priceClasses = {
    containerClass: classNames('flex flex-column items-end nr1 h1', {
      [`${productSummary.priceContainer} pv5`]: !showBorders,
    }),
    sellingPriceClass: 'dib ph2 t-body t-heading-5-ns',
  }

  const buyButtonClasses = {
    containerClass: `${productSummary.buyButtonContainer} pv3 w-100 dn`,
  }

  return (
    <section
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className={summaryClasses}>
        <Link
          className={`${productSummary.clearLink} flex`}
          page={'store.product'}
          params={{ slug: path(['linkText'], product) }}
          onClick={actionOnClick}
        >
          <div className={`${productSummary.imageContainer} db w-30`}>
            {path(['sku', 'image', 'imageUrl'], product) ? (
              <ProductImage {...imageProps} />
            ) : (
                <ImageLoader />
              )}
          </div>
          <div className={`${productSummary.information} w-70 pb2 pl3 pr3`}>
            <ProductSummaryName {...nameProps} {...nameClasses} />
            <AttachmentList product={product} />
            <div className="mt3 nr2">
              <div className="flex justify-end nr4 mb2">
                {showQuantitySelector && (
                  <ProductQuantityStepper
                    product={product}
                    onUpdateItemsState={handleItemsStateUpdate}
                  />
                )}
              </div>
              <ProductSummaryPrice {...priceProps} {...priceClasses} />
            </div>
          </div>
        </Link>
        <ProductSummaryBuyButton {...buyButtonProps} {...buyButtonClasses} />
      </article>
    </section>
  )
}

export default ProductSummaryInline
