import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us-container" style={styles.container}>
      <h1 style={styles.header}>About Raqeesha</h1>
      <p style={styles.text}>
        Raqeesha is a cross-continental brand that dresses women with confidence and boldness while seamlessly balancing femininity with strength. Known for its handmade custom pieces, every individual feels and looks their best in Raqeesha's signature silhouette.
      </p>
      <p style={styles.text}>
        Established since 2020, authenticity and mastery drive the creativity of the brand. Raqeesha comprises RAQEESHAWOMAN, RAQEESHABRIDE, and RAQEESHARTW. We accompany our clients through every moment of their life, creating a Raqeesha fit just for you.
      </p>
      <p style={styles.text}>
        Our mission is to empower women through clothes by preserving heritage and supporting the local community.
      </p>
      <p style={styles.text}>
        Our vision is to become a globally recognized brand synonymous with empowerment, elegance, and innovation.
      </p>
      <div style={styles.mapContainer}>
        {/* Embed Google Maps location */}
        <iframe
          title="Raqeesha Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.890845065884!2d-1.965550!3d52.476640!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3ARaqeesha!2sYOUR_STORE_NAME!5e0!3m2!1sen!2sus!4v1629837984483!5m2!1sen!2sus"
          width="600"
          height="450"
          style={styles.map}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <p style={styles.text}>
        Thank you for choosing us.
      </p>
    </div>
  );
};

// Styles object for inline styling
const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  header: {
    marginBottom: '1.5rem',
  },
  text: {
    marginBottom: '1rem',
    lineHeight: '1.6',
  },
  mapContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  map: {
    border: '0',
    maxWidth: '100%',
  },
};

export default AboutUs;
