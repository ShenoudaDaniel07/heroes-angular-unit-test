import { TestBed } from '@angular/core/testing';
import { HeroServiceForLab } from './hero.lab.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Ihero } from '../../models/ihero';
import { provideZonelessChangeDetection } from '@angular/core';

describe('3-hero service (http) testing:', () => {
  let service: HeroServiceForLab;
  let httpTesting: HttpTestingController;
  const heroesUrl = 'http://localhost:3000/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroServiceForLab,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });

    service = TestBed.inject(HeroServiceForLab);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('getHeroes function: send request and receive response successfully', () => {
    const mockHeroes: Ihero[] = [
      { id: 1, name: 'Superman', strength: 100 },
      { id: 2, name: 'Batman', strength: 80 },
    ];

    service.getHeroes().subscribe((data) => {
      expect(data).toEqual(mockHeroes);
      expect(data.length).toBe(2);
    });

    const req = httpTesting.expectOne(heroesUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockHeroes);
  });

  it('updateHero function: send request and receive response successfully', () => {
    const updatedHero: Ihero = {
      id: 1,
      name: 'Superman Updated',
      strength: 120,
    };

    service.updateHero(updatedHero).subscribe((data) => {
      expect(data).toEqual(updatedHero);
    });

    const req = httpTesting.expectOne(heroesUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedHero);

    req.flush(updatedHero);
  });
});
