$('#calc').click(function() {
  function degrees(angle) { return angle * Math.PI / 180 }

  var size = $('#size').val()
  var shape = $('#shape').val()
  var w = +$('#width').val()
  var h = +$('#height').val()
  var b = .5 // bend tolerance
  var g = size == 's' ? 4 : 7 // wing length
  var a = shape == 'square' ? 90 : size == 's' ? 83 : 85 // bend angle

  var x = h / Math.tan(degrees(a)) // half the difference between the base and top
  var s = h / Math.sin(degrees(a)) // length of one side

  var L = w - 2*x + 2*s + 2*g + 4*b // total length
  var b1 = g + b/2
  var b2 = g + s + 3*b/2

  $('#length').text(L.toFixed(2) + '"')
  $('#bends').text([b1, b2].map(function(n) { return n.toFixed(2) + '"' }).join(', '))
})
