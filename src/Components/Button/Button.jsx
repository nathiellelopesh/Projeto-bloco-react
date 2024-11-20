
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({variant, text, onclickFunction}) {
  return (
      <Button variant={variant} onClick={onclickFunction}>{text}</Button>
  );
}
