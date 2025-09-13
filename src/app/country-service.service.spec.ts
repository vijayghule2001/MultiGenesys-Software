import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryServiceService } from './country-service.service';

describe('CountryServiceService', () => {
  let service: CountryServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CountryServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return countries', () => {
    const mockCountries = [
      { id: 1, country: 'India' },
      { id: 2, country: 'USA' }
    ];

    service.getCountries().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockCountries);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    req.flush(mockCountries);
  });
});
