import { TestBed, async, fakeAsync, getTestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Headers, BaseRequestOptions, Response, ResponseOptions,
  HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import { DataService } from './data.service';
import { ICustomer } from '../shared/interfaces';

describe('DataService Tests', () => {
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
      imports: [ HttpModule ]
    });

    mockBackend = getTestBed().get(MockBackend);

  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('getCustomers() should use HTTP call to get customers',
    inject([DataService, MockBackend], fakeAsync((service: DataService, backend: MockBackend) => {

      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe('assets/customers.json');
      });

      service.getCustomers();
    })));

  it('getOrders() should use HTTP call to get orders',
    inject([DataService, MockBackend], fakeAsync((service: DataService, backend: MockBackend) => {

      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe('assets/orders.json');
      });

      service.getOrders(1);
    })));

  it('should get customers async',
    async(inject([DataService], (service) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: customers
            })
          ));
        });

      service.getCustomers().subscribe(
        (data) => {
          expect(data.length).toBe(4);
          expect(data[0].id).toBe(1);
          expect(data[0].name).toBe('Ted James');
        });
    })));

  it('should get customers async',
    async(inject([DataService], (service) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: customers
            })
          ));
        });

      service.getCustomers().subscribe(
        (data) => {
          expect(data.length).toBe(4);
          expect(data[0].id).toBe(1);
          expect(data[0].name).toBe('Ted James');
        });
    })));

  it('should get a single customer async',
    async(inject([DataService], (service) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: customers
            })
          ));
        });

      service.getCustomer(3).subscribe(
        (data) => {
          expect(data.id).toBe(3);
          expect(data.name).toBe('James Thomas');
        });
    })));

  it('should insert new customer async',
    async(inject([DataService], (service) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions({ status: 201 })));
      });

      const customer: ICustomer = {
        "id": 1,
        "name": "Ted James",
        "city": "Phoenix"
      };

      service.insertCustomer(customer).subscribe(
        (result) => {
          expect(result).toBeDefined();
          expect(result.status).toBe(201);
        });
    })));

  //Example of using a Jasmine spy
  it('spy should monitor CustomersService.getCustomer',
        async(inject([DataService], (service) => {

          service.getCustomer = jasmine.createSpy('getCustomer').and.returnValue(customers[0]);

          service.getCustomer(1);

          expect(service.getCustomer).toHaveBeenCalledWith(1);
  })));

});

const customers = [
  {
    "id": 1,
    "name": "Ted James",
    "city": " Phoenix ",
    "orderTotal": 40.99
  },
  {
    "id": 2,
    "name": "Michelle Thompson",
    "city": "Los Angeles ",
    "orderTotal": 89.99
  },
  {
    "id": 3,
    "name": "James Thomas",
    "city": " Las Vegas ",
    "orderTotal": 29.99
  },
  {
    "id": 4,
    "name": "Tina Adams",
    "city": "Seattle",
    "orderTotal": 15.99
  }
];

