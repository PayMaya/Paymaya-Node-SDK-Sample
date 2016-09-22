$(function() {
  computeTotalAmount();

  $('#itemList').on('tap click', '.add', function(e) {
    e.preventDefault();
    var input = $(this).parent().children('input[type=text]');
    $(input).val(parseInt($(input).val(), 10) + 1);
    computeTotalAmount();
  });

  $('#itemList').on('tap click', '.minus', function(e) {
    e.preventDefault();
    var input = $(this).parent().children('input[type=text]');
    var value = parseInt($(input).val(), 10);
    if (value > 0) {
      $(input).val(value - 1);
    }
    computeTotalAmount();
  });

  $('#checkout').on('tap click', function(e) {
    e.preventDefault();
    if (validateForm()) {
      var body = {
        totalAmount: {
          currency: "PHP",
          value: $('#total').text()
        },
        buyer: {
          firstName: $('#firstName').val(),
          lastName: $('#lastName').val(),
          contact: {}
        },
        items: getItems(),
        requestReferenceNumber: (Math.floor((Math.random() * 1000000000) + 1)).toString(),
        isAutoRedirect: false
      };
      if ($('#email').val()) {
        body.buyer.contact.email = $('#email').val();
      }
      checkoutItems(constructHeader(), body);
    } else {
      alert('Please order at least one item and customer information.');
    }
  });

  $('#addItem').on('tap click', function(e) {
    e.preventDefault();
    if (validateItemForm()) {
      addItem();
      $('#addItemModal').modal('hide');
    } else {
      alert('Please fill in fields. Item price must be numeric.');
    }
  });
});

function computeTotalAmount() {
  var total = 0;
  $('.thumbnail').each(function() {
    total += parseFloat($(this).find('.price').text()) * parseInt($(this).find('.qty').val(), 10);
  });
  $('#total').text(total.toFixed(2));
}

function validateForm() {
  return  $('#firstName').val()
    && $('#lastName').val()
    && $('#total').text() !== '0.00';
}

function validateItemForm() {
  return $('#itemName').val()
    && $('#itemPrice').val()
    && $('#itemPrice').val() > 0;
}

function checkoutItems(auth, body) {
  var errorMessage = 'Encountered error in checkout!';
  $.ajax({
    url: "/checkout",
    type: 'POST',
    data: JSON.stringify(body),
    headers: auth,
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      if (data && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert(errorMessage);
      }
    },
    error: function(e) {
      var error = e.responseJSON && e.responseJSON.error
        ? JSON.stringify(e.responseJSON.error)
        : errorMessage;
      alert(error);
    }
  });
}

function getItems() {
  var items = [];
  $('.thumbnail').each(function() {
    var quantity = $(this).find('.qty').val();
    var amount = $(this).find('.price').text();
    if (quantity !== '0') {
      items.push({
        name: $(this).find('.caption h3').text(),
        quantity: quantity,
        amount: {
          value: amount
        },
        totalAmount: {
          value: '' + (parseFloat(amount) * parseInt(quantity, 10)).toFixed(2)
        }
      });
    }
  });
  return items;
}

function constructHeader() {
  return { 'Authorization': 'Basic ' + btoa($('#apiKey').val() + ':') };
}

function addItem() {
  var html = '<div class="col-md-3 col-sm-6 hero-feature">'
  + '<div class="thumbnail">'
  + '<img class="icon" src="http://placehold.it/250x130" alt="">'
  + '<div class="caption">'
  + '<h3 class="truncate">' + $("#itemName").val() + '</h3>'
  + '<p><span class="price">' + parseFloat($("#itemPrice").val()).toFixed(2) + '</span></p>'
  + '<p><a href="#" class="btn btn-default minus">-</a> <input type="text" class="qty form-control" value="0" readonly/> <a href="#" class="btn btn-default add">+</a>'
  + '</p></div></div></div>';
  $('#itemList').append(html);
}
