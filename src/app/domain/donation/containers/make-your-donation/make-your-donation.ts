import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-make-your-donation',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
    MatButtonModule,
    CommonModule,
    FormsModule,
    RouterLink,
    MatRadioModule,
    MatIconModule,
  ],
  templateUrl: './make-your-donation.html',
  styleUrls: ['./make-your-donation.scss'],
})
export class MakeYourDonation implements OnInit {
  selectedAmount: number | null = null;
  userAuthenticated = false;
  form!: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl<string>(null!, [Validators.required]),
      email: new FormControl<string>(null!, [
        Validators.required,
        Validators.email,
      ]),
      cpf: new FormControl<string>(null!, [Validators.required]),
      phone: new FormControl<string>(null!, [Validators.required]),
      amount: new FormControl<number | null>(null!, [
        Validators.required,
        Validators.min(1),
      ]),
      frequency: new FormControl<string>('once', [Validators.required]),
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      if (value.amount !== null || value.amount > 0) {
        this.selectedAmount = null;
      }
    });
  }

  onSubmit() {
    const rawValue = this.form.getRawValue();

    rawValue.amount = rawValue.amount ?? this.selectedAmount;

    console.log(this.form.value);
  }
}
