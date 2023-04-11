import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, map, of, tap } from 'rxjs';
import { OpenstackIdentifier } from 'src/app/core/models/openstack-identifier';
import {
  Endpoint,
  OSCatalogEntry,
  OpenstackToken,
} from 'src/app/core/models/openstack-token';

@Injectable({
  providedIn: 'root',
})
export class OpenstackTokensService {
  private static readonly LOCALSTORAGE_PREFIX = 'openstack-token-';
  private static readonly OPENSTACK_TOKEN_ENDPOINT =
    'https://auth.cloud.ovh.net/v3/auth/tokens';

  constructor(private http: HttpClient) {}

  getOpenstackToken(identity: OpenstackIdentifier): Observable<OpenstackToken> {
    const requestBody = {
      auth: {
        identity: {
          methods: ['password'],
          password: {
            user: {
              name: identity.username,
              domain: { id: 'default' },
              password: identity.password,
            },
          },
        },
        scope: {
          project: {
            name: identity.project,
            domain: { id: 'default' },
          },
        },
      },
    };

    const requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let result: any = localStorage.getItem(
      OpenstackTokensService.LOCALSTORAGE_PREFIX + identity.id
    );

    if (result !== 'undefined' && result !== undefined && result !== null) {
      let data: OpenstackToken = JSON.parse(result);
      let expireDate = new Date(data.expires);
      if (expireDate.getTime() < Date.now()) {
        result = this.http.post(
          OpenstackTokensService.OPENSTACK_TOKEN_ENDPOINT,
          requestBody,
          { headers: requestHeaders, observe: 'response' }
        );
      } else {
        result = of(JSON.parse(result));
      }
    } else {
      result = this.http.post(
        OpenstackTokensService.OPENSTACK_TOKEN_ENDPOINT,
        requestBody,
        { headers: requestHeaders, observe: 'response' }
      );
    }

    return result.pipe(
      map((response: HttpResponse<any>) => {
        return {
          token: response.headers.get('x-subject-token'),
          expires: response.body.token.expires_at,
          url: response.body.token.catalog
            .filter((entry: OSCatalogEntry) => entry.type === 'object-store')
            .map((entry: OSCatalogEntry) => entry.endpoints)[0]
            .filter((endpoint: Endpoint) => endpoint.interface === 'public'),
        };
      })
    );
  }
}
