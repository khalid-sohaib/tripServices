import {companyLogoBase64} from './companyLogoBase64';
export const generateInvoiceHtml = async (values, date) => {
  const {
    billTo,
    customerAddress,
    discount,
    vat,
    other,
    tasks,
    companyName,
    bankAccount,
    email,
    phone,
    specialInstructions,
  } = values;

  console.log('template:   --- ', values);
  const invoiceNo = generateInvoiceNumber();
  const bankAccountNumber = '35390018';
  const companyEmail = 'tripservices@hotmail.com';
  const companyPhone = '+447529910522';
  const companysName = 'TRIP SERVICES LTD';
  const companyTagline = '24/7 Emergency Electrician Services';
  const bankSortCode = '60-06-14';

  function generateInvoiceNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  // Calculate subtotal for all tasks with precision
  const subTotal = tasks
    .reduce((sum, task) => {
      const taskQuantity = parseFloat(task.quantity) || 0;
      const taskUnitPrice = parseFloat(task.unitPrice) || 0;
      return sum + taskQuantity * taskUnitPrice;
    }, 0)
    .toFixed(2);

  // Calculate total with precision
  const total = (
    parseFloat(subTotal) -
    Math.abs(parseFloat(discount) || 0) +
    (parseFloat(vat) || 0) +
    (parseFloat(other) || 0)
  ).toFixed(2);

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
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        line-height: 1;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .container {
        padding: 0 10px;
        flex: 1;
        padding-bottom: 50px; 
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .header img {
        width: 120px;
      }
      h1 {
        margin: 0;
        font-size: 48px;
        font-weight: bold;
        color: #00488f;
        margin-bottom:20px;
      }
      .company-info {
        text-align: center;
        font-size: 12px;
      }
      .company-logo{
        text-align: center;
        font-size: 12px;
      }
      .bill-to {
        margin: 20px 0;
      }
      .bill-to p {
        margin: 0;
        font-size: 14px;
        font-weight: bold;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      .detailsContainer {
        margin-left: 60px;
        margin-right: 60px;
      }
      table,
      th,
      td {
        border: 1px solid black;
      }
      th,
      td {
        padding: 8px 12px;
        text-align: center;
        font-size: 14px;
      }
      th {
        font-weight: bold;
        background-color: #f2f2f2;
      }
      tfoot tr td:first-child {
        border: none;
      }
      .totals {
        text-align: right;
        margin-top: 20px;
      }
      .special-instructions {
        margin-top: 20px;
        font-size: 14px;
        font-weight: bold;
      }
      .special-instructions .spacer {
        margin-top: 20px;
        height: 40px;
      }
      .payment-instructions {
        margin-top: 60px; 
        text-align: left;
        font-size: 14px;
        line-height:0

      }
      .footer {
        width: 100%;
        text-align: center;
        padding: 10px 0;
        margin-top: auto; 
        color: #00488f
      }
      .line {
        border-top: 2px solid black;
        margin: 10px 250px 30px 0;
      }
      strong {
        font-weight: bold;
      }
      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 5px;
      }
      
      .row p {
        margin: 0; /* Remove default margins for better alignment */
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header Section -->
      <div class="header">
        <div>
          <h1>Invoice</h1>
          
          <div>
            <div class="row" >
              <p>Date: </p>
              <p><strong>${date.format('DD/MM/YYYY')}</strong></p>
            </div>
            
            <div class="row" >
              <p>Invoice No: </p>
              <p><strong>${invoiceNo}</strong></p>
            </div>

            <!-- Bill To Section -->
            <div>
            <div class="row" >
              <p>Bill To: </p>
              <p><strong>${billTo}</strong></p>
            </div>

            <div class="row" >
              <p> </p>
              <p> <strong>${customerAddress}</strong></p>
            </div>
          </div>
        </div>
        </div>
        <div class="company-info">
        ${
          companyName
            ? `
            <div class="company-logo">
            <img src="${companyLogoBase64}" alt="Company Logo" />
            <h3 style="color:#fa9626">${companyTagline}</h3>
            </div>
            `
            : ''
        }

        ${
          phone
            ? `
        <p>Phone: ${companyPhone}</p>
        `
            : ''
        }
        ${
          email
            ? `
        <p>Email: ${companyEmail}</p>
        `
            : ''
        }
        </div>
      </div>

     
      <div class="detailsContainer">
        <!-- Table Section -->
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${taskRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="text-align: right">Sub Total</td>
                <td>${subTotal}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right">VAT</td>
                <td>${parseFloat(vat).toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right"><strong>Total</strong></td>
                <td><strong>${total}</strong></td>
              </tr>
            </tfoot>
          </table>

        <!-- Special Instructions -->
        <div class="special-instructions">
        ${
          specialInstructions
            ? `
          <p style="margin-bottom: 30px">Special Instruction</p>
          <div class="line"></div>
          <div class="line"></div>
          `
            : ''
        }
        </div>

        <!-- Payment Info -->
        <div class="payment-instructions">
          ${
            companyName
              ? `
              <p>Make all payments to <strong>${companysName}</strong></p>
              `
              : ''
          }
          ${
            bankAccount
              ? `
          <p>Sort Code: <strong>${bankSortCode}</strong> Account Number: <strong>${bankAccountNumber}</strong></p>
          `
              : ''
          }
          ${
            email
              ? `
          <p>
            If you have any questions concerning this invoice, contact
            <strong>${companyEmail}</strong>
          </p>
          `
              : ''
          }
        </div>
        </div>

      </div>
      <!-- Footer -->
      <div class="footer">
        <p><strong>Thank You</strong></p>
        <p>We appreciate your business</p>
      </div>
  </body>
</html>

  `;
};
