import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    TableModule,
    InputSwitchModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
  ],
})
export class PrimengModule {}
