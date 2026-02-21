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

  // Update a specific day entry field
  const updateDayEntry = (day: number, field: keyof DayEntry, value: string | number) => {
    setWorkData((prev) => {
      const updated = prev.map((entry) => {
        if (entry.day === day) {
          const newEntry = { ...entry, [field]: value };

          // Auto-calculate actualWorked if totalDuration or overTime changes
          if (field === 'totalDuration' || field === 'overTime') {
            const duration = field === 'totalDuration' ? Number(value) : newEntry.totalDuration;
            const ot = field === 'overTime' ? Number(value) : newEntry.overTime;
            newEntry.actualWorked = duration > 0 ? duration + ot : 0;
          }

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
    const actual = workData.reduce((sum, entry) => sum + (entry.actualWorked || 0), 0);

    return {
      totalWorked: worked,
      totalOT: ot,
      totalActual: actual,
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
