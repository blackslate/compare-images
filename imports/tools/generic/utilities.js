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


/**
 * Calculates the dimensions and aspect-ratio of an image file.
 *
 * @param {string} src:     url of image whose size is required
 * @param {*} timeOutDelay: only used if it is a positive integer
 *                          number of milliseconds
 * @returns a Promise that will resolve with an object with the format
 *    { width:  <image width>
 *    , height: <image height>
 *    , ratio:  <width / height>
 *    }
 * If there is an error in the URL or in the network connection, or if
 * a timeOutDelay is given and the image takes too long to load, the
 * promise will be rejected with a string error message.
 */
export const getImageSize = (src, timeOutDelay) => {
  return new Promise((resolve, reject) => {
    if (isNaN(timeOutDelay) ||timeOutDelay < 0) {
      timeOutDelay = 0
    }

    const image = new Image()

    const calculateSize = (event) => {
      const width = image.width
      const height = image.height
      const ratio = width / height

      const size = {
        width
      , height
      , ratio
      }

      resolve(size)
    }

    const abandon = (error) => {
      const message = error
                    ? `Error loading  "${src}"`
                    : `Image "${src}": loading timed out after ${timeOutDelay} ms`

      reject(message)
    }

    image.addEventListener("load", calculateSize, false)
    image.addEventListener("error", abandon, false)

    if (timeOutDelay) {
      setTimeout(abandon, timeOutDelay)
    }

    image.src = src
  })
}


/**
 * Use debounce() to prevent a given function from being triggered
 * many times in a row. The function returns a hangFire() function
 * which is wrapped in a closure with a timeOut property. Each time
 * hangFire() is called, it clears and resets a timeout, which will
 * only fire if there is a sufficient delay before it is called again.
 * When the timeout finally triggers, it sets of the triggerHappy()
 * function, using the arguments passed to the hangFire() call.
 *
 * Usage:
 *
 *    function example( a, b, c ) { console.log( a, b, c ) }
 *    const debounced = debounce(example) // function hangFire()
 *    debounced(1,2,3)
 *    debounced(4,5,6)
 *    debounced(7,8,9)
 *
 *    [250 millisecond pass, and then, in the console:]
 *
 * >  7 8 9
 *
 */
export const debounce = (triggerHappy, timeOutDelay = 250) => {
  let timeOut

  const hangFire = (...args) => { // rest syntax: args is an array
    const fireRound = () => {
      clearTimeout(timeOut)
      triggerHappy(...args) // spread syntax:
                            // args array spread into discrete arguments
    }

    clearTimeout(timeOut)
    timeOut = setTimeout(fireRound, timeOutDelay)
  }

  return hangFire
}