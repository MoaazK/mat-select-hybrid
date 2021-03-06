import { Component, Input, ViewEncapsulation, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-select-check',
  templateUrl: './mat-select-check.component.html',
  styleUrls: ['./mat-select-check.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatSelectCheckComponent implements OnChanges, OnInit, OnDestroy {
  @Input() selectControl: FormControl;
  @Input() values = [];
  @Input() text = 'Select All';
  @Input() isGroup = false;
  @Input() groupData: any;
  @Input() dataKey = 'Key';
  @Input() isMultiple?: boolean;

  private _onDestroy = new Subject<void>();
  isCollapsed = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.values && changes.values.currentValue && changes.values.currentValue.length) {
      this.values = changes.values.currentValue.map(z => z[this.dataKey]);
    }

    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {
    if (this.selectControl) {
      this.selectControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(value => setTimeout(() => {
        this.changeDetectorRef.detectChanges();
      }));
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  isChecked(): boolean {
    const hasValues = this.selectControl.value && this.values.length && this.selectControl.value.length;
    if (hasValues) {
      const length = this.selectControl.value.filter(x => this.values.includes(x)).length;
      return length > 0 && length === this.values.length;
    }
    return false;
  }

  isIndeterminate(): boolean {
    const hasValues = this.selectControl.value && this.values.length && this.selectControl.value.length;
    if (hasValues) {
      const length = this.selectControl.value.filter(x => this.values.includes(x)).length;
      return length > 0 && length < this.values.length;
    }
    return false;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      const newValue = this.selectControl.value ? [...this.selectControl.value, ...this.values] : [...this.values];
      this.selectControl.setValue(Array.from(new Set(newValue)));
    } else {
      this.selectControl.setValue(this.selectControl.value.filter(x => !this.values.includes(x)));
    }
  }

  toggleGroup() {
    this.isCollapsed = !this.isCollapsed;
    this.groupData[this.groupData.findIndex(x => x.key === this.text)].isVisible = !this.isCollapsed;
  }
}
