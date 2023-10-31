import HeadingText from '@/components/shared/heading-text/heading-text';
import Button from '@/components/shared/button/button';
import styles from './form.module.scss';

const Input = ({ id, label, placeholder, isRequired }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} id={id} className={styles.label}>
        {label}
        {isRequired && <span>*</span>}
      </label>

      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        required={isRequired}
        className={styles.input}
      />
    </div>
  );
};

const fields = [
  {
    id: 'name',
    label: 'Your Name',
    placeholder: 'What should we call you?',
    isRequired: true,
  },
  {
    id: 'email',
    label: 'Email Address',
    placeholder: 'email@website.com',
    isRequired: true,
  },
  {
    id: 'hostelName',
    label: 'Hostel Name',
    placeholder: 'What is your hostel called?',
  },
];

export default function Form() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formInnerContainer}>
        <HeadingText isMedium>Contact Us</HeadingText>
        <p className={styles.formText}>
          Schedule a demo with a member of our team to learn more about how
          SpotSave can improve the booking experience for your customers.
        </p>
        <form action="#">
          {fields.map(field => {
            return <Input {...field} key={field.id} />;
          })}
          <Button href={'/'}>Submit</Button>
        </form>
      </div>
    </div>
  );
}
