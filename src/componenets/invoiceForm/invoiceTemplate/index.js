export const generateInvoiceHtml = (values, date) => {
  const {billTo, description, quantity, unitPrice, discount, vat, other} =
    values;

  const subTotal = parseFloat(quantity) * parseFloat(unitPrice) || 0;
  const total =
    subTotal -
    (parseFloat(discount) || 0) +
    (parseFloat(vat) || 0) +
    (parseFloat(other) || 0);

  return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px; }
            .businessName { font-size: 18px; font-weight: bold; text-align: center; }
            .tagline { font-size: 14px; color: orange; text-align: center; margin-bottom: 20px; }
            .invoiceInfo { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .contactInfo { text-align: right; }
            .table { width: 100%; border-top: 1px solid #000; border-bottom: 1px solid #000; margin-bottom: 20px; }
            .tableHeader, .tableRow { display: flex; justify-content: space-between; padding: 10px; }
            .tableHeader { background-color: #f0f0f0; }
            .tableHeaderText, .tableCell { width: 25%; text-align: center; }
            .summary { display: flex; justify-content: space-between; margin-top: 20px; }
            .paymentInfo { width: 50%; }
            .totals { width: 50%; text-align: right; }
            .total { font-weight: bold; font-size: 16px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1 class="title">INVOICE</h1>
          <p class="businessName">Trip Services</p>
          <p class="tagline">24/7 AT YOUR DOOR STEP</p>
          
          <div class="invoiceInfo">
            <div>
              <p>Date: ${new Date(date).toLocaleDateString()}</p>
              <p>Invoice No: #INV-001</p>
              <p>Bill To: ${billTo}</p>
            </div>
            <div class="contactInfo">
              <p>Phone: +447529910522</p>
              <p>Email: tripservices@hotmail.com</p>
            </div>
          </div>
  
          <table class="table">
            <tr class="tableHeader">
              <th class="tableHeaderText">Description</th>
              <th class="tableHeaderText">Quantity</th>
              <th class="tableHeaderText">Unit Price</th>
              <th class="tableHeaderText">Amount</th>
            </tr>
            <tr class="tableRow">
              <td class="tableCell">${description}</td>
              <td class="tableCell">${quantity}</td>
              <td class="tableCell">${unitPrice}</td>
              <td class="tableCell">${subTotal}</td>
            </tr>
          </table>
  
          <div class="summary">
            <div class="paymentInfo">
              <p>Payment Method: Bank Transfer</p>
              <p>Account No: 12345678</p>
              <p>Thank you for your business!</p>
            </div>
            <div class="totals">
              <p>SubTotal: $${subTotal.toFixed(2)}</p>
              <p>Discount: -$${discount}</p>
              <p>VAT: $${vat}</p>
              <p>Other Charges: $${other}</p>
              <h2 class="total">Total: $${total.toFixed(2)}</h2>
            </div>
          </div>
        </body>
      </html>
    `;
};
