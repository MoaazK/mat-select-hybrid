import { Component, ViewChild,
  Input, Output,
  ViewEncapsulation, EventEmitter,
  OnChanges, OnInit, AfterViewInit, OnDestroy,
  SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, _getOptionScrollPosition, MatSelectChange } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-select-hybrid',
  templateUrl: './mat-select-hybrid.component.html',
  styleUrls: ['./mat-select-hybrid.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatSelectHybridComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @ViewChild('matSelect') matSelect: MatSelect;
  @Input() selectControl: FormControl;
  @Input() isRequired?: boolean;
  @Input() isMultiple?: boolean;
  @Input() labelClass?: string;
  @Input() label?: string;
  @Input() dataKey: string;
  @Input() dataDisplayValue: string;
  @Input() data: Array<any>;
  @Input() groupKey?: string;
  @Input() hasNone?: boolean;

  @Output() readonly selectionChange: EventEmitter<MatSelectChange>;

  _onDestroy: Subject<void>;

  filterControl: FormControl;
  filteredData: Array<any>;
  groupData: Array<any>;

  constructor() {
    this.selectionChange = new EventEmitter<MatSelectChange>();
    this._onDestroy = new Subject<void>();
    this.filterControl = new FormControl();
    this.filteredData = new Array<any>();
    this.groupData = new Array<any>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.length) {
        this.filteredData = changes.data.currentValue.slice();
        if (!!this.groupKey) {
          this.groupData = this.getGroupData(this.filteredData, this.groupKey);
        }
      } else {
        this.filteredData = this.groupData = [];
      }
    }
  }

  ngOnInit() {
    this.filterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOptions();
      });

    this.matSelect.openedChange
      .pipe(takeUntil(this._onDestroy))
      .subscribe((opened) => {
        if (!opened && this.groupKey && this.groupData && this.groupData.length) {
          if (this.groupData.find(x => x && !x.isVisible)) {
            this.groupData = this.groupData.map(x => ({ ...x, isVisible: true }));
          }
        }
      });
  }

  ngAfterViewInit() {
    (<any>this.matSelect)._getItemCount = () => {
      return (
        (<any>this.matSelect).options.length +
        this.groupData.length +
        (this.isMultiple && this.data && this.data.length ? 1 : 0)
      );
    };

    (<any>this.matSelect)._scrollActiveOptionIntoView = () => {
      const matSelect = <any>this.matSelect;
      const activeOptionIndex = matSelect._keyManager.activeItemIndex || 0;

      this.matSelect.panel.nativeElement.scrollTop = _getOptionScrollPosition(
        activeOptionIndex + this.groupData.length + (this.isMultiple && this.data && this.data.length ? 1 : 0),
        matSelect._getItemHeight(),
        matSelect.panel.nativeElement.scrollTop,
        matSelect.SELECT_PANEL_MAX_HEIGHT
      );
    };
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  filterOptions() {
    if (!this.data) {
      return;
    }
    // get the search keyword
    let search = this.filterControl.value;
    if (!search) {
      this.filteredData = this.data.slice();
      if (!!this.groupKey) {
        this.groupData = this.getGroupData(this.filteredData, this.groupKey);
      }
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the options
    this.filteredData = this.data.filter(option => option[this.dataDisplayValue].toLowerCase().indexOf(search) > -1).slice();

    if (!!this.groupKey) {
      this.groupData = this.getGroupData(this.filteredData, this.groupKey);
    }
  }

  getGroupData(dataSource: Array<any>, groupBy: string) {
    const groupData = this.groupBy(dataSource, groupBy);

    return Object.keys(groupData).map(key => {
      return {
        key: key,
        value: groupData[key],
        isVisible: true
      };
    });
  }

  groupBy(collection: Array<any>, key: string): Object {
    return collection.reduce(function (previousValue, currentValue) {
      (previousValue[currentValue[key]] = previousValue[currentValue[key]] || []).push(currentValue);
      return previousValue;
    }, {});
  }
}
