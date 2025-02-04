import React from 'react';
import './About.css'; // You can add custom styles here

const About = () => {
  return (
    <div className='about-component'>
      <div className="about-container">
        <header className="about-header">
          <h1>About Medical Care</h1>
        </header>

        <section className="about-history">
          <h2>Our History</h2>
          <p>
            Founded in 2024, Medical Care has been at the forefront of healthcare services in the region.
            What began as a small clinic with a handful of dedicated doctors has now grown into a multi-specialty
            hospital, providing world-class care to thousands of patients every year. Over the years, we have built
            a reputation for excellence, compassion, and innovation in the field of healthcare.
          </p>
          <p>
            Our hospital was initially established by Shivam Singh with the vision of offering affordable and
            high-quality healthcare to the local community. Today, Medical Care stands as a beacon of medical excellence
            with a focus on patient-centered care, advanced medical technology, and a highly skilled team of doctors and
            healthcare professionals.
          </p>
        </section>

        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            At Medical Care, our mission is to provide exceptional healthcare services with the highest standards of
            quality and care. We are committed to delivering comprehensive medical services to individuals and families
            in a compassionate and supportive environment. Our team of doctors, nurses, and staff work together to ensure
            that every patient receives the best possible treatment and care.
          </p>
          <p>
            Our mission extends beyond healthcare; we are also dedicated to educating the community about health and
            wellness, advancing medical research, and fostering a healthy environment for all our patients. We aim to
            be a trusted partner in improving the health and well-being of everyone we serve.
          </p>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <p>
            Our core values form the foundation of everything we do. These values guide us in providing excellent care
            and ensuring that our patients receive the highest level of service. They are:
          </p>
          <ul>
            <li><strong>Compassion:</strong> We believe in providing care with empathy, understanding, and respect for all.</li>
            <li><strong>Excellence:</strong> We are committed to the highest standards of medical care, safety, and quality.</li>
            <li><strong>Integrity:</strong> We practice honesty, transparency, and ethics in all aspects of our work.</li>
            <li><strong>Innovation:</strong> We embrace new technologies and innovative practices to improve patient outcomes.</li>
            <li><strong>Teamwork:</strong> Collaboration among our staff is essential in delivering comprehensive care to our patients.</li>
          </ul>
        </section>

        <section className="about-services">
          <h2>Our Services</h2>
          <p>
            [Hospital Name] offers a wide range of medical services to cater to the diverse needs of our patients.
            Our state-of-the-art facilities and advanced medical technologies ensure that patients receive top-tier care
            in various specialties. Our key services include:
          </p>
          <ul>
            <li><strong>Emergency Care:</strong> Our emergency department is open 24/7, offering immediate care for accidents, injuries, and critical illnesses.</li>
            <li><strong>Surgical Services:</strong> We provide comprehensive surgical services in various fields, including general surgery, orthopedics, neurosurgery, and more.</li>
            <li><strong>Cardiology:</strong> Our cardiology department specializes in diagnosing and treating heart diseases with the latest technology and medical treatments.</li>
            <li><strong>Obstetrics and Gynecology:</strong> We offer a wide range of services for women’s health, including prenatal care, delivery, and postnatal care.</li>
            <li><strong>Oncology:</strong> Our oncology department provides expert cancer care, including chemotherapy, radiation therapy, and support services.</li>
          </ul>
          <p>
            In addition to these, we also offer specialized care in areas such as pediatrics, dermatology, orthopedics,
            mental health, and physiotherapy. We are constantly expanding our services to meet the evolving needs of our patients.
          </p>
        </section>

        <section className="about-team">
          <h2>Our Team</h2>
          <p>
            At Medical Care, our medical team consists of highly skilled and compassionate doctors, nurses, technicians,
            and support staff. Our doctors are specialists in their respective fields and work collaboratively to provide the
            best possible care for every patient. We are committed to continuous learning, keeping up with the latest medical
            advancements to provide the highest level of care.
          </p>
          <p>
            Our nursing staff is trained to provide comfort and support to patients and their families. The hospital's
            support staff, including administrative and technical teams, play a crucial role in ensuring smooth operations
            and quality service. Together, our team works relentlessly to ensure every patient’s comfort and recovery.
          </p>
        </section>

        <section className="about-achievements">
          <h2>Our Achievements</h2>
          <p>
            Over the years, Medical Care has achieved numerous milestones and accolades, including:
          </p>
          <ul>
            <li>Recognition as one of the best hospitals in Haryana.</li>
            <li>Accreditation from top medical bodies such as PCI.</li>
            <li>Successful completion of over 20 surgeries with high success rates.</li>
            <li>Introduction of innovative medical treatments and therapies that have positively impacted patient outcomes.</li>
            <li>Awarded for excellence in patient care and patient satisfaction.</li>
          </ul>
          <p>
            These accomplishments are a testament to our dedication to providing exceptional healthcare and continuously
            improving our services to better serve our community.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
