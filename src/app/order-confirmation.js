export default async function handler(req, res) {
  const Seller_Phone_Number='7305801920'
  // Set JSON header
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderData } = req.body;
    const { formData, cartItems, total } = orderData;

    // Validate required data
    if (!formData || !cartItems || !total) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required order data' 
      });
    }

    console.log('Processing order for:', formData.fullName);

    // Calculate total items and generate product details
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Format product details for different message types
    const productDetails = cartItems.map(item => 
      `${item.name} - ${item.price} x ${item.quantity}`
    ).join(', ');

    const productList = cartItems.map(item =>
      `• ${item.name} (${item.price} x ${item.quantity})`
    ).join('\n');

    const productSummary = cartItems.map(item =>
      `${item.name} (${item.quantity})`
    ).join(', ');

    // 1. Send SMS to BUYER using free TextBelt
    let buyerSmsSent = false;
    try {
      const buyerSmsMessage = `Fresh&Pure Order Confirmed!\nTotal: ${total}\nItems (${totalItems}): ${productSummary}\nWe'll ship soon! Order ID: ${Date.now()}`;
      
      const smsResponse = await fetch('http://textbelt.com/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone.replace(/\D/g, ''), // Remove non-digits
          message: buyerSmsMessage,
          key: 'textbelt', // Free tier key
        }),
      });

      const smsResult = await smsResponse.json();
      buyerSmsSent = smsResult.success;
      console.log('Buyer SMS sent:', buyerSmsSent);
    } catch (smsError) {
      console.log('Buyer SMS failed:', smsError.message);
    }

    // 2. Send SMS to SELLER using free TextBelt
    let sellerSmsSent = false;
    try {
      const sellerSmsMessage = `🛍️ NEW ORDER!\nCustomer: ${formData.fullName}\nTotal: ${total}\nItems: ${totalItems}\nProducts: ${productSummary}\nPhone: ${formData.phone}`;
      
      const smsResponse = await fetch('http://textbelt.com/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: Seller_Phone_Number, // Seller's phone number
          message: sellerSmsMessage,
          key: 'textbelt', // Free tier key
        }),
      });

      const smsResult = await smsResponse.json();
      sellerSmsSent = smsResult.success;
      console.log('Seller SMS sent:', sellerSmsSent);
    } catch (smsError) {
      console.log('Seller SMS failed:', smsError.message);
    }

    // 3. Send WhatsApp to BUYER using CallMeBot
    let buyerWhatsAppSent = false;
    try {
      const buyerWhatsAppMessage = `✅ ORDER CONFIRMED - Fresh&Pure Oils\n\n📦 Your Order Details:\n${productList}\n\n💰 Total Amount: ${total}\n📞 Contact: ${formData.phone}\n🏠 Shipping to: ${formData.address}, ${formData.city}\n\nThank you for choosing Fresh&Pure! We'll notify you when your order ships.`;
      
      await fetch(`https://api.callmebot.com/whatsapp.php?phone=${formData.phone}&text=${encodeURIComponent(buyerWhatsAppMessage)}&apikey=123456`);
      buyerWhatsAppSent = true;
      console.log('Buyer WhatsApp sent successfully');
    } catch (buyerWhatsAppError) {
      console.log('Buyer WhatsApp failed');
    }

    // 4. Send WhatsApp to SELLER using CallMeBot
    let sellerWhatsAppSent = false;
    try {
      const sellerMessage = `🛍️ NEW ORDER RECEIVED!\n\n👤 Customer Details:\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n📦 Order Summary (${totalItems} items):\n${productList}\n\n💰 Order Total: ${total}\n\n🏠 Shipping Address:\n${formData.address}\n${formData.city}, ${formData.zipCode}\n${formData.country}\n\n⏰ Order Time: ${new Date().toLocaleString()}\n\n📋 Order ID: ${Date.now()}`;
      
      await fetch(`https://api.callmebot.com/whatsapp.php?phone=${Seller_Phone_Number}&text=${encodeURIComponent(sellerMessage)}&apikey=123456`);
      sellerWhatsAppSent = true;
      console.log('Seller WhatsApp sent successfully');
    } catch (sellerWhatsAppError) {
      console.log('Seller WhatsApp failed');
    }

    console.log('All notifications completed');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Order confirmed! Check your messages for confirmation.',
      orderSummary: {
        customer: formData.fullName,
        total: total,
        itemCount: totalItems,
        products: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.desc,
          features: item.features
        }))
      },
      notifications: {
        buyerSMS: buyerSmsSent,
        sellerSMS: sellerSmsSent,
        buyerWhatsApp: buyerWhatsAppSent,
        sellerWhatsApp: sellerWhatsAppSent
      }
    });

  } catch (error) {
    console.error('Order confirmation error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Order placed but notifications failed. Please contact support.',
      error: error.message 
    });
  }
}