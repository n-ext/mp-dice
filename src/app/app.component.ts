import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mp-dice';

  diceForm = this.formBuilder.group({
    dice11: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
    dice12: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
    dice21: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
    dice22: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
  });

  allRolls: number = 0;
  positiveRolls: number = 0;
  pi: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  private areCoprimes(num1: number, num2: number) {
    const smaller = num1 > num2 ? num1 : num2;
    for (let ind = 2; ind < smaller; ind++) {
      const condition1 = num1 % ind === 0;
      const condition2 = num2 % ind === 0;
      if (condition1 && condition2) {
        return false;
      }
    }
    return true;
  }

  onFormSubmit() {
    const dice11 = +(this.diceForm.get('dice11')?.value || 1);
    const dice12 = +(this.diceForm.get('dice12')?.value || 1);
    const dice21 = +(this.diceForm.get('dice21')?.value || 1);
    const dice22 = +(this.diceForm.get('dice22')?.value || 1);

    let a = (dice11 - 1) * 10 + dice12;
    if (a === 0) a = 120;
    let b = (dice21 - 1) * 10 + dice22;
    if (b === 0) b = 120;

    this.allRolls += 1;
    if (this.areCoprimes(a, b)) this.positiveRolls += 1;
    if (this.positiveRolls !== 0) {
      this.pi = Math.sqrt((6 * this.allRolls) / this.positiveRolls);
    }
  }
}
