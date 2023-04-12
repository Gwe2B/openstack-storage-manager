import { Component, EventEmitter, Input, Output } from '@angular/core';

interface LabelDescriptor {
  default: string;
  loading: string;
  error: string;
  success: string;
}

type ColorEnum = 'primary' | 'accent' | 'warn' | null ;

@Component({
  selector: 'button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.scss'],
})
export class ButtonLoaderComponent {
  @Input() spinnerColor: ColorEnum = null;
  @Input() color: ColorEnum = null;
  @Input() disabled: boolean = false;
  @Input() label: LabelDescriptor = {
    default: 'Default',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  };

  @Output() click = new EventEmitter<any>();

  state: 'default' | 'loading' | 'error' | 'success' = 'default';

  getLabel(): string {
    return this.label[this.state];
  }

  getColor(): 'primary' | 'accent' | 'warn' | null {
    return this.state != 'error' ? this.color : 'warn';
  }

  onClick(): void {
    if (!this.disabled) {
      this.state = 'loading';
      this.click.emit();
    }
  }
}
