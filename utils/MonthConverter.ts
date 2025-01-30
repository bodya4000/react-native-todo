import { Month } from '@/constants/Month';

export default class MonthConverter {
	static fromNumberToMonth(month: number): Month {
		switch (month) {
			case 1:
				return Month.JANUARY;
			case 2:
				return Month.FEBRUARY;
			case 3:
				return Month.MARCH;
			case 4:
				return Month.APRIL;
			case 5:
				return Month.MAY;
			case 6:
				return Month.JUNE;
			case 7:
				return Month.JULY;
			case 8:
				return Month.AUGUST;
			case 9:
				return Month.SEPTEMBER;
			case 10:
				return Month.OCTOBER;
			case 11:
				return Month.NOVEMBER;
			case 12:
				return Month.DECEMBER;
			default:
				throw new Error(`Invalid month: ${month}`);
		}
	}

	static fromMonthToNumber(month: Month): number {
		switch (month) {
			case Month.JANUARY:
				return 1;
			case Month.FEBRUARY:
				return 2;
			case Month.MARCH:
				return 3;
			case Month.APRIL:
				return 4;
			case Month.MAY:
				return 5;
			case Month.JUNE:
				return 6;
			case Month.JULY:
				return 7;
			case Month.AUGUST:
				return 8;
			case Month.SEPTEMBER:
				return 9;
			case Month.OCTOBER:
				return 10;
			case Month.NOVEMBER:
				return 11;
			case Month.DECEMBER:
				return 12;
			default:
				throw new Error(`Invalid month: ${month}`);
		}
	}
}
