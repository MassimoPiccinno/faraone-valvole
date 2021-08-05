import { Component, DoCheck, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Status } from '../models/status.enum';
import { Valve } from '../models/valve.model';
import { ValvesService } from '../valves.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class MainComponent implements OnInit {
  valves: Valve[] = [];

  constructor(
    private ValvesService: ValvesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getAllStatus() {
    this.ValvesService.getStatus().subscribe(
      (response: any) => {
        if (response.warning == true) {
          this.messageService.add({
            severity: 'warning',
            summary: 'Attenzione',
            detail: 'Possibili problemi di comunicazione, riprovare tra poco',
          });
        }
        var valves: Valve[] = [];
        Object.keys(response.valveStatus).forEach(function (key) {
          let v = new Valve();
          v.name = parseInt(key);
          v.status = response.valveStatus[key];
          if (v.status == Status.OPEN) {
            v.isOpen = true;
          } else {
            v.isOpen = false;
          }
          valves.push(v);
        });
        this.valves = [...valves];
        console.log(this.valves);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Errore',
          detail:
            'Si è verificato un errore, prova a ricaricare la pagina o controlla la connessione',
        });
      }
    );
  }

  ngOnInit(): void {
    this.getAllStatus();
    setInterval(() => {
      this.getAllStatus();
    }, 5 * 1000);
  }

  changeValveStatus(valve: Valve) {
    switch (valve.status) {
      case Status.OPEN: {
        this.confirmationService.confirm({
          message: 'Chiudere la valvola ' + valve.name + ' ?',
          accept: () => {
            this.ValvesService.closeValve(valve.name).subscribe(
              (response) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Chiusa',
                  detail: 'Valvola ' + valve.name + ' chiusa',
                });
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Errore',
                  detail:
                    'Si è verificato un errore, prova a ricaricare la pagina o controlla la connessione',
                });
              }
            );
          },
          reject: () => {
            this.getAllStatus();
          },
        });
        break;
      }

      case Status.CLOSED: {
        this.confirmationService.confirm({
          message: 'Aprire la valvola ' + valve.name + ' ?',
          accept: () => {
            this.ValvesService.openValve(valve.name).subscribe(
              (response) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Aperta',
                  detail: 'Valvola ' + valve.name + ' aperta',
                });
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Errore',
                  detail:
                    'Si è verificato un errore, prova a ricaricare la pagina o controlla la connessione',
                });
              }
            );
          },
          reject: () => {
            this.getAllStatus();
          },
        });
        break;
      }
    }
  }

  closeAll() {
    console.log('chiudi tutto');

    this.confirmationService.confirm({
      message: 'Chiudere tutte le valvole ?',
      accept: () => {
        this.ValvesService.closeAll().subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Chiuse',
              detail: 'Tutte le valvola chiuse',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Errore',
              detail:
                'Si è verificato un errore, prova a ricaricare la pagina o controlla la connessione',
            });
          }
        );
      },
      reject: () => {
        this.getAllStatus();
      },
    });
  }
}
