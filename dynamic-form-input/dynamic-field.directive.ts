import { ComponentRef, Directive, Input, OnChanges, OnDestroy, OnInit, ViewContainerRef, ViewRef } from '@angular/core';
import { DynamicControlEntity } from '@ui/dynamic-forms/dynamic-control.entity';
import { FormGroup } from '@angular/forms';
import { DynamicFields } from '@ui/dynamic-forms/dynamic.config';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[bfDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges, OnDestroy {
  @Input()
  public entity: DynamicControlEntity;

  @Input()
  public group: FormGroup;

  @Input()
  public availableFields: DynamicFields = {};

  public component: ComponentRef<any>;

  private componentViewRef: ViewRef;
  private showChangesSub: Subscription;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  public ngOnInit(): void {
    const context = {entity: this.entity, group: this.group, availableFields: this.availableFields};
    this.componentViewRef = this.viewContainerRef
      .createEmbeddedView(this.availableFields[this.entity.type], context);

    this.showChangesSub = this.entity.showChanges$.subscribe((show) => {
      if (show) {
        if (this.viewContainerRef.indexOf(this.componentViewRef) === -1) {
          this.viewContainerRef.insert(this.componentViewRef);
        }
        return;
      }
      this.viewContainerRef.detach();
    });
  }

  public ngOnChanges(): void {
    if (this.component) {
      this.component.instance.entity = this.entity;
      this.component.instance.group = this.entity;
    }
  }

  public ngOnDestroy(): void {
    if (this.showChangesSub) {
      this.showChangesSub.unsubscribe();
    }
  }
}
