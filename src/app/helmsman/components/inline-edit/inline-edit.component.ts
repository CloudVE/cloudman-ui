// refs: https://www.codementor.io/godson.ukpere/creating-an-inline-edit-component-in-angular-2-nmkdlpxtq
// https://medium.com/front-end-weekly/inline-editing-with-angular2-58b43cc2aba
import {
    Component,
    Input,
    ElementRef,
    ViewChild,
    Renderer,
    Output,
    EventEmitter,
    forwardRef
} from '@angular/core';
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
    private _value: string = ''; // Private variable for input value
    private preValue: string = ''; // The value before clicking to edit
    private editing: boolean = false; // Is Component in edit mode?
    public onChange: any = Function.prototype;
    public onTouched: any = Function.prototype;

    // Control Value Accessors for ngModel
    get value(): any {
        return this._value;
    }

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    constructor(element: ElementRef, private _renderer: Renderer) {
    }

    // Required for ControlValueAccessor interface
    writeValue(value: any) {
        this._value = value;
    }

    // Required forControlValueAccessor interface
    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    // Required forControlValueAccessor interface
    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    // Do stuff when the input element loses focus
    onBlur($event: Event) {
        this.editing = false;
    }

    // Start the editting process for the input element
    edit(value) {
        if (this.disabled) {
            return;
        }

        this.preValue = value; // Store original value in case the form is cancelled
        this.editing = true;
        // Focus on the input element just as the editing begins
        setTimeout(_ => this._renderer.invokeElementMethod(
            this.inlineEditControl.nativeElement,'focus', []));
    }

    // Method to display the editable value as text and emit save event to host
    onSubmit(value){
        this.onSave.emit(value);
        this.editing = false;
    }

    // Method to reset the editable value
    cancel(value:any){
        this._value = this.preValue;
        this.editing = false;
    }
}
