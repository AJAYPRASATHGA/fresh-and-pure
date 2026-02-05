import { Resend } from 'resend';
import{APIS} from "../../src/constent/const.ts"

// Initialize Resend with your API key
const resend = new Resend(APIS.RESEND_API_KEY);


// Your email address
const YOUR_EMAIL = 'freshandpure14@gmail.com'; // Change this if needed

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderData } = req.body;
    const { formData, cartItems, total } = orderData;

    // Calculate totals
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Create product list
    const productList = cartItems.map(item => {
      const priceValue = parseFloat(item.price.replace('$', '')) || 0;
      const subtotal = priceValue * item.quantity;
      return {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: `$${subtotal.toFixed(2)}`
      };
    });

    console.log('📦 New order received from:', formData.fullName);

    let emailSent = false;
    let emailError = null;

    // Send email to YOU (seller) only
    try {
      const { data, error } = await resend.emails.send({
        from: 'Fresh&Pure Orders <onboarding@resend.dev>',
        to: [YOUR_EMAIL], // Only sending to you
        subject: `🛍️ NEW ORDER: ${formData.fullName} - ${total}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; background: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 25px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">🛍️ NEW ORDER!</h1>
                <p style="margin: 10px 0 0; opacity: 0.9;">Fresh&Pure Oils</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 30px;">
                
                <!-- Urgent Alert -->
                <div style="background: #fee2e2; color: #dc2626; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; border-left: 4px solid #dc2626;">
                  <strong>⏰ ACTION REQUIRED:</strong> Process this order immediately
                </div>
                
                <!-- Customer Info -->
                <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                  <h3 style="margin-top: 0; color: #1e40af;">👤 Customer Details</h3>
                  <table style="width: 100%;">
                    <tr>
                      <td style="padding: 8px 0; width: 120px;"><strong>Name:</strong></td>
                      <td style="padding: 8px 0;">${formData.fullName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;"><strong>Email:</strong></td>
                      <td style="padding: 8px 0;">${formData.email}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;"><strong>Phone:</strong></td>
                      <td style="padding: 8px 0;">${formData.phone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;"><strong>Order Time:</strong></td>
                      <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;"><strong>Order ID:</strong></td>
                      <td style="padding: 8px 0;">#${Date.now().toString().slice(-8)}</td>
                    </tr>
                  </table>
                </div>
                
                <!-- Order Items -->
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #f59e0b;">📦 Order Items (${totalItems})</h3>
                  <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px; overflow: hidden;">
                    <thead>
                      <tr style="background: #f1f5f9;">
                        <th style="padding: 12px; text-align: left;">Product</th>
                        <th style="padding: 12px; text-align: center;">Qty</th>
                        <th style="padding: 12px; text-align: right;">Price</th>
                        <th style="padding: 12px; text-align: right;">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${productList.map(item => `
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                          <td style="padding: 12px;">${item.name}</td>
                          <td style="padding: 12px; text-align: center;">${item.quantity}</td>
                          <td style="padding: 12px; text-align: right;">${item.price}</td>
                          <td style="padding: 12px; text-align: right;">${item.subtotal}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
                
                <!-- Total Amount -->
                <div style="background: #dcfce7; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; border: 2px solid #10b981;">
                  <div style="font-size: 14px; color: #065f46;">ORDER TOTAL</div>
                  <div style="font-size: 32px; font-weight: bold; color: #065f46; margin: 10px 0;">${total}</div>
                  <div style="color: #059669;">(${totalItems} items)</div>
                </div>
                
                <!-- Shipping Address -->
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h3 style="margin-top: 0; color: #374151;">🏠 Shipping Address</h3>
                  <p style="margin: 5px 0;"><strong>${formData.fullName}</strong></p>
                  <p style="margin: 5px 0;">${formData.address}</p>
                  <p style="margin: 5px 0;">${formData.city}, ${formData.zipCode}</p>
                  <p style="margin: 5px 0;">${formData.country}</p>
                </div>
                
                <!-- Quick Actions -->
                <div style="text-align: center; margin: 30px 0;">
                  <a href="mailto:${formData.email}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                    📧 Email Customer
                  </a>
                  <a href="https://wa.me/91${formData.phone.replace(/\D/g, '').slice(-10)}" style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                    📱 WhatsApp
                  </a>
                  <a href="tel:${formData.phone}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                    📞 Call Now
                  </a>
                </div>
                
              </div>
              
              <!-- Footer -->
              <div style="background: #1e293b; color: white; padding: 20px; text-align: center;">
                <div>Fresh&Pure Order Management System</div>
                <div style="font-size: 12px; opacity: 0.8; margin-top: 10px;">
                  Order processed automatically at ${new Date().toLocaleTimeString()}
                </div>
              </div>
              
            </div>
          </body>
          </html>
        `,
      });

      if (error) {
        emailError = error;
        console.error('❌ Email error:', error);
      } else {
        emailSent = true;
        console.log('✅ Email sent to seller:', data?.id);
      }
    } catch (error) {
      emailError = error;
      console.error('❌ Email sending failed:', error.message);
    }

    // Also log to console for backup
    console.log('📋 ORDER DETAILS FOR MANUAL PROCESSING:');
    console.log('Customer:', formData.fullName);
    console.log('Phone:', formData.phone);
    console.log('Email:', formData.email);
    console.log('Total:', total);
    console.log('Items:', totalItems);
    console.log('Address:', `${formData.address}, ${formData.city}`);
    console.log('Products:', cartItems.map(item => `${item.name} x${item.quantity}`).join(', '));

    return res.status(200).json({ 
      success: true, 
      message: 'Order received! You will get an email notification.',
      emailSent: emailSent,
      orderSummary: {
        customer: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        total: total,
        itemCount: totalItems,
        address: `${formData.address}, ${formData.city}`,
        orderId: `#${Date.now().toString().slice(-8)}`
      }
    });

  } catch (error) {
    console.error('❌ Order processing error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Order processing failed. Please try again.' 
    });
  }
}