import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro',
  imports: [
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

}
