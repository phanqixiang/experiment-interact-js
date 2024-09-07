import './style.css'
import interact from 'interactjs'

const position = { x: 0, y: 0 } 
interact('#transform-image')
  .resizable({
    modifiers: [
      interact.modifiers.aspectRatio({
        // make sure the width is always double the height
        ratio: 'preserve',
        // also restrict the size by nesting another modifier
        modifiers: [
          interact.modifiers.restrictSize({ max: 'parent' }),
        ],
      }),
    ],
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        const currentTop = window.getComputedStyle(event.target).top.replace("px", "")
        const currentLeft = window.getComputedStyle(event.target).left.replace("px", "")

        const left = (parseFloat(currentLeft) || 0) + event.deltaRect.left
        const top = (parseFloat(currentTop) || 0) + event.deltaRect.top
        
        if(event.rect.width <= 200) return 
        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          top: `${top}px`,
          left: `${left}px`,
        })
      }
    }
  })
  .draggable({
    listeners: {
      move (event) {
        const currentTop = window.getComputedStyle(event.target).top.replace("px", "")
        const currentLeft = window.getComputedStyle(event.target).left.replace("px", "")
        const top = parseInt(currentTop) + event.dy
        const left = parseInt(currentLeft) + event.dx
        
        event.target.style.top = `${top}px`
        event.target.style.left = `${left}px`
      },
    }
  })