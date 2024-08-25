document.addEventListener('DOMContentLoaded', () => {
  const orderItems = document.querySelectorAll('.order-item');
  const orderList = document.getElementById('order-list');
  const totalAmount = document.getElementById('total-amount');
  const placeOrderButton = document.getElementById('place-order');

  let order = [];

  orderItems.forEach(item => {
    item.addEventListener('change', (e) => {
      const itemName = e.target.nextElementSibling.querySelector('.flavor, .dessert').textContent;
      const itemPrice = parseFloat(e.target.dataset.price);

      if (e.target.checked) {
        order.push({ name: itemName, price: itemPrice });
      } else {
        order = order.filter(orderItem => orderItem.name !== itemName);
      }

      updateOrderSummary();
    });
  });

  function updateOrderSummary() {
    orderList.innerHTML = '';
    let total = 0;

    order.forEach(orderItem => {
      const listItem = document.createElement('li');
      listItem.textContent = `${orderItem.name} - $${orderItem.price.toFixed(2)}`;
      orderList.appendChild(listItem);
      total += orderItem.price;
    });

    totalAmount.textContent = total.toFixed(2);
  }

  placeOrderButton.addEventListener('click', () => {
    if (order.length > 0) {
      alert('Thank you for your order!');
      order = [];
      updateOrderSummary();
      orderItems.forEach(item => item.checked = false);
    } else {
      alert('Please select items to order.');
    }
  });
});
