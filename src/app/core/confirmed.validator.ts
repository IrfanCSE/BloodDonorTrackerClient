import { FormGroup } from '@angular/forms';

export function ConfirmedValidator() {
  return (formGroup: FormGroup) => {
    const control = formGroup.get('password')?.value;

    const matchingControl = formGroup.get('confirmPassword')?.value;

    // if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {

    //     return;

    // }

    return control === matchingControl ? null : { mismatch: true };
  };
}
