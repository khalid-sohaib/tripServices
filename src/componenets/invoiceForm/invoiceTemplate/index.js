// export const generateInvoiceHtml = (values, date) => {
//   const {billTo, discount, vat, other, tasks} = values;

//   // Calculate subtotal for all tasks
//   const subTotal = tasks.reduce((sum, task) => {
//     const taskQuantity = parseFloat(task.quantity) || 0;
//     const taskUnitPrice = parseFloat(task.unitPrice) || 0;
//     return sum + taskQuantity * taskUnitPrice;
//   }, 0);

//   // Calculate total
//   const total =
//     subTotal -
//     Math.abs(parseFloat(discount) || 0) +
//     (parseFloat(vat) || 0) +
//     (parseFloat(other) || 0);

//   // Build HTML for each task
//   const taskRows = tasks
//     .map(task => {
//       const taskQuantity = parseFloat(task.quantity) || 0;
//       const taskUnitPrice = parseFloat(task.unitPrice) || 0;
//       const taskSubTotal = (taskQuantity * taskUnitPrice).toFixed(2);
//       return `
//       <tr class="tableRow">
//         <td class="tableCell">${task.description || ''}</td>
//         <td class="tableCell">${taskQuantity}</td>
//         <td class="tableCell">${taskUnitPrice.toFixed(2)}</td>
//         <td class="tableCell">${taskSubTotal}</td>
//       </tr>
//     `;
//     })
//     .join('');

//   return `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; }
//           .title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px; }
//           .businessName { font-size: 18px; font-weight: bold; text-align: center; }
//           .tagline { font-size: 14px; color: orange; text-align: center; margin-bottom: 20px; }
//           .invoiceInfo { display: flex; justify-content: space-between; margin-bottom: 20px; }
//           .contactInfo { text-align: right; }
//           .table { width: 100%; border-top: 1px solid #000; border-bottom: 1px solid #000; margin-bottom: 20px; }
//           .tableHeader, .tableRow { display: flex; justify-content: space-between; padding: 10px; }
//           .tableHeader { background-color: #f0f0f0; }
//           .tableHeaderText, .tableCell { width: 25%; text-align: center; }
//           .summary { display: flex; justify-content: space-between; margin-top: 20px; }
//           .paymentInfo { width: 50%; }
//           .totals { width: 50%; text-align: right; }
//           .total { font-weight: bold; font-size: 16px; margin-top: 10px; }
//         </style>
//       </head>
//       <body>
//         <h1 class="title">INVOICE</h1>
//         <p class="businessName">Trip Services</p>
//         <p class="tagline">24/7 AT YOUR DOOR STEP</p>

//         <div class="invoiceInfo">
//           <div>
//             <p>Date: ${new Date(date).toLocaleDateString()}</p>
//             <p>Invoice No: #INV-001</p>
//             <p>Bill To: ${billTo}</p>
//           </div>
//           <div class="contactInfo">
//             <p>Phone: +447529910522</p>
//             <p>Email: tripservices@hotmail.com</p>
//           </div>
//         </div>

//         <table class="table">
//           <tr class="tableHeader">
//             <th class="tableHeaderText">Description</th>
//             <th class="tableHeaderText">Quantity</th>
//             <th class="tableHeaderText">Unit Price</th>
//             <th class="tableHeaderText">Amount</th>
//           </tr>
//           ${taskRows}
//         </table>

//         <div class="summary">
//           <div class="paymentInfo">
//             <p>Payment Method: Bank Transfer</p>
//             <p>Account No: 12345678</p>
//             <p>Thank you for your business!</p>
//           </div>
//           <div class="totals">
//             <p>SubTotal: $${subTotal.toFixed(2)}</p>
//             <p>Discount: -$${Math.abs(parseFloat(discount) || 0).toFixed(2)}</p>
//             <p>VAT: $${(parseFloat(vat) || 0).toFixed(2)}</p>
//             <p>Other Charges: $${(parseFloat(other) || 0).toFixed(2)}</p>
//             <h2 class="total">Total: $${total.toFixed(2)}</h2>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;
// };

export const generateInvoiceHtml = (values, date) => {
  const {billTo, discount, vat, other, tasks, companyName, bankAccount} =
    values;

  // Calculate subtotal for all tasks
  const subTotal = tasks.reduce((sum, task) => {
    const taskQuantity = parseFloat(task.quantity) || 0;
    const taskUnitPrice = parseFloat(task.unitPrice) || 0;
    return sum + taskQuantity * taskUnitPrice;
  }, 0);

  // Calculate total
  const total =
    subTotal -
    Math.abs(parseFloat(discount) || 0) +
    (parseFloat(vat) || 0) +
    (parseFloat(other) || 0);

  // Build HTML for each task
  const taskRows = tasks
    .map(task => {
      const taskQuantity = parseFloat(task.quantity) || 0;
      const taskUnitPrice = parseFloat(task.unitPrice) || 0;
      const taskSubTotal = (taskQuantity * taskUnitPrice).toFixed(2);
      return `
      <tr class="tableRow">
        <td class="tableCell">${task.description || ''}</td>
        <td class="tableCell">${taskQuantity}</td>
        <td class="tableCell">${taskUnitPrice.toFixed(2)}</td>
        <td class="tableCell">${taskSubTotal}</td>
      </tr>
    `;
    })
    .join('');

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
        ${
          companyName
            ? `
          <p class="businessName">Trip Services</p>
          <p class="tagline">24/7 AT YOUR DOOR STEP</p>
        `
            : ''
        }

        <div class="invoiceInfo">
          <div>
            <p>Date: ${new Date(date).toLocaleDateString()}</p>
            <p>Invoice No: #INV-001</p>
            <p>Bill To: ${billTo}</p>
          </div>
          ${
            companyName
              ? `
            <div class="contactInfo">
              <p>Phone: +447529910522</p>
              <p>Email: tripservices@hotmail.com</p>
            </div>
          `
              : ''
          }
        </div>

        <table class="table">
          <tr class="tableHeader">
            <th class="tableHeaderText">Description</th>
            <th class="tableHeaderText">Quantity</th>
            <th class="tableHeaderText">Unit Price</th>
            <th class="tableHeaderText">Amount</th>
          </tr>
          ${taskRows}
        </table>

        <div class="summary">
        <div class="paymentInfo">
          ${
            bankAccount
              ? `
              <p>Payment Method: Bank Transfer</p>
              <p>Account No: 12345678</p>
              <p>Thank you for your business!</p>
              `
              : ''
          }
            </div>
          <div class="totals">
            <p>SubTotal: $${subTotal.toFixed(2)}</p>
            <p>Discount: -$${Math.abs(parseFloat(discount) || 0).toFixed(2)}</p>
            <p>VAT: $${(parseFloat(vat) || 0).toFixed(2)}</p>
            <p>Other Charges: $${(parseFloat(other) || 0).toFixed(2)}</p>
            <h2 class="total">Total: $${total.toFixed(2)}</h2>
          </div>
        </div>
      </body>
    </html>
  `;
};
