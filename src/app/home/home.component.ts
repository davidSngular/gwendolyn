import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm: FormGroup;

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.'
    }
  };

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  login(): void {
    this.afAuth.auth.signInWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password).then(
      (res) => console.log(res),
      (err) => {
        if (err.code === 'auth/user-not-found') {
          this.formErrors['email'] = 'Correo electrónico no encontrado';
        }
        if (err.code === 'auth/auth/wrong-password') {
          this.formErrors['password'] = 'Contraseña incorrecta';
        }
      }
    );
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
