import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DynamicFormController } from '@ui/dynamic-forms/dynamic-form.controller';
import { DynamicFields } from '@ui/dynamic-forms/dynamic.config';
import { FormGroup, NgForm } from '@angular/forms';
import { DynamicFieldDefDirective } from '@ui/dynamic-forms/dynamic-field-def.directive';
import { Subject } from 'rxjs';
import { DynamicFormEntity } from '@ui/dynamic-forms/dynamic-form.entity';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bf-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public formController: DynamicFormController;
  @Output() public formSubmit: EventEmitter<any> = new EventEmitter<any>();

  public availableFields: DynamicFields;

  @ViewChild('form') private form: NgForm;

  @ViewChildren(DynamicFieldDefDirective)
  private mapping: QueryList<DynamicFieldDefDirective>;

  @ContentChildren(DynamicFieldDefDirective)
  private customMapping: QueryList<DynamicFieldDefDirective>;

  private destroy$: Subject<void> = new Subject<void>();

  public get formGroup(): FormGroup {
    return this.formController.formGroup;
  }

  public get formEntity(): DynamicFormEntity {
    return this.formController.formEntity;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.formController.manualSubmit$.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.triggerSubmit();
      });
  }

  public ngAfterViewInit(): void {
    this.availableFields = this.processFields([...this.mapping.toArray(), ...this.customMapping.toArray()]);

    this.customMapping.changes.pipe(takeUntil(this.destroy$)).subscribe((fields) => {
      this.processFields(fields, this.availableFields);
      this.changeDetectorRef.detectChanges();
    });

    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.formController.destroy();
  }

  public triggerSubmit() {
    this.form.onSubmit({} as Event);
  }

  public submitHandler() {
    if (this.formGroup.invalid) {
      return;
    }
    this.formSubmit.emit(this.formGroup.value);
  }

  private processFields(fields: DynamicFieldDefDirective[], accumulator: DynamicFields = {}) {
    return fields.reduce((acc, field) => {
      return {...acc, [field.type]: field.templateRef};
    }, accumulator);
  }
}
