/**
 * /imports/tools/generic/utilities.js
 */

export const removeFrom = (array, item, removeAll) => {
  let removed = 0

  // If `item` is an array of items or functions, treat recursively
  if (Array.isArray(item)) {
    removed = item.reduce((excess, entry) => {
      excess += removeFrom(array, entry, removeAll)
      return excess
    }, 0)

    return removed
  }

  // If we get here, item is an individual items or function
  let index
    , found

  do {
    if (typeof item === "function") {
      index = array.findIndex(item)
    } else {
      index = array.indexOf(item)
    }

    found = !(index < 0)
    if (found) {
      array.splice(index, 1)
      removed += 1
    }
  } while (removeAll && found)

  return removed
}