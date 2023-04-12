import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenstackIdentifier } from '../../models/openstack-identifier';
import { OpenstackService } from 'src/app/shared/services/openstack.service';

@Component({
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  private identity!: OpenstackIdentifier;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private identityService: OpenstackService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.identity = this.identityService.getIdentifier(id);
    } else {
      this.router.navigateByUrl('404');
    }
  }
}
