(function() {
  $('form').on('reset', function() {
    $('[id $= "length"], [id $= "bends"]').text('')
  })

  $('#prebuilt-opt').change(function() {
    var opts = $(this).val().split(',')
    calc(+opts[0], +opts[1], opts[2], opts[3], opts[4])
  })

  $('#calc').click(function() {
    calc(+$('#width').val(), +$('#height').val(), $('#size').val(), $('#shape').val(), '')
  })

  function calcMethod() {
    return $('#calcMethod').val() == 'pete' ? calcPete : calcScott
  }

  var calc = calcMethod()
  $('#calcMethod').change(function() {
    calc = calcMethod()
  })

  function calcScott(w, h, size, shape, idPrefix) {
    var b = 0 // bend tolerance
    var g = wingLength(size) // wing length
    var a = bendAngle(size, shape) // bend angle
    var t = size == 's' ? .25 : .375 // steel thickness


    h -= t // measure from the middle of the steel, account for thickness in height


    var x = h / Math.tan(a) // half the difference between the base and top
    var s = h / Math.sin(a) // length of one side

    var L = w - 2*x + 2*s + 2*g + 4*b // total length
    var bend1 = g + b/2
    var bend2 = g + s + 3*b/2


    $('#' + idPrefix + 'length').text(inchFormat(L))
    $('#' + idPrefix + 'bends').text([bend2, bend1].map(inchFormat).join(', '))
  }

  function calcPete(w, h, size, shape, idPrefix) {
    var g = wingLength(size) // wing length
    var a = bendAngle(size, shape) // bend angle

    var x = h / Math.tan(a) // half the difference between the base and top
    var s = h / Math.sin(a) // length of one side

    var b = w - 2*x // base length
    var L = b + 2*s + 2*g // total length


    var bend2 = (L - b) / 2 + .25
    var bend1 = bend2 - s

    $('#' + idPrefix + 'length').text(inchFormat(L))
    $('#' + idPrefix + 'bends').text([bend2].map(inchFormat).join(', '))
  }

  function wingLength(size) { return size == 's' ? 4 : 7 }
  function bendAngle(size, shape) { return radians(shape == 'square' ? 90 : size == 's' ? 83 : 85) }

  function radians(angle) { return angle * Math.PI / 180 }
  function inchFormat(n) { return n.toFixed(2) + '"' }
})()
