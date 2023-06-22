import styles from './dropdown.module.scss';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Dropdown({
  options,
  label,
  handleChange,
  currentValue,
  variant = 'outlined',
  classNames = '',
  size = 'small',
}) {
  return (
    <FormControl fullWidth variant={variant} className={classNames} size={size}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={label}
        value={currentValue}
        label={label}
        onChange={e => handleChange(e.target.value)}
        placeholder=""
      >
        {options.map(option => {
          if (option === 'All') {
            return (
              <MenuItem key={option} value={''}>
                {'All'}
              </MenuItem>
            );
          }
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
