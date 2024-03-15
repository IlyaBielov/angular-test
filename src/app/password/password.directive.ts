import { Directive, ElementRef, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PasswordColors as C, PasswordError as Error } from './password.model';

@Directive({
  selector: '[appPasswordStrength]',
  standalone: true,
})
export class PasswordDirective {
  private indicators: HTMLElement[] = [];

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    @Self() private ngControl: NgControl,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  ngOnInit() {
    this.createIndicators();

    const { control } = this.ngControl;
    control?.valueChanges.subscribe(() => {
      const hasError = control?.hasError(Error.STRENGHT);
      const strength = hasError ? control?.getError(Error.STRENGHT) : C.GRAY;

      this.updateIndicators(strength);
    });
  }

  private createIndicators() {
    // Should be 3 indicators!
    const childNodes = [
      this.createIndicatorNode(),
      this.createIndicatorNode(),
      this.createIndicatorNode(),
    ];

    // Need to avoid render dublicates
    if (!isPlatformBrowser(this._platformId)) {
      const div = this.createMainDiv();
      this.renderIndicator(div, childNodes);
    } else {
      const attributteName = 'div[data-password="strength-indicator"]';
      const existNode = this.selectElement(attributteName);
      this.renderIndicator(existNode, childNodes);
    }
  }

  private updateIndicators(strength: C) {
    const colorsMap = {
      [C.RED]: [C.RED, C.GRAY, C.GRAY],
      [C.YELLOW]: [C.YELLOW, C.YELLOW, C.GRAY],
      [C.GREEN]: [C.GREEN, C.GREEN, C.GREEN],
      [C.GRAY]: [C.GRAY, C.GRAY, C.GRAY],
    };

    this.indicators.forEach((indicator, index) => {
      if (indicator.classList.contains(C.RED)) {
        this.rd.removeClass(indicator, C.RED);
      }

      if (indicator.classList.contains(C.YELLOW)) {
        this.rd.removeClass(indicator, C.YELLOW);
      }

      if (indicator.classList.contains(C.GREEN)) {
        this.rd.removeClass(indicator, C.GREEN);
      }

      this.rd.addClass(indicator, colorsMap[strength][index]);
    });
  }

  private createIndicatorNode() {
    const divChild = this.rd.createElement('div');
    this.rd.addClass(divChild, 'strength-indicator__item');
    this.rd.addClass(divChild, C.GRAY);

    return divChild;
  }

  private renderIndicator(node: HTMLElement, children: HTMLElement[]) {
    children.forEach((child) => {
      this.indicators.push(child);
      this.rd.appendChild(node, child);
    });

    this.rd.appendChild(this.el.nativeElement.parentNode, node);
  }

  private selectElement(selector: string) {
    try {
      return this.rd.selectRootElement(selector);
    } catch (error) {
      return this.createMainDiv();
    }
  }

  private createMainDiv() {
    const div = this.rd.createElement('div');
    this.rd.setAttribute(div, 'data-password', 'strength-indicator');
    this.rd.addClass(div, 'strength-indicator');

    return div;
  }
}
