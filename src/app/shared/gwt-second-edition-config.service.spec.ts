import { TestBed } from '@angular/core/testing';
import { GwtSecondEditionConfigService } from './gwt-second-edition-config.service';

describe('GwtSecondEditionConfigService', () => {
  let service: GwtSecondEditionConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GwtSecondEditionConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Signals', () => {
    it('should have useVariant signal', () => {
      expect(service.useVariant).toBeDefined();
    });

    it('should have useRailsToTheNorth signal', () => {
      expect(service.useRailsToTheNorth).toBeDefined();
    });

    it('should have playerCount signal', () => {
      expect(service.playerCount).toBeDefined();
    });

    it('should update useVariant signal with correct data', () => {
      const testData = { name: 'useSimmental', checked: true };

      service.setUseVariant(testData);
      expect(service.useVariant()).toEqual(testData);
    });

    it('should update useRailsToTheNorth signal with correct data', () => {
      service.setUseRailsToTheNorth(true);
      expect(service.useRailsToTheNorth()).toBe(true);
    });

    it('should update playerCount signal with correct data', () => {
      service.setPlayerCount(4);
      expect(service.playerCount()).toBe(4);
    });
  });

  describe('Data Arrays', () => {
    it('should have 7 neutral buildings', () => {
      expect(service.neutralBuildings.length).toBe(7);
    });

    it('should have neutral buildings with correct structure', () => {
      service.neutralBuildings.forEach((building) => {
        expect(building.title).toBeDefined();
        expect(building.sides).toBeDefined();
        expect(building.sides.length).toBeGreaterThan(0);
      });
    });

    it('should have 12 player buildings', () => {
      expect(service.playerBuildings.length).toBe(12);
    });

    it('should have player buildings with correct structure', () => {
      service.playerBuildings.forEach((building) => {
        expect(building.title).toBeDefined();
        expect(building.sides).toBeDefined();
        expect(building.sides.length).toBe(2);
      });
    });

    it('should have 8 station masters', () => {
      expect(service.stationMasters.length).toBe(8);
    });

    it('should have station masters with correct structure', () => {
      service.stationMasters.forEach((master) => {
        expect(master.title).toBeDefined();
        expect(master.sides).toBeDefined();
        expect(master.sides.length).toBe(1);
        expect(master.sides[0].image).toBeDefined();
      });
    });

    it('should have station masters with image paths', () => {
      service.stationMasters.forEach((master, index) => {
        expect(master.sides[0].image).toBe(`img/station-master-0${index + 1}.png`);
      });
    });
  });

  describe('getRandomNeutralBuildingOrder()', () => {
    it('should return an array', () => {
      const result = service.getRandomNeutralBuildingOrder();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return 7 neutral buildings', () => {
      const result = service.getRandomNeutralBuildingOrder();
      expect(result.length).toBe(7);
    });

    it('should contain all neutral buildings', () => {
      const result = service.getRandomNeutralBuildingOrder();
      const titles = result.map((b) => b.title).sort();
      const expectedTitles = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

      expect(titles).toEqual(expectedTitles);
    });

    it('should not modify the original neutralBuildings array', () => {
      const originalTitles = service.neutralBuildings.map((b) => b.title);

      service.getRandomNeutralBuildingOrder();

      const currentTitles = service.neutralBuildings.map((b) => b.title);
      expect(currentTitles).toEqual(originalTitles);
    });

    it('should return different orders on multiple calls', () => {
      const order1 = service.getRandomNeutralBuildingOrder();

      // Convert to strings for comparison
      const str1 = order1.map((b) => b.title).join('');

      // With 7! = 5040 possible permutations, it's highly likely they'll be different
      // Running multiple times to increase probability
      let allSame = true;
      for (let i = 0; i < 5; i++) {
        const order = service.getRandomNeutralBuildingOrder();
        const str = order.map((b) => b.title).join('');
        if (str !== str1) {
          allSame = false;
          break;
        }
      }

      // Note: theoretically possible but extremely unlikely
      expect(allSame).toBe(false);
    });
  });

  describe('getRandomStationMasters()', () => {
    it('should return an array', () => {
      const result = service.getRandomStationMasters();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return exactly 5 station masters', () => {
      const result = service.getRandomStationMasters();
      expect(result.length).toBe(5);
    });

    it('should return unique station masters', () => {
      const result = service.getRandomStationMasters();
      const titles = result.map((m) => m.title);
      const uniqueTitles = new Set(titles);

      expect(uniqueTitles.size).toBe(5);
    });

    it('should only return station masters from the available pool', () => {
      const result = service.getRandomStationMasters();
      const availableTitles = service.stationMasters.map((m) => m.title);

      result.forEach((master) => {
        expect(availableTitles).toContain(master.title);
      });
    });

    it('should not modify the original stationMasters array', () => {
      const originalLength = service.stationMasters.length;
      const originalTitles = service.stationMasters.map((m) => m.title).sort();

      service.getRandomStationMasters();

      expect(service.stationMasters.length).toBe(originalLength);
      const currentTitles = service.stationMasters.map((m) => m.title).sort();
      expect(currentTitles).toEqual(originalTitles);
    });

    it('should return station masters with image property', () => {
      const result = service.getRandomStationMasters();

      result.forEach((master) => {
        expect(master.sides[0].image).toBeDefined();
        expect(master.sides[0].image).toMatch(/^img\/station-master-\d{2}\.png$/);
      });
    });

    it('should return different selections on multiple calls', () => {
      const selection1 = service.getRandomStationMasters();

      const str1 = selection1.map((m) => m.title).join('');

      // With C(8,5) = 56 possible combinations, likely to be different
      let allSame = true;
      for (let i = 0; i < 5; i++) {
        const selection = service.getRandomStationMasters();
        const str = selection.map((m) => m.title).join('');
        if (str !== str1) {
          allSame = false;
          break;
        }
      }

      expect(allSame).toBe(false);
    });
  });

  describe('getRandomPlayerBuildings()', () => {
    it('should return an array', () => {
      const result = service.getRandomPlayerBuildings();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return 12 player buildings', () => {
      const result = service.getRandomPlayerBuildings();
      expect(result.length).toBe(12);
    });

    it('should contain all building titles', () => {
      const result = service.getRandomPlayerBuildings();
      const titles = result
        .map((b) => b.title)
        .sort((a, b) => {
          return parseInt(a) - parseInt(b);
        });
      const expectedTitles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

      expect(titles).toEqual(expectedTitles);
    });

    it('should have exactly 1 side per building', () => {
      const result = service.getRandomPlayerBuildings();

      result.forEach((building) => {
        expect(building.sides.length).toBe(1);
      });
    });

    it('should not modify the original playerBuildings array', () => {
      const originalLength = service.playerBuildings.length;
      const originalSides = service.playerBuildings.map((b) => b.sides.length);

      service.getRandomPlayerBuildings();

      expect(service.playerBuildings.length).toBe(originalLength);
      const currentSides = service.playerBuildings.map((b) => b.sides.length);
      expect(currentSides).toEqual(originalSides);
    });

    it('should remove either side a or side b', () => {
      const result = service.getRandomPlayerBuildings();

      result.forEach((building) => {
        const sideTitle = building.sides[0].title;
        expect(['a', 'b']).toContain(sideTitle);
      });
    });

    it('should return both sides a and b across different calls', () => {
      const results = [];

      for (let i = 0; i < 20; i++) {
        const result = service.getRandomPlayerBuildings();
        results.push(result);
      }

      // Check that both 'a' and 'b' appear across all results
      let hasSideA = false;
      let hasSideB = false;

      results.forEach((result) => {
        result.forEach((building) => {
          const sideTitle = building.sides[0].title;
          if (sideTitle === 'a') hasSideA = true;
          if (sideTitle === 'b') hasSideB = true;
        });
      });

      expect(hasSideA).toBe(true);
      expect(hasSideB).toBe(true);
    });

    it('should create independent copies of buildings', () => {
      const result1 = service.getRandomPlayerBuildings();
      const result2 = service.getRandomPlayerBuildings();

      // They should be different objects
      expect(result1).not.toBe(result2);
      expect(result1[0]).not.toBe(result2[0]);
    });
  });

  describe('Data Integrity', () => {
    it('should preserve all building properties during randomization', () => {
      const original = service.neutralBuildings[0];
      const randomized = service.getRandomNeutralBuildingOrder();
      const found = randomized.find((b) => b.title === original.title);

      expect(found).toBeDefined();
      expect(found?.title).toBe(original.title);
      expect(found?.sides).toEqual(original.sides);
    });

    it('should preserve station master properties', () => {
      const original = service.stationMasters[0];
      const result = service.getRandomStationMasters();
      const found = result.find((m) => m.title === original.title);

      if (found) {
        expect(found.title).toBe(original.title);
        expect(found.sides[0].image).toBe(original.sides[0].image);
      }
    });
  });
});
