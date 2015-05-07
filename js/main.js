(function() {
  $('#prebuilt-opt').change(function() {
    var opts = $(this).val().split(',')
    calc(+opts[0], +opts[1], opts[2], opts[3], opts[4])
  })

  $('#calc').click(function() {
    calc(+$('#width').val(), +$('#height').val(), $('#size').val(), $('#shape').val(), '')
  })

  function calc(w, h, size, shape, idPrefix) {
    function degrees(angle) { return angle * Math.PI / 180 }

    var b = .5 // bend tolerance
    var g = size == 's' ? 4 : 7 // wing length
    var a = shape == 'square' ? 90 : size == 's' ? 83 : 85 // bend angle

    var x = h / Math.tan(degrees(a)) // half the difference between the base and top
    var s = h / Math.sin(degrees(a)) // length of one side

    var L = w - 2*x + 2*s + 2*g + 4*b // total length
    var b1 = g + b/2
    var b2 = g + s + 3*b/2

    $('#' + idPrefix + 'length').text(L.toFixed(2) + '"')
    $('#' + idPrefix + 'bends').text([b1, b2].map(function(n) { return n.toFixed(2) + '"' }).join(', '))
  }
})()
