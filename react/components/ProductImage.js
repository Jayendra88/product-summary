import React from 'react'
import { pathOr, isEmpty, compose } from 'ramda'
import PropTypes from 'prop-types'
import {
  CollectionBadges,
  DiscountBadge,
} from 'vtex.store-components'
import classNames from 'classnames'

import Image from './Image'
import { productShape } from '../utils/propTypes'

import productSummary from '../productSummary.css'

const maybeBadge = ({ listPrice, price, label }) => condition => component => {
  if (condition) {
    return (
      <DiscountBadge
        listPrice={listPrice}
        sellingPrice={price}
        label={label}
      >
        {component}
      </DiscountBadge>
    )
  }
  return component
}

const maybeCollection = ({ productClusters }) => condition => component => {
  if (condition) {
    const collections = productClusters.map(cl => cl.name)
    return (
      <CollectionBadges collectionBadgesText={collections}>
        {component}
      </CollectionBadges>
    )
  }
  return component
}

const ProductImage = ({ product, showBadge, badgeText, showCollections, displayMode }) => {
  const {
    productClusters,
    productName: name,
    sku: {
      image: { imageUrl },
    },
  } = product

  const imageClassName = classNames({
    [productSummary.imageNormal]: displayMode !== 'inline',
    [productSummary.imageInline]: displayMode === 'inline'
  })

  const commertialOffer = pathOr({}, ['sku', 'seller', 'commertialOffer'], product)

  const withBadge = maybeBadge({ listPrice: commertialOffer.ListPrice, price: commertialOffer.Price, label: badgeText })
  const withCollection = maybeCollection({ productClusters })
  const img = (<Image className={imageClassName} description={name} src={imageUrl} />)

  return compose(withBadge(showBadge), withCollection(showCollections && !isEmpty(productClusters)))(img)
}

ProductImage.propTypes = {
  /** Product that owns the informations */
  product: productShape,
  /** Set the discount badge's visibility */
  showBadge: PropTypes.bool,
  /** Text shown on badge */
  badgeText: PropTypes.string,
  /** Defines if the collection badges are shown */
  showCollections: PropTypes.bool,
  /** Display mode of the summary */
  displayMode: PropTypes.string
}

export default ProductImage
