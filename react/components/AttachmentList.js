import React from 'react'
import { productShape } from '../utils/propTypes'
import { pathOr } from 'ramda'

import RemovedAttachmentsList from './RemovedAttachmentsList'
import AddedAttachmentsList from './AddedAttachmentsList'

import styles from '../productSummary.css'

const shouldShowOption = option => option.extraQuantity > 0 || option.item.sellingPrice !== 0 

const AttachmentList = ({ product }) => {
  const addedOptions = pathOr([], ['assemblyOptions', 'added'], product)
  const removedOptions = pathOr([], ['assemblyOptions', 'removed'], product)
  const parentPrice = pathOr(0, ['assemblyOptions', 'parentPrice'], product)

  const filteredOption = addedOptions.filter(shouldShowOption)

  if (filteredOption.length === 0 && removedOptions.length === 0) {
    return null
  }

  return (
    <div className={`${styles.attachmentListContainer} pv2`}>
      <AddedAttachmentsList addedOptions={filteredOption} parentPrice={parentPrice} />
      <RemovedAttachmentsList removedOptions={removedOptions} />
    </div>
  )
}

AttachmentList.propTypes = {
  product: productShape,
}

export default AttachmentList
