import './Contact.css';

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-bg"></div>
      <div className="contact-inner">
        <h2>Let's <span className="gold">Connect</span></h2>
        <p className="sub">
          Interested in trading education, market discussions, or collaborations?
        </p>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! I\'ll get back to you soon.'); }}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message..." required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}