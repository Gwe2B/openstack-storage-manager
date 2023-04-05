import { Component, OnInit } from '@angular/core';
import { OpenstackService } from 'src/app/shared/services/openstack.service';
import { OpenstackIdentifier } from '../../models/openstack-identifier';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddIdentifierFormComponent } from '../add-identifier-form/add-identifier-form.component';
import { v4 as uuid } from 'uuid';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  openstackIdentities$!: Observable<OpenstackIdentifier[]>;

  constructor(
    private openstackService: OpenstackService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.openstackIdentities$ = this.openstackService.getIdentifiers();
  }

  onAddIdentityClick(): void {
    this.dialog
      .open(AddIdentifierFormComponent, {
        minWidth: '350px',
        width: '75vw',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.openstackService.addIdentifier({
            id: uuid(),
            name: result.name,
            username: result.username,
            project: result.project,
            password: result.password,
          });
        }
      });
  }

  onSuppressIdentityClick(identity: OpenstackIdentifier): void {
    this.openstackService.removeIdentifier(identity.id);
  }

  onUseIdentityClick(identity: OpenstackIdentifier): void {}
}
