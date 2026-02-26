'use client';

import { useState, useEffect, useMemo } from 'react';
import { DayEntry, TimesheetState, UseTimesheetReturn } from '@/types/timesheet';
import { generateDaysInMonth } from '@/lib/dateUtils';

export function useTimesheet(): UseTimesheetReturn {
  const [month, setMonth] = useState(1); // February (0-indexed)
  const [year, setYear] = useState(2026);
  const [laborName, setLaborName] = useState('');
  const [projectName, setProjectName] = useState('I069A -UAE OMAN RAILWAY -PACKAGE 5 B (TUNNEL & STRUCTURES PART)');
  const [supplierName, setSupplierName] = useState('');
  const [siteEngineerName, setSiteEngineerName] = useState('');
  const [designation, setDesignation] = useState('');
  const [workData, setWorkData] = useState<DayEntry[]>([]);

  // Generate work data when month/year changes
  useEffect(() => {
    const days = generateDaysInMonth(month, year);
    setWorkData(days);
  }, [month, year]);

  // Parse time string "HH:MM" to hours as a decimal number
  const parseTimeToHours = (time: string): number | null => {
    if (!time || !time.includes(':')) return null;
    const [h, m] = time.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    return h + m / 60;
  };

  // Calculate total worked hours from time in/out fields
  const calcTotalWorked = (entry: DayEntry): number => {
    let total = 0;

    const t1In = parseTimeToHours(entry.timeIn);
    let t1Out = parseTimeToHours(entry.timeOutLunch);
    if (t1In !== null && t1Out !== null) {
      if (t1Out <= t1In) t1Out += 12; // AM to PM crossing (e.g. 5:00 to 1:00 = 8hrs)
      total += t1Out - t1In;
    }

    const t2In = parseTimeToHours(entry.timeIn2);
    let t2Out = parseTimeToHours(entry.timeOut2);
    if (t2In !== null && t2Out !== null) {
      if (t2Out <= t2In) t2Out += 12;
      total += t2Out - t2In;
    }

    return Math.round(total * 100) / 100;
  };

  // Update a specific day entry field
  const updateDayEntry = (day: number, field: keyof DayEntry, value: string | number) => {
    setWorkData((prev) => {
      const updated = prev.map((entry) => {
        if (entry.day === day) {
          const newEntry = { ...entry, [field]: value };

          // No auto-calculation; totalDuration and actualWorked are set manually

          return newEntry;
        }
        return entry;
      });
      return updated;
    });
  };

  // Calculate totals
  const { totalWorked, totalOT, totalActual } = useMemo(() => {
    const worked = workData.reduce((sum, entry) => sum + (entry.totalDuration || 0), 0);
    const ot = workData.reduce((sum, entry) => sum + (entry.overTime || 0), 0);

    return {
      totalWorked: worked,
      totalOT: ot,
      totalActual: worked + ot,
    };
  }, [workData]);

  return {
    month,
    year,
    laborName,
    projectName,
    supplierName,
    siteEngineerName,
    designation,
    workData,
    totalWorked,
    totalOT,
    totalActual,
    setMonth,
    setYear,
    setLaborName,
    setProjectName,
    setSupplierName,
    setSiteEngineerName,
    setDesignation,
    updateDayEntry,
  };
}
