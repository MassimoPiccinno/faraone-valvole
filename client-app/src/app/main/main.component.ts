import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Status } from '../models/status.enum';
import { Valve } from '../models/valve.model';
import { ValvesService } from '../valves.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ConfirmationService],
})
export class MainComponent implements OnInit {
  valves: Valve[] = [];

  constructor(
    private ValvesService: ValvesService,
    private confirmationService: ConfirmationService
  ) {}

  getAllStatus() {
    this.ValvesService.getStatus().subscribe((response: any) => {
      var valves: Valve[] = [];
      Object.keys(response.valveStatus).forEach(function (key) {
        let v = new Valve();
        v.name = parseInt(key);
        v.status = response.valveStatus[key];
        if (v.status == Status.OPEN) {
          v.isOpen = true;
        }
        valves.push(v);
      });
      this.valves = [...valves];
      console.log(this.valves);
    });
  }

  ngOnInit(): void {
    this.getAllStatus();
  }

  changeValveStatus(valve: Valve) {
    switch (valve.status) {
      case Status.OPEN: {
        this.confirmationService.confirm({
          message: 'Chiudere la valvola ' + valve.name + ' ?',
          accept: () => {
            this.ValvesService.closeValve(valve.name).subscribe((response) => {
              this.getAllStatus();
            });
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
            this.ValvesService.openValve(valve.name).subscribe((response) => {
              this.getAllStatus();
            });
          },
          reject: () => {
            this.getAllStatus();
          },
        });
        break;
      }
    }
  }
}
