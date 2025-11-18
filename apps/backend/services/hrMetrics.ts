export interface HRMetrics {
  max: number | null;
  min: number | null;
  avg: number | null;
  median: number | null;
  timeInZones: Record<string, number>; // seconds
}

export class HRMetricsService {
  static computeMetrics(hr: number[]): HRMetrics {
    if (!hr.length) {
      return {
        max: null,
        min: null,
        avg: null,
        median: null,
        timeInZones: {}
      };
    }

    const sorted = [...hr].sort((a, b) => a - b);
    const sum = hr.reduce((a, b) => a + b, 0);

    return {
      max: sorted[sorted.length - 1],
      min: sorted[0],
      avg: sum / hr.length,
      median: sorted[Math.floor(sorted.length / 2)],
      timeInZones: this.computeZones(hr),
    };
  }

  static computeZones(hr: number[]) {
    const zones = {
      z1: 0, // <100
      z2: 0, // 100-119
      z3: 0, // 120-139
      z4: 0, // 140-159
      z5: 0, // >=160
    };

    for (const bpm of hr) {
      if (bpm < 100) zones.z1++;
      else if (bpm < 120) zones.z2++;
      else if (bpm < 140) zones.z3++;
      else if (bpm < 160) zones.z4++;
      else zones.z5++;
    }

    return zones;
  }
}
