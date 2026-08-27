export default function handler(req, res) {
  if (req.method === 'POST') {
    const { pin } = req.body;
    
    // We check against the secure environment variable
    if (pin === process.env.SECURE_PIN) {
      return res.status(200).json({
        success: true,
        links: {
          link1: process.env.SECURE_DRIVE_LINK_1,
          link2: process.env.SECURE_DRIVE_LINK_2
        }
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid PIN' });
    }
  }
  return res.status(405).json({ error: 'Method Not Allowed' });
}
