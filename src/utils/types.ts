export interface SavingsOverview {
	totalSavings: number;
	currentMonthSavings: number;
	percentageChange: number;
}

export interface SavingsTrend {
	month: string;
	savings: number;
}

export interface SavingsByCategory {
	service: string;
	savings: number;
}

export interface DetailedSaving {
	date: string;
	service: string;
	amount: number;
}

export interface SavingsData {
	overview: SavingsOverview;
	savingsTrends: SavingsTrend[];
	savingsByCategory: SavingsByCategory[];
	detailedSavings: DetailedSaving[];
}
