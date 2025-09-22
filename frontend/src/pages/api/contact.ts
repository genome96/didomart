import { NextApiRequest, NextApiResponse } from 'next';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'email', 'subject', 'message']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    
    // For now, we'll simulate saving to backend
    const contactData = {
      name,
      email,
      phone: phone || null,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    // Simulate API call to backend
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        return res.status(200).json({ 
          message: 'Contact form submitted successfully',
          data: contactData
        });
      } else {
        throw new Error('Backend API error');
      }
    } catch (backendError) {
      // If backend is not available, log the contact form data
      console.log('Contact form submission (backend unavailable):', contactData);
      
      return res.status(200).json({ 
        message: 'Contact form submitted successfully (logged locally)',
        data: contactData
      });
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
