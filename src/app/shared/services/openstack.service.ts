import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OpenstackIdentifier } from 'src/app/core/models/openstack-identifier';

@Injectable({
  providedIn: 'root',
})
export class OpenstackService {
  private static readonly LOCALESTORAGE_KEY = 'openstack-identifier';
  private identifiers$ = new BehaviorSubject<OpenstackIdentifier[]>([]);

  constructor() {
    let identifiers = localStorage.getItem(OpenstackService.LOCALESTORAGE_KEY);
    if (identifiers) {
      let parsedIdentifiers = <OpenstackIdentifier[]>JSON.parse(identifiers);

      if (parsedIdentifiers && Array.isArray(parsedIdentifiers)) {
        this.identifiers$.next(parsedIdentifiers);
      }
    }
  }

  addIdentifier(
    identifier: OpenstackIdentifier
  ): Observable<OpenstackIdentifier[]> {
    let curr = this.identifiers$.getValue();
    curr.push(identifier);
    localStorage.setItem(
      OpenstackService.LOCALESTORAGE_KEY,
      JSON.stringify(curr)
    );

    this.identifiers$.next(curr);
    return this.identifiers$.asObservable();
  }

  removeIdentifier(identifierId: string): Observable<OpenstackIdentifier[]> {
    let current = this.identifiers$
      .getValue()
      .filter((item) => item.id != identifierId);
    this.identifiers$.next(current);

    localStorage.setItem(
      OpenstackService.LOCALESTORAGE_KEY,
      JSON.stringify(current)
    );

    return this.identifiers$.asObservable();
  }

  getIdentifiers(): Observable<OpenstackIdentifier[]> {
    return this.identifiers$.asObservable();
  }

  getIdentifier(id: string): OpenstackIdentifier {
    return this.identifiers$.value.filter(
      (identifier) => identifier.id === id
    )[0];
  }
}
