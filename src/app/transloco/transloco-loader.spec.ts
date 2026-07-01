/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TranslocoHttpLoader } from './transloco-loader';
import { Translation } from '@jsverse/transloco';

describe('TranslocoHttpLoader', () => {
  let service: TranslocoHttpLoader;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslocoHttpLoader],
    });

    service = TestBed.inject(TranslocoHttpLoader);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTranslation()', () => {
    it('should fetch translation for English', () => {
      const mockTranslation: Translation = {
        'app-title': 'Great Western Trail',
        'app-title-short': 'GWT',
      };

      service.getTranslation('en').subscribe((data) => {
        expect(data).toEqual(mockTranslation);
      });

      const req = httpMock.expectOne('i18n/en.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTranslation);
    });

    it('should fetch translation for German', () => {
      const mockTranslation: Translation = {
        'app-title': 'Großes Westliches Trail',
      };

      service.getTranslation('de').subscribe((data) => {
        expect(data).toEqual(mockTranslation);
      });

      const req = httpMock.expectOne('i18n/de.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTranslation);
    });

    it('should fetch translation for Polish', () => {
      const mockTranslation: Translation = {
        'app-title': 'Wielki Zachodni Szlak',
      };

      service.getTranslation('pl').subscribe((data) => {
        expect(data).toEqual(mockTranslation);
      });

      const req = httpMock.expectOne('i18n/pl.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTranslation);
    });

    it('should construct correct URL with language parameter', () => {
      const testLang = 'fr';
      service.getTranslation(testLang).subscribe();

      const req = httpMock.expectOne(`i18n/${testLang}.json`);
      expect(req.request.url).toBe(`i18n/${testLang}.json`);
      req.flush({});
    });

    it('should return an Observable', () => {
      const result = service.getTranslation('en');
      expect(result).toBeDefined();
      expect(result.subscribe).toBeDefined();
    });

    it('should handle multiple simultaneous requests', () => {
      const langs = ['en', 'de', 'pl'];

      langs.forEach((lang) => {
        service.getTranslation(lang).subscribe();
      });

      langs.forEach((lang) => {
        const req = httpMock.expectOne(`i18n/${lang}.json`);
        req.flush({});
      });
    });

    it('should handle HTTP errors gracefully', () => {
      let errorReceived = false;

      service.getTranslation('invalid').subscribe(
        () => {},
        (error) => {
          errorReceived = true;
        },
      );

      const req = httpMock.expectOne('i18n/invalid.json');
      req.error(new ErrorEvent('Network error'));

      expect(errorReceived).toBe(true);
    });

    it('should handle empty translation response', () => {
      const emptyTranslation: Translation = {};

      service.getTranslation('en').subscribe((data) => {
        expect(data).toEqual(emptyTranslation);
      });

      const req = httpMock.expectOne('i18n/en.json');
      req.flush(emptyTranslation);
    });

    it('should handle translation with nested structure', () => {
      const nestedTranslation: Translation = {
        'further-steps': {
          step1: 'Step 1',
          step2: 'Step 2',
        },
      };

      service.getTranslation('en').subscribe((data) => {
        expect(data['further-steps']).toBeDefined();
      });

      const req = httpMock.expectOne('i18n/en.json');
      req.flush(nestedTranslation);
    });
  });

  describe('HTTP Request Details', () => {
    it('should use GET method for translation requests', () => {
      service.getTranslation('en').subscribe();

      const req = httpMock.expectOne('i18n/en.json');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should not include request body for translation requests', () => {
      service.getTranslation('en').subscribe();

      const req = httpMock.expectOne('i18n/en.json');
      expect(req.request.body).toBeNull();
      req.flush({});
    });

    it('should return Observable that completes', (done) => {
      service.getTranslation('en').subscribe({
        next: () => {},
        complete: () => {
          done();
        },
      });

      const req = httpMock.expectOne('i18n/en.json');
      req.flush({});
    });
  });
});
