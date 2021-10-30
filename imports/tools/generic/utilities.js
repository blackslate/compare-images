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





/// MOUSE/TOUCH EVENT FUNCTIONS ///
// https://gist.github.com/blackslate/6f77d3acd2edc2a286cff6d607cf3ce8

/**
 * DETECT MOVEMENT
 * ---------------
 * Sometimes you want a simple click to perform one action and a drag
 * on the same element to perform a different action. You can create two
 * methods, (say) startDrag() and clickAction(), and use the following
 * function (plus the functions below) to determine which of the two
 * actions will be triggered.
 *
 *  const checkForDrag = (event) => {
 *    event.preventDefault()
 *
 *    detectMovement(event, 10, 250) //
 *    .then(
 *      () => startDrag(event) // use same event to start drag action
 *     )
 *    .catch(clickAction)
 *  }
 *
 * startDrag will be called if the mouse or touch point moves 10 pixels
 * or more within 250 milliseconds. clickAction will be called if there
 * is no movement within this time, or if the mouse/touch pressure is
 * released before this time.
 *
 * SET TRACKED EVENTS
 * ------------------
 * When dragging an element, you generally want one function to be
 * called for any movement, and another to be triggered when the element
 * is dropped. You don't want to have to create separate code for
 * mouse events and touch events, even if these events generate
 * the current x and y positions in different ways.
 *
 * The setTrackedEvents() function allows you to provide a starting
 * event (mouseDown or touchStart) and two functions that should be
 * called: one for mousemove|touchmove and the other for mouseup|
 * touchend.
 *
 * X and Y COORDINATES
 * -------------------
 * You can use getPageXY() and the more generic getXY() (which allows
 * you to obtain clientX,clientY or offsetX,offsetY if you prefer)
 * to get the current mouse position or the position of the first
 * touch point, without worrying about whether the input is from a
 * mouse or a touch screen.
 *
 * let dragMe = <your draggable element>
 *   , offset         // set to { x, y } offset of top left of element
 *   , cancelTracking // set to { move: <function>, end: <function>}
 *
 * const drag = (event) => {
 *   const { x, y } = getPageXY(event)
 *   dragMe.style.left = (offset.x + x )+ "px"
 *   dragMe.style.top =  (offset.y + y )+ "px"
 * }
 *
 * const drop = () => {
 *   setTrackedEvents(cancelTracking)
 *   // Do whatever needs to be done when the element is dropped
 * }
 *
 * const startDrag = (event) => {
 *   const { x, y } = getPageXY(event)
 *   const { left, top } = dragMe.getBoundingClientRect()
 *   offset = { x: left - x, y: top - y }
 *
 *   const options = {
 *     event
 *   , drag
 *   , drop
 *   }
 *
 *   // Remember the functions used for event listeners, so that they
 *   // can be removed from the element when the drag is complete.
 *   cancelTracking = setTrackedEvents(options)
 * }
 *
 * const checkForDrag = (event) => {
 *   event.preventDefault()
 *
 *   detectMovement(event, 16)
 *   .then(
 *     () => startDrag(event)
 *    )
 *   .catch(clickAction)
 * }
 *
 * ===============================================================
 * NOTE FOR REACT USERS CREATING WEB APPS FOR TOUCH SCREEN DEVICES
 * ===============================================================
 * React refuses to add non-passive (cancellable) event listeners for
 * touchstart. With a passive event listener, the whole page is likely
 * to move at the same time as the dragged element, which is probably
 * not what you want.
 *
 * As a result, you should NOT use React to add to pass an onTouchStart
 * function the same way that you would pass an onMouseDown function to
 *  your draggable element.
 *
 * Instead, you need to apply your touchstart event listener directly
 * to the DOM element that you want to drag, as shown below.
 *
 * const dragRef = useRef()
 *
 * return (
 *   <main>
 *     <div
 *       onMouseDown={checkForDrag}
 *       ref={dragRef}
 *     />
 *   </main>
 * );
 *
 * useEffect(() => {
 *   dragMe = dragRef.current
 *   dragMe.addEventListener("touchstart", checkForDrag, false)
 * })
 */

 export const getPageXY = (event) => {
  if (event.targetTouches && event.targetTouches.length) {
    event = event.targetTouches[0] || {}
  }

  return { x: event.pageX, y: event.pageY }
}


// The prevent default function needs to be outside setTrackedEvents
// so that the exact same function (rather than a duplicate). It
// doesn't need to be exported
const noDefault = (event) => event.preventDefault()

export const setTrackedEvents = ({ actions, event, drag, drop }) => {
  // Omit event to cancel tracking
  const body = document.body
  const dragOption = { passive: false } // capture is false by default

  if (event) {
    if (typeof actions !== "object") {
      actions = {}
    }

    if (event.type === "touchstart") {
      actions.move  = "touchmove"
      actions.end   = "touchend"
    } else {
      actions.move  = "mousemove"
      actions.end   = "mouseup"
    }

    switch (typeof drag) {
      case "function":
      break
      default: // case "string":
        drag = defaultDragAction(event, drag)
      break
    }

    body.addEventListener(actions.move, drag, false)
    body.addEventListener(actions.end, drop, false)
    // Prevent the page scrolling during drag, on touch devices
    document.addEventListener("touchstart", noDefault, dragOption)

  } else {
    body.removeEventListener(actions.move, drag, false)
    body.removeEventListener(actions.end, drop, false)
    // Restore page scrolling on touch devices now that drag is over
    document.removeEventListener("touchstart", noDefault)
  }

  return { actions, drag, drop }
}