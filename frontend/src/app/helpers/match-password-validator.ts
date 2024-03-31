import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(passwordControlName: string, rePassControlName: string):ValidatorFn{
    return (control)=>{
        const passwordFormCtrl = control.get(passwordControlName);
        const rePassFormCtrl = control.get(rePassControlName);
        const areMatching = passwordFormCtrl?.value == rePassFormCtrl?.value;

        return areMatching ? null : {matchPasswordsValidator: true}
    }
}