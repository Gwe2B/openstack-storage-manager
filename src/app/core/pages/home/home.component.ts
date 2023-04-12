import { Component, OnInit } from '@angular/core';
import { OpenstackService } from 'src/app/shared/services/openstack.service';
import { OpenstackIdentifier } from '../../models/openstack-identifier';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddIdentifierFormComponent } from '../add-identifier-form/add-identifier-form.component';
import { v4 as uuid } from 'uuid';
import { OpenstackTokensService } from 'src/app/shared/services/openstack-tokens.service';
import { ButtonLoaderComponent } from 'src/app/shared/components/button-loader/button-loader.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttonState = 'default';

  openstackIdentities$!: Observable<OpenstackIdentifier[]>;

  constructor(
    private openstackService: OpenstackService,
    private dialog: MatDialog,
    private ovhTokenService: OpenstackTokensService,
    private router: Router
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

  onUseIdentityClick(
    identity: OpenstackIdentifier,
    btn: ButtonLoaderComponent
  ): void {
    let token$ = this.ovhTokenService.getOpenstackToken(identity);
    token$
      .pipe(
        catchError((err, caught) => {
          btn.state = 'error';
          return of(null);
        })
      )
      .subscribe(() => {
        btn.state = 'success';
        setTimeout(() => {
          this.router.navigateByUrl('/manager/' + identity.id);
          btn.state = 'default';
        }, 1000);
      });
  }
}
