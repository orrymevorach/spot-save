import styles from './contact.module.scss';
import FormInformation from './form-information/form-information';
import Form from './form/form';

export default function Contact() {
  return (
    <div className={styles.contactContainer}>
      <FormInformation />
      <Form />
    </div>
  );
}
