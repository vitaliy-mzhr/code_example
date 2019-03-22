import { DynamicControlConfig } from '@ui/dynamic-forms/dynamic.config';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { DynamicControlEntity } from '@ui/dynamic-forms/dynamic-control.entity';
import { BfValidators } from '@helpers/bf-validators';
import { DynamicFormEntity } from '@ui/dynamic-forms/dynamic-form.entity';

export class DynamicFormDataController {
  public createFormGroup(config: DynamicControlConfig[]): FormGroup {
    const group = new FormGroup({});
    config.forEach((control) => {
      if (control.type === 'group') {
        group.addControl(control.field, this.createFormGroup(control.children));
      }
      group.addControl(control.field, new FormControl(control.value, this.processValidators(control)));
    });
    return group;
  }

  public disableFormFields(formGroup: FormGroup, formEntity: DynamicFormEntity): void {
    const fieldsWithConditions = formEntity.entitiesWithConditions;
    Object.keys(fieldsWithConditions).forEach((fieldPath) => {
      const control = formGroup.get(fieldPath);
      if (fieldsWithConditions[fieldPath].show) {
        control.enable({emitEvent: false});
        return;
      }
      control.disable({emitEvent: false});
    });
  }

  public setRequiredValidator(formGroup: FormGroup, formEntity: DynamicFormEntity): void {
    const fieldsWithConditions = formEntity.entitiesWithConditions;
    Object.keys(fieldsWithConditions).forEach((fieldPath) => {
      const control = formGroup.get(fieldPath);
      let entityValidators = this.processValidators(fieldsWithConditions[fieldPath]);
      if (fieldsWithConditions[fieldPath].required) {
        entityValidators = [...entityValidators, BfValidators.required];
      }
      control.setValidators(entityValidators);
      control.updateValueAndValidity({emitEvent: false});
    });
  }

  private processValidators(entity: DynamicControlEntity | DynamicControlConfig): ValidatorFn[] {
    const validators = [];
    if (entity.required) {
      validators.push(BfValidators.required);
    }
    if (!entity.validators) {
      return validators;
    }
    entity.validators.forEach((validator) => {
      if (validator.name === 'required') {
        return;
      }
      if (validator.options) {
        validators.push(BfValidators[validator.name](validator.options));
        return;
      }
      validators.push(BfValidators[validator.name]);
    });
    return validators;
  }

}
