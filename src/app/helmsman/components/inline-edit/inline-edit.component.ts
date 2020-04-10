// refs: https://www.codementor.io/godson.ukpere/creating-an-inline-edit-component-in-angular-2-nmkdlpxtq
// https://medium.com/front-end-weekly/inline-editing-with-angular2-58b43cc2aba
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter, forwardRef, Renderer2 } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InlineEditComponent),
    multi: true
};

@Component({
    selector: 'app-inline-edit',
    templateUrl: './inline-edit.component.html',
    styleUrls: ['./inline-edit.component.css'],
    providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR]
})

export class InlineEditComponent implements ControlValueAccessor {

    @ViewChild('inlineEditControl') inlineEditControl: ElementRef; // input DOM element
    @Output() public onSave:EventEmitter<any> = new EventEmitter();

    @Input() label: string = '';  // Label value for input element
    @Input() type: string = 'text'; // The type of input element
    @Input() required: boolean = false; // Is input required?
    @Input() disabled: boolean = false; // Is input disabled?
    private control_value: string = ''; // The value exposed by the control
    private editing_value: string = ''; // The value being shown in the editing text box
    public editing: boolean = false; // Is Component in edit mode?
    public onChange: any = Function.prototype;
    public onTouched: any = Function.prototype;

    // Control Value Accessors for ngModel
    get value(): any {
        return this.editing_value;
    }

    set value(v: any) {
        this.editing_value = v;
    }

    constructor(element: ElementRef, private _renderer: Renderer2) {
    }

    // Required for ControlValueAccessor interface
    writeValue(value: any) {
        this.control_value = value;
        this.editing_value = value;
    }

    // Required forControlValueAccessor interface
    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    // Required forControlValueAccessor interface
    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    // Start the editing process for the input element
    beginEdit(value) {
        if (this.disabled) {
            return;
        }

        // this.preValue = value; // Store original value in case the form is cancelled
        this.editing = true;
        // Focus on the input element just as the editing begins
        setTimeout(_ => this.inlineEditControl.nativeElement.focus());
    }

    // Do stuff when the input element loses focus or enter is pressed
    completeEdit($event: Event) {
        this.editing = false;
        this.control_value = this.editing_value;
        this.onChange(this.control_value);
    }

    // Method to reset the editable value
    cancelEdit(value:any){
        this.editing_value = this.control_value;
        this.editing = false;
    }
}
